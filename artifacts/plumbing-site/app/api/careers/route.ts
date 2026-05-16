import { NextRequest, NextResponse } from "next/server";
import { resend, CONTACT_EMAIL, FROM_EMAIL } from "@/lib/resend";
import { createServerSupabase } from "@/lib/supabase";

const BUCKET = "Applications";
const SIGNED_URL_EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days in seconds

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name       = formData.get("name")       as string;
    const email      = formData.get("email")      as string;
    const phone      = formData.get("phone")      as string;
    const position   = formData.get("position")   as string;
    const experience = formData.get("experience") as string;
    const message    = formData.get("message")    as string;
    const resumeFile = formData.get("resume")     as File | null;
    const idFile     = formData.get("id")         as File | null;

    if (!name || !email || !phone || !position) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    let resumeSignedUrl: string | null = null;
    let idSignedUrl:     string | null = null;
    let resumePath:      string | null = null;
    let idPath:          string | null = null;

    const supabase = createServerSupabase();

    if (supabase) {
      const slug = `${Date.now()}-${name.replace(/\s+/g, "-")}`;

      if (resumeFile && resumeFile.size > 0) {
        const ext      = resumeFile.name.split(".").pop() ?? "pdf";
        const filePath = `Resume/${slug}-resume.${ext}`;
        const { data, error } = await supabase.storage
          .from(BUCKET)
          .upload(filePath, Buffer.from(await resumeFile.arrayBuffer()), {
            contentType: resumeFile.type,
            upsert: false,
          });
        if (!error && data) {
          resumePath = data.path;
          const { data: signed } = await supabase.storage
            .from(BUCKET)
            .createSignedUrl(filePath, SIGNED_URL_EXPIRES_IN);
          resumeSignedUrl = signed?.signedUrl ?? null;
        } else if (error) {
          console.error("Resume upload error:", error.message);
        }
      }

      if (idFile && idFile.size > 0) {
        const ext      = idFile.name.split(".").pop() ?? "pdf";
        const filePath = `ID/${slug}-id.${ext}`;
        const { data, error } = await supabase.storage
          .from(BUCKET)
          .upload(filePath, Buffer.from(await idFile.arrayBuffer()), {
            contentType: idFile.type,
            upsert: false,
          });
        if (!error && data) {
          idPath = data.path;
          const { data: signed } = await supabase.storage
            .from(BUCKET)
            .createSignedUrl(filePath, SIGNED_URL_EXPIRES_IN);
          idSignedUrl = signed?.signedUrl ?? null;
        } else if (error) {
          console.error("ID upload error:", error.message);
        }
      }
    }

    if (!resend) {
      return NextResponse.json(
        { success: false, error: "Email service is not configured." },
        { status: 503 }
      );
    }

    // Internal notification email
    const { error: notifyError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: `New Job Application — ${name} for ${position}`,
      html: `
        <div style="font-family: sans-serif; max-width: 620px; margin: 0 auto; color: #222;">
          <h2 style="color: #1a4a8a; border-bottom: 2px solid #e35a1a; padding-bottom: 8px; margin-bottom: 20px;">
            New Job Application — J&amp;O Pro Bros Construction
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 160px;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color:#1a4a8a;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Position</td><td style="padding: 8px 0;">${position}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Experience</td><td style="padding: 8px 0;">${experience || "Not specified"}</td></tr>
          </table>
          ${message ? `
          <div style="padding: 14px 16px; background: #f5f8ff; border-radius: 8px; border-left: 4px solid #1a4a8a; margin-bottom: 20px;">
            <strong style="color: #1a4a8a;">Additional Notes:</strong>
            <p style="margin: 8px 0 0; line-height: 1.6; color: #444;">${message}</p>
          </div>` : ""}
          ${resumeSignedUrl || idSignedUrl ? `
          <div style="padding: 14px 16px; background: #fff8f0; border-radius: 8px; border-left: 4px solid #e35a1a; margin-bottom: 20px;">
            <strong style="color: #e35a1a; display: block; margin-bottom: 10px;">Uploaded Documents</strong>
            <p style="margin: 0 0 6px; font-size: 13px; color: #888;">Private signed links — expire in 7 days, no login required.</p>
            ${resumeSignedUrl ? `
            <p style="margin: 10px 0 4px;"><strong>Resume:</strong></p>
            <a href="${resumeSignedUrl}" style="display:inline-block; padding: 8px 16px; background:#1a4a8a; color:#fff; border-radius:6px; text-decoration:none; font-size:14px;">View Resume</a>` : ""}
            ${idSignedUrl ? `
            <p style="margin: 14px 0 4px;"><strong>Government-Issued ID:</strong></p>
            <a href="${idSignedUrl}" style="display:inline-block; padding: 8px 16px; background:#1a4a8a; color:#fff; border-radius:6px; text-decoration:none; font-size:14px;">View ID Document</a>` : ""}
          </div>` : `<p style="color: #999; font-style: italic;">No documents uploaded.</p>`}
          <p style="font-size: 12px; color: #aaa; margin-top: 24px; border-top: 1px solid #eee; padding-top: 12px;">
            Storage path: ${resumePath ? `Resume/${resumePath.split("/").pop()}` : "—"} &nbsp;|&nbsp; ${idPath ? `ID/${idPath.split("/").pop()}` : "—"}
          </p>
        </div>
      `,
    });

    if (notifyError) {
      console.error("Resend notification error:", notifyError);
      return NextResponse.json(
        { success: false, error: `Email failed: ${notifyError.message}` },
        { status: 500 }
      );
    }

    // Applicant confirmation email
    const { error: confirmError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Your application was received — J&O Pro Bros Construction",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #222;">
          <h2 style="color: #1a4a8a;">Thank you for applying, ${name}!</h2>
          <p>We've received your application for the <strong>${position}</strong> position and will be reviewing it shortly.</p>
          <p>Our team typically follows up within 3–5 business days. We appreciate your interest in joining the J&amp;O Pro Bros crew.</p>
          <p style="color: #777; margin-top: 24px; font-size: 13px;">J&amp;O Pro Bros Construction<br/>joprobros.construction@gmail.com</p>
        </div>
      `,
    });

    if (confirmError) {
      console.error("Resend confirmation error:", confirmError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Careers route error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process application" },
      { status: 500 }
    );
  }
}

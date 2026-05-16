import { NextRequest, NextResponse } from "next/server";
import { resend, CONTACT_EMAIL, FROM_EMAIL } from "@/lib/resend";
import { createServerSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const position = formData.get("position") as string;
    const experience = formData.get("experience") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const resumeFile = formData.get("resume") as File | null;
    const idFile = formData.get("id") as File | null;

    if (!name || !email || !phone || !position) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    let resumePath: string | null = null;
    let idPath: string | null = null;

    const supabase = createServerSupabase();

    if (supabase) {
      if (resumeFile && resumeFile.size > 0) {
        const buffer = Buffer.from(await resumeFile.arrayBuffer());
        const ext = resumeFile.name.split(".").pop() ?? "pdf";
        const fileName = `resumes/${Date.now()}-${name.replace(/\s+/g, "-")}-resume.${ext}`;
        const { data, error } = await supabase.storage
          .from("applications")
          .upload(fileName, buffer, { contentType: resumeFile.type });
        if (!error && data) resumePath = data.path;
      }

      if (idFile && idFile.size > 0) {
        const buffer = Buffer.from(await idFile.arrayBuffer());
        const ext = idFile.name.split(".").pop() ?? "pdf";
        const fileName = `ids/${Date.now()}-${name.replace(/\s+/g, "-")}-id.${ext}`;
        const { data, error } = await supabase.storage
          .from("applications")
          .upload(fileName, buffer, { contentType: idFile.type });
        if (!error && data) idPath = data.path;
      }
    }

    if (!resend) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Email service is not configured yet. Please add your RESEND_API_KEY.",
        },
        { status: 503 }
      );
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: `New Job Application — ${name} for ${position}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a4a8a; border-bottom: 2px solid #e35a1a; padding-bottom: 8px;">
            New Job Application
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 140px;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Position</td><td style="padding: 8px 0;">${position}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Experience</td><td style="padding: 8px 0;">${experience || "Not specified"}</td></tr>
          </table>
          ${
            coverLetter
              ? `
          <div style="margin-top: 16px; padding: 16px; background: #f5f8ff; border-radius: 8px; border-left: 4px solid #1a4a8a;">
            <strong style="color: #1a4a8a;">Cover Letter:</strong>
            <p style="margin: 8px 0 0; line-height: 1.6;">${coverLetter}</p>
          </div>`
              : ""
          }
          ${
            resumePath || idPath
              ? `
          <div style="margin-top: 16px; padding: 16px; background: #fff8f0; border-radius: 8px; border-left: 4px solid #e35a1a;">
            <strong style="color: #e35a1a;">Uploaded Documents (Supabase Storage):</strong>
            <ul style="margin: 8px 0 0; padding-left: 20px;">
              ${resumePath ? `<li>Resume: ${resumePath}</li>` : ""}
              ${idPath ? `<li>ID Document: ${idPath}</li>` : ""}
            </ul>
          </div>`
              : '<p style="color: #999; font-style: italic; margin-top: 16px;">No documents uploaded (Supabase not configured or no files attached).</p>'
          }
        </div>
      `,
    });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Your application was received — Premier Plumbing",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a4a8a;">Thank you for applying, ${name}!</h2>
          <p>We've received your application for the <strong>${position}</strong> position and will review it shortly.</p>
          <p>Our team typically follows up within 3–5 business days. We appreciate your interest in joining our team.</p>
          <p style="color: #777; margin-top: 24px;">Premier Plumbing Contractors</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Careers route error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process application" },
      { status: 500 }
    );
  }
}

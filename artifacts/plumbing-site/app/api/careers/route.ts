import { NextRequest, NextResponse } from "next/server";
import { resend, CONTACT_EMAIL, FROM_EMAIL } from "@/lib/resend";
import { createServerSupabase } from "@/lib/supabase";
import { signApproveToken } from "@/lib/approve-token";

const BUCKET = "Applications";
const SIGNED_URL_EXPIRES_IN = 60 * 60 * 24 * 7;

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

    // Build approve URL
    const proto   = req.headers.get("x-forwarded-proto") ?? "https";
    const host    = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "localhost";
    const sig     = signApproveToken(name, email, position);
    const approveUrl = `${proto}://${host}/api/careers/approve?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&position=${encodeURIComponent(position)}&sig=${sig}`;

    // Format phone for tel: link (strip non-digits)
    const phoneDigits = phone.replace(/\D/g, "");
    const telLink     = `tel:+1${phoneDigits}`;

    const { error: notifyError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: `New Application — ${name} for ${position}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 640px; margin: 0 auto; color: #1a1a2e;">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, #040e28 0%, #0f2a6e 100%); border-radius: 16px 16px 0 0; padding: 32px 36px 28px;">
            <p style="color: rgba(255,255,255,0.5); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">New Job Application</p>
            <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0 0 4px;">${name}</h1>
            <p style="color: #e35a1a; font-size: 15px; font-weight: 600; margin: 0;">Applying for: ${position}</p>
          </div>

          <!-- Body -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 16px 16px; padding: 32px 36px;">

            <!-- Applicant details -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.6px; width: 130px;">Full Name</td>
                <td style="padding: 10px 0; font-size: 14px; color: #0f172a; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.6px;">Email</td>
                <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #1a4a8a; text-decoration: none; font-weight: 600;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.6px;">Phone</td>
                <td style="padding: 10px 0; font-size: 14px;">
                  <a href="${telLink}" style="color: #1a4a8a; font-weight: 700; text-decoration: none; font-size: 16px;">${phone}</a>
                  &nbsp;
                  <a href="${telLink}" style="display: inline-block; background: #1a4a8a; color: white; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 99px; text-decoration: none; vertical-align: middle;">Call Now</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.6px;">Position</td>
                <td style="padding: 10px 0; font-size: 14px; color: #0f172a; font-weight: 600;">${position}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.6px;">Experience</td>
                <td style="padding: 10px 0; font-size: 14px; color: #0f172a;">${experience || "Not specified"}</td>
              </tr>
            </table>

            ${message ? `
            <div style="background: #f8fafc; border-left: 4px solid #1a4a8a; border-radius: 0 10px 10px 0; padding: 14px 18px; margin-bottom: 24px;">
              <p style="font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.6px; margin: 0 0 6px;">Additional Notes</p>
              <p style="font-size: 14px; color: #334155; line-height: 1.6; margin: 0;">${message}</p>
            </div>` : ""}

            ${resumeSignedUrl || idSignedUrl ? `
            <div style="background: #fff8f0; border: 1px solid #fde68a; border-radius: 12px; padding: 18px 20px; margin-bottom: 28px;">
              <p style="font-size: 12px; font-weight: 700; color: #92400e; text-transform: uppercase; letter-spacing: 0.6px; margin: 0 0 12px;">Uploaded Documents — expires in 7 days</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                ${resumeSignedUrl ? `<a href="${resumeSignedUrl}" style="display:inline-block; padding: 8px 18px; background:#1a4a8a; color:#fff; border-radius:8px; text-decoration:none; font-size:13px; font-weight:700;">View Resume</a>` : ""}
                ${idSignedUrl ? `<a href="${idSignedUrl}" style="display:inline-block; padding: 8px 18px; background:#1a4a8a; color:#fff; border-radius:8px; text-decoration:none; font-size:13px; font-weight:700;">View ID Document</a>` : ""}
              </div>
            </div>` : `
            <p style="font-size: 13px; color: #94a3b8; font-style: italic; margin-bottom: 28px;">No documents uploaded with this application.</p>`}

            <!-- Action buttons -->
            <div style="border-top: 1px solid #f1f5f9; padding-top: 24px;">
              <p style="font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.6px; margin: 0 0 14px;">Actions</p>
              <table style="border-collapse: collapse;">
                <tr>
                  <td style="padding-right: 12px;">
                    <a href="${approveUrl}" style="display:inline-block; padding: 14px 28px; background: #16a34a; color: white; border-radius: 10px; text-decoration: none; font-size: 15px; font-weight: 800; letter-spacing: 0.3px;">
                      Approve Applicant
                    </a>
                  </td>
                  <td>
                    <a href="${telLink}" style="display:inline-block; padding: 14px 28px; background: #1a4a8a; color: white; border-radius: 10px; text-decoration: none; font-size: 15px; font-weight: 800; letter-spacing: 0.3px;">
                      Call ${phone}
                    </a>
                  </td>
                </tr>
              </table>
              <p style="font-size: 12px; color: #94a3b8; margin: 12px 0 0; line-height: 1.5;">
                Clicking <strong>Approve Applicant</strong> sends an acceptance email to ${email} immediately.<br/>
                Declined applicants should be called directly — no automated rejection is sent.
              </p>
            </div>

            <p style="font-size: 11px; color: #cbd5e1; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 14px;">
              Storage: ${resumePath ? `Resume/${resumePath.split("/").pop()}` : "—"} &nbsp;·&nbsp; ${idPath ? `ID/${idPath.split("/").pop()}` : "—"}
            </p>
          </div>
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Careers route error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process application" },
      { status: 500 }
    );
  }
}

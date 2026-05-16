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
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    let resumeSignedUrl: string | null = null;
    let idSignedUrl:     string | null = null;
    let resumePath:      string | null = null;
    let idPath:          string | null = null;

    const supabase = createServerSupabase();
    if (supabase) {
      const slug = `${Date.now()}-${name.replace(/\s+/g, "-")}`;

      if (resumeFile && resumeFile.size > 0) {
        const ext = resumeFile.name.split(".").pop() ?? "pdf";
        const fp  = `Resume/${slug}-resume.${ext}`;
        const { data, error } = await supabase.storage.from(BUCKET).upload(
          fp, Buffer.from(await resumeFile.arrayBuffer()), { contentType: resumeFile.type, upsert: false }
        );
        if (!error && data) {
          resumePath = data.path;
          const { data: s } = await supabase.storage.from(BUCKET).createSignedUrl(fp, SIGNED_URL_EXPIRES_IN);
          resumeSignedUrl = s?.signedUrl ?? null;
        } else if (error) console.error("Resume upload:", error.message);
      }

      if (idFile && idFile.size > 0) {
        const ext = idFile.name.split(".").pop() ?? "pdf";
        const fp  = `ID/${slug}-id.${ext}`;
        const { data, error } = await supabase.storage.from(BUCKET).upload(
          fp, Buffer.from(await idFile.arrayBuffer()), { contentType: idFile.type, upsert: false }
        );
        if (!error && data) {
          idPath = data.path;
          const { data: s } = await supabase.storage.from(BUCKET).createSignedUrl(fp, SIGNED_URL_EXPIRES_IN);
          idSignedUrl = s?.signedUrl ?? null;
        } else if (error) console.error("ID upload:", error.message);
      }
    }

    if (!resend) {
      return NextResponse.json({ success: false, error: "Email service is not configured." }, { status: 503 });
    }

    const proto      = req.headers.get("x-forwarded-proto") ?? "https";
    const host       = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "localhost";
    const baseUrl    = `${proto}://${host}`;
    const sig        = signApproveToken(name, email, position);
    const approveUrl = `${baseUrl}/api/careers/approve?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&position=${encodeURIComponent(position)}&sig=${sig}`;
    const logoUrl    = `${baseUrl}/images/logo.png`;

    const phoneDigits = phone.replace(/\D/g, "");
    const telLink     = `tel:+1${phoneDigits}`;

    const { error: notifyError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: `New Application — ${name} for ${position}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#040e28;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#040e28;padding:40px 16px 60px;">
  <tr><td align="center">

    <!-- Logo -->
    <div style="margin-bottom:24px;text-align:center;">
      <img src="${logoUrl}" alt="J&O Pro Bros Construction" width="72" height="72"
           style="border-radius:14px;display:block;margin:0 auto 10px;" />
      <p style="color:rgba(255,255,255,0.4);font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;margin:0;">
        J&amp;O Pro Bros Construction
      </p>
    </div>

    <!-- Card -->
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;">

      <!-- Card header -->
      <tr>
        <td style="background:linear-gradient(135deg,#0f2a6e 0%,#1a4a8a 100%);padding:28px 36px;">
          <p style="color:rgba(255,255,255,0.5);font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin:0 0 8px;">
            New Job Application
          </p>
          <h1 style="color:#ffffff;font-size:22px;font-weight:800;margin:0 0 4px;">${name}</h1>
          <p style="color:#e35a1a;font-size:14px;font-weight:600;margin:0;">Applying for: ${position}</p>
        </td>
      </tr>

      <!-- Card body -->
      <tr>
        <td style="padding:30px 36px;">

          <!-- Details table -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:22px;">
            <tr style="border-bottom:1px solid #f1f5f9;">
              <td style="padding:10px 0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.6px;width:120px;">Full Name</td>
              <td style="padding:10px 0;font-size:14px;color:#0f172a;font-weight:600;">${name}</td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9;">
              <td style="padding:10px 0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.6px;">Email</td>
              <td style="padding:10px 0;font-size:14px;">
                <a href="mailto:${email}" style="color:#1a4a8a;text-decoration:none;font-weight:600;">${email}</a>
              </td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9;">
              <td style="padding:10px 0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.6px;">Phone</td>
              <td style="padding:10px 0;font-size:14px;">
                <a href="${telLink}" style="color:#1a4a8a;font-weight:800;font-size:16px;text-decoration:none;">${phone}</a>
                &nbsp;
                <a href="${telLink}" style="display:inline-block;background:#1a4a8a;color:#fff;font-size:11px;font-weight:700;padding:3px 12px;border-radius:99px;text-decoration:none;vertical-align:middle;">
                  Call Now
                </a>
              </td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9;">
              <td style="padding:10px 0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.6px;">Position</td>
              <td style="padding:10px 0;font-size:14px;color:#0f172a;font-weight:600;">${position}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.6px;">Experience</td>
              <td style="padding:10px 0;font-size:14px;color:#0f172a;">${experience || "Not specified"}</td>
            </tr>
          </table>

          ${message ? `
          <div style="background:#f8fafc;border-left:4px solid #1a4a8a;border-radius:0 10px 10px 0;padding:14px 18px;margin-bottom:22px;">
            <p style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.6px;margin:0 0 6px;">Notes</p>
            <p style="font-size:14px;color:#334155;line-height:1.6;margin:0;">${message}</p>
          </div>` : ""}

          ${resumeSignedUrl || idSignedUrl ? `
          <div style="background:#fff8f0;border:1px solid #fed7aa;border-radius:12px;padding:16px 20px;margin-bottom:26px;">
            <p style="font-size:11px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.6px;margin:0 0 12px;">
              Documents — links expire in 7 days
            </p>
            ${resumeSignedUrl ? `<a href="${resumeSignedUrl}" style="display:inline-block;padding:8px 18px;background:#1a4a8a;color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;margin-right:8px;">View Resume</a>` : ""}
            ${idSignedUrl ? `<a href="${idSignedUrl}" style="display:inline-block;padding:8px 18px;background:#1a4a8a;color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;">View ID</a>` : ""}
          </div>` : `
          <p style="font-size:13px;color:#94a3b8;font-style:italic;margin-bottom:26px;">No documents uploaded.</p>`}

          <!-- Action buttons -->
          <div style="border-top:1px solid #f1f5f9;padding-top:22px;">
            <p style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.6px;margin:0 0 14px;">Actions</p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:12px;">
                  <a href="${approveUrl}"
                     style="display:inline-block;padding:14px 26px;background:#16a34a;color:#fff;border-radius:10px;text-decoration:none;font-size:15px;font-weight:800;">
                    Approve &amp; Send Contract
                  </a>
                </td>
                <td>
                  <a href="${telLink}"
                     style="display:inline-block;padding:14px 26px;background:#1a4a8a;color:#fff;border-radius:10px;text-decoration:none;font-size:15px;font-weight:800;">
                    Call ${phone}
                  </a>
                </td>
              </tr>
            </table>
            <p style="font-size:12px;color:#94a3b8;margin:12px 0 0;line-height:1.5;">
              <strong>Approve</strong> sends an acceptance email with the contractor agreement link to ${email}.<br/>
              Declined applicants should be called — no automated rejection is sent.
            </p>
          </div>

          <p style="font-size:11px;color:#cbd5e1;margin-top:22px;border-top:1px solid #f1f5f9;padding-top:14px;">
            Files: ${resumePath ? resumePath.split("/").pop() : "—"} &nbsp;·&nbsp; ${idPath ? idPath.split("/").pop() : "—"}
          </p>
        </td>
      </tr>
    </table>

    <p style="color:rgba(255,255,255,0.2);font-size:11px;margin-top:28px;text-align:center;">
      J&amp;O Pro Bros Construction &nbsp;·&nbsp; joprobros.construction@gmail.com
    </p>
  </td></tr>
</table>
</body>
</html>`,
    });

    if (notifyError) {
      console.error("Resend notification error:", notifyError);
      return NextResponse.json({ success: false, error: `Email failed: ${notifyError.message}` }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Careers route error:", error);
    return NextResponse.json({ success: false, error: "Failed to process application" }, { status: 500 });
  }
}

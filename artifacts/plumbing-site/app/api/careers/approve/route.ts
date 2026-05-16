import { NextRequest, NextResponse } from "next/server";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { verifyApproveToken, signContractToken } from "@/lib/approve-token";

function page(title: string, body: string, success: boolean) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${title}</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#040e28;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
    .card{background:#fff;border-radius:20px;padding:48px 40px;max-width:480px;width:100%;text-align:center;box-shadow:0 8px 48px rgba(0,0,0,0.4)}
    .logo{width:72px;height:72px;border-radius:16px;object-fit:contain;margin:0 auto 20px;display:block}
    .icon{font-size:40px;margin-bottom:16px}
    h1{font-size:22px;font-weight:800;color:#0f172a;margin-bottom:12px}
    p{font-size:15px;color:#64748b;line-height:1.6}
    .badge{display:inline-block;background:#040e28;color:#e35a1a;font-size:11px;font-weight:700;padding:4px 14px;border-radius:99px;margin-bottom:20px;letter-spacing:0.8px;text-transform:uppercase}
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">J&amp;O Pro Bros Construction</div>
    <div class="icon">${success ? "✅" : "❌"}</div>
    <h1>${title}</h1>
    <p>${body}</p>
  </div>
</body>
</html>`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const name     = searchParams.get("name")     ?? "";
  const email    = searchParams.get("email")    ?? "";
  const position = searchParams.get("position") ?? "";
  const sig      = searchParams.get("sig")      ?? "";

  const html = (t: string, b: string, ok: boolean) =>
    new NextResponse(page(t, b, ok), { status: ok ? 200 : 400, headers: { "Content-Type": "text/html" } });

  if (!name || !email || !position || !sig)
    return html("Invalid Link", "This approval link is missing required information.", false);

  if (!verifyApproveToken(name, email, position, sig))
    return html("Invalid Link", "This approval link is invalid or has been tampered with.", false);

  if (!resend)
    return html("Not Configured", "Email service is not configured on this server.", false);

  // Build contract signing URL
  const proto       = req.headers.get("x-forwarded-proto") ?? "https";
  const host        = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "localhost";
  const baseUrl     = `${proto}://${host}`;
  const contractSig = signContractToken(name, email, position);
  const signUrl     = `${baseUrl}/careers/sign?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&position=${encodeURIComponent(position)}&sig=${contractSig}`;
  const logoUrl     = `${baseUrl}/images/logo.png`;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `You've Been Accepted — J&O Pro Bros Construction`,
    html: `
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#040e28;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#040e28;padding:40px 16px 60px;">
  <tr><td align="center">

    <!-- Logo -->
    <div style="margin-bottom:24px;">
      <img src="${logoUrl}" alt="J&O Pro Bros Construction" width="80" height="80"
           style="border-radius:16px;display:block;margin:0 auto 12px;" />
      <p style="color:rgba(255,255,255,0.45);font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;margin:0;">
        J&amp;O Pro Bros Construction
      </p>
    </div>

    <!-- Card -->
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border-radius:20px;overflow:hidden;">

      <!-- Card header -->
      <tr>
        <td style="background:linear-gradient(135deg,#0f2a6e 0%,#1a4a8a 100%);padding:36px 40px 32px;text-align:center;">
          <p style="color:rgba(255,255,255,0.6);font-size:13px;font-weight:600;margin:0 0 10px;letter-spacing:0.5px;">
            Congratulations!
          </p>
          <h1 style="color:#ffffff;font-size:28px;font-weight:800;margin:0 0 8px;line-height:1.2;">
            You've Been Accepted, ${name}
          </h1>
          <p style="color:rgba(255,255,255,0.65);font-size:15px;margin:0;">
            ${position} &nbsp;·&nbsp; 1099 Independent Contractor
          </p>
        </td>
      </tr>

      <!-- Card body -->
      <tr>
        <td style="padding:36px 40px;">

          <p style="font-size:16px;color:#334155;line-height:1.75;margin:0 0 28px;">
            We're excited to welcome you to the J&amp;O Pro Bros crew. After reviewing your application,
            we'd like to bring you on as a <strong style="color:#0f172a;">${position}</strong>.
          </p>

          <!-- Next steps -->
          <p style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;margin:0 0 16px;">
            What Happens Next
          </p>

          <!-- Step 1: Sign contract -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
            <tr>
              <td valign="top" width="36">
                <div style="width:28px;height:28px;border-radius:50%;background:#1a4a8a;color:#fff;font-size:13px;font-weight:800;text-align:center;line-height:28px;">1</div>
              </td>
              <td valign="top" style="padding-left:14px;border-bottom:1px solid #f1f5f9;padding-bottom:16px;">
                <strong style="display:block;font-size:14px;color:#0f172a;margin-bottom:4px;">Review &amp; Sign Your Contractor Agreement</strong>
                <p style="font-size:14px;color:#64748b;margin:0 0 12px;line-height:1.6;">
                  Your Independent Contractor Agreement is ready. Please review it carefully and sign using the button below.
                </p>
                <a href="${signUrl}"
                   style="display:inline-block;background:#e35a1a;color:#ffffff;font-size:14px;font-weight:800;padding:12px 24px;border-radius:10px;text-decoration:none;letter-spacing:0.3px;">
                  Review &amp; Sign Agreement
                </a>
              </td>
            </tr>
          </table>

          <!-- Step 2 -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
            <tr>
              <td valign="top" width="36">
                <div style="width:28px;height:28px;border-radius:50%;background:#1a4a8a;color:#fff;font-size:13px;font-weight:800;text-align:center;line-height:28px;">2</div>
              </td>
              <td valign="top" style="padding-left:14px;border-bottom:1px solid #f1f5f9;padding-bottom:16px;">
                <strong style="display:block;font-size:14px;color:#0f172a;margin-bottom:4px;">Start Date Confirmation</strong>
                <p style="font-size:14px;color:#64748b;margin:0;line-height:1.6;">
                  Our team will reach out to confirm your first day and job site location once your agreement is signed.
                </p>
              </td>
            </tr>
          </table>

          <!-- Step 3 -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
            <tr>
              <td valign="top" width="36">
                <div style="width:28px;height:28px;border-radius:50%;background:#1a4a8a;color:#fff;font-size:13px;font-weight:800;text-align:center;line-height:28px;">3</div>
              </td>
              <td valign="top" style="padding-left:14px;">
                <strong style="display:block;font-size:14px;color:#0f172a;margin-bottom:4px;">Questions? Call Us</strong>
                <p style="font-size:14px;color:#64748b;margin:0;line-height:1.6;">
                  We're available by phone if you have any questions before your first day.
                </p>
              </td>
            </tr>
          </table>

          <!-- Contact footer -->
          <div style="background:#040e28;border-radius:14px;padding:22px 28px;text-align:center;">
            <p style="color:rgba(255,255,255,0.45);font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin:0 0 10px;">Contact Us</p>
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 6px;">
              <tr>
                <td style="padding-right:20px;text-align:center;">
                  <p style="color:rgba(255,255,255,0.35);font-size:10px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;margin:0 0 4px;">English</p>
                  <a href="tel:+14707096137" style="color:#e35a1a;font-weight:700;font-size:16px;text-decoration:none;">(470) 709-6137</a>
                </td>
                <td style="border-left:1px solid rgba(255,255,255,0.1);padding-left:20px;text-align:center;">
                  <p style="color:rgba(255,255,255,0.35);font-size:10px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;margin:0 0 4px;">Español</p>
                  <a href="tel:+16789869084" style="color:#e35a1a;font-weight:700;font-size:16px;text-decoration:none;">(678) 986-9084</a>
                </td>
              </tr>
            </table>
            <p style="color:rgba(255,255,255,0.4);font-size:12px;margin:0;">joprobros.construction@gmail.com</p>
          </div>
        </td>
      </tr>

      <!-- Card footer -->
      <tr>
        <td style="padding:20px 40px 28px;text-align:center;border-top:1px solid #f1f5f9;">
          <p style="font-size:12px;color:#94a3b8;margin:0;line-height:1.6;">
            Welcome to the crew — we look forward to working with you.<br/>
            <strong style="color:#64748b;">J&amp;O Pro Bros Construction</strong>
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

  if (error) {
    console.error("Approve email error:", error);
    return html("Email Failed", `Could not send acceptance email to ${email}: ${error.message}`, false);
  }

  return new NextResponse(
    page(
      "Applicant Approved",
      `An acceptance email with the contractor agreement link has been sent to <strong>${email}</strong> for the <strong>${position}</strong> role.`,
      true
    ),
    { status: 200, headers: { "Content-Type": "text/html" } }
  );
}

import { NextRequest, NextResponse } from "next/server";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { verifyApproveToken } from "@/lib/approve-token";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const name     = searchParams.get("name")     ?? "";
  const email    = searchParams.get("email")    ?? "";
  const position = searchParams.get("position") ?? "";
  const sig      = searchParams.get("sig")      ?? "";

  const html = (title: string, body: string, success: boolean) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f0f4f8; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
        .card { background: white; border-radius: 20px; padding: 48px 40px; max-width: 480px; width: 100%; text-align: center; box-shadow: 0 4px 32px rgba(0,0,0,0.08); }
        .icon { width: 72px; height: 72px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 32px; background: ${success ? "#dcfce7" : "#fee2e2"}; }
        h1 { font-size: 22px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
        p { font-size: 15px; color: #64748b; line-height: 1.6; }
        .detail { background: #f8fafc; border-radius: 12px; padding: 16px 20px; margin: 20px 0; text-align: left; }
        .detail span { display: block; font-size: 13px; color: #94a3b8; margin-bottom: 2px; }
        .detail strong { font-size: 15px; color: #0f172a; }
        .badge { display: inline-block; background: #1a4a8a; color: white; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 99px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="icon">${success ? "✅" : "❌"}</div>
        <div class="badge">J&amp;O Pro Bros Construction</div>
        <h1>${title}</h1>
        <p>${body}</p>
      </div>
    </body>
    </html>
  `;

  if (!name || !email || !position || !sig) {
    return new NextResponse(
      html("Invalid Link", "This approval link is missing required information.", false),
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  if (!verifyApproveToken(name, email, position, sig)) {
    return new NextResponse(
      html("Invalid Link", "This approval link is invalid or has been tampered with.", false),
      { status: 403, headers: { "Content-Type": "text/html" } }
    );
  }

  if (!resend) {
    return new NextResponse(
      html("Email Not Configured", "Resend is not configured on this server.", false),
      { status: 503, headers: { "Content-Type": "text/html" } }
    );
  }

  const agreementUrl = process.env.CONTRACTOR_AGREEMENT_URL;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `You've Been Accepted — J&O Pro Bros Construction`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #040e28 0%, #0f2a6e 100%); border-radius: 16px 16px 0 0; padding: 40px 40px 32px; text-align: center;">
          <div style="display: inline-block; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 99px; padding: 6px 16px; margin-bottom: 16px;">
            <span style="color: #e35a1a; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">J&amp;O Pro Bros Construction</span>
          </div>
          <h1 style="color: #ffffff; font-size: 28px; font-weight: 800; margin: 0 0 8px;">Congratulations, ${name}!</h1>
          <p style="color: rgba(255,255,255,0.65); font-size: 15px; margin: 0;">You've been accepted.</p>
        </div>

        <!-- Body -->
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 16px 16px; padding: 36px 40px;">

          <p style="font-size: 16px; color: #334155; line-height: 1.7; margin: 0 0 24px;">
            We're excited to have you join the team. After reviewing your application, we'd like to bring you on as a
            <strong style="color: #0f172a;">${position}</strong>
            with J&amp;O Pro Bros Construction.
          </p>

          <!-- Role card -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #e35a1a; border-radius: 12px; padding: 20px 24px; margin-bottom: 28px;">
            <p style="font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px; margin: 0 0 6px;">Accepted Role</p>
            <p style="font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 4px;">${position}</p>
            <p style="font-size: 13px; color: #64748b; margin: 0;">1099 Independent Contractor &nbsp;·&nbsp; J&amp;O Pro Bros Construction</p>
          </div>

          <!-- Next steps -->
          <h3 style="font-size: 15px; font-weight: 700; color: #0f172a; margin: 0 0 14px;">What happens next:</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
            ${[
              ["1", "Contractor Agreement", agreementUrl
                ? `Review and sign your Independent Contractor Agreement: <a href="${agreementUrl}" style="color:#1a4a8a;">Open Agreement</a>`
                : "You will receive your Independent Contractor Agreement shortly for review and electronic signature."],
              ["2", "Start Date", "Our team will be in touch to confirm your first day and job site details."],
              ["3", "Questions?", "Call or text us anytime — we're here to help you get started."],
            ].map(([num, label, text]) => `
              <tr>
                <td style="padding: 10px 0; vertical-align: top; width: 32px;">
                  <div style="width: 24px; height: 24px; border-radius: 50%; background: #1a4a8a; color: white; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; text-align: center; line-height: 24px;">${num}</div>
                </td>
                <td style="padding: 10px 0 10px 12px; vertical-align: top; border-bottom: 1px solid #f1f5f9;">
                  <strong style="display: block; font-size: 14px; color: #0f172a; margin-bottom: 3px;">${label}</strong>
                  <span style="font-size: 14px; color: #64748b; line-height: 1.5;">${text}</span>
                </td>
              </tr>
            `).join("")}
          </table>

          <!-- Contact -->
          <div style="background: #040e28; border-radius: 12px; padding: 20px 24px; text-align: center;">
            <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.8px;">Contact Us</p>
            <p style="margin: 0;">
              <a href="tel:+14707096137" style="color: #e35a1a; font-weight: 700; font-size: 15px; text-decoration: none;">
                (470) 709-6137
              </a>
              <span style="color: rgba(255,255,255,0.3); margin: 0 10px;">|</span>
              <a href="tel:+16789869084" style="color: #e35a1a; font-weight: 700; font-size: 15px; text-decoration: none;">
                (678) 986-9084
              </a>
            </p>
            <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 10px 0 0;">joprobros.construction@gmail.com</p>
          </div>

          <p style="font-size: 13px; color: #94a3b8; text-align: center; margin: 24px 0 0; line-height: 1.6;">
            Welcome to the crew. We look forward to working with you.<br/>
            <strong style="color: #64748b;">— J&amp;O Pro Bros Construction</strong>
          </p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("Approve email send error:", error);
    return new NextResponse(
      html("Email Failed", `Could not send the acceptance email to ${email}. Error: ${error.message}`, false),
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }

  return new NextResponse(
    html(
      "Applicant Approved",
      `An acceptance email has been sent to <strong>${email}</strong> for the <strong>${position}</strong> role. They will receive next steps and contractor agreement details shortly.`,
      true
    ),
    { status: 200, headers: { "Content-Type": "text/html" } }
  );
}

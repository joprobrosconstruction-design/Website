import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resend, CONTACT_EMAIL, FROM_EMAIL } from "@/lib/resend";

const estimateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  company: z.string().optional(),
  projectType: z.enum(["commercial", "residential", "industrial", "other"]),
  description: z.string().min(10, "Please provide more detail"),
  timeline: z.string().optional(),
  budget: z.string().optional(),
  address: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = estimateSchema.parse(body);

    if (!resend) {
      return NextResponse.json(
        { success: false, error: "Email service is not configured." },
        { status: 503 }
      );
    }

    const { error: notifyError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: `New Estimate Request — ${data.name} (${data.projectType})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a4a8a; border-bottom: 2px solid #e35a1a; padding-bottom: 8px;">
            New Estimate Request — J&amp;O Pro Bros Construction
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 140px;">Name</td><td style="padding: 8px 0;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone</td><td style="padding: 8px 0;">${data.phone}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Company</td><td style="padding: 8px 0;">${data.company || "N/A"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Project Type</td><td style="padding: 8px 0; text-transform: capitalize;">${data.projectType}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Timeline</td><td style="padding: 8px 0;">${data.timeline || "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Budget</td><td style="padding: 8px 0;">${data.budget || "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Address</td><td style="padding: 8px 0;">${data.address || "Not specified"}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f5f8ff; border-radius: 8px; border-left: 4px solid #1a4a8a;">
            <strong style="color: #1a4a8a;">Project Description:</strong>
            <p style="margin: 8px 0 0; line-height: 1.6;">${data.description}</p>
          </div>
        </div>
      `,
    });

    if (notifyError) {
      console.error("Resend estimate notification error:", notifyError);
      return NextResponse.json(
        { success: false, error: `Email failed: ${notifyError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid form data", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Estimate route error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit estimate request" },
      { status: 500 }
    );
  }
}

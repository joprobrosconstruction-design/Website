import { NextRequest, NextResponse } from "next/server";
import { verifyContractToken } from "@/lib/approve-token";
import { createServerSupabase } from "@/lib/supabase";

const BUCKET = "Applications";

export async function POST(req: NextRequest) {
  try {
    const { name, email, position, sig, typedSignature } = await req.json();

    if (!name || !email || !position || !sig || !typedSignature) {
      return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }

    if (!verifyContractToken(name, email, position, sig)) {
      return NextResponse.json({ success: false, error: "Invalid or tampered signing link." }, { status: 403 });
    }

    if (typedSignature.trim().toLowerCase() !== name.trim().toLowerCase()) {
      return NextResponse.json({ success: false, error: "Typed name does not match the name on file." }, { status: 400 });
    }

    const supabase = createServerSupabase();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Storage is not configured." }, { status: 503 });
    }

    const signedAt  = new Date().toISOString();
    const slug      = `${Date.now()}-${name.replace(/\s+/g, "-")}`;
    const filePath  = `Contracts/${slug}.json`;

    const record = JSON.stringify({
      name,
      email,
      position,
      typedSignature,
      signedAt,
      agreementVersion: "1.0",
    }, null, 2);

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, Buffer.from(record, "utf-8"), {
        contentType: "application/json",
        upsert: false,
      });

    if (error) {
      console.error("Contract save error:", error.message);
      return NextResponse.json({ success: false, error: "Failed to save signed agreement." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Sign route error:", err);
    return NextResponse.json({ success: false, error: "Unexpected error." }, { status: 500 });
  }
}

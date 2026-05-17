import { NextRequest, NextResponse } from "next/server";
import { verifyContractToken } from "@/lib/approve-token";
import { createServerSupabase } from "@/lib/supabase";
import { CONTRACT_AGREEMENT_TEXT } from "@/lib/contract-agreement";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const BUCKET = "Applications";

const NAVY  = rgb(0.016, 0.055, 0.157); // #040e28
const ORANGE = rgb(0.890, 0.353, 0.098); // #e35a1a
const DARK  = rgb(0.059, 0.090, 0.165); // #0f172a
const GRAY  = rgb(0.39, 0.455, 0.545);  // #64748b
const WHITE = rgb(1, 1, 1);

/** Wrap text to fit within maxWidth, return array of lines */
function wrapText(text: string, font: Awaited<ReturnType<PDFDocument["embedFont"]>>, fontSize: number, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    if (paragraph.trim() === "") { lines.push(""); continue; }
    const words = paragraph.split(" ");
    let current = "";
    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(test, fontSize) > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
  }
  return lines;
}

async function buildPDF(name: string, email: string, position: string, typedSignature: string, signedAt: string): Promise<Uint8Array> {
  const doc      = await PDFDocument.create();
  const bold     = await doc.embedFont(StandardFonts.HelveticaBold);
  const regular  = await doc.embedFont(StandardFonts.Helvetica);
  const italic   = await doc.embedFont(StandardFonts.HelveticaOblique);

  const margin   = 50;
  const pageW    = 595; // A4 width pts
  const pageH    = 842; // A4 height pts
  const contentW = pageW - margin * 2;

  let page  = doc.addPage([pageW, pageH]);
  let curY  = pageH;

  /** Add a new page, reset curY */
  const newPage = () => {
    page = doc.addPage([pageW, pageH]);
    curY = pageH - margin;
  };

  /** Ensure there's enough vertical space, or start a new page */
  const ensureSpace = (needed: number) => {
    if (curY - needed < margin + 20) newPage();
  };

  // ─── Header band ───────────────────────────────────────────────────────────
  page.drawRectangle({ x: 0, y: pageH - 80, width: pageW, height: 80, color: NAVY });
  page.drawText("J&O Pro Bros Construction", { x: margin, y: pageH - 34, font: bold, size: 16, color: WHITE });
  page.drawText("Independent Contractor Agreement", { x: margin, y: pageH - 54, font: regular, size: 10, color: rgb(0.7, 0.75, 0.85) });
  page.drawText("CONFIDENTIAL", { x: pageW - margin - bold.widthOfTextAtSize("CONFIDENTIAL", 8), y: pageH - 40, font: bold, size: 8, color: ORANGE });

  curY = pageH - 100;

  // ─── Details block ─────────────────────────────────────────────────────────
  const signedDate = new Date(signedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const details: [string, string][] = [
    ["Contractor",  name],
    ["Email",       email],
    ["Role",        position],
    ["Signed",      signedDate],
    ["Agreement",   "Version 1.0"],
  ];

  // Light background card
  page.drawRectangle({ x: margin, y: curY - details.length * 22 - 16, width: contentW, height: details.length * 22 + 20, color: rgb(0.97, 0.98, 1) });
  page.drawRectangle({ x: margin, y: curY - details.length * 22 - 16, width: 4, height: details.length * 22 + 20, color: NAVY });

  curY -= 10;
  for (const [label, value] of details) {
    page.drawText(label.toUpperCase(), { x: margin + 12, y: curY, font: bold, size: 7.5, color: GRAY });
    page.drawText(value,               { x: margin + 100, y: curY, font: regular, size: 9, color: DARK });
    curY -= 22;
  }
  curY -= 16;

  // ─── Section: Agreement Text ────────────────────────────────────────────────
  curY -= 8;
  ensureSpace(40);
  page.drawText("AGREEMENT TERMS", { x: margin, y: curY, font: bold, size: 9, color: NAVY });
  page.drawLine({ start: { x: margin, y: curY - 4 }, end: { x: margin + contentW, y: curY - 4 }, thickness: 0.5, color: rgb(0.85, 0.88, 0.92) });
  curY -= 20;

  const agreementLines = wrapText(CONTRACT_AGREEMENT_TEXT, regular, 9, contentW);
  for (const line of agreementLines) {
    ensureSpace(13);
    if (line !== "") {
      page.drawText(line, { x: margin, y: curY, font: regular, size: 9, color: DARK });
    }
    curY -= 13;
  }

  // ─── Signature Section ──────────────────────────────────────────────────────
  ensureSpace(120);
  curY -= 14;
  page.drawLine({ start: { x: margin, y: curY }, end: { x: margin + contentW, y: curY }, thickness: 0.5, color: rgb(0.85, 0.88, 0.92) });
  curY -= 20;

  page.drawText("ELECTRONIC SIGNATURE", { x: margin, y: curY, font: bold, size: 9, color: NAVY });
  curY -= 18;
  page.drawText(
    "By signing below, the Contractor confirms they have read, understood, and agreed to all terms of this Agreement.",
    { x: margin, y: curY, font: regular, size: 8.5, color: GRAY }
  );
  curY -= 24;

  // Signature box
  page.drawRectangle({ x: margin, y: curY - 46, width: 280, height: 52, borderColor: NAVY, borderWidth: 1, color: rgb(0.97, 0.98, 1) });
  page.drawText("Signature:", { x: margin + 8, y: curY - 12, font: bold, size: 8, color: GRAY });
  page.drawText(typedSignature, { x: margin + 8, y: curY - 32, font: italic, size: 16, color: DARK });

  // Date box
  page.drawRectangle({ x: margin + 296, y: curY - 46, width: contentW - 296, height: 52, borderColor: rgb(0.85, 0.88, 0.92), borderWidth: 1, color: rgb(0.97, 0.98, 1) });
  page.drawText("Date:", { x: margin + 304, y: curY - 12, font: bold, size: 8, color: GRAY });
  page.drawText(signedDate,   { x: margin + 304, y: curY - 32, font: regular, size: 10, color: DARK });

  curY -= 60;

  // Agreement version note
  curY -= 14;
  page.drawText(`Electronically signed on ${signedDate} · Agreement v1.0 · J&O Pro Bros Construction`, {
    x: margin, y: curY, font: regular, size: 7.5, color: GRAY,
  });

  // ─── Footer on each page ───────────────────────────────────────────────────
  for (const p of doc.getPages()) {
    const { width } = p.getSize();
    p.drawLine({ start: { x: margin, y: 36 }, end: { x: width - margin, y: 36 }, thickness: 0.5, color: rgb(0.85, 0.88, 0.92) });
    p.drawText("J&O Pro Bros Construction · joprobros.construction@gmail.com · (770) 815-8143", {
      x: margin, y: 22, font: regular, size: 7, color: GRAY,
    });
    p.drawText("CONFIDENTIAL — DO NOT DISTRIBUTE", {
      x: width - margin - regular.widthOfTextAtSize("CONFIDENTIAL — DO NOT DISTRIBUTE", 7),
      y: 22, font: regular, size: 7, color: GRAY,
    });
  }

  return doc.save();
}

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

    const signedAt = new Date().toISOString();
    const slug     = `${Date.now()}-${name.replace(/\s+/g, "-")}`;
    const filePath = `Contracts/${slug}.pdf`;

    const pdfBytes = await buildPDF(name, email, position, typedSignature, signedAt);

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, pdfBytes, { contentType: "application/pdf", upsert: false });

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

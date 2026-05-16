import { createHmac, timingSafeEqual } from "crypto";

const SECRET = process.env.SESSION_SECRET ?? "dev-secret-change-me";

export function signApproveToken(name: string, email: string, position: string): string {
  const payload = `${name}|${email}|${position}`;
  return createHmac("sha256", SECRET).update(payload).digest("hex");
}

export function verifyApproveToken(
  name: string,
  email: string,
  position: string,
  sig: string
): boolean {
  try {
    const expected = signApproveToken(name, email, position);
    const a = Buffer.from(expected, "hex");
    const b = Buffer.from(sig, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

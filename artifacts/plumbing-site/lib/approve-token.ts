import { createHmac, timingSafeEqual } from "crypto";

const SECRET = process.env.SESSION_SECRET ?? "dev-secret-change-me";

function sign(scope: string, name: string, email: string, position: string): string {
  const payload = `${scope}|${name}|${email}|${position}`;
  return createHmac("sha256", SECRET).update(payload).digest("hex");
}

function verify(scope: string, name: string, email: string, position: string, sig: string): boolean {
  try {
    const expected = sign(scope, name, email, position);
    const a = Buffer.from(expected, "hex");
    const b = Buffer.from(sig, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function signApproveToken(name: string, email: string, position: string): string {
  return sign("approve", name, email, position);
}
export function verifyApproveToken(name: string, email: string, position: string, sig: string): boolean {
  return verify("approve", name, email, position, sig);
}

export function signContractToken(name: string, email: string, position: string): string {
  return sign("contract", name, email, position);
}
export function verifyContractToken(name: string, email: string, position: string, sig: string): boolean {
  return verify("contract", name, email, position, sig);
}

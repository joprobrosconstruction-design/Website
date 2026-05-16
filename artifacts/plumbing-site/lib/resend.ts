import { Resend } from "resend";

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL ?? "contact@example.com";
const rawFromEmail =
  process.env.FROM_EMAIL ?? "noreply@premierpluming.com";
export const FROM_EMAIL = `J&O Pro Bros Construction <${rawFromEmail}>`;

/**
 * Enquiry submission via Netlify Forms.
 * Detection uses the static skeleton in public/__forms.html; we POST to that
 * file so the request reaches Netlify's form handler, not the Next.js server.
 *
 * Note: enable "Form detection" once in the Netlify UI (Forms → Enable).
 */
export type Enquiry = {
  source: "home" | "contact";
  name: string;
  email: string;
  company?: string;
  needs?: string;
  start?: string;
  message?: string;
  "bot-field"?: string;
};

export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function submitEnquiry(data: Enquiry): Promise<void> {
  const body = new URLSearchParams({ "form-name": "enquiry" });
  for (const [k, v] of Object.entries(data)) body.set(k, v ?? "");
  const res = await fetch("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!res.ok) throw new Error(`Form submission failed (${res.status})`);
}

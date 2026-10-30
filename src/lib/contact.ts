import { profile } from "@/data/portfolio";

/** Opens Gmail's compose window in a new tab with fields pre-filled. Works without any backend. */
export function gmailComposeUrl(subject = "", body = "") {
  const params = new URLSearchParams({ view: "cm", fs: "1", to: profile.email, su: subject, body });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function mailtoUrl(subject = "", body = "") {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${profile.email}?${params.toString().replace(/\+/g, "%20")}`;
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

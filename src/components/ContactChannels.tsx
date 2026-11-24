import { site } from "@/lib/site";

const row =
  "el-row flex min-h-[60px] items-center justify-between gap-4 border-b border-line px-1 text-base text-ice";
const tag = "mono text-[11px] tracking-[0.1em] text-mute2";

/** Email, WhatsApp, phone and location rows. One source: src/lib/site.ts. */
export function ContactChannels({ full = false, className = "" }: { full?: boolean; className?: string }) {
  const c = site.contact;
  const place = ["Cyprus", c.city].filter(Boolean).join(" · ");
  return (
    <div className={`flex max-w-[520px] flex-col border-t border-line ${className}`}>
      <a href={c.emailHref} className={row}>
        <span className="min-w-0 break-all">{c.email}</span>
        <span className={tag}>EMAIL</span>
      </a>
      <a href={c.whatsappHref} target="_blank" rel="noopener noreferrer" className={row}>
        <span>{c.phone}</span>
        <span className={tag}>WHATSAPP</span>
      </a>
      {full && (
        <a href={c.phoneHref} className={row}>
          <span>Call {c.phone}</span>
          <span className={tag}>PHONE</span>
        </a>
      )}
      <p className={`${row} m-0`}>
        <span>{place}</span>
        <span className={tag}>{c.hours ? `MON–FRI · ${c.hours}` : "LOCATION"}</span>
      </p>
    </div>
  );
}

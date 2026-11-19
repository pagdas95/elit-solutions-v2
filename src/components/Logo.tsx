/**
 * The ElIT logo: the original layered E symbol + "ElIT" wordmark in Sora.
 * This is the only place the logo is drawn, so a future logo change
 * (e.g. the parked ELIT wordmark) is a one-file swap.
 */

type Props = {
  /** "onDark" = ice text, cyan IT. "onLight" = midnight text, deep-cyan IT. */
  tone?: "onDark" | "onLight";
  showSymbol?: boolean;
  className?: string;
};

export function LogoSymbol({ size = 22 }: { size?: number }) {
  const h = Math.round((size * 136) / 104);
  return (
    <svg width={size} height={h} viewBox="-2 -2 104 136" aria-hidden="true">
      <polygon fill="#22D3EE" points="0,38 63.5,0 100,21 72.5,37 63,31.5 0,68" />
      <polygon fill="#3B82F6" points="0.5,83 65,45.5 93.5,61.75 13,109 0.5,101.75" />
      <polygon
        fill="#8B5CF6"
        points="15,110.5 41.75,95 49.25,99.5 71.75,86.25 100,103 50.5,131.75"
      />
    </svg>
  );
}

export function Logo({ tone = "onDark", showSymbol = true, className = "" }: Props) {
  const text = tone === "onDark" ? "text-ice" : "text-midnight";
  const it = tone === "onDark" ? "text-accent" : "text-accent-ink";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {showSymbol && <LogoSymbol />}
      <span
        className={`font-brand text-[20px] leading-6 font-bold tracking-[-0.02em] transition-colors duration-300 ${text}`}
      >
        El<span className={`transition-colors duration-300 ${it}`}>IT</span>
      </span>
    </span>
  );
}

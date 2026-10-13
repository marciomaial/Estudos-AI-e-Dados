import { cn } from "./cn";

/**
 * Gráfico de área do Ledger (SVG): área #10b981 20% → 0, linha #34d399 2px,
 * comparação #facc15 1.5px tracejada a 50%, eixos 10px neutral-600.
 */
export function AreaChart({
  series,
  comparison,
  labels,
  className,
  ariaLabel,
}: {
  series: number[];
  comparison?: number[];
  labels: string[];
  className?: string;
  ariaLabel: string;
}) {
  const w = 600;
  const h = 200;
  const all = [...series, ...(comparison ?? [])];
  const max = Math.max(...all) * 1.1;
  const pts = (arr: number[]) => arr.map((v, i) => [(i / (arr.length - 1)) * w, h - (v / max) * h] as const);
  const path = (arr: number[]) => pts(arr).map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const line = path(series);
  const last = pts(series).at(-1)!;

  return (
    <figure className={cn("w-full", className)}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" role="img" aria-label={ariaLabel} className="h-48 w-full overflow-visible">
        <defs>
          <linearGradient id="gradientGreen" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="rgba(255,255,255,0.05)" vectorEffect="non-scaling-stroke" />
        ))}
        <path d={`${line} L${w},${h} L0,${h} Z`} fill="url(#gradientGreen)" />
        {comparison && (
          <path d={path(comparison)} fill="none" stroke="#facc15" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
        )}
        <path d={line} fill="none" stroke="#34d399" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <line x1={last[0]} x2={last[0]} y1="0" y2={h} stroke="rgba(16,185,129,0.3)" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
      </svg>
      <figcaption className="mt-2 flex justify-between text-[10px] text-neutral-600">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </figcaption>
    </figure>
  );
}

import type { ReactNode } from "react";
import { splitBRL } from "@/lib/format";
import { cn } from "./cn";
import { surface } from "./Card";

/** Balance figure: parte inteira 600 grande + centavos menores em neutral-600. */
export function BalanceFigure({ value, className, size = "lg" }: { value: number; className?: string; size?: "md" | "lg" }) {
  const { inteiro, centavos } = splitBRL(value);
  return (
    <p className={cn("font-semibold tracking-tight text-white tabular", size === "lg" ? "text-4xl" : "text-3xl", className)}>
      {inteiro}
      <span className={cn("text-neutral-600", size === "lg" ? "text-2xl" : "text-xl")}>{centavos}</span>
    </p>
  );
}

/** KPI card do dashboard: label neutral-500 · valor text-3xl · delta. */
export function KpiCard({ label, value, delta, icon, className }: { label: string; value: ReactNode; delta?: ReactNode; icon?: ReactNode; className?: string }) {
  return (
    <div className={cn(surface.inner, "p-6", className)}>
      <div className="flex items-center justify-between text-sm text-neutral-500">
        {label}
        {icon && <span className="text-neutral-400">{icon}</span>}
      </div>
      <div className="mt-3 flex flex-wrap items-baseline gap-3">
        <span className="text-3xl font-semibold tracking-tight text-white tabular">{value}</span>
        {delta}
      </div>
    </div>
  );
}

/** Barras verticais do Ledger (gradiente esmeralda; pico mais claro). loop só no site. */
export function BarStack({
  values,
  labels,
  loop = false,
  className,
  highlight,
}: {
  values: number[];
  labels?: string[];
  loop?: boolean;
  className?: string;
  highlight?: number;
}) {
  const max = Math.max(...values, 1);
  const peak = highlight ?? values.indexOf(max);
  return (
    <div className={cn("flex h-32 items-end gap-2", className)}>
      {values.map((v, i) => (
        <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
          <div
            className={cn(
              "w-full rounded-t-md bg-gradient-to-t",
              i === peak ? "from-emerald-500 to-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.35)]" : "from-emerald-600 to-emerald-400 opacity-80",
              loop ? "animate-bar-loop" : "animate-grow",
            )}
            style={{ height: `${(v / max) * 100}%`, animationDelay: `${i * 100}ms`, transformOrigin: "bottom" }}
          />
          {labels && <span className="text-[10px] text-neutral-500">{labels[i]}</span>}
        </div>
      ))}
    </div>
  );
}

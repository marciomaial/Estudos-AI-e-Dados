import type { ComponentProps } from "react";
import { cn } from "./cn";

/** Superfícies do Ledger. */
export const surface = {
  card: "rounded-3xl border border-white/10 bg-card shadow-2xl transition-colors duration-300 ease-ledger-std hover:border-white/20",
  inner: "rounded-2xl border border-white/5 bg-inner transition-colors duration-300 ease-ledger-std hover:border-white/10",
  elevated: "relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-elevated to-inner",
  tile: "rounded-2xl border border-white/5 bg-white/[0.02] transition-colors duration-300 hover:bg-white/[0.05]",
  row: "rounded-xl border border-white/5 bg-white/[0.03] transition-colors duration-300 hover:border-emerald-500/20",
  terminal: "rounded-2xl border border-white/5 bg-gradient-to-b from-terminal to-black shadow-2xl",
  glass: "rounded-lg border border-white/10 bg-slate-900/90 shadow-xl backdrop-blur-md",
} as const;

export function Card({ kind = "card", className, ...props }: { kind?: keyof typeof surface } & ComponentProps<"div">) {
  return <div className={cn(surface[kind], className)} {...props} />;
}

/** Orbs de luz ambiente (emerald-500/10 topo-esquerda, purple-500/10 baixo-direita). */
export function GlowOrbs({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="absolute -right-40 -bottom-40 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[120px]" />
    </div>
  );
}

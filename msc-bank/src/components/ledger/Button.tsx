import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./cn";

/**
 * Botões do Ledger.
 * shiny   → CTA principal (borda cônica girando). Um por tela.
 * white   → ação sólida (Get Started / Transfer).
 * outline → secundária (Sign In): border-neutral-900 → hover slate-900.
 * ghost   → bg-white/5 → hover white/10.
 * accent  → esmeralda com glow (Space / ações do app).
 * pill    → ghost pill do pricing (ring white/10).
 */
export type ButtonVariant = "shiny" | "white" | "outline" | "ghost" | "accent" | "pill";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors duration-300 ease-ledger-std disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  shiny: "shiny-cta",
  white: "rounded-full bg-white text-neutral-950 hover:bg-slate-200",
  outline: "rounded-full border border-neutral-900 text-white hover:bg-slate-900",
  ghost: "rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10",
  accent:
    "rounded-lg bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-[0_0_15px_-3px_rgba(16,185,129,0.5)] hover:brightness-110",
  pill: "rounded-full bg-white/5 text-white ring-1 ring-white/10 hover:bg-white/10 hover:shadow-lg hover:shadow-emerald-500/10",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 py-2 text-sm",
  md: "min-h-11 px-6 py-3 text-sm",
  lg: "min-h-12 px-8 py-4 text-base sm:text-lg",
};

type Common = { variant?: ButtonVariant; size?: ButtonSize; className?: string; children: ReactNode };

export function Button({ variant = "white", size = "md", className, ...props }: Common & ComponentProps<"button">) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

export function ButtonLink({
  variant = "white",
  size = "md",
  className,
  href,
  ...props
}: Common & Omit<ComponentProps<typeof Link>, "className">) {
  return <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

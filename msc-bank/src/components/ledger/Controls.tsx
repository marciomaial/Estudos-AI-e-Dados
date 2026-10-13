"use client";

import { cn } from "./cn";

/** Segmented range. tone="accent" = pills do market card (selecionada esmeralda com glow); "neutral" = dashboard. */
export function SegmentedRange<T extends string>({
  options,
  value,
  onChange,
  tone = "neutral",
  label,
  className,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  tone?: "neutral" | "accent";
  label: string;
  className?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "inline-flex gap-1 p-1",
        tone === "accent" ? "rounded-xl bg-track shadow-inner" : "rounded-lg border border-white/5 bg-inner",
        className,
      )}
    >
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o.value)}
            className={cn(
              "min-h-8 px-3 text-xs font-medium transition-colors duration-300",
              tone === "accent" ? "rounded-lg" : "rounded-md",
              selected
                ? tone === "accent"
                  ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  : "bg-white/10 text-white shadow-sm"
                : "text-neutral-500 hover:text-neutral-300",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** Toggle do billing do Ledger: trilho white/10, knob esmeralda, 300 ms ease-ledger. */
export function Toggle({
  checked,
  onChange,
  left,
  right,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  left: string;
  right: string;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-3 text-sm">
      <span className={cn("transition-colors", checked ? "text-neutral-400" : "text-white")}>{left}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className="relative h-6 w-12 rounded-full bg-white/10 p-1"
      >
        <span
          className={cn(
            "block size-4 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)] transition-transform duration-300 ease-ledger",
            checked && "translate-x-6",
          )}
        />
      </button>
      <span className={cn("transition-colors", checked ? "text-white" : "text-neutral-400")}>{right}</span>
    </div>
  );
}

/** Campo do Ledger: bg-inner border-white/5, hover inner-hover, foco emerald-500/30. */
export const fieldClass =
  "w-full rounded-lg border border-white/5 bg-inner px-3 py-2.5 text-sm text-white placeholder:text-neutral-600 transition-colors duration-300 hover:bg-inner-hover focus:border-emerald-500/30 focus:outline-none tabular";

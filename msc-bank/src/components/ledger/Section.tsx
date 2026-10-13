import type { ReactNode } from "react";
import { cn } from "./cn";
import { Reveal } from "./Reveal";

/** Eyebrow: régua esmeralda de 24px + texto uppercase. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-sm font-semibold tracking-wide text-emerald-400 uppercase", className)}>
      <span aria-hidden className="h-px w-6 bg-emerald-400" />
      {children}
    </p>
  );
}

/** Section header do Ledger: eyebrow · h2 light · parágrafo 60ch. */
export function SectionHeader({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-12 sm:mb-16", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-3xl font-light tracking-tight text-white sm:text-5xl">{title}</h2>
      {children && <p className="mt-5 max-w-[60ch] text-base font-light text-slate-400 sm:text-lg">{children}</p>}
    </Reveal>
  );
}

/** Moldura de seção: gradiente white/10 → 0 → 10 envolvendo o conteúdo em #000. */
export function SectionFrame({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className="mx-auto w-full max-w-7xl scroll-mt-28 px-4 sm:px-6">
      <div className="section-frame">
        <div className={cn("rounded-[calc(1.5rem-1px)] bg-canvas p-5 sm:p-8 lg:p-12", className)}>{children}</div>
      </div>
    </section>
  );
}

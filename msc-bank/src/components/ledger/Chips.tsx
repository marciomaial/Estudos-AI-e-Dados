import { ChevronUp } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "./cn";

/** Status de nota e de antecipação (seção 2.2 do plano). Sempre texto + cor. */
export type Status =
  | "RASCUNHO"
  | "IMPORTADA"
  | "CONFIRMADA"
  | "SOLICITADA"
  | "EM_ANTECIPACAO"
  | "APROVADA"
  | "ANTECIPADA"
  | "PAGA_AO_FORNECEDOR"
  | "LIQUIDADA"
  | "PAGA"
  | "RECUSADA"
  | "CONTESTADA"
  | "EM_ATRASO"
  | "CANCELADA"
  | "VENCIDA_SEM_ANTECIPACAO";

const tone = {
  neutral: "border-white/10 bg-white/5 text-neutral-400",
  emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  pending: "border-yellow-400/20 bg-yellow-400/10 text-yellow-400",
  paid: "border-emerald-500 bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.4)]",
  done: "border-white/10 bg-white/10 text-white",
  danger: "border-rose-500/20 bg-rose-500/10 text-rose-500",
  faint: "border-white/5 bg-transparent text-neutral-500",
} as const;

const statusMap: Record<Status, { label: string; tone: keyof typeof tone }> = {
  RASCUNHO: { label: "Rascunho", tone: "neutral" },
  IMPORTADA: { label: "Importada", tone: "neutral" },
  CONFIRMADA: { label: "Confirmada", tone: "emerald" },
  APROVADA: { label: "Aprovada", tone: "emerald" },
  SOLICITADA: { label: "Solicitada", tone: "pending" },
  EM_ANTECIPACAO: { label: "Em antecipação", tone: "pending" },
  ANTECIPADA: { label: "Antecipada", tone: "paid" },
  PAGA_AO_FORNECEDOR: { label: "Paga ao fornecedor", tone: "paid" },
  LIQUIDADA: { label: "Liquidada", tone: "done" },
  PAGA: { label: "Paga", tone: "done" },
  RECUSADA: { label: "Recusada", tone: "danger" },
  CONTESTADA: { label: "Contestada", tone: "danger" },
  EM_ATRASO: { label: "Em atraso", tone: "danger" },
  CANCELADA: { label: "Cancelada", tone: "faint" },
  VENCIDA_SEM_ANTECIPACAO: { label: "Vencida sem antecipação", tone: "faint" },
};

export const STATUS_LIST = Object.keys(statusMap) as Status[];

export function StatusChip({ status, className }: { status: Status; className?: string }) {
  const s = statusMap[status];
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap", tone[s.tone], className)}>
      {s.label}
    </span>
  );
}

/** Delta chip (+12,4%): positivo esmeralda, negativo rosa. */
export function DeltaChip({ children, negative, className }: { children: ReactNode; negative?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md border px-1.5 py-0.5 text-[11px] font-bold tabular",
        negative
          ? "border-rose-500/20 bg-rose-500/10 text-rose-500"
          : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
        className,
      )}
    >
      {!negative && <ChevronUp aria-hidden className="size-3" strokeWidth={2.5} />}
      {children}
    </span>
  );
}

/** Pill de anúncio do hero: bg-slate-900 + “Novo” esmeralda. */
export function AnnouncementPill({ tag, children }: { tag: string; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-neutral-900 bg-slate-900 py-1 pr-3 pl-1 text-xs text-slate-300 sm:text-sm">
      <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-medium text-black">{tag}</span>
      {children}
    </span>
  );
}

/** Status ao vivo: ping esmeralda. */
export function LiveStatus({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-xs text-slate-400", className)}>
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>
      {children}
    </span>
  );
}

import { CalendarClock, CreditCard, PackageX } from "lucide-react";
import { surface } from "@/components/ledger/Card";
import { Reveal } from "@/components/ledger/Reveal";
import { SectionFrame, SectionHeader } from "@/components/ledger/Section";
import { cn } from "@/components/ledger/cn";

const dores = [
  { icon: CalendarClock, title: "60 a 90 dias para receber", text: "Você entrega hoje, mas o comprador médio ou grande paga só no vencimento." },
  { icon: PackageX, title: "Pedidos recusados", text: "Sem caixa para matéria-prima, a fábrica deixa de aceitar pedidos que poderia atender." },
  { icon: CreditCard, title: "Crédito caro", text: "O buraco é coberto com cheque especial, cartão ou dinheiro pessoal do sócio." },
];

/** Linha do tempo do caixa: entrega → buraco → pagamento. */
function CashGap() {
  return (
    <div className={cn(surface.card, "relative overflow-hidden p-6 sm:p-8")}>
      <p className="text-sm text-neutral-500">Sem antecipação</p>
      <div className="mt-6 grid grid-cols-[auto_1fr_auto] items-center gap-3 text-xs">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white">Entrega</span>
        <div className="relative h-2 rounded-full bg-rose-500/10">
          <div className="absolute inset-y-0 left-0 w-full rounded-full border border-dashed border-rose-500/40" />
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white">Dia 90</span>
      </div>
      <p className="mt-3 text-center text-xs text-rose-500">caixa no vermelho</p>

      <p className="mt-8 text-sm text-neutral-500">Com MSC Bank</p>
      <div className="mt-6 grid grid-cols-[auto_1fr_auto] items-center gap-3 text-xs">
        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-emerald-400">Dinheiro hoje</span>
        <div className="h-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.35)]" />
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white">Comprador paga</span>
      </div>
      <p className="mt-3 text-center text-xs text-emerald-400">caixa livre para produzir</p>
    </div>
  );
}

export function Problem() {
  return (
    <SectionFrame id="problema">
      <SectionHeader eyebrow="O problema" title="Vender bem e ficar sem caixa.">
        A pequena indústria vende para empresas grandes e recebe muito depois. Enquanto isso, precisa comprar insumos e pagar salários.
      </SectionHeader>
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <CashGap />
        </Reveal>
        <div className="grid gap-4">
          {dores.map((d, i) => (
            <Reveal key={d.title} delay={0.1 * (i + 1)} className={cn(surface.row, "flex gap-4 p-5")}>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/5 bg-white/5">
                <d.icon className="size-5 text-slate-400" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-semibold tracking-tight text-white">{d.title}</h3>
                <p className="mt-1 text-sm font-light text-slate-400">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

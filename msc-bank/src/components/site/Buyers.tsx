import { Check, Zap } from "lucide-react";
import { surface } from "@/components/ledger/Card";
import { LiveStatus } from "@/components/ledger/Chips";
import { Reveal } from "@/components/ledger/Reveal";
import { SectionFrame, SectionHeader } from "@/components/ledger/Section";
import { TypingTerminal } from "@/components/ledger/Terminal";
import { cn } from "@/components/ledger/cn";

const beneficios = [
  "Fornecedores com caixa entregam no prazo",
  "Você continua pagando no mesmo vencimento",
  "Confirmação de notas em lote, por CSV",
  "Painel da cadeia com indicadores para o relatório ESG",
];

const log = [
  "nota: 4512 importada via CSV",
  "comprador: confirmou R$ 50.000,00",
  "fornecedor: solicitou antecipação",
  "operador: limites ok, aprovada",
  "financiador: pagamento enviado",
  "status: PAGA_AO_FORNECEDOR",
];

export function Buyers() {
  return (
    <SectionFrame id="compradores">
      <SectionHeader eyebrow="Para compradores âncora" title="Uma cadeia de fornecedores mais forte.">
        Você confirma as notas que já ia pagar. Seus fornecedores ganham acesso a crédito mais barato, e sua empresa ganha um programa de
        desenvolvimento de fornecedores com dados para o relatório ESG.
      </SectionHeader>
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal as="article" className={cn(surface.card, "p-6 sm:p-8")}>
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Programa de fornecedores</h3>
            <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-bold tracking-wide text-emerald-400 uppercase">
              Sem custo de caixa
            </span>
          </div>
          <p className="mt-3 text-sm font-light text-slate-400">
            O pagamento da nota continua no vencimento combinado. A cessão ao financiador é registrada no contrato do programa e no aceite
            dentro da plataforma.
          </p>
          <ul className="mt-6 grid gap-3">
            {beneficios.map((b) => (
              <li key={b} className={cn(surface.row, "flex items-center gap-3 px-4 py-3 text-sm text-slate-300")}>
                <Check className="size-4 shrink-0 text-emerald-500" strokeWidth={2.5} />
                {b}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className={cn(surface.card, "flex flex-col p-6 hover:border-emerald-500/30 sm:p-8")}>
          <div className="relative">
            <TypingTerminal lines={log} className="h-56" />
            <div className="absolute top-4 right-4 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 backdrop-blur-sm">
              <LiveStatus>Rastreável</LiveStatus>
            </div>
          </div>
          <h3 className="mt-6 flex items-center gap-2 text-xl font-semibold tracking-tight text-white">
            <Zap className="size-5 text-emerald-400" /> Cada passo registrado
          </h3>
          <p className="mt-2 text-sm font-light text-slate-400">
            Quem confirmou, quem aprovou, quando o dinheiro saiu e quando foi liquidado. Trilha de auditoria em todas as notas.
          </p>
        </Reveal>
      </div>
    </SectionFrame>
  );
}

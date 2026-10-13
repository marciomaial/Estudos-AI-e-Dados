import { Factory, Repeat, TrendingDown, Users } from "lucide-react";
import { surface } from "@/components/ledger/Card";
import { Reveal } from "@/components/ledger/Reveal";
import { SectionFrame, SectionHeader } from "@/components/ledger/Section";
import { cn } from "@/components/ledger/cn";

/** Metas da beta (seção 10 da especificação). São metas, não resultados. */
const metas = [
  { icon: Users, valor: "≥ 10", label: "fornecedores ativos em 3 meses" },
  { icon: Repeat, valor: "≥ 60%", label: "antecipam mais de uma vez" },
  { icon: TrendingDown, valor: "< cheque especial", label: "custo médio, sempre abaixo do teto" },
  { icon: Factory, valor: "0", label: "erros de conciliação" },
];

export function Impact() {
  return (
    <SectionFrame id="impacto">
      <SectionHeader eyebrow="Impacto" title="Crédito acessível para quem produz.">
        O MSC Bank nasce alinhado ao ODS 9, meta 9.3: ampliar o acesso de pequenas indústrias a crédito e integrá-las às cadeias de valor.
        Um teto de custo mensal, aprovado por um Comitê de Impacto, protege o fornecedor.
      </SectionHeader>
      <p className="mb-4 text-xs font-semibold tracking-wider text-neutral-500 uppercase">Metas da beta</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metas.map((m, i) => (
          <Reveal key={m.label} delay={0.1 * i} className={cn(surface.inner, "p-6")}>
            <m.icon className="size-5 text-emerald-400" strokeWidth={1.5} />
            <p className="mt-5 text-3xl font-semibold tracking-tight text-white">{m.valor}</p>
            <p className="mt-1 text-sm text-neutral-500">{m.label}</p>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}

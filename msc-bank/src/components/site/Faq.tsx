import { Plus } from "lucide-react";
import { surface } from "@/components/ledger/Card";
import { Reveal } from "@/components/ledger/Reveal";
import { SectionFrame, SectionHeader } from "@/components/ledger/Section";
import { cn } from "@/components/ledger/cn";

const perguntas = [
  {
    q: "Isso é um empréstimo?",
    a: "Não. Você vende ao financiador parceiro o direito de receber uma nota que seu cliente já confirmou. No vencimento, o cliente paga o financiador. Você não fica com uma dívida nova.",
  },
  {
    q: "Quanto custa?",
    a: "O desconto do financiador, proporcional ao prazo, mais a tarifa MSC. Antes de pedir, você vê o custo total em reais e o equivalente ao mês. Use o simulador acima.",
  },
  {
    q: "Quais notas posso antecipar?",
    a: "Notas confirmadas pelo comprador âncora do programa, com vencimento entre 15 e 120 dias e valor a partir de R$ 1.000.",
  },
  {
    q: "Preciso dar garantia?",
    a: "Não na beta. A análise se baseia no comprador que vai pagar a nota.",
  },
  {
    q: "Em quanto tempo recebo?",
    a: "Depois da aprovação, o financiador parceiro faz o pagamento direto na conta da sua empresa. Você acompanha cada etapa pela plataforma e por e-mail.",
  },
  {
    q: "Funciona no celular?",
    a: "Sim. A plataforma é web e foi pensada para ser usada no celular, inclusive abrindo um link pelo WhatsApp.",
  },
];

export function Faq() {
  return (
    <SectionFrame id="perguntas">
      <SectionHeader eyebrow="Perguntas" title="O que todo mundo pergunta." />
      <div className="grid gap-3">
        {perguntas.map((p, i) => (
          <Reveal key={p.q} delay={0.05 * i}>
            <details className={cn(surface.row, "group p-0 open:border-emerald-500/20")}>
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-white [&::-webkit-details-marker]:hidden">
                <span className="font-medium">{p.q}</span>
                <Plus className="size-4 shrink-0 text-neutral-400 transition-transform duration-300 ease-ledger group-open:rotate-45" />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed font-light text-slate-400">{p.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}

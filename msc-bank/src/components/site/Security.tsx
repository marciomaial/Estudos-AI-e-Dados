import { FileCheck, Globe2, Lock, Scale } from "lucide-react";
import { surface } from "@/components/ledger/Card";
import { Reveal } from "@/components/ledger/Reveal";
import { SectionFrame, SectionHeader } from "@/components/ledger/Section";
import { cn } from "@/components/ledger/cn";

const itens = [
  { icon: Globe2, title: "Financiador parceiro", text: "O dinheiro vem de um FIDC ou cooperativa com estrutura legal para comprar recebíveis." },
  { icon: Scale, title: "Teto de custo", text: "Taxa + tarifa nunca passam do teto mensal definido para cada programa." },
  { icon: FileCheck, title: "Trilha de auditoria", text: "Toda mudança de status fica registrada, com data, hora e responsável." },
  { icon: Lock, title: "LGPD", text: "Coletamos só o necessário. Seus dados bancários nunca aparecem em logs." },
];

export function Security() {
  return (
    <SectionFrame id="seguranca">
      <SectionHeader eyebrow="Transparência" title="Claro sobre quem faz o quê." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {itens.map((it, i) => (
          <Reveal key={it.title} delay={0.1 * i} className={cn(surface.tile, "p-6")}>
            <it.icon className="size-6 text-slate-400" strokeWidth={1.5} />
            <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">{it.title}</h3>
            <p className="mt-2 text-sm font-light text-slate-400">{it.text}</p>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}

import { BadgeCheck, Calculator, FileCheck, Landmark, ShieldCheck } from "lucide-react";
import { surface } from "@/components/ledger/Card";
import { Reveal } from "@/components/ledger/Reveal";
import { SectionFrame, SectionHeader } from "@/components/ledger/Section";
import { cn } from "@/components/ledger/cn";

const passos = [
  { icon: FileCheck, title: "Seu cliente confirma a nota", text: "O comprador âncora confirma valor e vencimento na plataforma." },
  { icon: Calculator, title: "Você simula", text: "Escolhe as notas e vê quanto recebe hoje e quanto custa, em reais." },
  { icon: BadgeCheck, title: "Nós aprovamos", text: "Conferimos limites e enviamos ao financiador parceiro." },
  { icon: Landmark, title: "Dinheiro na conta", text: "O financiador paga você. No vencimento, o comprador paga o financiador." },
];

export function HowItWorks() {
  return (
    <SectionFrame id="como-funciona">
      <SectionHeader eyebrow="Como funciona" title="Quatro passos, nenhum jargão.">
        A taxa é menor porque quem paga no vencimento é o seu cliente, uma empresa maior e mais sólida.
      </SectionHeader>
      <Reveal className={cn(surface.card, "group relative isolate overflow-hidden p-6 sm:p-10")}>
        <div
          aria-hidden
          className="absolute -top-32 -right-32 -z-10 size-96 rounded-full bg-emerald-500/10 blur-[100px] transition-colors duration-500 group-hover:bg-emerald-500/20"
        />
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <span className="grid size-12 place-items-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
              <ShieldCheck className="size-6 text-emerald-400" strokeWidth={1.5} />
            </span>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Antecipação com a força do seu cliente</h3>
            <p className="mt-3 text-sm leading-relaxed font-light text-slate-400 sm:text-base">
              Você só antecipa notas que o comprador já reconheceu. Por isso o risco é dele, e o custo cai. Tudo fica registrado: quem
              confirmou, quando, e quanto foi pago.
            </p>
          </div>
        </div>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {passos.map((p, i) => (
            <li key={p.title} className={cn(surface.tile, "p-5")}>
              <div className="flex items-center justify-between">
                <p.icon className="size-6 text-slate-400" strokeWidth={1.5} />
                <span className="font-mono text-xs text-neutral-600">0{i + 1}</span>
              </div>
              <h4 className="mt-5 font-semibold tracking-tight text-white">{p.title}</h4>
              <p className="mt-2 text-sm font-light text-slate-400">{p.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </SectionFrame>
  );
}

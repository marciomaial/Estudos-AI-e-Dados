import { LiveStatus } from "@/components/ledger/Chips";
import { Eyebrow } from "@/components/ledger/Section";
import { InterestForm } from "./InterestForm";
import { Logo } from "./Logo";

const colunas = [
  { titulo: "Produto", links: [["Como funciona", "#como-funciona"], ["Simulador", "#simulador"], ["Para compradores", "#compradores"]] },
  { titulo: "MSC Bank", links: [["Impacto", "#impacto"], ["Transparência", "#seguranca"], ["Perguntas", "#perguntas"]] },
  { titulo: "Legal", links: [["Termos de uso", "/termos"], ["Privacidade", "/privacidade"]] },
] as const;

export function Footer() {
  return (
    <footer id="participar" className="mx-auto w-full max-w-7xl scroll-mt-28 px-4 pb-8 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card p-6 sm:p-10 lg:p-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_40%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-t from-emerald-950/20 to-transparent" />

        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow>Beta aberta</Eyebrow>
            <h2 className="mt-5 text-3xl font-light tracking-tight text-white sm:text-4xl">Quer participar da beta?</h2>
            <p className="mt-4 max-w-[50ch] font-light text-slate-400">
              Estamos montando o primeiro programa com um comprador âncora e de 10 a 20 fornecedores. Deixe seu contato.
            </p>
            <div className="mt-8">
              <InterestForm />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:pt-14">
            {colunas.map((c) => (
              <div key={c.titulo}>
                <p className="text-sm font-semibold text-white">{c.titulo}</p>
                <ul className="mt-4 grid gap-3 text-sm text-slate-500">
                  {c.links.map(([label, href]) => (
                    <li key={href}>
                      <a href={href} className="transition-colors duration-300 hover:text-emerald-400">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-14 flex flex-col gap-6 border-t border-white/5 pt-8 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <Logo className="text-sm" />
            <span>© {new Date().getFullYear()} MSC Bank · projeto em fase beta</span>
          </div>
          <LiveStatus>Beta em construção</LiveStatus>
        </div>
        <p className="relative mt-6 max-w-3xl text-[11px] leading-relaxed text-neutral-500">
          O MSC Bank é uma plataforma de originação e não é instituição financeira. As operações de antecipação são realizadas por
          financiador parceiro autorizado. Simulações com taxas ilustrativas; condições finais definidas em contrato.
        </p>

        <p aria-hidden className="relative mt-10 -mb-[3vw] text-center text-[13vw] leading-none font-bold tracking-tighter text-white/5 select-none">
          MSC BANK
        </p>
      </div>
    </footer>
  );
}

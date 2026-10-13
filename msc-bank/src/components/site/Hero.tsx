import { BookOpen, Zap } from "lucide-react";
import { ButtonLink } from "@/components/ledger/Button";
import { surface } from "@/components/ledger/Card";
import { AnnouncementPill } from "@/components/ledger/Chips";
import { CountUp } from "@/components/ledger/CountUp";
import { BarStack } from "@/components/ledger/Figures";
import { cn } from "@/components/ledger/cn";
import { formatBRL, formatPct } from "@/lib/format";
import { CONFIG_REFERENCIA, simular } from "@/lib/pricing";

const exemplo = simular([{ valor: 50_000, dias: 60 }], CONFIG_REFERENCIA);
const d = (s: number) => ({ animationDelay: `${s}s` });

function HeroBackground() {
  return (
    <div className="hero-aurora" aria-hidden>
      <span className="beam left-[30%]" style={{ ["--r0" as string]: "-24deg", ["--r1" as string]: "-8deg" }} />
      <span className="beam left-1/2" style={{ ["--r0" as string]: "-6deg", ["--r1" as string]: "8deg", animationDuration: "16s" }} />
      <span className="beam left-[70%]" style={{ ["--r0" as string]: "10deg", ["--r1" as string]: "26deg", animationDuration: "14s" }} />
      <span className="noise" />
      <span className="fog" />
    </div>
  );
}

/** Card de métrica do hero: valor líquido do exemplo da especificação + recebíveis do mês. */
function MetricCard() {
  return (
    <div className={cn(surface.card, "relative w-full max-w-lg overflow-hidden rounded-[1.2em] p-6 hover:border-emerald-500/20 sm:p-8")}>
      <div aria-hidden className="absolute inset-0 -z-0 bg-emerald-500/5" />
      <div className="relative">
        <p className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">Exemplo · nota de {formatBRL(exemplo.valorBruto)} em 60 dias</p>
        <CountUp
          to={exemplo.valorLiquido}
          loop
          format="brl"
          className="mt-3 block text-5xl font-light tracking-tight text-white tabular sm:text-6xl"
        />
        <p className="mt-1 text-sm text-slate-400">na sua conta hoje</p>

        <div className="mt-8 flex items-end justify-between text-xs text-neutral-500">
          <span>A receber das suas notas confirmadas</span>
          <span className="text-emerald-400">próx. 90 dias</span>
        </div>
        <BarStack loop values={[18, 32, 26, 44, 38, 52, 30]} labels={["S1", "S2", "S3", "S4", "S5", "S6", "S7"]} className="mt-3" />

        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/5 pt-5 text-sm">
          <div>
            <p className="text-2xl font-semibold tracking-tight text-white tabular">{formatBRL(exemplo.custoTotal)}</p>
            <p className="text-xs text-neutral-500">custo total, em reais</p>
          </div>
          <div>
            <p className="text-2xl font-semibold tracking-tight text-white tabular">{formatPct(exemplo.custoAmEquiv)}</p>
            <p className="text-xs text-neutral-500">ao mês, equivalente</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative isolate -mt-24 overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <HeroBackground />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="anim-in" style={d(0.1)}>
            <AnnouncementPill tag="Beta">Antecipação para fornecedores da indústria</AnnouncementPill>
          </div>
          <h1 className="anim-in mt-7 text-5xl leading-[1.1] font-light tracking-tight text-white sm:text-7xl" style={d(0.2)}>
            Receba hoje pelo que você <span className="text-emerald-400">já vendeu.</span>
          </h1>
          <p className="anim-in mt-6 max-w-xl text-lg leading-relaxed text-slate-400" style={d(0.3)}>
            Antecipe notas fiscais confirmadas pelo seu cliente e pague uma taxa baseada no risco dele, não no seu. Sem cheque especial,
            sem esperar 60 ou 90 dias para comprar matéria-prima e pagar a folha.
          </p>
          <div className="anim-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={d(0.4)}>
            <ButtonLink href="#simulador" variant="shiny" size="lg">
              <Zap className="size-5 text-emerald-400" /> Simular antecipação
            </ButtonLink>
            <ButtonLink href="#compradores" variant="outline" size="lg" className="group">
              <BookOpen className="size-5 text-slate-400 transition-colors group-hover:text-white" /> Sou comprador âncora
            </ButtonLink>
          </div>
          <p className="anim-in mt-6 text-xs text-neutral-500" style={d(0.5)}>
            Valores ilustrativos. Taxas finais definidas com o financiador parceiro.
          </p>
        </div>
        <div className="anim-in flex justify-center lg:justify-end" style={d(0.6)}>
          <MetricCard />
        </div>
      </div>
    </section>
  );
}

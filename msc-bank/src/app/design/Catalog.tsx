"use client";

import { Bell, FileCheck, Inbox, LayoutDashboard, LineChart, Scale, Settings, ShieldCheck, Upload, Users, Wallet, Zap } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ledger/Button";
import { Card, GlowOrbs, surface } from "@/components/ledger/Card";
import { AnnouncementPill, DeltaChip, LiveStatus, STATUS_LIST, StatusChip } from "@/components/ledger/Chips";
import { SegmentedRange, Toggle, fieldClass } from "@/components/ledger/Controls";
import { AreaChart } from "@/components/ledger/AreaChart";
import { BalanceFigure, BarStack, KpiCard } from "@/components/ledger/Figures";
import { FlashlightCard } from "@/components/ledger/Flashlight";
import { Eyebrow } from "@/components/ledger/Section";
import { TypingTerminal } from "@/components/ledger/Terminal";
import { cn } from "@/components/ledger/cn";

const grupos = [
  ["tipografia", "Tipografia"],
  ["cores", "Cores"],
  ["superficies", "Superfícies"],
  ["icones", "Ícones"],
  ["motion", "Motion"],
  ["acoes", "Ações"],
  ["status", "Status"],
  ["controles", "Controles"],
  ["dados", "Dados"],
] as const;

function Grupo({ id, n, title, children }: { id: string; n: number; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-white/5 py-14 first:border-0 first:pt-0">
      <p className="text-xs font-semibold tracking-[0.06em] text-emerald-400 uppercase">{String(n).padStart(2, "0")}</p>
      <h2 className="mt-2 text-3xl font-light tracking-tight text-white">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Meta({ children }: { children: ReactNode }) {
  return <code className="mt-2 block font-mono text-[11px] text-neutral-500">{children}</code>;
}

const tipos = [
  ["Display · hero", "text-5xl sm:text-7xl font-light tracking-tight leading-[1.1]", "Receba hoje"],
  ["H2 · seção", "text-3xl sm:text-5xl font-light tracking-tight", "Como funciona"],
  ["H3 · feature", "text-2xl sm:text-3xl font-semibold tracking-tight", "Antecipação simples"],
  ["Stat value", "text-3xl font-semibold tracking-tight tabular", "R$ 42.805"],
  ["H4 · card", "text-xl font-semibold tracking-tight", "Notas elegíveis"],
  ["Lead", "text-lg leading-relaxed text-slate-400", "Antecipe notas confirmadas pelo seu cliente."],
  ["Texto card", "text-sm font-light text-slate-400", "Você só antecipa notas que o comprador reconheceu."],
  ["UI label", "text-sm font-medium text-white", "Minhas antecipações"],
  ["Overline", "text-[11px] font-semibold uppercase tracking-wider text-neutral-600", "Antecipação"],
  ["Micro", "text-[10px] text-neutral-500", "Hoje, 09:41"],
  ["Mono", "font-mono text-[11px] text-emerald-400", "NF 000.004.512"],
] as const;

const cores: [string, string, string][] = [
  ["Canvas", "#000000", "bg-canvas"],
  ["Card", "#0A0B0E", "bg-card"],
  ["App", "#0C0D10", "bg-app"],
  ["Inner", "#121317", "bg-inner"],
  ["Track", "#14181F", "bg-track"],
  ["Tooltip", "#1A1B20", "bg-tooltip"],
  ["Acento", "#10B981", "bg-emerald-500"],
  ["Texto de acento", "#34D399", "bg-emerald-400"],
  ["Negativo", "#F43F5E", "bg-rose-500"],
  ["Aviso", "#FACC15", "bg-yellow-400"],
  ["Secundário", "#A855F7", "bg-purple-500"],
  ["Texto secundário", "#94A3B8", "bg-slate-400"],
];

const icones = [
  [LayoutDashboard, "Início"],
  [FileCheck, "Notas"],
  [Zap, "Antecipar"],
  [Wallet, "Antecipações"],
  [LineChart, "Saúde financeira"],
  [Users, "Fornecedores"],
  [Upload, "Importar CSV"],
  [Inbox, "Filas"],
  [Scale, "Teto de custo"],
  [Settings, "Configuração"],
  [ShieldCheck, "Segurança"],
  [Bell, "Notificações"],
] as const;

export function Catalog() {
  const [range, setRange] = useState<"30" | "60" | "90">("60");
  const [acc, setAcc] = useState<"7d" | "30d" | "90d">("30d");
  const [tog, setTog] = useState(true);
  const [replay, setReplay] = useState(0);

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[224px_minmax(0,1fr)]">
      <aside className="top-6 hidden self-start rounded-3xl border border-white/10 bg-card/90 p-3 backdrop-blur-xl lg:sticky lg:block">
        <p className="px-3 pt-2 pb-3 text-[11px] font-semibold tracking-wider text-neutral-500 uppercase">MSC Bank · Ledger</p>
        {grupos.map(([id, label], i) => (
          <a key={id} href={`#${id}`} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white">
            <b className="font-mono text-[11px] font-medium text-neutral-500">{String(i + 1).padStart(2, "0")}</b>
            {label}
          </a>
        ))}
      </aside>

      <main className="min-w-0">
        <header className="mb-14">
          <Eyebrow>Design system</Eyebrow>
          <h1 className="mt-5 text-4xl font-light tracking-tight text-white sm:text-6xl">Catálogo MSC Bank</h1>
          <p className="mt-4 max-w-[60ch] text-lg font-light text-slate-400">
            Tokens e componentes da linguagem Ledger, adaptados para o MSC Bank. Fonte única para o site e para a plataforma.
          </p>
        </header>

        <Grupo id="tipografia" n={1} title="Tipografia">
          <div className="divide-y divide-white/5 border-y border-white/5">
            {tipos.map(([role, cls, sample]) => (
              <div key={role} className="grid gap-3 py-6 md:grid-cols-[200px_minmax(0,1fr)] md:items-center">
                <div>
                  <p className="text-sm font-medium text-white">{role}</p>
                  <Meta>{cls}</Meta>
                </div>
                <p className={cn("text-white", cls)}>{sample}</p>
              </div>
            ))}
          </div>
        </Grupo>

        <Grupo id="cores" n={2} title="Cores">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cores.map(([nome, hex, cls]) => (
              <div key={nome} className="flex items-center gap-4">
                <span className={cn("size-16 shrink-0 rounded-2xl ring-1 ring-white/10", cls)} />
                <div>
                  <p className="text-sm font-medium text-white">{nome}</p>
                  <code className="font-mono text-xs text-slate-300">{hex}</code>
                  <Meta>{cls}</Meta>
                </div>
              </div>
            ))}
          </div>
        </Grupo>

        <Grupo id="superficies" n={3} title="Superfícies">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(surface) as (keyof typeof surface)[]).map((k) => (
              <Card key={k} kind={k} className="p-6">
                <p className="text-sm font-medium text-white capitalize">{k}</p>
                <Meta>surface.{k}</Meta>
              </Card>
            ))}
            <div className={cn(surface.card, "relative isolate overflow-hidden p-6")}>
              <GlowOrbs />
              <p className="text-sm font-medium text-white">Glow orbs</p>
              <Meta>emerald-500/10 · purple-500/10 · blur-[120px]</Meta>
            </div>
          </div>
        </Grupo>

        <Grupo id="icones" n={4} title="Ícones">
          <p className="mb-6 text-sm text-slate-400">Lucide, stroke 1.5. 16px na sidebar, 20–24px em cards.</p>
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-6">
            {icones.map(([Icon, label]) => (
              <div key={label} className="flex flex-col gap-3">
                <Icon className="size-6 text-slate-400" strokeWidth={1.5} />
                <span className="text-xs text-slate-300">{label}</span>
              </div>
            ))}
          </div>
        </Grupo>

        <Grupo id="motion" n={5} title="Motion">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className={cn(surface.card, "p-6")}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Blur-up entrance</p>
                <Button variant="ghost" size="sm" onClick={() => setReplay((r) => r + 1)}>
                  Repetir
                </Button>
              </div>
              <div key={replay} className="mt-6 grid gap-3">
                <div className="anim-in" style={{ animationDelay: "0.1s" }}>
                  <AnnouncementPill tag="Beta">Antecipação</AnnouncementPill>
                </div>
                <p className="anim-in text-3xl font-light tracking-tight text-white" style={{ animationDelay: "0.2s" }}>
                  Receba hoje.
                </p>
                <p className="anim-in text-sm text-slate-400" style={{ animationDelay: "0.3s" }}>
                  0.8s ease-out · delays 0.1 → 0.6s
                </p>
              </div>
            </div>
            <div className={cn(surface.card, "p-6")}>
              <p className="text-sm font-medium text-white">Bar cycle (loop só no site)</p>
              <BarStack loop values={[20, 35, 28, 50, 42, 60, 38]} className="mt-6" />
              <Meta>barCycle 6s cubic-bezier(.33,1,.68,1) · stagger 100ms</Meta>
            </div>
            <div className={cn(surface.card, "p-6")}>
              <p className="text-sm font-medium text-white">Typing log</p>
              <TypingTerminal className="mt-6 h-36" lines={["nota: 4512 confirmada", "antecipação: aprovada", "status: PAGA_AO_FORNECEDOR"]} />
            </div>
            <div className={cn(surface.card, "p-6")}>
              <p className="text-sm font-medium text-white">Easing e durações</p>
              <dl className="mt-6 grid gap-3 text-sm">
                {[
                  ["ease-ledger", "cubic-bezier(.25,1,.5,1)", "toggles, carrossel, sheets"],
                  ["ease-ledger-std", "cubic-bezier(.4,0,.2,1)", "hover de cores e bordas"],
                  ["300 ms", "UI", "hover, toggle, recalcular simulador"],
                  ["700–800 ms", "coreografia", "entradas e trocas de card"],
                ].map(([k, v, u]) => (
                  <div key={k} className="grid grid-cols-[120px_1fr] gap-3 border-t border-white/5 pt-3">
                    <dt className="font-mono text-xs text-emerald-400">{k}</dt>
                    <dd className="text-slate-300">
                      {v} <span className="block text-xs text-neutral-500">{u}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Grupo>

        <Grupo id="acoes" n={6} title="Ações">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="shiny" size="lg">
              <Zap className="size-5 text-emerald-400" /> Solicitar antecipação
            </Button>
            <Button variant="white">Antecipar agora</Button>
            <Button variant="outline">Entrar</Button>
            <Button variant="ghost">Opções</Button>
            <Button variant="accent" size="sm">
              Importar CSV
            </Button>
            <Button variant="pill">Ver detalhes</Button>
          </div>
          <p className="mt-6 text-sm text-slate-400">Regra: uma ação primária (shiny ou white) por tela.</p>
        </Grupo>

        <Grupo id="status" n={7} title="Status e feedback">
          <div className="flex flex-wrap gap-2">
            {STATUS_LIST.map((s) => (
              <StatusChip key={s} status={s} />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <DeltaChip>12,4%</DeltaChip>
            <DeltaChip negative>+4,2%</DeltaChip>
            <AnnouncementPill tag="Novo">Nota confirmada</AnnouncementPill>
            <LiveStatus>Plataforma operando</LiveStatus>
            <span className="relative text-neutral-400">
              <Bell className="size-[18px]" strokeWidth={1.5} />
              <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full border border-app bg-yellow-400" />
            </span>
          </div>
        </Grupo>

        <Grupo id="controles" n={8} title="Controles">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="grid gap-6">
              <SegmentedRange
                label="Prazo"
                value={range}
                onChange={setRange}
                options={[
                  { value: "30", label: "15–30d" },
                  { value: "60", label: "31–60d" },
                  { value: "90", label: "61–120d" },
                ]}
              />
              <SegmentedRange
                label="Período"
                tone="accent"
                value={acc}
                onChange={setAcc}
                options={[
                  { value: "7d", label: "7D" },
                  { value: "30d", label: "30D" },
                  { value: "90d", label: "90D" },
                ]}
              />
              <Toggle checked={tog} onChange={setTog} left="Só MSC Bank" right="Comparar" label="Comparar" />
            </div>
            <div className="grid gap-3">
              <label className="text-sm font-medium text-white" htmlFor="demo-campo">
                Campo
              </label>
              <input id="demo-campo" className={fieldClass} placeholder="00.000.000/0000-00" />
              <Meta>bg-inner · border-white/5 · hover inner-hover · focus emerald-500/30</Meta>
            </div>
          </div>
        </Grupo>

        <Grupo id="dados" n={9} title="Dados">
          <div className="grid gap-5 md:grid-cols-3">
            <KpiCard label="A receber em 30 dias" value="R$ 84.230" delta={<DeltaChip>12,4%</DeltaChip>} />
            <KpiCard label="Em antecipação" value="R$ 36.210" />
            <KpiCard label="Notas aguardando" value="7" icon={<FileCheck className="size-4" />} />
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
            <div className={cn(surface.elevated, "p-6")}>
              <div aria-hidden className="absolute -top-10 -right-10 size-40 rounded-full bg-emerald-500/5 blur-[40px]" />
              <p className="text-sm text-neutral-400">Disponível para antecipar</p>
              <BalanceFigure value={48_100} className="mt-3" />
              <div className="mt-6 flex gap-3">
                <Button variant="white" size="sm" className="flex-1 rounded-lg">
                  Antecipar agora
                </Button>
                <Button variant="ghost" size="sm" className="rounded-lg">
                  Ver notas
                </Button>
              </div>
            </div>
            <div className={cn(surface.inner, "p-6")}>
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-500">Faturamento confirmado</p>
                <span className="flex items-center gap-3 text-[10px] text-neutral-500">
                  <span className="flex items-center gap-1">
                    <span className="h-0.5 w-3 bg-emerald-400" /> MSC
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-0 w-3 border-t border-dashed border-yellow-400/50" /> referência
                  </span>
                </span>
              </div>
              <AreaChart
                className="mt-4"
                ariaLabel="Faturamento confirmado por mês, exemplo"
                series={[20, 28, 25, 34, 40, 38, 47, 52, 58]}
                comparison={[18, 22, 24, 26, 30, 31, 33, 36, 38]}
                labels={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"]}
              />
            </div>
          </div>
          <FlashlightCard className="mt-5 p-8">
            <p className="text-sm font-medium text-white">Flashlight card</p>
            <p className="mt-2 text-sm text-slate-400">Passe o cursor: a borda esmeralda segue o mouse.</p>
          </FlashlightCard>
        </Grupo>
      </main>
    </div>
  );
}

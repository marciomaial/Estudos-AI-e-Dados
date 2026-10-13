"use client";

import { ArrowRight, Info } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { ButtonLink } from "@/components/ledger/Button";
import { surface } from "@/components/ledger/Card";
import { Toggle, fieldClass } from "@/components/ledger/Controls";
import { BalanceFigure } from "@/components/ledger/Figures";
import { FlashlightCard } from "@/components/ledger/Flashlight";
import { Reveal } from "@/components/ledger/Reveal";
import { SectionFrame, SectionHeader } from "@/components/ledger/Section";
import { cn } from "@/components/ledger/cn";
import { formatBRL, formatPct, somenteDigitos } from "@/lib/format";
import { CONFIG_REFERENCIA, TAXA_CHEQUE_ESPECIAL_REFERENCIA_AM, custoChequeEspecial, simular } from "@/lib/pricing";

const PRAZO_MIN = 15;
const PRAZO_MAX = 120;
const VALOR_MIN = 1_000;

function Linha({ label, value, hint, strong }: { label: string; value: string; hint?: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/5 py-3 last:border-0">
      <dt className="flex items-center gap-1.5 text-sm text-slate-400">
        {label}
        {hint && (
          <span className="group relative">
            <Info className="size-3.5 text-neutral-500" aria-hidden />
            <span className="sr-only">{hint}</span>
            <span
              aria-hidden
              className={cn(
                surface.glass,
                "pointer-events-none absolute bottom-6 left-1/2 z-10 w-56 -translate-x-1/2 p-3 text-xs text-slate-300 opacity-0 transition-opacity group-hover:opacity-100",
              )}
            >
              {hint}
            </span>
          </span>
        )}
      </dt>
      <dd className={cn("tabular", strong ? "font-semibold text-white" : "text-slate-300")}>{value}</dd>
    </div>
  );
}

export function Simulator() {
  const id = useId();
  const [valorTxt, setValorTxt] = useState("50000");
  const [dias, setDias] = useState(60);
  const [comparar, setComparar] = useState(true);

  const valor = Number(valorTxt) || 0;
  const valido = valor >= VALOR_MIN;

  const r = useMemo(() => (valido ? simular([{ valor, dias }], CONFIG_REFERENCIA) : null), [valido, valor, dias]);
  const cheque = r ? custoChequeEspecial(r.valorLiquido, dias, TAXA_CHEQUE_ESPECIAL_REFERENCIA_AM) : 0;
  const economia = r ? cheque - r.custoTotal : 0;

  return (
    <SectionFrame id="simulador">
      <SectionHeader eyebrow="Simulador" title="Quanto cai na sua conta hoje?">
        Digite o valor da nota e quantos dias faltam para o vencimento. Você vê o valor líquido e o custo em reais, sem letra miúda.
      </SectionHeader>

      <Reveal>
        <FlashlightCard className="grid overflow-hidden lg:grid-cols-[1fr_1.15fr]">
          {/* painel de entrada (plan panel do Ledger) */}
          <div className="border-b border-white/5 bg-inner/80 p-6 backdrop-blur-sm sm:p-8 lg:border-r lg:border-b-0">
            <h3 className="text-xl font-semibold tracking-tight text-white">Sua nota fiscal</h3>
            <p className="mt-2 text-sm font-light text-slate-400">Notas confirmadas pelo comprador, de {formatBRL(VALOR_MIN)} para cima.</p>

            <label htmlFor={`${id}-valor`} className="mt-8 block text-sm font-medium text-white">
              Valor da nota
            </label>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-neutral-500">R$</span>
              <input
                id={`${id}-valor`}
                inputMode="numeric"
                autoComplete="off"
                value={valor ? valor.toLocaleString("pt-BR") : ""}
                onChange={(e) => setValorTxt(somenteDigitos(e.target.value).slice(0, 10))}
                aria-invalid={!valido}
                aria-describedby={`${id}-valor-msg`}
                className={cn(fieldClass, "min-h-12 pl-10 text-base")}
                placeholder="50.000"
              />
            </div>
            <p id={`${id}-valor-msg`} className={cn("mt-2 text-xs", valido ? "text-neutral-500" : "text-rose-500")}>
              {valido ? "Sem centavos, só para simular." : `Valor mínimo por nota: ${formatBRL(VALOR_MIN)}.`}
            </p>

            <div className="mt-8 flex items-baseline justify-between">
              <label htmlFor={`${id}-dias`} className="text-sm font-medium text-white">
                Dias até o vencimento
              </label>
              <span className="text-2xl font-semibold tracking-tight text-white tabular">{dias}</span>
            </div>
            <input
              id={`${id}-dias`}
              type="range"
              min={PRAZO_MIN}
              max={PRAZO_MAX}
              step={1}
              value={dias}
              onChange={(e) => setDias(Number(e.target.value))}
              className="mt-4 h-11 w-full cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-neutral-600">
              <span>{PRAZO_MIN} dias</span>
              <span>{PRAZO_MAX} dias</span>
            </div>

            <div className="mt-8">
              <Toggle checked={comparar} onChange={setComparar} left="Só MSC Bank" right="Comparar" label="Comparar com cheque especial" />
            </div>
          </div>

          {/* resultado */}
          <div className="p-6 sm:p-8" aria-live="polite">
            {r ? (
              <>
                <p className="text-sm text-neutral-500">Você recebe hoje</p>
                <BalanceFigure value={r.valorLiquido} className="mt-2 sm:text-5xl" />
                <p className="mt-3 text-sm text-slate-400">
                  em vez de <span className="text-white tabular">{formatBRL(r.valorBruto)}</span> daqui a {dias} dias.
                </p>

                <dl className="mt-8">
                  <Linha label="Valor da nota" value={formatBRL(r.valorBruto)} />
                  <Linha label="Desconto do financiador" hint="Deságio: desconto cobrado pelo financiador pelo prazo até o vencimento." value={`− ${formatBRL(r.desagio)}`} />
                  <Linha label="Tarifa MSC" hint="Remunera a plataforma, a análise e o atendimento." value={`− ${formatBRL(r.tarifaMsc)}`} />
                  <Linha label="Custo total" value={formatBRL(r.custoTotal)} strong />
                  <Linha label="Equivale a, por mês" value={formatPct(r.custoAmEquiv)} />
                </dl>

                {comparar && (
                  <div className={cn(surface.row, "mt-6 p-4")}>
                    <p className="text-sm text-slate-300">
                      No cheque especial, o mesmo valor pelo mesmo prazo custaria{" "}
                      <span className="font-semibold text-white tabular">{formatBRL(cheque)}</span>.
                    </p>
                    {economia > 0 && (
                      <p className="mt-2 text-sm font-semibold text-emerald-400">Você economiza {formatBRL(economia)}.</p>
                    )}
                    <p className="mt-2 text-[11px] text-neutral-500">
                      Referência: {formatPct(TAXA_CHEQUE_ESPECIAL_REFERENCIA_AM)} ao mês. A taxa do seu banco pode ser diferente.
                    </p>
                  </div>
                )}

                <ButtonLink href="#participar" variant="pill" className="mt-8 w-full sm:w-auto">
                  Quero antecipar minhas notas <ArrowRight className="size-4" />
                </ButtonLink>
              </>
            ) : (
              <p className="text-sm text-slate-400">Informe um valor de pelo menos {formatBRL(VALOR_MIN)} para ver a simulação.</p>
            )}
            <p className="mt-6 text-[11px] text-neutral-500">
              Simulação com taxas ilustrativas ({formatPct(CONFIG_REFERENCIA.taxaFinanciadorAm)} a.m. do financiador e{" "}
              {formatPct(CONFIG_REFERENCIA.tarifaMscPct)} de tarifa). As condições finais dependem do programa do seu comprador.
            </p>
          </div>
        </FlashlightCard>
      </Reveal>
    </SectionFrame>
  );
}

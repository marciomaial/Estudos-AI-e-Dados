/**
 * Cálculo da antecipação (seção 6 da especificação da beta).
 * Única fonte de verdade: usada pelo simulador público do site e pela plataforma.
 * Valores monetários em reais; arredondamento para centavos no fim de cada etapa.
 */

export type PricingConfig = {
  /** Taxa do financiador ao mês, em fração (1,4% → 0.014). */
  taxaFinanciadorAm: number;
  /** Tarifa MSC sobre o valor bruto, em fração (1% → 0.01). */
  tarifaMscPct: number;
};

export type NotaSimulada = {
  valor: number;
  /** Dias entre o pagamento ao fornecedor e o vencimento da nota. */
  dias: number;
};

export type Simulacao = {
  valorBruto: number;
  desagio: number;
  tarifaMsc: number;
  valorLiquido: number;
  custoTotal: number;
  /** Custo total sobre o valor bruto, em fração. */
  custoTotalPct: number;
  /** Custo mensal equivalente, em fração. */
  custoAmEquiv: number;
  /** Prazo médio ponderado pelo valor das notas. */
  diasMedios: number;
};

const centavos = (v: number) => Math.round(v * 100) / 100;

export function simular(notas: NotaSimulada[], config: PricingConfig): Simulacao {
  if (notas.length === 0) {
    return { valorBruto: 0, desagio: 0, tarifaMsc: 0, valorLiquido: 0, custoTotal: 0, custoTotalPct: 0, custoAmEquiv: 0, diasMedios: 0 };
  }
  for (const n of notas) {
    if (!(n.valor > 0)) throw new RangeError("O valor da nota precisa ser maior que zero.");
    if (!(n.dias > 0)) throw new RangeError("O prazo da nota precisa ser maior que zero.");
  }

  const valorBruto = centavos(notas.reduce((s, n) => s + n.valor, 0));
  const desagio = centavos(notas.reduce((s, n) => s + centavos(n.valor * config.taxaFinanciadorAm * (n.dias / 30)), 0));
  const tarifaMsc = centavos(valorBruto * config.tarifaMscPct);
  const custoTotal = centavos(desagio + tarifaMsc);
  const valorLiquido = centavos(valorBruto - custoTotal);
  const diasMedios = notas.reduce((s, n) => s + n.valor * n.dias, 0) / valorBruto;
  const custoTotalPct = custoTotal / valorBruto;
  const custoAmEquiv = Math.pow(1 + custoTotalPct, 30 / diasMedios) - 1;

  return { valorBruto, desagio, tarifaMsc, valorLiquido, custoTotal, custoTotalPct, custoAmEquiv, diasMedios };
}

/**
 * Juros que o fornecedor pagaria no cheque especial para ter o mesmo valor líquido
 * pelo mesmo prazo (juros compostos mensais). A taxa de referência é configurável pelo admin.
 */
export function custoChequeEspecial(valor: number, dias: number, taxaAm: number): number {
  return centavos(valor * (Math.pow(1 + taxaAm, dias / 30) - 1));
}

/** Taxas ilustrativas da especificação; a calibrar com o financiador parceiro. */
export const CONFIG_REFERENCIA: PricingConfig = { taxaFinanciadorAm: 0.014, tarifaMscPct: 0.01 };

/** Teto do cheque especial para pessoa física e MEI (Resolução CMN 4.765/2019); usado só como referência de comparação. */
export const TAXA_CHEQUE_ESPECIAL_REFERENCIA_AM = 0.08;

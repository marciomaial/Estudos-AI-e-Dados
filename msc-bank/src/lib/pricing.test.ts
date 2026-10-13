import { describe, expect, it } from "vitest";
import { CONFIG_REFERENCIA, custoChequeEspecial, simular } from "./pricing";

describe("simular", () => {
  it("reproduz o exemplo da especificação (R$ 50.000, 60 dias)", () => {
    const s = simular([{ valor: 50_000, dias: 60 }], CONFIG_REFERENCIA);
    expect(s.desagio).toBe(1_400);
    expect(s.tarifaMsc).toBe(500);
    expect(s.valorLiquido).toBe(48_100);
    expect(s.custoTotalPct).toBeCloseTo(0.038, 10);
    expect(s.custoAmEquiv).toBeCloseTo(0.0188, 4);
  });

  it("soma várias notas e pondera o prazo pelo valor", () => {
    const s = simular([{ valor: 10_000, dias: 30 }, { valor: 30_000, dias: 90 }], CONFIG_REFERENCIA);
    expect(s.valorBruto).toBe(40_000);
    expect(s.desagio).toBe(140 + 1_260);
    expect(s.diasMedios).toBe(75);
    expect(s.valorLiquido).toBe(40_000 - 1_400 - 400);
  });

  it("retorna zeros sem notas e rejeita valores inválidos", () => {
    expect(simular([], CONFIG_REFERENCIA).valorLiquido).toBe(0);
    expect(() => simular([{ valor: -1, dias: 30 }], CONFIG_REFERENCIA)).toThrow(RangeError);
    expect(() => simular([{ valor: 1_000, dias: 0 }], CONFIG_REFERENCIA)).toThrow(RangeError);
  });
});

describe("custoChequeEspecial", () => {
  it("compõe a taxa mensal pelo prazo", () => {
    expect(custoChequeEspecial(48_100, 60, 0.08)).toBe(8_003.84);
  });
});

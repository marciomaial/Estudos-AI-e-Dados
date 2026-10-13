import { describe, expect, it } from "vitest";
import { cnpjValido, formatBRL, formatPct, mascaraCNPJ, splitBRL } from "./format";

describe("format", () => {
  it("formata reais e percentuais no padrão brasileiro", () => {
    expect(formatBRL(48_100)).toBe("R$ 48.100,00");
    expect(splitBRL(1_234.5)).toEqual({ inteiro: "R$ 1.234", centavos: ",50" });
    expect(formatPct(0.0188)).toBe("1,88%");
  });

  it("aplica máscara de CNPJ progressivamente", () => {
    expect(mascaraCNPJ("11222333")).toBe("11.222.333");
    expect(mascaraCNPJ("11222333000181")).toBe("11.222.333/0001-81");
  });

  it("valida dígitos verificadores do CNPJ", () => {
    expect(cnpjValido("11.222.333/0001-81")).toBe(true);
    expect(cnpjValido("11.222.333/0001-82")).toBe(false);
    expect(cnpjValido("00000000000000")).toBe(false);
    expect(cnpjValido("123")).toBe(false);
  });
});

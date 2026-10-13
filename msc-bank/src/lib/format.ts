const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const pct = new Intl.NumberFormat("pt-BR", { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const data = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "America/Sao_Paulo" });

/** R$ 1.234,56 (com espaço comum, para não quebrar cópia/cola). */
export const formatBRL = (v: number) => brl.format(v).replace(/ /g, " ");

/** Divide o valor em parte inteira e centavos, para destacar a parte inteira (Balance figure do Ledger). */
export function splitBRL(v: number): { inteiro: string; centavos: string } {
  const s = formatBRL(v);
  const i = s.lastIndexOf(",");
  return { inteiro: s.slice(0, i), centavos: s.slice(i) };
}

/** 1,88% */
export const formatPct = (fracao: number) => pct.format(fracao).replace(/ /g, "");

/** dd/mm/aaaa */
export const formatData = (d: Date) => data.format(d);

export const somenteDigitos = (s: string) => s.replace(/\D/g, "");

/** 00.000.000/0000-00 (aplica a máscara de forma progressiva enquanto o usuário digita). */
export function mascaraCNPJ(valor: string): string {
  const d = somenteDigitos(valor).slice(0, 14);
  return d
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

/** Validação dos dígitos verificadores do CNPJ. */
export function cnpjValido(valor: string): boolean {
  const d = somenteDigitos(valor);
  if (d.length !== 14 || /^(\d)\1{13}$/.test(d)) return false;
  const dv = (base: string) => {
    const pesos = base.length === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const r = base.split("").reduce((s, c, i) => s + Number(c) * pesos[i], 0) % 11;
    return r < 2 ? 0 : 11 - r;
  };
  const d1 = dv(d.slice(0, 12));
  const d2 = dv(d.slice(0, 12) + d1);
  return d.endsWith(`${d1}${d2}`);
}

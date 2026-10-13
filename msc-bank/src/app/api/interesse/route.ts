import { NextResponse } from "next/server";
import { cnpjValido, somenteDigitos } from "@/lib/format";

const PERFIS = ["fornecedor", "comprador", "financiador"] as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Lista de interesse da beta.
 * TODO(sprint 1): gravar em Supabase (tabela `interessados`) e enviar e-mail de confirmação via Resend.
 * Até lá, apenas valida e registra no log do servidor, sem dados bancários.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ erro: "Requisição inválida." }, { status: 400 });
  }
  const { perfil, cnpj, email } = (body ?? {}) as Record<string, unknown>;

  if (typeof perfil !== "string" || !PERFIS.includes(perfil as (typeof PERFIS)[number])) {
    return NextResponse.json({ erro: "Escolha um perfil." }, { status: 400 });
  }
  if (typeof cnpj !== "string" || !cnpjValido(cnpj)) {
    return NextResponse.json({ erro: "CNPJ inválido." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ erro: "E-mail inválido." }, { status: 400 });
  }

  console.info("[interesse]", { perfil, cnpj: somenteDigitos(cnpj), criadoEm: new Date().toISOString() });
  return NextResponse.json({ ok: true }, { status: 201 });
}

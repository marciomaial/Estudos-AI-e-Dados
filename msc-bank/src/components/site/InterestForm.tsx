"use client";

import { ArrowRight, Check } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ledger/Button";
import { SegmentedRange, fieldClass } from "@/components/ledger/Controls";
import { cnpjValido, mascaraCNPJ } from "@/lib/format";

type Perfil = "fornecedor" | "comprador" | "financiador";

export function InterestForm() {
  const id = useId();
  const [perfil, setPerfil] = useState<Perfil>("fornecedor");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "erro">("idle");
  const [erro, setErro] = useState("");

  const cnpjErro = cnpj.length >= 18 && !cnpjValido(cnpj);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!cnpjValido(cnpj)) {
      setErro("Confira o CNPJ: os dígitos verificadores não batem.");
      return;
    }
    setEstado("enviando");
    setErro("");
    try {
      const res = await fetch("/api/interesse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ perfil, cnpj, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.erro ?? "Não foi possível enviar.");
      setEstado("ok");
    } catch (err) {
      setEstado("erro");
      setErro(err instanceof Error ? err.message : "Não foi possível enviar.");
    }
  }

  if (estado === "ok") {
    return (
      <div role="status" className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-sm text-emerald-300">
        <Check className="mt-0.5 size-4 shrink-0" />
        Recebemos seu interesse. Vamos falar com você pelo e-mail {email}.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <SegmentedRange
        label="Seu perfil"
        tone="accent"
        value={perfil}
        onChange={setPerfil}
        options={[
          { value: "fornecedor", label: "Fornecedor" },
          { value: "comprador", label: "Comprador" },
          { value: "financiador", label: "Financiador" },
        ]}
        className="w-fit"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-cnpj`} className="mb-2 block text-sm font-medium text-white">
            CNPJ da empresa
          </label>
          <input
            id={`${id}-cnpj`}
            inputMode="numeric"
            required
            value={cnpj}
            onChange={(e) => setCnpj(mascaraCNPJ(e.target.value))}
            placeholder="00.000.000/0000-00"
            aria-invalid={cnpjErro}
            className={`${fieldClass} min-h-12`}
          />
          {cnpjErro && <p className="mt-2 text-xs text-rose-500">CNPJ inválido.</p>}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="mb-2 block text-sm font-medium text-white">
            E-mail
          </label>
          <input
            id={`${id}-email`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@empresa.com.br"
            className={`${fieldClass} min-h-12`}
          />
        </div>
      </div>
      <p className="text-xs text-neutral-500">
        Usamos esses dados só para falar com você sobre a beta. Veja a <a href="/privacidade" className="underline hover:text-white">política de privacidade</a>.
      </p>
      {erro && (
        <p role="alert" className="text-sm text-rose-500">
          {erro}
        </p>
      )}
      <Button type="submit" variant="shiny" size="lg" className="w-full sm:w-fit" disabled={estado === "enviando"}>
        {estado === "enviando" ? "Enviando…" : "Quero participar da beta"} <ArrowRight className="size-4" />
      </Button>
    </form>
  );
}

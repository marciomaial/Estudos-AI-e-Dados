import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ledger/Section";
import { Logo } from "./Logo";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/" aria-label="Voltar ao início">
        <Logo />
      </Link>
      <div className="mt-16">
        <Eyebrow>Documento em revisão</Eyebrow>
        <h1 className="mt-5 text-4xl font-light tracking-tight text-white">{title}</h1>
        <div className="mt-8 grid gap-4 leading-relaxed font-light text-slate-400">{children}</div>
      </div>
    </main>
  );
}

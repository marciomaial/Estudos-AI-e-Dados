"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ButtonLink } from "@/components/ledger/Button";
import { cn } from "@/components/ledger/cn";
import { Logo } from "./Logo";

const links = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#simulador", label: "Simulador" },
  { href: "#compradores", label: "Para compradores" },
  { href: "#impacto", label: "Impacto" },
  { href: "#perguntas", label: "Perguntas" },
];

/** Navbar pill flutuante do Ledger: sticky top-4, bg-black border-white/10 rounded-full. */
export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-4 z-50 mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6">
      <nav
        aria-label="Principal"
        className={cn(
          "anim-in border border-white/10 bg-black/80 p-2 pl-4 backdrop-blur-md sm:p-3 sm:pl-6",
          open ? "rounded-3xl" : "rounded-full",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <Link href="/" aria-label="MSC Bank, início">
            <Logo />
          </Link>
          <ul className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors duration-300 hover:text-emerald-400">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <span className="hidden md:contents">
              <ButtonLink href="#participar" variant="outline" size="sm">
                Entrar
              </ButtonLink>
            </span>
            <ButtonLink href="#participar" variant="white" size="sm" className="px-3 sm:px-4">
              <span className="sm:hidden">Participar</span>
              <span className="hidden sm:inline">Quero participar</span>
            </ButtonLink>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full text-slate-300 hover:bg-white/5 md:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open && (
          <ul id="menu-mobile" className="mt-3 grid gap-1 border-t border-white/5 pt-3 pb-2 md:hidden">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}

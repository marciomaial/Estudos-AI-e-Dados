"use client";

import { useEffect, useState } from "react";
import { cn } from "./cn";
import { surface } from "./Card";

/**
 * Log digitado do Ledger: 30–50 ms por caractere, 300 ms por linha, hold 3,5 s, fade 700 ms, em loop.
 * Com movimento reduzido, mostra todas as linhas prontas.
 */
export function TypingTerminal({ lines, className }: { lines: string[]; className?: string }) {
  const [shown, setShown] = useState<string[]>(lines);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

    (async () => {
      while (!cancelled) {
        setFading(false);
        setShown([]);
        for (let l = 0; l < lines.length && !cancelled; l++) {
          for (let c = 1; c <= lines[l].length && !cancelled; c++) {
            setShown([...lines.slice(0, l), lines[l].slice(0, c)]);
            await wait(30 + Math.random() * 20);
          }
          await wait(300);
        }
        await wait(3500);
        setFading(true);
        await wait(700);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lines]);

  return (
    <div className={cn(surface.terminal, "p-5 font-mono text-[11px] leading-relaxed", className)} aria-hidden>
      <div className={cn("transition-opacity duration-700", fading && "opacity-0")}>
        {shown.map((l, i) => {
          const [k, ...rest] = l.split(" ");
          return (
            <p key={i} className={cn(i === shown.length - 1 && "caret")}>
              <span className="text-slate-500">&gt; </span>
              <span className="text-slate-400">{k}</span> <span className="text-emerald-400">{rest.join(" ")}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
}

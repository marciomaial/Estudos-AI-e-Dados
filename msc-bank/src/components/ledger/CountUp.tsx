"use client";

import { useEffect, useRef, useState } from "react";
import { formatBRL } from "@/lib/format";

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Count-up do Ledger (rAF, 2000 ms, easeOutQuart).
 * loop=true repete (hold 3 s → reinicia) e é só para o site; no app, valores reais nunca ficam em loop.
 * Com movimento reduzido, mostra o valor final direto.
 */
export function CountUp({
  to,
  format,
  duration = 2000,
  loop = false,
  className,
}: {
  to: number;
  /** Formato serializável (o componente é client; funções não atravessam a fronteira do servidor). */
  format: "brl" | "inteiro";
  duration?: number;
  loop?: boolean;
  className?: string;
}) {
  const [value, setValue] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;
    let started = false;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setValue(to * easeOutQuart(t));
        if (t < 1) raf = requestAnimationFrame(tick);
        else if (loop) timer = setTimeout(run, 3500);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        run();
      }
    });
    if (ref.current) io.observe(ref.current);
    setValue(0);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [to, duration, loop]);

  return (
    <span ref={ref} className={className}>
      {format === "brl" ? formatBRL(Math.round(value)) : Math.round(value).toLocaleString("pt-BR")}
    </span>
  );
}

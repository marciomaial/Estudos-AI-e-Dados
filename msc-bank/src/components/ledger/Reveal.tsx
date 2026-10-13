"use client";

import { useEffect, useRef, type ComponentProps, type ElementType } from "react";
import { cn } from "./cn";

/**
 * Entrada blur-up do Ledger, disparada quando 20% do elemento entra na tela (uma vez).
 * Delays do hero: 0.1 / 0.2 / 0.3 / 0.4 / 0.5 / 0.6 s.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  delay = 0,
  className,
  style,
  ...props
}: { as?: T; delay?: number } & ComponentProps<T>) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <Tag ref={ref} className={cn("reveal", className)} style={{ animationDelay: `${delay}s`, ...style }} {...props} />;
}

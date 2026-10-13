"use client";

import type { ComponentProps, MouseEvent } from "react";
import { cn } from "./cn";

/** Card com flashlight do pricing do Ledger: borda/brilho radial que seguem o cursor. */
export function FlashlightCard({ className, children, ...props }: ComponentProps<"div">) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div onMouseMove={onMove} className={cn("flashlight rounded-2xl border border-white/10 bg-card", className)} {...props}>
      {children}
    </div>
  );
}

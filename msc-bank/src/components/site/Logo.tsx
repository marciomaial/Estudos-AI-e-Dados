import { cn } from "@/components/ledger/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-2.5 font-semibold whitespace-nowrap tracking-tight text-white", className)}>
      <span aria-hidden className="relative grid size-8 place-items-center overflow-hidden rounded-full border border-emerald-500/30 bg-black">
        <span className="absolute inset-0 bg-[conic-gradient(from_200deg,transparent,#059669,#34d399,transparent_60%)] opacity-70" />
        <span className="relative size-5 rounded-full bg-black" />
        <span className="absolute size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
      </span>
      MSC Bank
    </span>
  );
}

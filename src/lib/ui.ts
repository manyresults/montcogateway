/**
 * Shared Tailwind class strings. Used by Astro components AND by the client
 * script that renders the live plan, so the two always look the same.
 * (Tailwind scans this file, so every class here is generated.)
 */
export const ui = {
  card: "min-w-0 rounded-[10px] border border-line bg-panel p-[22px]",
  tag: "mb-1.5 inline-block text-[11px] font-semibold uppercase tracking-[.1em] text-brass",
  h2: "mb-1 font-display text-[22px] leading-[1.15] font-bold text-balance",
  h3: "font-display text-[15px] leading-[1.15] font-bold text-balance",
  lede: "mb-3.5 max-w-[70ch] text-muted",
  p: "mb-2.5 max-w-[72ch]",
  foot: "mt-3 text-xs text-muted",
  note: "mt-3 rounded-r-md border-l-[3px] border-brass bg-brass-soft px-3 py-2.5 text-[13px]",
  list: "grid max-w-[75ch] list-disc gap-2 pl-[18px]",

  tableWrap: "overflow-x-auto",
  table: "w-full border-collapse text-sm",
  th: "border-b border-line px-2.5 py-[9px] text-left align-top text-xs font-semibold tracking-[.06em] text-muted uppercase",
  td: "border-b border-line px-2.5 py-[9px] text-left align-top",
  tdNum: "border-b border-line px-2.5 py-[9px] text-left align-top font-mono whitespace-nowrap tabular-nums",
  tdSrc: "border-b border-line px-2.5 py-[9px] text-left align-top text-xs text-muted",

  btns: "flex flex-wrap gap-1.5",
  btn: "rounded-md border border-line bg-transparent px-2.5 py-1.5 text-[13px] text-ink hover:border-brand hover:text-brand",
  btnPrimary:
    "rounded-md border border-brand bg-brand px-2.5 py-1.5 text-[13px] text-brand-ink hover:opacity-90",

  pill: "inline-block rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap",
  pillGood: "bg-good/15 text-good",
  pillWarn: "bg-warn/15 text-warn",
  pillBad: "bg-bad/15 text-bad",
  pillNa: "bg-chip text-muted",

  // "Blank" chip (click to jump to the field) and a filled-in value.
  blank:
    "inline-block cursor-pointer rounded-t-[3px] border-0 border-b-2 border-dashed border-brass bg-brass-soft px-2 font-mono text-[.88em] leading-normal text-brass hover:bg-brass/25",
  fill: "border-b-2 border-brand/40 font-semibold text-brand",

  opps: "grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-3",
  opp: "grid min-w-0 content-start gap-1.5 rounded-lg border border-line p-3.5",
  oppBig: "font-mono text-2xl font-medium tabular-nums text-brand",
  oppEmpty: "font-mono text-base text-muted",
  oppText: "m-0 text-[13px] text-muted",
  total:
    "mt-3.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 rounded-lg bg-brand px-4 py-3.5 text-brand-ink",
  totalBig: "font-mono text-[26px] tabular-nums",

  phase:
    "grid gap-1 border-t border-line pt-3.5 first:border-t-0 first:pt-0 min-[561px]:grid-cols-[120px_minmax(0,1fr)] min-[561px]:gap-3.5",
  phaseWhen: "font-mono text-xs text-muted",
  phaseWhenB: "block font-display text-[15px] font-bold text-ink",
  phaseUl: "mt-1.5 list-disc space-y-1 pl-[18px]",

  input:
    "w-full rounded-md border border-line bg-bg px-[9px] py-[7px] text-sm text-ink focus:border-brand focus:ring-[3px] focus:ring-brand/20 focus:outline-none [&.filled]:border-brand/55",
} as const;

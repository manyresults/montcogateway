/**
 * Small chart helpers that return HTML strings (plain divs + Tailwind, no chart
 * library). Used by Astro components via set:html and by src/scripts/plan.ts for
 * the live plan, so both render identically.
 *
 * Rules: one accent hue against neutral gray, thin bars with a rounded data end,
 * values labelled at the bar tip, and every chart has a text equivalent nearby
 * (the tables), so nothing is color-only.
 */

const esc = (s: unknown) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

export interface BarRow {
  label: string;
  value: number;
  /** Text shown at the bar tip, e.g. "86%" or "$12,000/yr". */
  display: string;
  /** Small muted line under the label, e.g. the source. */
  note?: string;
  /** The one bar the story is about (accent). If no row sets it, all bars are accent. */
  emphasis?: boolean;
}

/** Horizontal bars, label on the left, value at the tip. */
export function barChart(rows: BarRow[], opts: { title: string; max?: number } = { title: "" }): string {
  const max = (opts.max ?? Math.max(...rows.map((r) => r.value), 1)) * 1.18;
  const summary = rows.map((r) => `${r.label}: ${r.display}`).join("; ");
  const anyEmphasis = rows.some((r) => r.emphasis);
  const body = rows
    .map((r) => {
      const w = Math.max(0, Math.min(100, (r.value / max) * 100));
      const fill = !anyEmphasis || r.emphasis ? "bg-accent" : "bg-muted/45";
      return `<div class="grid items-center gap-x-3 gap-y-0.5 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)]" title="${esc(r.label)}: ${esc(r.display)}">
        <div class="text-[13px] leading-snug">${esc(r.label)}${r.note ? `<div class="text-[11px] text-muted">${esc(r.note)}</div>` : ""}</div>
        <div class="flex items-center gap-2"><div class="h-5 rounded-r-[4px] ${fill}" style="width:${w}%"></div><span class="font-mono text-xs whitespace-nowrap text-ink tabular-nums">${esc(r.display)}</span></div>
      </div>`;
    })
    .join("");
  return `<figure class="m-0"><figcaption class="mb-2.5 text-[13px] font-semibold">${esc(opts.title)}</figcaption><div class="grid gap-3" role="img" aria-label="${esc(opts.title)}. ${esc(summary)}">${body}</div></figure>`;
}

export interface GaugeRow {
  label: string;
  /** Your value, 0-100, or undefined while the blank is unfilled. */
  you?: number;
  bench: number;
  benchLabel: string;
}

/** "You vs. benchmark" gauges on a 0-100% track with a tick for the benchmark. */
export function gaugeChart(rows: GaugeRow[], title: string): string {
  const body = rows
    .map((r) => {
      const youW = r.you === undefined ? 0 : Math.max(0, Math.min(100, r.you));
      const youText = r.you === undefined ? "Fill in" : `${r.you}%`;
      return `<div class="grid gap-1" title="${esc(r.label)}: you ${esc(youText)}, benchmark ${esc(r.benchLabel)}">
        <div class="flex flex-wrap items-baseline justify-between gap-x-3 text-[13px]"><span>${esc(r.label)}</span>
          <span class="font-mono text-xs text-muted tabular-nums">You <b class="text-ink">${esc(youText)}</b> · Benchmark ${esc(r.benchLabel)}</span></div>
        <div class="relative h-3 rounded-full bg-line"><div class="h-3 rounded-full bg-accent" style="width:${youW}%"></div>
          <div class="absolute -top-1 h-5 w-0.5 rounded bg-ink" style="left:calc(${r.bench}% - 1px)" aria-hidden="true"></div></div>
      </div>`;
    })
    .join("");
  return `<figure class="m-0"><figcaption class="mb-2.5 text-[13px] font-semibold">${esc(title)}</figcaption><div class="grid gap-4" role="img" aria-label="${esc(title)}">${body}</div><p class="mt-2 text-[11px] text-muted"><span class="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-accent align-middle"></span>You <span class="mx-2 inline-block h-3 w-0.5 bg-ink align-middle"></span>Benchmark</p></figure>`;
}

export interface Segment {
  label: string;
  value: number;
  display: string;
  emphasis?: boolean;
}

/** One stacked part-to-whole bar with a 2px surface gap and a legend. */
export function splitBar(segs: Segment[], title: string): string {
  const total = segs.reduce((a, s) => a + s.value, 0) || 1;
  const summary = segs.map((s) => `${s.label}: ${s.display}`).join("; ");
  const bars = segs
    .map((s, i) => {
      const fill = s.emphasis ? "bg-accent text-white" : "bg-muted/45 text-ink";
      const round = i === 0 ? "rounded-l-[4px]" : i === segs.length - 1 ? "rounded-r-[4px]" : "";
      return `<div class="flex h-7 items-center justify-center font-mono text-xs ${fill} ${round}" style="width:${(s.value / total) * 100}%" title="${esc(s.label)}: ${esc(s.display)}">${esc(s.display)}</div>`;
    })
    .join("");
  const legend = segs
    .map((s) => `<span class="inline-flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-sm ${s.emphasis ? "bg-accent" : "bg-muted/45"}"></span>${esc(s.label)}</span>`)
    .join("");
  return `<figure class="m-0"><figcaption class="mb-2.5 text-[13px] font-semibold">${esc(title)}</figcaption><div class="flex gap-0.5" role="img" aria-label="${esc(title)}. ${esc(summary)}">${bars}</div><p class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">${legend}</p></figure>`;
}

export interface StatTile {
  value: string;
  label: string;
  source: string;
}

/** Row of headline-number tiles. */
export function statTiles(tiles: StatTile[]): string {
  return `<div class="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3">${tiles
    .map(
      (t) => `<div class="rounded-lg border border-line p-3.5"><div class="font-display text-[34px] leading-none font-bold text-brand">${esc(t.value)}</div><div class="mt-1.5 text-[13px] leading-snug">${esc(t.label)}</div><div class="mt-1 text-[11px] text-muted">${esc(t.source)}</div></div>`,
    )
    .join("")}</div>`;
}

export interface Phase {
  name: string;
  start: number;
  end: number;
}

/** 12-week timeline: one row per phase, bar spans its weeks. */
export function timeline(phases: Phase[], weeks = 12): string {
  const cols = `grid-template-columns:repeat(${weeks},minmax(0,1fr))`;
  const ticks = Array.from({ length: weeks }, (_, i) => `<div class="text-center font-mono text-[10px] text-muted">${i + 1}</div>`).join("");
  const rows = phases
    .map((p) => {
      const cells = Array.from({ length: weeks }, (_, i) => `<div class="self-stretch border-l border-line" style="grid-column:${i + 1};grid-row:1"></div>`).join("");
      return `<div title="${esc(p.name)}: weeks ${p.start}–${p.end}"><div class="mb-1 text-[13px]"><b>${esc(p.name)}</b> <span class="font-mono text-xs text-muted">weeks ${p.start}–${p.end}</span></div>
        <div class="grid h-5 items-center border-r border-line" style="${cols}">${cells}<div class="z-[1] h-3.5 rounded-[4px] bg-accent" style="grid-column:${p.start} / ${p.end + 1};grid-row:1"></div></div></div>`;
    })
    .join("");
  return `<figure class="m-0"><figcaption class="mb-2.5 text-[13px] font-semibold">The first 90 days, week by week</figcaption>
    <div role="img" aria-label="Timeline: ${esc(phases.map((p) => `${p.name} weeks ${p.start} to ${p.end}`).join("; "))}"><div class="mb-1 grid" style="${cols}" aria-hidden="true">${ticks}</div><div class="grid gap-3">${rows}</div></div></figure>`;
}

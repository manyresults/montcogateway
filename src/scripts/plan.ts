/**
 * Client logic for the Montco Gateway plan: reads the worksheet, renders the
 * live plan, handles tabs, sample data, clipboard summary and localStorage.
 * Copy and numbers live in src/data/content.ts; classes in src/lib/ui.ts.
 */
import { BENCH, FIELDS, FIRMS, LABELS, LANES, MOVES, PHASES, SAMPLE, type FieldKey } from "../data/content";
import { barChart, gaugeChart, groupedColumns, timeline } from "../lib/charts";
import { ui } from "../lib/ui";

type Values = Partial<Record<FieldKey, string | number>>;
type Nums = Partial<Record<FieldKey, number>>;
type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const STORE_KEY = "mgc-plan";
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const field = (f: FieldKey) => $<Field>(f);

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const num = (n: number) => Math.round(n).toLocaleString("en-US");
const pct = (n: number) => n + "%";
const esc = (s: unknown) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

let lanePick: Record<string, string> = {};

// ---- Worksheet ----

function read(): Values {
  const v: Values = {};
  for (const f of FIELDS) {
    const el = field(f);
    const raw = el.value.trim();
    el.classList.toggle("filled", raw !== "");
    if (raw === "") continue;
    v[f] = (el as HTMLInputElement).type === "number" ? parseFloat(raw) : raw;
  }
  return v;
}

const isNum = (x: unknown): x is number => typeof x === "number" && !Number.isNaN(x);
const has = (v: Values, ...keys: FieldKey[]) => keys.every((k) => isNum(v[k]));

/** A blank chip you can click to jump to its field, or the filled-in value. */
function b(v: Values, key: FieldKey, fmt?: (n: number) => string): string {
  const val = v[key];
  if (val === undefined || (typeof val === "number" && Number.isNaN(val))) {
    return `<button type="button" class="${ui.blank}" data-for="${key}">${LABELS[key]}</button>`;
  }
  const out = fmt && typeof val === "number" ? fmt(val) : esc(val);
  return `<span class="${ui.fill}">${out}</span>`;
}

function status(val: number | undefined, bench: number, higherBetter = true): string {
  const pill = (cls: string, text: string) => `<span class="${ui.pill} ${cls}">${text}</span>`;
  if (val === undefined) return pill(ui.pillNa, "Fill in");
  const d = higherBetter ? val - bench : bench - val;
  if (d >= 0) return pill(ui.pillGood, "At or above");
  if (d > -6) return pill(ui.pillWarn, "Close");
  return pill(ui.pillBad, "Room to grow");
}

// ---- Plan rendering ----

interface Opp {
  t: string;
  big?: string;
  p?: string;
  empty?: string;
  /** Yearly dollars, for the bar chart. */
  val?: number;
}

function opportunities(v: Values): { opps: Opp[]; total: number } {
  const n = v as Nums;
  const opps: Opp[] = [];
  let total = 0;

  if (has(v, "members", "retention", "dues")) {
    const target = Math.max(n.retention!, BENCH.retention);
    const gain = (n.members! * (target - n.retention!)) / 100;
    const perPoint = n.members! * 0.01 * n.dues!;
    const val = gain * n.dues!;
    total += val;
    opps.push({
      t: "Renewals",
      val,
      big: gain > 0 ? money(val) + "/yr" : money(perPoint) + "/pt",
      p:
        gain > 0
          ? `Reaching the ${BENCH.retention}% median keeps about ${num(gain)} more members a year.`
          : `You're at or above the median. Each extra point of renewal is worth about ${money(perPoint)} a year.`,
    });
  } else opps.push({ t: "Renewals", empty: "Needs members, renewal rate and dues" });

  if (has(v, "newPerYear", "firstYear", "dues")) {
    const target = Math.max(n.firstYear!, BENCH.firstYear);
    const gain = (n.newPerYear! * (target - n.firstYear!)) / 100;
    const val = gain * n.dues!;
    total += val;
    opps.push({
      t: "First-year members",
      val,
      big: gain > 0 ? money(val) + "/yr" : "On track",
      p:
        gain > 0
          ? `Moving first-year renewal to ${target}% keeps about ${num(gain)} more new members.`
          : `First-year renewal is at or above ${BENCH.firstYear}%. Protect it with onboarding.`,
    });
  } else opps.push({ t: "First-year members", empty: "Needs new members, first-year rate and dues" });

  if (has(v, "events", "guests", "guestConv", "dues")) {
    const target = Math.max(n.guestConv! + 5, 10);
    const gain = (n.events! * n.guests! * (target - n.guestConv!)) / 100;
    const val = gain * n.dues!;
    total += val;
    opps.push({
      t: "Guests who join",
      val,
      big: money(val) + "/yr",
      p: `About ${num(n.events! * n.guests!)} guests a year. A follow-up path that lifts joins to ${target}% adds about ${num(gain)} members.`,
    });
  } else opps.push({ t: "Guests who join", empty: "Needs events, guests and join rate" });

  if (has(v, "partners", "partnerPrice", "partnerRenew")) {
    const target = Math.max(n.partnerRenew!, 90);
    const gain = (n.partners! * (target - n.partnerRenew!)) / 100;
    const val = gain * n.partnerPrice!;
    total += val;
    opps.push({
      t: "Partners who renew",
      val,
      big: gain > 0 ? money(val) + "/yr" : "On track",
      p:
        gain > 0
          ? `${money(n.partners! * n.partnerPrice!)} in partner revenue today. ROI reports that lift renewal to ${target}% keep about ${num(gain)} more partners.`
          : "Partner renewal is strong. Use ROI reports to raise prices.",
    });
  } else opps.push({ t: "Partners who renew", empty: "Needs partners, value and renewal rate" });

  return { opps, total };
}

const COUNCIL: Record<string, string> = {
  active: "The council already meets. We'd turn it into a production rotation with clear lanes and credit.",
  advisory:
    "The council gives advice but doesn't produce. We'd keep the advice and add a production rotation with clear lanes and credit.",
  dormant:
    "The council has gone quiet. We'd relaunch it as a production team, so members join for a defined lane and visible credit.",
};

const BUDGET: Record<string, { o: string; d: string }> = {
  cash: { o: "90-day sprint", d: "A budget line supports a fixed-scope, fixed-fee sprint. We'd start with the two-week diagnostic inside it." },
  board: { o: "Diagnostic, then sprint", d: "The diagnostic produces the one-page memo the board needs to approve a one-time project." },
  sponsor: { o: "Sponsor-underwritten sprint", d: 'A partner underwrites the program ("Member Retention Program presented by…") and gets the credit and the reports.' },
  trade: { o: "Hybrid with partner trade", d: "MANY takes Annual Partner status as part of the fee. The rest is a small fixed fee." },
  unsure: { o: "Start with the diagnostic", d: "Two weeks, low cost. It produces the numbers and the board memo to decide the rest." },
};

const FOCUS: Record<string, string> = {
  grow: "The plan leans toward growing membership. We'd still lead with solving problems, because members who get results renew and refer, and that's the cheapest growth there is.",
  solve: "The plan leans toward solving business problems. Membership follows: renewals and referrals rise when members can point to results.",
  both: "Solve first, then grow. Members who get results renew and refer, so retention becomes the growth engine.",
};

const section = (tag: string, title: string, body: string) =>
  `<section class="${ui.card}"><span class="${ui.tag}">${tag}</span><h2 class="${ui.h2}">${title}</h2>${body}</section>`;
const table = (head: string[], rows: string, cls = ui.table) =>
  `<div class="${ui.tableWrap}"><table class="${cls}"><thead><tr>${head.map((h) => `<th class="${ui.th}">${h}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`;
const row = (...cells: (string | [string, string])[]) =>
  `<tr>${cells.map((c) => (Array.isArray(c) ? `<td class="${c[1]}">${c[0]}</td>` : `<td class="${ui.td}">${c}</td>`)).join("")}</tr>`;
const phase = (name: string, weeks: string, items: string[]) =>
  `<div class="${ui.phase}"><div class="${ui.phaseWhen}"><b class="${ui.phaseWhenB}">${name}</b>${weeks}</div><div><ul class="${ui.phaseUl}">${items.map((i) => `<li>${i}</li>`).join("")}</ul></div></div>`;

/**
 * Four-year membership estimate from the worksheet. "Today's rates" keeps the
 * current renewal rate and new-member pace. "With the plan" lifts renewal to at
 * least the benchmark and adds the members kept or won by first-year onboarding
 * and guest follow-up (the same targets as the opportunity math). An estimate,
 * not a forecast.
 */
function projection(v: Values): string {
  if (!has(v, "members", "retention", "newPerYear")) {
    return section("Looking ahead", "Where membership could be in four years",
      `<p class="${ui.lede}">Needs members, renewal rate and new members a year. ${b(v, "members")} ${b(v, "retention")} ${b(v, "newPerYear")}</p>`);
  }
  const n = v as Nums;
  const keep = n.retention! / 100;
  const planKeep = Math.max(n.retention!, BENCH.retention) / 100;
  let extra = 0;
  if (has(v, "firstYear")) extra += (n.newPerYear! * (Math.max(n.firstYear!, BENCH.firstYear) - n.firstYear!)) / 100;
  if (has(v, "events", "guests", "guestConv")) extra += (n.events! * n.guests! * (Math.max(n.guestConv! + 5, 10) - n.guestConv!)) / 100;
  const years = [0, 1, 2, 3, 4];
  const now: number[] = [n.members!];
  const plan: number[] = [n.members!];
  for (let y = 1; y <= 4; y++) {
    now.push(now[y - 1] * keep + n.newPerYear!);
    plan.push(plan[y - 1] * planKeep + n.newPerYear! + extra);
  }
  const labels = years.map((y) => (y === 0 ? "Today" : `Year ${y}`));
  const chart = groupedColumns(labels, [
    { name: "At today's rates", values: now, emphasis: false },
    { name: "With the plan", values: plan, emphasis: true },
  ], "Estimated active members");
  const tbl = table(["", ...labels],
    row("At today's rates", ...now.map((x) => [num(x), ui.tdNum] as [string, string])) +
    row("With the plan", ...plan.map((x) => [num(x), ui.tdNum] as [string, string])));
  const gap = plan[4] - now[4];
  return section("Looking ahead", "Where membership could be in four years",
    `<p class="${ui.lede}">${gap >= 1 ? `By year four, about <b>${num(gap)}</b> more members than at today's rates. ` : "You're already at or above the benchmarks used here, so the plan doesn't change this projection. "}This is an estimate from the numbers you entered, not a promise.</p>
    ${chart}<div class="mt-4">${tbl}</div>
    <div class="${ui.note}"><b>How it's estimated:</b> each year, members who renew (${pct(n.retention!)} today, at least ${BENCH.retention}% with the plan) plus ${num(n.newPerYear!)} new members a year${extra >= 0.5 ? `, plus about ${num(extra)} a year from first-year onboarding and guest follow-up with the plan` : ""}.</div>`);
}

function render(): void {
  const v = read();
  const n = v as Nums;
  const filled = FIELDS.filter((f) => v[f] !== undefined).length;
  $("progLabel").textContent = `${filled} of ${FIELDS.length} blanks filled`;
  $("progBar").style.width = (filled / FIELDS.length) * 100 + "%";
  try {
    localStorage.setItem(
      STORE_KEY,
      JSON.stringify({ v: Object.fromEntries(FIELDS.map((f) => [f, field(f).value])), lanes: lanePick }),
    );
  } catch {
    /* storage unavailable: the plan still works, it just won't be remembered */
  }

  const { opps, total } = opportunities(v);

  const perStaff = has(v, "members", "staff") && n.staff! > 0 ? n.members! / n.staff! : undefined;
  const smallList = has(v, "listSize") && n.listSize! < 500;
  const openBench = smallList ? BENCH.openSmall : BENCH.open;
  const scoreRows: [string, string, string, string, string][] = [
    ["Member renewal", has(v, "retention") ? pct(n.retention!) : b(v, "retention"), BENCH.retention + "%", status(n.retention, BENCH.retention), "ACCE FY2024 median"],
    ["First-year renewal", has(v, "firstYear") ? pct(n.firstYear!) : b(v, "firstYear"), BENCH.firstYear + "%", status(n.firstYear, BENCH.firstYear), "MGI 2026, trade associations"],
    ["Members per paid staff", perStaff !== undefined ? num(perStaff) : has(v, "members") ? b(v, "staff") : b(v, "members"), "~" + BENCH.perStaff, status(perStaff, BENCH.perStaff, false), "ACCE FY2024 (734 members ÷ 6.5 staff)"],
    ["Email open rate", has(v, "openRate") ? pct(n.openRate!) : b(v, "openRate"), openBench + "%", status(n.openRate, openBench), smallList ? "Higher Logic 2025–26, lists under 500" : "Higher Logic 2025–26, associations"],
  ];

  const gauges = gaugeChart(
    [
      { label: "Member renewal", you: n.retention, bench: BENCH.retention, benchLabel: BENCH.retention + "%" },
      { label: "First-year renewal", you: n.firstYear, bench: BENCH.firstYear, benchLabel: BENCH.firstYear + "%" },
      { label: "Email open rate", you: n.openRate, bench: openBench, benchLabel: openBench + "%" },
    ],
    "You vs. the benchmark",
  );
  const oppBars = opps.filter((o) => (o.val ?? 0) > 0).length
    ? `<div class="mb-4">${barChart(
        opps.filter((o) => (o.val ?? 0) > 0).map((o) => ({ label: o.t, value: o.val!, display: money(o.val!) + "/yr" })),
        { title: "Yearly revenue kept or added, by opportunity" },
      )}</div>`
    : "";

  const council = COUNCIL[String(v.council)];
  const budgetPath = BUDGET[String(v.budget)];
  const focusText = FOCUS[String(v.planFocus)];
  const guestsPerYear = has(v, "events", "guests") ? `<span class="${ui.fill}">${num(n.events! * n.guests!)}</span>` : b(v, "guests");

  const mustBelong =
    v.mustBelong !== undefined
      ? `In your words: ${b(v, "mustBelong")}. Every welcome email, renewal message and partner report repeats that promise and backs it up.`
      : `${b(v, "mustBelong")} Once we know it, every welcome email, renewal message and partner report repeats that promise and backs it up.`;

  const laneRows = LANES.map(
    (l, i) =>
      `<tr><td class="${ui.td} font-semibold">${l.lane}</td><td class="${ui.td}"><label class="sr-only" for="lane${i}">${l.lane} owner</label><select id="lane${i}" data-lane="${i}" class="${ui.input} max-w-[240px]">${FIRMS.map(
        (f) => `<option${(lanePick[i] ?? l.def) === f ? " selected" : ""}>${esc(f)}</option>`,
      ).join("")}</select></td><td class="${ui.td}">"Creative Partner" credit, newsletter spotlight, in-kind value toward partner status</td></tr>`,
  ).join("");

  $("plan").innerHTML =
    section("What we heard", "The goal for 2027",
      `<p class="${ui.p}">${b(v, "goal")}</p><p class="${ui.p}">Right now, the most pressing item is ${b(v, "urgent")}. We'd handle that first, so you get time back before anything else starts.</p>`) +

    section("Built on your strategic plan", "Answering the questions the board is already asking",
      `<p class="${ui.lede}">The chamber is in a three-year strategic planning process, measured against its mission: <em>"We are the gateway that unites people, places, and purposeful programming, creating a member-centered experience that is bolstered by meaningful connections and indispensable insights."</em> This plan is built to support that work, not run beside it.</p>
      <p class="${ui.p}">What the survey surfaced: ${b(v, "surveyThemes")}</p>
      <p class="${ui.p}">${focusText ? esc(focusText) : `Grow membership or solve problems: ${b(v, "planFocus")}`}</p>` +
      table(["The survey asks", "What we would do"],
        row("Are we nice to belong to, or need to belong to?", `Make value visible. Members get a renewal recap of what they received; partners get quarterly ROI reports. "Need to belong" is proven with numbers, not claimed.`) +
        row("What are we assuming businesses value that they may not?", `Stop assuming. The diagnostic includes "why did you join?" conversations with new members and data on which benefits actually get used.`) +
        row("Grow membership, or solve problems for businesses?", "Solve first. Renewals, first-year retention and guest conversion are the measures that show problems are being solved.") +
        row(`What would make an owner say "I'd be crazy not to belong"?`, mustBelong) +
        row("What does the chamber offer that owners can't easily get elsewhere?", "Trusted visibility. People who know their chamber are more likely to buy from a member, but only when they know the business is a member (ACCE/Harris 2024). A system that promotes members to each other and the public turns that into a benefit nobody else can sell.") +
        row(`Where are we falling short of "indispensable insights"?`, "Education with a point of view: member sessions on marketing and growth, plus a short benchmark note in the newsletter each quarter."))) +

    section("Where you stand", "Scorecard",
      `<p class="${ui.lede}">Benchmarks come from larger chambers and associations. They're context, not a grade.</p>` +
      table(["Measure", "Montco Gateway", "Benchmark", "Read", "Source"],
        scoreRows.map((r) => row(r[0], [r[1], ui.tdNum], [r[2], ui.tdNum], r[3], [r[4], ui.tdSrc])).join("")) +
      `<div class="mt-5">${gauges}</div>`) +

    section("Where the money is", "Four places to grow revenue",
      `<p class="${ui.lede}">Each figure is yearly revenue kept or added, using your numbers and conservative targets.</p>
      ${oppBars}
      <div class="${ui.opps}">${opps.map((o) => `<div class="${ui.opp}"><h3 class="${ui.h3}">${o.t}</h3>${o.empty ? `<div class="${ui.oppEmpty}">${o.empty}</div>` : `<div class="${ui.oppBig}">${o.big}</div><p class="${ui.oppText}">${o.p}</p>`}</div>`).join("")}</div>
      <div class="${ui.total}"><span>Combined opportunity</span><span class="${ui.totalBig}">${total > 0 ? money(total) + " / yr" : "Fill in the blanks"}</span><small class="opacity-85">Before raising prices or adding new partners</small></div>`) +

    projection(v) +

    section("What we would do", "The first 90 days",
      `<p class="${ui.lede}">One sequence, in priority order. Everything else waits.</p><div class="mb-5">${timeline(PHASES)}</div><div class="grid gap-3.5">` +
      phase("Diagnostic", "Weeks 1–2", [
        "Baseline renewal, first-year renewal and guest join rates from your member system",
        `Inventory every partner benefit you sell to ${b(v, "partners", num)} Annual Partners, and draft a rate card`,
        `Email baseline for a list of ${b(v, "listSize", num)} contacts against association benchmarks`,
        `One-page memo for ${b(v, "signoff")}`,
      ]) +
      phase("Foundation", "Weeks 3–6", [
        `Quick win first: ${b(v, "urgent")}`,
        "Finish the rebrand rollout: consistent names, handles and email addresses everywhere",
        "One master Constant Contact template with built-in partner ad slots",
        `A content calendar covering ${b(v, "events", num)} events a year, so promotion runs on schedule`,
      ]) +
      phase("Keep members", "Weeks 5–10", [
        `A 12-month welcome journey for the ${b(v, "newPerYear", num)} members who join each year`,
        `A 90/60/30-day renewal sequence with a "here's what you got" recap for all ${b(v, "members", num)} members`,
        `A follow-up path for the roughly ${guestsPerYear} non-member guests a year, with a clear invitation to join`,
      ]) +
      phase("Keep partners", "Weeks 8–12", [
        "A quarterly ROI report for each Annual Partner: reach, clicks, introductions and leads",
        "First reports delivered before renewal conversations start",
        "A public partner page with packages, so sponsorship sells itself",
      ]) + `</div>`) +

    section("Who does the work", "Your council as a production team",
      `<p class="${ui.lede}">${council ? esc(council) : `Council status: ${b(v, "council")}. MANY runs the system and the calendar. Council firms take credited lanes.`}</p>` +
      table(["Lane", "Owner", "What they get"],
        row([`Strategy, calendar, email system, renewal and welcome sequences, partner reports`, `${ui.td} font-semibold`], `<span class="${ui.fill}">MANY</span>`, "Accountability for the numbers above") + laneRows) +
      `<div class="${ui.note}">Lanes are suggestions. We'd confirm each firm's specialty and interest before assigning anything. With ${b(v, "staff")} paid staff and ${b(v, "volunteers")} active volunteers, the goal is to take recurring work off your plate.</div>`) +

    section("How we'd start", budgetPath ? esc(budgetPath.o) : "Recommended starting point",
      `<p class="${ui.p}">${budgetPath ? esc(budgetPath.d) : `Funding path: ${b(v, "budget")}. The recommendation adjusts once this is set.`}</p>` +
      table(["Next step", "Owner", "When"],
        row("Share baseline numbers: renewals, dues tiers, partner packages, email stats", "Chamber", "This week") +
        row("Deliver the diagnostic and one-page memo", "MANY", "Two weeks after data") +
        row("20 minutes on the board agenda to review it", b(v, "signoff"), `Before ${b(v, "boardDate")}`) +
        row("Decide on scope for 2027", "Chamber", b(v, "boardDate"))) +
      `<div class="${ui.btns} mt-3.5"><button class="${ui.btnPrimary}" id="copyBtn" type="button">Copy plan summary</button></div>
      <p class="${ui.foot}">Sources: ACCE FY2024 Chamber Operations Survey; MGI Membership Marketing Benchmarking 2026; Higher Logic 2025–26 Association Email Benchmark. Opportunity figures are estimates from the numbers entered above.</p>`);

  $("plan").querySelectorAll<HTMLSelectElement>("select[data-lane]").forEach((s) =>
    s.addEventListener("change", () => {
      lanePick[s.dataset.lane!] = s.value;
      render();
    }),
  );
  $("copyBtn").addEventListener("click", () => copySummary(v, total));
}

// ---- Copy summary & toast ----

function copySummary(v: Values, total: number): void {
  const g = (k: FieldKey) => (v[k] !== undefined ? v[k] : "___");
  const text = [
    "Montco Gateway Chamber × MANY — What we would do",
    "",
    `Strategic plan survey themes: ${g("surveyThemes")}`,
    `"Crazy not to belong" because: ${g("mustBelong")}`,
    `2027 goal: ${g("goal")}`,
    `Most pressing now: ${g("urgent")}`,
    `Members: ${g("members")} · Renewal: ${g("retention")}% · First-year renewal: ${g("firstYear")}%`,
    `Annual Partners: ${g("partners")} · Partner renewal: ${g("partnerRenew")}%`,
    `Combined yearly opportunity: ${total > 0 ? money(total) : "TBD"}`,
    "",
    "First 90 days:",
    "1. Diagnostic (weeks 1–2): baselines, partner rate card, email baseline, board memo",
    "2. Foundation (weeks 3–6): quick win, finish rebrand rollout, master email template, content calendar",
    "3. Keep members (weeks 5–10): welcome journey, renewal sequence, guest follow-up",
    "4. Keep partners (weeks 8–12): quarterly ROI reports, public partner page",
    "",
    `Sign-off: ${g("signoff")} · Budget finalized by: ${g("boardDate")}`,
  ].join("\n");
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => toast("Copied"), () => toast("Copy isn't available here"));
  } else toast("Copy isn't available here");
}

let toastTimer: number | undefined;
function toast(msg: string): void {
  const t = $("toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (t.hidden = true), 1600);
}

// ---- Wiring ----

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const blank = target.closest<HTMLElement>("[data-for]");
  if (!blank) return;
  const el = document.getElementById(blank.dataset.for!);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.focus({ preventScroll: true });
  el.classList.remove("flash");
  void el.offsetWidth;
  el.classList.add("flash");
});

const sheet = $("sheet");
sheet.addEventListener("input", render);
sheet.addEventListener("change", render);
sheet.addEventListener("submit", (e) => e.preventDefault());
$("sampleBtn").addEventListener("click", () => {
  FIELDS.forEach((f) => (field(f).value = String(SAMPLE[f] ?? "")));
  render();
  toast("Sample numbers loaded. Replace with real ones.");
});
$("clearBtn").addEventListener("click", () => {
  FIELDS.forEach((f) => (field(f).value = ""));
  lanePick = {};
  render();
  toast("Cleared");
});

// ---- The five moves ----

$("moves").innerHTML = MOVES.map((m, i) => {
  const col = (title: string, items: string[]) =>
    `<div><h4 class="mb-1.5 text-xs font-semibold tracking-[.08em] text-brand uppercase">${title}</h4><ul class="grid list-disc gap-1 pl-[18px] text-sm">${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`;
  return `<article class="${ui.card} grid gap-x-[18px] gap-y-1 min-[561px]:grid-cols-[56px_minmax(0,1fr)]">
    <div class="font-display text-[34px] leading-none font-bold text-brass">${i + 1}</div>
    <div>
      <h3 class="mb-1 font-display text-xl leading-[1.15] font-bold text-balance">${m.t}</h3>
      <p class="mb-3 text-muted">${m.why}</p>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-[22px] gap-y-3.5">${col("What we'd do", m.what)}${col("How we'd do it", m.how)}${col("What you'd see", m.see)}</div>
    </div>
    <div class="mt-3 flex flex-wrap items-center gap-1.5 border-t border-dashed border-line pt-3 text-xs text-muted min-[561px]:col-start-2">Supported by ${m.svc.map((s) => `<span class="rounded-full border border-line bg-chip px-2 py-0.5 text-xs text-ink">${esc(s)}</span>`).join("")}</div>
  </article>`;
}).join("");

// ---- Tabs ----

const TABS = ["findings", "approach", "planTab"];
function showTab(id: string, push: boolean): void {
  if (!TABS.includes(id)) id = "findings";
  TABS.forEach((t) => ($(t).hidden = t !== id));
  document.querySelectorAll<HTMLElement>("[data-tab]").forEach((btn) =>
    btn.setAttribute("aria-selected", btn.dataset.tab === id ? "true" : "false"),
  );
  $("progWrap").hidden = id !== "planTab";
  if (push) {
    try {
      history.replaceState(null, "", "#" + id);
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
document.querySelectorAll<HTMLElement>("[role=tab]").forEach((btn) =>
  btn.addEventListener("click", () => showTab(btn.dataset.tab!, true)),
);
document.addEventListener("click", (e) => {
  const go = (e.target as HTMLElement).closest<HTMLElement>("[data-go]");
  if (go) showTab(go.dataset.go!, true);
});
showTab(location.hash.replace("#", ""), false);

// ---- Restore saved answers (this browser only) ----

try {
  const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
  if (saved) {
    FIELDS.forEach((f) => {
      if (saved.v && saved.v[f] !== undefined) field(f).value = saved.v[f];
    });
    lanePick = saved.lanes || {};
  }
} catch {
  /* ignore corrupt or unavailable storage */
}
render();

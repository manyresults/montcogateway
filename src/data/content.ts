/**
 * All editable content and numbers for the app live here.
 *
 *   BENCH   benchmark targets used in the opportunity math
 *   MOVES   the five moves on "What we would do"
 *   LANES / FIRMS   council lanes and the default firm for each
 *   SAMPLE  values loaded by "Try sample numbers"
 *   FINDINGS_*, BENCHMARKS, SERVICES   static copy on the other two tabs
 */

export const BENCH = { retention: 86, firstYear: 82, perStaff: 113, open: 33.5, openSmall: 48 };

export type FieldKey = (typeof FIELDS)[number];
export const FIELDS = ["surveyThemes","planFocus","mustBelong","goal","urgent","members","dues","retention","newPerYear","firstYear","events","guests","guestConv","partners","partnerPrice","partnerRenew","staff","volunteers","listSize","openRate","council","budget","signoff","boardDate"] as const;

export const SAMPLE: Partial<Record<FieldKey, string | number>> = {surveyThemes:"Sample: people value the relationships, but the chamber feels nice to have rather than essential",planFocus:"both",mustBelong:"Sample: it's where my next three clients come from",goal:"Grow to 450 members and add 3 Annual Partners",urgent:"Holiday luncheon invites and the 2027 sponsor deck",members:400,dues:500,retention:80,newPerYear:70,firstYear:65,events:50,guests:4,guestConv:5,partners:10,partnerPrice:3000,partnerRenew:70,staff:1,volunteers:25,listSize:1800,openRate:30,council:"advisory",budget:"trade",signoff:"Executive committee",boardDate:"Mid-November"};

export const LANES = [
  {lane:"Event creative & flyers", def:"Three C Creative"},
  {lane:"Newsletter copy & member spotlights", def:"Red Pen Resources"},
  {lane:"Event & Annual Meeting video", def:"Nine21 Productions"},
  {lane:"Press & announcements", def:"The Communication Solutions Group"},
  {lane:"New-member welcome kits", def:"PPL Promotions"},
  {lane:"Social content support", def:"be Marketing"},
  {lane:"Digital & web support", def:"PCDM, LLC"}
];
export const FIRMS = ["Three C Creative","Red Pen Resources","be Marketing","PPL Promotions","PCDM, LLC","The Communication Solutions Group","Nine21 Productions","MANY","Open: recruit a member"];
export const LABELS: Record<FieldKey, string> = {surveyThemes:"what the survey surfaced",planFocus:"grow or solve",mustBelong:"why they'd be crazy not to belong",goal:"your 2027 goal",urgent:"what's on your desk",members:"member count",dues:"average dues",retention:"renewal rate",newPerYear:"new members / year",firstYear:"first-year renewal",events:"events / year",guests:"guests / event",guestConv:"guest join rate",partners:"partner count",partnerPrice:"partner value",partnerRenew:"partner renewal",staff:"paid staff",volunteers:"volunteers",listSize:"list size",openRate:"open rate",council:"council status",budget:"funding path",signoff:"who signs off",boardDate:"budget date"};

export const MOVES = [
  {t:"Finish the rebrand rollout", why:"Make Montco Gateway easy to find and consistent everywhere, so the new name does its job.",
   what:["One name, one set of handles, one email domain across every channel","A public partner page that describes each package","Newsletter lists that match today's programs","A short brand-and-voice guide council firms can work from"],
   how:["Audit every profile, page and signup form","Merge duplicate accounts and redirect old ones","Rebuild the sponsorship page as readable text","Announce the finished rollout to members"],
   see:["Search for \"Montco Gateway\" finds every channel","Prospective partners can self-qualify before calling"],
   svc:["Websites","Press release distribution"]},
  {t:"Build the member engine", why:"Lack of engagement is the top reason members leave. A steady sequence of small touchpoints fixes that without adding to anyone's workload.",
   what:["A 12-month welcome journey for new members","A 90/60/30-day renewal sequence with a \"here's what you got\" recap","A follow-up path for every non-member who attends an event"],
   how:["Map the moments that matter: join, first event, 90 days, renewal","Write the sequences once, then automate them","Use Constant Contact and CC-Assist first; add automation only where needed"],
   see:["Renewal and first-year renewal tracked monthly","Guests receive an invitation to join within 48 hours"],
   svc:["Digital Launch System automation","Fractional CMO"]},
  {t:"Prove value to partners", why:"Partners are buying customer acquisition. They renew on evidence, not logos.",
   what:["A quarterly ROI report for each Annual Partner","Clear, published partner tiers","Email and web placements that can be counted"],
   how:["Inventory every benefit partners receive","Add tracking to email ads, banners and spotlights","Deliver reports before renewal conversations"],
   see:["Each partner can see reach, clicks, introductions and leads","Renewal conversations start from numbers"],
   svc:["Fractional CMO","Ad Management (optional, for partner campaigns)"]},
  {t:"Turn the council into a production team", why:"Seven firms already volunteer their expertise. A quarterback and clear lanes turn advice into output.",
   what:["MANY owns the calendar, systems and reporting","Council firms each own a credited lane: creative, copy, video, PR, welcome kits","In-kind work counts toward partner status"],
   how:["Confirm each firm's specialty and interest","Set lanes, owners and deadlines in a 90-day roadmap","Credit every contribution in the newsletter and on the site"],
   see:["Recurring work leaves the executive director's desk","Council firms get visible credit for their work"],
   svc:["Fractional CMO: roadmap, SOPs, vendor alignment"]},
  {t:"Deliver indispensable insights", why:"The mission promises insights. Education is also a benefit members can't easily get elsewhere.",
   what:["Quarterly member sessions on marketing and growth","A short benchmark note in the newsletter","A free self-assessment members can take"],
   how:["Fill a call-for-speakers calendar with member experts","Package each session into newsletter and social content","Offer the 5-Minute Marketing Plan assessment as a member benefit"],
   see:["Programming that answers \"why belong?\"","Content that fills the calendar without extra writing"],
   svc:["The Results Engine training","yourfreeplan.com assessment"]}
];

export const STATS = [
  { t: "100+ years", p: "From the Jenkintown Businessmen's Association (1918) to Montco Gateway (2025)." },
  { t: "New ground", p: "Conshohocken joined in 2024. The growth corridor is Conshohocken, Horsham and Plymouth Meeting." },
  { t: "50+ events a year", p: "Networking at Noon, Coffee & Conversations, Go-Givers, WBN, Emerging Leaders, TNT." },
  { t: "7 marketing firms", p: "Already on the Marketing Advisory Council, by invitation." },
];

export const STRENGTHS = [
  { b: "A clear identity.", t: "\"Connecting today's leaders with tomorrow's opportunities\" gives the chamber a countywide story, not a single-town one." },
  { b: "A strategic plan in motion.", t: "The board and stakeholder survey asks the right questions, including whether the chamber is \"nice to belong to\" or \"need to belong to.\"" },
  { b: "Real anchor partners.", t: "Banks, insurance, hospitality and the trades already invest in the chamber." },
  { b: "Programs with personality.", t: "Go-Givers, Emerging Leaders and TNT each serve a distinct need." },
  { b: "Talent in the room.", t: "The council covers design, copy, video, PR, promotional products and digital." },
];

export const FINDINGS_ROWS: [string, string][] = [
  ["Some social profiles and the site header still use the EMCCC name and emccc.org email", "New members searching for \"Montco Gateway\" may not find the chamber's channels"],
  ["Two Instagram handles are linked from the site", "Followers and posts are split"],
  ["Member count reads 400+ on the website and 500+ on LinkedIn", "Inconsistent numbers weaken the pitch to prospects and partners"],
  ["Partner and sponsorship packages aren't described or priced publicly; the sponsorship page is a single image", "Prospective partners can't self-qualify, and search engines can't read the page"],
  ["Newsletter signup offers three lists, and one uses an old program name", "No general member newsletter or partner-offer list to grow"],
  ["The Blog menu item and one committee link go nowhere", "Small, but visitors notice"],
];

/** [finding, figure, source, figure is a number (monospace, no wrap)] */
export const BENCHMARKS: [string, string, string, boolean][] = [
  ["Median member renewal", "86%", "ACCE FY2024 Operations Survey", true],
  ["Median chamber size", "6.5 staff · 734 members", "ACCE FY2024", true],
  ["Share of revenue from non-dues sources", "~62%", "ACCE 2025 report", true],
  ["First-year renewal vs. overall", "72% vs. 82%", "MGI 2026, associations", true],
  ["#1 obstacle for chamber staff", "Lack of time", "GrowthZone 2026 survey", false],
  ["#1 reason members don't renew", "Lack of engagement", "GrowthZone 2026 survey", false],
  ["People who know their chamber and are more likely to buy from a known member", "64%", "ACCE / Harris Poll 2024", true],
  ["Association email opens, lists under 500", "~48%", "Higher Logic 2025–26", true],
];

export const SERVICES = [
  { t: "Fractional CMO", p: "Senior marketing leadership on a set cadence: a 90-day roadmap with owners and deadlines, standard operating procedures, and vendor and team alignment. This is the quarterback role." },
  { t: "Websites", p: "Mobile-ready WordPress sites with on-page SEO and answer-engine optimization, lead forms, analytics and Search Console, plus press release writing and distribution." },
  { t: "Digital Launch System", p: "A website plus automated lead handling: pipelines, email and SMS follow-up, and reporting. The engine behind welcome, renewal and guest follow-up sequences." },
  { t: "Ad Management", p: "Campaigns on up to two platforms with targeting, keyword selection, graphic design and ongoing management." },
  { t: "The Results Engine", p: "MANY's marketing operating system: strategy, systems, tools, training and support." },
  { t: "Custom plans", p: "Content, SEO, paid, social and web bundled around a specific goal." },
];

/** Headline numbers on the findings tab (all from the sources cited in BENCHMARKS). */
export const GLANCE = [
  { value: "86%", label: "Median chamber member renewal", source: "ACCE FY2024" },
  { value: "72%", label: "First-year renewal at associations", source: "MGI 2026" },
  { value: "~62%", label: "Chamber revenue from non-dues sources", source: "ACCE 2025" },
  { value: "64%", label: "Know their chamber and favor buying from a known member", source: "ACCE / Harris 2024" },
];

/** Renewal comparison chart. `emphasis` marks the one bar the story is about. */
export const RENEWAL_BARS = [
  { label: "Median chamber, all members", value: 86, display: "86%", note: "ACCE FY2024" },
  { label: "Associations, all members", value: 82, display: "82%", note: "MGI 2026" },
  { label: "Associations, first-year members", value: 72, display: "72%", note: "MGI 2026", emphasis: true },
];

/** The 90-day plan, in weeks. Names match the phases in src/scripts/plan.ts. */
export const PHASES = [
  { name: "Diagnostic", start: 1, end: 2 },
  { name: "Foundation", start: 3, end: 6 },
  { name: "Keep members", start: 5, end: 10 },
  { name: "Keep partners", start: 8, end: 12 },
];

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
export const FIELDS = ["surveyThemes","planFocus","mustBelong","goal","urgent","members","dues","retention","newPerYear","firstYear","events","guests","guestConv","partners","partnerPrice","partnerRenew","staff","volunteers","listSize","openRate","council","pastAgency","foundingPartners","budget","signoff","boardDate"] as const;

export const SAMPLE: Partial<Record<FieldKey, string | number>> = {surveyThemes:"Sample: people value the relationships, but the chamber feels nice to have rather than essential",planFocus:"both",mustBelong:"Sample: it's where my next three clients come from",goal:"Grow to 450 members and add 3 Annual Partners",urgent:"Holiday luncheon invites and the 2027 sponsor deck",members:400,dues:500,retention:80,newPerYear:70,firstYear:65,events:50,guests:4,guestConv:5,partners:10,partnerPrice:3000,partnerRenew:70,staff:1,volunteers:25,listSize:1800,openRate:30,council:"advisory",pastAgency:"Sample: a freelancer handled social for six months; nothing was left behind",foundingPartners:"Sample: two member agencies",budget:"trade",signoff:"Executive committee",boardDate:"Mid-November"};

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
export const LABELS: Record<FieldKey, string> = {surveyThemes:"what the survey surfaced",planFocus:"grow or solve",mustBelong:"why they'd be crazy not to belong",goal:"your 2027 goal",urgent:"what's on your desk",members:"member count",dues:"average dues",retention:"renewal rate",newPerYear:"new members / year",firstYear:"first-year renewal",events:"events / year",guests:"guests / event",guestConv:"guest join rate",partners:"partner count",partnerPrice:"partner value",partnerRenew:"partner renewal",staff:"paid staff",volunteers:"volunteers",listSize:"list size",openRate:"open rate",council:"council status",pastAgency:"past agency experience",foundingPartners:"founding partner agencies",budget:"funding path",signoff:"who signs off",boardDate:"budget date"};

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

/** "Core objectives" on the approach tab. */
export const OBJECTIVES = [
  { t: "Membership growth", items: ["Bring in new members consistently, and keep the ones you have", "Build repeatable systems for awareness, interest and joining"] },
  { t: "Events and a clear message", items: ["Turn event attendance into membership and renewals", "Say one clear thing about what members get, in every channel"] },
  { t: "Systems and support", items: ["Make the calendar, email and tracking work together", "Work as a strategic partner beside staff, volunteers and the council, not another vendor"] },
];

/** The member journey funnel on the approach tab (shape is illustrative, not data). */
export const JOURNEY = [
  { name: "Discover", text: "One name and one set of handles everywhere, plus member spotlights and local-business tips that bring people to the site." },
  { name: "Attend", text: "Guests get an invitation to join within 48 hours of an event." },
  { name: "Join", text: "A 12-month welcome journey so new members use what they joined for." },
  { name: "Renew", text: "A 90/60/30-day renewal sequence with a \"here's what you got\" recap." },
  { name: "Advocate", text: "Member success stories and quarterly partner ROI reports that members and partners can share." },
];

/** The marketing loop: four horizons that repeat, steered by a monthly review. */
export const LOOP = [
  { when: "First days", t: "Audit and fix", items: ["Audit the website, social profiles and email for quick wins", "Fix the pages people land on: a clear next step and a consistent name"] },
  { when: "First weeks", t: "Content and campaigns", items: ["Launch the master email template and the event content calendar", "Share member and educational content across channels"] },
  { when: "First months", t: "Nurture and collaborate", items: ["Automate welcome, renewal and guest follow-up", "Put council firms and partners on credited lanes"] },
  { when: "Next year", t: "Sustain and grow", items: ["Retention and loyalty initiatives members notice", "Extend into the growth corridor: Conshohocken, Horsham and Plymouth Meeting"] },
];

/** Findings tab: why marketing engagements end. Vendor data, labelled directional. */
export const CHURN_ROWS: [string, string, string][] = [
  ["Ongoing retainer", "56 months", "18%"],
  ["Hybrid", "36 months", "28%"],
  ["Performance-based", "30 months", "33%"],
  ["Project-based", "24 months", "42%"],
];

export const CHURN_STATS = [
  { t: "48%", p: "of clients who leave an agency cite dissatisfaction with delivery, the top reason. Agencies rank it seventh. (Setup 2025 survey)" },
  { t: "88%", p: "of marketing leaders expect data-driven results, not just creative ideas. (Setup 2025 survey)" },
  { t: "First 90 days", p: "is when client relationships are most likely to end." },
];

/** Approach tab: the member marketing collective. */
export const COLLECTIVE_ROLES: [string, string, string][] = [
  ["Operator", "MANY", "Runs the system, calendar, email, renewal and partner reporting, and the 90-day roadmap. One point of contact for the chamber."],
  ["Founding partners", "Member agencies, confirmed before launch", "Take lanes from day one, so the collective is real from the start."],
  ["Council lanes", "Marketing Advisory Council firms", "Each owns a credited lane matched to what they do best."],
  ["Open seats", "Marketing firms that join later", "A clear way in: join the chamber, take a lane, get credited exposure."],
];

export const COMMITMENTS = [
  { b: "The chamber owns everything.", t: "Templates, lists, accounts, sequences and reports belong to the chamber. If MANY stepped away tomorrow, nothing would break." },
  { b: "No selling through the role.", t: "MANY gets no promotion beyond what any Annual Partner receives, and never prospects from the member list." },
  { b: "Credit goes to whoever did the work.", t: "Every piece carries a \"Creative Partner\" credit, and lanes rotate on a published schedule." },
  { b: "A term with a review.", t: "One year, then the chamber decides. The operator role could pass to another firm." },
  { b: "Paid work runs through the chamber.", t: "No side deals among collective members." },
  { b: "A fair process.", t: "Lanes are assigned on published criteria, open to any member agency, and no firm reviews work in its own lane." },
];

/** Approach tab: the same work bought two ways. [task list, system, how it's measured] */
export const TASKS_VS_RESULTS: [string, string, string][] = [
  ["Newsletter and email templates", "Welcome, renewal and guest follow-up sequences on one master template", "Renewal and first-year renewal rates, monthly"],
  ["A set number of social posts", "A content calendar tied to events and member stories", "Event attendance and guests who join"],
  ["Event flyers", "A follow-up path for every non-member guest", "Guest-to-member conversion"],
  ["A sponsorship deck", "Published partner packages and quarterly ROI reports", "Annual Partner renewal rate"],
  ["A website refresh", "Pages that answer \"why belong?\" and \"what do partners get?\", owned by the chamber", "Join and partner inquiries from the site"],
];

/** Approach tab: what success looks like. */
export const SUCCESS = {
  d90: [
    "Baselines measured: renewal, first-year renewal, guest joins and email",
    "Welcome, renewal and guest follow-up sequences live",
    "First partner ROI reports delivered before renewal conversations",
    "The chamber owns every template, list and report",
  ],
  m12: [
    "Renewal and first-year renewal moving toward the 86% and 82% benchmarks",
    "More guests joining after events",
    "Partner renewal conversations that start from numbers",
    "Recurring work off the executive director's desk",
  ],
  miss: "Targets are agreed after the diagnostic and reviewed monthly. If a measure isn't moving, we change the approach. At the one-year review, the chamber decides whether to continue.",
};

/** Approach tab: the diagnostic as a low-risk first step. */
export const DIAGNOSTIC = {
  gets: [
    "Baseline renewal, first-year renewal, guest-join and email numbers",
    "An inventory of every partner benefit, with a draft rate card",
    "A one-page memo for the board",
  ],
  needs: [
    "Baseline numbers: renewals, dues tiers, partner packages, email stats",
    "One person to answer questions as the work goes",
    "20 minutes on a board agenda to review the memo",
  ],
};

/** /evaluate page: [common question, a question that shows more] */
export const EVAL_QUESTIONS: [string, string][] = [
  ["Can you design in Constant Contact?", "How will you improve renewal and first-year retention, and how will we know?"],
  ["How many social posts per month?", "Which channels actually bring in new members, and what will you stop doing?"],
  ["Can you design event flyers?", "How will you turn non-member guests into members?"],
  ["What's your monthly rate?", "What does success look like at 90 days and 12 months, and what happens if we don't hit it?"],
  ["Do you have chamber experience?", "How will you work with our council and member agencies without creating a conflict?"],
  ["Show us samples.", "Show us a result you moved, with numbers."],
  ["Can you redo our website?", "What do we own if we part ways?"],
  ["How fast can you start?", "What do you need from us, and how much of our executive director's time will this take?"],
];

/** /evaluate page: questions about the process itself. */
export const EVAL_PROCESS = [
  "Does every candidate get the same questions, the same deadline and the same scoring?",
  "Who is on the review committee, and how are conflicts of interest handled if member firms also submit?",
  "Is the scope fixed, or are candidates invited to propose an approach?",
  "What is the decision timeline relative to the 2027 budget?",
  "What will candidates be asked to provide up front? Existing work and a short written approach cost every firm less than finished mockups or a full plan.",
];

/** /evaluate page: blank scorecard. [criterion, suggested weight, what to look for] */
export const EVAL_SCORE: [string, number, string][] = [
  ["Results and measurement", 30, "Names the numbers that will change and how they'll be tracked"],
  ["Fit with the chamber, and fairness", 20, "Works with member agencies and the council without a conflict"],
  ["What the chamber owns", 15, "Templates, lists, accounts and reports stay with the chamber"],
  ["Time asked of staff", 15, "Clear about what it needs from the executive director"],
  ["Price clarity", 10, "A price the committee can compare, with what is and isn't included"],
  ["References", 10, "Chambers, associations or nonprofits, with results"],
];

/**
 * Approach tab: membership programs that back up this approach.
 * `result` is optional and only renders when filled in; add real numbers
 * (members, years, retention) here once you have approval to share them.
 */
export const PROOF: { name: string; kind: string; text: string; result?: string }[] = [
  { name: "Investor Schooling", kind: "High-ticket membership mastermind", text: "A paid mastermind where welcome, engagement and renewal decide whether the program survives." },
  { name: "Legacy Builder Coaching", kind: "High-ticket membership mastermind", text: "A membership where people stay only if they can see what they're getting." },
  { name: "MANY Hands United for Impact", kind: "MANY's own grassroots community", text: "MANY's own grassroots membership community, already proven, run on the same system described here." },
];

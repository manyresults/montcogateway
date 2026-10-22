/**
 * Content for the proposal on the front page (src/pages/index.astro).
 * Edit wording, numbers and allowances here. Only the monthly fee ($697) is
 * shown prominently; the two resource values ($197, $147) appear as small
 * muted text on their cards. No totals or combined values are displayed.
 */
import type { IconName } from "../lib/icons";

export const FEE = { monthly: 697, months: 12, toolkit: 197, ops: 147 };

export const INTRO = [
  "MANY will support the Montco Gateway Chamber of Commerce with newsletter production, event graphics and flyers, major-event promotional slides, and short-form video clips. The service is designed to take recurring creative production off Jude's plate while she retains control of posting and final approvals. Work will follow a shared production calendar using established brand assets and reusable templates.",
];

export const NOT_THIS =
  "This is a focused content and design service, not a strategic marketing plan, full-service marketing management, or an internal marketing coordinator role.";

/** Summary tiles under the intro. */
export const TILES: { icon: IconName; value: string; label: string; source: string }[] = [
  { icon: "circle-dollar", value: "$697", label: "Per month. No setup fee.", source: "Includes the production services, the scheduling tool and two resources" },
  { icon: "calendar", value: "12 months", label: "Proposed term", source: "January 1, 2027 through December 31, 2027" },
  { icon: "file-text", value: "Monthly", label: "Invoiced in advance", source: "Billed each month of the term" },
];

export const TERMS_NOTE =
  "Term: January 1, 2027 through December 31, 2027. Renewal is not assumed. This agreement can be altered upon agreement of both parties for scope changes. Cancellation terms, and end-of-term access to the included tools and resources, remain to be finalized before submission.";

export const DELIVERABLES: {
  icon: IconName;
  name: string;
  allowance: string;
  per: string;
  items: string[];
}[] = [
  {
    icon: "mail",
    name: "Newsletters",
    allowance: "Up to 4",
    per: "per month",
    items: [
      "One At a Glance newsletter and up to three additional issues",
      "Draft from chamber-supplied facts and source material",
      "Design in established Constant Contact templates",
      "Test and schedule following written approval",
      "Proposed size limits: up to 10 sections for At a Glance and 5 for each additional issue",
    ],
  },
  {
    icon: "image",
    name: "Event and design packages",
    allowance: "Up to 8",
    per: "per month",
    items: [
      "Each package: one template-based design concept, up to 3 digital sizes, and one matching single-page flyer using the same content",
      "Major-event promotional slides and general light-design requests draw from this same allowance, not an additional unlimited pool",
      "The slide count, dimensions and package allocation for each major event are agreed before production; multi-slide sets are not automatically one package",
    ],
  },
  {
    icon: "video",
    name: "Short-form reels",
    allowance: "Up to 20",
    per: "per month",
    items: [
      "Clips cut from your long-form recordings, up to 60 seconds each",
      "From up to 4 chamber-supplied videos totaling no more than 4 hours of source footage per month",
      "Basic trimming, vertical framing, branded captions and quality review",
      "Delivered in two scheduled batches",
    ],
  },
];

export const DELIVERABLE_NOTES = [
  "Reel output depends on the amount and quality of usable source content. The allowance is a maximum, not a guarantee that every source recording will yield enough suitable clips. Custom motion graphics, extensive manual editing and filming are excluded.",
  "Newsletter scheduling, if included in the final agreement, covers one approved send to one existing audience per issue. Additional sends, versions and list-management work are outside this scope.",
];

export const VALUE_INTRO =
  "Alongside done-for-you production, the chamber receives resources that help Jude and the team create, plan and execute with less time spent starting from scratch. These are included within the $697 monthly fee, not additional monthly charges.";

export const RESOURCES: { icon: IconName; name: string; value: string; text: string[] }[] = [
  {
    icon: "library",
    name: "Content Hub + Agency Toolkit",
    value: "$197/month",
    text: [
      "A ready-to-use resource library with plug-and-play templates, playbooks, swipe files, a social media content aggregator, and a custom chamber-branded GPT. The chamber also receives access to the training and standard operating procedures MANY uses to run campaigns, giving the team practical references for its own execution.",
      "Use these resources to get a head start on newsletter copy, event promotion and social content while maintaining the chamber's voice. Jude retains final review and posting control; AI-generated drafts and aggregated content require checks for accuracy, suitability and usage rights before publication.",
    ],
  },
  {
    icon: "sliders",
    name: "MANY Ops Console",
    value: "$147/month",
    text: [
      "Access to MANY's private suite of diagnostics, builders and calculators to help the chamber team plan and evaluate its own campaign activity. These self-service tools complement the creative production service without requiring a broader marketing-strategy engagement.",
    ],
  },
];

export const VALUE_NOTES = [
  "Included at no additional charge. Stated values describe the two resource offerings; they are not a promise of financial savings or campaign results.",
  "Access to both resources is included during the active service term. Available resources, user access, custom GPT setup, any required third-party account or subscription, and end-of-term access arrangements will be confirmed before the agreement is finalized. Resource and training access does not add unlimited custom production, live training, consulting or campaign management to the monthly scope.",
];

export const OWNERSHIP_ITEMS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "shield-check",
    title: "Everything is turned over to the chamber",
    text: "All work product, documentation, templates and related materials will be turned over to the chamber or kept accessible to it, during the engagement and after it ends.",
  },
  {
    icon: "file-text",
    title: "Documentation, SOPs and governance",
    text: "MANY will assist in creating documentation, SOPs and governance for the chamber to use for future engagements.",
  },
  {
    icon: "pencil",
    title: "Changes by agreement",
    text: "This agreement can be altered upon agreement of both parties for scope changes.",
  },
];

/** Shown under the ownership cards: what does not transfer. */
export const STAYS_WITH_MANY =
  "The Content Hub + Agency Toolkit and the MANY Ops Console are MANY's own tools and stay with MANY. The chamber has access to them during the active service term; end-of-term access arrangements will be confirmed before the agreement is finalized.";

export const SCHEDULER = [
  "MANY will provide access to a social media scheduling tool as part of the $697 monthly service, allowing chamber staff to schedule and publish content across the chamber's connected social accounts. Account connections and available publishing features are subject to the selected tool's supported platforms and each network's permissions.",
  "Jude will handle all event and social media posting, including selecting dates, scheduling and publishing the delivered creative. The included tool is available for her use; it does not transfer posting responsibilities to MANY or require her to change her current workflow. Managed social posting and community management are not included. The chamber retains ownership of its social accounts. Tool access is included during the active service term; offboarding arrangements will be defined in the final agreement.",
];

export const SETUP = [
  "No separate setup charge applies. MANY will use existing brand assets and templates where available and establish reusable layouts within the first month's agreed production calendar. Kickoff will also cover access to the Content Hub + Agency Toolkit, MANY Ops Console and social scheduling tool, plus the agreed chamber-branded GPT setup using approved brand information.",
  "Initial setup is not an additional unlimited design allowance. The first month's delivery schedule will be agreed at kickoff after access and assets are received.",
];

export const REVISIONS: { icon: IconName; text: string }[] = [
  { icon: "repeat", text: "Newsletters and event/design packages include two consolidated revision rounds per deliverable." },
  { icon: "video", text: "Reels include two consolidated revision rounds per delivery batch, rather than separate rounds for every individual clip." },
  { icon: "user-check", text: "A revision round is one complete set of feedback from the chamber's designated approver." },
  { icon: "pencil", text: "Revisions refine the original brief. New concepts, replacement source footage, new formats, or material changes after approval may require additional scope." },
  { icon: "check-circle", text: "Corrections of MANY's errors do not count toward revision rounds." },
  { icon: "file-text", text: "Additional revisions or out-of-scope work require a separate written estimate and approval before production." },
];

export const LEAD_INTRO =
  "Use Jude's advance event visibility to plan production before work becomes urgent. At kickoff, map known major events, including IWD, the Holiday Lunch and the Golf Outing, across the service year. Maintain a rolling 90-day view of regular events and confirm the next month's production priorities together. Major-event creative should be scheduled backward from the first promotional use, not merely the event date.";

export const LEAD_INTRO_2 =
  "Advance notice reserves planning time; production begins only once the required brief, content and assets are complete. Sponsor details or other late changes should be identified separately so they do not hold up approved base creative unnecessarily. They remain subject to the revision and scope limits below.";

/** [work type, required submission timing, first-draft target] */
export const LEAD_TABLE: [string, string, string][] = [
  ["Newsletters", "Complete materials at least 10 business days before the intended send", "Within 5 business days of complete intake, according to the agreed calendar"],
  ["Event/design packages", "Complete materials at least 7 business days before first promotional use, not the event date", "Within 3 business days of complete intake, according to the agreed calendar"],
  ["Reel batches", "Source footage submitted for the agreed twice-monthly production windows", "Within 5 business days of complete intake for the scheduled batch"],
];

export const LEAD_RULES = [
  "In-scope revisions: within 2 business days per consolidated round.",
  "Jude is the single designated approver. Consolidated feedback is requested within 2 business days; the calendar must allow time for any second revision round. Any additional chamber input should be consolidated by Jude before it reaches MANY.",
  "Newsletter approval: written approval at least 1 business day before sending. Silence is not approval.",
  "Timelines begin only when the brief, required access and all assets are complete.",
  "Late materials, delayed approvals or brief changes may shift delivery dates.",
  "Monthly allowances are scheduled across the calendar; turnaround commitments do not apply to the entire allowance submitted simultaneously.",
  "Rush requests are subject to availability and a separately approved quote.",
];

/** "Submissions and file sharing" card. */
export const SUBMIT = {
  supportUrl: "https://manyresults.com/support",
  supportLabel: "manyresults.com/support",
  email: "info@manyresults.com",
  intro: "All submissions can be sent through either channel below.",
  drive:
    "Source materials, assets and delivered work are exchanged through a Google Drive share controlled by the chamber. The chamber decides who has access.",
};

export const RESPONSIBILITIES = [
  "Jude as the designated approver, providing consolidated feedback and final approval.",
  "Accurate event dates, locations, prices, registration links, sponsor details and source information.",
  "Approved logos, brand assets, photos and video files, with permission for their intended use.",
  "Authorized access to Constant Contact and required shared assets.",
  "A Google Drive share, controlled by the chamber, for exchanging source materials and delivered work.",
  "Approval of factual accuracy and permission to send each newsletter.",
];

export const OWNERSHIP =
  "The chamber retains ownership and control of its accounts and contact lists. Account ownership recovery and Meta Business troubleshooting are not part of this production service.";

export const EXCLUDED = [
  "Filming",
  "Event attendance",
  "New brand identity development",
  "Extensive original research or interviews",
  "Custom animation",
  "Website work",
  "Advertising management",
  "Daily social posting",
  "Community management",
  "CRM administration",
  "General IT support",
  "Account recovery",
];

/** Shown right under the exclusions list. */
export const ADDABLE =
  "These services can be scoped and added. Any of the services above can be scoped and added to this agreement. MANY will provide a written estimate, and additional work begins only once both parties have agreed in writing.";

export const EXCLUSION_NOTES = [
  "Applying existing chamber branding to the included custom GPT is included; broader brand development is not.",
  "The Content Hub + Agency Toolkit and MANY Ops Console provide self-service resources, not a separate managed campaign service. Their inclusion does not expand the monthly production allowances or add bespoke software development, custom integrations, unlimited GPT changes, or ongoing one-to-one consulting.",
  "Jude schedules and posts delivered graphics, promotional slides and reels using her preferred workflow; the included social media scheduling tool is available if useful. Newsletter scheduling by MANY is proposed separately as described above and must be confirmed before submission. Jude's confirmation that she will handle posting is not treated as approval for MANY to send newsletters.",
  "Unused allowances expire at month-end and do not roll over. Additional work is quoted and approved in writing before production. Access to the social media scheduling tool, Content Hub + Agency Toolkit and MANY Ops Console is included in the monthly fee. Responsibility for any required third-party GPT subscription and other platform subscriptions, stock assets, music licensing and third-party expenses must be assigned clearly in the final agreement; no extra charges will be incurred without approval.",
];

/** The delivery process, in order. `list` renders as bullets after the paragraphs. */
export const SOP: { icon: IconName; title: string; text: string[]; list?: string[] }[] = [
  {
    icon: "calendar-check",
    title: "Plan and intake",
    text: [
      "Maintain one shared production calendar and request queue. At kickoff, map the year's known major events and their first promotional dates. Keep a rolling 90-day event view, reflecting Jude's typical 30–90-day notice for regular events and months of lead time for major events. Each month, confirm the newsletter send dates (up to four), allocation of the design packages (up to eight), major-event slide requirements, and two reel batch windows.",
      "Requests arrive through manyresults.com/support or info@manyresults.com. Each request must include the objective, source content, required formats, assets and intended publication date. Define each major-event slide set's count, dimensions and allowance usage before assigning work. Do not treat major-event campaigns as unlimited work or assume that an event date is the creative deadline.",
    ],
  },
  {
    icon: "layers",
    title: "Assign and produce",
    text: [
      "Provision the agreed resource access at kickoff. Assign an owner for the chamber-branded GPT setup, use approved brand/source information, and test representative drafts before handoff. Confirm with Jude what information may be used; do not load confidential member data without authorization. Provide the relevant toolkit training and SOP references for the chamber team's self-service use.",
      "Assign a production owner and reviewer internally. Use established newsletter and event templates. Process supplied videos, then select and refine suitable clips. Do not deliver raw automated output without review.",
    ],
  },
  {
    icon: "shield-check",
    title: "Quality check",
    text: ["Before sending drafts, check:"],
    list: [
      "Names, dates, locations, prices, registration links and sponsor placement against supplied information.",
      "Newsletter subject line, preview text, sender, audience, links, mobile layout and test email.",
      "Graphic readability, consistent branding, dimensions and flyer export quality.",
      "Reel caption accuracy, names, audio, framing, clean start/end points, and whether the excerpt preserves the speaker's meaning.",
      "Appropriate permissions for supplied assets and any added music or stock content.",
    ],
  },
  {
    icon: "repeat",
    title: "Review and revise",
    text: [
      "Send drafts in organized review groups directly to Jude, the confirmed single approver. Collect one consolidated response per round. Jude coordinates any other chamber input internally. Record revision rounds and flag scope changes before doing additional work.",
    ],
  },
  {
    icon: "send",
    title: "Approve and deliver",
    text: [
      "Obtain Jude's written newsletter approval before any agreed newsletter scheduling. Deliver approved graphics, flyers, promotional slides and reels in clearly named folders in the chamber-controlled Google Drive share, organized by event or publication date, for Jude to post. Record final approvals and delivery dates. MANY does not schedule event or social posts on Jude's behalf.",
    ],
  },
  {
    icon: "gauge",
    title: "Track effort and capacity",
    text: [
      "Track production, QA, communication and revision time separately during the initial delivery period. Review whether the package is sustainable before treating the proposed quantities and service standards as proven. Any later scope or fee changes require mutual agreement.",
    ],
  },
];

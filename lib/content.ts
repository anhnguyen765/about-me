/**
 * One source of truth for the page, the terminal, and the structured data.
 * Every number here is either supplied by Anh or lifted from the existing site.
 * Anything unverified lives behind a marked [PLACEHOLDER].
 */

export const CONTACT = {
  name: "Anh Nguyen",
  nickname: "Bo",
  email: "anh.nguyen762005@gmail.com",
  linkedin: "https://linkedin.com/in/anh-nguyen76",
  github: "https://github.com/anhnguyen765",
  githubOrg: "https://github.com/Project-X-Vietnam",
  essay:
    "https://substack.com/home/post/p-196285345",
  substack: "https://anhnguyen765.substack.com",
  oliu: "https://oliu-26.vercel.app",
  dopameal: "https://bpm-dopameal.vercel.app",
  cv: "[CV PDF]",
  catPhoto: "[CAT PHOTO]",
  catNames: "[CAT NAME(S)]",
} as const;


export const CONNECT = {
  zalopay: "https://zalopay.vn/",
  projectX: "https://projectxvietnam.org",
  partnerEmail: "anhn.pjxvietnam@gmail.com",
  partnerMail: `mailto:anhn.pjxvietnam@gmail.com?subject=${encodeURIComponent("Partnering with Project X Vietnam")}`,
} as const;

/** Zalopay activities, linked to the public LinkedIn posts (tracking params stripped).
 *  Labels come from the post hashtags only; add a one-line `note` once you have wording. */
export const ZALOPAY_ACTIVITIES: { tag: string; title: string; href: string; note?: string }[] = [
  {
    tag: "#XuatNgoaiClub",
    title: "Xuất Ngoại Club",
    href: "https://www.linkedin.com/posts/zalopay_zalopay-xuatngoaiclub-activity-7505481690568376321-BC0h",
  },
  {
    tag: "#LifeAtZalopay #ZalopayStarter",
    title: "Life at Zalopay · Zalopay Starter",
    href: "https://www.linkedin.com/posts/zalopay_zalopay-lifeatzalopay-zalopaystarter-activity-7495735647287160832-rULp",
  },
];

export const TOOLS_IN_USE = [
  { name: "Ghostty", role: "terminal", src: "/tools/ghostty.png", href: "https://ghostty.org" },
  { name: "VS Code", role: "editor", src: "/tools/vscode.png", href: "https://code.visualstudio.com" },
  { name: "Dia", role: "browser", src: "/tools/dia.png", href: "https://www.diabrowser.com" },
] as const;

export type SkillItem = { name: string; what: string; slug?: string; kw?: string[] };

/** Shown as logo chips in /about's .env block. `what` is a public one-line definition;
 *  the popover cross-checks each against the career timeline, so claims stay honest. */
export const SKILLS: { key: string; items: SkillItem[] }[] = [
  {
    key: "languages",
    items: [
      { name: "Go", slug: "go", what: "a compiled language from Google, built for simple, fast services." },
      { name: "Python", slug: "python", what: "a general-purpose language for scripting and data work." },
      { name: "TypeScript", slug: "typescript", what: "JavaScript with types. This site is written in it." },
      { name: "JavaScript", slug: "javascript", what: "the language of the web." },
      { name: "Java", slug: "openjdk", what: "a statically typed language that runs on the JVM." },
      { name: "C#", what: "a typed language from Microsoft that runs on .NET." },
      { name: "SQL", what: "the language for querying relational data." },
      { name: "HTML/CSS", slug: "html5", kw: ["html", "css"], what: "the markup and styling of every web page." },
    ],
  },
  {
    key: "data",
    items: [
      { name: "PySpark", slug: "apachespark", what: "the Python API for Apache Spark, for distributed data processing." },
      { name: "Presto", slug: "presto", what: "a distributed SQL engine for querying large datasets." },
      { name: "GA4", slug: "googleanalytics", what: "Google Analytics 4, event-based analytics for web and apps." },
      { name: "Cohort & funnel analysis", kw: ["cohort", "funnel"], what: "following groups of users and where they drop off." },
      { name: "Hypothesis testing", kw: ["hypothesis"], what: "checking whether a difference is real or noise." },
    ],
  },
  {
    key: "ai",
    items: [
      { name: "Agents", kw: ["agent", "agents"], what: "LLMs that take steps with tools, not just answer questions." },
      { name: "Agent skills", kw: ["agent skills"], what: "packaged, reusable instructions an agent can follow." },
      { name: "MCP", what: "Model Context Protocol, a standard way to connect assistants to tools and data." },
      { name: "LLM workflows", kw: ["llm"], what: "chaining model calls into a repeatable process." },
      { name: "Human-in-the-loop", kw: ["human-in-the-loop"], what: "a person reviews and approves before anything is final." },
    ],
  },
];

export type Why = { title: string; body: string };

/** Draft "why" copy, built from facts already on the site. Edit freely. */
export const JORA_WHY: Why[] = [
  {
    title: "A number travels further than the analysis behind it",
    body: "Once a figure lands in a document, people reuse it. Checking it afterwards is too late, so jora puts the check before the number is written down.",
  },
  {
    title: "An assistant should get answers, not tables",
    body: "Hand a model raw tables and it will guess. I wanted it to receive a computed, checked result instead.",
  },
  {
    title: "The safe path should be the easy path",
    body: "Read-only by default, credentials never printed, a confirm step before any write. Trust comes from what the tool makes hard to get wrong.",
  },
  {
    title: "If the tool doesn’t exist, build it",
    body: "I’d rather spend an afternoon on the instrument than another week arguing from numbers I can’t trust.",
  },
];

export const PROJECT_X_WHY: Why[] = [
  {
    title: "Access is the scarce thing",
    body: "Young tech talent can learn a skill almost anywhere. What’s rare is time with people who have shipped the thing being taught, which is what the program is built around.",
  },
  {
    title: "I was a fellow first",
    body: "I joined in 2024 as a fellow, so I know the program from the inside. I stayed to build it for the next cohort.",
  },
  {
    title: "It should outlive any one cohort",
    body: "The work I’m proudest of is less visible: recruiting the next organising team so the community doesn’t depend on one group of people.",
  },
];

export const LINKS = {
  heading2025Final:
    "/proposals/Project X__Infina_Final Round_H4TFPM2025.pdf",
  heading2025Round2:
    "/proposals/Project X__Weshare_Round 2_H4TFPM2025.pdf",
  finnovate2: "/proposals/Simpồ_FinInnovate_Round2_FBAC2025.pdf",
  finnovate3: "/proposals/Simpồ_FinInnovate_Round3_FBAC2025.pdf",
} as const;

export type NavItem = { id: string; index: string; label: string; terminal: string };

export const NAV: NavItem[] = [
  { id: "index", index: "01", label: "Index", terminal: "index" },
  { id: "work-payments", index: "02", label: "Payments", terminal: "payments" },
  { id: "work-cross-border", index: "03", label: "Cross-border", terminal: "xborder" },
  { id: "work-growth", index: "04", label: "Growth", terminal: "growth" },
  { id: "builds", index: "05", label: "Builds", terminal: "builds" },
  { id: "community", index: "06", label: "Project X", terminal: "community" },
  { id: "thinking", index: "07", label: "Thinking", terminal: "thinking" },
  { id: "human", index: "08", label: "Human", terminal: "human" },
];

export type SpecRow = { key: string; value: string; href?: string };

export const SPEC_SHEET: SpecRow[] = [
  {
    key: "role",
    value: "Product Strategist — Growth & Retention, Zalopay (Sep 2026–now)",
  },
  {
    key: "prev",
    value:
      "Product Owner — Payment Core & Cross-Border Payments, Zalopay (Nov 2025–Sep 2026)",
  },
  {
    key: "scale",
    value: "5M+ txn/day · 8+ funding sources · 11 markets",
  },
  {
    key: "networks",
    value: "Alipay+ · Tenpay · Visa · VietQR",
  },
  {
    key: "education",
    value:
      "Bachelor of Information Technology — Computer Science; minor in Mathematics & Statistics — QUT, 2023–2025 · graduated with Distinction",
  },
  {
    key: "based",
    value: "Brisbane / HCMC · full Australian work rights",
  },
  {
    key: "languages",
    value: "Go · Python · TypeScript · JavaScript · Java · C# · SQL · HTML/CSS",
  },
  {
    key: "data",
    value:
      "PySpark · Presto · GA4 · cohort & funnel analysis · hypothesis testing",
  },
  {
    key: "ai",
    value:
      "agents · agent skills · MCP · LLM workflows · human-in-the-loop governance",
  },
  {
    key: "tools",
    value:
      'Jira · Confluence · Tableau · DataHub · Figma · "strong opinions about funnels"',
  },
];

export const HERO_STATS = [
  { value: "5M+", label: "transactions / day" },
  { value: "11", label: "markets" },
  { value: "2×+", label: "monthly paying users" },
  { value: "98.8%", label: "Quick Pay success" },
];

export type CaseSection = "payments" | "cross-border" | "growth";

export type CaseStudy = {
  id: string;
  section: CaseSection;
  index: string;
  title: string;
  severity: "high" | "medium";
  owner: string;
  status: string;
  context: string;
  signal: string;
  rootCause: string;
  decision: string;
  outcome: string;
  system: string[];
  tags: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "8s-800ms",
    section: "payments",
    index: "02.1",
    title: "The 8-second wait for an 800ms answer",
    severity: "high",
    owner: "payments platform",
    status: "resolved",
    context:
      "The acquiring service waited 8 seconds for a risk verdict. The risk engine answered in 800 milliseconds. Payments still auto-failed.",
    signal:
      "The answer was not missing. It was arriving after the path had already given up.",
    rootCause:
      "The risk check sat in the acquiring path, behind an 8-second timeout, instead of in the authentication layer where the decision was actually needed.",
    decision:
      "Move the risk check into the authentication layer. Keep the acquiring path for acquisition.",
    outcome:
      "Avoidable auto-fails removed without shortening the risk engine’s window or weakening the decision.",
    system: [
      "acquiring timeout: 8000ms",
      "risk verdict: 800ms",
      "fault line: the check lived one layer too low",
      "fix: risk check moves into authentication",
    ],
    tags: ["failure path", "timeout budget", "layering"],
  },
  {
    id: "limit-ops",
    section: "payments",
    index: "02.2",
    title: "72 hours to change a limit",
    severity: "medium",
    owner: "payments operations",
    status: "shipping",
    context:
      "Limit changes were manual: 72-hour turnaround, 30–50 ad-hoc requests a week.",
    signal:
      "The queue had become the product. Operations was doing policy work through chat and spreadsheets.",
    rootCause:
      "No self-service surface, no shared policy layer, and no audit trail — so every request became a conversation.",
    decision:
      "Build a self-service limit platform with a policy check and an audit trail.",
    outcome:
      "Target: under 1 hour, with every change attributable. The 72-hour manual path is being retired.",
    system: [
      "before: request → ops queue → manual check → 72h",
      "after: request → policy → self-service → audit log → <1h (target)",
      "load: 30–50 ad-hoc requests / week",
      "constraint: policy ownership cannot move without the audit trail",
    ],
    tags: ["operations debt", "self-service", "audit"],
  },
  {
    id: "border-research",
    section: "cross-border",
    index: "03.5",
    title: "The QR code wasn’t the failure",
    severity: "medium",
    owner: "cross-border discovery",
    status: "resolved",
    context:
      "At the Vietnam–China border, QR payments failed in ways the dashboard did not explain.",
    signal:
      "The same failure showed up across different networks, devices and merchants. The pattern did not follow the payment rail.",
    rootCause:
      "A coordination problem: network, merchant terminal, connectivity, user behaviour and reconciliation were each owned by a different party. The QR code was only where the symptom surfaced.",
    decision:
      "Check field failures against transaction logs, reframe the problem as coordination, and rank ten initiatives by leverage.",
    outcome:
      "A ranked list of 10 initiatives instead of a list of QR bugs. The field notes changed what the roadmap considered a dependency.",
    system: [
      "field observation → transaction log → failure class",
      "failure classes: rail · terminal · connectivity · user · reconciliation",
      "output: ranked 10 initiatives",
      "lesson: dashboards don’t tell you the shop’s Wi-Fi is down",
    ],
    tags: ["field research", "coordination", "root cause"],
  },
  {
    id: "bnpl-target",
    section: "growth",
    index: "04.1",
    title: "The BNPL target was the wrong lever",
    severity: "high",
    owner: "growth & retention",
    status: "resolved",
    context:
      "The plan: lift BNPL submission rate from 23% to 26% and treat that as the path to paying-user growth.",
    signal:
      "Modelled end to end, the target closes only ~3% of the paying-user gap. Dormant approved accounts cover 5–10× more.",
    rootCause:
      "The metric was being optimised as an outcome when it was an input. The larger constraint was activation of accounts that had already been approved and never used.",
    decision:
      "Push back on the target with the arithmetic, then re-sequence the roadmap around dormant-account activation.",
    outcome:
      "A shared model of the gap, a smaller ask on submission rate, and a larger lever on activation. The target became a hypothesis, not a mandate.",
    system: [
      "current submission: 23%",
      "proposed target: 26%",
      "gap closed by target: ~3%",
      "dormant approved accounts: 5–10× more",
    ],
    tags: ["target setting", "arithmetic", "activation"],
  },
  {
    id: "retention-kill",
    section: "growth",
    index: "04.3",
    title: "The retention idea we killed",
    severity: "medium",
    owner: "growth & retention",
    status: "resolved",
    context:
      "Non-payment mini apps were proposed as a retention lever for a 95% D30 target.",
    signal:
      "Measured uplift was +0.7 pp. The target needed +15 pp.",
    rootCause:
      "The lever was real but an order of magnitude too small for the metric it was attached to. Continuing would have spent a quarter to protect a narrative.",
    decision:
      "Deprioritise the programme, say so explicitly, and run one randomised test to settle the remaining question.",
    outcome:
      "One test instead of a programme. The D30 target kept its budget for levers with plausible magnitude.",
    system: [
      "observed: +0.7 pp",
      "required for 95% D30: +15 pp",
      "decision: deprioritise",
      "remaining spend: one randomised test",
    ],
    tags: ["kill decision", "magnitude", "retention"],
  },
];

export const ROOT_CAUSES = CASE_STUDIES.map((study) => ({
  id: study.id,
  index: study.index,
  title: study.title,
  rootCause: study.rootCause,
}));

export type TimelineEntry = { date: string; message: string };

export const TIMELINE: TimelineEntry[] = [
  { date: "nov 2026", message: "feat: internal workflow cli (go)" },
  { date: "sep 2026", message: "refactor: move to growth & retention strategy" },
  { date: "jun 2026", message: "feat: babywhy @ vng claw-a-thon 2026" },
  {
    date: "may 2026",
    message: "feat: first agent skills for product work (go)",
  },
  { date: "feb 2026", message: "feat: sfp26 landing page" },
  {
    date: "nov 2025",
    message: "feat: join zalopay — payment core & cross-border",
  },
  { date: "nov 2025", message: "feat: qut capstone (106 commits)" },
  { date: "nov 2024", message: "feat: join project x vietnam" },
  {
    date: "jan 2024",
    message: "feat: password manager w/ facial recognition (24/25)",
  },
];

export type Toolkit = {
  id: string;
  name: string;
  kicker: string;
  summary: string;
  detail: string;
  stack: string[];
  notes: string[];
};

/**
 * The internal systems that do the daily work. General highlight only:
 * no private workflow names, repo structure, commit counts or company data.
 */
export const TOOLKITS: Toolkit[] = [
  {
    id: "jora",
    name: "jora",
    kicker: "local data CLI · analysis, checked",
    summary:
      "The instrument I reach for before an analysis: find the right source, run the query, check the result, then write the number down.",
    detail:
      "jora is a local command-line workflow and skill set for product analysis. It scouts the available data sources, runs the query against the right one, and checks the output before a result is allowed into a document. The model gets a computed answer, not a pile of raw tables to guess from.",
    stack: ["Go", "CLI", "data catalogue", "query runner", "checks", "MCP"],
    notes: [
      "a read-only bridge between the assistant and the data",
      "credentials never printed",
      "computed results, not raw exports, reach the model",
      "offline checks before a number is reused",
    ],
  },
  {
    id: "po-toolkit",
    name: "PO toolkit",
    kicker: "agent skills · product operations",
    summary:
      "A set of agent skills for the recurring work of a product owner: discovery, prioritisation, requirements, analytics and go-live readiness.",
    detail:
      "The toolkit turns recurring product workflows into structured, reviewable steps. Each skill takes a defined input, produces a draft a human can inspect, and stops before any shared document changes. The point is not to remove the product owner; it is to make the routine parts consistent and leave the judgement where it belongs.",
    stack: [
      "agent skills",
      "LLM workflows",
      "MCP",
      "Jira / Confluence APIs",
      "human-in-the-loop",
    ],
    notes: [
      "8+ recurring product workflows",
      "dry-run, then confirm, for every write",
      "audit log for shared-document changes",
      "an agent contract for contributors",
    ],
  },
];

/** Public work is summarised, not listed. One profile link, no repo-by-repo index. */
export const PUBLIC_REPOS = {
  count: 4,
  note:
    "Four public repositories stay on GitHub: a QUT capstone, a product-management course build, a personalised agent-skills fork, and a Raspberry Pi password manager using facial recognition.",
  profile: CONTACT.github,
} as const;

export const REPO_COUNT = 27;

export const METRICS = {
  platform: {
    transactions_per_day: "5M+",
    funding_sources: "8+",
    networks: ["Alipay+", "Tenpay", "Visa", "VietQR"],
    markets: 11,
  },
  cross_border: {
    monthly_paying_users: "2x+ in three months (Apr–Jun 2026)",
    target_attainment: "125% of target",
    payment_volume: "2–4x target",
  },
  quick_pay: {
    success_rate: "98.8%",
    scan_qr_response: "1.4s -> 0.4s in testing",
  },
  risk_timeout: {
    acquiring_service: "8s",
    risk_engine: "800ms",
  },
  limit_operations: {
    manual_turnaround: "72h",
    ad_hoc_requests_per_week: "30–50",
    self_service_target: "<1h",
    audit_trail: true,
  },
  landing_pages: {
    conversion_gap: "5.3x",
    journey_stage_gaps: 7,
    country_page_strategy: 11,
  },
  bnpl: {
    submission_rate: "23% -> 26%",
    paying_user_gap_closed: "~3%",
    dormant_approved_lever: "5–10x",
    hypotheses_validated: 6,
    dropoff_never_tapped_cta: "59%",
    lending_rule_rejection_comparison: "4x more than lending-rule rejections",
    nfc_identity_verification: "39.9% vs 5.2% across platforms",
  },
  retention: {
    mini_app_uplift: "+0.7pp",
    needed_for_95_d30: "+15pp",
  },
  project_x: {
    growth_team: 6,
    landing_page_views: "6,700+",
    applications: 716,
    end_to_end_funnel: "24%",
    left_before_key_information: "72%",
    ad_impressions_wasted: "~46%",
    email_open_rate: "66% -> 32%",
    linkedin_conversion: "63%",
    meta_traffic_share: "70%",
    young_tech_talents_reached_2025: "6,000+",
    curriculum_hours: "40+",
    mentors: "85+",
    partner_companies: "60+",
    mentor_companies: ["Google", "Meta", "Amazon", "NVIDIA", "NAB"],
  },
  code: {
    github_repositories: 27,
    qut_capstone_commits: 106,
    ifb102_score: "24/25",
  },
} as const;

export type Recognition = {
  title: string;
  detail: string;
  year: string;
  links?: { label: string; href: string; size?: string }[];
};

export const RECOGNITION: Recognition[] = [
  {
    title: "Winner — Heading For The Future: Product Management",
    detail: "Project X Vietnam. Both competition decks are public.",
    year: "2025",
    links: [
      { label: "Final round · Infina", href: LINKS.heading2025Final, size: "9.8 MB" },
      { label: "Round 2 · Weshare", href: LINKS.heading2025Round2, size: "4.2 MB" },
    ],
  },
  {
    title: "2nd Runner-Up — Future Business Analyst",
    detail: "Season 5. Simpồ FinInnovate, rounds two and three.",
    year: "2025",
    links: [
      { label: "Round 2", href: LINKS.finnovate2, size: "6.0 MB" },
      { label: "Round 3", href: LINKS.finnovate3, size: "18.7 MB" },
    ],
  },
  {
    title: "QUT Executive Dean’s Commendation",
    detail: "Academic excellence.",
    year: "2025",
  },
  {
    title: "QUT International Merit Scholarship",
    detail: "Undergraduate scholarship.",
    year: "2023–2025",
  },
];

export const GALLERY = [
  { src: "/gallery/h4tf_jena.jpeg", alt: "At Heading For The Future: Product Management.", caption: "Heading For The Future" },
  { src: "/gallery/pe.jpeg", alt: "A group photo at a Zalopay event.", caption: "At Zalopay" },
  { src: "/gallery/pjx_snhatahung_25.jpeg", alt: "The Project X team celebrating a birthday, 2025.", caption: "Project X team, 2025" },
  { src: "/gallery/set_alumnitalk.jpeg", alt: "A large group at an alumni talk.", caption: "Alumni talk" },
  { src: "/gallery/set_bris_expo25.jpeg", alt: "A Brisbane expo group photo, 2025.", caption: "Brisbane expo, 2025" },
  { src: "/gallery/fba.jpeg", alt: "A team photo from Future Business Analyst.", caption: "Future Business Analyst" },
  { src: "/gallery/qut_publication_group.jpeg", alt: "A coding session in a QUT classroom.", caption: "Coding at QUT" },
  { src: "/gallery/qut_classic25.jpeg", alt: "A QUT sports event in 2025.", caption: "QUT Classic, 2025" },
  { src: "/gallery/kelvingrove_badminton.jpeg", alt: "A big group after badminton at Kelvin Grove.", caption: "Badminton, Kelvin Grove" },
  { src: "/gallery/white_dinner_bris.jpeg", alt: "A selfie at White Dinner in Brisbane.", caption: "White Dinner, Brisbane" },
  { src: "/gallery/lagi25.jpeg", alt: "Three friends at the beach, 2025.", caption: "By the sea, 2025" },
  { src: "/gallery/vietq.jpeg", alt: "A group of friends at a community event in Vietnam.", caption: "Vietnam" },
  { src: "/gallery/grad.jpeg", alt: "Graduation day with family.", caption: "Graduation" },
  { src: "/gallery/highschool_grad.jpeg", alt: "A high school graduation group photo.", caption: "High school graduation" },
];

export const CAT_LINES = [
  "purrr. the funnel is fine. the wi-fi is not.",
  "i read the logs. the timeout is the bug.",
  "5M transactions. still no snacks.",
  "status: napping · priority: P0.",
  "the metric is a symptom.",
  "back to work. or don’t.",
  "i have reviewed your roadmap. it needs a nap.",
] as const;

export const PROJECT_X_DESIGN = [
  { src: "/graphicdesign/pjx2025_ebpost.jpg", alt: "Project X event branding, 2025." },
  { src: "/graphicdesign/pjx2025_recruitment.jpg", alt: "Project X recruitment campaign, 2025." },
  { src: "/graphicdesign/pjx2026_casetrainer.jpg", alt: "Project X case trainer campaign, 2026." },
];
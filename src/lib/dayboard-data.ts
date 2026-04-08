export const navigationItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Goals", href: "/goals" },
  { label: "Lists", href: "/lists" },
  { label: "Mind", href: "/mind" },
  { label: "Body", href: "/body" },
  { label: "Finance", href: "/finance" },
  { label: "Settings", href: "/settings" },
];

export const homePreviewStats = [
  {
    title: "Weekly goals",
    value: "6 / 8",
    caption: "Two priorities still need a protected block this week.",
  },
  {
    title: "Budget status",
    value: "$1,240",
    caption: "Discretionary money left after fixed spending clears.",
  },
  {
    title: "Lists",
    value: "18 active",
    caption: "Across books, movies, TV shows, and whatever else needs a trackable list.",
  },
  {
    title: "Mind streak",
    value: "11 days",
    caption: "You only need one short learning or skills session today to keep it alive.",
  },
];

export const weeklyFocus = [
  "Close the loop on Dayboard auth and data wiring, not just UI polish.",
  "Tighten the active Lists queue and capture the notes worth reusing.",
  "Review discretionary spending before the next subscription cycle hits.",
  "Protect three Mind sessions in the calendar before the week gets noisy.",
];

export const appHighlights = [
  {
    kicker: "Unified system",
    title: "One board for life admin",
    body: "Lists, budgets, weekly priorities, Body sessions, and Mind progress should not compete across separate tools if they all draw from the same time and attention budget.",
  },
  {
    kicker: "Evidence-backed",
    title: "Built around how people actually follow through",
    body: "Goals, Mind, Body, Lists, and Finance work better when the product supports review, resurfacing, self-monitoring, and clear next actions instead of passive storage.",
  },
  {
    kicker: "Built to grow",
    title: "Useful now, expandable later",
    body: "The product can launch free with a clean core experience and still leave room for subscriptions, richer automation, and AI features later.",
  },
  {
    kicker: "AWS path",
    title: "Web launch is already live",
    body: "The app is structured for Amplify hosting, Cognito auth, RDS PostgreSQL, S3 uploads, and SES once transactional email is wired in properly.",
  },
  {
    kicker: "Body layer",
    title: "Training belongs in the same system",
    body: "Gym sessions, runs, weigh-ins, and nutrition notes are part of the same operating rhythm as goals, Mind work, and recovery.",
  },
];

export const moduleSummaries = [
  {
    slug: "goals",
    href: "/goals",
    kicker: "Execution",
    title: "Goals",
    description:
      "Run weekly planning, habit tracking, and review loops from one page so priorities don’t get buried under lists.",
    features: ["weekly goals", "habits", "review", "carry-forward", "streaks"],
  },
  {
    slug: "lists",
    href: "/lists",
    kicker: "Collections",
    title: "Lists",
    description:
      "One place for books, movies, TV shows, wishlists, ideas, restaurants, or any other category you want to track without creating a new product section.",
    features: ["custom categories", "status", "ratings", "notes", "queues"],
  },
  {
    slug: "finance",
    href: "/finance",
    kicker: "Money",
    title: "Finance",
    description:
      "Track spending, recurring charges, accounts, budgets, and monthly direction without turning the app into accounting software.",
    features: ["transactions", "budgets", "accounts", "recurring", "net worth"],
  },
  {
    slug: "mind",
    href: "/mind",
    kicker: "Growth",
    title: "Mind",
    description:
      "Organize skills, learning tracks, resources, sessions, and notes so mental growth becomes part of your operating rhythm instead of a someday list.",
    features: ["skills", "tracks", "resources", "sessions", "notes"],
  },
  {
    slug: "body",
    href: "/body",
    kicker: "Training",
    title: "Body",
    description:
      "Log exercise, bodyweight, eating notes, and recovery so physical health sits inside the same system as goals and finance.",
    features: ["exercise", "bodyweight", "nutrition", "distance", "recovery"],
  },
];

export const evidencePrinciples = [
  {
    area: "Goals",
    title: "Specific goals plus concrete plans",
    summary:
      "Goal-setting research favors specific goals with feedback over vague intentions. Implementation intentions strengthen that by turning a goal into a concrete if-then response.",
    productChanges: ["weekly targets", "if-then planning", "progress review", "carry-forward"],
  },
  {
    area: "Lists + Mind",
    title: "Resurfacing beats passive storage",
    summary:
      "The forgetting curve matters when the product helps people revisit what they saved. Spacing and retrieval practice support review prompts, resurfacing, and active recall more than simple bookmarking.",
    productChanges: ["review prompts", "resurface later", "recall notes", "repeat sessions"],
  },
  {
    area: "Body",
    title: "Self-monitoring needs to stay lightweight",
    summary:
      "Health behavior change interventions repeatedly find self-monitoring useful, but only when logging is simple enough to repeat. Body should optimize for quick capture and visible patterns.",
    productChanges: ["compact logs", "repeatable sessions", "trends", "small actions"],
  },
  {
    area: "Finance",
    title: "Defaults and pre-commitment matter",
    summary:
      "Behavioral economics shows that future-friendly defaults and pre-commitment can outperform pure willpower. Finance should bias toward recurring systems and savings rules, not just post-hoc review.",
    productChanges: ["recurring rules", "savings defaults", "monthly review", "future transfers"],
  },
];

export const evidenceReferences = [
  {
    title: "Building a Practically Useful Theory of Goal Setting and Task Motivation: A 35-Year Odyssey",
    authors: "Locke & Latham (2002)",
    whyItMatters:
      "Supports the Goals section leaning on specific, challenging goals and visible feedback instead of vague aspiration tracking.",
    url: "https://doi.org/10.1037/0003-066X.57.9.705",
  },
  {
    title: "Implementation Intentions and Goal Achievement: A Meta-Analysis of Effects and Processes",
    authors: "Gollwitzer & Sheeran (2006)",
    whyItMatters:
      "Supports if-then planning inside Goals and Body so intentions become concrete actions tied to a cue or context.",
    url: "https://doi.org/10.1016/S0065-2601(06)38002-1",
  },
  {
    title: "Does Monitoring Goal Progress Promote Goal Attainment? A Meta-Analysis of the Experimental Evidence",
    authors: "Harkin et al. (2016)",
    whyItMatters:
      "Supports progress tracking, review loops, and showing completed versus unfinished work across the product.",
    url: "https://doi.org/10.1037/bul0000025",
  },
  {
    title: "Distributed Practice in Verbal Recall Tasks: A Review and Quantitative Synthesis",
    authors: "Cepeda, Pashler, Vul, Wixted, & Rohrer (2006)",
    whyItMatters:
      "Supports resurfacing saved information, spaced reviews, and repeat exposure in Lists and Mind rather than assuming storage alone creates retention.",
    url: "https://doi.org/10.1037/0033-2909.132.3.354",
  },
  {
    title: "Improving Students’ Learning With Effective Learning Techniques",
    authors: "Dunlosky et al. (2013)",
    whyItMatters:
      "Supports using retrieval practice and distributed practice as part of Mind, especially for notes, sessions, and review prompts.",
    url: "https://doi.org/10.1177/1529100612453266",
  },
  {
    title: "Effective Techniques in Healthy Eating and Physical Activity Interventions: A Meta-Regression",
    authors: "Michie, Abraham, Whittington, McAteer, & Gupta (2009)",
    whyItMatters:
      "Supports Body emphasizing self-monitoring and practical repeatable behavior techniques instead of only storing workout history.",
    url: "https://doi.org/10.1037/a0016136",
  },
  {
    title: "Save More Tomorrow: Using Behavioral Economics to Increase Employee Saving",
    authors: "Thaler & Benartzi (2004)",
    whyItMatters:
      "Supports Finance features that use pre-commitment, recurring rules, and future-saving defaults rather than relying only on self-control.",
    url: "https://doi.org/10.1086/380085",
  },
];

export const evidenceBooks = [
  {
    title: "Make It Stick",
    author: "Brown, Roediger, & McDaniel",
    note:
      "A readable bridge from learning science into product ideas around retrieval, spacing, and durable review.",
    url: "https://www.hup.harvard.edu/books/9780674729018",
  },
  {
    title: "Tiny Habits",
    author: "BJ Fogg",
    note:
      "Useful for translating behavior change research into lightweight prompts, repeatable actions, and friction-aware product flows.",
    url: "https://tinyhabits.com/book/",
  },
];

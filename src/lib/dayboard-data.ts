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

export const dashboardPage = {
  stats: [
    {
      title: "Focus score",
      value: "84",
      caption: "Strong week, but calendar protection still matters more than motivation.",
    },
    {
      title: "Media in progress",
      value: "3",
      caption: "One book, one series, one film backlog item currently active.",
    },
    {
      title: "Bills due soon",
      value: "4",
      caption: "Three subscriptions and one utility charge due in the next seven days.",
    },
    {
      title: "Learning hours",
      value: "6.5",
      caption: "Already logged this week across systems design and AWS work.",
    },
  ],
  focus: weeklyFocus,
  learningMomentum: [
    {
      title: "TypeScript systems design",
      progress: "3 of 5 sessions",
      description: "Two more focused sessions close the sprint with enough repetition to stick.",
    },
    {
      title: "AWS launch track",
      progress: "68%",
      description: "The public deploy is live. The next hard step is replacing placeholder auth with a real app session.",
    },
    {
      title: "Reading notes processing",
      progress: "8 highlights",
      description: "Promote the strongest ideas into reusable notes rather than leaving them trapped in highlights.",
    },
  ],
  mediaQueues: [
    {
      title: "In progress",
      count: "3 active",
      items: ["Designing Data-Intensive Applications", "Shogun", "Perfect Days"],
    },
    {
      title: "Queued next",
      count: "5 queued",
      items: ["A swim in a pond in the rain", "Dune: Part Two", "The Bear", "Aftersun", "The Creative Act"],
    },
  ],
  transactionFeed: [
    { title: "AWS monthly estimate", category: "Infrastructure", amount: "-$48.00", positive: false },
    { title: "Salary", category: "Income", amount: "+$3,250.00", positive: true },
    { title: "Media purchase", category: "Learning", amount: "-$42.00", positive: false },
    { title: "Streaming subscription", category: "Entertainment", amount: "-$19.99", positive: false },
  ],
  schedule: [
    { day: "Mon", item: "Weekly planning and reset", time: "7:30 am" },
    { day: "Tue", item: "Deep work: book list product flow", time: "8:00 am" },
    { day: "Wed", item: "Finance review and subscriptions pass", time: "6:30 pm" },
    { day: "Thu", item: "Learning sprint session", time: "7:00 pm" },
  ],
};

export const bookListPage = {
  stats: [
    { title: "Tracked items", value: "126", caption: "Books, movies, TV shows, and long-form media in one place." },
    { title: "Active now", value: "3", caption: "Current book, current show, and one queued film under active attention." },
    { title: "Completed this year", value: "24", caption: "Enough history to spot taste patterns and unfinished streaks." },
    { title: "Favorites", value: "11", caption: "High-signal items worth recommending or revisiting." },
  ],
  filters: ["All", "Books", "Movies", "TV Shows", "In Progress", "Queued", "Completed"],
  spotlight: {
    title: "Designing Data-Intensive Applications",
    meta: "Book • In progress • 72%",
    note: "High-value right now because it feeds both product architecture and implementation decisions.",
  },
  collections: [
    {
      title: "Currently active",
      items: [
        { name: "Designing Data-Intensive Applications", type: "Book", status: "In progress", rating: "4.8" },
        { name: "Shogun", type: "TV Show", status: "Watching", rating: "4.6" },
        { name: "Perfect Days", type: "Movie", status: "Queued tonight", rating: "4.7" },
      ],
    },
    {
      title: "Next up",
      items: [
        { name: "The Creative Act", type: "Book", status: "Queued", rating: "4.4" },
        { name: "The Bear", type: "TV Show", status: "Queued", rating: "4.9" },
        { name: "Aftersun", type: "Movie", status: "Queued", rating: "4.7" },
      ],
    },
  ],
  backlog: [
    { title: "A swim in a pond in the rain", type: "Book", tag: "Literary fiction", priority: "High" },
    { title: "Dune: Part Two", type: "Movie", tag: "Big-screen", priority: "Medium" },
    { title: "Tokyo Vice", type: "TV Show", tag: "Series catch-up", priority: "Medium" },
    { title: "The Left Hand of Darkness", type: "Book", tag: "Speculative", priority: "Low" },
  ],
  noteCards: [
    "Keep the list singular even though entries have different media types. Simplicity in naming beats taxonomic purity here.",
    "Add quick capture, status changes, and notes first. Recommendation logic can come later.",
    "A future premium layer can use history, ratings, and tags to generate better next-up suggestions.",
  ],
};

export const financePage = {
  stats: [
    { title: "Cash available", value: "$4,810", caption: "Across everyday spending and short-term buffer accounts." },
    { title: "April spend", value: "$2,164", caption: "Below plan so far, but subscriptions cluster late in the month." },
    { title: "Recurring charges", value: "9", caption: "All visible in one place instead of hiding inside bank history." },
    { title: "Net worth", value: "$18.4k", caption: "Simple rollup, not investment software." },
  ],
  accounts: [
    { name: "Everyday", type: "Cash", balance: "$2,180", trend: "Stable" },
    { name: "Savings buffer", type: "Cash", balance: "$2,630", trend: "Up 4%" },
    { name: "Credit card", type: "Liability", balance: "-$540", trend: "Due in 9 days" },
  ],
  budgets: [
    { category: "Housing", spent: "$1,280", target: "$1,280", status: "On track" },
    { category: "Food", spent: "$314", target: "$450", status: "Comfortable" },
    { category: "Subscriptions", spent: "$74", target: "$95", status: "Watchlist" },
    { category: "Learning", spent: "$42", target: "$120", status: "Under plan" },
  ],
  recurring: [
    { name: "Netflix", amount: "$19.99", cadence: "Monthly", next: "Apr 12" },
    { name: "Claude / tooling", amount: "$32.00", cadence: "Monthly", next: "Apr 14" },
    { name: "Phone bill", amount: "$45.00", cadence: "Monthly", next: "Apr 18" },
    { name: "Rent", amount: "$1,280", cadence: "Monthly", next: "Apr 20" },
  ],
  transactions: [
    { title: "Salary", category: "Income", amount: "+$3,250.00", date: "Apr 5" },
    { title: "AWS spend", category: "Infrastructure", amount: "-$48.00", date: "Apr 6" },
    { title: "Book order", category: "Learning", amount: "-$42.00", date: "Apr 6" },
    { title: "Groceries", category: "Food", amount: "-$91.20", date: "Apr 7" },
  ],
};

export const goalsPage = {
  stats: [
    { title: "Weekly goals", value: "8", caption: "A focused week is easier to run when the list stays short." },
    { title: "Completed", value: "6", caption: "Most of the important work is moving, not just the easy tasks." },
    { title: "Habits alive", value: "5 / 6", caption: "One habit slipped and needs a reset, not guilt." },
    { title: "Review score", value: "B+", caption: "Solid pace, but next week needs fewer competing priorities." },
  ],
  weeklyPlan: [
    { title: "Replace placeholder auth with real app session", status: "In progress", owner: "Product" },
    { title: "Ship full page set for Dayboard web app", status: "In progress", owner: "Design + code" },
    { title: "Review subscriptions before late-month cycle", status: "Queued", owner: "Finance" },
    { title: "Finish current reading sprint notes", status: "Done", owner: "Learning" },
  ],
  habits: [
    { title: "Morning planning", streak: "14 days", completion: "6 / 7" },
    { title: "Study block", streak: "11 days", completion: "5 / 7" },
    { title: "Evening shutdown", streak: "4 days", completion: "4 / 7" },
  ],
  projects: [
    {
      title: "Dayboard product launch",
      summary: "Move from attractive MVP shell to a credible first shipped product.",
    },
    {
      title: "Personal finance cleanup",
      summary: "Reduce hidden recurring spend and tighten category visibility.",
    },
  ],
  review: [
    "What actually moved the week forward?",
    "What looked productive but mostly created noise?",
    "What should be cut before next week gets planned?",
  ],
};

export const learningPage = {
  stats: [
    { title: "Active tracks", value: "4", caption: "Enough to stay engaged, not so many that everything becomes passive." },
    { title: "Hours this week", value: "6.5", caption: "Weighted toward systems design and AWS implementation work." },
    { title: "Resources saved", value: "38", caption: "Curated inputs across books, docs, papers, and videos." },
    { title: "Notes captured", value: "22", caption: "Raw material that can become reusable thinking instead of bookmarks." },
  ],
  tracks: [
    { title: "TypeScript systems design", progress: "72%", focus: "Architecture decisions and maintainability patterns." },
    { title: "AWS shipping path", progress: "68%", focus: "Infrastructure, auth, deployment, and production cleanup." },
    { title: "Product writing", progress: "34%", focus: "Sharper copy and product framing across public pages." },
  ],
  sessions: [
    { title: "Systems design notes pass", duration: "45 min", outcome: "Condensed three chapters into reusable prompts." },
    { title: "AWS deployment cleanup", duration: "60 min", outcome: "Public web deploy verified, auth path cleaned up." },
    { title: "Reading note distillation", duration: "30 min", outcome: "Pulled eight highlights into permanent notes." },
  ],
  resources: [
    { title: "Designing Data-Intensive Applications", type: "Book", status: "Active" },
    { title: "AWS Amplify docs", type: "Docs", status: "Reference" },
    { title: "TypeScript handbook", type: "Docs", status: "Active" },
    { title: "The Creative Act", type: "Book", status: "Queued" },
  ],
  notes: [
    "A learning system should reward synthesis, not just consumption volume.",
    "Time invested is useful, but notes produced are a stronger signal of retained value.",
    "Tie learning directly to the weekly plan so it competes fairly with product work instead of always being optional.",
  ],
};

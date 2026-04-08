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

import {
  GoalStatus,
  HealthActivityType,
  MediaStatus,
  MediaType,
} from "@/generated/prisma/enums";
import { redirect } from "next/navigation";
import { getSessionUser, isAuthConfigured } from "@/lib/auth";
import { db } from "@/lib/db";

const DEFAULT_USER_EMAIL = "owner@dayboard.local";

function startOfDay(input = new Date()) {
  const date = new Date(input);
  date.setHours(0, 0, 0, 0);
  return date;
}

function addDays(input: Date, days: number) {
  const date = new Date(input);
  date.setDate(date.getDate() + days);
  return date;
}

function startOfWeek(input = new Date()) {
  const date = startOfDay(input);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  return addDays(date, diff);
}

function parseAmount(value: string) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    throw new Error("Amount must be a valid number.");
  }

  return Number(amount.toFixed(2));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("en-AU", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatDate(value: Date) {
  return value.toLocaleDateString("en-AU", {
    month: "short",
    day: "numeric",
  });
}

function formatMediaType(type: string) {
  switch (type) {
    case MediaType.TV_SHOW:
      return "TV Show";
    case MediaType.MOVIE:
      return "Movie";
    case MediaType.BOOK:
      return "Book";
    default:
      return "Other";
  }
}

function formatListCategory(category: string | null | undefined, type: string) {
  return category?.trim() || formatMediaType(type);
}

function formatMediaStatus(status: string) {
  switch (status) {
    case MediaStatus.IN_PROGRESS:
      return "In progress";
    case MediaStatus.COMPLETED:
      return "Completed";
    case MediaStatus.DROPPED:
      return "Dropped";
    default:
      return "Backlog";
  }
}

function formatGoalStatus(status: string) {
  switch (status) {
    case GoalStatus.ACTIVE:
      return "Active";
    case GoalStatus.DONE:
      return "Done";
    case GoalStatus.CARRIED_FORWARD:
      return "Carry forward";
    case GoalStatus.ARCHIVED:
      return "Archived";
    default:
      return "Planned";
  }
}

function formatHealthActivityType(type: string) {
  switch (type) {
    case HealthActivityType.GYM:
      return "Gym";
    case HealthActivityType.RUN:
      return "Run";
    case HealthActivityType.WALK:
      return "Walk";
    case HealthActivityType.CYCLE:
      return "Ride";
    case HealthActivityType.SWIM:
      return "Swim";
    default:
      return "Other";
  }
}

async function createSeedHabits(userId: string) {
  const today = startOfDay();
  const habits = await Promise.all(
    [
      { title: "Morning planning", cadence: "Daily", offsets: [0, -1, -2, -3, -4, -5] },
      { title: "Study block", cadence: "Daily", offsets: [0, -1, -2, -3, -4] },
      { title: "Evening shutdown", cadence: "Weekdays", offsets: [0, -1, -2, -3] },
    ].map((habit) =>
      db.habit.create({
        data: {
          userId,
          title: habit.title,
          cadence: habit.cadence,
          streakCount: habit.offsets.length,
        },
      }),
    ),
  );

  await Promise.all(
    habits.flatMap((habit, index) => {
      const offsets = [
        [0, -1, -2, -3, -4, -5],
        [0, -1, -2, -3, -4],
        [0, -1, -2, -3],
      ][index];

      return offsets.map((offset) =>
        db.habitLog.create({
          data: {
            userId,
            habitId: habit.id,
            loggedFor: addDays(today, offset),
            completed: true,
          },
        }),
      );
    }),
  );
}

export async function getCurrentUser() {
  const sessionUser = await getSessionUser();

  if (sessionUser) {
    await ensureSeedData(sessionUser.id);
    return sessionUser;
  }

  if (isAuthConfigured()) {
    redirect("/auth");
  }

  const user = await db.user.upsert({
    where: { email: DEFAULT_USER_EMAIL },
    update: {},
    create: {
      email: DEFAULT_USER_EMAIL,
      displayName: "Dayboard Owner",
      onboardingDone: true,
    },
  });

  await ensureSeedData(user.id);

  return user;
}

export async function ensureSeedData(userId: string) {
  const [
    mediaCount,
    accountCount,
    goalCount,
    habitCount,
    topicCount,
    recurringCount,
    healthCount,
  ] = await Promise.all([
    db.mediaEntry.count({ where: { userId } }),
    db.account.count({ where: { userId } }),
    db.weeklyGoal.count({ where: { userId } }),
    db.habit.count({ where: { userId } }),
    db.learningTopic.count({ where: { userId } }),
    db.recurringTransaction.count({ where: { userId } }),
    db.healthActivity.count({ where: { userId } }),
  ]);

  if (mediaCount === 0) {
    await db.mediaEntry.createMany({
      data: [
        {
          userId,
          type: MediaType.BOOK,
          listCategory: "Books",
          title: "Designing Data-Intensive Applications",
          creator: "Martin Kleppmann",
          status: MediaStatus.IN_PROGRESS,
          rating: 5,
          notesSummary: "Useful right now because it directly improves system design decisions.",
        },
        {
          userId,
          type: MediaType.TV_SHOW,
          listCategory: "TV Shows",
          title: "Shogun",
          creator: "FX",
          status: MediaStatus.IN_PROGRESS,
          rating: 5,
        },
        {
          userId,
          type: MediaType.MOVIE,
          listCategory: "Movies",
          title: "Perfect Days",
          creator: "Wim Wenders",
          status: MediaStatus.IN_PROGRESS,
          rating: 5,
        },
        {
          userId,
          type: MediaType.BOOK,
          listCategory: "Books",
          title: "The Creative Act",
          creator: "Rick Rubin",
          status: MediaStatus.BACKLOG,
          rating: 4,
        },
        {
          userId,
          type: MediaType.MOVIE,
          listCategory: "Movies",
          title: "Dune: Part Two",
          creator: "Denis Villeneuve",
          status: MediaStatus.BACKLOG,
          rating: 5,
        },
        {
          userId,
          type: MediaType.TV_SHOW,
          listCategory: "TV Shows",
          title: "The Bear",
          creator: "FX",
          status: MediaStatus.BACKLOG,
          rating: 5,
        },
        {
          userId,
          type: MediaType.BOOK,
          listCategory: "Books",
          title: "A swim in a pond in the rain",
          creator: "George Saunders",
          status: MediaStatus.BACKLOG,
          rating: 4,
        },
      ],
    });
  }

  if (accountCount === 0) {
    await db.account.createMany({
      data: [
        { userId, name: "Everyday", kind: "Cash", balance: "2180.00" },
        { userId, name: "Savings buffer", kind: "Cash", balance: "2630.00" },
        { userId, name: "Credit card", kind: "Liability", balance: "-540.00" },
      ],
    });

    await db.transactionCategory.createMany({
      data: [
        { userId, name: "Income", group: "Income" },
        { userId, name: "Infrastructure", group: "Work" },
        { userId, name: "Learning", group: "Growth" },
        { userId, name: "Entertainment", group: "Lifestyle" },
        { userId, name: "Food", group: "Essentials" },
      ],
      skipDuplicates: true,
    });

    const accounts = await db.account.findMany({ where: { userId } });
    const categories = await db.transactionCategory.findMany({ where: { userId } });

    const accountByName = Object.fromEntries(accounts.map((account) => [account.name, account.id]));
    const categoryByName = Object.fromEntries(
      categories.map((category) => [category.name, category.id]),
    );

    await db.transaction.createMany({
      data: [
        {
          userId,
          accountId: accountByName.Everyday,
          categoryId: categoryByName.Income,
          amount: "3250.00",
          description: "Salary",
          happenedAt: addDays(startOfDay(), -2),
        },
        {
          userId,
          categoryId: categoryByName.Infrastructure,
          amount: "-48.00",
          description: "AWS spend",
          happenedAt: addDays(startOfDay(), -1),
        },
        {
          userId,
          accountId: accountByName.Everyday,
          categoryId: categoryByName.Learning,
          amount: "-42.00",
          description: "Book order",
          happenedAt: addDays(startOfDay(), -1),
        },
        {
          userId,
          accountId: accountByName.Everyday,
          categoryId: categoryByName.Food,
          amount: "-91.20",
          description: "Groceries",
          happenedAt: startOfDay(),
        },
      ],
    });

    await db.budget.createMany({
      data: [
        { userId, name: "Housing", amount: "1280.00", month: new Date().getMonth() + 1, year: new Date().getFullYear() },
        { userId, name: "Food", amount: "450.00", month: new Date().getMonth() + 1, year: new Date().getFullYear() },
        { userId, name: "Subscriptions", amount: "95.00", month: new Date().getMonth() + 1, year: new Date().getFullYear() },
        { userId, name: "Learning", amount: "120.00", month: new Date().getMonth() + 1, year: new Date().getFullYear() },
      ],
    });
  }

  if (recurringCount === 0) {
    const today = startOfDay();
    await db.recurringTransaction.createMany({
      data: [
        { userId, description: "Netflix", amount: "19.99", cadence: "Monthly", nextRunAt: addDays(today, 5) },
        { userId, description: "Claude / tooling", amount: "32.00", cadence: "Monthly", nextRunAt: addDays(today, 7) },
        { userId, description: "Phone bill", amount: "45.00", cadence: "Monthly", nextRunAt: addDays(today, 11) },
        { userId, description: "Rent", amount: "1280.00", cadence: "Monthly", nextRunAt: addDays(today, 13) },
      ],
    });
  }

  if (goalCount === 0) {
    const weekStart = startOfWeek();
    await db.weeklyGoal.createMany({
      data: [
        {
          userId,
          title: "Replace placeholder auth with real app session",
          status: GoalStatus.ACTIVE,
          weekStart,
          dueAt: addDays(weekStart, 3),
        },
        {
          userId,
          title: "Ship real CRUD flows for every product page",
          status: GoalStatus.ACTIVE,
          weekStart,
          dueAt: addDays(weekStart, 4),
        },
        {
          userId,
          title: "Review late-month subscriptions",
          status: GoalStatus.PLANNED,
          weekStart,
          dueAt: addDays(weekStart, 2),
        },
        {
          userId,
          title: "Finish current reading sprint notes",
          status: GoalStatus.DONE,
          weekStart,
          dueAt: addDays(weekStart, 1),
        },
      ],
    });
  }

  if (habitCount === 0) {
    await createSeedHabits(userId);
  }

  if (topicCount === 0) {
    const topics = await Promise.all(
      [
        {
          title: "TypeScript systems design",
          description: "Architecture decisions, maintainability, and type-driven design.",
          progressPct: 72,
        },
        {
          title: "AWS shipping path",
          description: "Deployment, auth, infrastructure, and production cleanup.",
          progressPct: 68,
        },
        {
          title: "Product writing",
          description: "Sharper copy and clearer structure across the product.",
          progressPct: 34,
        },
      ].map((topic) =>
        db.learningTopic.create({
          data: {
            userId,
            ...topic,
          },
        }),
      ),
    );

    const topicByTitle = Object.fromEntries(topics.map((topic) => [topic.title, topic.id]));
    const today = startOfDay();

    await db.learningResource.createMany({
      data: [
        {
          userId,
          topicId: topicByTitle["TypeScript systems design"],
          title: "Designing Data-Intensive Applications",
          kind: "Book",
        },
        {
          userId,
          topicId: topicByTitle["AWS shipping path"],
          title: "AWS Amplify docs",
          kind: "Docs",
        },
        {
          userId,
          topicId: topicByTitle["TypeScript systems design"],
          title: "TypeScript handbook",
          kind: "Docs",
        },
        {
          userId,
          topicId: topicByTitle["Product writing"],
          title: "The Creative Act",
          kind: "Book",
        },
      ],
    });

    await db.studySession.createMany({
      data: [
        {
          userId,
          topicId: topicByTitle["TypeScript systems design"],
          title: "Systems design notes pass",
          durationMin: 45,
          summary: "Condensed three chapters into reusable prompts.",
          happenedAt: addDays(today, -2),
        },
        {
          userId,
          topicId: topicByTitle["AWS shipping path"],
          title: "AWS deployment cleanup",
          durationMin: 60,
          summary: "Public deploy verified and auth path cleaned up.",
          happenedAt: addDays(today, -1),
        },
        {
          userId,
          topicId: topicByTitle["Product writing"],
          title: "Reading note distillation",
          durationMin: 30,
          summary: "Pulled eight highlights into more useful notes.",
          happenedAt: today,
        },
      ],
    });
  }

  if (healthCount === 0) {
    const today = startOfDay();
    const gymSession = await db.healthActivity.create({
      data: {
        userId,
        type: HealthActivityType.GYM,
        title: "Upper body gym session",
        bodyWeightKg: "81.20",
        durationMin: 55,
        nutritionSummary: "Protein-forward lunch and plenty of water before training.",
        notes: "Press, rows, and incline dumbbell work.",
        happenedAt: addDays(today, -2),
      },
    });

    await db.healthExercise.createMany({
      data: [
        {
          userId,
          activityId: gymSession.id,
          name: "Bench press",
          weightKg: "70.00",
          reps: 8,
          sets: 4,
          position: 0,
        },
        {
          userId,
          activityId: gymSession.id,
          name: "Chest-supported row",
          weightKg: "32.50",
          reps: 10,
          sets: 3,
          position: 1,
        },
        {
          userId,
          activityId: gymSession.id,
          name: "Incline dumbbell press",
          weightKg: "24.00",
          reps: 10,
          sets: 3,
          position: 2,
        },
      ],
    });

    await db.healthActivity.createMany({
      data: [
        {
          userId,
          type: HealthActivityType.RUN,
          title: "Easy 5 km run",
          bodyWeightKg: "81.00",
          durationMin: 31,
          distanceKm: "5.00",
          nutritionSummary: "Light breakfast before the run.",
          notes: "Comfortable pace, steady effort.",
          happenedAt: addDays(today, -1),
        },
        {
          userId,
          type: HealthActivityType.WALK,
          title: "Long recovery walk",
          bodyWeightKg: "80.80",
          durationMin: 40,
          distanceKm: "3.20",
          nutritionSummary: "Aimed for a calmer eating day and more fluids.",
          happenedAt: today,
        },
      ],
    });
  }
}

function calculateHabitStreak(loggedDays: Date[]) {
  const normalized = loggedDays
    .map((day) => startOfDay(day).getTime())
    .sort((a, b) => b - a);

  let streak = 0;
  let cursor = startOfDay().getTime();

  for (const value of normalized) {
    if (value === cursor) {
      streak += 1;
      cursor = addDays(new Date(cursor), -1).getTime();
    } else if (value < cursor) {
      break;
    }
  }

  return streak;
}

export async function getDashboardPageData() {
  const user = await getCurrentUser();
  const weekStart = startOfWeek();
  const [goals, mediaEntries, transactions, topics, recurringItems, healthActivities] = await Promise.all([
    db.weeklyGoal.findMany({
      where: { userId: user.id, weekStart },
      orderBy: [{ status: "asc" }, { updatedAt: "desc" }],
    }),
    db.mediaEntry.findMany({
      where: { userId: user.id, deletedAt: null },
      orderBy: { updatedAt: "desc" },
    }),
    db.transaction.findMany({
      where: { userId: user.id },
      orderBy: { happenedAt: "desc" },
      take: 4,
      include: { category: true },
    }),
    db.learningTopic.findMany({
      where: { userId: user.id },
      orderBy: { progressPct: "desc" },
      take: 3,
    }),
    db.recurringTransaction.findMany({
      where: { userId: user.id },
      orderBy: { nextRunAt: "asc" },
      take: 4,
    }),
    db.healthActivity.findMany({
      where: { userId: user.id, happenedAt: { gte: weekStart } },
      orderBy: { happenedAt: "desc" },
      take: 4,
    }),
  ]);

  const completedGoals = goals.filter((goal) => goal.status === GoalStatus.DONE).length;
  const activeMedia = mediaEntries.filter((entry) => entry.status === MediaStatus.IN_PROGRESS);
  const focusScore = goals.length
    ? Math.round((completedGoals / goals.length) * 100 + Math.min(topics.length, 3) * 6)
    : 0;

  return {
    stats: [
      {
        title: "Focus score",
        value: String(focusScore),
        caption: "Weighted toward completed goals and visible Mind progress.",
      },
      {
        title: "Lists in progress",
        value: String(activeMedia.length),
        caption: "A healthy queue is small enough to finish, not just admire.",
      },
      {
        title: "Bills due soon",
        value: String(recurringItems.length),
        caption: "Upcoming recurring charges visible before they surprise you.",
      },
      {
        title: "Mind hours",
        value: formatCompact(
          (
            await db.studySession.aggregate({
              where: { userId: user.id, happenedAt: { gte: weekStart } },
              _sum: { durationMin: true },
            })
          )._sum.durationMin ?? 0,
        ),
        caption: "Logged this week across active Mind tracks.",
      },
      {
        title: "Training sessions",
        value: String(healthActivities.length),
        caption: "Gym, runs, walks, and recovery work completed this week.",
      },
    ],
    focus: goals.slice(0, 4).map((goal) => goal.title),
    learningMomentum: topics.map((topic) => ({
      title: topic.title,
      progress: `${topic.progressPct}%`,
      description: topic.description ?? "No description yet.",
    })),
    mediaQueues: [
      {
        title: "In progress",
        count: `${activeMedia.length} active`,
        items: activeMedia.slice(0, 5).map((item) => item.title),
      },
      {
        title: "Queued next",
        count: `${mediaEntries.filter((item) => item.status === MediaStatus.BACKLOG).length} queued`,
        items: mediaEntries
          .filter((item) => item.status === MediaStatus.BACKLOG)
          .slice(0, 5)
          .map((item) => item.title),
      },
    ],
    transactionFeed: transactions.map((transaction) => {
      const amount = Number(transaction.amount);
      return {
        title: transaction.description,
        category: transaction.category?.name ?? "Uncategorized",
        amount: `${amount >= 0 ? "+" : "-"}${formatCurrency(Math.abs(amount))}`,
        positive: amount >= 0,
      };
    }),
    schedule: goals.slice(0, 4).map((goal, index) => ({
      day: formatDate(goal.dueAt ?? addDays(weekStart, index)),
      item: goal.title,
      time: goal.dueAt
        ? goal.dueAt.toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit" })
        : "Flexible",
    })),
    healthFeed: healthActivities.map((activity) => ({
      id: activity.id,
      title: activity.title,
      typeLabel: formatHealthActivityType(activity.type),
      dateLabel: formatDate(activity.happenedAt),
      durationLabel: `${activity.durationMin} min`,
    })),
  };
}

export async function getListsPageData() {
  const user = await getCurrentUser();
  const mediaEntries = await db.mediaEntry.findMany({
    where: { userId: user.id, deletedAt: null },
    orderBy: [{ status: "asc" }, { updatedAt: "desc" }],
  });

  const ratingAverage =
    mediaEntries.length > 0
      ? mediaEntries.reduce((sum, entry) => sum + (entry.rating ?? 0), 0) / mediaEntries.length
      : 0;
  const itemsWithLabels = mediaEntries.map((entry) => ({
    ...entry,
    categoryLabel: formatListCategory(entry.listCategory, entry.type),
  }));
  const uniqueCategories = Array.from(
    new Set(itemsWithLabels.map((entry) => entry.categoryLabel)),
  ).sort((left, right) => left.localeCompare(right));
  const active = itemsWithLabels.filter((item) => item.status === MediaStatus.IN_PROGRESS);
  const backlog = itemsWithLabels.filter((item) => item.status === MediaStatus.BACKLOG);
  const completed = itemsWithLabels.filter((item) => item.status === MediaStatus.COMPLETED);

  return {
    stats: [
      {
        title: "Tracked items",
        value: String(mediaEntries.length),
        caption: "Anything you want to track can live in one flexible lists area.",
      },
      {
        title: "Categories",
        value: String(uniqueCategories.length),
        caption: "Books, movies, TV shows, or any custom list category you create.",
      },
      {
        title: "Active now",
        value: String(active.length),
        caption: "A small active queue is easier to actually finish.",
      },
      {
        title: "Average rating",
        value: ratingAverage ? ratingAverage.toFixed(1) : "-",
        caption: "Only based on entries you have already rated.",
      },
    ],
    categories: uniqueCategories,
    active,
    backlog,
    completed,
    spotlight: active[0] ?? backlog[0] ?? null,
    recent: itemsWithLabels.slice(0, 8),
  };
}

export async function getFinancePageData() {
  const user = await getCurrentUser();
  const [accounts, budgets, recurring, transactions, categories] = await Promise.all([
    db.account.findMany({ where: { userId: user.id }, orderBy: { createdAt: "asc" } }),
    db.budget.findMany({
      where: { userId: user.id, month: new Date().getMonth() + 1, year: new Date().getFullYear() },
      orderBy: { name: "asc" },
    }),
    db.recurringTransaction.findMany({ where: { userId: user.id }, orderBy: { nextRunAt: "asc" } }),
    db.transaction.findMany({
      where: { userId: user.id },
      orderBy: { happenedAt: "desc" },
      take: 8,
      include: { category: true },
    }),
    db.transactionCategory.findMany({ where: { userId: user.id }, orderBy: { name: "asc" } }),
  ]);

  const totalCash = accounts
    .filter((account) => account.kind !== "Liability")
    .reduce((sum, account) => sum + Number(account.balance), 0);
  const totalLiabilities = accounts
    .filter((account) => account.kind === "Liability")
    .reduce((sum, account) => sum + Number(account.balance), 0);
  const monthSpend = transactions
    .filter((transaction) => transaction.happenedAt.getMonth() === new Date().getMonth())
    .filter((transaction) => Number(transaction.amount) < 0)
    .reduce((sum, transaction) => sum + Math.abs(Number(transaction.amount)), 0);
  const spendByCategory = Object.entries(
    transactions.reduce<Record<string, number>>((acc, transaction) => {
      const amount = Number(transaction.amount);

      if (amount >= 0) {
        return acc;
      }

      const label = transaction.category?.name ?? "Uncategorized";
      acc[label] = (acc[label] ?? 0) + Math.abs(amount);
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([label, value]) => ({
      label,
      value,
      valueLabel: formatCurrency(value),
      tone: "amber" as const,
    }));
  const flowByDay = Object.entries(
    transactions.reduce<Record<string, number>>((acc, transaction) => {
      const label = transaction.happenedAt.toLocaleDateString("en-AU", {
        month: "short",
        day: "numeric",
      });
      acc[label] = (acc[label] ?? 0) + Number(transaction.amount);
      return acc;
    }, {}),
  )
    .slice(0, 7)
    .map(([label, value]) => ({
      label,
      value: Math.abs(value),
      valueLabel: `${value >= 0 ? "+" : "-"}${formatCurrency(Math.abs(value))}`,
      tone: value >= 0 ? ("emerald" as const) : ("slate" as const),
    }));

  return {
    stats: [
      { title: "Cash available", value: formatCurrency(totalCash), caption: "Across cash and short-term buffers." },
      { title: "This month spent", value: formatCurrency(monthSpend), caption: "Outflows visible without digging through bank history." },
      { title: "Recurring charges", value: String(recurring.length), caption: "Subscriptions and regular payments tracked in one place." },
      { title: "Net worth", value: formatCurrency(totalCash + totalLiabilities), caption: "Simple but honest current position." },
    ],
    accounts: accounts.map((account) => ({
      ...account,
      balanceLabel: formatCurrency(Number(account.balance)),
    })),
    budgets: budgets.map((budget) => {
      const spent = transactions
        .filter((transaction) => transaction.category?.name === budget.name)
        .reduce((sum, transaction) => sum + Math.abs(Number(transaction.amount)), 0);
      return {
        id: budget.id,
        category: budget.name,
        spentLabel: formatCurrency(spent),
        targetLabel: formatCurrency(Number(budget.amount)),
        status:
          spent > Number(budget.amount)
            ? "Over plan"
            : spent > Number(budget.amount) * 0.8
              ? "Watch"
              : "On track",
      };
    }),
    recurring: recurring.map((item) => ({
      ...item,
      amountLabel: formatCurrency(Number(item.amount)),
      nextLabel: formatDate(item.nextRunAt),
    })),
    transactions: transactions.map((transaction) => ({
      ...transaction,
      amountLabel: `${Number(transaction.amount) >= 0 ? "+" : "-"}${formatCurrency(
        Math.abs(Number(transaction.amount)),
      )}`,
      dateLabel: formatDate(transaction.happenedAt),
      categoryLabel: transaction.category?.name ?? "Uncategorized",
    })),
    categories,
    spendByCategory,
    flowByDay,
  };
}

export async function getGoalsPageData() {
  const user = await getCurrentUser();
  const weekStart = startOfWeek();
  const [goals, habits, logs] = await Promise.all([
    db.weeklyGoal.findMany({
      where: { userId: user.id, weekStart },
      orderBy: [{ status: "asc" }, { dueAt: "asc" }],
    }),
    db.habit.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
    }),
    db.habitLog.findMany({
      where: { userId: user.id, completed: true },
      orderBy: { loggedFor: "desc" },
    }),
  ]);

  const logsByHabit = logs.reduce<Record<string, Date[]>>((acc, log) => {
    acc[log.habitId] ??= [];
    acc[log.habitId].push(log.loggedFor);
    return acc;
  }, {});

  const habitsWithStreaks = habits.map((habit) => ({
    ...habit,
    streak: calculateHabitStreak(logsByHabit[habit.id] ?? []),
    todayDone: (logsByHabit[habit.id] ?? []).some(
      (loggedFor) => startOfDay(loggedFor).getTime() === startOfDay().getTime(),
    ),
  }));

  const completed = goals.filter((goal) => goal.status === GoalStatus.DONE).length;

  return {
    stats: [
      { title: "Weekly goals", value: String(goals.length), caption: "Enough structure to run the week without burying it." },
      { title: "Completed", value: String(completed), caption: "The ratio matters more than the volume." },
      { title: "Habits alive", value: `${habitsWithStreaks.filter((habit) => habit.todayDone).length} / ${habitsWithStreaks.length}`, caption: "Today’s completions keep the system honest." },
      { title: "Carry-over risk", value: String(goals.filter((goal) => goal.status !== GoalStatus.DONE).length), caption: "Unfinished goals that could leak into next week." },
    ],
    goals: goals.map((goal) => ({
      ...goal,
      statusLabel: formatGoalStatus(goal.status),
      dueLabel: goal.dueAt ? formatDate(goal.dueAt) : "No due date",
    })),
    habits: habitsWithStreaks,
    review: [
      "What actually moved the week forward?",
      "What created motion but not progress?",
      "What should be deliberately cut next week?",
    ],
  };
}

export async function getMindPageData() {
  const user = await getCurrentUser();
  const [topics, resources, sessions] = await Promise.all([
    db.learningTopic.findMany({ where: { userId: user.id }, orderBy: { progressPct: "desc" } }),
    db.learningResource.findMany({
      where: { userId: user.id },
      include: { topic: true },
      orderBy: { createdAt: "desc" },
    }),
    db.studySession.findMany({
      where: { userId: user.id },
      include: { topic: true },
      orderBy: { happenedAt: "desc" },
    }),
  ]);

  const totalMinutes = sessions.reduce((sum, session) => sum + session.durationMin, 0);

  return {
    stats: [
      { title: "Active tracks", value: String(topics.length), caption: "Mind works better with deliberate constraint." },
      { title: "Hours logged", value: `${(totalMinutes / 60).toFixed(1)}`, caption: "Measured from actual study sessions, not intention." },
      { title: "Resources saved", value: String(resources.length), caption: "Books, docs, links, and references kept in one place." },
      { title: "Sessions logged", value: String(sessions.length), caption: "Repeated sessions matter more than one-off binges." },
    ],
    topics,
    resources: resources.map((resource) => ({
      ...resource,
      topicLabel: resource.topic?.title ?? "Unsorted",
    })),
    sessions: sessions.map((session) => ({
      ...session,
      durationLabel: `${session.durationMin} min`,
      dateLabel: formatDate(session.happenedAt),
      topicLabel: session.topic?.title ?? "General",
    })),
  };
}

export async function getBodyPageData() {
  const user = await getCurrentUser();
  const weekStart = startOfWeek();
  const activities = await db.healthActivity.findMany({
    where: { userId: user.id },
    include: {
      exercises: {
        orderBy: { position: "asc" },
      },
    },
    orderBy: { happenedAt: "desc" },
  });

  const weekActivities = activities.filter((activity) => activity.happenedAt >= weekStart);
  const totalMinutes = weekActivities.reduce((sum, activity) => sum + activity.durationMin, 0);
  const totalDistance = weekActivities.reduce(
    (sum, activity) => sum + Number(activity.distanceKm ?? 0),
    0,
  );

  const typeSummary = Object.entries(
    weekActivities.reduce<Record<string, number>>((acc, activity) => {
      const label = formatHealthActivityType(activity.type);
      acc[label] = (acc[label] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => `${label} ${count}`);

  return {
    stats: [
      {
        title: "Sessions this week",
        value: String(weekActivities.length),
        caption: "Recorded body sessions completed in the current week.",
      },
      {
        title: "Minutes trained",
        value: String(totalMinutes),
        caption: "Total duration across training, cardio, and recovery work this week.",
      },
      {
        title: "Distance",
        value: `${totalDistance.toFixed(1)} km`,
        caption: "Distance logged across runs, walks, rides, and swims this week.",
      },
      {
        title: "Top body focus",
        value: typeSummary[0] ?? "No sessions",
        caption: "The most common activity type in your current week.",
      },
    ],
    activities: activities.map((activity) => ({
      ...activity,
      typeLabel: formatHealthActivityType(activity.type),
      dateLabel: formatDate(activity.happenedAt),
      durationLabel: `${activity.durationMin} min`,
      distanceLabel:
        activity.distanceKm !== null ? `${Number(activity.distanceKm).toFixed(1)} km` : "No distance",
      bodyWeightLabel:
        activity.bodyWeightKg !== null ? `${Number(activity.bodyWeightKg).toFixed(1)} kg` : "No weigh-in",
      nutritionSummary: activity.nutritionSummary,
      exerciseSummary:
        activity.exercises.length > 0
          ? `${activity.exercises.length} exercises`
          : "No exercises logged",
      exercises: activity.exercises.map((exercise) => ({
        ...exercise,
        weightLabel:
          exercise.weightKg !== null ? `${Number(exercise.weightKg).toFixed(1)} kg` : "Bodyweight",
        repsLabel: exercise.reps ? `${exercise.reps} reps` : "Reps not set",
        setsLabel: exercise.sets ? `${exercise.sets} sets` : "Sets not set",
      })),
    })),
    weeklyMix: typeSummary,
  };
}

export async function getSettingsPageData() {
  const user = await getCurrentUser();
  const [mediaCount, transactionCount, goalCount, topicCount, healthCount] = await Promise.all([
    db.mediaEntry.count({
      where: { userId: user.id, deletedAt: null },
    }),
    db.transaction.count({
      where: { userId: user.id },
    }),
    db.weeklyGoal.count({
      where: { userId: user.id },
    }),
    db.learningTopic.count({
      where: { userId: user.id },
    }),
    db.healthActivity.count({
      where: { userId: user.id },
    }),
  ]);

  return {
    profile: {
      email: user.email,
      displayName: user.displayName ?? "",
      timezone: user.timezone,
      currency: user.currency,
      joinedOn: user.createdAt.toLocaleDateString("en-AU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    stats: [
      {
        title: "Tracked media",
        value: String(mediaCount),
        caption: "Everything saved inside Lists, across all categories.",
      },
      {
        title: "Transactions",
        value: String(transactionCount),
        caption: "Money history logged inside Dayboard so far.",
      },
      {
        title: "Weekly goals",
        value: String(goalCount),
        caption: "Active and historical weekly planning items.",
      },
      {
        title: "Mind tracks",
        value: String(topicCount),
        caption: "Topics currently being tracked in Mind.",
      },
      {
        title: "Body sessions",
        value: String(healthCount),
        caption: "Recorded training, weigh-ins, and physical activity sessions.",
      },
    ],
  };
}

export async function ensureCategory(userId: string, name: string) {
  const normalized = name.trim();

  if (!normalized) {
    return null;
  }

  const existing = await db.transactionCategory.findFirst({
    where: { userId, name: normalized },
  });

  if (existing) {
    return existing;
  }

  return db.transactionCategory.create({
    data: {
      userId,
      name: normalized,
    },
  });
}

export {
  formatCurrency,
  formatDate,
  formatGoalStatus,
  formatHealthActivityType,
  formatListCategory,
  formatMediaStatus,
  formatMediaType,
  parseAmount,
  startOfDay,
  startOfWeek,
};

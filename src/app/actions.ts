"use server";

import { revalidatePath } from "next/cache";
import {
  GoalStatus,
  HealthActivityType,
  MediaStatus,
  MediaType,
} from "@/generated/prisma/enums";
import { db } from "@/lib/db";
import {
  ensureCategory,
  getCurrentUser,
  parseAmount,
  startOfDay,
} from "@/lib/dayboard-store";

const pathsToRefresh = [
  "/dashboard",
  "/lists",
  "/finance",
  "/goals",
  "/mind",
  "/body",
  "/settings",
];

function refreshProductPaths() {
  for (const path of pathsToRefresh) {
    revalidatePath(path);
  }
}

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getStringList(formData: FormData, key: string) {
  return formData.getAll(key).map((value) => String(value ?? "").trim());
}

function inferListMediaType(category: string) {
  const normalized = category.trim().toLowerCase();

  if (["book", "books", "reading"].includes(normalized)) {
    return MediaType.BOOK;
  }

  if (["movie", "movies", "film", "films"].includes(normalized)) {
    return MediaType.MOVIE;
  }

  if (["tv", "tv show", "tv shows", "show", "shows", "series"].includes(normalized)) {
    return MediaType.TV_SHOW;
  }

  return MediaType.OTHER;
}

export async function createMediaEntryAction(formData: FormData) {
  const user = await getCurrentUser();
  const title = getString(formData, "title");
  const category = getString(formData, "category");

  if (!title) {
    return;
  }

  await db.mediaEntry.create({
    data: {
      userId: user.id,
      title,
      creator: getString(formData, "creator") || null,
      type: inferListMediaType(category),
      listCategory: category || null,
      status: (getString(formData, "status") || MediaStatus.BACKLOG) as MediaStatus,
      rating: Number(getString(formData, "rating")) || null,
      notesSummary: getString(formData, "notes") || null,
    },
  });

  refreshProductPaths();
}

export async function updateMediaStatusAction(formData: FormData) {
  const user = await getCurrentUser();
  const id = getString(formData, "id");
  const status = getString(formData, "status") as MediaStatus;

  if (!id || !status) {
    return;
  }

  await db.mediaEntry.updateMany({
    where: { id, userId: user.id },
    data: { status },
  });

  refreshProductPaths();
}

export async function deleteMediaEntryAction(formData: FormData) {
  const user = await getCurrentUser();
  const id = getString(formData, "id");

  if (!id) {
    return;
  }

  await db.mediaEntry.updateMany({
    where: { id, userId: user.id },
    data: { deletedAt: new Date() },
  });

  refreshProductPaths();
}

export async function createAccountAction(formData: FormData) {
  const user = await getCurrentUser();
  const name = getString(formData, "name");
  const kind = getString(formData, "kind");

  if (!name || !kind) {
    return;
  }

  await db.account.create({
    data: {
      userId: user.id,
      name,
      kind,
      balance: String(parseAmount(getString(formData, "balance") || "0")),
    },
  });

  refreshProductPaths();
}

export async function createTransactionAction(formData: FormData) {
  const user = await getCurrentUser();
  const description = getString(formData, "description");

  if (!description) {
    return;
  }

  const amount = parseAmount(getString(formData, "amount"));
  const requestedAccountId = getString(formData, "accountId");
  const account = requestedAccountId
    ? await db.account.findFirst({
        where: { id: requestedAccountId, userId: user.id },
      })
    : null;
  const categoryName = getString(formData, "category");
  const category = await ensureCategory(user.id, categoryName);

  await db.transaction.create({
    data: {
      userId: user.id,
      accountId: account?.id ?? null,
      categoryId: category?.id ?? null,
      amount: String(amount),
      description,
      happenedAt: startOfDay(new Date(getString(formData, "date") || new Date())),
    },
  });

  if (account) {
    await db.account.update({
      where: { id: account.id },
      data: {
        balance: {
          increment: amount,
        },
      },
    });
  }

  refreshProductPaths();
}

export async function createRecurringAction(formData: FormData) {
  const user = await getCurrentUser();
  const description = getString(formData, "description");

  if (!description) {
    return;
  }

  await db.recurringTransaction.create({
    data: {
      userId: user.id,
      description,
      cadence: getString(formData, "cadence") || "Monthly",
      amount: String(parseAmount(getString(formData, "amount"))),
      nextRunAt: new Date(getString(formData, "nextRunAt") || new Date()),
    },
  });

  refreshProductPaths();
}

export async function deleteRecurringAction(formData: FormData) {
  const user = await getCurrentUser();
  const id = getString(formData, "id");

  if (!id) {
    return;
  }

  await db.recurringTransaction.deleteMany({
    where: { id, userId: user.id },
  });

  refreshProductPaths();
}

export async function createBudgetAction(formData: FormData) {
  const user = await getCurrentUser();
  const name = getString(formData, "name");

  if (!name) {
    return;
  }

  await db.budget.create({
    data: {
      userId: user.id,
      name,
      amount: String(parseAmount(getString(formData, "amount") || "0")),
      month: Number(getString(formData, "month")) || new Date().getMonth() + 1,
      year: Number(getString(formData, "year")) || new Date().getFullYear(),
    },
  });

  refreshProductPaths();
}

export async function deleteBudgetAction(formData: FormData) {
  const user = await getCurrentUser();
  const id = getString(formData, "id");

  if (!id) {
    return;
  }

  await db.budget.deleteMany({
    where: { id, userId: user.id },
  });

  refreshProductPaths();
}

export async function deleteAccountAction(formData: FormData) {
  const user = await getCurrentUser();
  const id = getString(formData, "id");

  if (!id) {
    return;
  }

  await db.account.deleteMany({
    where: { id, userId: user.id },
  });

  refreshProductPaths();
}

export async function deleteTransactionAction(formData: FormData) {
  const user = await getCurrentUser();
  const id = getString(formData, "id");

  if (!id) {
    return;
  }

  await db.transaction.deleteMany({
    where: { id, userId: user.id },
  });

  refreshProductPaths();
}

export async function createGoalAction(formData: FormData) {
  const user = await getCurrentUser();
  const title = getString(formData, "title");

  if (!title) {
    return;
  }

  const today = new Date();
  const weekStart = new Date(today);
  const day = weekStart.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  weekStart.setDate(weekStart.getDate() + diff);
  weekStart.setHours(0, 0, 0, 0);

  await db.weeklyGoal.create({
    data: {
      userId: user.id,
      title,
      description: getString(formData, "description") || null,
      status: GoalStatus.PLANNED,
      weekStart,
      dueAt: getString(formData, "dueAt") ? new Date(getString(formData, "dueAt")) : null,
    },
  });

  refreshProductPaths();
}

export async function updateGoalStatusAction(formData: FormData) {
  const user = await getCurrentUser();
  const id = getString(formData, "id");
  const status = getString(formData, "status") as GoalStatus;

  if (!id || !status) {
    return;
  }

  await db.weeklyGoal.updateMany({
    where: { id, userId: user.id },
    data: { status },
  });

  refreshProductPaths();
}

export async function createHabitAction(formData: FormData) {
  const user = await getCurrentUser();
  const title = getString(formData, "title");

  if (!title) {
    return;
  }

  await db.habit.create({
    data: {
      userId: user.id,
      title,
      cadence: getString(formData, "cadence") || "Daily",
    },
  });

  refreshProductPaths();
}

export async function deleteGoalAction(formData: FormData) {
  const user = await getCurrentUser();
  const id = getString(formData, "id");

  if (!id) {
    return;
  }

  await db.weeklyGoal.deleteMany({
    where: { id, userId: user.id },
  });

  refreshProductPaths();
}

export async function deleteHabitAction(formData: FormData) {
  const user = await getCurrentUser();
  const id = getString(formData, "id");

  if (!id) {
    return;
  }

  await db.habit.deleteMany({
    where: { id, userId: user.id },
  });

  refreshProductPaths();
}

export async function toggleHabitTodayAction(formData: FormData) {
  const user = await getCurrentUser();
  const habitId = getString(formData, "habitId");

  if (!habitId) {
    return;
  }

  const today = startOfDay();
  const existing = await db.habitLog.findFirst({
    where: {
      userId: user.id,
      habitId,
      loggedFor: today,
    },
  });

  if (existing) {
    await db.habitLog.update({
      where: { id: existing.id },
      data: { completed: !existing.completed },
    });
  } else {
    const habit = await db.habit.findFirst({
      where: { id: habitId, userId: user.id },
    });

    if (!habit) {
      return;
    }

    await db.habitLog.create({
      data: {
        userId: user.id,
        habitId: habit.id,
        loggedFor: today,
        completed: true,
      },
    });
  }

  refreshProductPaths();
}

export async function createLearningTopicAction(formData: FormData) {
  const user = await getCurrentUser();
  const title = getString(formData, "title");

  if (!title) {
    return;
  }

  await db.learningTopic.create({
    data: {
      userId: user.id,
      title,
      description: getString(formData, "description") || null,
      progressPct: Number(getString(formData, "progressPct")) || 0,
    },
  });

  refreshProductPaths();
}

export async function updateLearningTopicProgressAction(formData: FormData) {
  const user = await getCurrentUser();
  const id = getString(formData, "id");
  const progressPct = Number(getString(formData, "progressPct"));

  if (!id || !Number.isFinite(progressPct)) {
    return;
  }

  await db.learningTopic.updateMany({
    where: { id, userId: user.id },
    data: {
      progressPct: Math.max(0, Math.min(100, Math.round(progressPct))),
    },
  });

  refreshProductPaths();
}

export async function deleteLearningTopicAction(formData: FormData) {
  const user = await getCurrentUser();
  const id = getString(formData, "id");

  if (!id) {
    return;
  }

  await db.learningTopic.deleteMany({
    where: { id, userId: user.id },
  });

  refreshProductPaths();
}

export async function updateProfilePreferencesAction(formData: FormData) {
  const user = await getCurrentUser();
  const displayName = getString(formData, "displayName");
  const timezone = getString(formData, "timezone");
  const currency = getString(formData, "currency");

  await db.user.update({
    where: { id: user.id },
    data: {
      displayName: displayName || user.displayName,
      timezone: timezone || user.timezone,
      currency: currency || user.currency,
      onboardingDone: true,
    },
  });

  refreshProductPaths();
}

export async function createLearningResourceAction(formData: FormData) {
  const user = await getCurrentUser();
  const title = getString(formData, "title");

  if (!title) {
    return;
  }

  const requestedTopicId = getString(formData, "topicId");
  const topic = requestedTopicId
    ? await db.learningTopic.findFirst({
        where: { id: requestedTopicId, userId: user.id },
      })
    : null;

  await db.learningResource.create({
    data: {
      userId: user.id,
      title,
      kind: getString(formData, "kind") || "Resource",
      url: getString(formData, "url") || null,
      topicId: topic?.id ?? null,
    },
  });

  refreshProductPaths();
}

export async function deleteLearningResourceAction(formData: FormData) {
  const user = await getCurrentUser();
  const id = getString(formData, "id");

  if (!id) {
    return;
  }

  await db.learningResource.deleteMany({
    where: { id, userId: user.id },
  });

  refreshProductPaths();
}

export async function createStudySessionAction(formData: FormData) {
  const user = await getCurrentUser();
  const title = getString(formData, "title");

  if (!title) {
    return;
  }

  const requestedTopicId = getString(formData, "topicId");
  const topic = requestedTopicId
    ? await db.learningTopic.findFirst({
        where: { id: requestedTopicId, userId: user.id },
      })
    : null;

  await db.studySession.create({
    data: {
      userId: user.id,
      title,
      topicId: topic?.id ?? null,
      durationMin: Number(getString(formData, "durationMin")) || 25,
      summary: getString(formData, "summary") || null,
      happenedAt: new Date(getString(formData, "happenedAt") || new Date()),
    },
  });

  refreshProductPaths();
}

export async function deleteStudySessionAction(formData: FormData) {
  const user = await getCurrentUser();
  const id = getString(formData, "id");

  if (!id) {
    return;
  }

  await db.studySession.deleteMany({
    where: { id, userId: user.id },
  });

  refreshProductPaths();
}

export async function createHealthActivityAction(formData: FormData) {
  const user = await getCurrentUser();
  const title = getString(formData, "title");

  if (!title) {
    return;
  }

  const durationMin = Number(getString(formData, "durationMin")) || 0;
  const distanceRaw = getString(formData, "distanceKm");
  const bodyWeightRaw = getString(formData, "bodyWeightKg");
  const exerciseNames = getStringList(formData, "exerciseName");
  const exerciseWeights = getStringList(formData, "exerciseWeightKg");
  const exerciseReps = getStringList(formData, "exerciseReps");
  const exerciseSets = getStringList(formData, "exerciseSets");
  const exercises = exerciseNames
    .map((name, index) => ({
      name,
      weightKg: exerciseWeights[index] ? String(parseAmount(exerciseWeights[index])) : null,
      reps: Number(exerciseReps[index]) || null,
      sets: Number(exerciseSets[index]) || null,
      position: index,
    }))
    .filter((exercise) => exercise.name);

  await db.healthActivity.create({
    data: {
      userId: user.id,
      title,
      type: (getString(formData, "type") || HealthActivityType.OTHER) as HealthActivityType,
      bodyWeightKg: bodyWeightRaw ? String(parseAmount(bodyWeightRaw)) : null,
      durationMin: durationMin > 0 ? durationMin : 30,
      distanceKm: distanceRaw ? String(parseAmount(distanceRaw)) : null,
      nutritionSummary: getString(formData, "nutritionSummary") || null,
      notes: getString(formData, "notes") || null,
      happenedAt: new Date(getString(formData, "happenedAt") || new Date()),
      exercises: exercises.length
        ? {
            create: exercises.map((exercise) => ({
              userId: user.id,
              ...exercise,
            })),
          }
        : undefined,
    },
  });

  refreshProductPaths();
}

export async function deleteHealthActivityAction(formData: FormData) {
  const user = await getCurrentUser();
  const id = getString(formData, "id");

  if (!id) {
    return;
  }

  await db.healthActivity.deleteMany({
    where: { id, userId: user.id },
  });

  refreshProductPaths();
}

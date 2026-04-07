"use client";

import { useState } from "react";
import { createHealthActivityAction } from "@/app/actions";

type ExerciseRow = {
  id: number;
};

export function BodySessionForm() {
  const [exerciseRows, setExerciseRows] = useState<ExerciseRow[]>([
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]);
  const [nextRowId, setNextRowId] = useState(4);

  function addExerciseRow() {
    setExerciseRows((current) => [...current, { id: nextRowId }]);
    setNextRowId((current) => current + 1);
  }

  function removeExerciseRow(id: number) {
    setExerciseRows((current) =>
      current.length > 1 ? current.filter((row) => row.id !== id) : current,
    );
  }

  return (
    <form action={createHealthActivityAction} className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <input
          name="title"
          placeholder="Upper body gym session"
          required
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 lg:col-span-2"
        />
        <select
          name="type"
          defaultValue="GYM"
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
        >
          <option value="GYM">Gym</option>
          <option value="RUN">Run</option>
          <option value="WALK">Walk</option>
          <option value="CYCLE">Ride</option>
          <option value="SWIM">Swim</option>
          <option value="OTHER">Other</option>
        </select>
        <input
          name="durationMin"
          type="number"
          min="1"
          placeholder="Duration in minutes"
          required
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
        />
        <input
          name="bodyWeightKg"
          type="number"
          min="0"
          step="0.1"
          placeholder="Body weight in kg"
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
        />
        <input
          name="distanceKm"
          type="number"
          min="0"
          step="0.01"
          placeholder="Optional distance in km"
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
        />
        <input
          name="happenedAt"
          type="date"
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
        />
        <textarea
          name="nutritionSummary"
          placeholder="Eating note, recovery note, or general body check-in"
          className="min-h-24 rounded-[1.5rem] border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
        />
        <textarea
          name="notes"
          placeholder="Optional training notes"
          className="min-h-24 rounded-[1.5rem] border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
        />
      </div>

      <div className="space-y-4 rounded-[1.5rem] bg-slate-50 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
              Exercises
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Add as many lifts as you need. Leave this block blank for runs, walks, and simpler sessions.
            </p>
          </div>
          <button
            type="button"
            onClick={addExerciseRow}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
          >
            Add exercise
          </button>
        </div>

        <div className="space-y-3">
          {exerciseRows.map((row, index) => (
            <div
              key={row.id}
              className="rounded-[1.25rem] border border-slate-200 bg-white p-3"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-950">
                  Exercise {index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => removeExerciseRow(row.id)}
                  disabled={exerciseRows.length === 1}
                  className="text-xs font-semibold text-slate-500 transition hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,0.9fr)_minmax(0,0.7fr)_minmax(0,0.7fr)]">
                <input
                  name="exerciseName"
                  placeholder="Exercise name"
                  className="min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-amber-500"
                />
                <input
                  name="exerciseWeightKg"
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="Weight kg"
                  className="min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-amber-500"
                />
                <input
                  name="exerciseReps"
                  type="number"
                  min="1"
                  placeholder="Reps"
                  className="min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-amber-500"
                />
                <input
                  name="exerciseSets"
                  type="number"
                  min="1"
                  placeholder="Sets"
                  className="min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-amber-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Save body session
      </button>
    </form>
  );
}

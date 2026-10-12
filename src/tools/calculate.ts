import { fields } from "./fields";
export type Result = { label: string; value: number | string; unit?: string };
export function calculate(
  slug: string,
  values: Record<string, number>,
): Result[] {
  const definitions = fields[slug];
  if (!definitions) throw new Error("Unknown calculator.");
  if (
    definitions.some(
      (field) =>
        !Number.isFinite(values[field.key]) ||
        values[field.key] < field.min ||
        values[field.key] > field.max ||
        (field.step === 1 && !Number.isInteger(values[field.key])),
    )
  )
    throw new Error("Use a valid number within each field’s range.");
  const v = values;
  switch (slug) {
    case "workout-volume":
      return [
        { label: "Total reps", value: v.sets * v.reps },
        {
          label: "Total volume",
          value: v.sets * v.reps * v.load,
          unit: "weight units",
        },
      ];
    case "session-duration":
      return [
        {
          label: "Estimated session",
          value:
            (v.exercises * v.sets * v.work +
              (v.exercises * v.sets - 1) * v.rest) /
              60 +
            v.warmup,
          unit: "minutes",
        },
        { label: "Working sets", value: v.exercises * v.sets },
      ];
    case "training-load":
      return [
        {
          label: "Session effort score",
          value: v.minutes * v.effort,
          unit: "arbitrary units",
        },
      ];
    case "pace-calculator": {
      const seconds = v.minutes * 60 + v.seconds;
      if (seconds <= 0)
        throw new Error("Enter a finish time greater than zero.");
      const pace = Math.round(seconds / v.distance);
      return [
        {
          label: `Average pace per ${v.unit ? "mile" : "km"}`,
          value: `${Math.floor(pace / 60)}:${(pace % 60).toString().padStart(2, "0")}`,
        },
        {
          label: "Average speed",
          value: v.distance / (seconds / 3600),
          unit: v.unit ? "mph" : "km/h",
        },
      ];
    }
    case "weight-converter":
      return [
        {
          label: "Converted weight",
          value: v.direction ? v.weight / 0.45359237 : v.weight * 0.45359237,
          unit: v.direction ? "lb" : "kg",
        },
      ];
    case "training-percentages":
      return [
        {
          label: "Calculated load",
          value: (v.reference * v.percent) / 100,
          unit: "same units as your reference",
        },
      ];
    case "macro-calories":
      return [
        {
          label: "Total energy",
          value: 4 * (v.protein + v.carbs) + 9 * v.fat,
          unit: "kcal",
        },
        { label: "From protein", value: 4 * v.protein, unit: "kcal" },
        { label: "From carbohydrate", value: 4 * v.carbs, unit: "kcal" },
        { label: "From fat", value: 9 * v.fat, unit: "kcal" },
      ];
    case "macro-split":
      if (Math.abs(v.protein + v.carbs + v.fat - 100) > 0.001)
        throw new Error(
          "Your protein, carbohydrate, and fat percentages must total 100%.",
        );
      return [
        { label: "Protein", value: (v.calories * v.protein) / 400, unit: "g" },
        {
          label: "Carbohydrate",
          value: (v.calories * v.carbs) / 400,
          unit: "g",
        },
        { label: "Fat", value: (v.calories * v.fat) / 900, unit: "g" },
      ];
    case "protein-planner":
      return [
        { label: "Protein per meal", value: v.protein / v.meals, unit: "g" },
        { label: "Daily total", value: v.protein, unit: "g" },
      ];
    case "hydration-tracker":
      return [
        {
          label: "Goal recorded",
          value: (v.consumed / v.goal) * 100,
          unit: "%",
        },
        {
          label: "Remaining to your goal",
          value: Math.max(0, v.goal - v.consumed),
          unit: "mL",
        },
      ];
    case "meal-scaling":
      return [
        {
          label: "Total calories",
          value: v.portions * v.calories,
          unit: "kcal",
        },
        { label: "Protein", value: v.portions * v.protein, unit: "g" },
        { label: "Carbohydrate", value: v.portions * v.carbs, unit: "g" },
        { label: "Fat", value: v.portions * v.fat, unit: "g" },
      ];

    case "interval-planner":
      return [
        {
          label: "Total interval time",
          value: (v.rounds * v.work + (v.rounds - 1) * v.rest) / 60,
          unit: "minutes",
        },
        {
          label: "Working time",
          value: (v.rounds * v.work) / 60,
          unit: "minutes",
        },
        {
          label: "Recovery time",
          value: ((v.rounds - 1) * v.rest) / 60,
          unit: "minutes",
        },
      ];
    case "tempo-time": {
      const tempo = v.lower + v.bottom + v.lift + v.top;
      if (tempo <= 0)
        throw new Error(
          "Enter a tempo with at least one phase greater than zero.",
        );
      return [
        { label: "Time per rep", value: tempo, unit: "seconds" },
        { label: "Time per set", value: tempo * v.reps, unit: "seconds" },
      ];
    }
    case "finish-time": {
      const pace = v.minutes * 60 + v.seconds;
      if (pace <= 0) throw new Error("Enter a pace greater than zero.");
      const total = Math.round(v.distance * pace);
      return [
        {
          label: "Estimated finish",
          value: `${Math.floor(total / 3600)}:${Math.floor((total % 3600) / 60)
            .toString()
            .padStart(2, "0")}:${(total % 60).toString().padStart(2, "0")}`,
          unit: "hours:minutes:seconds",
        },
      ];
    }
    case "training-consistency":
      return [
        {
          label: "Plan completed",
          value: (v.completed / v.planned) * 100,
          unit: "%",
        },
        {
          label: "Sessions remaining",
          value: Math.max(0, v.planned - v.completed),
        },
      ];
    case "weight-change":
      return [
        {
          label: "Load change",
          value: v.current - v.previous,
          unit: "same weight units",
        },
        {
          label: "Percentage change",
          value: ((v.current - v.previous) / v.previous) * 100,
          unit: "%",
        },
      ];
    case "recipe-batch":
      return [
        {
          label: "Calories per portion",
          value: v.calories / v.servings,
          unit: "kcal",
        },
        {
          label: "Protein per portion",
          value: v.protein / v.servings,
          unit: "g",
        },
        {
          label: "Carbohydrate per portion",
          value: v.carbs / v.servings,
          unit: "g",
        },
        { label: "Fat per portion", value: v.fat / v.servings, unit: "g" },
      ];
    default:
      throw new Error("Unknown calculator.");
  }
}

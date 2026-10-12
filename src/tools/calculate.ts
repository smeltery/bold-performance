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
    default:
      throw new Error("Unknown calculator.");
  }
}

export type Field = {
  key: string;
  label: string;
  initial: number;
  min: number;
  max: number;
  step?: number;
  choices?: string[];
};
const field = (
  key: string,
  label: string,
  initial: number,
  min = 0,
  max = 100000,
  step = 0.1,
): Field => ({ key, label, initial, min, max, step });
export const fields: Record<string, Field[]> = {
  "workout-volume": [
    field("sets", "Sets", 3, 1, 100, 1),
    field("reps", "Reps per set", 8, 1, 1000, 1),
    field("load", "Weight per rep (your chosen unit)", 45),
  ],
  "session-duration": [
    field("exercises", "Exercises", 5, 1, 50, 1),
    field("sets", "Sets per exercise", 3, 1, 50, 1),
    field("work", "Seconds per set", 40, 1, 3600, 1),
    field("rest", "Rest between sets (seconds)", 90, 0, 3600, 1),
    field("warmup", "Warm-up (minutes)", 10, 0, 180),
  ],
  "training-load": [
    field("minutes", "Session duration (minutes)", 45, 1, 1440),
    field("effort", "Overall effort (1 easy–10 maximal)", 6, 1, 10, 1),
  ],
  "pace-calculator": [
    field("distance", "Distance", 5, 0.01, 1000, 0.01),
    {
      ...field("unit", "Distance unit", 0, 0, 1, 1),
      choices: ["Kilometers", "Miles"],
    },
    field("minutes", "Time: whole minutes", 30, 0, 10000, 1),
    field("seconds", "Time: additional seconds", 0, 0, 59, 1),
  ],
  "weight-converter": [
    field("weight", "Starting weight", 135),
    {
      ...field("direction", "Convert from", 0, 0, 1, 1),
      choices: ["Pounds to kilograms", "Kilograms to pounds"],
    },
  ],
  "training-percentages": [
    field("reference", "Reference weight (your chosen unit)", 100, 0.01),
    field("percent", "Percentage", 70, 0, 100),
  ],
  "macro-calories": [
    field("protein", "Protein (g)", 30, 0, 1000),
    field("carbs", "Carbohydrate (g)", 50, 0, 2000),
    field("fat", "Fat (g)", 15, 0, 1000),
  ],
  "macro-split": [
    field("calories", "Your calorie target (kcal)", 2000, 1, 20000, 1),
    field("protein", "Protein (%)", 25, 0, 100),
    field("carbs", "Carbohydrate (%)", 50, 0, 100),
    field("fat", "Fat (%)", 25, 0, 100),
  ],
  "protein-planner": [
    field("protein", "Your daily protein target (g)", 120, 0, 1000),
    field("meals", "Meals or eating occasions", 4, 1, 12, 1),
  ],
  "hydration-tracker": [
    field("goal", "Your daily goal (mL)", 2000, 1, 20000, 1),
    field("consumed", "Recorded so far (mL)", 750, 0, 20000, 1),
  ],
  "meal-scaling": [
    field("portions", "Servings planned", 2, 0.1, 100),
    field("calories", "Calories per serving (kcal)", 280, 0, 10000),
    field("protein", "Protein per serving (g)", 15, 0, 1000),
    field("carbs", "Carbs per serving (g)", 34, 0, 1000),
    field("fat", "Fat per serving (g)", 9, 0, 1000),
  ],
  "interval-planner": [
    field("rounds", "Rounds", 8, 1, 100, 1),
    field("work", "Work per round (seconds)", 30, 1, 3600, 1),
    field("rest", "Recovery between rounds (seconds)", 60, 0, 3600, 1),
  ],
  "tempo-time": [
    field("reps", "Repetitions", 8, 1, 1000, 1),
    field("lower", "Lowering (seconds)", 3, 0, 60),
    field("bottom", "Bottom pause (seconds)", 1, 0, 60),
    field("lift", "Lifting (seconds)", 1, 0, 60),
    field("top", "Top pause (seconds)", 0, 0, 60),
  ],
  "finish-time": [
    field("distance", "Distance (km or miles)", 5, 0.01, 1000, 0.01),
    field("minutes", "Pace: whole minutes per km or mile", 6, 0, 120, 1),
    field("seconds", "Pace: additional seconds", 0, 0, 59, 1),
  ],
  "training-consistency": [
    field("planned", "Sessions planned", 12, 1, 1000, 1),
    field("completed", "Sessions completed", 9, 0, 1000, 1),
  ],
  "weight-change": [
    field("previous", "Previous load (your chosen unit)", 40, 0.01),
    field("current", "Current load (same unit)", 45),
  ],
  "recipe-batch": [
    field("servings", "Equal portions in the recipe", 4, 1, 100, 1),
    field("calories", "Whole recipe calories (kcal)", 2000, 0, 100000),
    field("protein", "Whole recipe protein (g)", 120, 0, 10000),
    field("carbs", "Whole recipe carbohydrate (g)", 240, 0, 20000),
    field("fat", "Whole recipe fat (g)", 60, 0, 10000),
  ],
};

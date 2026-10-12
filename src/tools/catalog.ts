import type { IconName } from "../components/Icon";
export type Tool = {
  slug: string;
  title: string;
  category: string;
  icon: IconName;
  description: string;
  note: string;
};
const entries: [string, string, string, IconName, string, string][] = [
  [
    "plate-calculator",
    "Plate calculator",
    "Strength",
    "dumbbell",
    "Know exactly what to load on each side of the bar.",
    "Includes the bar and assumes matching pairs of standard plates.",
  ],
  [
    "rest-timer",
    "Rest timer",
    "Workout",
    "timer",
    "Stay on track between sets with a simple countdown.",
    "Choose your own rest interval. Keep the page open; no sound or notifications.",
  ],
  [
    "weekly-planner",
    "Weekly training planner",
    "Workout",
    "calendar",
    "Give every day a focus and download your training week.",
    "A schedule for your choices, not a prescribed workout program.",
  ],
  [
    "workout-volume",
    "Workout volume",
    "Strength",
    "dumbbell",
    "Calculate total reps and weight moved for one exercise.",
    "Volume is sets × reps × load. Compare the same movement, range of motion, and units.",
  ],
  [
    "session-duration",
    "Workout time planner",
    "Workout",
    "timer",
    "Estimate how long your sets, rests, and warm-up will take.",
    "Allows rest between sets, including exercise transitions, but not after the final set.",
  ],
  [
    "training-load",
    "Session effort score",
    "Workout",
    "activity",
    "Combine session length with your perceived effort.",
    "Minutes × your 1–10 effort rating. A personal tracking number, not an injury-risk prediction.",
  ],
  [
    "pace-calculator",
    "Running pace",
    "Conditioning",
    "activity",
    "Turn distance and time into average pace and speed.",
    "Average pace assumes continuous movement and does not account for terrain or stops.",
  ],
  [
    "weight-converter",
    "Weight converter",
    "Strength",
    "scale",
    "Switch between pounds and kilograms without guesswork.",
    "Uses the exact conversion: 1 pound = 0.45359237 kilograms.",
  ],
  [
    "training-percentages",
    "Training percentages",
    "Strength",
    "dumbbell",
    "Calculate a percentage of a reference weight from your plan.",
    "Use a reference agreed with your coach. This does not estimate your maximum or prescribe a load.",
  ],
  [
    "macro-calories",
    "Calories from macros",
    "Nutrition",
    "nutrition",
    "See the energy represented by protein, carbs, and fat.",
    "Uses general 4/4/9 calorie factors. Label rounding, fiber, and sugar alcohols can cause differences.",
  ],
  [
    "macro-split",
    "Macro target planner",
    "Nutrition",
    "nutrition",
    "Convert your own calorie target and macro split into grams.",
    "Targets are your inputs, not recommendations. Percentages must add up to 100.",
  ],
  [
    "protein-planner",
    "Protein per meal",
    "Nutrition",
    "nutrition",
    "Divide your chosen daily protein target across meals.",
    "This divides an existing target; it does not determine your personal protein needs.",
  ],
  [
    "hydration-tracker",
    "Hydration progress",
    "Nutrition",
    "water",
    "Compare your recorded water with a goal you choose.",
    "Use a goal appropriate for you. This is arithmetic, not a hydration prescription.",
  ],
  [
    "meal-scaling",
    "Meal portion scaler",
    "Nutrition",
    "nutrition",
    "Scale a food label or recipe to the portions you plan to eat.",
    "Enter nutrition per serving. Serving sizes describe the food, not how much you should eat.",
  ],
];
export const catalog: Tool[] = entries.map(
  ([slug, title, category, icon, description, note]) => ({
    slug,
    title,
    category,
    icon,
    description,
    note,
  }),
);
export const categories = [
  "All tools",
  ...new Set(catalog.map((tool) => tool.category)),
];
export function matchingTools(query: string, category = "All tools") {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return catalog.filter(
    (tool) =>
      (category === "All tools" || tool.category === category) &&
      words.every((word) =>
        `${tool.title} ${tool.category} ${tool.description}`
          .toLowerCase()
          .includes(word),
      ),
  );
}

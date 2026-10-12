import { extraGuides } from "./extra-guides";
export type ToolGuide = {
  purpose: string;
  steps: string[];
  example: string;
  interpretation: string;
};
export const guides: Record<string, ToolGuide> = {
  ...extraGuides,
  "plate-calculator": {
    purpose:
      "Set up a barbell from a planned total weight without doing the plate math between sets.",
    steps: [
      "Choose pounds or kilograms and check the actual weight of your bar.",
      "Enter the total weight you want, including the bar.",
      "Load the displayed plates on each side, checking that both sides match.",
    ],
    example:
      "For 135 lb with a 45 lb bar, the plates must total 90 lb: one 45 lb plate on each side.",
    interpretation:
      "The result uses standard plate sizes and assumes those plates are available. If the exact target cannot be made, the tool reports the difference rather than loading above it. Collars and nonstandard equipment are not included.",
  },
  "rest-timer": {
    purpose:
      "Keep track of the rest interval already chosen for your workout so you can focus on your next set.",
    steps: [
      "Choose one of the available rest intervals.",
      "Start the countdown when your set ends.",
      "Pause if needed, or reset before starting another rest interval.",
    ],
    example:
      "For a planned 90-second rest, start the timer after your set. When it reaches zero, the planned interval has elapsed.",
    interpretation:
      "The timer tracks elapsed time even when browser updates slow down. It does not play a sound or send a notification, so keep the page visible. Reaching zero is a time cue, not an assessment of your readiness.",
  },
  "weekly-planner": {
    purpose:
      "Give your training week a clear shape before you start, with room for different session types and rest.",
    steps: [
      "Choose a focus for each day of the week.",
      "Review the training-day and rest-day totals.",
      "Download the plan to keep a copy or discuss it with Brock.",
    ],
    example:
      "You could record strength on Monday and Thursday, conditioning on Saturday, and rest on the other four days. That produces three training days and four rest days.",
    interpretation:
      "The planner organizes your selections; it does not create exercises, sets, or progression. A weekly outline is a useful starting point for a conversation about your schedule and goals.",
  },
  "workout-volume": {
    purpose:
      "Summarize the repetitions and external weight moved for one exercise with equal sets.",
    steps: [
      "Enter the number of working sets.",
      "Enter the repetitions in each set and weight used per repetition.",
      "Use one unit consistently and compare the result with the same exercise in another session.",
    ],
    example:
      "Three sets of eight reps at 45 lb give 24 total reps and 1,080 lb of volume: 3 × 8 × 45.",
    interpretation:
      "If sets use different weights or rep counts, calculate them separately and add the totals. Volume alone does not describe technique, effort, movement distance, or training quality. Use a consistent load convention for dumbbell and unilateral exercises.",
  },
  "session-duration": {
    purpose:
      "Estimate whether the workout you have planned fits the time you have available.",
    steps: [
      "Enter the number of exercises and sets per exercise.",
      "Estimate seconds spent working per set and resting between sets.",
      "Add warm-up minutes, then review the total against your available time.",
    ],
    example:
      "Five exercises with three 40-second sets, 90 seconds between sets, and a 10-minute warm-up total 41 minutes: 10 minutes working + 21 minutes resting + 10 minutes warming up.",
    interpretation:
      "The estimate includes one rest interval between every pair of sets, including exercise changes, but none after the final set. It assumes equal set counts and durations. Equipment waits, extra transitions, and a cooldown need additional time.",
  },
  "training-load": {
    purpose:
      "Record a simple session effort score using duration and your own overall effort rating.",
    steps: [
      "Enter the session length in minutes.",
      "Rate the overall session from 1 (easy) to 10 (maximal).",
      "Keep the score alongside the session type so later comparisons have context.",
    ],
    example:
      "A 45-minute session rated 6 produces 270 arbitrary units: 45 × 6. A 30-minute session rated 9 also produces 270.",
    interpretation:
      "Equal scores can represent very different workouts. This number summarizes your inputs; it is not calories burned, a recovery recommendation, or a prediction of injury. Consistent rating habits make your own records easier to compare.",
  },
  "pace-calculator": {
    purpose:
      "Translate a completed run or a planned time into average pace per kilometer or mile.",
    steps: [
      "Enter the distance and select its unit.",
      "Enter the total minutes and additional seconds.",
      "Read the pace per unit and average speed in the matching unit.",
    ],
    example:
      "A 5 km run in 30 minutes gives a pace of 6:00 per km and an average speed of 10 km/h.",
    interpretation:
      "Pace is total time divided by distance; speed is distance divided by hours. Pace is rounded to the nearest second. Choose consistently between elapsed time and moving time when comparing runs; hills and stops are not modeled.",
  },
  "weight-converter": {
    purpose: "Read a workout or equipment label in the weight unit you use.",
    steps: [
      "Enter the starting weight.",
      "Choose pounds to kilograms or kilograms to pounds.",
      "Check the output unit before using the result in another tool.",
    ],
    example:
      "135 lb converts to approximately 61.23 kg. The reverse conversion divides kilograms by 0.45359237.",
    interpretation:
      "The calculation uses 1 lb = 0.45359237 kg. A converted number may not match an available plate or dumbbell. Use the plate calculator separately when you need to assemble a load on a bar.",
  },
  "training-percentages": {
    purpose:
      "Turn a percentage written in your training plan into a weight using your chosen reference.",
    steps: [
      "Enter the reference weight specified by your plan.",
      "Enter the percentage you want to calculate.",
      "Read the result in the same unit as the reference, then check available equipment.",
    ],
    example: "70% of a 100 kg reference is 70 kg: 100 × 70 ÷ 100.",
    interpretation:
      "The tool does not test or estimate a one-repetition maximum. A reference might be a training max or another agreed weight; use the one your plan actually specifies. The result is not rounded to available plates.",
  },
  "macro-calories": {
    purpose:
      "Check the energy represented by the protein, carbohydrate, and fat amounts you enter.",
    steps: [
      "Enter protein and carbohydrate in grams.",
      "Enter fat in grams using the same serving or daily total.",
      "Review total energy and the contribution from each macro.",
    ],
    example:
      "30 g protein, 50 g carbohydrate, and 15 g fat produce 455 kcal: (30 × 4) + (50 × 4) + (15 × 9).",
    interpretation:
      "This uses general factors of 4 kcal/g for protein and carbohydrate and 9 kcal/g for fat. Food labels may differ because of rounding, fiber, sugar alcohols, or other energy sources. The result does not establish your calorie needs.",
  },
  "macro-split": {
    purpose:
      "Convert a calorie target and percentage split you already have into gram amounts.",
    steps: [
      "Enter your chosen calorie target.",
      "Enter protein, carbohydrate, and fat percentages that add up to 100.",
      "Read the gram amounts for each macro; change your inputs to compare another split.",
    ],
    example:
      "At 2,000 kcal with a 25% protein, 50% carbohydrate, and 25% fat split, the result is 125 g protein, 250 g carbohydrate, and approximately 55.56 g fat.",
    interpretation:
      "Each macro gets its percentage of total calories, then those calories are divided by 4, 4, or 9 to get grams. Example values demonstrate arithmetic and are not a personalized diet or recommended split.",
  },
  "protein-planner": {
    purpose:
      "Divide an existing daily protein target into equal amounts across your chosen eating occasions.",
    steps: [
      "Enter the daily protein target you want to organize.",
      "Enter how many meals or eating occasions you want to include.",
      "Use the per-meal result as an even-division reference for your own planning.",
    ],
    example:
      "A chosen 120 g daily target across four eating occasions gives 30 g per occasion: 120 ÷ 4.",
    interpretation:
      "This tool only divides your target; it does not determine how much protein you need or require each meal to be identical. If you plan unequal portions, check that their sum matches the daily target you entered.",
  },
  "hydration-tracker": {
    purpose:
      "Compare an amount of water you have recorded with a daily goal you choose.",
    steps: [
      "Enter your chosen goal in milliliters.",
      "Enter the cumulative amount recorded so far, also in milliliters.",
      "Review the percentage recorded and the amount remaining; update the cumulative total as needed.",
    ],
    example:
      "750 mL recorded against a 2,000 mL goal gives 37.5% recorded and 1,250 mL remaining.",
    interpretation:
      "The percentage is recorded volume ÷ goal × 100. Remaining volume never goes below zero, even if the percentage exceeds 100%. This is not a measurement of hydration status or a recommendation to drink more; the page does not save a daily history.",
  },
  "meal-scaling": {
    purpose:
      "Scale the nutrition shown for one serving to the number of servings you plan to use.",
    steps: [
      "Check the serving size on the label or recipe.",
      "Enter its calories and macro grams for one serving.",
      "Enter the number of servings, including a decimal for a partial serving, and review the scaled totals.",
    ],
    example:
      "Two servings at 280 kcal, 15 g protein, 34 g carbohydrate, and 9 g fat each give 560 kcal, 30 g protein, 68 g carbohydrate, and 18 g fat.",
    interpretation:
      "Every value is multiplied by the serving count. Calories are scaled from the supplied calorie value, not recalculated from macros, so label rounding is preserved. For a mixed meal, scale each food separately before adding the totals.",
  },
};

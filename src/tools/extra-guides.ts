import type { ToolGuide } from "./guides";
export const extraGuides: Record<string, ToolGuide> = {
  "interval-planner": {
    purpose:
      "Map out the timed portion of a circuit or interval session before starting.",
    steps: [
      "Choose the number of work rounds.",
      "Enter work and recovery seconds.",
      "Review the total and allow extra time for warming up or cooling down.",
    ],
    example:
      "Eight 30-second rounds with 60 seconds between rounds take 11 minutes: 4 working and 7 recovering.",
    interpretation:
      "Recovery is counted between rounds only. One round has no recovery interval. This plans timing; it does not run a timer or select your exercise intensity.",
  },
  "tempo-time": {
    purpose:
      "Estimate how long a set takes when every rep follows the same tempo.",
    steps: [
      "Enter the number of reps.",
      "Add the seconds for each movement phase.",
      "Review the time per rep and per set.",
    ],
    example:
      "Eight reps at a 3\u20131\u20131\u20130 tempo take 40 seconds: 5 seconds per rep \u00d7 8.",
    interpretation:
      "The four phases are lowering, bottom pause, lifting, and top pause. Zero skips a pause; at least one phase must take time. This is an estimate and excludes setup or rest.",
  },
  "finish-time": {
    purpose: "Estimate a run or walk duration using a pace you choose.",
    steps: [
      "Enter the distance in either miles or kilometers.",
      "Enter pace per mile or kilometer using the same unit.",
      "Read the projected finish as hours:minutes:seconds.",
    ],
    example: "5 km at 6 minutes per km takes 0:30:00.",
    interpretation:
      "Distance \u00d7 pace gives total time, rounded to the nearest second. The estimate assumes an unchanged pace, with no stops or terrain adjustments. It is not a performance prediction.",
  },
  "training-consistency": {
    purpose:
      "Review how closely your completed sessions match your plan for a chosen period.",
    steps: [
      "Choose a week, month, or another period.",
      "Enter planned and completed session counts for that same period.",
      "Use the result to reflect on what made your routine easier or harder.",
    ],
    example:
      "Nine completed sessions from twelve planned gives 75% completion and three remaining.",
    interpretation:
      "Completed \u00f7 planned \u00d7 100 gives the percentage. Extra sessions can produce more than 100%; remaining sessions never falls below zero. Rest and changes to a plan can be intentional, so this number is not a grade.",
  },
  "weight-change": {
    purpose:
      "Put a change in training load into numbers using a consistent unit and exercise.",
    steps: [
      "Enter the previous load, which must be greater than zero.",
      "Enter the current load in the same unit.",
      "Read the weight difference and its percentage of the previous load.",
    ],
    example: "Moving from 40 kg to 45 kg is a 5 kg increase, or 12.5%.",
    interpretation:
      "The percentage is (current \u2212 previous) \u00f7 previous \u00d7 100. A decrease produces a negative number. The tool describes a change; it does not recommend increasing weight or compare different exercises.",
  },
  "recipe-batch": {
    purpose:
      "Split whole-recipe nutrition into the equal portions you plan to prepare.",
    steps: [
      "Add the nutrition for all ingredients in the recipe.",
      "Enter those totals and the number of equal portions.",
      "Read the nutrition per portion.",
    ],
    example:
      "A recipe with 2,000 kcal, 120 g protein, 240 g carbohydrate, and 60 g fat divided into four portions gives 500 kcal, 30 g protein, 60 g carbohydrate, and 15 g fat each.",
    interpretation:
      "Each whole-recipe value is divided by the portion count. Unequal portions need a different calculation. Results reflect the ingredient information you enter and are not a recommendation for portion size.",
  },
};

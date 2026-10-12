# Training tools

Open **Training tools** from the navigation. Search by name or purpose and filter
by Strength, Workout, Conditioning, or Nutrition. Every tool has a shareable
`/tools/<slug>` URL. No account is required. Inputs stay in the current page and
reset on reload or navigation. No inputs are sent to Brock.

Press Cmd+K (Mac) or Ctrl+K to search pages and tools from anywhere. Use the
arrow keys and Enter, or Tab through results. Escape closes the search dialog.
The brand resources page is linked only in the footer.

## Workout and strength calculators

Workout volume multiplies sets, reps, and load. Workout time combines working
sets, rests between sets, and a warm-up. Session effort multiplies minutes by
your own 1–10 rating. Running pace divides elapsed time by distance. Weight
conversion uses 0.45359237 kg per pound. Training percentages multiply a
user-provided reference load by a percentage. None prescribe a workout.

## More ways to plan and review

- Interval session planner totals work and recovery, excluding rest after the final round.
- Tempo set time multiplies repetitions by the time in each movement phase.
- Finish time estimator multiplies distance by a matching per-mile or per-kilometer pace.
- Training consistency compares completed sessions with planned sessions.
- Training weight change shows a load difference and its percentage of the previous load.

## Nutrition planning

- Calories from macros uses the general 4/4/9 factors for protein, carbohydrate, and fat.
- Macro target planner converts your calorie target and percentage split to grams.
- Protein per meal divides your existing daily target across meals.
- Hydration progress compares recorded milliliters with your chosen goal.
- Meal portion scaler multiplies per-serving label values by portions.
- Recipe batch portions divides whole-recipe nutrition into equal portions.

Examples are not personal dietary recommendations. These tools do not estimate
calorie needs or prescribe weight-loss targets. Food-label rounding, fiber, and
sugar alcohols may produce differences from the simple macro calculation.
The general energy factors are described in [21 CFR 101.9(c)(1)(i)(B)](https://www.ecfr.gov/current/title-21/section-101.9).
See [FDA food-label guidance](https://www.fda.gov/food/nutrition-facts-label/how-understand-and-use-nutrition-facts-label).

## Plate calculator

Select pounds or kilograms and enter the bar weight and target total. The result
lists plates **per side**, assuming matching pairs of standard plates with no
inventory limit. The calculation excludes collars. Changing units resets inputs
to that unit's example rather than converting your previous load.

If a target cannot be loaded exactly, the result shows the nearest available load
below it and the remaining difference. Check your gym's actual plate labels and
available equipment. The calculator does not recommend how much you should lift.

## Rest timer

Choose 30 seconds, 1 minute, 90 seconds, 2 minutes, or 3 minutes. Start, pause,
resume, or reset the timer. Selecting a duration resets the current interval.
Elapsed time corrects for background tab delays when you return to the page.
The timer has no sound or push notifications; keep the page open.

## Weekly planner

Select rest, strength, conditioning, mobility, or sport for each day. The summary
counts planned sessions and rest days. **Download your week** saves a plain-text
schedule on your device. **Clear plan** resets every day to rest. The planner
organizes your choices; it does not prescribe a training workload.

```mermaid
flowchart LR
  Choose[Choose a tool] --> Inputs[Adjust your inputs]
  Inputs --> Browser[Calculate in your browser]
  Browser --> Review[Review your plan]
  Review --> Coach[Discuss with Brock]
```

[All documentation](README.md)

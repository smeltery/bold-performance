import { expect, test } from "bun:test";
import { calculate } from "../src/tools/calculate";
import { fields } from "../src/tools/fields";
import { catalog, matchingTools } from "../src/tools/catalog";
const defaults = (slug: string) =>
  Object.fromEntries(fields[slug].map((field) => [field.key, field.initial]));
test("all calculator examples produce finite usable results", () => {
  for (const slug of Object.keys(fields)) {
    const result = calculate(slug, defaults(slug));
    expect(result.length).toBeGreaterThan(0);
    for (const item of result)
      if (typeof item.value === "number")
        expect(Number.isFinite(item.value)).toBe(true);
  }
});
test("workout calculations preserve units and include rest correctly", () => {
  expect(
    calculate("workout-volume", { sets: 3, reps: 8, load: 45 })[1].value,
  ).toBe(1080);
  expect(
    calculate("session-duration", {
      exercises: 2,
      sets: 2,
      work: 30,
      rest: 60,
      warmup: 5,
    })[0].value,
  ).toBe(10);
  expect(calculate("training-load", { minutes: 45, effort: 6 })[0].value).toBe(
    270,
  );
  expect(
    calculate("training-percentages", { reference: 200, percent: 70 })[0].value,
  ).toBe(140);
});
test("pace rounds seconds with proper minute carry", () => {
  expect(
    calculate("pace-calculator", {
      distance: 5,
      minutes: 30,
      seconds: 0,
      unit: 0,
    })[0].value,
  ).toBe("6:00");
  expect(
    calculate("pace-calculator", {
      distance: 3,
      minutes: 17,
      seconds: 59,
      unit: 1,
    })[0].value,
  ).toBe("6:00");
  expect(() =>
    calculate("pace-calculator", {
      distance: 5,
      minutes: 0,
      seconds: 0,
      unit: 0,
    }),
  ).toThrow();
});
test("nutrition arithmetic follows user targets and serving counts", () => {
  expect(
    calculate("macro-calories", { protein: 30, carbs: 50, fat: 15 })[0].value,
  ).toBe(455);
  expect(
    calculate("macro-split", {
      calories: 2000,
      protein: 25,
      carbs: 50,
      fat: 25,
    })[0].value,
  ).toBe(125);
  expect(() =>
    calculate("macro-split", {
      calories: 2000,
      protein: 25,
      carbs: 50,
      fat: 40,
    }),
  ).toThrow("100%");
  expect(
    calculate("protein-planner", { protein: 120, meals: 4 })[0].value,
  ).toBe(30);
  expect(
    calculate("hydration-tracker", { goal: 2000, consumed: 2500 })[1].value,
  ).toBe(0);
  expect(
    calculate("meal-scaling", {
      portions: 2,
      calories: 280,
      protein: 15,
      carbs: 34,
      fat: 9,
    })[0].value,
  ).toBe(560);
});
test("conversion uses the exact pound definition", () => {
  expect(
    calculate("weight-converter", { weight: 1, direction: 0 })[0].value,
  ).toBe(0.45359237);
  expect(
    calculate("weight-converter", { weight: 0.45359237, direction: 1 })[0]
      .value,
  ).toBe(1);
});
test("rejects non-finite, out-of-range, and fractional count inputs", () => {
  for (const slug of Object.keys(fields)) {
    const input = defaults(slug);
    input[fields[slug][0].key] = NaN;
    expect(() => calculate(slug, input)).toThrow();
  }
  expect(() =>
    calculate("protein-planner", { protein: 120, meals: 0 }),
  ).toThrow();
  expect(() =>
    calculate("workout-volume", { sets: 1.5, reps: 8, load: 50 }),
  ).toThrow();
});
test("directory searches across words and categories with unique URLs", () => {
  expect(new Set(catalog.map((tool) => tool.slug)).size).toBe(20);
  expect(
    matchingTools("protein", "Nutrition").map((tool) => tool.slug),
  ).toContain("protein-planner");
  expect(matchingTools("protein", "Strength")).toHaveLength(0);
  expect(matchingTools("  WORKOUT warm-up ").map((tool) => tool.slug)).toEqual([
    "session-duration",
  ]);
  expect(matchingTools("nothing-matches")).toHaveLength(0);
});

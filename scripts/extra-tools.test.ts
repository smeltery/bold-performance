import { expect, test } from "bun:test";
import { calculate } from "../src/tools/calculate";
test("intervals omit final recovery, including a single round", () => {
  expect(
    calculate("interval-planner", { rounds: 8, work: 30, rest: 60 }).map(
      (r) => r.value,
    ),
  ).toEqual([11, 4, 7]);
  expect(
    calculate("interval-planner", { rounds: 1, work: 30, rest: 60 }).map(
      (r) => r.value,
    ),
  ).toEqual([0.5, 0.5, 0]);
});
test("tempo phases accumulate and reject a zero duration", () => {
  expect(
    calculate("tempo-time", {
      reps: 8,
      lower: 3,
      bottom: 1,
      lift: 1,
      top: 0,
    }).map((r) => r.value),
  ).toEqual([5, 40]);
  expect(() =>
    calculate("tempo-time", { reps: 8, lower: 0, bottom: 0, lift: 0, top: 0 }),
  ).toThrow();
});
test("finish time carries rounded seconds into hours", () => {
  expect(
    calculate("finish-time", { distance: 10, minutes: 6, seconds: 0 })[0].value,
  ).toBe("1:00:00");
  expect(
    calculate("finish-time", { distance: 0.01, minutes: 0, seconds: 59 })[0]
      .value,
  ).toBe("0:00:01");
  expect(() =>
    calculate("finish-time", { distance: 5, minutes: 0, seconds: 0 }),
  ).toThrow();
});
test("completion can exceed plan without negative remaining sessions", () => {
  expect(
    calculate("training-consistency", { planned: 12, completed: 9 }).map(
      (r) => r.value,
    ),
  ).toEqual([75, 3]);
  expect(
    calculate("training-consistency", { planned: 4, completed: 5 }).map(
      (r) => r.value,
    ),
  ).toEqual([125, 0]);
});
test("load changes handle decreases and reject zero reference", () => {
  expect(
    calculate("weight-change", { previous: 40, current: 45 }).map(
      (r) => r.value,
    ),
  ).toEqual([5, 12.5]);
  expect(
    calculate("weight-change", { previous: 50, current: 40 }).map(
      (r) => r.value,
    ),
  ).toEqual([-10, -20]);
  expect(() =>
    calculate("weight-change", { previous: 0, current: 40 }),
  ).toThrow();
});
test("batch portions divide every input using whole-recipe totals", () => {
  expect(
    calculate("recipe-batch", {
      servings: 4,
      calories: 2000,
      protein: 120,
      carbs: 240,
      fat: 60,
    }).map((r) => r.value),
  ).toEqual([500, 30, 60, 15]);
  expect(() =>
    calculate("recipe-batch", {
      servings: 0,
      calories: 2000,
      protein: 120,
      carbs: 240,
      fat: 60,
    }),
  ).toThrow();
});

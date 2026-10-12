import { expect, test } from "bun:test";
import { loadBar, remainingSeconds, summarizeWeek } from "../src/tools/math";
test("loads matching plates and includes the bar", () => {
  expect(loadBar(225, 45, "lb")).toEqual({
    stack: [{ weight: 45, count: 2 }],
    total: 225,
    shortfall: 0,
  });
  expect(loadBar(60, 20, "kg")).toEqual({
    stack: [{ weight: 20, count: 1 }],
    total: 60,
    shortfall: 0,
  });
  expect(loadBar(45, 45, "lb")?.stack).toEqual([]);
});
test("reports unachievable increments without overloading", () => {
  expect(loadBar(136, 45, "lb")?.total).toBe(135);
  expect(loadBar(136, 45, "lb")?.shortfall).toBe(1);
  expect(loadBar(61, 20, "kg")?.total).toBe(60);
});
test("rejects invalid and unsafe numeric input", () => {
  for (const [target, bar] of [
    [20, 45],
    [-1, 0],
    [NaN, 45],
    [Infinity, 45],
    [2001, 45],
    [100, -1],
  ])
    expect(loadBar(target, bar, "lb")).toBeNull();
});
test("timer catches up after background throttling and never goes negative", () => {
  expect(remainingSeconds(90000, 1000)).toBe(89);
  expect(remainingSeconds(90000, 89500)).toBe(1);
  expect(remainingSeconds(90000, 120000)).toBe(0);
});
test("week summary counts rest separately", () => {
  expect(
    summarizeWeek([
      "Strength",
      "Rest",
      "Mobility",
      "Rest",
      "Sport",
      "Rest",
      "Rest",
    ]),
  ).toEqual({ sessions: 3, rest: 4 });
});

test("fractional targets never round up to a heavier load", () => {
  expect(loadBar(134.999, 45, "lb")?.total).toBe(130);
  expect(loadBar(135.001, 45, "lb")?.total).toBe(135);
});

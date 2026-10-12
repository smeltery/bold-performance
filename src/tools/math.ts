export type Unit = "lb" | "kg";
export const plates = {
  lb: [45, 35, 25, 10, 5, 2.5],
  kg: [25, 20, 15, 10, 5, 2.5, 1.25],
};
export function loadBar(target: number, bar: number, unit: Unit) {
  if (
    !Number.isFinite(target) ||
    !Number.isFinite(bar) ||
    bar < 0 ||
    target < bar ||
    target > 2000
  )
    return null;
  let remaining = Math.floor(((target - bar) * 100) / 2 + 1e-7);
  const stack = plates[unit].flatMap((weight) => {
    const count = Math.floor(remaining / (weight * 100));
    remaining -= count * weight * 100;
    return count ? [{ weight, count }] : [];
  });
  const total =
    bar + stack.reduce((sum, plate) => sum + plate.weight * plate.count * 2, 0);
  return { stack, total, shortfall: target - total };
}
export function remainingSeconds(deadline: number, now: number) {
  return Math.max(0, Math.ceil((deadline - now) / 1000));
}
export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export const activities = [
  "Rest",
  "Strength",
  "Conditioning",
  "Mobility",
  "Sport",
];
export function summarizeWeek(plan: string[]) {
  const sessions = plan.filter((activity) => activity !== "Rest").length;
  return { sessions, rest: plan.length - sessions };
}

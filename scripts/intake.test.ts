import { expect, test } from "bun:test";
import { introduction, emailDraft } from "../src/forms/intake";
test("introduction groups multiple goals and excludes hidden fields", () => {
  const data = new FormData();
  data.set("name", " Alex ");
  data.append("goals", "Build strength");
  data.append("goals", "Sport performance");
  data.set("_gotcha", "spam");
  data.set("notes", "");
  const text = introduction(data);
  expect(text).toContain("Contact name: Alex");
  expect(text).toContain("Goals: Build strength, Sport performance");
  expect(text).not.toContain("spam");
  expect(text).not.toContain("Additional context");
});
test("email drafts encode text without treating it as address headers", () => {
  const draft = emailDraft("Name: Alex & Pat\nGoal: strength");
  expect(draft.includeBody).toBe(true);
  expect(draft.href).toContain(
    "body=Name%3A%20Alex%20%26%20Pat%0AGoal%3A%20strength",
  );
});
test("long introductions remain available without truncation in mailto", () => {
  const draft = emailDraft("Training goals ".repeat(300));
  expect(draft.includeBody).toBe(false);
  expect(draft.href).not.toContain("body=");
});

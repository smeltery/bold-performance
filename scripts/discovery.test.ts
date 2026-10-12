import { expect, test } from "bun:test";
import middleware, { acceptsMarkdown } from "../middleware";
test("Markdown negotiation honors explicit media types and disabled quality", () => {
  expect(acceptsMarkdown("text/markdown")).toBe(true);
  expect(acceptsMarkdown("text/html, text/markdown; q=0.8")).toBe(true);
  expect(acceptsMarkdown("text/markdown; q=0")).toBe(false);
  expect(acceptsMarkdown("*/*")).toBe(false);
  expect(acceptsMarkdown("text/html")).toBe(false);
});
test("page representations remain separate in shared caches", () => {
  for (const accept of ["text/markdown", "text/html"]) {
    const response = middleware(
      new Request(
        "https://bold-performance.vercel.app/tools/plate-calculator",
        { headers: { accept } },
      ),
    );
    expect(response.headers.get("vary")).toBe("Accept");
    expect(response.headers.get("x-middleware-rewrite")).toBe(
      accept === "text/markdown"
        ? "https://bold-performance.vercel.app/agent-content/tools/plate-calculator.md"
        : null,
    );
  }
});
test("missing Markdown pages return useful 404s without pretending success", async () => {
  const response = middleware(
    new Request("https://bold-performance.vercel.app/not-here", {
      headers: { accept: "text/markdown" },
    }),
  );
  expect(response.status).toBe(404);
  expect(response.headers.get("content-type")).toContain("text/markdown");
  expect(await response.text()).toContain("/llms.txt");
});
test("HEAD errors have no response body", async () => {
  const response = middleware(
    new Request("https://bold-performance.vercel.app/not-here", {
      method: "HEAD",
      headers: { accept: "text/markdown" },
    }),
  );
  expect(response.status).toBe(404);
  expect(await response.text()).toBe("");
});

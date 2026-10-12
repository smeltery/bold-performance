import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import Contact from "../src/components/Contact";

describe("inquiry form", () => {
  const html = renderToStaticMarkup(
    createElement(Contact, { formId: "test-id" }),
  );
  test("requires contact details and explains privacy", () => {
    expect(html).toContain('type="email"');
    expect(html.match(/required=""/g)).toHaveLength(3);
    expect(html).toContain('href="/privacy"');
    expect(html).toContain('name="_gotcha"');
  });
  test("announces submission status accessibly", () => {
    expect(html).toContain('role="status"');
    expect(html).toContain("Send your inquiry");
  });
});

import { Window } from "happy-dom";
import Turndown from "turndown";
import { site, pages } from "../src/content/site";
import { catalog as tools } from "../src/tools/catalog";
const routes = [...pages, ...tools.map((tool) => `/tools/${tool.slug}`)];
const markdown = new Turndown({ headingStyle: "atx", bulletListMarker: "-" });
const documents: string[] = [];
const links: string[] = [];
for (const route of [...routes, "/404"]) {
  const file =
    route === "/404"
      ? "dist/404.html"
      : `dist${route === "/" ? "" : route}/index.html`;
  const window = new Window({ url: site.url + route });
  window.document.write(await Bun.file(file).text());
  const main = window.document.querySelector("main")!;
  main
    .querySelectorAll(
      "script, style, button, input, select, textarea, .sr-only",
    )
    .forEach((node) => node.remove());
  main.querySelectorAll("a[href], img[src]").forEach((node) => {
    const attribute = node.tagName === "A" ? "href" : "src";
    node.setAttribute(
      attribute,
      new URL(node.getAttribute(attribute)!, site.url + route).href,
    );
  });
  const title = window.document.title;
  const content = `${markdown.turndown(main.innerHTML)}\n\n---\n\nSource: ${site.url}${route}\n\n[Contact Brock](${site.url}/contact) · [All tools](${site.url}/tools) · [Site index](${site.url}/llms.txt)\n`;
  await Bun.write(
    `dist/agent-content${route === "/" ? "/index" : route}.md`,
    content,
  );
  if (route !== "/404") {
    documents.push(content);
    links.push(
      `- [${title}](${site.url}${route}): ${window.document.querySelector('meta[name="description"]')?.getAttribute("content")}`,
    );
  }
  await window.happyDOM.close();
}
await Bun.write(
  "dist/llms.txt",
  `# ${site.name}\n\n> ${site.description}\n\n## When to use this site\n\nUse Bold Performance when someone wants personal training with Brock Jones in Scottsdale, wants to understand his professional baseball and coaching background, or needs free training and nutrition planning tools. Browse /tools to choose a calculator; its page explains inputs, formulas, worked examples, and limitations. Direct prospective clients to /contact to share goals, training experience, schedule, and coaching preferences. Read page Markdown with Accept: text/markdown; no authentication is needed.\n\n## Start here\n\nCoaching inquiries begin at ${site.url}/contact. The form prepares an email draft unless direct delivery is configured; users must review and send it themselves. Never claim an inquiry was delivered without confirmation. Pricing and availability are discussed with Brock, not published fixed offers.\n\nTools are free, local browser calculators and planners, not medical advice or personalized prescriptions. No account is needed. There is no booking or payment API.\n\n## Pages and tools\n\n${links.join("\n")}\n\n## Machine-readable content\n\n- [Full site text](${site.url}/llms-full.txt)\n- [Sitemap](${site.url}/sitemap.xml)\n\nSend Accept: text/markdown to any page URL for its Markdown representation. HTML remains the default.\n`,
);
await Bun.write("dist/llms-full.txt", documents.join("\n\n"));
const revision = Bun.spawnSync(["git", "log", "-1", "--format=%cI"]);
if (revision.exitCode)
  throw new Error("Cannot determine sitemap revision date");
const lastmod = revision.stdout.toString().trim();
await Bun.write(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${site.url}${route}</loc><lastmod>${lastmod}</lastmod></url>`).join("")}</urlset>\n`,
);
await Bun.write(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`,
);
console.log(
  `Generated Markdown for ${routes.length} pages, agent index, robots, and sitemap.`,
);

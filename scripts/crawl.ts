import { Window } from "happy-dom";
import { resolve, extname } from "node:path";
const root = resolve("dist");
const errors: string[] = [];
const pages = new Map<string, InstanceType<typeof Window>["document"]>();
for await (const path of new Bun.Glob("**/*.html").scan(root)) {
  const window = new Window({ url: "https://bold.example/" + path });
  window.document.write(await Bun.file(resolve(root, path)).text());
  pages.set(path, window.document);
}
for (const [path, document] of pages) {
  if (document.querySelectorAll("h1").length !== 1)
    errors.push(`${path}: expected one h1`);
  if (!document.title || !document.querySelector('meta[name="description"]'))
    errors.push(`${path}: missing metadata`);
  for (const selector of [
    'link[rel="canonical"]',
    'meta[property="og:image"]',
    'meta[name="twitter:card"]',
    'script[type="application/ld+json"]',
  ]) {
    if (!document.querySelector(selector))
      errors.push(`${path}: missing SEO signal ${selector}`);
  }
  const structured = JSON.parse(
    document.querySelector('script[type="application/ld+json"]')!.textContent,
  );
  if (
    !structured["@graph"].some(
      (entry: { "@type": string }) => entry["@type"] === "Organization",
    )
  )
    errors.push(`${path}: missing organization schema`);
  const markdown = document
    .querySelector('link[type="text/markdown"]')!
    .getAttribute("href")!;
  if (!(await Bun.file(resolve(root, markdown.slice(1))).text()).includes("# "))
    errors.push(`${path}: empty Markdown`);
  for (const image of document.querySelectorAll("img")) {
    if (!image.hasAttribute("alt"))
      errors.push(`${path}: missing image alternative`);
  }
  for (const element of document.querySelectorAll("[href], [src]")) {
    const link = element.getAttribute("href") ?? element.getAttribute("src")!;
    const url = new URL(link, "https://bold.example/" + path);
    if (url.origin !== "https://bold.example") continue;
    const target = decodeURIComponent(url.pathname).replace(/^\//, "");
    const file = extname(target)
      ? target
      : `${target.replace(/\/$/, "")}${target ? "/" : ""}index.html`;
    if (!(await Bun.file(resolve(root, file)).exists()))
      errors.push(`${path}: broken asset/link ${link}`);
    if (url.hash && !pages.get(file)?.getElementById(url.hash.slice(1)))
      errors.push(`${path}: missing anchor ${link}`);
  }
}
if (errors.length) throw new Error(errors.join("\n"));
console.log(
  `Checked metadata, local links, anchors, and assets on ${pages.size} built pages.`,
);

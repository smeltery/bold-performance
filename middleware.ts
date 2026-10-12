import { next, rewrite } from "@vercel/functions";
import { pages } from "./src/content/site.js";
import { catalog as tools } from "./src/tools/catalog.js";
const routes = new Set([
  ...pages,
  ...tools.map((tool) => `/tools/${tool.slug}`),
]);
export const config = {
  matcher: ["/((?!_astro/|assets/|_vercel/|agent-content/|.*\\.).*)"],
};
export function acceptsMarkdown(accept: string) {
  return accept.split(",").some((entry) => {
    const [type, ...parameters] = entry.trim().toLowerCase().split(";");
    const quality = parameters.find((value) => value.trim().startsWith("q="));
    return (
      type.trim() === "text/markdown" &&
      (!quality || Number(quality.trim().slice(2)) > 0)
    );
  });
}
export default function middleware(request: Request) {
  const headers = { Vary: "Accept" };
  if (
    !["GET", "HEAD"].includes(request.method) ||
    !acceptsMarkdown(request.headers.get("accept") || "")
  )
    return next({ headers });
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, "") || "/";
  const markdownHeaders = {
    ...headers,
    "Content-Type": "text/markdown; charset=utf-8",
  };
  if (!routes.has(path))
    return new Response(
      request.method === "HEAD"
        ? null
        : "# Page not found\n\nThis page does not exist. Find coaching and training tools in the [site index](/llms.txt), browse the [sitemap](/sitemap.xml), or [contact Brock](/contact).\n",
      { status: 404, headers: markdownHeaders },
    );
  url.pathname = `/agent-content${path === "/" ? "/index" : path}.md`;
  url.search = "";
  return rewrite(url, { headers: markdownHeaders });
}

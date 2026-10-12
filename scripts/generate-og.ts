import { Resvg } from "@resvg/resvg-js";
const embed = async (path: string, type: string) =>
  `data:${type};base64,${Buffer.from(await Bun.file(path).arrayBuffer()).toString("base64")}`;
const photo = await embed("public/assets/training.jpg", "image/jpeg");
const logo = await embed("public/assets/logo.svg", "image/svg+xml");
const wordmarkSource = (
  await Bun.file("public/assets/wordmark.svg").text()
).replace('<path fill="#fefefe" d="M0 0h544v472H0z"/>', "");
const wordmark = `data:image/svg+xml;base64,${Buffer.from(wordmarkSource).toString("base64")}`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><clipPath id="wordmark"><rect x="177" y="49" width="209" height="77"/></clipPath><clipPath id="photo"><path d="M760 0H1200V630H670Z"/></clipPath><linearGradient id="shade" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#161c1d" stop-opacity=".08"/><stop offset="1" stop-color="#161c1d" stop-opacity=".76"/></linearGradient></defs>
<rect width="1200" height="630" fill="#f6f6f1"/>
<g clip-path="url(#photo)"><image href="${photo}" x="625" y="0" width="625" height="630" preserveAspectRatio="xMidYMid slice"/><rect x="625" width="575" height="630" fill="url(#shade)"/></g>
<path d="M746 0H760L670 630H656Z" fill="#50aec1"/>
<image href="${logo}" x="43" y="50" width="122" height="62"/><g clip-path="url(#wordmark)"><image href="${wordmark}" x="177" y="49" width="209" height="77"/></g>
<text x="58" y="188" font-family="DM Sans" font-size="15" font-weight="700" letter-spacing="3" fill="#276f7d">PERSONAL TRAINING · SCOTTSDALE, AZ</text>
<g font-family="Barlow Condensed" font-size="88" font-weight="700"><text x="54" y="290" fill="#192223">Built for more.</text><text x="54" y="382" fill="#237b8b">Trained for life.</text></g>
<text x="58" y="437" font-family="DM Sans" font-size="23" fill="#455456">Personalized coaching with Brock Jones.</text>
<text x="58" y="480" font-family="DM Sans" font-size="17" fill="#455456">Former pro athlete. NASM-certified trainer.</text>
<rect x="58" y="550" width="28" height="4" rx="2" fill="#237b8b"/>
<text x="100" y="560" font-family="DM Sans" font-size="17" fill="#192223">bold-performance.vercel.app</text>
<text x="1170" y="580" text-anchor="end" font-family="DM Sans" font-size="13" font-weight="700" letter-spacing="2" fill="#fff">TRAIN WITH PURPOSE.</text>
</svg>`;
const renderer = new Resvg(svg, {
  font: {
    fontFiles: [
      "scripts/assets/BarlowCondensed-Bold.ttf",
      "scripts/assets/DMSans.ttf",
    ],
    loadSystemFonts: false,
  },
});
await Bun.write("public/assets/og-image.png", renderer.render().asPng());
console.log("Generated public/assets/og-image.png (1200 × 630).");

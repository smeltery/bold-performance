import { Resvg } from "@resvg/resvg-js";
const embed = async (path: string, type: string) =>
  `data:${type};base64,${Buffer.from(await Bun.file(path).arrayBuffer()).toString("base64")}`;
const photo = await embed("public/assets/training.jpg", "image/jpeg");
const cactus = await embed("scripts/assets/cactus.png", "image/png");
const darkMark = await embed("public/assets/mark-dark.svg", "image/svg+xml");
const diamondbacks = await embed(
  "public/assets/diamondbacks.svg",
  "image/svg+xml",
);
const milb = await embed("public/assets/milb.svg", "image/svg+xml");
const nasm = await embed("public/assets/nasm.svg", "image/svg+xml");
const logo = await embed("public/assets/logo.svg", "image/svg+xml");
const wordmarkSource = (
  await Bun.file("public/assets/wordmark.svg").text()
).replace('<path fill="#fefefe" d="M0 0h544v472H0z"/>', "");
const wordmark = `data:image/svg+xml;base64,${Buffer.from(wordmarkSource).toString("base64")}`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><clipPath id="wordmark"><rect x="177" y="49" width="209" height="77"/></clipPath><clipPath id="photo"><path d="M760 0H1200V630H670Z"/></clipPath><linearGradient id="shade" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#161c1d" stop-opacity=".08"/><stop offset="1" stop-color="#161c1d" stop-opacity=".76"/></linearGradient><linearGradient id="caption-shade" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#000" stop-opacity="0"/><stop offset=".65" stop-color="#000" stop-opacity=".5"/><stop offset="1" stop-color="#000" stop-opacity=".78"/></linearGradient></defs>
<rect width="1200" height="630" fill="#f6f6f1"/>
<g clip-path="url(#photo)"><image href="${photo}" x="625" y="0" width="625" height="630" preserveAspectRatio="xMidYMid slice"/><rect x="625" width="575" height="630" fill="url(#shade)"/><rect x="625" y="280" width="575" height="246" fill="url(#caption-shade)"/></g>
<path d="M746 0H760L670 630H656Z" fill="#50aec1"/>
<image href="${logo}" x="43" y="50" width="122" height="62"/><g clip-path="url(#wordmark)"><image href="${wordmark}" x="177" y="49" width="209" height="77"/></g>
<image href="${cactus}" x="54" y="165" width="26" height="26"/><text x="88" y="188" font-family="DM Sans" font-size="14" font-weight="700" letter-spacing="2" fill="#276f7d">PERSONAL TRAINING · SCOTTSDALE, AZ</text>
<g font-family="Barlow Condensed" font-size="88" font-weight="700"><text x="54" y="290" fill="#192223">Built for more.</text><text x="54" y="382" fill="#237b8b">Trained for life.</text></g>
<text x="58" y="437" font-family="DM Sans" font-size="23" fill="#455456">Personalized coaching with Brock Jones.</text>

<image href="${darkMark}" x="1056" y="40" width="104" height="65"/>
<g font-family="DM Sans" font-size="16" font-weight="700" letter-spacing=".6" fill="#fff"><text x="776" y="453">THE WORK IS YOURS.</text><text x="776" y="480">THE PLAN? WE BUILD IT TOGETHER.</text></g>
<rect y="526" width="1200" height="104" fill="#f6f6f1"/><rect y="526" width="1200" height="4" fill="#50aec1"/>
<image href="${diamondbacks}" x="42" y="551" width="65" height="59"/><image href="${milb}" x="446" y="556" width="82" height="48"/><image href="${nasm}" x="847" y="555" width="103" height="50"/>
<g font-family="DM Sans" fill="#192223" font-size="17" font-weight="700"><text x="124" y="575">Arizona Diamondbacks</text><text x="544" y="575">Minor League Baseball</text><text x="968" y="575">NASM certified</text></g>
<g font-family="DM Sans" fill="#586569" font-size="14"><text x="124" y="599">Former organization pitcher</text><text x="544" y="599">Brock’s professional playing record</text><text x="968" y="599">Personal trainer</text></g>
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

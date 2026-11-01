import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const site = JSON.parse(await readFile(path.join(root, "data/site.config.json"), "utf8"));
const manifest = JSON.parse(await readFile(path.join(root, ".next/prerender-manifest.json"), "utf8"));
const routes = ["/", ...Object.keys(manifest.routes).filter((route) => route.startsWith("/projects/") && !route.includes("["))];
const escapeXml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const urls = [...new Set(routes)].map((route) => {
  const relative = route.replace(/^\/+|\/+$/g, "");
  const url = new URL(relative ? relative + "/" : "", site.url).href;
  return "  <url><loc>" + escapeXml(url) + "</loc></url>";
});
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.join('\n') + '\n</urlset>\n';
await writeFile(path.join(root, "out/sitemap.xml"), xml);
console.log("Generated sitemap with " + urls.length + " published pages.");
const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const publicDirectory = path.join(root, "public");
const outputDirectory = path.join(publicDirectory, "optimized");
const manifestPath = path.join(root, "data/images.generated.json");
const raster = /\.(png|jpe?g|webp)$/i;

async function main() {
  const sources = ["/my_photo.jpeg", "/email-icon.jpg", "/assets/portfolio.png"];
  for (const folder of ["wedahub", "opsyntra", "voya"]) {
    const relative = "/assets/portfolio/" + folder;
    const entries = await fs.readdir(path.join(publicDirectory, relative));
    sources.push(...entries.filter((name) => raster.test(name)).map((name) => relative + "/" + name));
  }
  await fs.mkdir(outputDirectory, { recursive: true });
  const manifest = {};
  let originalBytes = 0;
  let defaultBytes = 0;
  let fullBytes = 0;
  for (const source of sources.sort()) {
    const input = await fs.readFile(path.join(publicDirectory, source));
    const metadata = await sharp(input).metadata();
    const logo = source.includes("-logo.") || source === "/assets/portfolio.png";
    const portrait = source === "/my_photo.jpeg";
    const widths = portrait ? [320, 640, 960] : logo ? [320, 640, 1280] : [480, 960, 1600, 2560];
    const quality = portrait ? 82 : 90;
    const hash = crypto.createHash("sha256").update(input).update(JSON.stringify({ widths, quality, logo, version: 1 })).digest("hex").slice(0, 12);
    const basename = path.basename(source, path.extname(source));
    const variants = [];
    for (const width of [...new Set(widths.map((value) => Math.min(value, metadata.width)))].sort((a, b) => a - b)) {
      const filename = basename + "-" + hash + "-" + width + ".webp";
      const destination = path.join(outputDirectory, filename);
      let info;
      try {
        info = await sharp(destination).metadata();
      } catch {
        await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality, lossless: logo, effort: 5 }).toFile(destination);
        info = await sharp(destination).metadata();
      }
      const bytes = (await fs.stat(destination)).size;
      variants.push({ src: "/optimized/" + filename, width: info.width, height: info.height, bytes });
    }
    const preferred = variants.find((variant) => variant.width >= (portrait ? 640 : 960)) || variants[variants.length - 1];
    const full = variants[variants.length - 1];
    manifest[source] = { src: preferred.src, width: preferred.width, height: preferred.height, fullSrc: full.src, variants };
    originalBytes += input.length;
    defaultBytes += preferred.bytes;
    fullBytes += full.bytes;
  }
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(JSON.stringify({ images: sources.length, originalBytes, defaultBytes, fullBytes, defaultReductionPercent: Math.round((1 - defaultBytes / originalBytes) * 100) }));
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
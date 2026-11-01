import generated from "@/data/images.generated.json";
import { assetPath } from "@/utils/asset-path";

type Variant = { src: string; width: number; height: number; bytes: number };
type ImageAsset = { src: string; width: number; height: number; fullSrc: string; variants: Variant[] };
const images = generated as Record<string, ImageAsset>;

function findImage(source: string): ImageAsset | undefined {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  let key = source.split(/[?#]/, 1)[0];
  if (basePath && key.startsWith(basePath + "/")) key = key.slice(basePath.length);
  return images[key];
}

export function responsiveImage(source: string, sizes = "100vw", full = false) {
  const image = findImage(source);
  if (!image) return { src: assetPath(source) };
  const dimensions = full ? image.variants[image.variants.length - 1] : image;
  return {
    src: assetPath(full ? image.fullSrc : image.src),
    srcSet: image.variants.map((variant) => assetPath(variant.src) + " " + variant.width + "w").join(", "),
    sizes,
    width: dimensions.width,
    height: dimensions.height,
  };
}
import { assetPath } from "@/utils/asset-path";

export const CV_URL = assetPath("/cv/Sathsara_Ranasooriya_CV.pdf");

export function detectMobile() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

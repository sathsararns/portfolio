import localFont from "next/font/local";

export const courierPrime = localFont({
  src: [
    {
      path: "../public/fonts/courier-prime/CourierPrime-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/courier-prime/CourierPrime-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["Courier New", "monospace"],
});

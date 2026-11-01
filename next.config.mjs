/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  devIndicators: {
    buildActivity: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.microlink.io", pathname: "/**" },
    ],
  },
};

export default nextConfig;

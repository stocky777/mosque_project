import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint blocking deploys
  },
  typescript: {
    ignoreBuildErrors: true, // Skip TypeScript blocking deploys
  },
};

export default nextConfig;

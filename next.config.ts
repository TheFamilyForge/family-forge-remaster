// next.config.ts
import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
      include: path.resolve(__dirname, "public/assets"),
    });
    return config;
  },
};

export default nextConfig;

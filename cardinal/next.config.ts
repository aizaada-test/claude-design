import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // On GitHub Pages the site lives at /claude-design/; locally there's no prefix
  basePath: process.env.GITHUB_ACTIONS ? "/claude-design" : "",
  images: { unoptimized: true },
};

export default nextConfig;

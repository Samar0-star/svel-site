import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/svel-web" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: isGithubPages ? "export" : undefined,
  basePath: basePath,
  assetPrefix: isGithubPages ? "/svel-web/" : "",
  trailingSlash: isGithubPages ? true : false,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

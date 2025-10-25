import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  basePath: process.env.PAGES_BASE_PATH,
  images: { unoptimized: true },
  rewrites: () => [
    {
      source: "/docs/:path*.mdx",
      destination: "/llms.mdx/:path*",
    },
  ],
  reactStrictMode: true,
};

export default withMDX(config);

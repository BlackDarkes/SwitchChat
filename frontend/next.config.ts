import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  outputFileTracingRoot: __dirname,
  env: {
    API_URL: process.env.API_URL,
  },
  trailingSlash: true,
  async rewrites() {
    const apiPath = process.env.API_URL!;

    return [
      {
        source: "/api/:path",
        destination: `${apiPath}/:path`,
      }
    ]
  },
  output: "standalone",
};

export default nextConfig;
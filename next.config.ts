import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // This proxies /api/v1/users to https://api.example.com/users
        source: "/api/v1/:path*",
        destination: "https://api.example.com/:path*",
      },
    ];
  },
};

export default nextConfig;
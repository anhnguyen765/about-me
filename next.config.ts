import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/work", destination: "/zalopay", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/projects", destination: "/project-x", permanent: true },
    ];
  },
};

export default nextConfig;

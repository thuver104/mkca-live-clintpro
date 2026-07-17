import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/tournaments.html", destination: "/tournaments", permanent: true },
      { source: "/rplayels.html", destination: "/rated-players", permanent: true },
      { source: "/blog.html", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;

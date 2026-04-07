import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/books",
        destination: "/book-list",
        permanent: true,
      },
      {
        source: "/books/:path*",
        destination: "/book-list",
        permanent: true,
      },
      {
        source: "/movies",
        destination: "/book-list",
        permanent: true,
      },
      {
        source: "/movies/:path*",
        destination: "/book-list",
        permanent: true,
      },
      {
        source: "/auth/sign-in",
        destination: "/auth",
        permanent: true,
      },
      {
        source: "/auth/sign-up",
        destination: "/auth",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

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
        destination: "/lists",
        permanent: true,
      },
      {
        source: "/books/:path*",
        destination: "/lists",
        permanent: true,
      },
      {
        source: "/movies",
        destination: "/lists",
        permanent: true,
      },
      {
        source: "/movies/:path*",
        destination: "/lists",
        permanent: true,
      },
      {
        source: "/book-list",
        destination: "/lists",
        permanent: true,
      },
      {
        source: "/book-list/:path*",
        destination: "/lists",
        permanent: true,
      },
      {
        source: "/learning",
        destination: "/mind",
        permanent: true,
      },
      {
        source: "/learning/:path*",
        destination: "/mind",
        permanent: true,
      },
      {
        source: "/health",
        destination: "/body",
        permanent: true,
      },
      {
        source: "/health/:path*",
        destination: "/body",
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

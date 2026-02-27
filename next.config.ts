import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/auth/:path*",
  //       destination: `${process.env.BACKEND_BASE_URL}/api/auth/:path*`,
  //     },
  //     {
  //       source: "/api/v1/:path*",
  //       destination: `${process.env.BACKEND_BASE_URL}/api/v1/:path*`,
  //     },
  //   ];
  // },

  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/auth/:path*",
  //       destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;

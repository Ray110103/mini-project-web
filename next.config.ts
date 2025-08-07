import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "akcdn.detik.net.id",
      },
      {
        protocol: "https",
        hostname: "www.bensradio.com",
      },
      {
        protocol: "https",
        hostname: "en.bushiroad.com",
      },
      {
        protocol: "https",
        hostname: "img.evbuc.com",
      },
    ],
  },
};

export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["afeuujefqecmkcdsyjry.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "afeuujefqecmkcdsyjry.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;

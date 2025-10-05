import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.sunyaiashindi.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

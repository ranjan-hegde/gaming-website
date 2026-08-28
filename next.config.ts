import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '10.249.188.236',
    'localhost:3000',
    '127.0.0.1:3000',
    '10.249.188.236:3000',
  ],
};

export default nextConfig;

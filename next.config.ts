import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The server binds 0.0.0.0; browsers that open 127.0.0.1 must still load dev assets.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The React service moved to a top-level landing page.
      { source: "/services/react", destination: "/react-developer", permanent: true },
    ];
  },
};

export default nextConfig;

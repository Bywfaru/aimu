import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://*.googleusercontent.com/**')],
  },
};

export default withPayload(nextConfig);

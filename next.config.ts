import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://*.googleusercontent.com/**')], // Needed for Google Reviews
    deviceSizes: [480, 640, 768, 1024, 1280, 1536],
  },
};

export default withPayload(nextConfig);

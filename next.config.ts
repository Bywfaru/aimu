import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const remotePatterns: NextConfig['images'] = {
  remotePatterns: [new URL('https://*.googleusercontent.com/**')], // Needed for Google Reviews
};

// Payload media is served from R2 (src/payload.config.ts) — whitelist it so
// next/image can optimize CMS-uploaded images instead of erroring/bypassing.
if (process.env.R2_ENDPOINT) {
  remotePatterns.remotePatterns!.push(
    new URL(`${process.env.R2_ENDPOINT}/**`),
  );
}

const nextConfig: NextConfig = {
  images: {
    ...remotePatterns,
    deviceSizes: [480, 640, 768, 1024, 1280, 1536],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@icons-pack/react-simple-icons'],
  },
};

export default withPayload(nextConfig);

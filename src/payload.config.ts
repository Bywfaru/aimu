// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { Media, Services, Users } from './collections';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Services, Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp: sharp as any,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      enabled: true,
      clientUploads: true, // Vercel has a 4.5 MB limit on file uploads
      disableLocalStorage: true,
      collections: {
        media: {
          disableLocalStorage: true,
          // signedDownloads: {
          //   shouldUseSignedURL: ({ filename }) => filename.endsWith('.mp4'),
          // },
        },
      },
      bucket: process.env.R2_BUCKET_NAME,
      config: {
        endpoint: process.env.R2_ENDPOINT,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        },
        region: process.env.R2_REGION,
        forcePathStyle: true,
      },
    }),
  ],
  cors: {
    origins: [process.env.R2_ENDPOINT],
  },
});

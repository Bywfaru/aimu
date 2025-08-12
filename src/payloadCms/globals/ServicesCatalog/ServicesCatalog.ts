import type { GlobalConfig } from 'payload';
import { afterChange } from './hooks';

export const ServicesCatalog: GlobalConfig = {
  slug: 'servicesCatalog',
  label: 'Services Catalog',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [afterChange],
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  admin: {
    livePreview: {
      url: ({ req }) => {
        const url = new URL(
          process.env.NODE_ENV === 'production'
            ? `https://${req.host}`
            : req.origin,
        );

        url.pathname = '/api/draft';
        url.searchParams.set('secret', process.env.PAYLOAD_SECRET);
        url.searchParams.set('global', 'servicesCatalog');

        return url.toString();
      },
    },
  },
  fields: [
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Services',
      admin: {
        description: 'Select the services to display on the Services page.',
      },
    },
  ],
};

import type { GlobalConfig } from 'payload';

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true, // Allow public read access
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Navigation Items',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
          admin: {
            description: 'Enter a URL or a relative path (e.g., /about)',
          },
          hasMany: false,
          validate: (value) => {
            if (!value) return 'URL is required';

            if (value.startsWith('/')) {
              try {
                new URL(`https://example.com${value}`);

                return true; // Valid relative path
              } catch (_error) {
                return 'Invalid relative path format';
              }
            }

            try {
              new URL(value);

              return true; // Valid absolute URL
            } catch (_error) {
              return 'Invalid URL format';
            }
          },
        },
      ],
    },
  ],
};

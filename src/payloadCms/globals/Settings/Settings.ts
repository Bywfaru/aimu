import type { GlobalConfig } from 'payload';
import { afterChange } from './hooks';

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Settings',
  access: {
    read: () => true, // Allow public read access
  },
  hooks: {
    afterChange: [afterChange],
  },
  versions: {
    drafts: true,
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

        return url.toString();
      },
    },
  },
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      label: 'Site Title',
      required: true,
      admin: {
        description:
          'The title of the website, displayed in the browser tab and as the main heading.',
      },
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      label: 'Site Description',
      required: true,
      admin: {
        description:
          'A brief description of the website, used for SEO and social media sharing.',
      },
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Contact Email',
      required: true,
      admin: {
        description: 'Email address for site contact or inquiries.',
      },
    },
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
          admin: {
            description: 'Link to the Instagram profile.',
          },
        },
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
          admin: {
            description: 'Link to the Facebook page.',
          },
        },
        {
          name: 'x',
          type: 'text',
          label: 'X URL',
          admin: {
            description: 'Link to the X profile.',
          },
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp Phone Number',
          admin: {
            description:
              'Phone number for WhatsApp contact, formatted as +1234567890.',
          },
          hasMany: false,
          validate: (value) => {
            if (!value) return true; // Optional field

            const phoneRegex = /^\+\d{1,3}\d{4,14}$/; // Matches international phone format

            if (!phoneRegex.test(value))
              return 'Invalid WhatsApp phone number format. Use +1234567890.';

            return true;
          },
        },
      ],
    },
  ],
};

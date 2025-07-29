import { validateHexColourCode } from '@/payloadCms/validators';
import type { Block } from 'payload';

export const HeroSection: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'richText',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'showButton',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'buttonText',
      type: 'text',
      admin: {
        condition: (_data, siblingData) => !!siblingData.showButton,
      },
      required: true,
    },
    {
      name: 'buttonLink',
      type: 'text',
      admin: {
        condition: (_data, siblingData) => !!siblingData.showButton,
      },
      required: true,
      hasMany: false,
      validate: (value) => {
        if (!value) return 'Button link is required.';
        try {
          if (value.startsWith('/')) {
            new URL(value, 'https://example.com');
          } else {
            new URL(value);
          }

          return true;
        } catch (_error) {
          return 'Invalid URL format. Must be in the format of a valid URL, e.g., https://example.com or /services/service-1.';
        }
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'contentBackgroundColor',
      type: 'text',
      admin: {
        components: {
          Field: '/payloadCms/fields/ColourPicker#ColourPicker',
        },
      },
      hasMany: false,
      validate: validateHexColourCode,
    },
  ],
};

import { validateHexColourCode } from '@/payloadCms/validators';
import type { Block } from 'payload';

export const ServicesSection: Block = {
  slug: 'services',
  labels: {
    singular: 'Services Section',
    plural: 'Services Sections',
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
      name: 'button',
      type: 'group',
      fields: [
        {
          name: 'visible',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'text',
          type: 'text',
          label: 'Button Text',
          required: true,
          admin: {
            condition: (_data, siblingData) => !!siblingData.visible,
          },
        },
        {
          name: 'color',
          type: 'text',
          label: 'Button Color',
          admin: {
            components: {
              Field: '/payloadCms/fields/ColourPicker#ColourPicker',
            },
            condition: (_data, siblingData) => !!siblingData.visible,
          },
          hasMany: false,
          validate: validateHexColourCode,
        },
        {
          name: 'textColor',
          label: 'Button Text Color',
          type: 'text',
          admin: {
            components: {
              Field: '/payloadCms/fields/ColourPicker#ColourPicker',
            },
            condition: (_data, siblingData) => !!siblingData.visible,
          },
          hasMany: false,
          validate: validateHexColourCode,
        },
        {
          name: 'link',
          label: 'Button Link',
          type: 'text',
          required: true,
          admin: {
            condition: (_data, siblingData) => !!siblingData.visible,
          },
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
      ],
    },
    {
      name: 'backgroundColor',
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

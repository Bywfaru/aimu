import { validateHexColourCode } from '@/payloadCms/validators';
import type { Block } from 'payload';

export const SpacerSection: Block = {
  slug: 'spacer',
  labels: {
    singular: 'Spacer Section',
    plural: 'Spacer Sections',
  },
  fields: [
    {
      name: 'mobileHeight',
      type: 'number',
      required: true,
    },
    {
      name: 'tabletHeight',
      type: 'number',
    },
    {
      name: 'desktopHeight',
      type: 'number',
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

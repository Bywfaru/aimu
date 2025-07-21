import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      hasMany: false,
      validate: (value) => {
        if (!value) return 'Slug is required.';
        if (value.startsWith('-') || value.endsWith('-'))
          return 'Slug cannot start or end with a hyphen.';
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value))
          return 'Slug must be lowercase and can only contain letters, numbers, and hyphens.';

        return true;
      },
      admin: {
        components: {
          Field: '/components/payloadCms/fields/SlugField#SlugField',
        },
        description:
          'The URL-friendly identifier for this service. It should be lowercase and can only contain letters, numbers, and hyphens. e.g., "belly-binding" would be accessible through /services/belly-binding.',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'media',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
};

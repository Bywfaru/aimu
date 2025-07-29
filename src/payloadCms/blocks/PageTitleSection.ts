import type { Block } from 'payload';

export const PageTitleSection: Block = {
  slug: 'pageTitle',
  labels: {
    singular: 'Page Title Section',
    plural: 'Page Title Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
};

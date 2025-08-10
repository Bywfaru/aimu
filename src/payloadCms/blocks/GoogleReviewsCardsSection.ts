import type { Block } from 'payload';

export const GoogleReviewsCardsSection: Block = {
  slug: 'googleReviewsCards',
  labels: {
    singular: 'Google Reviews Cards Section',
    plural: 'Google Reviews Cards Sections',
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
  ],
};

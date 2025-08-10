import type { Block } from 'payload';

export const GoogleReviewsCarouselSection: Block = {
  slug: 'googleReviewsCarousel',
  labels: {
    singular: 'Google Reviews Carousel Section',
    plural: 'Google Reviews Carousel Sections',
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

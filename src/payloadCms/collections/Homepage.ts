import type { CollectionConfig } from 'payload';
import {
  GoogleReviewsCarouselSection,
  HeroSection,
  PageTitleSection,
  ParagraphOverMedia,
  ParagraphSection,
  ParagraphWithMediaSection,
  ServicesSection,
  SpacerSection,
} from '../blocks';

export const Homepage: CollectionConfig = {
  slug: 'homepage',
  labels: {
    singular: 'Homepage',
    plural: 'Homepage',
  },
  access: {
    read: () => true,
    delete: () => false,
    create: () => false,
  },
  fields: [
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        GoogleReviewsCarouselSection,
        HeroSection,
        PageTitleSection,
        ParagraphOverMedia,
        ParagraphSection,
        ParagraphWithMediaSection,
        ServicesSection,
        SpacerSection,
      ],
    },
  ],
};

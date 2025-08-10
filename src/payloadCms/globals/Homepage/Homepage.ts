import type { GlobalConfig } from 'payload';
import {
  GoogleReviewsCardsSection,
  GoogleReviewsCarouselSection,
  HeroSection,
  PageTitleSection,
  ParagraphOverMedia,
  ParagraphSection,
  ParagraphWithMediaSection,
  ServicesSection,
  SpacerSection,
} from '../../blocks';
import { afterChange } from './hooks';

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [afterChange],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        GoogleReviewsCardsSection,
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

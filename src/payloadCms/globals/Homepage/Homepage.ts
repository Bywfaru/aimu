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
    drafts: {
      autosave: true,
    },
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

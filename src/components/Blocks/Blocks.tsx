import {
  HeroSection,
  PageTitleSection,
  ParagraphImageSection,
  ParagraphOverImage,
  ParagraphSection,
  ServicesSection,
  Spacer,
} from '@/components/pageComponents';
import { GoogleReviewsCarousel } from '@/components/pageComponents/testimonialsPage';
import type { Page, Service } from '@/payload-types';
import type { places_v1 } from 'googleapis';
import type { FC } from 'react';

export type BlocksProps = {
  blocks: Page['blocks'];
  services?: Service[];
  googleReviews?: places_v1.Schema$GoogleMapsPlacesV1Review[];
};

export const Blocks: FC<BlocksProps> = ({
  services,
  blocks,
  googleReviews,
}) => {
  if (!blocks || !blocks.length) return null;

  return (
    <>
      {blocks.map((block) => {
        switch (block.blockType) {
          case 'hero':
            return (
              <HeroSection
                key={block.id}
                backgroundImage={block.backgroundImage}
                title={block.title}
                content={block.content}
                contentBackgroundColor={block.contentBackgroundColor}
                button={block.button}
              />
            );
          case 'services':
            if (!services) return null;

            return (
              <ServicesSection
                key={block.id}
                title={block.title}
                content={block.content}
                services={services}
              />
            );
          case 'googleReviewsCarousel':
            if (!googleReviews?.length) return null;

            return (
              <GoogleReviewsCarousel key={block.id} reviews={googleReviews} />
            );
          case 'paragraphOverMedia':
            return (
              <ParagraphOverImage
                key={block.id}
                image={block.media}
                title={block.title}
                content={block.content}
                contentBackgroundColor={block.contentBackgroundColor}
              />
            );
          case 'spacer':
            return (
              <Spacer
                key={block.id}
                backgroundColor={block.backgroundColor}
                mobileHeight={block.mobileHeight}
                tabletHeight={block.tabletHeight}
                desktopHeight={block.desktopHeight}
              />
            );
          case 'pageTitle':
            return (
              <PageTitleSection
                key={block.id}
                title={block.title}
                backgroundImage={block.backgroundImage}
              />
            );
          case 'paragraphWithMedia':
            return (
              <ParagraphImageSection
                key={block.id}
                title={block.title}
                content={block.content}
                image={block.media}
                backgroundColor={block.backgroundColor}
                reverse={block.textPosition === 'right'}
              />
            );
          case 'paragraph':
            console.log('contentColor', block.contentColor);

            return (
              <ParagraphSection
                key={block.id}
                title={block.title}
                content={block.content}
                backgroundColor={block.backgroundColor}
                textAlign={block.textAlign}
                button={block.button}
                contentColor={block.contentColor}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};

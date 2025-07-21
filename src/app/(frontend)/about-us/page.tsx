import {
  PageTitleSection,
  ParagraphImageSection,
  ParagraphOverImage,
  ParagraphSection,
  Spacer,
} from '@/components/pageComponents';
import clsx from 'clsx';
import type { Metadata } from 'next';
import type { FC } from 'react';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn more about Aimu, our mission, and how we are revolutionizing postpartum care in North America.',
};

const AboutUsPage: FC = () => {
  return (
    <main>
      <PageTitleSection
        title="About Us"
        backgroundImage="/images/pexels-kpaukshtite-3242264.jpg"
      />
      <Spacer className={clsx(['md:h-20'])} />
      <ParagraphImageSection
        title="Revolutionizing Postpartum Care in North America"
        content={
          <p>
            Revolutionizing Postpartum Care in North America At Aimu, we stand
            by a simple yet powerful belief: being a mom should not mean living
            with unresolved postpartum pain. Far too often, mothers are left
            feeling helpless, forced to accept the physical and emotional toll
            of childbirth as their new normal. This doesn’t have to be the case.
            We’re here to tell you that the pain, discomfort, and body changes
            you’re feeling after pregnancy can be addressed, and they can be
            healed.
          </p>
        }
        image="/images/pexels-yankrukov-7155632.jpg"
      />
      <Spacer className={clsx(['h-10', 'md:h-20'])} />
      <Spacer className={clsx(['h-10', 'md:h-20', 'bg-accent-1'])} />
      <ParagraphSection
        content={
          <p className={clsx(['text-center', 'text-primary-3'])}>
            We believe a strong, healthy mother leads to a strong, healthy
            family.
          </p>
        }
        backgroundColor="var(--color-accent-1)"
      />
      <Spacer className={clsx(['h-10', 'md:h-20', 'bg-accent-1'])} />
      <Spacer className={clsx(['h-10', 'md:h-20'])} />
      <ParagraphOverImage
        title="Empowering Moms to Take Control of Their Health"
        content={
          <p>
            We understand the challenges every mom faces after childbirth. Nine
            months of pregnancy completely changes your body, and it’s easy to
            lose sight of what &quot;normal&quot; even feels like. Many women
            are unaware of the severity of their postpartum conditions because
            they’ve been told to just &quot;push through&quot; or &quot;give it
            time.&quot; But the truth is, postpartum recovery doesn’t have to be
            a long, painful process. With the right care, you can regain your
            strength, close the gaps, and restore your body to a healthier
            state.
          </p>
        }
        image="/images/pexels-jonathanborba-19666196.jpg"
      />
      <Spacer className={clsx(['md:h-20'])} />
      <ParagraphImageSection
        title="Join Our Community of Strong Mothers"
        content={
          <p>
            We believe in the power of community and support. Through our
            services and workshops, we aim to foster a network of women who
            prioritize self-care and healing. By taking care of your body, you
            can better take care of your little one.
          </p>
        }
        image="/images/pexels-yankrukov-7155632.jpg"
        reverse
      />
      <Spacer className={clsx(['h-10', 'md:h-20'])} />
    </main>
  );
};

export default AboutUsPage;

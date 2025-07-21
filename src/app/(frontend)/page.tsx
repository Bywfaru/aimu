import { Button } from '@/components';
import {
  HeroSection,
  ParagraphImageSection,
  ParagraphSection,
  ServicesSection,
  Spacer,
} from '@/components/pageComponents';
import config from '@payload-config';
import clsx from 'clsx';
import Link from 'next/link';
import { getPayload } from 'payload';
import type { FC } from 'react';

export const revalidate = 3600;

const HomePage: FC = async () => {
  const payload = await getPayload({ config });
  const services = await payload.find({
    collection: 'services',
  });

  return (
    <main>
      <HeroSection />
      <Spacer className={clsx(['h-10', 'md:h-20'])} />
      <ParagraphSection
        content={
          <div
            className={clsx([
              'text-center',
              'flex',
              'flex-col',
              'gap-5',
              'text-primary-3',
              'max-w-2xl',
              'mx-auto',
            ])}
          >
            <p>
              We believe in the power of community and support. Through our
              services and workshops, we aim to foster a network of women who
              prioritize self-care and healing.
            </p>

            <p>
              By taking care of your body, you can better take care of your
              little one.
            </p>
          </div>
        }
      />
      <Spacer className={clsx(['h-10', 'md:h-20'])} />
      <ParagraphImageSection
        image="/images/pexels-kpaukshtite-3242264.jpg"
        title="Our Mission & Values"
        content={
          <p className="text-justify">
            To empower new moms in Vancouver and beyond through personalized
            belly binding services, custom beauty products, and education on
            natural postpartum recovery. We strive to create business
            opportunities for independent women, foster a supportive community,
            and raise awareness about the importance of early postpartum
            recovery to prevent complications, making recovery painless and
            efficient for every mom.
          </p>
        }
        backgroundColor="var(--color-accent-1)"
      />
      <Spacer className="h-10" />
      <ServicesSection
        title="Services & Treatments"
        content={
          <div
            className={clsx([
              'text-center',
              'md:text-justify',
              'flex',
              'flex-col',
              'gap-5',
            ])}
          >
            <p>
              We offer free consultations and assessments to discuss your needs
              before you commit to a treatment plan. You can even reserve your
              spot as early as pregnancy confirmation, giving you peace of mind
              that you’ll be taken care of when the time comes.
            </p>
            <p>
              We also host seminars and workshops to educate moms on the
              benefits of postpartum recovery and even offer training for those
              looking to start a career in belly binding.
            </p>
          </div>
        }
        services={services.docs}
      />
      <Spacer className="h-10" />
      <Spacer className={clsx(['h-10', 'md:h-20', 'bg-accent-1'])} />
      <ParagraphSection
        title={
          <span className={clsx(['w-full', 'md:text-center', 'block'])}>
            Why Choose Us?
          </span>
        }
        content={
          <div
            className={clsx([
              'max-w-2xl',
              'mx-auto',
              'flex',
              'flex-col',
              'gap-5',
              'text-justify',
              'md:items-center',
            ])}
          >
            <p>
              At Aimu, we personalize every treatment to suit your specific
              needs. After assessing your postpartum condition, we craft a plan
              that targets your areas of concern, ensuring a holistic recovery.
            </p>

            <p>
              Mothers have seen improvements in just 3-4 days of starting our
              treatments, including better sleep and a noticeable reduction in
              pain and discomfort.
            </p>

            <Link href="/book" className="w-fit">
              <Button variant="primary">BOOK NOW</Button>
            </Link>
          </div>
        }
        backgroundColor="var(--color-accent-1)"
      />
      <Spacer className={clsx(['h-10', 'md:h-20', 'bg-accent-1'])} />
    </main>
  );
};

export default HomePage;

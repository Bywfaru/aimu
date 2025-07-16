import { PageTitleSection, Spacer } from '@/components/pageComponents';
import { ServicesCarousel } from '@/components/pageComponents/servicesPage';
import clsx from 'clsx';
import { type FC, type ReactNode } from 'react';

export interface Service {
  name: ReactNode;
  description: ReactNode;
  image: string;
  url: string;
}

const SERVICES: Service[] = [
  {
    name: (
      <>
        BELLY BINDING
        <br />
        (10-DAY POSTPARTUM PROGRAM)
      </>
    ),
    description: (
      <>
        A modernized fusion of Malaysian and Balinese postpartum traditions, our
        belly binding program supports abdominal muscles, helps close the
        diastasis recti gap, and speeds up postpartum recovery. When untreated,
        this condition can lead to complications like hernias — our approach
        allows moms to heal naturally and effectively.
      </>
    ),
    image: '/images/belly_binding.jpeg',
    url: '/book',
  },
  {
    name: (
      <p>
        STRETCH MARK REDUCTION &
        <br />
        DETOX MASSAGE
      </p>
    ),
    description: (
      <p>
        Using our in-house stretch mark oils, this therapeutic massage enhances
        blood circulation, encourages lymphatic drainage, reduces swelling, and
        gently fades stretch marks — leaving skin nourished and renewed.
      </p>
    ),
    image: '/images/pexels-yankrukov-5793990.jpg',
    url: '/book',
  },
  {
    name: (
      <p>
        PELVIC &
        <br />
        PUBIC BONE RECOVERY
      </p>
    ),
    description: (
      <p>
        Childbirth can shift or widen the pelvic and pubic bones. Our targeted
        massages and guided exercises focus on realignment, helping restore your
        core strength, posture, and mobility.
      </p>
    ),
    image: '/images/pexels-cottonbro-6542718.jpg',
    url: '/book',
  },
  {
    name: 'MAGNETIC WAND THERAPY',
    description: (
      <p>
        This non-invasive therapy stimulates the lymphatic system, promotes
        deeper detoxification, and boosts blood flow — helping relieve muscle
        tension and support full-body rejuvenation.
      </p>
    ),
    image: '/images/magnetic_wand.jpeg',
    url: '/book',
  },
  {
    name: 'PREGNANCY MASSAGE',
    description: (
      <p>
        Our prenatal massages are specifically designed to relieve the unique
        discomforts of pregnancy — from lower back pain to swelling — while
        promoting better sleep, circulation, and relaxation throughout your
        journey.
      </p>
    ),
    image: '/images/pexels-jonathanborba-19666196.jpg',
    url: '/book',
  },
  {
    name: 'LACTATION CONSULTATION',
    description: (
      <p>
        Our lactation specialists provide expert, personalized guidance to help
        you navigate breastfeeding challenges with confidence. Whether
        you&apos;re looking for reassurance or solutions, we&apos;re here to
        support you and your baby every step of the way.
      </p>
    ),
    image: '/images/pexels-sarah-chai-7282910.jpg',
    url: '/book',
  },
];

const ServicesPage: FC = () => {
  return (
    <main>
      <PageTitleSection
        title="Services & Treatments"
        backgroundImage="/images/pexels-kpaukshtite-3242264.jpg"
      />
      <Spacer className={clsx(['h-10', 'md:h-20'])} />

      <ServicesCarousel services={SERVICES} />

      <Spacer className="md:h-20" />
    </main>
  );
};

export default ServicesPage;

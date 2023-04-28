import React from 'react';
import {
  Skills,
  MicroCampLandingHeader,
  InThisCohortContainer,
  Testimonials,
  Footer,
  NotAnotherTechCourse,
  ContextBasedLearning,
  MicrocampPricing,
  WhatWeDoForYou,
  WeTaughtAt,
  SEO,
} from '@/components';
import { getSkillsBySlug } from '@/constant';
import { PageSlug } from '@/interfaces';

const MicroCampLanding = () => {
  const slug: PageSlug = '/junior-in-web-engineering';
  return (
    <React.Fragment>
      <SEO slug={slug} />
      <MicroCampLandingHeader />
      <InThisCohortContainer />
      <Skills skills={getSkillsBySlug(slug)} />
      <WhatWeDoForYou />
      <NotAnotherTechCourse />
      <ContextBasedLearning />
      <MicrocampPricing />
      <WeTaughtAt />
      <Testimonials />
    </React.Fragment>
  );
};

export default MicroCampLanding;

import {
  FooterLinksContainerProps,
  MicroCampFeatureCardProps,
  MicroCampPricingCardProps,
} from '.';

export interface SkillProps {
  id?: string;
  name: string;
  image: string;
  imageAltText: string;
}

export interface SkillsProps {
  id: string;
  title: string;
  details: SkillProps[];
}

export interface FooterNavigationDataProps extends FooterLinksContainerProps {
  id: string;
  isShow: boolean;
}

export interface MicroCampFeatureCardContentProps
  extends MicroCampFeatureCardProps {
  id: string;
}

export type PageSlug =
  | '/'
  | '/404'
  | '/contact'
  | '/junior-in-web-engineering'
  | '/be-frontend-master'
  | '/be-backend-master'
  | '/the-boring-workshops'
  | '/2-hour-design'
  | '/the-next-wave';

export type GetSEOMetaResponseType = {
  title: string;
  siteName: string;
  description: string;
  url: string;
  type: string;
  robots: string;
  image: string;
};

export interface ProgramsDataProps {
  beFrontendMaster: {
    label: string;
    slug: PageSlug;
    description: string;
  };
  beBackendMaster: {
    label: string;
    slug: PageSlug;
    description: string;
  };
  juniorInWebEngineering: {
    label: string;
    slug: PageSlug;
    description: string;
  };
  theBoringWorkshops: {
    label: string;
    slug: PageSlug;
    description: string;
  };
  twoHourDesign: {
    label: string;
    slug: PageSlug;
    description: string;
  };
  theNextWave: {
    label: string;
    slug: PageSlug;
    description: string;
  };
}

export interface MicrocampHeaderProps {
  heading: {
    primary: string;
    secondary: string;
  };
  subheading: string;
  cta: {
    primary: string;
  };
}

export interface MicrocampInThisCohortSectionProps {
  label: string;
  features: MicroCampFeatureCardContentProps[];
}

export interface MicrocampOfferingsProps {
  id: string;
  title: string;
  content: string;
  image: string;
  imageAltText: string;
}

export interface MicrocampPricingProps {
  basePrice: number;
  sellingPrice: number;
  valueProvided: MicroCampPricingCardProps[];
}

export interface MicrocampDataProps {
  slug: PageSlug;
  header: MicrocampHeaderProps;
  inThisCohort: MicrocampInThisCohortSectionProps;
  offerings: MicrocampOfferingsProps[];
  pricing: MicrocampPricingProps;
}

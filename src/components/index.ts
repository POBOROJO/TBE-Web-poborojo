import dynamic from 'next/dynamic';
const ProgressBar = dynamic(() => import('@/components/common/ProgressBar'));
const CertificateBanner = dynamic(
  () => import('@/components/common/CertificateBanner')
);
const CertificateModal = dynamic(
  () => import('@/components/common/CertificateModal')
);
const  CertificateContent = dynamic(
  () => import('@/components/common/CertificateContent')
);
const CourseHeroContainer = dynamic(
  () => import('@/components/containers/Page/Course/CourseHeroContainer')
);
const SheetHeroContainer = dynamic(
  () =>
    import('@/components/containers/Page/Interview-sheet/SheetHeroContainer')
);
const Navbar = dynamic(() => import('@/components/layout/Navbar'));
const LinkText = dynamic(() => import('@/components/common/Typography/Link'));
const Text = dynamic(() => import('@/components/common/Typography/Text'));
const ImageContainer = dynamic(
  () => import('@/components/common/Images/Image')
);
const Logo = dynamic(() => import('@/components/common/Images/Logo'));
const Button = dynamic(() => import('@/components/common/Buttons/Button'));
const LinkButton = dynamic(
  () => import('@/components/common/Buttons/LinkButton')
);
const LandingPageHero = dynamic(
  () => import('@/components/containers/Page/common/Hero')
);
const Section = dynamic(() => import('@/components/layout/Section'));
const CardContainerB = dynamic(
  () => import('@/components/containers/Cards/CardContainerB')
);
const PrimaryCardWithCTA = dynamic(
  () => import('@/components/containers/Cards/Items/PrimaryCardWithCTA')
);
const PageLayout = dynamic(() => import('@/components/layout/Page'));
const SectionHeaderContainer = dynamic(
  () => import('@/components/containers/Page/common/SectionHeaderContainer')
);
const CardSectionContainer = dynamic(
  () => import('@/components/containers/Page/common/CardSectionContainer')
);
const GradientContainer = dynamic(
  () => import('@/components/containers/Page/common/GradientContainer')
);
const PrimaryCard = dynamic(
  () => import('@/components/containers/Cards/Items/PrimaryCard')
);
const CardContainerA = dynamic(
  () => import('@/components/containers/Cards/CardContainerA')
);
const FlexContainer = dynamic(
  () => import('@/components/containers/Page/common/FlexContainer')
);
const CanYouBeAProgrammer = dynamic(
  () => import('@/components/containers/Page/Landing/CanYouBeAProgrammer')
);
const TestimonialCard = dynamic(
  () => import('@/components/containers/Cards/Items/TestimonialCard')
);
const Testimonials = dynamic(
  () => import('@/components/containers/Cards/Testimonials')
);
const Footer = dynamic(() => import('@/components/layout/Footer'));
const GridContainer = dynamic(
  () => import('@/components/containers/Page/common/GridContainer')
);
const WeAlreadyTaughtAt = dynamic(
  () => import('./containers/Cards/WeAlreadyTaughtAt')
);
const WeTaughtAtCard = dynamic(
  () => import('./containers/Cards/Items/WeTaughtAtCard')
);
const ContactCard = dynamic(
  () => import('./containers/Cards/Items/ContactCard')
);
const SEO = dynamic(() => import('./layout/SEO'));
const Pill = dynamic(() => import('./common/Pill'));
const IconPill = dynamic(() => import('./common/Pill/IconPill'));
const ImageLink = dynamic(() => import('./common/Images/ImageLink'));
const PopoverContainer = dynamic(
  () => import('./containers/Page/common/PopoverContainer')
);
const NavbarDropdownContainer = dynamic(
  () => import('./containers/Page/common/NavbarDropdownContainer')
);
const SelectInput = dynamic(() => import('./common/Form/SelectInput'));
const RadioInputField = dynamic(() => import('./common/Form/RadioInputField'));
const InputFieldContainer = dynamic(
  () => import('./common/Form/InputFieldContainer')
);
const InputRadioContainer = dynamic(
  () => import('./containers/Forms/InputRadioContainer')
);
const LoadingSpinner = dynamic(() => import('./common/LoadingSpinner'));
const MobileNavbarLinksContainer = dynamic(
  () => import('./containers/Page/common/MobileNavbarLinksContainer')
);
const PageHeroMetaContainer = dynamic(
  () => import('./containers/Page/common/PageHeroMetaContainer')
);
const ProjectHeroContainer = dynamic(
  () => import('./containers/Page/Project/ProjectHeroContainer')
);
const Accordion = dynamic(() => import('./common/Accordion'));
const AccordionLinkItem = dynamic(
  () => import('./common/Accordion/AccordionLinkItem')
);
const MDXRenderer = dynamic(() => import('./common/MDXRenderer'));

const UserAvatar = dynamic(() => import('./common/Images/UserAvatar'));
const LoginWithGoogleButton = dynamic(
  () => import('./common/Buttons/LoginWithGoogleButton')
);
const LogoutButton = dynamic(() => import('./common/Buttons/LogoutButton'));
const Alert = dynamic(() => import('./common/Alert'));
const MentorshipPlans = dynamic(
  () => import('./containers/Page/Landing/MentorshipPlans')
);
const Community = dynamic(() => import('./containers/Page/Landing/Community'));
const ChapterLink = dynamic(
  () => import('@/components/common/Learning/ChapterLink')
);
const QuestionLink = dynamic(
  () => import('@/components/common/Learning/QuestionLink')
);

export {
  Navbar,
  LinkText as Link,
  Text,
  ImageContainer as Image,
  Logo,
  Button,
  LinkButton,
  LandingPageHero,
  Section,
  CardContainerB,
  PrimaryCardWithCTA,
  PageLayout,
  SectionHeaderContainer,
  CardSectionContainer,
  GradientContainer,
  PrimaryCard,
  CardContainerA,
  FlexContainer,
  CanYouBeAProgrammer,
  TestimonialCard,
  Testimonials,
  Footer,
  GridContainer,
  WeAlreadyTaughtAt,
  WeTaughtAtCard,
  SEO,
  ContactCard,
  Pill,
  IconPill,
  ImageLink,
  PopoverContainer,
  NavbarDropdownContainer,
  SelectInput,
  LogoutButton,
  InputRadioContainer,
  RadioInputField,
  InputFieldContainer,
  LoadingSpinner,
  MobileNavbarLinksContainer,
  PageHeroMetaContainer,
  ProjectHeroContainer,
  Accordion,
  AccordionLinkItem,
  MDXRenderer,
  LoginWithGoogleButton,
  UserAvatar,
  Alert,
  Community,
  MentorshipPlans,
  CourseHeroContainer,
  ChapterLink,
  ProgressBar,
  QuestionLink,
  SheetHeroContainer,
  CertificateBanner,
  CertificateModal,
  CertificateContent,
};

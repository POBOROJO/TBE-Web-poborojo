import React, { useEffect, useState } from 'react';
import {
  FlexContainer,
  Section,
  Text,
  Image,
  CertificateContent,
  WebinarHeroContainer,
  LinkButton,
  SEO,
  CardSectionContainer,
  TestimonialCard,
  BackgroundImage,
  Pill,
} from '@/components';
import { WebinarPageProps } from '@/interfaces';
import { getWebinarPageProps } from '@/utils';
import { useApi, useUser, useCertificate } from '@/hooks';
import { routes, imageMeta, TESTIMONIALS } from '@/constant';
import { isProgramActive } from '@/utils';
import { FiCalendar } from 'react-icons/fi';
import { LuClock3 } from 'react-icons/lu';
import { SiLinkedin } from 'react-icons/si';

const WebinarPage = ({
  seoMeta,
  name,
  isFree,
  description,
  about,
  aboutWebinar,
  whatYoullLearn,
  slug,
  host,
  dateAndTime,
  bannerImageUrl,
}: WebinarPageProps) => {
  const { user, isAuth } = useUser();
  const { certificateRef, handleDownload } = useCertificate();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState<
    null | string
  >();

  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setUserEmail(user.email);
    }
  }, [user]);

  const { makeRequest } = useApi('webinar', {
    url: `${routes.api.webinar}/${slug}`,
  });

  const onGenerateCertificate = async () => {
    try {
      const {
        status,
        error,
        data: { isRegistered },
        message,
      } = await makeRequest({
        url: `${routes.api.webinar}/${slug}?email=${user?.email}`,
      });

      if (!status || error) {
        setRegistrationErrorMessage('Certificate generation failed');
      }

      if (isRegistered) {
        setShowCertificate(true);
      } else {
        setShowCertificate(false);
        setRegistrationErrorMessage(message);
      }
    } catch (error) {
      console.error('Detailed error while generating certificate: ', error);
    }
  };

  const webinarStarted = isProgramActive(new Date(dateAndTime));

  let certificateSection;
  let generateCertificateCard;

  if (showCertificate) {
    generateCertificateCard = (
      <>
        <FlexContainer
          fullWidth={true}
          className={`max-w-lg bg-white rounded-1 border-2 border-gray-500 ${
            webinarStarted ? '' : 'opacity-80'
          }`}
        >
          <div ref={certificateRef} className='w-full'>
            <CertificateContent
              type='webinar'
              username={userName}
              courseName={name}
              date={dateAndTime.slice(0, 10)}
            />
          </div>
        </FlexContainer>
        <button
          onClick={handleDownload}
          disabled={!webinarStarted}
          className={`rounded py-1 px-2 text-white ${
            webinarStarted
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Download Certificate
        </button>
      </>
    );
  }

  if (!isAuth) {
    certificateSection = <WebinarHeroContainer />;
  } else {
    certificateSection = (
      <FlexContainer
        direction='col'
        className='w-full max-w-screen-lg bg-gradient-to-b from-white to-pink-500 p-2 py-4 m-auto mt-2 rounded-1 gap-2'
      >
        <Text level='h1' textCenter className='text-2xl font-semibold mb-4'>
          Generate Your Certificate
        </Text>

        <FlexContainer fullWidth={true} direction='row' className='gap-2'>
          <FlexContainer
            direction='col'
            className='w-full md:w-[45%] max-w-[400px]'
            itemCenter={false}
          >
            <Text level='label' className='pre-name text-white font-semibold'>
              Your Name
            </Text>
            <Text level='p' className='w-full font-semibold'>
              {userName}
            </Text>
          </FlexContainer>
          <FlexContainer
            direction='col'
            className='w-full md:w-[45%] max-w-[400px]'
            itemCenter={false}
          >
            <Text level='label' className='pre-name text-white font-semibold'>
              Your Email
            </Text>
            <Text level='p' className='w-full font-semibold'>
              {userEmail}
            </Text>
          </FlexContainer>
        </FlexContainer>

        <button
          onClick={onGenerateCertificate}
          className='rounded bg-pink-500 py-1 px-2 mt-2 text-white hover:bg-pink-600 focus:outline-none'
        >
          Generate Certificate
        </button>
        {registrationErrorMessage && (
          <Text level='p'>{registrationErrorMessage}</Text>
        )}
        {generateCertificateCard}
      </FlexContainer>
    );
  }

  return (
    <React.Fragment>
      <SEO seoMeta={seoMeta} />
      <Section className='md:px-8 md:py-2 px-2 py-2'>
        <FlexContainer className='relative'>
          <BackgroundImage bannerImageUrl={bannerImageUrl} />
          <FlexContainer className='py-10 md:py-8 gap-2' direction='col'>
            {isFree && <Pill text='Free Webinar' variant='SECONDARY' />}
            {!isFree && <Pill text='Paid Webinar' variant='SECONDARY' />}

            <FlexContainer className='gap-1' direction='col'>
              <Text level='h2' textCenter className='heading-2'>
                {name}
              </Text>
              <Text level='p' textCenter className='paragraph'>
                {description}
              </Text>
            </FlexContainer>

            <FlexContainer
              direction='row'
              className='gap-2 max-w-[80%] mt-3'
              wrap={false}
            >
              <Image
                alt='host-img'
                src={host.imageUrl}
                className='rounded-full w-[70px] md:w-20 lg:w-24 border-2 border-gray-950'
              />
              <FlexContainer
                direction='col'
                itemCenter={false}
                className='md:gap-1'
              >
                <Text
                  level='h2'
                  className='text-md md:text-2xl lg:text-3xl font-semibold'
                >
                  {host.name}
                </Text>
                <Text level='p' className='text-sm md:text-lg lg:text-xl'>
                  {host.role}
                </Text>
              </FlexContainer>
            </FlexContainer>

            {/* Date and Time & Starts in Container */}
            <FlexContainer direction='col' className='gap-4'>
              <FlexContainer
                direction='row'
                className='h-6 justify-start items-center gap-x-9'
              >
                <FlexContainer
                  direction='row'
                  className='justify-start items-center gap-2.5'
                >
                  <FiCalendar className='w-4 h-4' />
                  <Text level='p' className='strong-text'>
                    29 Apr, Saturday
                  </Text>
                </FlexContainer>
                <FlexContainer
                  direction='row'
                  className='justify-start items-center gap-2.5'
                >
                  <LuClock3 className='w-4 h-4' />
                  <Text level='p' className='strong-text'>
                    11 AM
                  </Text>
                </FlexContainer>
              </FlexContainer>

              <FlexContainer
                direction='col'
                className='justify-start items-center gap-4'
              >
                <Text level='p' className='strong-text'>
                  Starts in
                </Text>

                <FlexContainer
                  direction='row'
                  className='gap-2.5'
                  justifyCenter={true}
                  itemCenter={true}
                >
                  {/* Days */}
                  <FlexContainer
                    direction='col'
                    className='h-9 p-2 border border-rose-500 rounded-1'
                  >
                    <Text level='p' className='strong-text text-rose-500'>
                      03 d
                    </Text>
                  </FlexContainer>

                  {/* Hours */}
                  <FlexContainer
                    direction='col'
                    className='h-9 p-2 border border-rose-500 rounded-1'
                  >
                    <Text level='p' className='strong-text text-rose-500'>
                      02 h
                    </Text>
                  </FlexContainer>

                  {/* Minutes */}
                  <FlexContainer
                    direction='col'
                    className='h-9 p-2 border border-rose-500 rounded-1'
                  >
                    <Text level='p' className='strong-text text-rose-500'>
                      01 m
                    </Text>
                  </FlexContainer>
                </FlexContainer>
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer
          direction='col'
          fullWidth={true}
          justifyCenter={true}
          itemCenter={true}
          className='max-w-screen-lg h-52 px-6 py-7 gradient-1 rounded-lg gap-2.5 overflow-hidden m-auto'
        >
          <FlexContainer
            direction='col'
            className='justify-start items-center gap-4'
          >
            <Text level='h5' className='heading-5'>
              Register Now
            </Text>

            <FlexContainer
              direction='col'
              className='justify-start items-center gap-4'
            >
              <LinkButton
                href=''
                className='w-full sm:w-[300px]'
                buttonProps={{
                  variant: 'PRIMARY',
                  text: 'Join Webinar',
                  className: 'w-full',
                }}
              />

              <Text level='p' className='strong-text'>
                25 Slots only. Few seats left.
              </Text>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>

        {certificateSection}

        {/* About the Webinar */}
        <FlexContainer
          direction='col'
          fullWidth={true}
          className='max-w-screen-lg m-auto mt-5'
        >
          {/* About Webinar Section */}
          <FlexContainer
            direction='col'
            itemCenter={true}
            className='max-w-screen-lg justify-start gap-4 rounded-lg'
          >
            <FlexContainer
              direction='col'
              itemCenter={true}
              className='justify-start gap-5'
            >
              <Text level='h4' className='heading-4'>
                About webinar
              </Text>

              <FlexContainer
                direction='row'
                className='justify-start items-start gap-3'
              >
                {/* Date Container */}
                <FlexContainer
                  direction='row'
                  itemCenter={true}
                  justifyCenter={true}
                  className='px-2 py-2 bg-black rounded-1 gap-2.5 overflow-hidden'
                >
                  <FiCalendar className='w-3 h-3 text-white' />
                  <Text level='p' className='strong-text text-neutral-50'>
                    29 Apr, Saturday
                  </Text>
                </FlexContainer>

                {/* Time Container */}
                <FlexContainer
                  direction='col'
                  justifyCenter={true}
                  itemCenter={true}
                  className='px-2 py-2 bg-black rounded gap-2.5 overflow-hidden'
                >
                  <FlexContainer
                    direction='row'
                    itemCenter={true}
                    className='justify-start gap-2.5'
                  >
                    <LuClock3 className='w-3 h-3 text-white' />
                    <Text level='p' className='strong-text text-neutral-50'>
                      11 AM
                    </Text>
                  </FlexContainer>
                </FlexContainer>
              </FlexContainer>
            </FlexContainer>

            {/* Description */}
            <Text level='p' className='subtitle'>
              {aboutWebinar}
            </Text>
          </FlexContainer>
        </FlexContainer>

        {/* What will you learn */}
        <FlexContainer
          direction='col'
          fullWidth={true}
          className='max-w-screen-lg p-2 py-4 m-auto mt-2 rounded-1 gap-3'
        >
          <Text level='h4' className='heading-4'>
            What will you learn
          </Text>
          <ol className='list-decimal'>
            {whatYoullLearn?.map((item, index) => (
              <li key={index}>
                <Text level='p' className='subtitle'>
                  {item}
                </Text>
              </li>
            ))}
          </ol>
        </FlexContainer>

        {/* Meet your Instructor */}
        <FlexContainer
          direction='col'
          fullWidth={true}
          className='max-w-screen-lg p-2 py-4 m-auto mt-2 gap-4'
        >
          <FlexContainer justifyCenter={true} itemCenter={true}>
            <Text level='h4' className='heading-4'>
              Meet your instructor
            </Text>
          </FlexContainer>

          <FlexContainer
            direction='col'
            className='justify-start items-start gap-2'
          >
            <FlexContainer
              direction='row'
              className='justify-start items-start gap-2.5'
            >
              <FlexContainer
                direction='row'
                itemCenter={true}
                className='justify-end gap-2.5'
              >
                <Image
                  src={host.imageUrl}
                  alt={host.name}
                  className='rounded-full w-[70px] md:w-20 lg:w-24 border-2 border-gray-950'
                />

                <FlexContainer
                  direction='col'
                  className='justify-start items-start gap-2'
                >
                  <Text level='h5' className='heading-5'>
                    {host.name}
                  </Text>
                  <Text level='p' className='paragraph'>
                    {host.role}
                  </Text>
                </FlexContainer>
                <SiLinkedin
                  className='w-5 h-5 cursor-pointer text-blue-600'
                  onClick={() => window.open(host.linkedInUrl, '_blank')}
                />
              </FlexContainer>
            </FlexContainer>
            <ol className='list-decimal pl-8 space-y-4 mt-4'>
              {host.about?.map((item, index) => (
                <li key={index} className='pl- ml-2'>
                  <Text level='p' className='paragraph'>
                    {item}
                  </Text>
                </li>
              ))}
            </ol>
          </FlexContainer>
        </FlexContainer>

        {/* About the Boring Education */}
        <FlexContainer
          direction='col'
          fullWidth={true}
          className='max-w-screen-lg gradient-6 p-2 py-4 m-auto mt-2 rounded-1 gap-2.5'
        >
          <Text level='h5' textCenter className='heading-5'>
            About the Boring Education
          </Text>

          <FlexContainer
            direction='row'
            fullWidth={true}
            itemCenter={false}
            justifyCenter={false}
          >
            <Image
              src={imageMeta.logo.light}
              className='w-auto max-w-[200px] mb-1'
              fullWidth={false}
              alt={imageMeta.logo.alt}
            />
          </FlexContainer>

          <Text level='p' className='strong-text '>
            We at TBE, building An Open Source Tech Education platform to make
            learning faster with Hands-on Experience.
          </Text>

          <LinkButton
            href={routes.projects}
            className='w-full sm:w-fit'
            buttonProps={{
              variant: 'PRIMARY',
              text: 'Explore Free Projects',
              className: 'w-full',
            }}
          />
        </FlexContainer>

        {/* What are students saying ? */}
        <FlexContainer
          direction='col'
          fullWidth={true}
          className='max-w-screen-lg p-2 py-4 m-auto mt-2 rounded-1 gap-3'
        >
          <Text level='h4' className='heading-4'>
            What are <span className='text-rose-500'>students</span> saying ?
          </Text>
          <CardSectionContainer
            gap='gap-2'
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          >
            {TESTIMONIALS.map((item) => {
              return <TestimonialCard {...item} key={item.id} />;
            })}
          </CardSectionContainer>
        </FlexContainer>
      </Section>
    </React.Fragment>
  );
};

export const getServerSideProps = getWebinarPageProps;

export default WebinarPage;

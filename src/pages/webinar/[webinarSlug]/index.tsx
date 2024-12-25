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
  AboutTBE,
} from '@/components';
import { WebinarPageProps } from '@/interfaces';
import { getWebinarPageProps } from '@/utils';
import { useApi, useUser, useCertificate } from '@/hooks';
import { routes, imageMeta, TESTIMONIALS } from '@/constant';
import { FiCalendar } from 'react-icons/fi';
import { LuClock3 } from 'react-icons/lu';
import { SiLinkedin } from 'react-icons/si';

const WebinarPage = ({
  seoMeta,
  name,
  isFree,
  description,
  about,
  whatYoullLearn,
  slug,
  host,
  date,
  time,
  isWebinarStarted,
  bannerImageUrl,
  registrationUrl,
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

  let certificateSection;
  let generateCertificateCard;

  if (!isWebinarStarted) {
    certificateSection = <></>;
  }

  if (showCertificate) {
    generateCertificateCard = (
      <>
        <FlexContainer
          fullWidth={true}
          className={`max-w-lg bg-white rounded-1 border-2 border-gray-500 ${
            isWebinarStarted ? '' : 'opacity-80'
          }`}
        >
          <div ref={certificateRef} className='w-full'>
            <CertificateContent
              type='webinar'
              username={userName}
              courseName={name}
              date={date + ' ' + time}
            />
          </div>
        </FlexContainer>
        <button
          onClick={handleDownload}
          disabled={!isWebinarStarted}
          className={`rounded py-1 px-2 text-white ${
            isWebinarStarted
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
  } else if (!isWebinarStarted) {
    certificateSection = <></>;
  } else {
    certificateSection = (
      <FlexContainer
        direction='col'
        className='w-full max-w-screen-lg bg-gradient-to-b from-white to-pink-500 p-2 py-4 m-auto mt-2 rounded-1 gap-2'
      >
        <Text level='h1' textCenter className='text-2xl font-semibold mb-4'>
          Generate Your Certificate
        </Text>

        <FlexContainer fullWidth={true} className='gap-2'>
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
          <FlexContainer className='py-10 md:py-8 gap-4' direction='col'>
            <FlexContainer className='gap-2' direction='col'>
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
            </FlexContainer>

            <FlexContainer className='gap-2' wrap={false}>
              <Image
                alt={host.name}
                src={host.imageUrl}
                className='rounded-full w-20 h-20 bg-contain border border-dark'
              />
              <FlexContainer direction='col' itemCenter={false}>
                <Text level='h4' className='heading-4'>
                  {host.name}
                </Text>
                <Text level='p' className='paragraph'>
                  {host.role}
                </Text>
              </FlexContainer>
            </FlexContainer>

            <FlexContainer className='h-6 justify-start items-center gap-x-9'>
              <FlexContainer className='justify-start items-center gap-2.5'>
                <FiCalendar className='w-4 h-4' />
                <Text level='p' className='strong-text'>
                  {date}
                </Text>
              </FlexContainer>
              <FlexContainer className='justify-start items-center gap-2.5'>
                <LuClock3 className='w-4 h-4' />
                <Text level='p' className='strong-text'>
                  {time}
                </Text>
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer
          direction='col'
          fullWidth={true}
          justifyCenter={true}
          className='p-3 gradient-1 rounded-2 md:w-1/2 w-full m-auto my-4'
        >
          <FlexContainer
            direction='col'
            className='justify-start items-center gap-2'
          >
            <FlexContainer
              direction='col'
              className='justify-start items-center gap-2'
              fullWidth={true}
            >
              <Text level='p' className='heading-5'>
                Register Now
              </Text>
              <LinkButton
                href={registrationUrl}
                target='_blank'
                className='w-full'
                buttonProps={{
                  variant: 'PRIMARY',
                  text: 'Register Now',
                  className: 'w-full',
                }}
              />
            </FlexContainer>

            <Text level='p' className='pre-title'>
              25 Slots only. Few seats left.
            </Text>
          </FlexContainer>
        </FlexContainer>

        {certificateSection}

        <FlexContainer direction='col' className='m-auto'>
          <FlexContainer
            direction='col'
            className='justify-start rounded-lg md:w-1/2 w-full gap-6'
          >
            <FlexContainer direction='col' className='justify-start gap-4'>
              <FlexContainer direction='col' className='gap-2'>
                <Text level='h4' className='heading-4'>
                  About webinar
                </Text>
                <FlexContainer className='gap-3'>
                  <FlexContainer
                    justifyCenter={true}
                    className='px-1 py-1 bg-black rounded gap-1'
                  >
                    <FiCalendar className='w-3 h-3 text-white' />
                    <Text level='p' className='strong-text text-white'>
                      {date}
                    </Text>
                  </FlexContainer>
                  <FlexContainer className='px-1 py-1 bg-black rounded gap-1'>
                    <LuClock3 className='w-3 h-3 text-white' />
                    <Text level='p' className='strong-text text-white'>
                      {time}
                    </Text>
                  </FlexContainer>
                </FlexContainer>
              </FlexContainer>

              <FlexContainer
                direction='col'
                className='gap-1'
                itemCenter={false}
              >
                {about.map((item, index) => {
                  return (
                    <Text
                      level='p'
                      key={index}
                      textCenter={false}
                      className='paragraph'
                    >
                      {item}
                    </Text>
                  );
                })}
              </FlexContainer>
            </FlexContainer>
            <FlexContainer direction='col' fullWidth={true} className='gap-3'>
              <Text level='h4' className='heading-4'>
                What will you learn
              </Text>
              <ol className='list-decimal w-full flex flex-col gap-1'>
                {whatYoullLearn?.map((item, index) => (
                  <li key={index}>
                    <Text level='p' className='paragraph'>
                      {item}
                    </Text>
                  </li>
                ))}
              </ol>
            </FlexContainer>
            <FlexContainer direction='col' fullWidth={true} className='gap-4'>
              <Text level='h4' className='heading-4'>
                Meet your instructor
              </Text>

              <FlexContainer
                direction='col'
                itemCenter={false}
                justifyCenter={false}
                className='justify-start items-start gap-2 w-full'
              >
                <FlexContainer className='justify-start items-start gap-2'>
                  <FlexContainer className='gap-3'>
                    <Image
                      src={host.imageUrl}
                      alt={host.name}
                      className='rounded-full w-20 h-20 bg-contain border border-dark'
                    />

                    <FlexContainer
                      direction='col'
                      itemCenter={false}
                      justifyCenter={false}
                      className='justify-start items-start'
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
                <ol className='list-decimal flex flex-col gap-1'>
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
            <AboutTBE />
          </FlexContainer>
        </FlexContainer>

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

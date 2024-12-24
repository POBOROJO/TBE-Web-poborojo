import React, { useRef, useEffect, useState } from 'react';
import { toPng } from 'html-to-image';
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
} from '@/components';
import { WebinarPageProps } from '@/interfaces';
import { getWebinarPageProps } from '@/utils';
import { useApi, useUser } from '@/hooks';
import { routes, imageMeta, TESTIMONIALS } from '@/constant';
import { isProgramActive } from '@/utils';
import { FiCalendar } from 'react-icons/fi';
import { LuClock3 } from 'react-icons/lu';
import { SiLinkedin } from 'react-icons/si';
import Testimonials from '@/components/containers/Cards/Testimonials';

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
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState<
    null | string
  >();

  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      setUserName(user.name || '');
      setUserEmail(user.email || '');
    }
  }, [user]);

  const handleDownload = async () => {
    if (certificateRef.current) {
      try {
        const dataUrl = await toPng(certificateRef.current, { quality: 1 });
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${userName}-webinar-certificate.png`;
        link.click();
      } catch (error) {
        console.error('Error generating certificate image:', error);
      }
    }
  };

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
      <Section className='flex flex-col gap-2 px-4 pb-4'>
        <FlexContainer className='relative'>
          <div
            className='absolute inset-0 bg-cover bg-center opacity-20 rounded-2'
            style={{
              backgroundImage: `url(${bannerImageUrl})`,
            }}
          ></div>

          <FlexContainer
            className='bg-transparent p-3 py-10 md:py-8 lg:py-6 gap-3 md:gap-2'
            direction='col'
          >
            <Text
              level='span'
              className='bg-yellow-500 text-sm md:text-md lg:text-lg font-semibold p-1 px-3 mb-2 rounded-1'
            >
              {isFree ? 'Free' : 'Paid'} Webinar
            </Text>

            <Text
              level='h1'
              textCenter
              className='text-3xl md:text-3xl lg:text-5xl font-bold'
            >
              {name}
            </Text>

            <Text
              level='p'
              textCenter
              className='text-lg md:text-xl lg:text-2xl px-[2.5%] lg:pt-1'
            >
              {description}
            </Text>

            <FlexContainer
              direction='row'
              className='gap-2 max-w-[80%] mt-3'
              wrap={false}
            >
              <Image
                alt='host-img'
                src={host.imageUrl}
                className='w-20 h-20 rounded-full border-2 border-zinc-900'
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
                  <Text
                    level='p'
                    className="text-center text-zinc-900 text-base font-semibold font-['Inter']"
                  >
                    29 Apr, Saturday
                  </Text>
                </FlexContainer>
                <FlexContainer
                  direction='row'
                  className='justify-start items-center gap-2.5'
                >
                  <LuClock3 className='w-4 h-4' />
                  <Text
                    level='p'
                    className="text-center text-zinc-900 text-base font-semibold font-['Inter']"
                  >
                    11 AM
                  </Text>
                </FlexContainer>
              </FlexContainer>

              <FlexContainer
                direction='col'
                className='justify-start items-center'
              >
                <Text
                  level='p'
                  className="text-center text-zinc-900 text-lg font-semibold font-['Inter'] mb-4"
                >
                  Starts in
                </Text>

                <FlexContainer
                  direction='row'
                  className='justify-center items-center gap-2.5'
                >
                  {/* Days */}
                  <FlexContainer
                    direction='col'
                    className='p-2 rounded border border-rose-500 justify-center items-center overflow-hidden'
                  >
                    <Text
                      level='p'
                      className="text-center text-rose-500 text-base font-semibold font-['Inter']"
                    >
                      03 d
                    </Text>
                  </FlexContainer>

                  {/* Hours */}
                  <FlexContainer
                    direction='col'
                    className='p-2 rounded border border-rose-500 justify-center items-center overflow-hidden'
                  >
                    <Text
                      level='p'
                      className="text-center text-rose-500 text-base font-semibold font-['Inter']"
                    >
                      02 h
                    </Text>
                  </FlexContainer>

                  {/* Minutes */}
                  <FlexContainer
                    direction='col'
                    className='p-2 rounded border border-rose-500 justify-center items-center overflow-hidden'
                  >
                    <Text
                      level='p'
                      className="text-center text-rose-500 text-base font-semibold font-['Inter']"
                    >
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
          className='w-full max-w-screen-lg h-52 px-6 py-7 bg-gradient-to-b from-yellow-100 to-orange-400 rounded-lg justify-start items-start gap-2.5 overflow-hidden m-auto mt-2'
        >
          <FlexContainer
            direction='col'
            className='justify-start items-center gap-4'
          >
            <Text
              level='h5'
              className="heading-5"
            >
              Register Now
            </Text>

            <FlexContainer
              direction='col'
              className='justify-start items-center gap-4'
            >
              <LinkButton
                href={''}
                className='w-full sm:w-[300px]'
                buttonProps={{
                  variant: 'PRIMARY',
                  text: 'Join Webinar',
                  className: 'w-full',
                }}
              />

              <Text
                level='p'
                className="text-zinc-900 text-base font-semibold font-['Inter']"
              >
                25 Slots only. Few seats left.
              </Text>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>

        {certificateSection}

        {/* About the Webinar */}
        <FlexContainer
          direction='col'
          className='w-full max-w-screen-lg bg-gradient-to-b from-white p-2 py-4 m-auto mt-2 rounded-1 gap-3'
        >
          {/* About Webinar Section */}
          <FlexContainer
            direction='col'
            className='max-w-screen-lg justify-start items-center gap-4 rounded-lg'
          >
            <FlexContainer
              direction='col'
              className='justify-start items-center gap-5'
            >
              <Text level='h4' className='text-zinc-900 text-2xl font-bold'>
                About webinar
              </Text>

              <FlexContainer
                direction='row'
                className='justify-start items-start gap-5'
              >
                {/* Date Container */}
                <FlexContainer
                  direction='row'
                  className='px-4 py-2 bg-black rounded justify-center items-center gap-2.5 overflow-hidden'
                >
                  <FiCalendar className='w-3 h-3 text-white' />
                  <Text
                    level='p'
                    className='text-neutral-50 text-base font-semibold'
                  >
                    29 Apr, Saturday
                  </Text>
                </FlexContainer>

                {/* Time Container */}
                <FlexContainer
                  direction='col'
                  className='px-4 py-2 bg-black rounded justify-center items-center gap-2.5 overflow-hidden'
                >
                  <FlexContainer
                    direction='row'
                    className='justify-start items-center gap-2.5'
                  >
                    <LuClock3 className='w-3 h-3 text-white' />
                    <Text
                      level='p'
                      className='text-neutral-50 text-base font-semibold'
                    >
                      11 AM
                    </Text>
                  </FlexContainer>
                </FlexContainer>
              </FlexContainer>
            </FlexContainer>

            {/* Description */}
            <Text
              level='p'
              className='w-full px-4 md:w-fit text-zinc-900 text-xl font-normal whitespace-pre-line'
            >
              {about}
            </Text>
          </FlexContainer>
        </FlexContainer>

        {/* What will you learn */}
        <FlexContainer
          direction='col'
          className='w-full max-w-screen-lg bg-gradient-to-b from-white p-2 py-4 m-auto mt-2 rounded-1 gap-3'
        >
          <Text
            level='h2'
            className="text-zinc-900 text-2xl font-bold"
          >
            What will you learn
          </Text>
          <Text
            level='p'
            className='w-full px-4 md:w-fit text-zinc-900 text-xl font-normal text-left md:pl-8 whitespace-pre-line'
          >
            <ol className='list-decimal list-inside'>
              <li>
                You’ll learn with your background, will programming be helpful
                for you?
              </li>
              <li>Decide if you should be okay buying expensive bootcamps</li>
              <li>Understand what it takes to break into Tech</li>
            </ol>
          </Text>
        </FlexContainer>

        {/* Meet your Instructor */}
        <FlexContainer
          direction='col'
          className='w-full max-w-screen-lg bg-gradient-to-b from-white p-2 py-4 m-auto mt-2 rounded-1 gap-3'
        >
          <Text level='h2' className='text-zinc-900 text-2xl font-bold'>
            Meet your instructor
          </Text>

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
                className='justify-end items-center gap-6'
              >
                <Image
                  src={host.imageUrl}
                  alt={host.name}
                  className='w-20 h-20 rounded-full border-2 border-zinc-900'
                />

                <FlexContainer
                  direction='col'
                  className='justify-start items-start gap-1'
                >
                  <Text
                    level='h3'
                    className="text-center text-zinc-900 text-xl font-bold font-['Inter']"
                  >
                    {host.name}
                  </Text>
                  <Text
                    level='p'
                    className='w-40 text-zinc-900 text-base font-normal leading-snug'
                  >
                    {host.role}
                  </Text>
                </FlexContainer>
              </FlexContainer>

              <SiLinkedin className='w-5 h-5 cursor-pointer text-blue-600' />
            </FlexContainer>

            <Text
              level='p'
              className='w-full px-4 md:w-fit text-zinc-900 text-xl font-normal text-left md:pl-8 whitespace-pre-line'
            >
              <ol className='list-decimal list-inside'>
                <li>Built Ed-tech startups since college</li>
                <li>Worked with Newton School, Masai, Pesto & CueMath.</li>
                <li>Senior Software Engineer @ PW</li>
              </ol>
            </Text>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer
          direction='col'
          className='w-full max-w-screen-lg bg-gradient-to-b from-white to-pink-300 p-2 py-4 m-auto mt-2 rounded-1 gap-3'
        >
          <Text level='h1' textCenter className='text-2xl font-semibold mb-4'>
            About the Boring Education
          </Text>

          <FlexContainer
            direction='row'
            className='w-full'
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

          <Text
            level='p'
            className='text-sm md:text-lg lg:text-xl font-semibold'
          >
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
          className='w-full max-w-screen-lg bg-gradient-to-b from-white p-2 py-4 m-auto mt-2 rounded-1 gap-3'
        >
          <Text level='h2' className='text-zinc-900 text-2xl font-bold'>
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

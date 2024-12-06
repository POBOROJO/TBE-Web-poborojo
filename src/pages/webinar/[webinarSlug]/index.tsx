import React, { useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import {
  FlexContainer,
  Section,
  Text,
  Image,
  InputFieldContainer,
  CertificateContent,
} from '@/components';
import { WebinarPageProps } from '@/interfaces';
import { getWebinarPageProps } from '@/utils';
import { useApi, useUser } from '@/hooks';
import { useState } from 'react';
import { routes } from '@/constant';
import { WebinarHeroContainer } from '@/components';

const WebinarPage = ({
  webinarId,
  hostName,
  hostImageUrl,
  hostRole,
  dateAndTime,
}: WebinarPageProps) => {
  const { user, isAuth } = useUser();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showCertificate, toggleCertificate] = useState(false);
  const [showRegistrationErrMsg, toggleRegistrationErrMsg] = useState(false);

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
        console.error('Error generatingcertificate image:', error);
      }
    }
  };

  const { makeRequest } = useApi(
    'webinar',
    {
      url: `${routes.api.webinar}/${webinarId}`,
    },
    { enabled: !!user?.email }
  );

  const onGenerateCertificate = async () => {
    try {
      const response = await makeRequest({
        url: `${routes.api.webinar}/${webinarId}?email=${user?.email}`,
      });

      if (!response?.status) {
        throw new Error(`Error occured`);
      }

      if (response?.data?.isRegistered) {
        toggleCertificate(true);
        toggleRegistrationErrMsg(false);
      } else {
        toggleCertificate(false);
        toggleRegistrationErrMsg(true);
      }
    } catch (error) {
      console.log('Error while generating certificate: ', error);
    }
  };

  const webinarDate = new Date(dateAndTime);
  const currentDate = new Date();
  const isWebinarOver = currentDate >= webinarDate;

  let certificateSection;
  let generateCertificateCard;

  if (showCertificate) {
    generateCertificateCard = (
      <>
        <FlexContainer
          fullWidth={true}
          className={`max-w-lg bg-white rounded-1 border-2 border-gray-500 ${
            isWebinarOver ? '' : 'opacity-80'
          }`}
        >
          <div ref={certificateRef} className='w-full'>
            <CertificateContent // The certificate template has to be changed
              username={userName}
              courseName='Basics of Programming Webinar' //we have to update this with the actual title
              date={dateAndTime.slice(0, 10)}
            />
          </div>
        </FlexContainer>
        <button
          onClick={handleDownload}
          disabled={!isWebinarOver}
          className={`rounded py-1 px-2 text-white ${
            isWebinarOver
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

        <FlexContainer fullWidth={true} direction='row' className='gap-2 '>
          <InputFieldContainer
            label='Your Name'
            type='text'
            value={userName}
            onChange={(value) => setUserName(value)}
            className='md:w-[45%] max-w-[400px]'
            labelClassName='font-semibold text-black'
            inputClassName='bg-pink-100 border-none'
            disable={true}
          />
          <InputFieldContainer
            label='Your Email'
            type='text'
            value={userEmail}
            onChange={(value) => setUserEmail(value)}
            className='md:w-[45%] max-w-[400px]'
            labelClassName='font-semibold text-black'
            inputClassName='bg-pink-100 border-none'
            disable={true}
          />
        </FlexContainer>

        <button
          onClick={onGenerateCertificate}
          className='rounded bg-pink-500 py-1 px-2 text-white hover:bg-pink-600 focus:outline-none'
        >
          Generate Certificate
        </button>
        {showRegistrationErrMsg && (
          <Text level='p'>you are not registered to the webinar*</Text>
        )}
        {generateCertificateCard}
      </FlexContainer>
    );
  }

  return (
    <React.Fragment>
      <Section className=' flex flex-col  gap-2 px-4 pb-4'>
        <FlexContainer className='relative'>
          <div
            className='absolute inset-0 bg-cover bg-center opacity-20 rounded-2'
            style={{
              backgroundImage:
                "url('https://wallpapers.com/images/hd/coding-background-9izlympnd0ovmpli.jpg')",
            }}
          ></div>

          <FlexContainer
            className=' bg-transparent p-3 py-10 md:py-8 lg:py-6 gap-3 md:gap-2'
            direction='col'
          >
            <Text
              level='span'
              className='bg-yellow-500 text-sm md:text-md lg:text-lg font-semibold p-1 px-3 mb-2 rounded-1'
            >
              Free Webinar
            </Text>

            <Text // This is going to be filled with the actual webinar title
              level='h1'
              textCenter
              className='text-3xl md:text-3xl lg:text-5xl font-bold'
            >
              Is Programming for you?
            </Text>

            <Text // This is going to be filled with the actual webinar description
              level='p'
              textCenter
              className='text-lg md:text-xl lg:text-2xl px-[2.5%] lg:pt-1'
            >
              Understand why everybody wants to be in Tech and should you learn
              Tech or not.
            </Text>

            <FlexContainer
              direction='row'
              className='gap-2 max-w-[80%] mt-3'
              wrap={false}
            >
              <Image
                alt='host-img'
                src={hostImageUrl}
                className='rounded-full w-[70px] md:w-20 lg:w-24 border-2 border-gray-950'
              />
              <FlexContainer
                direction='col'
                itemCenter={false}
                className='md:gap-1 '
              >
                <Text
                  level='h2'
                  className='text-md md:text-2xl lg:text-3xl font-semibold'
                >
                  {hostName}
                </Text>
                <Text level='p' className='text-sm md:text-lg lg:text-xl'>
                  {hostRole}
                </Text>
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>

        {certificateSection}
      </Section>
    </React.Fragment>
  );
};

export const getServerSideProps = getWebinarPageProps;

export default WebinarPage;

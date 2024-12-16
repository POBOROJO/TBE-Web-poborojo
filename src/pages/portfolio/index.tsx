import React from 'react';
import { Section, FlexContainer, Image, Text, Button, SEO } from '@/components';
import {
  STATIC_FILE_PATH,
  portfolioCards,
  portfolioTemplates,
} from '@/constant';
import { PortfolioCard, PortfolioTemplate } from '@/components';
import { getPreFetchProps } from '@/utils';
import { PageProps } from '@/interfaces';

const Portfolio = ({ seoMeta }: PageProps) => {
  return (
    <React.Fragment>
      <SEO seoMeta={seoMeta} />
      <Section className='flex flex-col items-center gap-2 p-4'>
        <FlexContainer
          wrap={false}
          fullWidth={true}
          className='max-w-screen-xl flex-col md:flex-row md:justify-around bg-gradient-to-b from-slate-100 to-pink-400 p-2 md:p-4 py-4 md:py-6 rounded-2 gap-4 md:gap-4'
        >
          <Image
            alt='portfolio-img'
            src={`${STATIC_FILE_PATH.svg}/hero-image.svg`}
            className='w-[70%] md:min-w-[40%] lg:min-w-[20%] lg:w-[30%]'
          />
          <FlexContainer direction='col' className='gap-1'>
            <Text
              level='h1'
              textCenter
              className='text-2xl md:text-2xl lg:text-3xl font-bold'
            >
              Don't Just Have A Resume Own a Portfolio.
            </Text>
            <Text
              level='p'
              textCenter
              className='text-lg md:text-lg lg:text-2xl  lg:pt-1'
            >
              Choose Your Template, Modify and Deploy.
            </Text>
            <Button
              variant='PRIMARY'
              text='Get Started'
              className='px-5 mt-2 lg:mt-3'
            />
          </FlexContainer>
        </FlexContainer>
      </Section>
      <Section className='flex flex-col items-center p-4 gap-3'>
        <Text level='h1' className='w-[80%] text-center text-4xl font-bold'>
          Why Own A Website
        </Text>
        <FlexContainer
          fullWidth={true}
          className='max-w-screen-xl gap-3 md:flex-row'
        >
          {portfolioCards.map((card) => (
            <PortfolioCard
              key={card.id}
              index={card.id}
              imageUrl={card.imageUrl}
              title={card.title}
              description={card.description}
            />
          ))}
        </FlexContainer>
      </Section>
      <Section className='flex flex-col items-center bg-black text-white p-2'>
        <FlexContainer
          fullWidth={true}
          className=' max-w-screen-xl  p-2 py-4  gap-1 md:py-6'
          direction='col'
        >
          <Text
            level='h1'
            textCenter
            className='text-2xl lg:text-3xl font-bold'
          >
            Choose Your Template
          </Text>
          <Text
            level='p'
            textCenter
            className='max-w-2xl text-lg lg:text-xl lg:pt-1'
          >
            Jumpstart your app devleopment process with pre-built solutions from
            Vercel and our community.
          </Text>
          <FlexContainer className='w-full max-w-screen-xl gap-2 md:flex-row mt-5'>
            {portfolioTemplates.map((template) => (
              <PortfolioTemplate
                key={template.id}
                imageUrl={template.imageUrl}
                title={template.title}
                description={template.description}
                developerName={template.developerName}
              />
            ))}
          </FlexContainer>
        </FlexContainer>
      </Section>
    </React.Fragment>
  );
};

export const getServerSideProps = getPreFetchProps;

export default Portfolio;

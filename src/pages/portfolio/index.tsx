import React from 'react';
import {
  Section,
  FlexContainer,
  Image,
  Text,
  Button,
  SEO,
  PortfolioCard,
  PortfolioTemplate,
} from '@/components';
import {
  STATIC_FILE_PATH,
  PORTFOLIO_CARDS,
  PORTFOLIO_TEMPLATES,
} from '@/constant';
import { getPreFetchProps } from '@/utils';
import { PageProps } from '@/interfaces';

const Portfolio = ({ seoMeta }: PageProps) => {
  return (
    <React.Fragment>
      <SEO seoMeta={seoMeta} />
      <Section className='flex flex-col items-center gap-2 p-2'>
        <FlexContainer
          wrap={false}
          fullWidth={true}
          className='max-w-screen-xl flex-col md:flex-row md:justify-around gradient-6 p-2 md:p-4 py-4 md:py-6 rounded-2 gap-4 md:gap-4'
        >
          <Image
            alt='portfolio-img'
            src={`${STATIC_FILE_PATH.svg}/the-boring-portfolio-hero.svg`}
            className='md:min-w-[40%] lg:min-w-[20%] lg:w-[30%]'
          />
          <FlexContainer direction='col' className='gap-1'>
            <FlexContainer direction='col' className='gap-1'>
              <Text level='h1' className='heading-3' textCenter={true}>
                Don't Just Have A Resume Own a Portfolio.
              </Text>
              <Text level='p' textCenter={true}>
                Create Your Portfolio Websites in Minutes and Show your skills
                and projects to the world.
              </Text>
            </FlexContainer>
            <Button
              variant='PRIMARY'
              text='Get Started'
              className='px-5 mt-2 lg:mt-3'
            />
          </FlexContainer>
        </FlexContainer>
      </Section>
      <Section className='flex flex-col items-center p-2 gap-3 my-4'>
        <Text level='h2' className='heading-3' textCenter={true}>
          Why Own A{' '}
          <Text level='span' className='text-primary'>
            Portfolio?
          </Text>
        </Text>
        <FlexContainer
          fullWidth={true}
          className='max-w-screen-xl gap-3 md:flex-row'
        >
          {PORTFOLIO_CARDS.map((card) => (
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
      <Section className='flex flex-col items-center bg-black p-2'>
        <FlexContainer
          fullWidth={true}
          className='p-2 py-4 gap-1 md:py-6'
          direction='col'
        >
          <Text level='h3' textCenter={true} className='heading-4 text-white'>
            Pick Your Portfolio Template
          </Text>
          <Text level='p' textCenter={true} className='text-white'>
            Start quickly with templates and customize it as per your needs.
          </Text>
          <FlexContainer className='w-full max-w-screen-xl gap-2 md:flex-row mt-5'>
            {PORTFOLIO_TEMPLATES.map(
              ({ id, imageUrl, title, description, developerName }) => (
                <PortfolioTemplate
                  key={id}
                  imageUrl={imageUrl}
                  title={title}
                  description={description}
                  developerName={developerName}
                />
              )
            )}
          </FlexContainer>
        </FlexContainer>
      </Section>
    </React.Fragment>
  );
};

export const getServerSideProps = getPreFetchProps;

export default Portfolio;

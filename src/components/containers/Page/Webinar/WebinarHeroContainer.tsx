import { FlexContainer, Text, LoginWithGoogleButton } from '@/components';

const WebinarHeroContainer = () => {
  return (
    <FlexContainer>
      <FlexContainer className='border md:w-4/5 gap-4 w-full p-2 justify-between rounded'>
        <FlexContainer
          itemCenter={false}
          direction='col'
          className='items-start gap-1'
        >
          <Text level='h4' className='heading-4'>
            Hello there!
          </Text>
          <Text level='p' className='paragraph text-greyDark'>
            Please Login to generate your Certificate
          </Text>
        </FlexContainer>
        <FlexContainer
          justifyCenter={false}
          itemCenter={false}
          className='justify-start items-start gap-3'
        ></FlexContainer>

        <FlexContainer>
          <LoginWithGoogleButton text='Login to Generate' />
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
};

export default WebinarHeroContainer;

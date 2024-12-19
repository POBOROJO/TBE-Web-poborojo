import { Text, Image, FlexContainer } from '@/components';
import { PortfolioTemplateProps } from '@/interfaces';
import { useUser } from '@/hooks';

const PortfolioTemplate = ({
  imageUrl,
  title,
  description,
  developerName,
}: PortfolioTemplateProps) => {
  const { isAuth } = useUser();

  return (
    <FlexContainer className='w-full md:w-[48%] lg:w-[31%] border-2 border-gray-300 rounded-xl gap-2'>
      <Image
        alt={title}
        src={imageUrl}
        className='w-full aspect-[5/2] rounded-t-xl'
      />
      <FlexContainer
        direction='col'
        itemCenter={false}
        fullWidth={true}
        className='p-2'
      >
        <Text level='h2' className='heading-4 text-white'>
          {title}
        </Text>
        <Text level='p' className='paragraph text-white'>
          {description}
        </Text>
        <FlexContainer justifyCenter={false} className='gap-1 my-2'>
          <button
            disabled={!isAuth}
            className={`bg-transparent px-2 py-[2px] font-semibold border-[3px] rounded-1 ${
              !isAuth && 'cursor-not-allowed'
            }`}
          >
            {isAuth ? 'Delpoy' : 'Login'}
          </button>
          <button className='bg-transparent px-2 py-[2px] font-semibold border-[3px] rounded-1'>
            Preview
          </button>
        </FlexContainer>
        <Text level='p' className='pre-text text-white'>
          Template by {developerName}
        </Text>
      </FlexContainer>
    </FlexContainer>
  );
};

export default PortfolioTemplate;

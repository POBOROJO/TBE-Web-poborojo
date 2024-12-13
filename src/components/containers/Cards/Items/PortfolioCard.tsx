import { Image, Text, FlexContainer } from '@/components';
import { PortfolioCardProps } from '@/interfaces';

const PortfolioCard = ({
  index,
  imageUrl,
  title,
  description,
}: PortfolioCardProps) => {
  return (
    <FlexContainer
      direction='col'
      itemCenter={false}
      className='w-full md:w-[48%] lg:w-[31%] border-2 border-gray-300 p-3 gap-1 rounded-1'
    >
      <Text level='h1' className='text-5xl font-extrabold'>
        {index}.
      </Text>

      <div className='w-[40%]'>
        <Image
          alt={title}
          src={imageUrl}
          className='rounded-1 aspect-square my-1'
        />
      </div>

      <Text level='h2' className='text-3xl font-bold'>
        {title}
      </Text>
      <Text level='p' className='text-xl '>
        {description}
      </Text>
    </FlexContainer>
  );
};

export default PortfolioCard;

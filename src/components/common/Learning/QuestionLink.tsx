import Link from 'next/link';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { FaRegCircle } from 'react-icons/fa';
import { QuestionLinkProps } from '@/interfaces';

const QuestionLink = ({
  href,
  questionId,
  title,
  question,
  isCompleted,
  currentQuestionId,
  handleQuestionClick,
}: QuestionLinkProps) => {
  const additionalClasses =
    currentQuestionId === questionId
      ? isCompleted
        ? 'text-dark font-semibold bg-green-200'
        : 'text-dark font-semibold bg-gray-200'
      : '';

  const iconColor = isCompleted ? 'text-green-500' : 'text-greyDark';

  return (
    <Link
      href={href}
      key={questionId}
      onClick={() => handleQuestionClick(question)}
      className={`flex items-center gap-1 w-full p-2 rounded text-left pre-title hover:bg-gray-200 hover:text-contentLight ${additionalClasses}`}
    >
      {isCompleted ? (
        <IoIosCheckmarkCircle size={24} className={iconColor} />
      ) : (
        <FaRegCircle size={24} className={iconColor} />
      )}
      {title}
    </Link>
  );
};

export default QuestionLink;

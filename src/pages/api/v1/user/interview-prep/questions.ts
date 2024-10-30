import { apiStatusCodes } from '@/constant';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendAPIResponse } from '@/utils';
import { connectDB } from '@/middlewares';
import { getAllQuestionsByUser } from '@/database';
import { GetAllQuestionsRequestProps } from '@/interfaces';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectDB();
    const { method } = req;

    switch (method) {
      case 'GET':
        return handleGetAllQuestions(req, res);
      default:
        return res.status(apiStatusCodes.BAD_REQUEST).json(
          sendAPIResponse({
            status: false,
            message: `Method ${req.method} Not Allowed`,
          })
        );
    }
  } catch (error) {
    return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
      sendAPIResponse({
        status: false,
        message: 'Something went wrong',
        error,
      })
    );
  }
};

const handleGetAllQuestions = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { userId } = req.query as unknown as GetAllQuestionsRequestProps;

  try {
    const { data, error } = await getAllQuestionsByUser(userId);

    if (error || !data) {
      return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
        sendAPIResponse({
          status: false,
          message: 'Failed to retrieve questions',
        })
      );
    }

    return res.status(apiStatusCodes.OKAY).json(
      sendAPIResponse({
        status: true,
        data,
        message: 'Questions retrieved successfully',
      })
    );
  } catch (error) {
    return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
      sendAPIResponse({
        status: false,
        message: 'Failed to retrieve questions',
        error,
      })
    );
  }
};

export default handler;

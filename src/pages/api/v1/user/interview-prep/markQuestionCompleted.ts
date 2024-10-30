import { apiStatusCodes } from '@/constant';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendAPIResponse } from '@/utils';
import { connectDB } from '@/middlewares';
import { markQuestionCompletedByUser } from '@/database';
import { MarkQuestionCompletedRequestProps } from '@/interfaces';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectDB();

    const { method } = req;

    switch (method) {
      case 'PATCH':
        return handleMarkQuestionCompleted(req, res);
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
        message: `Something went wrong`,
        error,
      })
    );
  }
};

const handleMarkQuestionCompleted = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { userId, sheetId, questionId, isCompleted } =
    req.body as MarkQuestionCompletedRequestProps;

  try {
    const { data, error } = await markQuestionCompletedByUser(
      userId,
      sheetId,
      questionId,
      isCompleted
    );

    if (error) {
      return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
        sendAPIResponse({
          status: false,
          message: 'Failed to update question status',
        })
      );
    }

    return res.status(apiStatusCodes.OKAY).json(
      sendAPIResponse({
        status: true,
        data,
        message: 'Question status updated successfully',
      })
    );
  } catch (error) {
    return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
      sendAPIResponse({
        status: false,
        message: 'Failed to update question status',
        error,
      })
    );
  }
};

export default handler;

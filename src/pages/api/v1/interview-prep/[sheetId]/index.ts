import { NextApiRequest, NextApiResponse } from 'next';
import { apiStatusCodes } from '@/constant';
import { sendAPIResponse } from '@/utils';
import { connectDB } from '@/middlewares';
import { getAllQuestionsBySheetId } from '@/database';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const { method, query } = req;
  const { sheetId } = query as { sheetId: string };

  switch (method) {
    case 'GET':
      return handleGetAllQuestions(req, res, sheetId);
    default:
      return res.status(apiStatusCodes.BAD_REQUEST).json(
        sendAPIResponse({
          status: false,
          message: `Method ${req.method} Not Allowed`,
        })
      );
  }
};

const handleGetAllQuestions = async (
  req: NextApiRequest,
  res: NextApiResponse,
  sheetId: string
) => {
  try {
    const { data, error } = await getAllQuestionsBySheetId(sheetId);

    if (error) {
      return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
        sendAPIResponse({
          status: false,
          message: 'Failed while fetching questions from the interview sheet',
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
        message: 'Failed while fetching questions from the interview sheet',
      })
    );
  }
};

export default handler;

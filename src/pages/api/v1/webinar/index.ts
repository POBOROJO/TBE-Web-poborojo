import { NextApiRequest, NextApiResponse } from 'next';
import { apiStatusCodes } from '@/constant';
import { sendAPIResponse } from '@/utils';
import { connectDB } from '@/middlewares';
import {
  getAllWebinarsFromDB,
  updateEnrolledUsersInWebinarDB,
} from '@/database';
import { UpdateEnrolledUsersRequestPayloadProps } from '@/interfaces';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const { method } = req;

  switch (method) {
    case 'GET':
      return handleGetAllWebinars(req, res);
    case 'PATCH':
      return handleUpdateEnrolledUsers(req, res);
    default:
      return res.status(apiStatusCodes.BAD_REQUEST).json(
        sendAPIResponse({
          status: false,
          message: `Method ${req.method} Not Allowed`,
        })
      );
  }
};

const handleGetAllWebinars = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { data: allWebinars, error: allWebinarsError } =
      await getAllWebinarsFromDB();

    if (allWebinarsError || !allWebinars) {
      return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
        sendAPIResponse({
          status: false,
          message: 'Failed while fetching webinars',
          error: allWebinarsError,
        })
      );
    }

    return res.status(apiStatusCodes.OKAY).json(
      sendAPIResponse({
        status: true,
        data: allWebinars,
      })
    );
  } catch (error) {
    return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
      sendAPIResponse({
        status: false,
        message: 'Failed while fetching webinars',
        error,
      })
    );
  }
};

const handleUpdateEnrolledUsers = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { webinarId, users } =
      req.body as UpdateEnrolledUsersRequestPayloadProps;

    if (!webinarId || !Array.isArray(users)) {
      return res.status(apiStatusCodes.BAD_REQUEST).json(
        sendAPIResponse({
          status: false,
          message:
            'Invalid input data. webinarId and users array are required.',
        })
      );
    }

    const { data, error } = await updateEnrolledUsersInWebinarDB(
      webinarId,
      users
    );

    if (error) {
      return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
        sendAPIResponse({
          status: false,
          message: 'Failed while updating enrolled users',
          error,
        })
      );
    }

    return res.status(apiStatusCodes.OKAY).json(
      sendAPIResponse({
        status: true,
        message: 'Enrolled users updated successfully',
        data,
      })
    );
  } catch (error) {
    return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
      sendAPIResponse({
        status: false,
        message: 'Failed while updating enrolled users',
        error,
      })
    );
  }
};

export default handler;

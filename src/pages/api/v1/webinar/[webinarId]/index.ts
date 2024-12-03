import { NextApiRequest, NextApiResponse } from 'next';
import { apiStatusCodes } from '@/constant';
import { sendAPIResponse } from '@/utils';
import { connectDB } from '@/middlewares';
import {
  updateEnrolledUsersInWebinarDB,
  checkUserRegistrationInWebinarDB,
  getWebinarDetailsFromDB,
} from '@/database';
import { UpdateEnrolledUsersRequestPayloadProps } from '@/interfaces';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const { method } = req;

  switch (method) {
    case 'GET':
      if (req.query.userId) {
        return handleCheckUserRegistration(req, res);
      }

      return handleGetWebinarDetails(req, res);

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
const handleGetWebinarDetails = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { webinarId } = req.query;

    if (!webinarId) {
      return res.status(apiStatusCodes.BAD_REQUEST).json(
        sendAPIResponse({
          status: false,
          message: 'webinarId is required.',
        })
      );
    }

    const { data, error } = await getWebinarDetailsFromDB(webinarId as string);

    if (error || !data) {
      return res.status(apiStatusCodes.NOT_FOUND).json(
        sendAPIResponse({
          status: false,
          message: 'Webinar not found',
          error,
        })
      );
    }

    return res.status(apiStatusCodes.OKAY).json(
      sendAPIResponse({
        status: true,
        data,
      })
    );
  } catch (error) {
    return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
      sendAPIResponse({
        status: false,
        message: 'Failed to get webinar details',
        error,
      })
    );
  }
};

const handleCheckUserRegistration = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { webinarId, email } = req.query;

    if (!webinarId || !email) {
      return res.status(apiStatusCodes.BAD_REQUEST).json(
        sendAPIResponse({
          status: false,
          message: 'webinarId and email are required.',
        })
      );
    }

    const { data: isRegistered, error } =
      await checkUserRegistrationInWebinarDB(
        webinarId as string,
        email as string
      );

    if (error) {
      return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
        sendAPIResponse({
          status: false,
          message: 'Failed to check user registration',
          error,
        })
      );
    }

    return res.status(apiStatusCodes.OKAY).json(
      sendAPIResponse({
        status: true,
        message: isRegistered
          ? 'User is registered for the webinar.'
          : 'User is not registered for the webinar.',
        data: { isRegistered },
      })
    );
  } catch (error) {
    return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
      sendAPIResponse({
        status: false,
        message: 'Failed to check user registration',
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
    const { webinarId } = req.query;
    const { users } = req.body as UpdateEnrolledUsersRequestPayloadProps;

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
      webinarId as string,
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

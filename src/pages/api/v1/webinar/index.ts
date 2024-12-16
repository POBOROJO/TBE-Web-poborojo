import { NextApiRequest, NextApiResponse } from 'next';
import { apiStatusCodes } from '@/constant';
import { sendAPIResponse } from '@/utils';
import { connectDB } from '@/middlewares';
import {
  addAWebinarToDB,
  deleteAWebinarFromDB,
  getAllWebinarsFromDB,
  getWebinarBySlugFromDB,
} from '@/database';
import { AddWebinarRequestPayloadProps } from '@/interfaces';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const { method } = req;

  switch (method) {
    case 'POST':
      return handleAddAWebinar(req, res);
    case 'GET':
      return handleGetAllWebinars(req, res);
    case 'DELETE':
      return handleDeleteWebinar(req, res);
    default:
      return res.status(apiStatusCodes.BAD_REQUEST).json(
        sendAPIResponse({
          status: false,
          message: `Method ${method} Not Allowed`,
        })
      );
  }
};

const handleAddAWebinar = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const webinarPayload = req.body as AddWebinarRequestPayloadProps;

    const { error: webinarAlreadyExist } = await getWebinarBySlugFromDB(
      webinarPayload.slug
    );

    if (!webinarAlreadyExist) {
      return res.status(apiStatusCodes.BAD_REQUEST).json(
        sendAPIResponse({
          status: false,
          message: 'Webinar already exists',
        })
      );
    }

    const { data, error } = await addAWebinarToDB(webinarPayload);

    if (error)
      return res.status(apiStatusCodes.NOT_FOUND).json(
        sendAPIResponse({
          status: false,
          message: 'Course not added',
          error,
        })
      );

    return res.status(apiStatusCodes.OKAY).json(
      sendAPIResponse({
        status: true,
        message: 'Webinar added successfully',
        data,
      })
    );
  } catch (error) {
    return res.status(apiStatusCodes.NOT_FOUND).json(
      sendAPIResponse({
        status: false,
        message: 'Failed while adding webinar',
        error,
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
      return res.status(apiStatusCodes.NOT_FOUND).json(
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
    return res.status(apiStatusCodes.NOT_FOUND).json(
      sendAPIResponse({
        status: false,
        message: 'Failed while fetching webinars',
        error,
      })
    );
  }
};

const handleDeleteWebinar = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { slug } = req.query;

    const { error: webinarError } = await deleteAWebinarFromDB(slug as string);

    if (webinarError) {
      return res.status(apiStatusCodes.NOT_FOUND).json(
        sendAPIResponse({
          status: false,
          message: 'Failed while fetching webinar',
          error: webinarError,
        })
      );
    }

    return res.status(apiStatusCodes.OKAY).json(
      sendAPIResponse({
        status: true,
        message: 'Webinar deleted successfully',
      })
    );
  } catch (error) {
    return res.status(apiStatusCodes.NOT_FOUND).json(
      sendAPIResponse({
        status: false,
        message: 'Failed while deleting webinar',
        error,
      })
    );
  }
};

export default handler;

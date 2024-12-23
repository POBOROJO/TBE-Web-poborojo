import { apiStatusCodes } from '@/constant';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendAPIResponse } from '@/utils';
import { connectDB } from '@/middlewares';
import { addACertificateToDB, checkCertificateExist, getUserCertificates } from '@/database';
import { AddCertificateRequestPayloadProps } from '@/interfaces';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const { method, query } = req;
  const { userId } = query as { userId: string };

  switch (method) {
    case 'POST':
      return handleAddACertificate(req, res);
    case 'GET':
      return handleGetACertificate(req, res, userId);
    default:
      return res.status(apiStatusCodes.BAD_REQUEST).json(
        sendAPIResponse({
          status: false,
          message: `Method ${req.method} Not Allowed`,
        })
      );
  }
};

const handleAddACertificate = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const certificatePayload = req.body as AddCertificateRequestPayloadProps;

    const { data: existingCertificate } = await checkCertificateExist(
      certificatePayload.type,
      certificatePayload.userId
    );

    if (existingCertificate) {
      return res.status(apiStatusCodes.OKAY).json(
        sendAPIResponse({
          status: false,
          message: 'Certificate already exists',
          data: existingCertificate,
        })
      );
    }

    const { data: addedCertificate, error: certificateError } =
      await addACertificateToDB(certificatePayload);

    if (certificateError) {
      return res.status(apiStatusCodes.BAD_REQUEST).json(
        sendAPIResponse({
          status: false,
          message: certificateError,
        })
      );
    }

    return res.status(apiStatusCodes.OKAY).json(
      sendAPIResponse({
        status: true,
        data: addedCertificate,
        message: 'Certificate added successfully',
      })
    );
  } catch (error) {
    return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
      sendAPIResponse({
        status: false,
        message: 'Failed while adding Certificate',
        error,
      })
    );
  }
};

const handleGetACertificate = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) => {
  try {
    if (!userId) {
      return res.status(apiStatusCodes.BAD_REQUEST).json(
        sendAPIResponse({
          status: false,
          message: 'User ID is required',
        })
      );
    }

    const { data:certificates, error:certificateError } = await getUserCertificates(userId);

    if (certificateError) {
      return res.status(apiStatusCodes.BAD_REQUEST).json(
        sendAPIResponse({
          status: false,
          message: certificateError,
        })
      );
    }

    return res.status(apiStatusCodes.OKAY).json(
      sendAPIResponse({
        status: true,
        data: certificates,
      })
    );
  } catch (error) {
    return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
      sendAPIResponse({
        status: false,
        message: 'Failed while fetching Certificate',
        error,
      })
    );
  }
};

export default handler;

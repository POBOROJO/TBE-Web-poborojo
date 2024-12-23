import {
  AddCertificateRequestPayloadProps,
  DatabaseQueryResponseType,
} from '@/interfaces';
import { Certificate } from '@/database';

const addACertificateToDB = async (
  certificatePayload: AddCertificateRequestPayloadProps
): Promise<DatabaseQueryResponseType> => {
  try {
    const certificate = new Certificate(certificatePayload);
    await certificate.save();
    return { data: certificate };
  } catch (error) {
    return { error: 'Failed while adding certificate' };
  }
};

const checkCertificateExist = async (type: string, userId: string) => {
  try {
    const certificate = await Certificate.findOne({ type, userId });

    if (certificate) {
      return { data: certificate };
    } else {
      return { error: 'Certificate does not exist' };
    }
  } catch (error) {
    return { error: 'Failed while checking certificate existence' };
  }
};

export { addACertificateToDB, checkCertificateExist };

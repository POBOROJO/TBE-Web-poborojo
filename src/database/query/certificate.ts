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

const getUserCertificates = async (userId: string) => {
  try {
    const certificates = await Certificate.find({userId});

    if (certificates.length > 0) {
      return { data: certificates };
    } else {
      return { error: 'No certificates found' };
    }
  } catch (error) {
    return { error: 'Failed while fetching certificates' };
  }
};

export { addACertificateToDB, checkCertificateExist, getUserCertificates };

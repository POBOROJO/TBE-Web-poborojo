import { apiStatusCodes } from '@/constant';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendAPIResponse } from '@/utils';
import { connectDB } from '@/middlewares';
import { addACertificateToDB, checkCertificateExist } from '@/database';
import { AddCertificateRequestPayloadProps } from '@/interfaces';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const { method, query } = req;
  const { userId } = query as { userId: string };

  switch (method) {
    case 'POST':
      return handleAddACertificate(req, res);
    // case 'GET':
    //   return handleGetACertificate(req, res, userId);
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

// const handleGetACertificate = async (
//   req: NextApiRequest,
//   res: NextApiResponse,
//   userId: string
// ) => {
//   try {
//     let allCoursesResponse: BaseShikshaCourseResponseProps[] = [];

//     // Fetch all courses
//     const { data: allCourses, error: allCoursesError } =
//       await getAllCourseFromDB();

//     if (allCoursesError || !allCourses) {
//       return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
//         sendAPIResponse({
//           status: false,
//           message: 'Failed while fetching courses',
//           error: allCoursesError,
//         })
//       );
//     }

//     // Create a map of all courses by their ID
//     const courseMap = new Map<string, BaseShikshaCourseResponseProps>(
//       allCourses.map((course: BaseShikshaCourseResponseProps) => {
//         const courseDoc = course as unknown as mongoose.Document &
//           BaseShikshaCourseResponseProps;
//         return [courseDoc._id.toString(), { ...courseDoc.toObject() }];
//       })
//     );

//     // If the user is logged in, fetch enrolled courses and mark them in the map
//     if (userId) {
//       const { data: enrolledCourses, error: enrolledCoursesError } =
//         await getAllEnrolledCoursesFromDB(userId);

//       if (enrolledCoursesError) {
//         return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
//           sendAPIResponse({
//             status: false,
//             message: 'Failed while fetching enrolled courses',
//             error: enrolledCoursesError,
//           })
//         );
//       }

//       // Update the map to mark enrolled courses
//       enrolledCourses.forEach(
//         (enrolledCourse: BaseShikshaCourseResponseProps) => {
//           const courseId = enrolledCourse._id.toString();
//           if (courseMap.has(courseId)) {
//             courseMap.set(courseId, {
//               ...courseMap.get(courseId),
//               isEnrolled: true,
//             });
//           }
//         }
//       );
//     }

//     // Convert the map back to an array to prepare the final response
//     allCoursesResponse = Array.from(courseMap.values());

//     return res.status(apiStatusCodes.OKAY).json(
//       sendAPIResponse({
//         status: true,
//         data: allCoursesResponse,
//       })
//     );
//   } catch (error) {
//     return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
//       sendAPIResponse({
//         status: false,
//         message: 'Failed while fetching courses',
//         error,
//       })
//     );
//   }
// };

export default handler;

import { Webinar } from '@/database';

const getAllWebinarsFromDB = async () => {
  try {
    const webinars = await Webinar.find();
    return { data: webinars, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const updateEnrolledUsersInWebinarDB = async (
  webinarId: string,
  users: Array<{ name: string; email: string }>
) => {
  try {
    const updatedWebinar = await Webinar.findByIdAndUpdate(
      webinarId,
      { $push: { enrolledUsersList: { $each: users } } },
      { new: true }
    );

    if (!updatedWebinar) {
      return { data: null, error: 'Webinar not found' };
    }

    return { data: updatedWebinar, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export { getAllWebinarsFromDB, updateEnrolledUsersInWebinarDB };
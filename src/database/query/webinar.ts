import { Webinar } from '@/database';

const getAllWebinarsFromDB = async () => {
  try {
    const webinars = await Webinar.find();
    return { data: webinars, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export { getAllWebinarsFromDB };

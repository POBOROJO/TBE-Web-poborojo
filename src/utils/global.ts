import { envConfig, getSEOMeta, routes } from '@/constant';
import {
  BaseShikshaCourseResponseProps,
  BaseInterviewSheetResponseProps,
  ProjectPickedPageProps,
} from '@/interfaces';
import {
  getSelectedCourseChapterMeta,
  getSelectedSheetQuestionMeta,
  getSelectedProjectChapterMeta,
  isUserAuthenticated,
} from '.';

const getPreFetchProps = async ({ resolvedUrl }: any) => {
  let slug = '/';

  if (resolvedUrl) {
    slug = resolvedUrl;
  }

  const seoMeta = getSEOMeta(slug);

  const redirect = !seoMeta && {
    destination: '/404',
  };

  return {
    props: { slug, seoMeta },
    redirect,
  };
};

const getProjectPageProps = async (context: any) => {
  const { req, query } = context;
  const { projectSlug, projectId, sectionId, chapterId } = query;

  let slug = '/';

  if (projectSlug) {
    slug = `/projects/${projectSlug}`;
  }

  const seoMeta = getSEOMeta(slug);

  if (projectId && seoMeta) {
    try {
      // Authenticate user
      const user = await isUserAuthenticated(req);

      // Fetch project data using the new route builder function
      const { status, data } = await fetchAPIData(
        routes.api.projectByIdWithUser(projectId, user?.id)
      );

      // If the project data is not found, redirect to 404
      if (!status) {
        return {
          redirect: {
            destination: routes[404],
          },
          props: { slug },
        };
      }

      const project: ProjectPickedPageProps = data;
      let { meta } = project;
      let currentChapterId = '';

      // If section and chapter IDs are provided, get specific chapter metadata
      if (sectionId && chapterId) {
        currentChapterId = chapterId;

        const selectedChapterMeta = getSelectedProjectChapterMeta(
          project,
          sectionId,
          chapterId
        );

        if (selectedChapterMeta) {
          meta = selectedChapterMeta;
        }
      }

      return {
        props: {
          slug,
          seoMeta,
          project,
          meta,
          currentChapterId,
        },
      };
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  }

  // Redirect to 404 if projectId is missing or seoMeta is not set
  return {
    redirect: {
      destination: routes[404],
    },
    props: { slug },
  };
};

const getCoursePageProps = async (context: any) => {
  const { req, query } = context;
  const { courseSlug, courseId, chapterId } = query;

  let slug = '/';

  if (courseSlug) {
    slug = '/shiksha/' + courseSlug;
  }

  const seoMeta = getSEOMeta(slug);

  if (courseId && seoMeta) {
    try {
      const user = await isUserAuthenticated(req);

      const { status, data } = await fetchAPIData(
        routes.api.courseByIdWithUser(courseId, user?.id)
      );

      // If the project data is not found, return the message
      if (!status) {
        return {
          redirect: {
            destination: '/404',
          },
          props: { slug },
        };
      }

      const course: BaseShikshaCourseResponseProps = data;
      let { meta } = course;
      let currentChapterId = '';

      if (chapterId) {
        currentChapterId = chapterId;

        const selectedChapterMeta = getSelectedCourseChapterMeta(
          course,
          chapterId
        );

        if (selectedChapterMeta) meta = selectedChapterMeta;
      }

      return {
        props: {
          slug,
          seoMeta,
          course,
          meta,
          currentChapterId,
        },
      };
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  }

  return {
    redirect: {
      destination: '/404',
    },
    props: { slug },
  };
};

const getSheetPageProps = async (context: any) => {
  const { req, query } = context;
  const { sheetSlug, sheetId, questionId } = query;

  let slug = '/';

  if (sheetSlug) {
    slug = '/interview-prep/' + sheetSlug;
  }

  const seoMeta = getSEOMeta(slug);

  if (sheetId && seoMeta) {
    try {
      const user = await isUserAuthenticated(req);

      // Fetch sheet data with user ID if available
      const { status, data } = await fetchAPIData(
        routes.api.sheetByIdWithUser(sheetId as string, user?.id)
      );

      // Redirect if the sheet data is not found
      if (!status) {
        return {
          redirect: {
            destination: '/404',
          },
          props: { slug },
        };
      }

      const sheet: BaseInterviewSheetResponseProps = data;
      let { meta } = sheet;
      let currentQuestionId = '';

      // If a specific question is selected, get its metadata
      if (questionId) {
        currentQuestionId = questionId as string;

        const selectedQuestionMeta = getSelectedSheetQuestionMeta(
          sheet,
          currentQuestionId
        );

        if (selectedQuestionMeta) meta = selectedQuestionMeta;
      }

      return {
        props: {
          slug,
          seoMeta,
          sheet,
          meta,
          currentQuestionId,
        },
      };
    } catch (error) {
      console.error('Error fetching sheet data:', error);
    }
  }

  return {
    redirect: {
      destination: '/404',
    },
    props: { slug },
  };
};

const fetchAPIData = async (url: string) => {
  const response = await fetch(`${envConfig.BASE_API_URL}/${url}`);

  return await response.json();
};

const getWebinarPageProps = async (context: any) => {
  const { query } = context;
  const { webinarSlug } = query;

  let slug = '/';

  if (webinarSlug) {
    slug = '/webinar/' + webinarSlug;
  }

  const { status, data: responseObj } = await fetchAPIData(
    routes.api.webinarById(webinarSlug)
  );

  if (!status) {
    return {
      redirect: {
        destination: '/404',
      },
      props: { slug },
    };
  }

  const { _id, host, dateAndTime } = responseObj;

  return {
    props: {
      webinarId: _id,
      hostName: host.name,
      hostImageUrl: host.imageUrl,
      hostRole: host.role,
      dateAndTime,
      //update title, description, bannerImageUrl with API
      title: 'Is Programming for you',
      description:
        'Understand why everybody wants to be in Tech and should learn Tech or not.',
      bannerImageUrl:
        'https://wallpapers.com/images/hd/coding-background-9izlympnd0ovmpli.jpg',
    },
  };
};

export {
  getPreFetchProps,
  getProjectPageProps,
  getCoursePageProps,
  getSheetPageProps,
  getWebinarPageProps,
};

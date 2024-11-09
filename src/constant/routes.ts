import { GenerateSectionPathProps } from '@/interfaces';

const routes = {
  home: '/',
  roadmaps: '/roadmaps',
  projects: '/projects',
  register: '/register',
  projectsExplore: '/projects/explore',
  allProjects: {
    pharmashiftI: '/projects/pharmasift-i',
    pharmashiftII: '/projects/pharmasift-ii',
  },
  shiksha: '/shiksha',
  shikshaExplore: '/shiksha/explore',
  allCourses: {
    logicBuildingForEveryone: '/shiksha/logic-building-for-everyone',
    basicsOfProgrammingWithJS: '/shiksha/basics-of-programming-with-js',
  },
  interviewPrep: '/interview-prep',
  interviewPrepExplore: '/interview-prep/explore',
  allInterviewSheets: {
    javascriptInterviewSheet: '/interview-prep/js-interview-questions',
    reactInterviewSheet: '/interview-prep/react-interview-questions',
    nodeInterviewSheet: '/interview-prep/node-interview-questions',
    dbInterviewSheet: '/interview-prep/db-interview-questions',
  },
  workshops: '/workshops',
  os: '/os',
  contactUs: '/contact',
  internals: {
    landing: {
      products: 'products',
    },
  },
  404: '/404',
  api: {
    base: '/api/v1',
    projects: '/projects',
    project: (project: string) => `/projects/${project}`,
    shiksha: '/shiksha',
    myCourses: '/user/shiksha',
    myProjects: '/user/projects',
    mySheets: '/user/interview-prep',
    interviewPrep: '/interview-prep',
    enrollCourse: '/user/shiksha/enroll',
    enrollProject: '/user/projects/enroll',
    enrollSheet: '/user/interview-prep/enroll',
    markCourseChapterAsCompleted: '/user/shiksha/course',
    markProjectChapterAsCompleted: '/user/projects/project',
    markSheetQuestionAsCompleted: '/user/interview-prep/sheet',
    courseById: (course: string) => `/shiksha/${course}`,
    courseByIdWithUser: (course: string, userId?: string) => {
      let url = `/shiksha/${course}`;
      if (userId) {
        url += `?userId=${userId}`;
      }
      return url;
    },
    sheetByIdWithUser: (sheet: string, userId?: string) => {
      let url = `/interview-prep/${sheet}`;
      if (userId) {
        url += `?userId=${userId}`;
      }
      return url;
    },
    projectById: (project: string) => `/projects/${project}`,
    projectByIdWithUser: (project: string, userId?: string) => {
      let url = `/projects/${project}`;
      if (userId) {
        url += `?userId=${userId}`;
      }
      return url;
    },
  },
};

const generateSectionPath = ({
  basePath,
  sectionID,
}: GenerateSectionPathProps) => {
  return basePath + '#' + sectionID;
};

export { routes, generateSectionPath };

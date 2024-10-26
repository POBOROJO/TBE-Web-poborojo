const databaseModels = {
  PROJECT: 'Project',
  USER: 'User',
  COURSE: 'Course',
  COURSE_SECTION: 'CourseSection',
  COURSE_CHAPTER: 'CourseChapter',
  USER_COURSE: 'UserCourse',
  QUESTION: 'Question',
  SHEET: 'Sheet',
};

const modelSelectParams = {
  coursePreview: '_id name slug coverImageURL description liveOn',
};

export { databaseModels, modelSelectParams };

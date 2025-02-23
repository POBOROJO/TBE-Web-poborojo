import { Document, Schema } from 'mongoose';
import {
  DifficultyType,
  QuestionFrequencyType,
  RoadmapsType,
  SkillsType,
} from '.';

export interface UserModel {
  name: string;
  email: string;
  image?: string;
  provider: string;
  providerAccountId?: string;
}

export interface ProjectChapter {
  isCompleted?: boolean;
  chapterId: string;
  chapterName: string;
  content: string;
  isOptional?: boolean;
  toObject: any;
}

export interface ProjectSection {
  sectionId: string;
  sectionName: string;
  chapters: ProjectChapter[];
  toObject: any;
}

export interface ProjectDocumentModel extends Document {
  name: string;
  meta: string;
  slug: string;
  description: string;
  coverImageURL: string;
  sections: ProjectSection[];
  requiredSkills: SkillsType[];
  roadmap: RoadmapsType;
  difficultyLevel: DifficultyType;
  isActive: boolean;
}

export interface UserProjectModel extends Document {
  userId: typeof Schema.Types.ObjectId;
  projectId: typeof Schema.Types.ObjectId;
  sections: UserProjectSectionModel[];
}

export interface UserProjectSectionModel {
  sectionId: string;
  chapters: UserProjectChapterModel[];
}

export interface UserProjectChapterModel {
  chapterId: string;
  isCompleted?: boolean;
}

export interface CourseModel extends Document {
  name: string;
  meta: string;
  slug: string;
  description: string;
  coverImageURL: string;
  liveOn: Date;
  chapters: CourseChapterModel[];
  roadmap: RoadmapsType;
  difficultyLevel: DifficultyType;
}

export interface InterviewSheetModel extends Document {
  name: string;
  meta: string;
  slug: string;
  description: string;
  coverImageURL: string;
  liveOn: Date;
  questions: InterviewSheetQuestionModel[];
  roadmap: RoadmapsType;
}

export interface InterviewSheetQuestionModel {
  _id: typeof Schema.Types.ObjectId;
  title: string;
  question: string;
  answer: string;
  frequency: QuestionFrequencyType;
  toObject: () => UserCourseModel;
}

export interface UserSheetModel extends Document {
  userId: typeof Schema.Types.ObjectId;
  sheetId: typeof Schema.Types.ObjectId;
  sheet: InterviewSheetModel;
  questions: UserSheetQuestionModel[];
}

export interface UserSheetQuestionModel {
  questionId: typeof Schema.Types.ObjectId;
  isCompleted?: boolean;
}

export interface CourseChapterModel {
  _id: typeof Schema.Types.ObjectId;
  name: string;
  content: string;
  isOptional?: boolean;
  toObject: () => UserCourseModel;
}

export interface UserCourseModel {
  userId: typeof Schema.Types.ObjectId;
  courseId: typeof Schema.Types.ObjectId;
  course: CourseModel;
  chapters: UserCourseChapterModel[];
}

export interface UserCourseChapterModel {
  chapterId: string;
  isCompleted?: boolean;
}

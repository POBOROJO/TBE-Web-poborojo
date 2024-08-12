import { Document, Schema } from 'mongoose';
import { DifficultyType, RoadmapsType, SkillsType } from '.';

export interface UserModel {
  userId: string;
  name: string;
  email: string;
  username: string;
}

export interface ProjectChapter {
  chapterId: string;
  chapterName: string;
  content: string;
  isOptional?: boolean;
}

export interface ProjectSection {
  sectionId: string;
  sectionName: string;
  chapters: ProjectChapter[];
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
}

export interface UserCourseChapterModel {
  userId: typeof Schema.Types.ObjectId;
  courseId: typeof Schema.Types.ObjectId;
  chapterId: typeof Schema.Types.ObjectId;
  isCompleted?: boolean;
}
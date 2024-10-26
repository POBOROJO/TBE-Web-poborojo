import { Schema, model, models } from 'mongoose';
import { databaseModels } from '@/constant';

const UserQuestionSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: databaseModels.QUESTION,
    required: [true, 'Question id is required'],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    dafault: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserSheetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: databaseModels.USER,
      required: [true, 'User ID is required'],
      index: true,
    },
    sheetId: {
      type: Schema.Types.ObjectId,
      ref: databaseModels.SHEET,
      required: [true, 'Sheet ID is required'],
      index: true,
    },
    questions: [UserQuestionSchema],
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.id;
        return ret;
      },
    },
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.id;
        return ret;
      },
    },
  }
);

UserSheetSchema.virtual('sheet', {
  ref: databaseModels.SHEET,
  localField: 'sheetId',
  foreignField: '_id',
  justOne: true,
});

const UserSheet = models?.UserSheet || model('UserSheet', UserSheetSchema);
export default UserSheet;

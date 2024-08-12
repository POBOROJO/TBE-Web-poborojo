import { databaseModels } from '@/constant';
import { UserModel } from '@/interfaces';
import { Model, Schema, model, models } from 'mongoose';

const UserSchema: Schema<UserModel> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
  },
  { timestamps: true }
);

const User: Model<UserModel> =
  models?.User || model<UserModel>(databaseModels.USER, UserSchema);
export default User;
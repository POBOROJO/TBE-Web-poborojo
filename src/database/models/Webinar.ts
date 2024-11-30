import { Schema, model, models, Model } from 'mongoose';
import { databaseModels } from '@/constant';
import { WebinarModel } from '@/interfaces';

const WebinarSchema = new Schema<WebinarModel>(
  {
    host: {
      name: {
        type: String,
        required: [true, 'Host name is required'],
      },
      imageUrl: {
        type: String,
        required: [true, 'Host image URL is required'],
      },
      role: {
        type: String,
        required: [true, 'Host role is required'],
      },
    },
    registrationUrl: {
      type: String,
      required: [true, 'Registration URL is required'],
    },
  },
  {
    timestamps: true,
    _id: true,
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

const Webinar: Model<WebinarModel> =
  models?.Webinar || model<WebinarModel>(databaseModels.WEBINAR, WebinarSchema);
export default Webinar;

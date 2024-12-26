import { Model, Schema, model, models } from 'mongoose';
import { CertificateModel } from '@/interfaces';
import { CERTIFICATE_TYPE, databaseModels } from '@/constant';

const CertificateSchema = new Schema<CertificateModel>(
  {
    type: {
      type: String,
      enum: CERTIFICATE_TYPE,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    programId:{
      type: String,
      required: false,
    }
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

const Certificate: Model<CertificateModel> =
  models?.Certificate ||
  model<CertificateModel>(databaseModels.CERTIFICATE, CertificateSchema);

export default Certificate;

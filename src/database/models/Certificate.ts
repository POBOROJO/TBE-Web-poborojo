import { Schema, model, models, Model } from 'mongoose';
import { CertificateModel, CertificateType } from '@/interfaces';

const CertificateSchema = new Schema<CertificateModel>({
    type: {
      type: String,
      enum: Object.values(CertificateType),
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    programName: {
      type: String,
      required: true
    }
  });
  
  export const Certificate = model<CertificateModel>('Certificate', CertificateSchema);
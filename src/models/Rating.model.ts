import mongoose, { Schema, model, Document } from 'mongoose';
import { IPatient } from './Patient.model';
import { IDoctor } from './Doctor.model';

interface IRating extends Document {
  doctor: mongoose.Types.ObjectId;
  patient: mongoose.Types.ObjectId;
  rating: number;
  isActive:boolean;

}

const ratingSchema = new Schema<IRating>({
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  isActive:{type:Boolean,default:true}
},
{
  timestamps: true, // Automatically add `createdAt` and `updatedAt`
});

const Rating = model<IRating>('Rating', ratingSchema);

export { Rating, IRating };

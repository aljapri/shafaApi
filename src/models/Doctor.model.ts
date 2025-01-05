import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IMedicalFacility } from './medicalFacility.model';
import { WorkSchedule, IWorkSchedule } from './WorkSchedule.model';

interface IDoctor extends Document {
  firstName: string;
  lastName: string;
  auth: mongoose.Types.ObjectId;
  phone: string;
  photo:string
  specialization: string;
  medicalFacility: mongoose.Types.ObjectId;
  workSchedule: mongoose.Types.ObjectId;
  maxPatients: number;

  gender: string;
  aboutMe: string;
}


const doctorSchema = new Schema<IDoctor>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  auth: { type: Schema.Types.ObjectId, ref: 'Auth', required: true }, // Reference to Auth model
  phone: { type: String, required: true },
  photo: { type: String, required: true },
  gender: { 
    type: String, 
    enum: ['male', 'female'], 
    required: true 
  },
  specialization: { type: String, required: true },
  medicalFacility: { type: Schema.Types.ObjectId, ref: 'MedicalFacility', required: true },
  workSchedule: { type: Schema.Types.ObjectId, ref: 'WorkSchedule' },
  maxPatients: { type: Number, required: true },

  aboutMe: { type: String, required: true }
},
{
  timestamps: true, // Automatically add `createdAt` and `updatedAt`
});



const Doctor = model<IDoctor>('Doctor', doctorSchema);

export { Doctor, IDoctor };

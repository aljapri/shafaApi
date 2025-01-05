import mongoose, { Schema, model, Document, mongo } from 'mongoose';
import { IPatient } from './Patient.model';
import { IDoctor } from './Doctor.model';

interface IComment extends Document {
  doctor: mongoose.Types.ObjectId;
  patient: mongoose.Types.ObjectId;
  comment: string;
  isActive:boolean;
}

const commentSchema = new Schema<IComment>({
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  comment: { type: String, required: true },
  isActive:{type:Boolean,default:true}
},
{
  timestamps: true, // Automatically add `createdAt` and `updatedAt`
});

const Comment = model<IComment>('Comment', commentSchema);

export { Comment, IComment };


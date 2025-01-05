import mongoose, { Schema, model, Document } from 'mongoose';
import { IAppointment } from './Appointment.model';

export interface IAppointmentDetails extends Document {
  appointment: mongoose.Types.ObjectId ;
  diagnosis: string;
  medication: string[];
  notes?: string;

}

const appointmentDetailsSchema = new Schema<IAppointmentDetails>({
  appointment: { type: Schema.Types.ObjectId, ref: 'Appointment', required: true },
  diagnosis: { type: String, required: true },
  medication: { type: [String], required: true },
  notes: { type: String },

},
{
  timestamps: true, // Automatically add `createdAt` and `updatedAt`
});

const AppointmentDetails = model<IAppointmentDetails>('AppointmentDetails', appointmentDetailsSchema);

export { AppointmentDetails };

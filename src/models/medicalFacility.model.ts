import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMedicalFacility extends Document {
  name: string;
  phone: string;
  photo:string
  location: mongoose.Types.ObjectId; // Reference to the Location model
  medicalFacilityType: 'hospital' | 'clinic'; // Strictly type medicalFacilityType
  auth: mongoose.Types.ObjectId; // Reference to the Auth model
}

const medicalFacilitySchema: Schema<IMedicalFacility> = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    photo: { type: String, required: true },
    location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    medicalFacilityType: {
      type: String,
      enum: ['hospital', 'clinic'], // Restrict values to 'hospital' or 'clinic'
      required: true,
    },
    auth: { type: Schema.Types.ObjectId, ref: 'Auth', required: true }, // Reference to Auth model
  },
  { timestamps: true } // Automatically manage `createdAt` and `updatedAt` fields
);

// Export the MedicalFacility model
export const MedicalFacility: Model<IMedicalFacility> = mongoose.model<IMedicalFacility>(
  'MedicalFacility',
  medicalFacilitySchema
);

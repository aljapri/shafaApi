import { Schema, model, Document } from 'mongoose';

interface ISubscriptionPlan extends Document {
  name: string;
  description: string;
  durationMonths: number; // Duration in months
  price: number; // Price for the subscription plan
}

const subscriptionPlanSchema = new Schema<ISubscriptionPlan>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  durationMonths: { type: Number, required: true }, // e.g., 12 for a year, 1 for a month
  price: { type: Number, required: true },
},
{
  timestamps: true, // Automatically add `createdAt` and `updatedAt`
});

const SubscriptionPlan = model<ISubscriptionPlan>('SubscriptionPlan', subscriptionPlanSchema);

export { SubscriptionPlan, ISubscriptionPlan };

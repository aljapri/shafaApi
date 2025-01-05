// SubscriptionCreation.service.ts
import mongoose, { ClientSession } from "mongoose";
import { Subscription } from "../../models/subscription.model";
import { SubscriptionPlan } from "../../models/subscriptionPlan.model";
import HttpResponse from "../../utils/HttpResponse";

export default class SubscriptionCreationService {
  public async createSubscription(subscriptionPlanId: any,authId:mongoose.Types.ObjectId | any, session: ClientSession) {
      const subscriptionPlan = await SubscriptionPlan.findById(subscriptionPlanId);
      if (!subscriptionPlan) {
        throw HttpResponse.BadRequest("Invalid subscription plan ID.");
      }

      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + subscriptionPlan.durationMonths);

      const subscription = await Subscription.create(
        [
          {
            auth: authId, // Will update after medical facility creation
            subscriptionPlan: subscriptionPlan._id,
            startDate,
            endDate,
            status: "Active",
          },
        ],
        { session }
      );
      return subscription[0];
    
  }
}
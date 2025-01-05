import mongoose from "mongoose";
import AccountCreationBase from "../auth/AccountCreationBase.service";

import MedicalFacilityService from "./MedicalFacilityCreation.service";
import LocationCreationService from "../location/LocationCreation.service";
import SubscriptionCreationService from "../subscription/Subscription.service";
import IAccountCreation from "../../types/IAccountCreation";

export default class MedicalFacilityCreationHandler extends AccountCreationBase implements IAccountCreation {
  private locationService = new LocationCreationService();
  private subscriptionService = new SubscriptionCreationService();
  private medicalFacilityService = new MedicalFacilityService();

  public async handle(req: any): Promise<any> {
    return this.withTransaction(async (session) => {
      const body = req.body;
      
      // Step 1: Create authentication
      const auth = await this.createAuth(body.email,body.password,"medicalFacility" ,session);
      // Step 2: Create location
      const location = await this.locationService.createLocation(body.location, session);
      const medicalFacility = await this.medicalFacilityService.createMedicalFacility(
        body,
        auth._id,
        location._id,
        session
      );
      // Step 3: Create subscription
      const subscription = await this.subscriptionService.createSubscription(body.subscriptionPlanId,auth._id, session);
      // Step 4: Create medical facility
      return medicalFacility
    });
  }
}
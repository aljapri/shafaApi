import mongoose, { ClientSession } from "mongoose";
import AccountCreationBase from "../auth/AccountCreationBase.service";
import WorkScheduleCreation from "../workSchedule/WorkSchedulCreation.service";
import DoctorCreationService from "./DoctorCreation.service";

export default class DoctorCreationHandler extends AccountCreationBase {
  private readonly workScheduleService: WorkScheduleCreation;

  constructor() {
    super();
    this.workScheduleService = new WorkScheduleCreation();
  }

  /**
   * Handle doctor creation process
   */
  public async handle(req: any): Promise<any> {
    return this.withTransaction(async (session) => {
      const body = req.body;
      const medicalFacilityId = req.accountId;
      // Step 1: Create authentication record
      const auth = await this.createAuth(body.email ,body.password,"doctor" ,session);

      // Step 2: Create work schedule
      const workSchedule = await this.workScheduleService.create(body.workSchedule, session);
      // Step 3: Create doctor record
      const doctor = await new DoctorCreationService().create(body, auth._id,medicalFacilityId ,workSchedule._id, session);

      return doctor;
    });
  }
}

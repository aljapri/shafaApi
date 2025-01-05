import mongoose, { ClientSession } from "mongoose";
import { WorkSchedule, IWorkSchedule } from "../../models/WorkSchedule.model";
import HttpResponse from "../../utils/HttpResponse";

export default class WorkScheduleCreation {
  /**
   * Create a work schedule record
   */
  public async create(schedule: IWorkSchedule, session: ClientSession) {
      const workSchedule = await WorkSchedule.create([schedule], { session });
      return workSchedule[0]; // Assuming create returns an array
  }
}

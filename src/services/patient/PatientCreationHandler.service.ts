import mongoose, { ClientSession } from "mongoose";
import PatientCreationService from "./PatientCreation.service";
import AccountCreationBase from "../auth/AccountCreationBase.service";


export default class PatientCreationHandler extends AccountCreationBase {
  /**
   * Handle patient creation process
   */
  public async handle(req: any): Promise<any> {
    return this.withTransaction(async (session) => {
      // Step 1: Create authentication record
      const body = req.body;
      const auth = await this.createAuth(body.email,body.password,"patient" , session);

      // Step 2: Create patient record
      const patient = await new PatientCreationService().create(body, auth._id, session);

      return patient;
    });
  }
}

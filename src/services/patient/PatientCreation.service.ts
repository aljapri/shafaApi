import mongoose, { ClientSession } from "mongoose";
import { Patient } from "../../models/Patient.model";
import HttpResponse from "../../utils/HttpResponse";


export default class PatientCreationService {
  /**
   * Create a patient record
   */
  public async create(
    body: any,
    authId: mongoose.Types.ObjectId,
    session: ClientSession
  ) {
      const { firstName, lastName, phone, photo } = body;

      const patient = await Patient.create(
        [
          {
            firstName,
            lastName,
            phone,
            photo,
            auth:authId,
          },
        ],
        { session }
      );
      return patient[0];
  }
}

import DoctorCreationHandler from "../../services/docotr/DoctorCreationHandler.service";
import MedicalFacilityCreation from "../../services/medicalFacility/MedicalFacilityCreation.service";
import MedicalFacilityCreationHandler from "../../services/medicalFacility/MedicalFacilityCreationHandler.service";
import PatientCreation from "../../services/patient/PatientCreation.service";
import PatientCreationHandler from "../../services/patient/PatientCreationHandler.service";
import IAccountCreation from "../../types/IAccountCreation";
import IAccountFactory from "./IAccountFactory";

class AccountFactory implements IAccountFactory {
  private static instance: AccountFactory;
  
  private constructor() {}

  public static getInstance(): AccountFactory {
    if (!AccountFactory.instance) {
      AccountFactory.instance = new AccountFactory();
    }
    return AccountFactory.instance;
  }

  CreateObject(type: string): IAccountCreation | null {
    switch(type){
      case "medicalFacility": return new MedicalFacilityCreationHandler();
      case "doctor": return new DoctorCreationHandler();
      case "patient": return new PatientCreationHandler();

    }
    return null;
  }   
}
export default AccountFactory;

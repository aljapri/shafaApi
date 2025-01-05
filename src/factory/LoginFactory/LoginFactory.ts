
import DoctorLoginHandler from "../../services/docotr/DoctorLoginHandler.service";
import MedicalFacilityLoginHandler from "../../services/medicalFacility/MedicalFacilityLoginHandler.service";
import PatientLoginHandler from "../../services/patient/PatientLoginHandler.service";
import IAccountLogin from "../../types/IAccountLogin";
import ILoginFactory from "./ILoginFactory";

class LoginFactory implements ILoginFactory {
  private static instance: LoginFactory;

  private constructor() {}

  public static getInstance(): LoginFactory {
    if (!LoginFactory.instance) {
      LoginFactory.instance = new LoginFactory();
    }
    return LoginFactory.instance;
  }

  CreateObject(type: string): IAccountLogin | null {
    switch(type){
      case "medicalFacility": return new MedicalFacilityLoginHandler();
      case "doctor": return new DoctorLoginHandler();
      case "patient": return new PatientLoginHandler();
    }
    return null;
  }   
}
export default LoginFactory;

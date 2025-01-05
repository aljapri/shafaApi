import { IDoctorUpdatingCommand } from "../types/IDoctorUpdatingCommand";
import { IPatientUpdatingCommand } from "../types/IPatientUpdatingCommand";

export class PatientUpdatingCommandInvoker {
    public static async executeCommand(command: IPatientUpdatingCommand): Promise<any> {
      return await command.execute();
    }
  }
  
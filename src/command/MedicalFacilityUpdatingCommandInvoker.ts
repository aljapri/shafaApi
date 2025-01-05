import { IMedicalFacilityUpdatingCommand } from "../types/IMedicalFacilityUpdatingCommand";

export class MedicalFacilityUpdatingCommandInvoker {
    public static async executeCommand(command: IMedicalFacilityUpdatingCommand): Promise<any> {
      return await command.execute();
    }
  }
  
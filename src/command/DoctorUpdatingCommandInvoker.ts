import { IDoctorUpdatingCommand } from "../types/IDoctorUpdatingCommand";

export class DoctorUpdatingCommandInvoker {
    public static async executeCommand(command: IDoctorUpdatingCommand): Promise<any> {
      return await command.execute();
    }
  }
  
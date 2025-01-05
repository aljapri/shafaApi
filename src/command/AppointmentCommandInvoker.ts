import { IAppointmentCommand } from "../types/IAppointmentCommand";
import { IDoctorUpdatingCommand } from "../types/IDoctorUpdatingCommand";

export class AppointmentCommandInvoker {
    public static async executeCommand(command: IAppointmentCommand): Promise<any> {
      return await command.execute();
    }
  }
  
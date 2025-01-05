import { IShareUpdatingCommand } from "../types/IShareUpdatingCommand";

export class ShareUpdatingCommandInvoker {
    public static async executeCommand(command: IShareUpdatingCommand): Promise<any> {
      return await command.execute();
    }
  }
  
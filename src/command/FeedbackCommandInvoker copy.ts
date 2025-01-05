
import IFeedbackCreationCommand from "../types/IFeedbackCreationCommand";

export class FeedbackCommandInvoker {
    public static async executeCommand(command: IFeedbackCreationCommand): Promise<any> {
      return await command.execute();
    }
  }
  
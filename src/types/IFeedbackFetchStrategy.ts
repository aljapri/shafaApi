export interface IFeedbackFetchStrategy {
    fetch(req: Request): Promise<any>;
  }
  
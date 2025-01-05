export interface IAppointmentFetchStrategy {
    fetch(req: Request): Promise<any>;
  }
  
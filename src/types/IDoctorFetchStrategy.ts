export interface IDoctorFetchStrategy {
    fetch(req: Request): Promise<any>;
  }
  
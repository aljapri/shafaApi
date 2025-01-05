export interface IMedicalFacilityFetchStrategy {
    fetch(req: Request): Promise<any>;
  }
  
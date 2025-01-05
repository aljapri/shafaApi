import { Request } from 'express';
import { Doctor } from '../../models/Doctor.model';
import { BaseFetchStrategy } from '../../utils/BaseFetchStrategy';
import { IDoctorFetchStrategy } from '../../types/IDoctorFetchStrategy';
import { DoctorSearchQuery } from '../../utils/DoctorSearchQuery';

export class DoctorsFetching extends BaseFetchStrategy implements IDoctorFetchStrategy {
  public async fetch(req: Request | any): Promise<any> {
    const medicalFacilityId = req.params.medicalFacilityId;
    console.log(medicalFacilityId);
    const searchQuery = DoctorSearchQuery(req.query.search);
    let baseQuery;
    if(medicalFacilityId){
      baseQuery = Doctor.find({ medicalFacility:medicalFacilityId, ...searchQuery });
    }else{
      baseQuery = Doctor.find(searchQuery);
    }

    return await this.applyAPIFeatures(baseQuery, req.query);
  }
}

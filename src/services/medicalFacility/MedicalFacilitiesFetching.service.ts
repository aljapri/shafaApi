import { Request } from 'express';
import { Doctor } from '../../models/Doctor.model';
import APIFeatures from '../../utils/ApiFeatures';
import { MedicalFacility } from '../../models/medicalFacility.model';
import { IMedicalFacilityFetchStrategy } from '../../types/IMedicalFacilityFetchStrategy';
import { BaseFetchStrategy } from '../../utils/BaseFetchStrategy';
import { MedicalFacilitySearchQuery } from '../../utils/MedicalFacilitySearchQuery';

export class MedicalFacilitiesFetching extends BaseFetchStrategy implements IMedicalFacilityFetchStrategy {
  async fetch(req: Request|any): Promise<any> {
    console.log("sex");
    const searchTerms = req.search.split(' ').map((term:any) => new RegExp(term, 'i'));

    let baseQuery = MedicalFacility.find({$or: [
      { name: { $in: searchTerms } }
    ]});

    return await this.applyAPIFeatures(baseQuery, req.query);
  }
}

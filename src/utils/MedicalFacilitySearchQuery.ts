import { FilterQuery } from 'mongoose';
import { Doctor } from '../models/Doctor.model';

export const MedicalFacilitySearchQuery = (search: string): FilterQuery<typeof Doctor> => {
  if (!search) return {};
  console.log("one")
  const searchTerms = search.split(' ').map(term => new RegExp(term, 'i'));
  return {
    $or: [
      { name: { $in: searchTerms } }
    ],
  };
};

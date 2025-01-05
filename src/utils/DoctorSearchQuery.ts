import { FilterQuery } from 'mongoose';
import { Doctor } from '../models/Doctor.model';

export const DoctorSearchQuery = (search: string): FilterQuery<typeof Doctor> => {
  if (!search) return {};
  const searchTerms = search.split(' ').map(term => new RegExp(term, 'i'));
  return {
    $or: [
      { firstName: { $in: searchTerms } },
      { lastName: { $in: searchTerms } },
      { specialization: { $in: searchTerms } },
    ],
  };
};

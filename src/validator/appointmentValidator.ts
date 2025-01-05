import { check } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';

export const createAppointmentValidator = [
  check('medicalFacilityId')
    .notEmpty()
    .withMessage('Medical Facility ID is required')
    .isMongoId()
    .withMessage('Medical Facility ID must be a valid MongoDB ObjectId'),

  check('doctorId')
    .notEmpty()
    .withMessage('Doctor ID is required')
    .isMongoId()
    .withMessage('Doctor ID must be a valid MongoDB ObjectId'),

  check('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Date must be in valid ISO 8601 format'),

  check('time')
    .notEmpty()
    .withMessage('Time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d) (AM|PM)$/)
    .withMessage('Time must be in HH:mm AM/PM format'),

  validatorMiddleware,
];

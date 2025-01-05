import { body, param } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';

export const completeAppointmentValidation = [
  // Validate the appointmentId from the URL (Route Parameter)
  param('appointmentId').isMongoId().withMessage('Invalid appointment ID'),

  // Validate the fields in the request body
  body('diagnosis').notEmpty().withMessage('Diagnosis is required'),
  body('medication').notEmpty().withMessage('Medication is required'),
  body('notes').notEmpty().isString().withMessage('Notes must be a string'),

  validatorMiddleware
];

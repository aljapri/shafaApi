import { check, body } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';

export const updateWorkScheduleValidator = [
  check('workSchedule')
    .optional()
    .isObject()
    .withMessage('Work Schedule must be an object'),

  body('workSchedule.*.startTime')
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Start time must be in HH:mm format'),

  body('workSchedule.*.endTime')
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('End time must be in HH:mm format'),

  body('workSchedule.*.isAvailable')
    .optional()
    .isBoolean()
    .withMessage('Availability must be a boolean'),

  validatorMiddleware,
];

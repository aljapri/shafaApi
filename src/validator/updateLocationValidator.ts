import { check } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';

export const updateLocationValidator = [
  check('city')
    .optional()
    .isString()
    .withMessage('City must be a string')
    .isLength({ min: 2, max: 100 })
    .withMessage('City must be between 2 and 100 characters'),

  check('suburb')
    .optional()
    .isString()
    .withMessage('Suburb must be a string')
    .isLength({ min: 2, max: 100 })
    .withMessage('Suburb must be between 2 and 100 characters'),

  check('address')
    .optional()
    .isString()
    .withMessage('Address must be a string')
    .isLength({ min: 5, max: 255 })
    .withMessage('Address must be between 5 and 255 characters'),

  check('coordinates')
    .optional()
    .isString()
    .withMessage('Coordinates must be a string')
    .matches(/^(https?:\/\/[^\s]+|[-+]?\d{1,2}\.\d+,\s*[-+]?\d{1,3}\.\d+)$/)
    .withMessage('Coordinates must be a valid URL or GPS format'),

  validatorMiddleware,
];

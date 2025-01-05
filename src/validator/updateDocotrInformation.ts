import { check, body } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';

export const updateDoctorValidator = [
  check('firstName')
    .optional()
    .isString()
    .withMessage('First name must be a string')
    .isLength({ min: 4, max: 50 })
    .withMessage('First name must be between 4 and 50 characters'),

  check('lastName')
    .optional()
    .isString()
    .withMessage('Last name must be a string')
    .isLength({ min: 4, max: 50 })
    .withMessage('Last name must be between 4 and 50 characters'),

  check('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format'),

  check('password')
    .optional()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

  check('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Invalid phone number format'),

  check('photo')
    .optional()
    .isURL()
    .withMessage('Photo must be a valid URL'),

  check('specialization')
    .optional()
    .isString()
    .withMessage('Specialization must be a string'),

  check('maxPatients')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Maximum number of patients must be at least 1'),

  check('gender')
    .optional()
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be one of male, female, or other'),

  check('aboutMe')
    .optional()
    .isString()
    .withMessage('About Me must be a string')
    .isLength({ min: 10, max: 500 })
    .withMessage('About Me must be between 10 and 500 characters'),



  validatorMiddleware,
];

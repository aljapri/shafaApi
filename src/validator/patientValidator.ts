import { check } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';

export const patientValidator = [
  check('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isString()
    .withMessage('First name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),

  check('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isString()
    .withMessage('Last name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),

  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),

  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

  check('phone')
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\+\d{10,15}$/)
    .withMessage('Phone number must be in the format +1234567890'),

  check('photo')
    .notEmpty()
    .withMessage('Photo URL is required')
    .isURL()
    .withMessage('Photo must be a valid URL'),

  validatorMiddleware,
];

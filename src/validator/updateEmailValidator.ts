import { check } from 'express-validator';
import { Auth } from '../models/Auth.model'; // Adjust the path based on your project structure
import validatorMiddleware from '../middleware/validator.middleware';

export const updateEmailValidator = [
  check('newEmail')
    .notEmpty()
    .withMessage('New email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (newEmail) => {
      const existingUser = await Auth.findOne({ email: newEmail });
      if (existingUser) {
        throw new Error('Email is already in use');
      }
      return true;
    }),

  validatorMiddleware,
];

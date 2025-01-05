import { check } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';

export const updatePasswordValidator = [
  check('currentPassword')
    .notEmpty()
    .withMessage('Current password is required')
    .isLength({ min: 8 })
    .withMessage('Current password must be at least 8 characters long'),

  check('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .custom((newPassword, { req }) => {
      if (newPassword === req.body.currentPassword) {
        throw new Error('New password must be different from the current password');
      }
      return true;
    }),

  validatorMiddleware,
];

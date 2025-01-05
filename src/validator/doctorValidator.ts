import { check, body } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';

export const doctorValidator = [
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

  check('passwordConfirm')
    .notEmpty()
    .withMessage('Password confirmation is required')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),

  check('phone')
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone('any')
    .withMessage('Invalid phone number format'),

  check('photo')
    .notEmpty()
    .withMessage('Photo URL is required')
    .isURL()
    .withMessage('Photo must be a valid URL'),

  check('specialization')
    .notEmpty()
    .withMessage('Specialization is required')
    .isString()
    .withMessage('Specialization must be a string'),

  check('medicalFacilityId')
    .notEmpty()
    .withMessage('Medical Facility ID is required')
    .isMongoId()
    .withMessage('Medical Facility ID must be a valid MongoDB ObjectId'),

  check('workScheduleId')
    .notEmpty()
    .withMessage('Work Schedule ID is required')
    .isMongoId()
    .withMessage('Work Schedule ID must be a valid MongoDB ObjectId'),

  check('maxPatients')
    .notEmpty()
    .withMessage('Maximum number of patients is required')
    .isInt({ min: 1 })
    .withMessage('Maximum number of patients must be at least 1'),

  check('gender')
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be one of male, female, or other'),

  check('aboutMe')
    .notEmpty()
    .withMessage('About Me is required')
    .isString()
    .withMessage('About Me must be a string')
    .isLength({ min: 10, max: 500 })
    .withMessage('About Me must be between 10 and 500 characters'),

  check('workSchedule')
    .notEmpty()
    .withMessage('Work Schedule is required')
    .isObject()
    .withMessage('Work Schedule must be an object'),

  // Ensure work schedule covers all days from Sunday to Saturday
  body('workSchedule.Sunday.startTime')
    .notEmpty()
    .withMessage('Start time for Sunday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Start time must be in HH:mm format'),

  body('workSchedule.Sunday.endTime')
    .notEmpty()
    .withMessage('End time for Sunday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('End time must be in HH:mm format'),

  body('workSchedule.Sunday.isAvailable')
    .notEmpty()
    .withMessage('Availability for Sunday is required')
    .isBoolean()
    .withMessage('Availability must be a boolean'),

  // Repeat for Monday through Saturday
  body('workSchedule.Monday.startTime')
    .notEmpty()
    .withMessage('Start time for Monday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Start time must be in HH:mm format'),

  body('workSchedule.Monday.endTime')
    .notEmpty()
    .withMessage('End time for Monday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('End time must be in HH:mm format'),

  body('workSchedule.Monday.isAvailable')
    .notEmpty()
    .withMessage('Availability for Monday is required')
    .isBoolean()
    .withMessage('Availability must be a boolean'),

  body('workSchedule.Tuesday.startTime')
    .notEmpty()
    .withMessage('Start time for Tuesday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Start time must be in HH:mm format'),

  body('workSchedule.Tuesday.endTime')
    .notEmpty()
    .withMessage('End time for Tuesday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('End time must be in HH:mm format'),

  body('workSchedule.Tuesday.isAvailable')
    .notEmpty()
    .withMessage('Availability for Tuesday is required')
    .isBoolean()
    .withMessage('Availability must be a boolean'),

  body('workSchedule.Wednesday.startTime')
    .notEmpty()
    .withMessage('Start time for Wednesday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Start time must be in HH:mm format'),

  body('workSchedule.Wednesday.endTime')
    .notEmpty()
    .withMessage('End time for Wednesday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('End time must be in HH:mm format'),

  body('workSchedule.Wednesday.isAvailable')
    .notEmpty()
    .withMessage('Availability for Wednesday is required')
    .isBoolean()
    .withMessage('Availability must be a boolean'),

  body('workSchedule.Thursday.startTime')
    .notEmpty()
    .withMessage('Start time for Thursday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Start time must be in HH:mm format'),

  body('workSchedule.Thursday.endTime')
    .notEmpty()
    .withMessage('End time for Thursday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('End time must be in HH:mm format'),

  body('workSchedule.Thursday.isAvailable')
    .notEmpty()
    .withMessage('Availability for Thursday is required')
    .isBoolean()
    .withMessage('Availability must be a boolean'),

  body('workSchedule.Friday.startTime')
    .notEmpty()
    .withMessage('Start time for Friday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Start time must be in HH:mm format'),

  body('workSchedule.Friday.endTime')
    .notEmpty()
    .withMessage('End time for Friday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('End time must be in HH:mm format'),

  body('workSchedule.Friday.isAvailable')
    .notEmpty()
    .withMessage('Availability for Friday is required')
    .isBoolean()
    .withMessage('Availability must be a boolean'),

  body('workSchedule.Saturday.startTime')
    .notEmpty()
    .withMessage('Start time for Saturday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Start time must be in HH:mm format'),

  body('workSchedule.Saturday.endTime')
    .notEmpty()
    .withMessage('End time for Saturday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('End time must be in HH:mm format'),

  body('workSchedule.Saturday.isAvailable')
    .notEmpty()
    .withMessage('Availability for Saturday is required')
    .isBoolean()
    .withMessage('Availability must be a boolean'),

  validatorMiddleware,
];

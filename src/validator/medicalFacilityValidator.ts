import { check, body } from 'express-validator';
import mongoose from 'mongoose';
import validatorMiddleware from '../middleware/validator.middleware';

// Utility to check if a value is a valid MongoDB ObjectId
const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

// Validator for the provided object
export const medialFacilityValidator = [
    check('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 3, max: 50 })
        .withMessage('Name must be between 3 and 50 characters'),

    check('phone')
        .notEmpty()
        .withMessage('Phone number is required')
        .isMobilePhone('any')
        .withMessage('Invalid phone number format'),

    check('medicalFacilityType')
        .notEmpty()
        .withMessage('Medical Facility type is required')
        .isIn(['hospital', 'clinic'])
        .withMessage('Medical Facility type must be either "hospital" or "clinic"'),

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

    check('photo')
        .isString()
        .withMessage('Photo must be a string')
        .matches(/\.(jpg|jpeg|png)$/i)
        .withMessage('Photo must be a valid image file (jpg, jpeg, png, gif)'),

    check('subscriptionPlanId')
        .notEmpty()
        .withMessage('Subscription Plan ID is required')
        .custom((val) => isValidObjectId(val))
        .withMessage('Invalid Subscription Plan ID'),

    body('location')
        .notEmpty()
        .withMessage('Location is required')
        .custom((location) => {
            if (typeof location !== 'object' || !location) {
                throw new Error('Location must be an object');
            }
            const { city, suburb, address, coordinates } = location;
            if (!city || typeof city !== 'string') throw new Error('City is required and must be a string');
            if (suburb && typeof suburb !== 'string') throw new Error('Suburb must be a string');
            if (!address || typeof address !== 'string') throw new Error('Address is required and must be a string');
            if (!coordinates || typeof coordinates !== 'string') {
                throw new Error('Coordinates are required and must be a string');
            }
            return true;
        }),

    validatorMiddleware,
];

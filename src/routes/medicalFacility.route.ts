import express, { NextFunction, Request, Response, Router } from 'express';
import asyncWrapper from '../utils/catchAsync';

import { MedicalFacility } from '../models/medicalFacility.model';
import Authorize from '../middleware/Authorize.middleware';
import JWTService from '../services/jwt/jwt.service';
import MedicalFacilityController from '../controllers/MedicalFacilityController';
import DoctorController from '../controllers/DoctorController';
import { restrictTo } from '../utils/restrictTo';
import { loginValidator, signupValidator } from '../validator/authValidator';
import { updateEmailValidator } from '../validator/updateEmailValidator';
import { updateMedicalFacilityValidator } from '../validator/updateMedicalFacility';
import { updatePasswordValidator } from '../validator/updatePasswordValidator';
import { updateLocationValidator } from '../validator/updateLocationValidator';
import { doctorValidator } from '../validator/doctorValidator';
import { updateDoctorValidator } from '../validator/updateDocotrInformation';
import { updateWorkScheduleValidator } from '../validator/updateWorkSchedule';
import { medialFacilityValidator } from '../validator/medicalFacilityValidator';

const medicalFacilityRoutes: Router = express.Router();
const medicalFacilityController = new MedicalFacilityController();
const doctorController = new DoctorController();

// Authorization middleware setup
const authorization = new Authorize(new JWTService(), MedicalFacility);

// Define routes
medicalFacilityRoutes.post(
  '/',
  signupValidator,
  medialFacilityValidator,
  asyncWrapper( medicalFacilityController.createAccount.bind(medicalFacilityController))
);
medicalFacilityRoutes.get(
  '/',
  asyncWrapper( medicalFacilityController.fetchMedicalFacilities.bind(medicalFacilityController))
);
medicalFacilityRoutes.get(
  '/:medicalFacilityId',
  asyncWrapper( medicalFacilityController.fetchMedicalFacility.bind(medicalFacilityController))
);

medicalFacilityRoutes.post(
  '/login',
  loginValidator,
  asyncWrapper( medicalFacilityController.login.bind(medicalFacilityController))
);

// Protect the routes below with authorization middleware
medicalFacilityRoutes.use(authorization.authorize);
medicalFacilityRoutes.use(restrictTo("medicalFacility"));

medicalFacilityRoutes.patch(
  '/update-email',
  updateEmailValidator,
  asyncWrapper(medicalFacilityController.updatingEmail.bind(medicalFacilityController))
);


medicalFacilityRoutes.patch(
  '/update-information',
  updateMedicalFacilityValidator,
  asyncWrapper(medicalFacilityController.updatingInformation.bind(medicalFacilityController))
);

medicalFacilityRoutes.patch(
  '/update-password',
  updatePasswordValidator,
  asyncWrapper(medicalFacilityController.updatingPassword.bind(medicalFacilityController))
);
medicalFacilityRoutes.patch(
  '/update-location',
  updateLocationValidator,
  asyncWrapper(medicalFacilityController.updatingLocation.bind(medicalFacilityController))
);


// docotrs

medicalFacilityRoutes.post(
  '/create-doctor',
  signupValidator,
  doctorValidator,
  asyncWrapper( doctorController.createAccount.bind(doctorController))
);



medicalFacilityRoutes.patch(
  '/doctors/:doctorId/update-email',
  updateEmailValidator,
  asyncWrapper(doctorController.updatingEmail.bind(doctorController))
);

medicalFacilityRoutes.patch(
  '/doctors/:doctorId/update-password',
  updatePasswordValidator,
  asyncWrapper(doctorController.updatingPassword.bind(doctorController))
);

medicalFacilityRoutes.patch(
  '/doctors/:doctorId/update-information',
  updateDoctorValidator,
  asyncWrapper(doctorController.updatingInformation.bind(doctorController))
);

medicalFacilityRoutes.patch(
  '/doctors/:doctorId/update-work-schedule',
  updateWorkScheduleValidator,
  asyncWrapper(doctorController.updatingWorkSchedule.bind(doctorController))
);



export default medicalFacilityRoutes;

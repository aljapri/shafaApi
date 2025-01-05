import express, { Router } from 'express';
import asyncWrapper from '../utils/catchAsync';
import Authorize from '../middleware/Authorize.middleware';
import JWTService from '../services/jwt/jwt.service';

import { restrictTo } from '../utils/restrictTo';
import { Patient } from '../models/Patient.model';
import PatientController from '../controllers/PatientController';
import AppointmentController from '../controllers/AppointmentController';
import { patientValidator } from '../validator/patientValidator';
import { loginValidator, signupValidator } from '../validator/authValidator';
import { updateEmailValidator } from '../validator/updateEmailValidator';
import { updateDoctorValidator } from '../validator/updateDocotrInformation';
import { updatePasswordValidator } from '../validator/updatePasswordValidator';
import appointmentRoutes from './appointment.route';
import { Appointment } from '../models/Appointment.model';
import commentRoutes from './comment.route';

const patientRoutes: Router = express.Router({ mergeParams: true });

// Authorization middleware setup
const authorization = new Authorize(new JWTService(), Patient);
const patientController = new PatientController();
const appointmentController = new AppointmentController();
// Define routes
patientRoutes.post(
  '/',
  signupValidator,
  patientValidator,
  asyncWrapper( patientController.createAccount.bind(patientController))
);

patientRoutes.post(
  '/login',
  loginValidator,
  asyncWrapper( patientController.login.bind(patientController))
);

// Protect the routes below with authorization middleware
patientRoutes.use(authorization.authorize);
patientRoutes.use(restrictTo("patient"));

patientRoutes.patch(
  '/update-email',
  updateEmailValidator,
  asyncWrapper(patientController.updatingEmail.bind(patientController))
);


patientRoutes.patch(
  '/update-information',
  updateDoctorValidator,
  asyncWrapper(patientController.updatingInformation.bind(patientController))
);

patientRoutes.patch(
  '/update-password',
  updatePasswordValidator,
  asyncWrapper(patientController.updatingPassword.bind(patientController))
);


// ---------------------------------------- appointmnets --------------------------------------------------

patientRoutes.use("/appointmnets",appointmentRoutes)

export default patientRoutes;

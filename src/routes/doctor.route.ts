import express, { Router } from 'express';
import asyncWrapper from '../utils/catchAsync';

import Authorize from '../middleware/Authorize.middleware';
import JWTService from '../services/jwt/jwt.service';
import { Doctor } from '../models/Doctor.model';
import DoctorController from '../controllers/DoctorController';
import { restrictTo } from '../utils/restrictTo';
import AppointmentController from '../controllers/AppointmentController';
import appointmentRoutes from './appointment.route';
import { doctorValidator } from '../validator/doctorValidator';
import { updateDoctorValidator } from '../validator/updateDocotrInformation';
import { updateWorkScheduleValidator } from '../validator/updateWorkSchedule';
import commentRoutes from './comment.route';

const doctorRoutes: Router = express.Router({ mergeParams: true });
const doctorController = new DoctorController();

// Authorization middleware setup
const authorization = new Authorize(new JWTService(), Doctor);

  doctorRoutes.use("/appointmnets",authorization.authorize,restrictTo("doctor") ,appointmentRoutes)

  doctorRoutes.get(
    '/',
    asyncWrapper( doctorController.fetchDoctors.bind(doctorController))
  );
  doctorRoutes.get(
    '/:doctorId',
    asyncWrapper( doctorController.fetchDoctor.bind(doctorController))
  );


//-----------------------
  doctorRoutes.get(
    '/medical-facilities/:medicalFacilityId',
    asyncWrapper( doctorController.fetchDoctors.bind(doctorController))
  );

  // doctorRoutes.get(
  //   '/medical-facilities/:medicalFacilityId/:doctorId',
  //   asyncWrapper( doctorController.fetchDoctor.bind(doctorController))
  // );
//-----------------------

  doctorRoutes.post(
    '/login',
    doctorValidator,
    asyncWrapper( doctorController.login.bind(doctorController))
  );

  


  // Protect the routes below with authorization middleware
  doctorRoutes.use(authorization.authorize);
  doctorRoutes.use(restrictTo("doctor"))
  doctorRoutes.patch(
    '/update-information',
    updateDoctorValidator,
    asyncWrapper(doctorController.updatingInformation.bind(doctorController))
  );
  doctorRoutes.patch(
    '/update-work-schedule',
    updateWorkScheduleValidator,
    asyncWrapper(doctorController.updatingWorkSchedule.bind(doctorController))
  );




  

  export default doctorRoutes;

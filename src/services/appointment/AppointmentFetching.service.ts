import { NextFunction, Request, Response } from 'express';
import { Doctor } from '../../models/Doctor.model';
import { Appointment } from '../../models/Appointment.model';
import { IAppointmentFetchStrategy } from '../../types/IAppointmentFetchStrategy';

export default class AppointmentFetching implements IAppointmentFetchStrategy {
  public async fetch(req: Request | any): Promise<void|any> {
    const appointmentId = req.params.appointmentId;
    const queryConditions:any = {_id: appointmentId};
    if (req.role == "doctor") {
        queryConditions.doctor = req.accountId;
    } else if (req.role == "patient") {
        queryConditions.patient = req.accountId
    } else {
        throw new Error('Invalid owner type. Specify if the ID belongs to a patient or a doctor.');
    }
    // Base query to filter by medicalFacilityId
    let doctor = await Appointment.findOne(queryConditions)            
    .populate('patient', 'firstName lastName') // Populate patient fields
    .populate('doctor', 'firstName lastName specialization'); // Populate doctor fields;
    return doctor;
  }
}
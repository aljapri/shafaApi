import { Types } from 'mongoose';
import { Appointment } from '../../models/Appointment.model';
import { Patient } from '../../models/Patient.model';
import { Doctor } from '../../models/Doctor.model';
import HttpResponse from '../../utils/HttpResponse';
import { IAppointmentCommand } from '../../types/IAppointmentCommand';

class AppointmentCreation implements IAppointmentCommand{
  private medicalFacilityId: Types.ObjectId;
  private doctorId: Types.ObjectId;
  private patientId: Types.ObjectId;
  private date: Date;
  private time: string;

  /**
   * Constructor for initializing AppointmentService with necessary parameters.
   * @param medicalFacilityId - The ID of the medical facility
   * @param doctorId - The ID of the doctor
   * @param patientId - The ID of the patient
   * @param date - The date of the appointment
   * @param time - The time of the appointment
   */
  constructor(
    medicalFacilityId: Types.ObjectId,
    doctorId: Types.ObjectId,
    patientId: Types.ObjectId,
    date: Date,
    time: string
  ) {
    this.medicalFacilityId = medicalFacilityId;
    this.doctorId = doctorId;
    this.patientId = patientId;
    this.date = date;
    this.time = time;
  }

  /**
   * Creates an appointment after validation.
   */
  public async execute(): Promise<any> {
      // Validate patient
      const patient = await Patient.findById(this.patientId);
      if (!patient) {
        throw HttpResponse.NotFound('Patient not found.');
      }

      // Validate doctor and medical facility
      const doctor = await Doctor.findOne({ _id: this.doctorId, medicalFacility: this.medicalFacilityId });
      if (!doctor) {
        throw HttpResponse.NotFound('Doctor not found.');
      }
      

      // Check for conflicting appointments
      const conflict = await Appointment.findOne({
        doctor: this.doctorId,
        date: this.date,
        time: this.time,
        status: 'booked',
      });

      if (conflict) {
        throw HttpResponse.Conflict('The doctor is already booked for the selected time.');
      }

      // Create the appointment
      const appointment = await Appointment.create({
        patient: this.patientId,
        doctor: this.doctorId,
        medicalFacility: this.medicalFacilityId,
        date: this.date,
        time: this.time,
        status: 'booked',
      });
      console.log(appointment);

      return HttpResponse.Ok(appointment);

  }
}

export default AppointmentCreation;

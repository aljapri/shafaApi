import { Types } from 'mongoose';
import { Appointment } from '../../models/Appointment.model';
import HttpResponse from '../../utils/HttpResponse';
import { IAppointmentCommand } from '../../types/IAppointmentCommand';

export default class AppointmentCanciling implements IAppointmentCommand {
    private readonly appointmentId: Types.ObjectId;
    private readonly id: Types.ObjectId;
    private readonly role: string;

    /**
     * Constructor to receive parameters
     * @param appointmentId - The ID of the appointment to be canceled
     * @param id - The ID of the patient or doctor making the request
     * @param role - The role (patient or doctor) making the request
     */
    constructor(appointmentId: Types.ObjectId, id: Types.ObjectId, role: string) {
        this.appointmentId = appointmentId;
        this.id = id;
        this.role = role;
    }

    /**
     * Handles appointment cancellation by a patient or doctor.
     */
    public async execute(): Promise<any> {
        let appointment;

        if (this.role === "patient") {
            appointment = await Appointment.findOne({
                _id: this.appointmentId,
                patient: this.id,
                status: 'booked',
            });
        } else if (this.role === "doctor") {
            appointment = await Appointment.findOne({
                _id: this.appointmentId,
                doctor: this.id,
                status: 'booked',
            });
        }

        if (!appointment) {
            throw HttpResponse.NotFound("Appointment not found or you don't have permission to cancel it.");
        }

        // Update the status to "canceled"
        appointment.status = 'canceled';
        await appointment.save();

        return HttpResponse.Ok(appointment);
    }
}

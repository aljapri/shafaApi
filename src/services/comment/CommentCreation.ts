import { Types } from 'mongoose';
import { Comment } from '../../models/Comment.model';
import { Patient } from '../../models/Patient.model';
import { Doctor } from '../../models/Doctor.model';
import HttpResponse from '../../utils/HttpResponse';
import IFeedbackCreationCommand from '../../types/IFeedbackCreationCommand';

class CommentCreation implements IFeedbackCreationCommand {
  private doctorId: Types.ObjectId;
  private patientId: Types.ObjectId;
  private commentText: string;
  private isActive: boolean;

  /**
   * Constructor for initializing CommentCreation with necessary parameters.
   * @param doctorId - The ID of the doctor
   * @param patientId - The ID of the patient
   * @param commentText - The text of the comment
   * @param isActive - Status of the comment (active or not)
   */
  constructor(
    doctorId: Types.ObjectId,
    patientId: Types.ObjectId,
    commentText: string,
    isActive: boolean = true
  ) {
    this.doctorId = doctorId;
    this.patientId = patientId;
    this.commentText = commentText;
    this.isActive = isActive;
  }

  /**
   * Creates a comment after validation.
   */
  public async execute(): Promise<any> {
    // Validate patient
    const patient = await Patient.findById(this.patientId);
    if (!patient) {
      throw HttpResponse.NotFound('Patient not found.');
    }

    // Validate doctor
    const doctor = await Doctor.findById(this.doctorId);
    if (!doctor) {
      throw HttpResponse.NotFound('Doctor not found.');
    }

    // Create the comment
    const comment = await Comment.create({
      doctor: this.doctorId,
      patient: this.patientId,
      comment: this.commentText,
      isActive: this.isActive,
    });

    return HttpResponse.Ok(comment);
  }
}

export default CommentCreation;

import { Request } from 'express';
import { Doctor } from '../../models/Doctor.model';
import { IDoctorFetchStrategy } from '../../types/IDoctorFetchStrategy';
import { Comment } from '../../models/Comment.model';

export default class DoctorFetching implements IDoctorFetchStrategy {
  public async fetch(req: Request | any): Promise<any> {
      const commentId = req.params.commentId;
      const patientId = req.accountId;
      const comments = await Comment.find({ _id: commentId,patient:patientId ,isActive: true });
      return comments;
  }
}

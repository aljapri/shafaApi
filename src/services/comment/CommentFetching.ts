import { Request } from 'express';
import { Doctor } from '../../models/Doctor.model';
import { BaseFetchStrategy } from '../../utils/BaseFetchStrategy';
import { IDoctorFetchStrategy } from '../../types/IDoctorFetchStrategy';
import { DoctorSearchQuery } from '../../utils/DoctorSearchQuery';
import { IFeedbackFetchStrategy } from '../../types/IFeedbackFetchStrategy';
import { Comment } from '../../models/Comment.model';

export class CommentFetching extends BaseFetchStrategy implements IFeedbackFetchStrategy {
  public async fetch(req: Request | any): Promise<any> {
    const commentId = req.params.commentId;
    const patientId = req.accountId;
    const comments = await Comment.findOne({ _id: commentId, isActive: true,patient:patientId});
    return await this.applyAPIFeatures(comments, req.query);
  }
}

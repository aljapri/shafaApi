import { Request } from 'express';
import { Doctor } from '../../models/Doctor.model';
import { BaseFetchStrategy } from '../../utils/BaseFetchStrategy';
import { IDoctorFetchStrategy } from '../../types/IDoctorFetchStrategy';
import { DoctorSearchQuery } from '../../utils/DoctorSearchQuery';
import { IFeedbackFetchStrategy } from '../../types/IFeedbackFetchStrategy';
import { Comment } from '../../models/Comment.model';

export class CommentsFetching extends BaseFetchStrategy implements IFeedbackFetchStrategy {
  public async fetch(req: Request | any): Promise<any> {
    const commentId = req.params.commentId;
    const patientId = req.accountId;
    const comments = await Comment.find({ isActive: true, })
    .sort({
      _id: commentId ? -1 : 1, // Prioritize the specific commentId to appear first
      createdAt: -1 // Sort the remaining comments by createdAt (most recent first)
    });
    console.log(comments);
      return  comments;
  }
}

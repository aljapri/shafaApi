import { Types } from 'mongoose';
import { Rating } from '../../models/Rating.model';
import HttpResponse from '../../utils/HttpResponse';
import { Comment } from '../../models/Comment.model';
import { IFeedbackUpdatingCommand } from '../../types/IFeedbackUpdatingCommand';

class CommentUpdateing implements IFeedbackUpdatingCommand {
  private patientId: Types.ObjectId;
  private newComment: string;
  private commentId:Types.ObjectId;

  constructor(patientId: Types.ObjectId,commentId:Types.ObjectId,newComment: string) {
    this.patientId = patientId;
    this.newComment = newComment;
    this.commentId = commentId;
  }

  /**
   * Updates the rating.
   */
  public async execute(): Promise<any> {
    const comment = await Comment.findOne({patient:this.patientId,_id:this.commentId});
    if (!comment) {
      throw HttpResponse.NotFound('Comment not found.');
    }

    // Set isActive to false
    comment.comment = this.newComment;
    await comment.save();

    return HttpResponse.Ok(comment);
  }
}

export default CommentUpdateing;

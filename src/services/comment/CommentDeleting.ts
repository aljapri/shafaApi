import { Types } from 'mongoose';
import { Comment } from '../../models/Comment.model';
import HttpResponse from '../../utils/HttpResponse';
import { IFeedbackUpdatingCommand } from '../../types/IFeedbackUpdatingCommand';
import { IFeedbackDeletingCommand } from '../../types/IFeedbackDeletingCommand';

class CommentDeleting implements IFeedbackDeletingCommand {
    private commentId: Types.ObjectId;
    private patientId?: Types.ObjectId;

  constructor(commentId: Types.ObjectId, patientId: Types.ObjectId) {
    this.commentId = commentId;
    this.patientId = patientId;
  }

  /**
   * Deactivates a comment by setting `isActive` to false.
   */
  public async execute(): Promise<any> {
    // Find the comment by ID
    console.log(await Comment.findOne({_id:"6777e126f4b579bd4b7b164c"}));
    const comment = await Comment.findOne({_id:this.commentId,patient:this.patientId,isActive:true});
    if (!comment) {
      throw HttpResponse.NotFound('Comment not found.');
    }

    // Set isActive to false
    comment.isActive = false;
    await comment.save();

    return HttpResponse.Ok(comment);
  }
}

export default CommentDeleting;

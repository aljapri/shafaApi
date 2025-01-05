import { Types } from 'mongoose';
import { Rating } from '../../models/Rating.model';
import HttpResponse from '../../utils/HttpResponse';
import { IFeedbackUpdatingCommand } from '../../types/IFeedbackUpdatingCommand';

class RatingUpdate implements IFeedbackUpdatingCommand {
  private patientId: Types.ObjectId;
  private newRating: number;
  private ratingId:Types.ObjectId;

  constructor(patientId: Types.ObjectId, newRating: number,ratingId:Types.ObjectId) {
    this.patientId = patientId;
    this.newRating = newRating;
    this.ratingId = ratingId;
  }

  /**
   * Updates the rating.
   */
  public async execute(): Promise<any> {
    const rating = await Rating.findOne({patient:this.patientId,_id:this.ratingId});
    if (!rating) {
      throw HttpResponse.NotFound('Comment not found.');
    }

    // Set isActive to false
    rating.rating = this.newRating;
    await rating.save();

    return HttpResponse.Ok(rating);
  }
}

export default RatingUpdate;

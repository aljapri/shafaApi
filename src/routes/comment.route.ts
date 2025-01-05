import express, { Router } from 'express';
import asyncWrapper from '../utils/catchAsync';


import CommentController from '../controllers/CommentController';

const commentRoutes: Router = express.Router({ mergeParams: true });
const commentController = new CommentController();

// Authorization middleware setup





commentRoutes.post(
  '/',
  asyncWrapper(commentController.createComment.bind(commentController))
);


commentRoutes.get(
  '/',
  asyncWrapper(commentController.fetchComments.bind(commentController))
);






commentRoutes.get(
  '/:commentId',
  asyncWrapper(commentController.fetchComment.bind(commentController))
);

commentRoutes.patch(
    '/:commentId/delete',
    asyncWrapper(commentController.deleteComment.bind(commentController))
);
  commentRoutes.patch(
    '/:commentId/update',
    asyncWrapper(commentController.updateComment.bind(commentController))
);




// commentRoutes.get(
//   '/:appointmentId/detail',
//   asyncWrapper(commentController.fetchAppointmentDetails.bind(commentController))
// );
  


  

  export default commentRoutes;

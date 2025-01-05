import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

// @desc Finds the validation errors in this request and wraps them in an object with handy functions
const validatorMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export default validatorMiddleware;

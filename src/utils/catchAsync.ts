import { Request, Response, NextFunction } from 'express';

// Define the type for the asynchronous function
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncWrapper = (fn: AsyncFunction) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

export default asyncWrapper;

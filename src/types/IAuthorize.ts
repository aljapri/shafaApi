import { Request, Response, NextFunction } from 'express';

export default interface IAuthorize {
  authorize: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

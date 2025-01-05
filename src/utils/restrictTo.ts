import { Request, Response, NextFunction } from 'express';
import AppError from './appError';

/**
 * Middleware to restrict access to specific roles.
 * @param roles - List of roles allowed to access the route.
 * @returns A middleware function.
 */
export const restrictTo = (...roles: string[]) => {
  return (req: Request | any, res: Response, next: NextFunction): void => {
    // Ensure the user role exists and is authorized
    if (!roles.includes(req.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

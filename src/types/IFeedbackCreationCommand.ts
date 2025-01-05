// ICreateMedicalFacility.ts
import { Request, Response, NextFunction } from 'express';

export default interface IFeedbackCreationCommand {
  execute(): Promise<any>;
}

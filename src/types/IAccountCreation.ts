// ICreateMedicalFacility.ts
import { Request, Response, NextFunction } from 'express';

export default interface IAccountCreation {
  handle(body:any): Promise<any>;
}

// ICreateMedicalFacility.ts
import { Request, Response, NextFunction } from 'express';

export default interface IAccountLogin {
  handle(req:any): Promise<any>;
}

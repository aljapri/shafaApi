import { NextFunction, Request, Response } from "express";

export default interface IAccountActivation {
    execute(req: Request, res: Response, next: NextFunction): Promise<any>;
  }
  
  
import { Request, Response, NextFunction } from 'express';
import { Doctor } from '../../models/Doctor.model';
import HttpResponse from '../../utils/HttpResponse';
import IAccountActivation from '../../types/IAccountActivation';
import { Auth } from '../../models/Auth.model';

export class DoctorActivation implements IAccountActivation {
  public async execute(req: Request, res: Response, next: NextFunction): Promise<any> {
      const doctorId = req.params.id;
      const medicalFacilityId = (req as any).id; // Assuming medicalFacilityId is set in the request object
      // Perform delete operation
      const docotr =  await Doctor.findOne({ _id: doctorId,medicalFacilityId }).select("-password")
        
      if(!docotr){
        return next(HttpResponse.NotFound('No docotr found'));
      }
      const auth = await Auth.findOne({_id:docotr.auth});
      if(!auth){
        return next(HttpResponse.NotFound('No docotr found'));
      }
      auth.isActive = !auth.isActive;
      await auth.save();
      // Respond with No Content
      return auth;
    
  }
}

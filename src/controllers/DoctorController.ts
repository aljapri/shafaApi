import { NextFunction, Request, Response } from "express";
import IAccountFactory from "../factory/accountFactory/IAccountFactory";
import ILoginFactory from "../factory/LoginFactory/ILoginFactory";
import AccountFactory from "../factory/accountFactory/AccountFactory";
import LoginFactory from "../factory/LoginFactory/LoginFactory";
import HttpResponse from "../utils/HttpResponse";

import { ShareUpdatingCommandInvoker } from "../command/ShareUpdatingCommandInvoker";
import { UpdatePasswordCommand } from "../services/shareUpdatingCommand/MedicalFacilityUpdatingPassword.service";
import { UpdateEmailCommand } from "../services/shareUpdatingCommand/MedicalFacilityUpdatingEmail.service";
import UpdateInformationCommand from "../services/docotr/DoctorUpdatingInformation.service";
import { UpdateWorkScheduleCommand } from "../services/docotr/DoctorUpdatingWorkSchedule.service";
import { DoctorUpdatingCommandInvoker } from "../command/DoctorUpdatingCommandInvoker";
import { DocotrFetchContext } from "../strategy/DocotrFetchContext";
import DoctorFetching from "../services/docotr/DoctorFetching.service";
import { DoctorsFetching } from "../services/docotr/DoctorsFetching.service";
import { Doctor } from "../models/Doctor.model";
import { DoctorActivation } from "../services/docotr/DoctorActivation.service";


export default class DoctorController {

    private readonly _accountFactory: IAccountFactory;
    private readonly _loginFactory: ILoginFactory;

    public constructor() {

        this._accountFactory = AccountFactory.getInstance();
        this._loginFactory = LoginFactory.getInstance();

    }
    public async createAccount(req: Request,res:Response,next:NextFunction) {
        const document = await this._accountFactory.CreateObject("doctor")?.handle(req);
        if (!document) {
            HttpResponse.InternalServerError();
        }
        const data = HttpResponse.Created(document);
        return res.status(data.statusCode).json(document);
    }

    public async login(req: Request, res: Response,next:NextFunction) {
        const document = await this._loginFactory.CreateObject("doctor")?.handle(req,);
        
        if (!document) {
            HttpResponse.InternalServerError();
        }
        const data = HttpResponse.Ok(document);
        return res.status(data.statusCode).json(document);
    }

    public async fetchDoctor(req: Request, res: Response, next: NextFunction) {
        const strategy = new DoctorFetching();

        // Create a FetchContext with the strategy
        const fetchContext = new DocotrFetchContext(strategy);

        // Use the FetchContext to handle the request
        await fetchContext.handle(req, res,next);
    }

    public async fetchDoctors(req: Request, res: Response, next: NextFunction) {
        const strategy = new DoctorsFetching();

        // Create a FetchContext with the strategy
        const fetchContext = new DocotrFetchContext(strategy);

        // Use the FetchContext to handle the request
        await fetchContext.handle(req, res,next);
    }

    public async updatingEmail(req: Request|any, res: Response, next: NextFunction) {
        const { newEmail } = req.body;
        const doctorId = req.params.doctorId;
        const medicalFacilityId = req.accountId;
        const docotr = await Doctor.findOne({medicalFacility:medicalFacilityId,_id:doctorId})
        if(!docotr){
            throw HttpResponse.NotFound("User not found");
        }
        const command = new UpdateEmailCommand(newEmail, docotr.auth);
        const result = await ShareUpdatingCommandInvoker.executeCommand(command);

        res.status(result.statusCode).json(result);
    }
    
    public async updatingPassword(req: Request|any, res: Response, next: NextFunction) {
        const { currentPassword, newPassword } = req.body;
        const doctorId = req.params.doctorId;
        const medicalFacilityId = req.accountId;
        const docotr = await Doctor.findOne({medicalFacility:medicalFacilityId,_id:doctorId})
        if(!docotr){
            throw HttpResponse.NotFound("User not found");
        }
        const command = new UpdatePasswordCommand(
            currentPassword,
            newPassword,
            docotr.auth
        );
        const result = await ShareUpdatingCommandInvoker.executeCommand(command);

        res.status(result.statusCode).json(result);
    }

    public async updatingInformation(req: Request|any, res: Response, next: NextFunction) {
        const { firstName,lastName,specialization, aboutMe, phone,photo,gender,maxPatients } = req.body;
        let accountId;
        if(req.role == "medicalFacility"){
            accountId = req.params.doctorId
        }else if (req.role == "doctor"){
            accountId = req.accountId;
        }
        const command = new UpdateInformationCommand(firstName,lastName,specialization,aboutMe,phone,photo,gender,maxPatients,accountId)

        const result = await DoctorUpdatingCommandInvoker.executeCommand(command);

        res.status(result.statusCode).json(result);
    }

    public async updatingWorkSchedule(req: Request|any, res: Response, next: NextFunction) {

        const { Sunday,Monday, Tuesday, Wednesday,Thursday,Friday,Saturday } = req.body;
        let accountId;
        if(req.role == "medicalFacility"){
            accountId = req.params.doctorId
        }else if (req.role == "doctor"){
            accountId = req.accountId;
        }
        const command = new UpdateWorkScheduleCommand(Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,accountId);
        const result = await DoctorUpdatingCommandInvoker.executeCommand(command);

        res.status(result.statusCode).json(result);
    }




    // public async createDoctorAccount(req:Request,res:Response,next:NextFunction){
    //     await this._accountFactory.CreateObject("doctor")?.handle(req,res,next);
    // }

    // public async fetchAllDocotrs(req:Request,res:Response,next:NextFunction){
    //     const strategy = new FetchAllDoctorsByMedicalFacilityIdStrategy();

    //     // Create a FetchContext with the strategy
    //     const fetchContext = new DocotrFetchContext(strategy);

    //     // Use the FetchContext to handle the request
    //     await fetchContext.handle(req, res, next); 
    // }
    // public async fetchDoctorById(req:Request,res:Response,next:NextFunction){
    //     const strategy = new FetchDoctorByMedicalFacilityAndDoctorIdStrategy();

    //     // Create a FetchContext with the strategy
    //     const fetchContext = new DocotrFetchContext(strategy);

    //     // Use the FetchContext to handle the request
    //     await fetchContext.handle(req, res, next); 
    // }
    // public async updateDocotrEmail(req:Request,res:Response,next:NextFunction){
    //     await this._updateEmailFactory.CreateObject("doctorByMedicalFacility")?.handle(req,res,next);
    // }
    // public async updateDocotrInformation(req:Request,res:Response,next:NextFunction){
    //     await this._updateInformationFactory.CreateObject("doctorByMedicalFacility")?.handle(req,res,next);
    // }
    // public async updateDocotorPassword(req:Request,res:Response,next:NextFunction){
    //     await this._updatePasswordFactory.CreateObject("doctorByMedicalFacility")?.handle(req,res,next);
    // }
    // public async updateDocotrWorkSchedule(req:Request,res:Response,next:NextFunction){
    //     const doctorUpdateWorkScheduleByMedicalFacility = new DoctorUpdateWorkSchedule()
    //     await doctorUpdateWorkScheduleByMedicalFacility.handle(req,res,next);
    // }
    // public async handleActivation(req:Request,res:Response,next:NextFunction){
    //     await this._docotrActivation.execute(req,res,next);
    // }
}

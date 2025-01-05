import HttpResponse from "../../utils/HttpResponse";
import { IDoctorUpdatingCommand } from "../../types/IDoctorUpdatingCommand";
import { Doctor } from "../../models/Doctor.model";


export default class UpdateInformationCommand implements IDoctorUpdatingCommand {
  private firstName:string;
  private lastName:string;
  private specialization:string;
  private aboutMe:string;
  private phone:string;
  private photo:string;
  private maxPatients:number;
  private gender:string;
  private accountId:string
  constructor(firstName:string,lastName:string,specialization:string,aboutMe:string,phone:string,photo:string,maxPatients:number,gender:string,accountId:string) {
    this.firstName =firstName;
    this.lastName = lastName;
    this.specialization = specialization;
    this.aboutMe = aboutMe;
    this.phone = phone;
    this.photo = photo;
    this.maxPatients = maxPatients;
    this.gender = gender;
    this.accountId = accountId;
  }

  public async execute(): Promise<any> {
    const document = await Doctor.findById(this.accountId);
    if (!document) {
      throw HttpResponse.NotFound("Medical facility not found.");
    }
    // Prepare the update data, excluding password and email

    if (this.firstName) document.firstName = this.firstName;
    if (this.lastName) document.lastName = this.lastName;
    if (this.specialization) document.specialization = this.specialization;
    if (this.aboutMe) document.aboutMe = this.aboutMe;
    if (this.phone) document.phone = this.phone;
    if (this.photo) document.photo = this.photo;
    if (this.maxPatients) document.maxPatients = this.maxPatients;
    if (this.gender) document.gender = this.gender;


    await document.save();

    return HttpResponse.Ok(document);
  }
}


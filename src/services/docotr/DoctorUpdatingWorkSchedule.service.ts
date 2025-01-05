import HttpResponse from "../../utils/HttpResponse";
import { IDoctorUpdatingCommand } from "../../types/IDoctorUpdatingCommand";
import { WorkSchedule } from "../../models/WorkSchedule.model";
import { Doctor } from "../../models/Doctor.model";

export class UpdateWorkScheduleCommand implements IDoctorUpdatingCommand {
  private Sunday:any;
  private Monday:any;
  private Tuesday:any;
  private Wednesday:any;
  private Thursday:any;
  private Friday:any;
  private Saturday:any;
  private doctorId:string;

  constructor(
    Sunday:any,
    Monday:any,
    Tuesday:any,
    Wednesday:any,
    Thursday:any,
    Friday:any,
    Saturday:any,
    doctorId:string
  ) {
    this.Sunday = Sunday;
    this.Monday = Monday;
    this.Tuesday = Tuesday;
    this.Wednesday = Wednesday;
    this.Thursday = Thursday;
    this.Friday = Friday;
    this.Saturday = Saturday;
    this.doctorId = doctorId;
  }

  public async execute(): Promise<any> {
    const docotr = await Doctor.findById(this.doctorId);
    if (!docotr) {
      throw HttpResponse.NotFound("docotr not found.");
    }
    const document = await WorkSchedule.findById(docotr.workSchedule) ;
    if(!document){
      throw HttpResponse.NotFound("docotr not found.");
    }
    if (this.Sunday) document.Sunday = this.Sunday;
    if (this.Monday) document.Monday = this.Monday;
    if (this.Tuesday) document.Tuesday = this.Tuesday;
    if (this.Wednesday) document.Wednesday = this.Wednesday;
    if (this.Thursday) document.Thursday = this.Thursday;
    if (this.Friday) document.Friday = this.Friday;
    if (this.Saturday) document.Saturday = this.Saturday;

    await document.save();

    return HttpResponse.Ok(document);
  }
}



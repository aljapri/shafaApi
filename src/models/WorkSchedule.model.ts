import { Schema, model } from 'mongoose';

interface IWorkSchedule {
  Sunday: {startTime:string,endTime:string,isAvailable:boolean};
  Monday: {startTime:string,endTime:string,isAvailable:boolean};
  Tuesday: {startTime:string,endTime:string,isAvailable:boolean};
  Wednesday: {startTime:string,endTime:string,isAvailable:boolean};
  Thursday: {startTime:string,endTime:string,isAvailable:boolean};
  Friday: {startTime:string,endTime:string,isAvailable:boolean};
  Saturday: {startTime:string,endTime:string,isAvailable:boolean};


}

const workScheduleSchema = new Schema<IWorkSchedule>({
  Sunday: { 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: false },
  },
  Monday: { 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: false },
  },
  Tuesday: { 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: false },
  },
  Wednesday: { 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: false },
  },
  Thursday: { 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: false },
  },

  Friday: { 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: false },
  },
  Saturday: { 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: false },
  },
},
{
  timestamps: true, // Automatically add `createdAt` and `updatedAt`
});


const WorkSchedule = model<IWorkSchedule>('WorkSchedule', workScheduleSchema);

export { WorkSchedule, IWorkSchedule };

/**
 
import { Schema, model } from 'mongoose';

interface IWorkSchedule {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

const workScheduleSchema = new Schema<IWorkSchedule>({
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isAvailable: { type: Boolean, required: true, default: false }
});

const WorkSchedule = model<IWorkSchedule>('WorkSchedule', workScheduleSchema);

export { WorkSchedule, IWorkSchedule };

 */
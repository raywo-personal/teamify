import {addToTime, createTime, Time} from '../../shared/models/time.model';
import {ObjectValidator, validateObject} from '../../shared/helper/validate-object';


export interface TimeSlot {

  id: string;
  description: string;
  start: Time;
  end: Time;
  color: string;

}


export function createTimeSlot(description: string,
                               color: string = "noon",
                               start?: Time,
                               end?: Time): TimeSlot {
  const now = new Date();
  const startTime = start || createTime(now.getHours(), now.getMinutes());
  const endTime = end || addToTime(startTime, createTime(1, 30));

  return {
    id: crypto.randomUUID(),
    description,
    start: startTime,
    end: endTime,
    color,
  };
}


export const timeSlotValidator: ObjectValidator<TimeSlot> = {
  id: (value: any) => typeof value === "string",
  description: (value: any) => typeof value === "string",
  start: (value: any) => typeof value === "object",
  end: (value: any) => typeof value === "object",
  color: (value: any) => typeof value === "string",
}


export function isTimeSlotArray(value: any): value is TimeSlot[] {
  if (!value || !Array.isArray(value)) return false;

  return value.every(item => validateObject<TimeSlot>(item, timeSlotValidator));
}

import {TimeSlot, timeSlotValidator} from '../../timeslots/models/time-slot.model';
import {ObjectValidator, validateObject} from '../../shared/helper/validate-object';


export interface PersonTimeSlot {
  timeSlot: TimeSlot;
  priority?: number;
}


export function createPersonTimeSlot(timeSlot: TimeSlot,
                                     priority?: number): PersonTimeSlot {
  return {
    timeSlot,
    priority
  };
}


export const personTimeSlotValidator: ObjectValidator<PersonTimeSlot> = {
  timeSlot: (value: unknown) => validateObject<TimeSlot>(value, timeSlotValidator),
  priority: (value: unknown) => typeof value === "number",
}


export function isPersonTimeSlotArray(value: unknown): value is PersonTimeSlot[] {
  if (!value || !Array.isArray(value)) return false;

  return value.every(item => validateObject<PersonTimeSlot>(item, personTimeSlotValidator));
}

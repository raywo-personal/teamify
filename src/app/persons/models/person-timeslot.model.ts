import {TimeSlot} from '../../timeslots/models/time-slot.model';


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

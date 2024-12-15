import {createTimeSlot, TimeSlot} from '../models/time-slot.model';
import {Time} from '../models/time.model';


export const defaultTimeSlots: TimeSlot[] = [
  createTimeSlot("Slot 1", new Time(9, 0), new Time(10, 30)),
  createTimeSlot("Slot 2", new Time(10, 45), new Time(12, 15)),
  createTimeSlot("Slot 3", new Time(13, 15), new Time(14, 45)),
  createTimeSlot("Slot 4", new Time(15, 0), new Time(16, 30))
];

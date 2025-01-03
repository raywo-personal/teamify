import {createTimeSlot, TimeSlot} from '../../timeslots/models/time-slot.model';
import {createTime} from '../models/time.model';


export const defaultTimeSlots: TimeSlot[] = [
  createTimeSlot("Slot 1", "morning", createTime(9, 0), createTime(10, 30)),
  createTimeSlot("Slot 2", "noon", createTime(10, 45), createTime(12, 15)),
  createTimeSlot("Slot 3", "afternoon", createTime(13, 15), createTime(14, 45)),
  createTimeSlot("Slot 4", "evening", createTime(15, 0), createTime(16, 30))
];

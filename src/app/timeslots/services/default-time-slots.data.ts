import {createTimeSlot, TimeSlot} from '../models/time-slot.model';
import {createTime} from '../../shared/models/time.model';


export const defaultTimeSlots: TimeSlot[] = [
  createTimeSlot("Slot 1", createTime(9, 0), createTime(10, 30)),
  createTimeSlot("Slot 2", createTime(10, 45), createTime(12, 15)),
  createTimeSlot("Slot 3", createTime(13, 15), createTime(14, 45)),
  createTimeSlot("Slot 4", createTime(15, 0), createTime(16, 30))
];

import {TimeSlot} from '../../timeslots/models/time-slot.model';
import {Time} from '../../timeslots/models/time.model';


export const slot1: TimeSlot = {
  id: "1",
  description: 'Slot 1',
  start: new Time(9, 0),
  end: new Time(10, 30)
};

export const slot2: TimeSlot = {
  id: "2",
  description: 'Slot 2',
  start: new Time(10, 45),
  end: new Time(12, 15)
};

export const slot3: TimeSlot = {
  id: "3",
  description: 'Slot 3',
  start: new Time(13, 15),
  end: new Time(14, 45)
};

export const slot4: TimeSlot = {
  id: "4",
  description: 'Slot 4',
  start: new Time(15, 0),
  end: new Time(16, 30)
};

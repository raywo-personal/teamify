import {Time} from './time.model';


export interface TimeSlot {

  id: string;
  description: string;
  start: Time;
  end: Time;

}


export function createTimeSlot(description: string,
                               start?: Time,
                               end?: Time): TimeSlot {
  const now = new Date();
  const startTime = start || new Time(now.getHours(), now.getMinutes());
  const endTime = end || startTime.plus({hour: 1, minute: 30});

  return {
    id: crypto.randomUUID(),
    description,
    start: startTime,
    end: endTime
  };
}

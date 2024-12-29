import {addToTime, createTime, Time} from '../../shared/models/time.model';


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
  const startTime = start || createTime(now.getHours(), now.getMinutes());
  const endTime = end || addToTime(startTime, createTime(1, 30));

  return {
    id: crypto.randomUUID(),
    description,
    start: startTime,
    end: endTime
  };
}

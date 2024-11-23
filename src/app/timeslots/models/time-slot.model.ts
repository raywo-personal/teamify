import {DateTime} from "luxon";



export interface TimeSlot {

  id?: string;
  description: string;
  start: DateTime;
  end: DateTime;

}


export function createTimeSlot(description: string,
                               start: DateTime,
                               end: DateTime): TimeSlot {
  return {
    id: crypto.randomUUID(),
    description,
    start,
    end
  };
}

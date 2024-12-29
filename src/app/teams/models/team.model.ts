import {Person} from '../../persons/models/person.model';
import {TimeSlot} from '../../timeslots/models/time-slot.model';


export interface Team {

  id: string;
  name?: string;
  persons: Person[];
  timeSlot: TimeSlot;

}


export function createTeam(timeSlot: TimeSlot,
                           name: string = "",
                           persons: Person[] = []): Team {
  return {
    id: crypto.randomUUID(),
    name,
    timeSlot,
    persons
  }
}

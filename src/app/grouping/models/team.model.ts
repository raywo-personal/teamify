import {Person} from '../../persons/models/person.model';
import {TimeSlot} from '../../timeslots/models/time-slot.model';


export interface Team {

  id?: string;
  name?: string;
  persons: Person[];
  timeSlot: TimeSlot;

}


export function createTeam(name: string,
                           timeSlot: TimeSlot,
                           persons: Person[] = []): Team {
  return {
    id: crypto.randomUUID(),
    name,
    timeSlot,
    persons
  }
}

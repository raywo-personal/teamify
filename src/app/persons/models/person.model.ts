import {PersonKnowledge} from './person-knowledge.model';
import {PersonTimeSlot} from './person-timeslot.model';


export interface Person {
  id?: string;
  name: string;
  info: string;
  priorKnowledge: PersonKnowledge[];
  timeSlots: PersonTimeSlot[];
}


export function createPerson(name: string,
                             info: string = "",
                             priorKnowledge: PersonKnowledge[] = [],
                             timeSlots: PersonTimeSlot[] = []): Person {
  return {
    id: crypto.randomUUID(),
    name,
    info,
    priorKnowledge,
    timeSlots
  };
}

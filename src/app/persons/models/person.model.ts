import {PriorKnowledge} from '../../prior-knowledge/models/prior-knowledge.model';
import {TimeSlot} from '../../timeslots/models/time-slot.model';


export interface Person {

  id?: string;
  name: string;
  priorKnowledge: PriorKnowledge[];
  timeSlots: TimeSlot[];

}


export function createPerson(name: string,
                             priorKnowledge: PriorKnowledge[] = [],
                             timeSlots: TimeSlot[] = []): Person {
  return {
    id: crypto.randomUUID(),
    name,
    priorKnowledge,
    timeSlots
  };
}

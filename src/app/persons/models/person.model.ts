import {PriorKnowledge} from '../../prior-knowledge/models/prior-knowledge.model';
import {TimeSlot} from '../../timeslots/models/time-slot.model';


export interface Person {

  id?: string;
  name: string;
  // TODO: Make list of knowledge including remarks
  priorKnowledge: PriorKnowledge[];
  // TODO: Make list of prioritized time slots
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

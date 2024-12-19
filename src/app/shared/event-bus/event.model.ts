import {Person} from '../../persons/models/person.model';
import {PriorKnowledge} from '../../prior-knowledge/models/prior-knowledge.model';
import {TimeSlot} from '../../timeslots/models/time-slot.model';
import {Team} from '../../teams/models/team.model';


export enum EventType {
  SLOT_CREATED, SLOT_DELETED, SLOT_UPDATED, SLOTS_RESET,
  PERSON_CREATED, PERSON_DELETED, PERSON_UPDATED, PERSONS_RESET,
  PRIOR_KNOWLEDGE_CREATED, PRIOR_KNOWLEDGE_DELETED, PRIOR_KNOWLEDGE_UPDATED, PRIOR_KNOWLEDGE_RESET,
  TEAM_CREATED, TEAM_DELETED, TEAM_UPDATED, TEAMS_RESET,
}

export type EventPayload = Person | PriorKnowledge | TimeSlot | Team | void;

export interface BusEvent {
  type: EventType;
  payload: EventPayload;
}


export function createBusEvent(type: EventType, payload: EventPayload): BusEvent {
  return {
    type,
    payload
  };
}

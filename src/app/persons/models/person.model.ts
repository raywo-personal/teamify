import {isPersonKnowledgeArray, PersonKnowledge} from './person-knowledge.model';
import {isPersonTimeSlotArray, PersonTimeSlot} from './person-timeslot.model';
import {ObjectValidator, validateObject} from '../../shared/helper/validate-object';
import {ExportImportPerson} from '../../settings/models/export-import-person.model';


export interface Person {
  id?: string;
  name: string;
  info: string;
  priorKnowledge: PersonKnowledge[];
  timeSlots: PersonTimeSlot[];
}


export function createPerson(name: string,
                             info = "",
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


export const personValidator: ObjectValidator<Person> = {
  id: (value: unknown) => typeof value === "string",
  name: (value: unknown) => typeof value === "string",
  info: (value: unknown) => typeof value === "string",
  priorKnowledge: (value: unknown) => isPersonKnowledgeArray(value),
  timeSlots: (value: unknown) => isPersonTimeSlotArray(value)
}


export function isPersonArray(value: unknown): value is Person[] {
  if (!value || !Array.isArray(value)) return false;

  return value.every(item => validateObject<ExportImportPerson>(item, personValidator));
}

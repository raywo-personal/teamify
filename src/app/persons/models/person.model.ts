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


export const personValidator: ObjectValidator<Person> = {
  id: (value: any) => typeof value === "string",
  name: (value: any) => typeof value === "string",
  info: (value: any) => typeof value === "string",
  priorKnowledge: (value: any) => isPersonKnowledgeArray(value),
  timeSlots: (value: any) => isPersonTimeSlotArray(value)
}


export function isPersonArray(value: any): value is Person[] {
  if (!value || !Array.isArray(value)) return false;

  return value.every(item => validateObject<ExportImportPerson>(item, personValidator));
}

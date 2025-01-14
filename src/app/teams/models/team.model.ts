import {isPersonArray, Person} from '../../persons/models/person.model';
import {TimeSlot, timeSlotValidator} from '../../timeslots/models/time-slot.model';
import {ObjectValidator, validateObject} from '../../shared/helper/validate-object';


export interface Team {

  id: string;
  name?: string;
  persons: Person[];
  timeSlot: TimeSlot;

}


export function createTeam(timeSlot: TimeSlot,
                           name = "",
                           persons: Person[] = []): Team {
  return {
    id: crypto.randomUUID(),
    name,
    timeSlot,
    persons
  }
}


export const teamValidator: ObjectValidator<Team> = {
  id: (value: unknown) => typeof value === "string",
  name: (value: unknown) => typeof value === "string",
  timeSlot: (value: unknown) => validateObject<TimeSlot>(value, timeSlotValidator),
  persons: (value: unknown) => isPersonArray(value),
}


export function isTeamsArray(value: unknown): value is Team[] {
  if (!value || !Array.isArray(value)) return false;

  return value.every(item => validateObject<Team>(item, teamValidator));
}

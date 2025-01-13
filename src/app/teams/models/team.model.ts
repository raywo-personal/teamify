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
                           name: string = "",
                           persons: Person[] = []): Team {
  return {
    id: crypto.randomUUID(),
    name,
    timeSlot,
    persons
  }
}


export const teamValidator: ObjectValidator<Team> = {
  id: (value: any) => typeof value === "string",
  name: (value: any) => typeof value === "string",
  timeSlot: (value: any) => validateObject<TimeSlot>(value, timeSlotValidator),
  persons: (value: any) => isPersonArray(value),
}


export function isTeamsArray(value: any): value is Team[] {
  if (!value || !Array.isArray(value)) return false;

  return value.every(item => validateObject<Team>(item, teamValidator));
}

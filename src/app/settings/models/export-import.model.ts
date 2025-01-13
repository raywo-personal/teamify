import {isKnowledgeArray, PriorKnowledge} from '../../prior-knowledge/models/prior-knowledge.model';
import {isTimeSlotArray, TimeSlot} from '../../timeslots/models/time-slot.model';
import {isTeamsArray, Team} from '../../teams/models/team.model';
import {ObjectValidator, validateObject} from '../../shared/helper/validate-object';
import {ExportImportPerson, isPersonsArray} from './export-import-person.model';
import {Person} from '../../persons/models/person.model';


export type ExportImportType = typeof ExportImportTypes[number];
export type ExportImportDataType = TimeSlot[] | PriorKnowledge[] | ExportImportPerson[] | AllData;


export interface AllData {
  timeSlots: TimeSlot[];
  priorKnowledge: PriorKnowledge[];
  persons: Person[];
  teams: Team[];
}

export interface ExportImportData {
  type: ExportImportType;
  data: ExportImportDataType;
}


export const dataValidator: ObjectValidator<ExportImportData> = {
  type: (value: any) => isExportImportType(value),
  data: (value: any) => isValidDataType(value)
}


const ExportImportTypes = [
  "timeslots", "prior-knowledge", "persons", "all", null
] as const;


function isExportImportType(value: any): value is ExportImportType {
  return ExportImportTypes.includes(value);
}


function isValidDataType(value: any): value is ExportImportType {
  if (!value) return false;

  if (Array.isArray(value)) {
    return isTimeSlotArray(value) || isKnowledgeArray(value) || isPersonsArray(value);
  }

  return validateObject<AllData>(value, allDataValidator)
}


const allDataValidator: ObjectValidator<AllData> = {
  timeSlots: (value: any) => isTimeSlotArray(value),
  priorKnowledge: (value: any) => isKnowledgeArray(value),
  persons: (value: any) => isPersonsArray(value),
  teams: (value: any) => isTeamsArray(value)
}

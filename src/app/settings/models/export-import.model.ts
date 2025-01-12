import {PriorKnowledge} from '../../prior-knowledge/models/prior-knowledge.model';
import {TimeSlot} from '../../timeslots/models/time-slot.model';
import {Team} from '../../teams/models/team.model';


export type ExportImportType = "timeslots" | "prior-knowledge" | "persons" | "all" | null;

export interface ExportImportPerson {
  id?: string;
  name: string;
}

export interface AllData {
  timeSlots: TimeSlot[];
  priorKnowledge: PriorKnowledge[];
  persons: ExportImportPerson[];
  teams: Team[];
}

export interface ExportImportData {
  type: ExportImportType;
  data: TimeSlot[] | PriorKnowledge[] | ExportImportPerson[] | AllData;
}

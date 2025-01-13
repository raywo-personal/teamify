import {inject, Injectable} from '@angular/core';
import {Team} from '../../teams/models/team.model';
import {PersonService} from '../../persons/services/person.service';
import {TeamService} from '../../teams/services/team.service';
import {TimeSlotService} from '../../timeslots/services/time-slot.service';
import {PriorKnowledgeService} from '../../prior-knowledge/services/prior-knowledge.service';
import {ExportImportData} from '../models/export-import.model';


@Injectable({
  providedIn: 'root'
})
export class ExportService {

  private personService = inject(PersonService);
  private teamService = inject(TeamService);
  private slotService = inject(TimeSlotService);
  private knowledgeService = inject(PriorKnowledgeService);


  public slotsExportURL(): string {
    const exportable: ExportImportData = {
      type: "timeslots",
      data: this.slotService.slots
    };
    const data = JSON.stringify(exportable);
    const blob = new Blob([data], {type: 'application/json'});

    return URL.createObjectURL(blob);
  }


  public knowledgeExportURL(): string {
    const exportable: ExportImportData = {
      type: "prior-knowledge",
      data: this.knowledgeService.knowledgeList
    };
    const data = JSON.stringify(exportable);
    const blob = new Blob([data], {type: 'application/json'});

    return URL.createObjectURL(blob);
  }


  public personsExportURL(): string {
    const exportable: ExportImportData = {
      type: "persons",
      data: this.personService.persons
        .map(person => {
          return {
            id: person.id,
            name: person.name
          }
        })
    };
    const data = JSON.stringify(exportable);
    const blob = new Blob([data], {type: 'application/json'});

    return URL.createObjectURL(blob);
  }


  public personsOfTeamExportURL(team: Team) {
    const exportable: ExportImportData = {
      type: "persons",
      data: team.persons
        .map(person => {
          return {
            id: person.id,
            name: person.name
          }
        })
    };
    const data = JSON.stringify(exportable);
    const blob = new Blob([data], {type: 'application/json'});

    return URL.createObjectURL(blob);
  }


  public allDataExportURL(): string {
    const exportable: ExportImportData = {
      type: "all",
      data: {
        timeSlots: this.slotService.slots,
        priorKnowledge: this.knowledgeService.knowledgeList,
        persons: this.personService.persons,
        teams: this.teamService.teams
      }
    };
    const data = JSON.stringify(exportable);
    const blob = new Blob([data], {type: 'application/json'});

    return URL.createObjectURL(blob);
  }
}

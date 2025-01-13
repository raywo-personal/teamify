import {inject, Injectable} from '@angular/core';
import {AllData, dataValidator, ExportImportData, ExportImportDataType, ExportImportType} from '../models/export-import.model';
import {validateObject} from '../../shared/helper/validate-object';
import {DataFormatError} from '../../shared/helper/DataFormatError';
import {createPerson, Person} from '../../persons/models/person.model';
import {TimeSlot} from '../../timeslots/models/time-slot.model';
import {PriorKnowledge} from '../../prior-knowledge/models/prior-knowledge.model';
import {TeamService} from '../../teams/services/team.service';
import {PersonService} from '../../persons/services/person.service';
import {PriorKnowledgeService} from '../../prior-knowledge/services/prior-knowledge.service';
import {TimeSlotService} from '../../timeslots/services/time-slot.service';
import {PersistenceService} from '../../shared/services/persistence.service';


@Injectable({
  providedIn: 'root'
})
export class ImportService {


  private timeSlotService = inject(TimeSlotService);
  private knowledgeService = inject(PriorKnowledgeService);
  private personService = inject(PersonService);
  private teamService = inject(TeamService);
  private persistenceService = inject(PersistenceService);


  public determineImportType(data: any): ExportImportType {
    if (!validateObject<ExportImportData>(data, dataValidator)) {
      throw new DataFormatError('Invalid data format');
    }

    return data.type;
  }


  public personsToImportFromTxt(data: string): Person[] {
    return data
      .trim()
      .split('\n')
      .map(name => createPerson(name));
  }


  public contentToImportFromJson(data: any): ExportImportDataType {
    const type = this.determineImportType(data);
    console.log(`Importing ${type} data`);

    switch (type) {
      case "timeslots":
        return this.timeslotsToImportFromJson(data.data);

      case "prior-knowledge":
        return this.knowledgeToImportFromJson(data.data);

      case "persons":
        return this.personsToImportFromJson(data.data);

      case "all":
        return this.allToImportFromJson(data.data);

      default:
        return [];
    }
  }


  public importContent(type: ExportImportType, data: ExportImportDataType): void {
    switch (type) {
      case "timeslots":
        this.timeSlotService.removeAllSlots();
        (data as TimeSlot[]).forEach(slot => this.timeSlotService.addSlot(slot));
        break;

      case "prior-knowledge":
        this.knowledgeService.removeAllKnowledge();
        (data as PriorKnowledge[]).forEach(k => this.knowledgeService.addKnowledge(k, true));
        break;

      case "persons":
        this.personService.removeAllPersons();
        (data as Person[]).forEach(p => this.personService.addPerson(p, true));
        break;

      case "all":
        this.timeSlotService.removeAllSlots();
        this.knowledgeService.removeAllKnowledge();
        this.personService.removeAllPersons();
        this.teamService.removeAllTeams();

        (data as AllData).timeSlots.forEach(slot => this.timeSlotService.addSlot(slot, true));
        (data as AllData).priorKnowledge.forEach(k => this.knowledgeService.addKnowledge(k, true));
        (data as AllData).persons.forEach(p => this.personService.addPerson(p, true));
        (data as AllData).teams.forEach(team => this.teamService.addTeam(team, true));

        const alreadyAssignedPersons = this.teamService.teams.flatMap(team => team.persons);
        this.personService.updateAvailablePersons(alreadyAssignedPersons);

        break;
    }

    this.persistenceService.saveAllData();
  }


  private timeslotsToImportFromJson(rawTimeslots: any[]): TimeSlot[] {
    return rawTimeslots as TimeSlot[];
  }


  private knowledgeToImportFromJson(rawKnowledge: any[]): PriorKnowledge[] {
    return rawKnowledge as PriorKnowledge[];
  }


  private personsToImportFromJson(rawPersons: Person[]): Person[] {
    return rawPersons.map(p => {
      const person = createPerson(p.name);
      person.id = p.id;

      return person;
    });
  }


  private personsToImportFromAllJson(rawPersons: Person[]): Person[] {
    return rawPersons.map(p => {
      const person = createPerson(p.name, p.info, p.priorKnowledge, p.timeSlots);
      person.id = p.id;

      return person;
    });
  }


  private allToImportFromJson(data: any): AllData {
    const timeSlots = this.timeslotsToImportFromJson(data.timeSlots);
    const priorKnowledge = this.knowledgeToImportFromJson(data.priorKnowledge);
    const persons = this.personsToImportFromAllJson(data.persons);
    const teams = data.teams;

    return {timeSlots, priorKnowledge, persons, teams};
  }
}

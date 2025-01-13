import {Injectable} from '@angular/core';
import {dataValidator, ExportImportData, ExportImportType} from '../models/export-import.model';
import {validateObject} from '../../shared/helper/validate-object';
import {DataFormatError} from '../../shared/helper/DataFormatError';
import {createPerson, Person} from '../../persons/models/person.model';
import {TimeSlot} from '../../timeslots/models/time-slot.model';
import {PriorKnowledge} from '../../prior-knowledge/models/prior-knowledge.model';


@Injectable({
  providedIn: 'root'
})
export class ImportService {


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


  public contentToImportFromJson(data: any): any[] {
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


  private allToImportFromJson(data: any) {
    const slots = this.timeslotsToImportFromJson(data.timeSlots);
    const knowledge = this.knowledgeToImportFromJson(data.priorKnowledge);
    const persons = this.personsToImportFromAllJson(data.persons);
    const teams = data.teams;

    return teams;
  }
}

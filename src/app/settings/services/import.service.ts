import {Injectable} from '@angular/core';
import {ExportImportType} from '../models/export-import.model';


@Injectable({
  providedIn: 'root'
})
export class ImportService {

  public namesToImport(data: string): string[] {
    return data.trim().split('\n');
  }


  public determineImportType(json: JSON): ExportImportType {
    if (json.hasOwnProperty("teams")) {
      return 'all';
    }

    if (json.hasOwnProperty('knowledge')) {
      return 'prior-knowledge';
    }

    if (json.hasOwnProperty('slots')) {
      return 'timeslots';
    }

    if (json.hasOwnProperty('persons')) {
      return 'persons';
    }

    return null;
  }
}

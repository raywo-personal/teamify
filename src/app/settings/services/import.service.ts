import {Injectable} from '@angular/core';
import {dataValidator, ExportImportData, ExportImportType} from '../models/export-import.model';
import {validateObject} from '../../shared/helper/validate-object';
import {DataFormatError} from '../../shared/helper/DataFormatError';


@Injectable({
  providedIn: 'root'
})
export class ImportService {

  public namesToImport(data: string): string[] {
    return data.trim().split('\n');
  }


  public determineImportType(data: any): ExportImportType {
    if (!validateObject<ExportImportData>(data, dataValidator)) {
      throw new DataFormatError('Invalid data format');
    }

    return data.type;
  }

}

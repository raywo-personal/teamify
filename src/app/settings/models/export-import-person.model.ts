import {ObjectValidator, validateObject} from '../../shared/helper/validate-object';


export interface ExportImportPerson {
  id?: string;
  name: string;
}


export const exportImportPersonValidator: ObjectValidator<ExportImportPerson> = {
  id: (value: unknown) => typeof value === "string",
  name: (value: unknown) => typeof value === "string",
}


export function isPersonsArray(value: unknown): value is ExportImportPerson[] {
  if (!value || !Array.isArray(value)) return false;

  return value.every(item => validateObject<ExportImportPerson>(item, exportImportPersonValidator));
}

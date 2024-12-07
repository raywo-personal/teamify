import {Time} from '../../timeslots/models/time.model';


export type SortOrder = "asc" | "desc" | "none";


export function stringCompare(a: string,
                              b: string,
                              sortOrder: SortOrder = "asc"): number {
  return a.localeCompare(b) * direction(sortOrder);
}


export function timeCompare(a: Time,
                            b: Time,
                            sortOrder: SortOrder = "asc"): number {
  return a.compareTo(b) * direction(sortOrder);
}


function direction(sortOrder: SortOrder): number {
  return sortOrder === "asc" || sortOrder === "none" ? 1 : -1;
}

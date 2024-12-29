import {Time} from '../models/time.model';


export type SortOrder = "asc" | "desc" | "none";


export function stringCompare(a: string,
                              b: string,
                              sortOrder: SortOrder = "asc"): number {
  return a.localeCompare(b) * direction(sortOrder);
}


export function timeCompare(a: Time,
                            b: Time,
                            sortOrder: SortOrder = "asc"): number {
  if (a.hour !== b.hour) {
    return (a.hour - b.hour) * direction(sortOrder);
  }

  if (a.minute !== b.minute) {
    return (a.minute - b.minute) * direction(sortOrder);
  }

  return 0;
}


function direction(sortOrder: SortOrder): number {
  return sortOrder === "asc" || sortOrder === "none" ? 1 : -1;
}

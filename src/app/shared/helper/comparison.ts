import {Time} from '../../timeslots/models/time.model';


export type SortOrder = "asc" | "desc" | "none";

export function stringCompare(a: string,
                              b: string,
                              sortOrder: SortOrder = "asc"): number {
  if (sortOrder === "asc") {
    return a.localeCompare(b);
  }

  if (sortOrder === "desc") {
    return b.localeCompare(a);
  }

  return 0;
}


export function timeCompare(a: Time,
                            b: Time,
                            sortOrder: SortOrder = "asc"): number {
  if (sortOrder === "asc") {
    return a.compareTo(b);
  }

  if (sortOrder === "desc") {
    return b.compareTo(a);
  }

  return 0;
}

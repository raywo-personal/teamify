export interface TimeSlot {

  id?: string;
  description: string;

}


export function createTimeSlot(description: string): TimeSlot {
  return {
    id: crypto.randomUUID(),
    description
  };
}

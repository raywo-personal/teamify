import {Injectable} from '@angular/core';
import {createTimeSlot, TimeSlot} from '../models/time-slot.model';
import {DateTime} from 'luxon';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {
  private _slots: TimeSlot[] = [
    createTimeSlot(
      "Slot 1",
      DateTime.fromObject({hour: 9, minute: 0}),
      DateTime.fromObject({hour: 10, minute: 30})
    ),
    createTimeSlot(
      "Slot 2",
      DateTime.fromObject({hour: 10, minute: 45}),
      DateTime.fromObject({hour: 12, minute: 15})
    ),
    createTimeSlot(
      "Slot 3",
      DateTime.fromObject({hour: 13, minute: 15}),
      DateTime.fromObject({hour: 14, minute: 45})
    ),
    createTimeSlot(
      "Slot 4",
      DateTime.fromObject({hour: 15, minute: 0}),
      DateTime.fromObject({hour: 16, minute: 30})
    )
  ];


  private slotsSubject = new BehaviorSubject<TimeSlot[]>(this._slots);
  public readonly slots$ = this.slotsSubject.asObservable();


  public addSlot(slot: TimeSlot) {
    this.slots = this.slots.concat(slot);
  }


  public removeSlot(slot: TimeSlot) {
    this.slots = this.slots.splice(this.slots.indexOf(slot), 1);
  }


  private get slots() {
    return this.slotsSubject.getValue();
  }


  private set slots(value: TimeSlot[]) {
    this.slotsSubject.next(value);
  }
}

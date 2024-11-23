import {Injectable} from '@angular/core';
import {createTimeSlot, TimeSlot} from '../models/time-slot.model';
import {BehaviorSubject} from 'rxjs';
import {Time} from '../models/time.model';


@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {
  private _slots: TimeSlot[] = [
    createTimeSlot(
      "Slot 1",
      new Time(9),
      new Time(10, 30)
    ),
    createTimeSlot(
      "Slot 2",
      new Time(10, 45),
      new Time(12, 15)
    ),
    createTimeSlot(
      "Slot 3",
      new Time(13, 15),
      new Time(14, 45)
    ),
    createTimeSlot(
      "Slot 4",
      new Time(15),
      new Time(16, 30)
    ),
    createTimeSlot(
      "Slot 1",
      new Time(9),
      new Time(10, 30)
    ),
    createTimeSlot(
      "Slot 2",
      new Time(10, 45),
      new Time(12, 15)
    ),
    createTimeSlot(
      "Slot 3",
      new Time(13, 15),
      new Time(14, 45)
    ),
    createTimeSlot(
      "Slot 4",
      new Time(15),
      new Time(16, 30)
    ),
    createTimeSlot(
      "Slot 1",
      new Time(9),
      new Time(10, 30)
    ),
    createTimeSlot(
      "Slot 2",
      new Time(10, 45),
      new Time(12, 15)
    ),
    createTimeSlot(
      "Slot 3",
      new Time(13, 15),
      new Time(14, 45)
    ),
    createTimeSlot(
      "Slot 4",
      new Time(15),
      new Time(16, 30)
    ),
    createTimeSlot(
      "Slot 1",
      new Time(9),
      new Time(10, 30)
    ),
    createTimeSlot(
      "Slot 2",
      new Time(10, 45),
      new Time(12, 15)
    ),
    createTimeSlot(
      "Slot 3",
      new Time(13, 15),
      new Time(14, 45)
    ),
    createTimeSlot(
      "Slot 4",
      new Time(15),
      new Time(16, 30)
    )
  ];


  private slotsSubject = new BehaviorSubject<TimeSlot[]>(this._slots);
  public readonly slots$ = this.slotsSubject.asObservable();


  public addSlot(slot: TimeSlot) {
    this.slots = this.slots.concat(slot);
  }


  public updateSlot(slot: TimeSlot) {
    this.slots = this.slots.map(s => s.id === slot.id ? slot : s);
  }


  public removeSlot(slot: TimeSlot) {
    this.slots = this.slots.filter(s => s.id !== slot.id);
  }


  private get slots() {
    return this.slotsSubject.getValue();
  }


  private set slots(value: TimeSlot[]) {
    this.slotsSubject.next(value);
  }
}

import {Injectable} from '@angular/core';
import {createTimeSlot, TimeSlot} from '../models/time-slot.model';
import {BehaviorSubject, map, Observable, Subject} from 'rxjs';
import {Time} from '../models/time.model';


@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {

  // TODO: Remove fake data.
  private fakeSlots: TimeSlot[] = [
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


  private slotsSubject = new BehaviorSubject<TimeSlot[]>([]);
  public readonly slots$ = this.slotsSubject.asObservable();

  private slotAddedSubject = new Subject<TimeSlot>();
  public readonly slotAdded$ = this.slotAddedSubject.asObservable();
  private slotRemovedSubject = new Subject<TimeSlot>();
  public readonly slotRemoved$ = this.slotRemovedSubject.asObservable();
  private slotUpdatedSubject = new Subject<TimeSlot>();
  public readonly slotUpdated$ = this.slotUpdatedSubject.asObservable();


  public addSlot(slot: TimeSlot) {
    this.slots = this.slots.concat(slot);
    this.slotAddedSubject.next(slot);
  }


  public updateSlot(slot: TimeSlot) {
    this.slots = this.slots.map(s => s.id === slot.id ? slot : s);
    this.slotUpdatedSubject.next(slot);
  }


  public removeSlot(slot: TimeSlot) {
    this.slots = this.slots.filter(s => s.id !== slot.id);
    this.slotRemovedSubject.next(slot);
  }


  public createFakeData() {
    this.fakeSlots.forEach(slot => this.addSlot(slot));
  }


  public get slotCount$(): Observable<number> {
    return this.slots$
      .pipe(
        map(slots => slots.length)
      );
  }


  private get slots() {
    return this.slotsSubject.getValue();
  }


  private set slots(value: TimeSlot[]) {
    this.slotsSubject.next(value);
  }
}

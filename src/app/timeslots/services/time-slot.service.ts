import {Injectable} from '@angular/core';
import {TimeSlot} from '../models/time-slot.model';
import {BehaviorSubject, map, Observable, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {

  private slotsSubject = new BehaviorSubject<TimeSlot[]>([]);
  public readonly slots$ = this.slotsSubject.asObservable();

  private slotAddedSubject = new Subject<TimeSlot>();
  public readonly slotAdded$ = this.slotAddedSubject.asObservable();
  private slotRemovedSubject = new Subject<TimeSlot>();
  public readonly slotRemoved$ = this.slotRemovedSubject.asObservable();
  private slotUpdatedSubject = new Subject<TimeSlot>();
  public readonly slotUpdated$ = this.slotUpdatedSubject.asObservable();


  public addSlot(slot: TimeSlot, isRestore: boolean = false) {
    this.slots = this.slots.concat(slot);

    if (!isRestore) this.slotAddedSubject.next(slot);
  }


  public updateSlot(slot: TimeSlot) {
    this.slots = this.slots.map(s => s.id === slot.id ? slot : s);
    this.slotUpdatedSubject.next(slot);
  }


  public removeSlot(slot: TimeSlot) {
    this.slots = this.slots.filter(s => s.id !== slot.id);
    this.slotRemovedSubject.next(slot);
  }


  public get slotCount$(): Observable<number> {
    return this.slots$
      .pipe(
        map(slots => slots.length)
      );
  }


  public restoreSlots(slots: TimeSlot[]) {
    this.slots = slots;
  }


  public get slots() {
    return this.slotsSubject.getValue();
  }


  private set slots(value: TimeSlot[]) {
    this.slotsSubject.next(value);
  }
}

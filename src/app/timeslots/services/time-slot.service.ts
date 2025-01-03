import {inject, Injectable} from '@angular/core';
import {TimeSlot} from '../models/time-slot.model';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {defaultTimeSlots} from '../../shared/data/default-time-slots.data';
import {EventBusService} from '../../shared/event-bus/event-bus.service';
import {createBusEvent, EventType} from '../../shared/event-bus/event.model';


@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {

  private slotsSubject = new BehaviorSubject<TimeSlot[]>([]);
  public readonly slots$ = this.slotsSubject.asObservable();

  private eventBus = inject(EventBusService);


  public addSlot(slot: TimeSlot, isRestore: boolean = false) {
    this.slots = this.slots.concat(slot);

    if (!isRestore) {
      this.eventBus.emit(createBusEvent(EventType.SLOT_CREATED, slot));
    }
  }


  public updateSlot(slot: TimeSlot) {
    this.slots = this.slots.map(s => s.id === slot.id ? slot : s);
    this.eventBus.emit(createBusEvent(EventType.SLOT_UPDATED, slot));
  }


  public removeSlot(slot: TimeSlot) {
    this.slots = this.slots.filter(s => s.id !== slot.id);
    this.eventBus.emit(createBusEvent(EventType.SLOT_DELETED, slot));
  }


  public removeAllSlots() {
    this.slots = [];
    this.eventBus.emit(createBusEvent(EventType.SLOTS_RESET));
  }


  public addDefaultSet() {
    defaultTimeSlots.forEach(slot => this.addSlot(slot));
  }


  public get slotCount$(): Observable<number> {
    return this.slots$
      .pipe(
        map(slots => slots.length)
      );
  }


  public get slots() {
    return this.slotsSubject.getValue();
  }


  private set slots(value: TimeSlot[]) {
    this.slotsSubject.next(value);
  }
}

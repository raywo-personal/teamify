import {inject, Injectable} from '@angular/core';
import {createTimeSlot, TimeSlot} from '../models/time-slot.model';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {Time} from '../models/time.model';
import {TeamService} from '../../grouping/services/team.service';
import {createTeam} from '../../grouping/models/team.model';


@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {
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

  private teamService = inject(TeamService);

  private slotsSubject = new BehaviorSubject<TimeSlot[]>([]);
  public readonly slots$ = this.slotsSubject.asObservable();


  public addSlot(slot: TimeSlot) {
    this.slots = this.slots.concat(slot);
    this.teamService.addTeam(createTeam(slot.description, slot));
  }


  public updateSlot(slot: TimeSlot) {
    this.slots = this.slots.map(s => s.id === slot.id ? slot : s);
    this.teamService.updateTeamForSlot(slot);
  }


  public removeSlot(slot: TimeSlot) {
    this.slots = this.slots.filter(s => s.id !== slot.id);
    this.teamService.removeTeamForSlot(slot);
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

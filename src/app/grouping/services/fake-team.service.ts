import {inject, Injectable} from '@angular/core';
import {PersonService} from '../../persons/services/person.service';
import {TimeSlotService} from '../../timeslots/services/time-slot.service';
import {createTeam, Team} from '../models/team.model';
import {combineLatest} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FakeTeamService {

  private personService = inject(PersonService);
  private slotService = inject(TimeSlotService);

  private _teams: Team[] = [];


  constructor() {
    combineLatest([this.personService.persons$, this.slotService.slots$])
      .subscribe(([persons, slots]) => {
        const slotsCount = slots.length;
        this._teams = new Array(slotsCount)
          .fill(0)
          .map((_, i) => {
            return createTeam(slots[i].description, slots[i], [...persons]);
          });
      });
  }


  public get teams() {
    return this._teams;
  }
}

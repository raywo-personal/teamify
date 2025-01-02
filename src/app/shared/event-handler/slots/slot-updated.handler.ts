import {EventHandler} from '../event.handler';
import {TimeSlot} from '../../../timeslots/models/time-slot.model';
import {EventType} from '../../event-bus/event.model';
import {inject, Injectable} from '@angular/core';
import {TeamService} from '../../../teams/services/team.service';
import {PersonService} from '../../../persons/services/person.service';


@Injectable({
  providedIn: 'root'
})
export class SlotUpdatedHandler implements EventHandler<TimeSlot> {

  private teamService = inject(TeamService);
  private personService = inject(PersonService);

  public readonly eventType: EventType = EventType.SLOT_UPDATED;


  public handle(slot: TimeSlot) {
    this.teamService.updateTeamForSlot(slot);
    this.personService.persons.forEach(person => {
      person.timeSlots
        .filter(ts => ts.timeSlot.id === slot.id)
        .forEach(ts => ts.timeSlot = slot);
    });
  }

}

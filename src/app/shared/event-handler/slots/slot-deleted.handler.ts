import {EventHandler} from '../event.handler';
import {TimeSlot} from '../../../timeslots/models/time-slot.model';
import {TeamService} from '../../../teams/services/team.service';
import {PersonService} from '../../../persons/services/person.service';
import {inject, Injectable} from '@angular/core';
import {EventType} from '../../event-bus/event.model';


@Injectable({
  providedIn: 'root'
})
export class SlotDeletedHandler implements EventHandler<TimeSlot> {

  private teamService = inject(TeamService);
  private personService = inject(PersonService);

  public readonly eventType: EventType = EventType.SLOT_DELETED;


  public handle(slot: TimeSlot) {
    this.teamService.getTeamForSlot(slot)?.persons.forEach(person => {
      this.personService.addAvailablePerson(person);
    });

    this.teamService.removeTeamForSlot(slot);

    this.personService.persons.forEach(person => {
      person.timeSlots = person.timeSlots.filter(ts => ts.timeSlot.id !== slot.id);
    })
  }

}

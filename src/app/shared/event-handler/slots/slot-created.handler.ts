import {inject, Injectable} from '@angular/core';
import {TeamService} from '../../../teams/services/team.service';
import {EventHandler} from '../event.handler';
import {createTeam} from '../../../teams/models/team.model';
import {TimeSlot} from '../../../timeslots/models/time-slot.model';
import {EventType} from '../../event-bus/event.model';


@Injectable({
  providedIn: 'root'
})
export class SlotCreatedHandler implements EventHandler<TimeSlot> {

  private teamService = inject(TeamService);

  public readonly eventType: EventType = EventType.SLOT_CREATED;


  public handle(slot: TimeSlot) {
    this.teamService.addTeam(createTeam(slot.description, slot));
  }

}

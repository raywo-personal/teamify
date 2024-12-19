import {EventHandler} from '../event.handler';
import {TimeSlot} from '../../../timeslots/models/time-slot.model';
import {EventType} from '../../event-bus/event.model';
import {inject, Injectable} from '@angular/core';
import {TeamService} from '../../../teams/services/team.service';


@Injectable({
  providedIn: 'root'
})
export class SlotUpdatedHandler implements EventHandler<TimeSlot> {

  private teamService = inject(TeamService);
  public readonly eventType: EventType = EventType.SLOT_UPDATED;


  public handle(slot: TimeSlot) {
    this.teamService.updateTeamForSlot(slot);
  }

}

import {inject, Injectable} from '@angular/core';
import {EventHandler} from '../event.handler';
import {TeamService} from '../../../teams/services/team.service';
import {PersonService} from '../../../persons/services/person.service';
import {EventType} from '../../event-bus/event.model';


@Injectable({
  providedIn: 'root'
})
export class SlotResetHandler implements EventHandler<void> {

  private teamService = inject(TeamService);
  private personService = inject(PersonService);

  public readonly eventType: EventType = EventType.SLOTS_RESET;


  public handle() {
    this.teamService.removeAllTeams();
    this.personService.resetPersonsTimeSlots();
  }

}

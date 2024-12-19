import {inject, Injectable} from '@angular/core';
import {EventHandler} from '../event.handler';
import {EventType} from '../../event-bus/event.model';
import {PersonService} from '../../../persons/services/person.service';


@Injectable({
  providedIn: 'root'
})
export class TeamsResetHandler implements EventHandler<void> {

  private personService = inject(PersonService);

  public readonly eventType: EventType = EventType.TEAMS_RESET;


  public handle() {
    this.personService.resetAvailablePersons();
  }

}

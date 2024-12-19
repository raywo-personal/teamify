import {inject, Injectable} from '@angular/core';
import {Person} from '../../../persons/models/person.model';
import {EventHandler} from '../event.handler';
import {TeamService} from '../../../teams/services/team.service';
import {EventType} from '../../event-bus/event.model';


@Injectable({
  providedIn: 'root'
})
export class PersonDeletedHandler implements EventHandler<Person> {

  private teamService = inject(TeamService);

  public readonly eventType: EventType = EventType.PERSON_DELETED;


  public handle(person: Person) {
    this.teamService.teams.forEach(team => {
      this.teamService.removePersonFromTeam(team, person);
    });
  }

}

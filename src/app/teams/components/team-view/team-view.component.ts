import {Component, inject, input, output} from '@angular/core';
import {Team} from '../../models/team.model';
import {TimePipe} from '../../../timeslots/pipes/time.pipe';
import {PersonViewComponent} from '../../../persons/components/person-view/person-view.component';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList} from '@angular/cdk/drag-drop';
import {Person} from '../../../persons/models/person.model';
import {TeamService} from '../../services/team.service';
import {PersonService} from '../../../persons/services/person.service';


@Component({
  selector: 'app-team-view',
  imports: [
    TimePipe,
    PersonViewComponent,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder
  ],
  templateUrl: './team-view.component.html',
  styleUrl: './team-view.component.scss'
})
export class TeamViewComponent {

  private teamService = inject(TeamService);
  private personService = inject(PersonService);

  public team = input.required<Team>();
  public personDropped = output<Person>();


  onDrop(dropEvent: CdkDragDrop<Person[], any>) {
    const origin: string | undefined = dropEvent.item.data["origin"];
    const originTeam: Team | undefined = dropEvent.item.data["originTeam"];
    const person: Person = dropEvent.item.data["person"];

    if (origin === "available") {
      this.teamService.addToTeam(this.team(), person);
      this.personService.removeAvailablePerson(person);
    }

    if (originTeam && person) {
      this.teamService.moveBetweenTeams(originTeam, this.team(), person);
    }
  }
}

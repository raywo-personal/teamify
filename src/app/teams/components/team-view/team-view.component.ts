import {Component, inject, input, output} from '@angular/core';
import {Team} from '../../models/team.model';
import {TimePipe} from '../../../timeslots/pipes/time.pipe';
import {PersonViewComponent} from '../../../persons/components/person-view/person-view.component';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList} from '@angular/cdk/drag-drop';
import {Person} from '../../../persons/models/person.model';
import {TeamService} from '../../services/team.service';
import {PersonService} from '../../../persons/services/person.service';
import {TeamNameEditComponent} from '../team-name-edit/team-name-edit.component';
import {PersonDragData} from '../../../shared/models/person-drag-data';
import {bgCSSClass} from '../../../shared/data/default-colors.data';


@Component({
  selector: 'app-team-view',
  imports: [
    TimePipe,
    PersonViewComponent,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    TeamNameEditComponent
  ],
  templateUrl: './team-view.component.html',
  styleUrl: './team-view.component.scss'
})
export class TeamViewComponent {

  private teamService = inject(TeamService);
  private personService = inject(PersonService);

  public team = input.required<Team>();
  public personDropped = output<Person>();

  protected isEditing = false;

  protected readonly bgCSSClass = bgCSSClass;


  protected onDrop(dropEvent: CdkDragDrop<Person[], any, PersonDragData>) {
    const origin: string | undefined = dropEvent.item.data.origin;
    const originTeam: Team = dropEvent.item.data.originTeam;
    const person: Person = dropEvent.item.data.person;

    if (origin === "available") {
      this.teamService.addToTeam(this.team(), person);
      this.personService.removeAvailablePerson(person);
    }

    if (originTeam && person) {
      this.teamService.moveBetweenTeams(originTeam, this.team(), person);
    }
  }


  protected onEdit() {
    this.isEditing = true;
  }


  protected onEditConfirmed(newName: string) {
    this.isEditing = false;
    this.team().name = newName;
    this.teamService.updateTeam(this.team());
  }


  protected onEditCancelled() {
    this.isEditing = false;
  }

}

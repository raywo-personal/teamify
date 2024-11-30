import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {PersonService} from '../../../persons/services/person.service';
import {TeamViewComponent} from '../team-view/team-view.component';
import {TeamService} from '../../services/team.service';
import {PersonViewComponent} from '../../../persons/components/person-view/person-view.component';
import {CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import {Person} from '../../../persons/models/person.model';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-grouping',
  imports: [
    AsyncPipe,
    TeamViewComponent,
    PersonViewComponent,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './grouping.component.html',
  styleUrl: './grouping.component.scss'
})
export class GroupingComponent {

  // private timeSlotService = inject(TimeSlotService);
  // private knowledgeService = inject(PriorKnowledgeService);
  private personService = inject(PersonService);
  private teamService = inject(TeamService);

  protected persons$ = this.personService.persons$;
  protected teams$ = this.teamService.teams$;


  onDrop(dropEvent: CdkDragDrop<Observable<Person[]>, any>) {

  }
}

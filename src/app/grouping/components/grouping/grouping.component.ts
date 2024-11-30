import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {PersonService} from '../../../persons/services/person.service';
import {TeamViewComponent} from '../team-view/team-view.component';
import {TeamService} from '../../services/team.service';
import {PersonViewComponent} from '../../../persons/components/person-view/person-view.component';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Person} from '../../../persons/models/person.model';


@Component({
  selector: 'app-grouping',
  imports: [
    AsyncPipe,
    TeamViewComponent,
    PersonViewComponent,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder
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

  protected personSource: Person[] = [];
  protected personsInTeam = new Map<string, Person[]>();


  constructor() {
    this.persons$.subscribe(persons => this.personSource = persons);
    this.teams$.subscribe(teams => {
      for (const team of teams) {
        this.personsInTeam.set(team.id, team.persons);
      }
    })
  }


  onDrop(dropEvent: CdkDragDrop<Person[], any>) {
    console.log(
      "grouping: ", dropEvent.previousContainer.id,
      "in", dropEvent.container.id,
      "data", dropEvent.item
    );

    if (dropEvent.previousContainer === dropEvent.container) {
      moveItemInArray(dropEvent.container.data, dropEvent.previousIndex, dropEvent.currentIndex);
    } else {
      transferArrayItem(dropEvent.previousContainer.data,
        dropEvent.container.data,
        dropEvent.previousIndex,
        dropEvent.currentIndex);
    }
  }
}

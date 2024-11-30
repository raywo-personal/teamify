import {Component, input} from '@angular/core';
import {Team} from '../../models/team.model';
import {TimePipe} from '../../../timeslots/pipes/time.pipe';
import {PersonViewComponent} from '../../../persons/components/person-view/person-view.component';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Person} from '../../../persons/models/person.model';


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

  public team = input.required<Team>();


  onDrop(dropEvent: CdkDragDrop<Person[], any>) {
    console.log(
      'Dropped',
      dropEvent.previousContainer.id,
      'in',
      dropEvent.container.id)

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

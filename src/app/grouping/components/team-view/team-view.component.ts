import {Component, input} from '@angular/core';
import {Team} from '../../models/team.model';
import {TimePipe} from '../../../timeslots/pipes/time.pipe';
import {PersonViewComponent} from '../../../persons/components/person-view/person-view.component';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-team-view',
  imports: [
    TimePipe,
    PersonViewComponent,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './team-view.component.html',
  styleUrl: './team-view.component.scss'
})
export class TeamViewComponent {

  public team = input.required<Team>();

}

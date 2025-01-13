import {Component, input} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {Team} from '../../../teams/models/team.model';
import {TeamViewComponent} from '../../../teams/components/team-view/team-view.component';


@Component({
  selector: 'app-preview-team-list',
  imports: [
    AsyncPipe,
    TeamViewComponent
  ],
  templateUrl: './preview-team-list.component.html',
  styleUrl: './preview-team-list.component.scss'
})
export class PreviewTeamListComponent {

  public teams$ = input.required<Observable<Team[]>>();

}

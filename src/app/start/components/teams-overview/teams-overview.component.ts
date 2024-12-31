import {Component, inject} from '@angular/core';
import {TeamService} from '../../../teams/services/team.service';
import {AsyncPipe} from '@angular/common';
import {TeamViewComponent} from '../../../teams/components/team-view/team-view.component';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-teams-overview',
  imports: [
    AsyncPipe,
    TeamViewComponent,
    RouterLink
  ],
  templateUrl: './teams-overview.component.html',
  styleUrl: './teams-overview.component.scss'
})
export class TeamsOverviewComponent {

  private teamsService = inject(TeamService);

  protected teams$ = this.teamsService.teams$;
  protected teamsAreAssembled$ = this.teamsService.teamsAreAssembled$;

}

import {Component} from '@angular/core';
import {TeamsOverviewComponent} from '../teams-overview/teams-overview.component';
import {StepsComponent} from '../steps/steps.component';


@Component({
  selector: 'app-start',
  imports: [
    TeamsOverviewComponent,
    StepsComponent
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {


}

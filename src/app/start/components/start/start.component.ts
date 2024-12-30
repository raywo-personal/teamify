import {Component, inject} from '@angular/core';
import {StepComponent} from '../step/step.component';
import {TimeSlotService} from '../../../timeslots/services/time-slot.service';
import {PriorKnowledgeService} from '../../../prior-knowledge/services/prior-knowledge.service';
import {PersonService} from '../../../persons/services/person.service';
import {TeamService} from '../../../teams/services/team.service';


@Component({
  selector: 'app-start',
  imports: [
    StepComponent
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {

  private timeSlotService = inject(TimeSlotService);
  private knowledgeService = inject(PriorKnowledgeService);
  private personService = inject(PersonService);
  private teamService = inject(TeamService);

  protected step1IsDone = false;
  protected step2IsDone = false;
  protected step3IsDone = false;
  protected step4IsDone = false;


  constructor() {
    this.timeSlotService.slotCount$.subscribe(count => {
      this.step1IsDone = count > 0;
    });

    this.knowledgeService.knowledgeList$.subscribe(list => {
      this.step2IsDone = list.length > 0;
    });

    this.personService.personCount$.subscribe(count => {
      this.step3IsDone = count > 0;
    });

    this.teamService.teams$.subscribe(teams => {
      this.step4IsDone = teams.length > 0;
    });
  }

}

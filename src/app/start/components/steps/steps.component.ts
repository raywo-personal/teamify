import {Component, inject} from '@angular/core';
import {StepComponent} from '../step/step.component';
import {TimeSlotService} from '../../../timeslots/services/time-slot.service';
import {PriorKnowledgeService} from '../../../prior-knowledge/services/prior-knowledge.service';
import {PersonService} from '../../../persons/services/person.service';
import {TeamService} from '../../../teams/services/team.service';


@Component({
  selector: 'app-steps',
  imports: [
    StepComponent
  ],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss'
})
export class StepsComponent {

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

    this.teamService.teamsAreAssembled$.subscribe(isAssembled => {
      this.step4IsDone = isAssembled;
    });
  }


  protected get allDone(): boolean {
    return this.step1IsDone && this.step2IsDone && this.step3IsDone && this.step4IsDone;
  }

}

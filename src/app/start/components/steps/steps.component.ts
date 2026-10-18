import {Component, computed, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {StepComponent} from '../step/step.component';
import {TimeSlotService} from '../../../timeslots/services/time-slot.service';
import {PriorKnowledgeService} from '../../../prior-knowledge/services/prior-knowledge.service';
import {PersonService} from '../../../persons/services/person.service';
import {TeamService} from '../../../teams/services/team.service';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-steps',
  imports: [
    StepComponent,
    RouterLink
  ],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss'
})
export class StepsComponent {

  private timeSlotService = inject(TimeSlotService);
  private knowledgeService = inject(PriorKnowledgeService);
  private personService = inject(PersonService);
  private teamService = inject(TeamService);

  protected step1IsDone = toSignal(
    this.timeSlotService.slotCount$.pipe(map(count => count > 0)),
    {initialValue: false}
  );
  protected step2IsDone = toSignal(
    this.knowledgeService.knowledgeList$.pipe(map(list => list.length > 0)),
    {initialValue: false}
  );
  protected step3IsDone = toSignal(
    this.personService.personCount$.pipe(map(count => count > 0)),
    {initialValue: false}
  );
  protected step4IsDone = toSignal(this.teamService.teamsAreAssembled$, {initialValue: false});

  protected allDone = computed(() =>
    this.step1IsDone() && this.step2IsDone() && this.step3IsDone() && this.step4IsDone()
  );

}

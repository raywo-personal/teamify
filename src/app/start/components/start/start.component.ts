import {Component, inject} from '@angular/core';
import {StepComponent} from '../step/step.component';
import {TimeSlotService} from '../../../timeslots/services/time-slot.service';


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

}

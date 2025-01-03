import {Component, input} from '@angular/core';
import {TimeSlot} from '../../models/time-slot.model';
import {badgeCSSClass, tooltipCSSClass} from '../../../shared/data/default-colors.data';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {TimePipe} from '../../pipes/time.pipe';


@Component({
  selector: 'app-time-slot-pill',
  imports: [
    NgbTooltip,
    TimePipe
  ],
  templateUrl: './time-slot-pill.component.html',
  styleUrl: './time-slot-pill.component.scss'
})
export class TimeSlotPillComponent {

  public timeSlot = input.required<TimeSlot>();

  protected readonly badgeCSSClass = badgeCSSClass;
  protected readonly tooltipCSSClass = tooltipCSSClass;

}

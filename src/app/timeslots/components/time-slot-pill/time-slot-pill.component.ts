import {Component, HostBinding, input, OnInit} from '@angular/core';
import {TimeSlot} from '../../models/time-slot.model';
import {badgeCSSClass} from '../../../shared/data/default-colors.data';


@Component({
  selector: 'app-time-slot-pill',
  imports: [],
  templateUrl: './time-slot-pill.component.html',
  styleUrl: './time-slot-pill.component.scss'
})
export class TimeSlotPillComponent implements OnInit {

  public timeSlot = input.required<TimeSlot>();

  @HostBinding('class')
  public cssClass = "";

  public ngOnInit() {
    this.cssClass = badgeCSSClass(this.timeSlot().color);
  }
}

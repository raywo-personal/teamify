import {Component, input, Input} from '@angular/core';
import {TimeSlot} from '../../models/time-slot.model';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-time-slot-view',
  imports: [
    DatePipe
  ],
  templateUrl: './time-slot-view.component.html',
  styleUrl: './time-slot-view.component.scss'
})
export class TimeSlotViewComponent {

  public timeSlot = input.required<TimeSlot>();


  protected onEdit() {

  }


  protected onDelete() {

  }
}

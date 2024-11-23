import {Component, input} from '@angular/core';
import {TimeSlot} from '../../models/time-slot.model';
import {TimePipe} from '../../pipes/time.pipe';


@Component({
  selector: 'app-time-slot-view',
  imports: [
    TimePipe
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

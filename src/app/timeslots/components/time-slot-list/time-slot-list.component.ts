import {Component} from '@angular/core';
import {createTimeSlot, TimeSlot} from '../../models/time-slot.model';
import {DateTime} from 'luxon';
import {TimeSlotViewComponent} from '../time-slot-view/time-slot-view.component';


@Component({
  selector: 'app-time-slot-list',
  imports: [
    TimeSlotViewComponent
  ],
  templateUrl: './time-slot-list.component.html',
  styleUrl: './time-slot-list.component.scss'
})
export class TimeSlotListComponent {

  protected slots: TimeSlot[] = [
    createTimeSlot(
      "Slot 1",
      DateTime.fromObject({hour: 9, minute: 0}),
      DateTime.fromObject({hour: 10, minute: 30})
    ),
    createTimeSlot(
      "Slot 2",
      DateTime.fromObject({hour: 10, minute: 45}),
      DateTime.fromObject({hour: 12, minute: 15})
    ),
    createTimeSlot(
      "Slot 3",
      DateTime.fromObject({hour: 13, minute: 15}),
      DateTime.fromObject({hour: 14, minute: 45})
    ),
    createTimeSlot(
      "Slot 4",
      DateTime.fromObject({hour: 15, minute: 0}),
      DateTime.fromObject({hour: 16, minute: 30})
    )
  ];

}

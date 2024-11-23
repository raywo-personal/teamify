import { Component } from '@angular/core';
import {createTimeSlot, TimeSlot} from '../../models/time-slot.model';

@Component({
  selector: 'app-time-slot-list',
  imports: [],
  templateUrl: './time-slot-list.component.html',
  styleUrl: './time-slot-list.component.scss'
})
export class TimeSlotListComponent {

  protected slots: TimeSlot[] = [
    createTimeSlot("Slot 1: 9:00 - 10:30"),
    createTimeSlot("Slot 2: 10:45 - 12:15"),
    createTimeSlot("Slot 3: 13:15 - 14:45"),
    createTimeSlot("Slot 4: 15:00 - 16:30")
  ];

}

import {Component, input} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {TimeSlotViewComponent} from '../../../timeslots/components/time-slot-view/time-slot-view.component';
import {Observable} from 'rxjs';
import {TimeSlot} from '../../../timeslots/models/time-slot.model';


@Component({
  selector: 'app-preview-time-slot-list',
  imports: [
    AsyncPipe,
    TimeSlotViewComponent
  ],
  templateUrl: './preview-time-slot-list.component.html',
  styleUrl: './preview-time-slot-list.component.scss'
})
export class PreviewTimeSlotListComponent {

  public slots$ = input.required<Observable<TimeSlot[]>>()

}

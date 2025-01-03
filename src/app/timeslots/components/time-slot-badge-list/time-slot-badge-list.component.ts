import {Component, inject} from '@angular/core';
import {TimeSlotService} from '../../services/time-slot.service';
import {TimeSlotPillComponent} from '../time-slot-pill/time-slot-pill.component';
import {AsyncPipe} from '@angular/common';


@Component({
  selector: 'app-time-slot-badge-list',
  imports: [
    TimeSlotPillComponent,
    AsyncPipe
  ],
  templateUrl: './time-slot-badge-list.component.html',
  styleUrl: './time-slot-badge-list.component.scss'
})
export class TimeSlotBadgeListComponent {

  private slotService = inject(TimeSlotService);

  protected slots$ = this.slotService.slots$;

}

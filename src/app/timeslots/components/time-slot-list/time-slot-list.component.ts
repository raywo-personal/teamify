import {Component, inject} from '@angular/core';
import {TimeSlotViewComponent} from '../time-slot-view/time-slot-view.component';
import {TimeSlotService} from '../../services/time-slot.service';
import {AsyncPipe} from '@angular/common';


@Component({
  selector: 'app-time-slot-list',
  imports: [
    TimeSlotViewComponent,
    AsyncPipe
  ],
  templateUrl: './time-slot-list.component.html',
  styleUrl: './time-slot-list.component.scss'
})
export class TimeSlotListComponent {

  private slotService = inject(TimeSlotService);

  protected slots$ = this.slotService.slots$;


  protected onAdd() {

  }
}

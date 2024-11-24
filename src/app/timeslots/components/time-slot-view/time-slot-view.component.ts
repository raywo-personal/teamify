import {Component, input, output} from '@angular/core';
import {TimeSlot} from '../../models/time-slot.model';
import {TimePipe} from '../../pipes/time.pipe';
import {DeleteButtonComponent} from '../../../shared/components/delete-button/delete-button.component';


@Component({
  selector: 'app-time-slot-view',
  imports: [
    TimePipe,
    DeleteButtonComponent
  ],
  templateUrl: './time-slot-view.component.html',
  styleUrl: './time-slot-view.component.scss'
})
export class TimeSlotViewComponent {

  public timeSlot = input.required<TimeSlot>();
  public edit = output<TimeSlot>();
  public delete = output<TimeSlot>();


  protected onEdit(event: MouseEvent) {
    event.stopPropagation();
    this.edit.emit(this.timeSlot());
  }


  protected onDelete() {
    this.delete.emit(this.timeSlot());
  }
}

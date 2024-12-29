import {Component, input, output} from '@angular/core';
import {TimeSlot} from '../../models/time-slot.model';
import {TimePipe} from '../../pipes/time.pipe';
import {DeleteButtonComponent} from '../../../shared/components/delete-button/delete-button.component';
import {CdkDragHandle} from '@angular/cdk/drag-drop';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-time-slot-view',
  imports: [
    TimePipe,
    DeleteButtonComponent,
    CdkDragHandle,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem
  ],
  templateUrl: './time-slot-view.component.html',
  styleUrl: './time-slot-view.component.scss'
})
export class TimeSlotViewComponent {

  public timeSlot = input.required<TimeSlot>();
  public showButtons = input(true);
  public showDragHandle = input(false);
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

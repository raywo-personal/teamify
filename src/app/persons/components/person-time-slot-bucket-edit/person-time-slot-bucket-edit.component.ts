import {Component, input, output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {PersonTimeSlotBucketForm} from '../../models/person-form.model';
import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {TimeSlotViewComponent} from '../../../timeslots/components/time-slot-view/time-slot-view.component';
import {TimeSlot} from '../../../timeslots/models/time-slot.model';
import {TimeSlotDragData} from '../../models/time-slot-drag-data.model';
import {SetCustomValidityDirective} from '../../../shared/directives/set-custom-validity.directive';


@Component({
  selector: 'app-person-time-slot-bucket-edit',
  imports: [
    CdkDropList,
    CdkDrag,
    TimeSlotViewComponent,
    ReactiveFormsModule,
    SetCustomValidityDirective
  ],
  templateUrl: './person-time-slot-bucket-edit.component.html',
  styleUrl: './person-time-slot-bucket-edit.component.scss'
})
export class PersonTimeSlotBucketEditComponent {

  public timeSlotForm = input.required<FormGroup<PersonTimeSlotBucketForm>>();
  public slotDropped = output<CdkDragDrop<number, any, TimeSlotDragData>>();


  protected get priority(): number {
    return this.timeSlotForm().controls.priority.value;
  }


  protected get slots(): TimeSlot[] {
    return this.timeSlotForm().controls.slots.value;
  }


  protected onSlotDropped(dragEvent: CdkDragDrop<number, any, TimeSlotDragData>) {
    this.slotDropped.emit(dragEvent);
  }
}

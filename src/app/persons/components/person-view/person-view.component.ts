import {Component, computed, input, output} from '@angular/core';
import {Person} from '../../models/person.model';
import {DeleteButtonComponent} from '../../../shared/components/delete-button/delete-button.component';
import {PersonTimeSlot} from '../../models/person-timeslot.model';
import {CdkDragHandle} from '@angular/cdk/drag-drop';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-person-view',
  imports: [
    DeleteButtonComponent,
    CdkDragHandle,
    NgbPopover
  ],
  templateUrl: './person-view.component.html',
  styleUrl: './person-view.component.scss'
})
export class PersonViewComponent {

  public person = input.required<Person>();
  public showButtons = input(true);
  public showDragHandle = input(false);
  public edit = output<Person>();
  public delete = output<Person>();

  protected slots = computed(() => {
    const person = this.person();
    let slotBuckets = new Map<number, PersonTimeSlot[]>();

    person.timeSlots.forEach(slot => {
      const priority = slot.priority || 0;
      let slots = slotBuckets.get(priority) || [];
      slots.push(slot);
      slots = slots.sort((a, b) => {
        return a.timeSlot.description.localeCompare(b.timeSlot.description)
      });
      slotBuckets.set(priority, slots);
    })

    return slotBuckets;
  });


  protected get slotKeys(): number[] {
    return [...this.slots().keys()].sort((a, b) => a - b);
  }


  protected onEdit(event: MouseEvent) {
    event.stopPropagation();
    this.edit.emit(this.person());
  }


  protected onDelete() {
    this.delete.emit(this.person());
  }
}

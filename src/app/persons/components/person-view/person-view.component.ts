import {Component, computed, input, output} from '@angular/core';
import {Person} from '../../models/person.model';
import {DeleteButtonComponent} from '../../../shared/components/delete-button/delete-button.component';
import {PersonTimeSlot} from '../../models/person-timeslot.model';
import {CdkDragHandle} from '@angular/cdk/drag-drop';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {timeCompare} from '../../../shared/helper/comparison';
import {PriorKnowledgePillComponent} from '../../../prior-knowledge/components/prior-knowledge-pill/prior-knowledge-pill.component';
import {dotCSSClass, tooltipCSSClass} from '../../../shared/data/default-colors.data';
import {TimeSlotPillComponent} from '../../../timeslots/components/time-slot-pill/time-slot-pill.component';


@Component({
  selector: 'app-person-view',
  imports: [
    DeleteButtonComponent,
    CdkDragHandle,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem,
    PriorKnowledgePillComponent,
    NgbTooltip,
    TimeSlotPillComponent
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

  protected readonly dotCSSClass = dotCSSClass;
  protected readonly tooltipCSSClass = tooltipCSSClass;


  protected slots = computed(() => {
    const person = this.person();

    const slotBuckets = new Map<number, PersonTimeSlot[]>();

    person.timeSlots.forEach(slot => {
      const priority = slot.priority || 0;
      let slots = slotBuckets.get(priority) || [];
      slots.push(slot);
      slots = slots.sort((a, b) => {
        return timeCompare(a.timeSlot.start, b.timeSlot.start);
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

import {Component, computed, input, output} from '@angular/core';
import {Person} from '../../models/person.model';
import {DeleteButtonComponent} from '../../../shared/components/delete-button/delete-button.component';


@Component({
  selector: 'app-person-view',
  imports: [
    DeleteButtonComponent
  ],
  templateUrl: './person-view.component.html',
  styleUrl: './person-view.component.scss'
})
export class PersonViewComponent {

  public person = input.required<Person>();
  public edit = output<Person>();
  public delete = output<Person>();

  protected slots = computed(() => {
    const person = this.person();
    return person
      .timeSlots
      .sort((a, b) => {
        const aPriority = a.priority || -1;
        const bPriority = b.priority || -1;

        return aPriority - bPriority;
      })
  })


  protected onEdit(event: MouseEvent) {
    event.stopPropagation();
    this.edit.emit(this.person());
  }


  protected onDelete() {
    this.delete.emit(this.person());
  }
}

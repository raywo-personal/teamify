import {Component, inject, TemplateRef} from '@angular/core';
import {PersonService} from '../../services/person.service';
import {AsyncPipe} from '@angular/common';
import {PersonViewComponent} from '../person-view/person-view.component';
import {NgbOffcanvas, NgbOffcanvasOptions} from '@ng-bootstrap/ng-bootstrap';
import {createPerson, Person} from '../../models/person.model';
import {PersonEditComponent} from '../person-edit/person-edit.component';
import {TimeSlotService} from "../../../timeslots/services/time-slot.service";
import {DataNotAvailableViewComponent} from "../../../shared/components/data-not-available-view/data-not-available-view.component";
import {DataNotAvailableInfoComponent} from "../../../shared/components/data-not-available-info/data-not-available-info.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddButtonComponent} from '../../../shared/components/add-button/add-button.component';
import {PersonSortButtonsComponent} from '../../../shared/components/person-sort-buttons/person-sort-buttons.component';
import {PersonSlotFilterComponent} from '../../../shared/components/person-slot-filter/person-slot-filter.component';
import {SearchFieldComponent} from '../../../shared/components/search-field/search-field.component';
import {map} from 'rxjs';
import {DeleteButtonComponent} from '../../../shared/components/delete-button/delete-button.component';


@Component({
  selector: 'app-person-list',
  imports: [
    AsyncPipe,
    PersonViewComponent,
    PersonEditComponent,
    DataNotAvailableViewComponent,
    DataNotAvailableInfoComponent,
    ReactiveFormsModule,
    FormsModule,
    AddButtonComponent,
    PersonSortButtonsComponent,
    PersonSlotFilterComponent,
    SearchFieldComponent,
    DeleteButtonComponent
  ],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent {

  private personService = inject(PersonService);
  private slotService = inject(TimeSlotService);
  private offcanvas = inject(NgbOffcanvas);

  protected personsCount$ = this.personService.personCount$;
  protected filteredPersons$ = this.personService.filteredPersons$;
  protected filterSource$ = this.filteredPersons$
    .pipe(map(persons => persons.map(p => p.name)));
  protected slotCount$ = this.slotService.slotCount$;
  protected personToEdit?: Person;
  protected offcanvasTitle: string = "";
  protected edit = false;


  protected onEditCancelled() {
    this.offcanvas.dismiss("cancelled");
  }


  protected onEditSaved() {
    this.offcanvas.dismiss("saved");
  }


  protected onAdd(content: TemplateRef<any>) {
    this.personToEdit = createPerson("");
    this.edit = false;
    this.openOffcanvas(content, "Add new person");
  }


  protected onEdit(content: TemplateRef<any>, person: Person) {
    this.personToEdit = person;
    this.edit = true;
    this.openOffcanvas(content, "Edit person");
  }


  protected onDelete(person: Person) {
    this.personService.removePerson(person);
  }


  protected onDeleteAll() {
    this.personService.removeAllPersons();
  }


  private openOffcanvas(content: TemplateRef<any>, title: string) {
    this.offcanvasTitle = title;

    const options: NgbOffcanvasOptions = {
      ariaLabelledBy: title,
      position: "end",
      backdropClass: "offcanvas-backdrop",
      panelClass: "person-offcanvas"
    };

    this.offcanvas.open(content, options);
  }
}

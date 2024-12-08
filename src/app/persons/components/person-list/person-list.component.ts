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
import {PersonSearchComponent} from '../../../shared/components/person-search/person-search.component';
import {map, mergeMap, Subject} from 'rxjs';


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
    PersonSearchComponent
  ],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent {

  private personService = inject(PersonService);
  private slotService = inject(TimeSlotService);
  private offcanvas = inject(NgbOffcanvas);
  private searchTerm = new Subject<string>();

  protected persons$ = this.personService.persons$;
  protected filteredPersons$ = this.personService.filteredPersons$
    .pipe(
      mergeMap(persons => {
        return this.searchTerm
          .pipe(
            map((term) => {
              if (term === "") {
                return persons
              }

              return persons.filter((p) => p.name.toLowerCase().includes(term.toLowerCase()))
            })
          )
      })
    );
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


  protected onSearch(term: string) {
    this.searchTerm.next(term);
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

import {AfterViewInit, Component, inject, TemplateRef, ViewChild} from '@angular/core';
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
import {ActivatedRoute} from '@angular/router';


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
export class PersonListComponent implements AfterViewInit {

  private personService = inject(PersonService);
  private slotService = inject(TimeSlotService);
  private offcanvas = inject(NgbOffcanvas);
  private route = inject(ActivatedRoute);

  @ViewChild("content")
  protected content!: TemplateRef<unknown>;

  protected personsCount$ = this.personService.personCount$;
  protected filteredPersons$ = this.personService.filteredPersons$;
  protected filterSource$ = this.filteredPersons$
    .pipe(map(persons => persons.map(p => p.name)));
  protected slotCount$ = this.slotService.slotCount$;
  protected personToEdit?: Person;
  protected offcanvasTitle = "";
  protected edit = false;


  public ngAfterViewInit() {
    if (this.route.snapshot.queryParams["new"]) {
      this.resetPath();
      this.onAdd(this.content);
    }
  }


  protected onEditCancelled() {
    this.offcanvas.dismiss("cancelled");
  }


  protected onEditSaved() {
    this.offcanvas.dismiss("saved");
  }


  protected onAdd(content: TemplateRef<unknown>) {
    this.personToEdit = createPerson("");
    this.edit = false;
    this.openOffcanvas(content, $localize`:this title is used for the add UI@@t.addNewPersonTitle:Add new person`);
  }


  protected onEdit(content: TemplateRef<unknown>, person: Person) {
    this.personToEdit = person;
    this.edit = true;
    this.openOffcanvas(content, $localize`:this title is used for the edit UI@@p.addNewPersonTitle:Edit person`);
  }


  protected onDelete(person: Person) {
    this.personService.removePerson(person);
  }


  protected onDeleteAll() {
    this.personService.removeAllPersons();
  }


  private openOffcanvas(content: TemplateRef<unknown>, title: string) {
    this.offcanvasTitle = title;

    const options: NgbOffcanvasOptions = {
      ariaLabelledBy: title,
      position: "end",
      backdropClass: "offcanvas-backdrop",
      panelClass: "person-offcanvas"
    };

    this.offcanvas.open(content, options);
  }


  private resetPath() {
    window.history.replaceState(null, "", window.location.pathname);
  }

}

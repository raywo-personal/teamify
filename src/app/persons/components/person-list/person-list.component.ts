import {Component, inject, TemplateRef} from '@angular/core';
import {PersonService} from '../../services/person.service';
import {AsyncPipe} from '@angular/common';
import {PersonViewComponent} from '../person-view/person-view.component';
import {NgbOffcanvas, NgbOffcanvasOptions} from '@ng-bootstrap/ng-bootstrap';
import {createPerson, Person} from '../../models/person.model';
import {PersonEditComponent} from '../person-edit/person-edit.component';
import {AddHeaderBarComponent} from '../../../shared/components/add-header-bar/add-header-bar.component';


@Component({
  selector: 'app-person-list',
  imports: [
    AsyncPipe,
    PersonViewComponent,
    PersonEditComponent,
    AddHeaderBarComponent
  ],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent {

  private personService = inject(PersonService);
  private offcanvas = inject(NgbOffcanvas);

  protected persons$ = this.personService.persons$;
  protected personToEdit?: Person;
  protected canvasTitle: string = "";
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


  private openOffcanvas(content: TemplateRef<any>, title: string) {
    this.canvasTitle = title;

    const options: NgbOffcanvasOptions = {
      ariaLabelledBy: title,
      position: "end",
      backdropClass: "offcanvas-backdrop",
      panelClass: "person-offcanvas"
    };

    this.offcanvas.open(content, options);
  }
}

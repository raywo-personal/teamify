import {Component} from '@angular/core';
import {createPerson, Person} from '../../../persons/models/person.model';
import {PersonEditComponent} from '../../../persons/components/person-edit/person-edit.component';
import {AddHeaderBarComponent} from '../../../shared/components/add-header-bar/add-header-bar.component';
import {PersonViewComponent} from '../../../persons/components/person-view/person-view.component';


@Component({
  selector: 'app-start',
  imports: [
    PersonEditComponent,
    AddHeaderBarComponent,
    PersonViewComponent
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {

  protected person = createPerson("");


  onSaved(person: Person) {
    this.person = person;
  }
}

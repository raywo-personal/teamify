import {Component, inject} from '@angular/core';
import {PersonEditComponent} from '../../../persons/components/person-edit/person-edit.component';
import {PersonService} from '../../../persons/services/person.service';


@Component({
  selector: 'app-start',
  imports: [
    PersonEditComponent
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {

  private personService = inject(PersonService);
  protected person = this.personService.persons[0];
  // protected person = createPerson("");
}

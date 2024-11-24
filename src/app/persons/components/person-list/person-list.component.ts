import {Component, inject} from '@angular/core';
import {PersonService} from '../../services/person.service';
import {AsyncPipe} from '@angular/common';
import {PersonViewComponent} from '../person-view/person-view.component';

@Component({
  selector: 'app-person-list',
  imports: [
    AsyncPipe,
    PersonViewComponent
  ],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent {

  private personService = inject(PersonService);

  protected persons$ = this.personService.persons$;

}

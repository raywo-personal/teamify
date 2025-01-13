import {Component, input} from '@angular/core';
import {Observable} from 'rxjs';
import {Person} from '../../../persons/models/person.model';
import {AsyncPipe} from '@angular/common';
import {PersonViewComponent} from '../../../persons/components/person-view/person-view.component';


@Component({
  selector: 'app-preview-person-list',
  imports: [
    AsyncPipe,
    PersonViewComponent
  ],
  templateUrl: './preview-person-list.component.html',
  styleUrl: './preview-person-list.component.scss'
})
export class PreviewPersonListComponent {

  public persons$ = input.required<Observable<Person[]>>();

}

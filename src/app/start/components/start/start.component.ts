import { Component } from '@angular/core';
import {createPriorKnowledge} from "../../../prior-knowledge/models/prior-knowledge.model";
import {PriorKnowledgeEditComponent} from "../../../prior-knowledge/components/prior-knowledge-edit/prior-knowledge-edit.component";
import {createPerson} from '../../../persons/models/person.model';
import {PersonEditComponent} from '../../../persons/components/person-edit/person-edit.component';
import {AddHeaderBarComponent} from '../../../shared/components/add-header-bar/add-header-bar.component';

@Component({
  selector: 'app-start',
  imports: [
    PriorKnowledgeEditComponent,
    PersonEditComponent,
    AddHeaderBarComponent
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {

  protected person = createPerson("");

}

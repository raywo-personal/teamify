import { Component } from '@angular/core';
import {createPriorKnowledge} from "../../../prior-knowledge/models/prior-knowledge.model";
import {PriorKnowledgeEditComponent} from "../../../prior-knowledge/components/prior-knowledge-edit/prior-knowledge-edit.component";

@Component({
  selector: 'app-start',
  imports: [
    PriorKnowledgeEditComponent
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {

  protected knowledge = createPriorKnowledge("");

}

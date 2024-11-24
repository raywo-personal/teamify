import {Component, input, output} from '@angular/core';
import {PriorKnowledge} from '../../models/prior-knowledge.model';


@Component({
  selector: 'app-prior-knowledge-view',
  imports: [],
  templateUrl: './prior-knowledge-view.component.html',
  styleUrl: './prior-knowledge-view.component.scss'
})
export class PriorKnowledgeViewComponent {

  public knowledge = input.required<PriorKnowledge>();
  public edit = output<PriorKnowledge>();
  public delete = output<PriorKnowledge>();

}

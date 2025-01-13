import {Component, input} from '@angular/core';
import {Observable} from 'rxjs';
import {PriorKnowledge} from '../../../prior-knowledge/models/prior-knowledge.model';
import {AsyncPipe} from '@angular/common';
import {PriorKnowledgeViewComponent} from '../../../prior-knowledge/components/prior-knowledge-view/prior-knowledge-view.component';


@Component({
  selector: 'app-preview-prior-knowledge-list',
  imports: [
    AsyncPipe,
    PriorKnowledgeViewComponent
  ],
  templateUrl: './preview-prior-knowledge-list.component.html',
  styleUrl: './preview-prior-knowledge-list.component.scss'
})
export class PreviewPriorKnowledgeListComponent {

  public knowledge$ = input.required<Observable<PriorKnowledge[]>>();

}

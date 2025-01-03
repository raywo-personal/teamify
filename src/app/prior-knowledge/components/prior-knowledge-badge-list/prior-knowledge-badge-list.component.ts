import {Component, inject} from '@angular/core';
import {PriorKnowledgeService} from '../../services/prior-knowledge.service';
import {AsyncPipe} from '@angular/common';
import {PriorKnowledgePillComponent} from '../prior-knowledge-pill/prior-knowledge-pill.component';


@Component({
  selector: 'app-prior-knowledge-badge-list',
  imports: [
    AsyncPipe,
    PriorKnowledgePillComponent
  ],
  templateUrl: './prior-knowledge-badge-list.component.html',
  styleUrl: './prior-knowledge-badge-list.component.scss'
})
export class PriorKnowledgeBadgeListComponent {

  private knowledgeService = inject(PriorKnowledgeService);

  protected knowledgeList$ = this.knowledgeService.knowledgeList$;

}

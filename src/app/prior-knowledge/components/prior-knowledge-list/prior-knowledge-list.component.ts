import {Component, inject, TemplateRef} from '@angular/core';
import {PriorKnowledgeService} from '../../services/prior-knowledge.service';
import {AsyncPipe} from '@angular/common';
import {PriorKnowledgeViewComponent} from '../prior-knowledge-view/prior-knowledge-view.component';
import {PriorKnowledge} from '../../models/prior-knowledge.model';


@Component({
  selector: 'app-prior-knowledge-list',
  imports: [
    AsyncPipe,
    PriorKnowledgeViewComponent
  ],
  templateUrl: './prior-knowledge-list.component.html',
  styleUrl: './prior-knowledge-list.component.scss'
})
export class PriorKnowledgeListComponent {

  private knowledgeService = inject(PriorKnowledgeService);

  protected knowledgeList$ = this.knowledgeService.knowledgeList$;
  protected canvasTitle: string = "";
  protected edit = false;


  protected onAdd(content: TemplateRef<any>) {

  }


  protected onEdit(content: TemplateRef<any>, knowledge: PriorKnowledge) {

  }


  protected onDelete(knowledge: PriorKnowledge) {

  }
}

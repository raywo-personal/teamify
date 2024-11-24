import {Component, inject, TemplateRef} from '@angular/core';
import {PriorKnowledgeService} from '../../services/prior-knowledge.service';
import {AsyncPipe} from '@angular/common';


@Component({
  selector: 'app-prior-knowledge-list',
  imports: [
    AsyncPipe
  ],
  templateUrl: './prior-knowledge-list.component.html',
  styleUrl: './prior-knowledge-list.component.scss'
})
export class PriorKnowledgeListComponent {

  private knowledgeService = inject(PriorKnowledgeService);

  protected knowledgeList$ = this.knowledgeService.knowledgeList$;
  protected canvasTitle: string = "";
  protected edit = false;


  onAdd(content: TemplateRef<any>) {

  }
}

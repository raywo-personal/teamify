import {Component, input, output, TemplateRef} from '@angular/core';
import {PriorKnowledge} from '../../models/prior-knowledge.model';
import {DeleteButtonComponent} from '../../../shared/components/delete-button/delete-button.component';


@Component({
  selector: 'app-prior-knowledge-view',
  imports: [
    DeleteButtonComponent
  ],
  templateUrl: './prior-knowledge-view.component.html',
  styleUrl: './prior-knowledge-view.component.scss'
})
export class PriorKnowledgeViewComponent {

  public knowledge = input.required<PriorKnowledge>();
  public edit = output<PriorKnowledge>();
  public delete = output<PriorKnowledge>();

  protected canvasTitle: string = "";


  protected onEdit(content: TemplateRef<any>, event: MouseEvent) {
    event.stopPropagation();
  }


  protected onDelete() {
    this.delete.emit(this.knowledge());
  }
}

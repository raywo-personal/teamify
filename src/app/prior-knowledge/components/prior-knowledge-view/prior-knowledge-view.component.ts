import {Component, input, output} from '@angular/core';
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
  public showButtons = input(true);
  public edit = output<PriorKnowledge>();
  public delete = output<PriorKnowledge>();


  protected onEdit(event: MouseEvent) {
    event.stopPropagation();
    this.edit.emit(this.knowledge());
  }


  protected onDelete() {
    this.delete.emit(this.knowledge());
  }
}

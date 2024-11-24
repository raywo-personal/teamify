import {Component, effect, inject, input, output} from '@angular/core';
import {PriorKnowledge} from '../../models/prior-knowledge.model';
import {FormsModule} from '@angular/forms';
import {PriorKnowledgeService} from '../../services/prior-knowledge.service';


@Component({
  selector: 'app-prior-knowledge-edit',
  imports: [
    FormsModule
  ],
  templateUrl: './prior-knowledge-edit.component.html',
  styleUrl: './prior-knowledge-edit.component.scss'
})
export class PriorKnowledgeEditComponent {

  public knowledge = input<PriorKnowledge>();
  public edit = input<boolean>(false);
  public saved = output<PriorKnowledge>();
  public cancelled = output<void>();

  protected name: string = "";
  protected description: string = "";

  private knowledgeService = inject(PriorKnowledgeService);


  constructor() {
    effect(() => {
      const knowledge = this.knowledge();

      if (knowledge) {
        this.name = knowledge.name;
        this.description = knowledge.description;
      }
    });
  }


  protected onSubmit() {
    const knowledge = {
      id: this.knowledge()?.id,
      name: this.name,
      description: this.description
    }

    if (this.edit()) {
      this.knowledgeService.updateKnowledge(knowledge);
    } else {
      this.knowledgeService.addKnowledge(knowledge);
    }

    this.saved.emit(knowledge);
  }


  onCancel() {
    this.cancelled.emit();
  }
}

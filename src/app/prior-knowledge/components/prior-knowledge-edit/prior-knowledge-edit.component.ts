import {Component, effect, inject, input, output} from '@angular/core';
import {PriorKnowledge} from '../../models/prior-knowledge.model';
import {FormsModule} from '@angular/forms';
import {PriorKnowledgeService} from '../../services/prior-knowledge.service';
import {colors, dotCSSClass, fgCSSClass} from '../../../shared/data/default-colors.data';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-prior-knowledge-edit',
  imports: [
    FormsModule,
    NgbTooltip
  ],
  templateUrl: './prior-knowledge-edit.component.html',
  styleUrl: './prior-knowledge-edit.component.scss'
})
export class PriorKnowledgeEditComponent {

  private knowledgeService = inject(PriorKnowledgeService);

  public knowledge = input<PriorKnowledge>();
  public edit = input<boolean>(false);
  public saved = output<PriorKnowledge>();
  public cancelled = output<void>();

  protected name: string = "";
  protected description: string = "";
  protected color: string = "gray";

  protected readonly colors = colors;
  protected readonly dotCSSClass = dotCSSClass;
  protected readonly fgCSSClass = fgCSSClass;


  constructor() {
    effect(() => {
      const knowledge = this.knowledge();

      if (knowledge) {
        this.name = knowledge.name;
        this.description = knowledge.description;
        this.color = knowledge.color;
      }
    });
  }


  protected onSubmit() {
    const knowledge: PriorKnowledge = {
      id: this.knowledge()?.id,
      name: this.name,
      description: this.description,
      color: this.color
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


  protected onColorSelected(color: string) {
    this.color = color;
  }


  protected onColorKeySelected(keyboardEvent: KeyboardEvent, color: string) {
    if (keyboardEvent.code === "Space") {
      this.onColorSelected(color);
    }
  }
}

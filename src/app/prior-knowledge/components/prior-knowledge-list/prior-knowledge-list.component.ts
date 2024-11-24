import {Component, inject, TemplateRef} from '@angular/core';
import {PriorKnowledgeService} from '../../services/prior-knowledge.service';
import {AsyncPipe} from '@angular/common';
import {PriorKnowledgeViewComponent} from '../prior-knowledge-view/prior-knowledge-view.component';
import {createPriorKnowledge, PriorKnowledge} from '../../models/prior-knowledge.model';
import {NgbOffcanvas, NgbOffcanvasOptions} from '@ng-bootstrap/ng-bootstrap';
import {PriorKnowledgeEditComponent} from '../prior-knowledge-edit/prior-knowledge-edit.component';
import {AddHeaderBarComponent} from '../../../shared/components/add-header-bar/add-header-bar.component';


@Component({
  selector: 'app-prior-knowledge-list',
  imports: [
    AsyncPipe,
    PriorKnowledgeViewComponent,
    PriorKnowledgeEditComponent,
    AddHeaderBarComponent
  ],
  templateUrl: './prior-knowledge-list.component.html',
  styleUrl: './prior-knowledge-list.component.scss'
})
export class PriorKnowledgeListComponent {

  private knowledgeService = inject(PriorKnowledgeService);
  private offcanvas = inject(NgbOffcanvas);

  protected knowledgeList$ = this.knowledgeService.knowledgeList$;
  protected knowledgeToEdit?: PriorKnowledge;
  protected canvasTitle: string = "";
  protected edit = false;


  protected onAdd(content: TemplateRef<any>) {
    this.knowledgeToEdit = createPriorKnowledge("");
    this.edit = false;
    this.openOffcanvas(content, "Add new prior knowledge");
  }


  protected onEdit(content: TemplateRef<any>, knowledge: PriorKnowledge) {
    this.edit = true
    this.knowledgeToEdit = knowledge;
    this.openOffcanvas(content, "Edit prior knowledge");
  }


  protected onDelete(knowledge: PriorKnowledge) {
    this.knowledgeService.removeKnowledge(knowledge);
  }


  protected onEditCancelled() {
    this.offcanvas.dismiss("cancelled");
  }


  protected onEditSaved() {
    this.offcanvas.dismiss("saved");
  }


  private openOffcanvas(content: TemplateRef<any>, title: string) {
    this.canvasTitle = title;

    const options: NgbOffcanvasOptions = {
      ariaLabelledBy: title,
      position: "end",
      backdropClass: "offcanvas-backdrop"
    };

    this.offcanvas.open(content, options);
  }
}

import {AfterViewInit, Component, inject, TemplateRef, ViewChild} from '@angular/core';
import {PriorKnowledgeService} from '../../services/prior-knowledge.service';
import {PriorKnowledgeViewComponent} from '../prior-knowledge-view/prior-knowledge-view.component';
import {createPriorKnowledge, PriorKnowledge} from '../../models/prior-knowledge.model';
import {NgbOffcanvas, NgbOffcanvasOptions} from '@ng-bootstrap/ng-bootstrap';
import {PriorKnowledgeEditComponent} from '../prior-knowledge-edit/prior-knowledge-edit.component';
import {DataNotAvailableInfoComponent} from "../../../shared/components/data-not-available-info/data-not-available-info.component";
import {DataNotAvailableViewComponent} from '../../../shared/components/data-not-available-view/data-not-available-view.component';
import {AddButtonComponent} from "../../../shared/components/add-button/add-button.component";
import {DeleteButtonComponent} from "../../../shared/components/delete-button/delete-button.component";
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-prior-knowledge-list',
  imports: [
    PriorKnowledgeViewComponent,
    PriorKnowledgeEditComponent,
    DataNotAvailableInfoComponent,
    DataNotAvailableViewComponent,
    AddButtonComponent,
    DeleteButtonComponent,
    AsyncPipe
  ],
  templateUrl: './prior-knowledge-list.component.html',
  styleUrl: './prior-knowledge-list.component.scss'
})
export class PriorKnowledgeListComponent implements AfterViewInit {

  private knowledgeService = inject(PriorKnowledgeService);
  private offcanvas = inject(NgbOffcanvas);
  private route = inject(ActivatedRoute);

  @ViewChild("content")
  protected content!: TemplateRef<unknown>;

  protected knowledgeList$ = this.knowledgeService.knowledgeList$;
  protected knowledgeToEdit?: PriorKnowledge;
  protected canvasTitle = "";
  protected edit = false;


  public ngAfterViewInit() {
    if (this.route.snapshot.queryParams["new"]) {
      this.resetPath();
      this.onAdd(this.content);
    }
  }


  protected onAdd(content: TemplateRef<unknown>) {
    this.knowledgeToEdit = createPriorKnowledge("");
    this.edit = false;
    this.openOffcanvas(content, "Add new prior knowledge");
  }


  protected onEdit(content: TemplateRef<unknown>, knowledge: PriorKnowledge) {
    this.edit = true
    this.knowledgeToEdit = knowledge;
    this.openOffcanvas(content, "Edit prior knowledge");
  }


  protected onDelete(knowledge: PriorKnowledge) {
    this.knowledgeService.removeKnowledge(knowledge);
  }


  protected onDeleteAll() {
    this.knowledgeService.removeAllKnowledge();
  }


  protected onEditCancelled() {
    this.offcanvas.dismiss("cancelled");
  }


  protected onEditSaved() {
    this.offcanvas.dismiss("saved");
  }


  private openOffcanvas(content: TemplateRef<unknown>, title: string) {
    this.canvasTitle = title;

    const options: NgbOffcanvasOptions = {
      ariaLabelledBy: title,
      position: "end",
      backdropClass: "offcanvas-backdrop"
    };

    this.offcanvas.open(content, options);
  }


  private resetPath() {
    window.history.replaceState(null, "", window.location.pathname);
  }

}

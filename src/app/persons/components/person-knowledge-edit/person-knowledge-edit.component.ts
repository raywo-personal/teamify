import {Component, effect, input} from '@angular/core';
import {PersonKnowledgeForm} from '../../models/person-form.model';
import {FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SetCustomValidityDirective} from '../../../shared/directives/set-custom-validity.directive';
import {PriorKnowledge} from '../../../prior-knowledge/models/prior-knowledge.model';


@Component({
  selector: 'app-person-knowledge-edit',
  imports: [
    ReactiveFormsModule,
    SetCustomValidityDirective
  ],
  templateUrl: './person-knowledge-edit.component.html',
  styleUrl: './person-knowledge-edit.component.scss'
})
export class PersonKnowledgeEditComponent {

  public knowledgeForm = input.required<FormGroup<PersonKnowledgeForm>>()

  protected knowledgeId: string = "";
  protected knowledge?: PriorKnowledge;


  constructor() {
    effect(() => {
      const formGroup = this.knowledgeForm();

      formGroup.controls.remark.setValidators([
        Validators.minLength(2), Validators.maxLength(160)
      ]);
      this.knowledge = formGroup.controls.priorKnowledge.value;
      this.knowledgeId = formGroup.controls.priorKnowledge.value.id || "";
    });
  }


  protected get isRemarkUsed(): boolean {
    const remarkControl = this.knowledgeForm().controls.remark;

    return remarkControl.touched || remarkControl.dirty;
  }
}

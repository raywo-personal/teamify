import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonKnowledgeEditComponent} from './person-knowledge-edit.component';
import {FormControl, FormGroup} from '@angular/forms';
import {createPriorKnowledge} from '../../../prior-knowledge/models/prior-knowledge.model';
import {PersonKnowledgeForm} from '../../models/person-form.model';


describe('PersonKnowledgeEditComponent', () => {
  let component: PersonKnowledgeEditComponent;
  let fixture: ComponentFixture<PersonKnowledgeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonKnowledgeEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonKnowledgeEditComponent);
    fixture.componentRef.setInput('knowledgeForm', new FormGroup<PersonKnowledgeForm>({
      priorKnowledge: new FormControl(createPriorKnowledge('Java'), {nonNullable: true}),
      remark: new FormControl('', {nonNullable: true}),
      selected: new FormControl(false, {nonNullable: true})
    }));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorKnowledgeViewComponent } from './prior-knowledge-view.component';
import {createPriorKnowledge} from '../../models/prior-knowledge.model';

describe('PriorKnowledgeViewComponent', () => {
  let component: PriorKnowledgeViewComponent;
  let fixture: ComponentFixture<PriorKnowledgeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorKnowledgeViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorKnowledgeViewComponent);
    fixture.componentRef.setInput('knowledge', createPriorKnowledge('Java'));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

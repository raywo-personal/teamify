import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PriorKnowledgeViewComponent} from './prior-knowledge-view.component';
import {ComponentRef} from '@angular/core';
import {knowledge1} from '../../../shared/test-data/knowledge.data';


describe('PriorKnowledgeViewComponent', () => {
  let component: PriorKnowledgeViewComponent;
  let componentRef: ComponentRef<PriorKnowledgeViewComponent>;
  let fixture: ComponentFixture<PriorKnowledgeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorKnowledgeViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorKnowledgeViewComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('knowledge', knowledge1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

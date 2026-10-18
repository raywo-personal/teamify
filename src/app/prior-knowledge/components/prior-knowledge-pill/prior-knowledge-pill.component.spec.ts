import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PriorKnowledgePillComponent} from './prior-knowledge-pill.component';
import {createPriorKnowledge} from '../../models/prior-knowledge.model';


describe('PriorKnowledgePillComponent', () => {
  let component: PriorKnowledgePillComponent;
  let fixture: ComponentFixture<PriorKnowledgePillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorKnowledgePillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorKnowledgePillComponent);
    fixture.componentRef.setInput('knowledge', createPriorKnowledge('Java'));
    fixture.componentRef.setInput('remark', '');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

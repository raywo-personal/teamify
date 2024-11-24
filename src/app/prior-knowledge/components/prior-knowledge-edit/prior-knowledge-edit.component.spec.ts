import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorKnowledgeEditComponent } from './prior-knowledge-edit.component';

describe('PriorKnowledgeEditComponent', () => {
  let component: PriorKnowledgeEditComponent;
  let fixture: ComponentFixture<PriorKnowledgeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorKnowledgeEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorKnowledgeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorKnowledgeListComponent } from './prior-knowledge-list.component';

describe('PriorKnowledgeListComponent', () => {
  let component: PriorKnowledgeListComponent;
  let fixture: ComponentFixture<PriorKnowledgeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorKnowledgeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorKnowledgeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

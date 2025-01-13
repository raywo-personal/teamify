import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewPriorKnowledgeListComponent} from './preview-prior-knowledge-list.component';


describe('PreviewPriorKnowledgeListComponent', () => {
  let component: PreviewPriorKnowledgeListComponent;
  let fixture: ComponentFixture<PreviewPriorKnowledgeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewPriorKnowledgeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewPriorKnowledgeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

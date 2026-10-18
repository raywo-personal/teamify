import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewPriorKnowledgeListComponent} from './preview-prior-knowledge-list.component';
import {of} from 'rxjs';


describe('PreviewPriorKnowledgeListComponent', () => {
  let component: PreviewPriorKnowledgeListComponent;
  let fixture: ComponentFixture<PreviewPriorKnowledgeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewPriorKnowledgeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewPriorKnowledgeListComponent);
    fixture.componentRef.setInput('knowledge$', of([]));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

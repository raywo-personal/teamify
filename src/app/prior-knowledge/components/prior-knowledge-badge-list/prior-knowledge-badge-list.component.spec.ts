import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PriorKnowledgeBadgeListComponent} from './prior-knowledge-badge-list.component';


describe('PriorKnowledgeBadgeListComponent', () => {
  let component: PriorKnowledgeBadgeListComponent;
  let fixture: ComponentFixture<PriorKnowledgeBadgeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorKnowledgeBadgeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorKnowledgeBadgeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

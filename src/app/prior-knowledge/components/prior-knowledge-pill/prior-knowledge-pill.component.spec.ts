import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PriorKnowledgePillComponent} from './prior-knowledge-pill.component';


describe('PriorKnowledgePillComponent', () => {
  let component: PriorKnowledgePillComponent;
  let fixture: ComponentFixture<PriorKnowledgePillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorKnowledgePillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorKnowledgePillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

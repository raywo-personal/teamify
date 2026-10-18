import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorKnowledgeListComponent } from './prior-knowledge-list.component';
import {provideRouter} from '@angular/router';

describe('PriorKnowledgeListComponent', () => {
  let component: PriorKnowledgeListComponent;
  let fixture: ComponentFixture<PriorKnowledgeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorKnowledgeListComponent],
      providers: [provideRouter([])]
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

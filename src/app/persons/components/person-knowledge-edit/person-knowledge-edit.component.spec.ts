import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonKnowledgeEditComponent} from './person-knowledge-edit.component';


describe('PersonKnowledgeEditComponent', () => {
  let component: PersonKnowledgeEditComponent;
  let fixture: ComponentFixture<PersonKnowledgeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonKnowledgeEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonKnowledgeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonViewComponent } from './person-view.component';
import {createPerson} from '../../models/person.model';

describe('PersonViewComponent', () => {
  let component: PersonViewComponent;
  let fixture: ComponentFixture<PersonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonViewComponent);
    fixture.componentRef.setInput('person', createPerson('Ada'));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

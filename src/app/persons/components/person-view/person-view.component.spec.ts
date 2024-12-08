import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonViewComponent} from './person-view.component';
import {ComponentRef} from '@angular/core';
import {person1} from '../../../shared/test-data/persons.data';


describe('PersonViewComponent', () => {
  let component: PersonViewComponent;
  let componentRef: ComponentRef<PersonViewComponent>;
  let fixture: ComponentFixture<PersonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonViewComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('person', person1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

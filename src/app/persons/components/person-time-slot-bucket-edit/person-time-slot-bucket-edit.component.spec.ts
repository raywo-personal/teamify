import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonTimeSlotBucketEditComponent} from './person-time-slot-bucket-edit.component';
import {FormControl, FormGroup} from '@angular/forms';
import {PersonTimeSlotBucketForm} from '../../models/person-form.model';


describe('PersonTimeSlotBucketEditComponent', () => {
  let component: PersonTimeSlotBucketEditComponent;
  let fixture: ComponentFixture<PersonTimeSlotBucketEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonTimeSlotBucketEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonTimeSlotBucketEditComponent);
    fixture.componentRef.setInput('timeSlotForm', new FormGroup<PersonTimeSlotBucketForm>({
      validity: new FormControl('', {nonNullable: true}),
      priority: new FormControl(1, {nonNullable: true}),
      slots: new FormControl([], {nonNullable: true})
    }));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

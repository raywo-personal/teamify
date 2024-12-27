import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonTimeSlotBucketEditComponent} from './person-time-slot-bucket-edit.component';


describe('PersonTimeSlotBucketEditComponent', () => {
  let component: PersonTimeSlotBucketEditComponent;
  let fixture: ComponentFixture<PersonTimeSlotBucketEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonTimeSlotBucketEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonTimeSlotBucketEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TimeSlotPillComponent} from './time-slot-pill.component';
import {createTimeSlot} from '../../models/time-slot.model';


describe('TimeSlotPillComponent', () => {
  let component: TimeSlotPillComponent;
  let fixture: ComponentFixture<TimeSlotPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSlotPillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSlotPillComponent);
    fixture.componentRef.setInput('timeSlot', createTimeSlot('Morning'));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

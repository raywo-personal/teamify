import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSlotViewComponent } from './time-slot-view.component';
import {createTimeSlot} from '../../models/time-slot.model';

describe('TimeSlotViewComponent', () => {
  let component: TimeSlotViewComponent;
  let fixture: ComponentFixture<TimeSlotViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSlotViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSlotViewComponent);
    fixture.componentRef.setInput('timeSlot', createTimeSlot('Morning'));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TimeSlotViewComponent} from './time-slot-view.component';
import {ComponentRef} from '@angular/core';
import {slot1} from '../../../shared/test-data/time-slots.data';


describe('TimeSlotViewComponent', () => {
  let component: TimeSlotViewComponent;
  let componentRef: ComponentRef<TimeSlotViewComponent>;
  let fixture: ComponentFixture<TimeSlotViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSlotViewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TimeSlotViewComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('timeSlot', slot1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

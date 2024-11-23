import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSlotViewComponent } from './time-slot-view.component';

describe('TimeSlotViewComponent', () => {
  let component: TimeSlotViewComponent;
  let fixture: ComponentFixture<TimeSlotViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSlotViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSlotViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

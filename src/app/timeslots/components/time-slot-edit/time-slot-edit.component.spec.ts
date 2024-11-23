import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSlotEditComponent } from './time-slot-edit.component';

describe('TimeSlotEditComponent', () => {
  let component: TimeSlotEditComponent;
  let fixture: ComponentFixture<TimeSlotEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSlotEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSlotEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

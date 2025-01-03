import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TimeSlotPillComponent} from './time-slot-pill.component';


describe('TimeSlotPillComponent', () => {
  let component: TimeSlotPillComponent;
  let fixture: ComponentFixture<TimeSlotPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSlotPillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSlotPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TimeSlotBadgeListComponent} from './time-slot-badge-list.component';


describe('TimeSlotBadgeListComponent', () => {
  let component: TimeSlotBadgeListComponent;
  let fixture: ComponentFixture<TimeSlotBadgeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSlotBadgeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSlotBadgeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

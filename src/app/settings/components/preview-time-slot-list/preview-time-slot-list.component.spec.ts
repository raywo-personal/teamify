import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewTimeSlotListComponent} from './preview-time-slot-list.component';


describe('TimeSlotListComponent', () => {
  let component: PreviewTimeSlotListComponent;
  let fixture: ComponentFixture<PreviewTimeSlotListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewTimeSlotListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewTimeSlotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

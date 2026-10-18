import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamViewComponent} from './team-view.component';
import {createTeam} from '../../models/team.model';
import {createTimeSlot} from '../../../timeslots/models/time-slot.model';


describe('TeamViewComponent', () => {
  let component: TeamViewComponent;
  let fixture: ComponentFixture<TeamViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamViewComponent);
    fixture.componentRef.setInput('team', createTeam(createTimeSlot('Morning')));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

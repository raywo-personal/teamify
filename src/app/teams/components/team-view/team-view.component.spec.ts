import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamViewComponent} from './team-view.component';
import {ComponentRef} from '@angular/core';
import {team1} from '../../../shared/test-data/teams.data';


describe('TeamViewComponent', () => {
  let component: TeamViewComponent;
  let componentRef: ComponentRef<TeamViewComponent>;
  let fixture: ComponentFixture<TeamViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamViewComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput("team", team1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

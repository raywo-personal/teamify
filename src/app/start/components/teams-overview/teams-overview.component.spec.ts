import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamsOverviewComponent} from './teams-overview.component';
import {provideRouter} from '@angular/router';


describe('TeamsOverviewComponent', () => {
  let component: TeamsOverviewComponent;
  let fixture: ComponentFixture<TeamsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsOverviewComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

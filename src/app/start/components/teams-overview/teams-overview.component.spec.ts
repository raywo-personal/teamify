import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamsOverviewComponent} from './teams-overview.component';


describe('TeamsOverviewComponent', () => {
  let component: TeamsOverviewComponent;
  let fixture: ComponentFixture<TeamsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsOverviewComponent]
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

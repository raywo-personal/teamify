import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamNameEditComponent} from './team-name-edit.component';


describe('TeamNameEditComponent', () => {
  let component: TeamNameEditComponent;
  let fixture: ComponentFixture<TeamNameEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamNameEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamNameEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

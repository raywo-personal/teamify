import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewTeamListComponent} from './preview-team-list.component';


describe('PreviewTeamListComponent', () => {
  let component: PreviewTeamListComponent;
  let fixture: ComponentFixture<PreviewTeamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewTeamListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

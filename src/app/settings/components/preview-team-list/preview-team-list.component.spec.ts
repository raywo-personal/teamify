import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewTeamListComponent} from './preview-team-list.component';
import {of} from 'rxjs';


describe('PreviewTeamListComponent', () => {
  let component: PreviewTeamListComponent;
  let fixture: ComponentFixture<PreviewTeamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewTeamListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewTeamListComponent);
    fixture.componentRef.setInput('teams$', of([]));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

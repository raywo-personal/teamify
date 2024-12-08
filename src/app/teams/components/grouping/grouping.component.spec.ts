import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupingComponent} from './grouping.component';
import {provideRouter} from '@angular/router';
import {routes} from '../../../app.routes';


describe('GroupingComponent', () => {
  let component: GroupingComponent;
  let fixture: ComponentFixture<GroupingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupingComponent],
      providers: [
        provideRouter(routes)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

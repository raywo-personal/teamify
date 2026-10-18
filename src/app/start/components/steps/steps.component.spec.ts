import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StepsComponent} from './steps.component';
import {provideRouter} from '@angular/router';


describe('StepsComponent', () => {
  let component: StepsComponent;
  let fixture: ComponentFixture<StepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepsComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

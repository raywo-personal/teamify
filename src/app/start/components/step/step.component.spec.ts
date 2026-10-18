import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StepComponent} from './step.component';
import {provideRouter} from '@angular/router';


describe('Step1Component', () => {
  let component: StepComponent;
  let fixture: ComponentFixture<StepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepComponent);
    fixture.componentRef.setInput('stepNo', 1);
    fixture.componentRef.setInput('stepTitle', 'Create time slots');
    fixture.componentRef.setInput('stepDescription', 'Description');
    fixture.componentRef.setInput('stepIsDone', false);
    fixture.componentRef.setInput('buttonCaption', 'Time slots');
    fixture.componentRef.setInput('routingTarget', '/time-slots');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

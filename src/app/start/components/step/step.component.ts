import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-step',
  imports: [
    RouterLink
  ],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss'
})
export class StepComponent {


  public stepNo = input.required<number>();
  public stepTitle = input.required<string>();
  public stepDescription = input.required<string>();
  public stepIsDone = input.required<boolean>();
  public buttonCaption = input.required<string>();
  public routingTarget = input.required<string>();


  protected queryParams() {
    return this.stepIsDone() ? undefined : {new: true};
  }

}

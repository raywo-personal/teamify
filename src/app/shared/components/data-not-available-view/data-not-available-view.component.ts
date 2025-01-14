import {Component, input, TemplateRef} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';


export type DataNotAvailableViewMode = "neutral" | "success" | "info" | "warning" | "error";

@Component({
  selector: 'app-data-not-available-view',
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './data-not-available-view.component.html',
  styleUrl: './data-not-available-view.component.scss'
})
export class DataNotAvailableViewComponent {

  public title = input.required<string>();
  public message = input<string>();
  public messageTemplate = input<TemplateRef<unknown>>();
  public mode = input<DataNotAvailableViewMode>("neutral");

}

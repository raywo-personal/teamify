import {Component, input, TemplateRef} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';


@Component({
  selector: 'app-data-not-available-info',
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './data-not-available-info.component.html',
  styleUrl: './data-not-available-info.component.scss'
})
export class DataNotAvailableInfoComponent {

  public text = input<string>();
  public textTemplate = input<TemplateRef<unknown>>();
}

import {Component, input, output} from '@angular/core';
import {AddButtonComponent} from '../add-button/add-button.component';


@Component({
  selector: 'app-add-header-bar',
  imports: [
    AddButtonComponent
  ],
  templateUrl: './add-header-bar.component.html',
  styleUrl: './add-header-bar.component.scss'
})
export class AddHeaderBarComponent {

  public caption = input.required<string>();
  public addClick = output();


  protected onAdd() {
    this.addClick.emit();
  }
}

import {Component, input, output} from '@angular/core';


@Component({
  selector: 'app-add-button',
  imports: [],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.scss'
})
export class AddButtonComponent {

  public caption = input.required<string>();
  public addClick = output();


  protected onAdd() {
    this.addClick.emit();
  }

}

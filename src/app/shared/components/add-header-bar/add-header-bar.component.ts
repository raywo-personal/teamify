import {Component, input, output} from '@angular/core';


@Component({
  selector: 'app-add-header-bar',
  imports: [],
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

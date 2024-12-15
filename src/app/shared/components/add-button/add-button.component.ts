import {Component, HostListener, input, output} from '@angular/core';


@Component({
  selector: 'button[app-add-button]',
  imports: [],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.scss',
  host: {
    class: "btn btn-primary"
  }
})
export class AddButtonComponent {

  public caption = input.required<string>();
  public addClick = output();


  @HostListener("click", ["$event"])
  protected onAdd(event: MouseEvent) {
    event.stopPropagation();
    this.addClick.emit();
  }

}

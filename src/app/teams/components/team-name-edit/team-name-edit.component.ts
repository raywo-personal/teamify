import {AfterViewInit, Component, effect, ElementRef, input, output, ViewChild} from '@angular/core';
import {SetCustomValidityDirective} from '../../../shared/directives/set-custom-validity.directive';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-team-name-edit',
  imports: [
    SetCustomValidityDirective,
    FormsModule
  ],
  templateUrl: './team-name-edit.component.html',
  styleUrl: './team-name-edit.component.scss'
})
export class TeamNameEditComponent implements AfterViewInit {

  @ViewChild("nameField")
  private nameInput!: ElementRef;

  public name = input<string>("");
  public editCancelled = output();
  public editConfirmed = output<string>();

  protected teamName = "";


  constructor() {
    effect(() => {
      this.teamName = this.name();
    });
  }


  public ngAfterViewInit(): void {
    this.nameInput.nativeElement.focus();
  }


  protected onSubmit() {
    this.editConfirmed.emit(this.teamName);
  }


  protected onCancel() {
    this.editCancelled.emit();
  }
}

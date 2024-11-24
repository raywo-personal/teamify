import {Component, inject, input, output, TemplateRef} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-delete-button',
  imports: [],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.scss'
})
export class DeleteButtonComponent {

  public showIcon = input<boolean>(true);
  public caption = input<string>();
  public deleteConfirmed = output();

  public withConfirmation = input<boolean>(true);
  public confirmationTitle = input<string>();
  public confirmationMessage = input<string>();

  private modalService = inject(NgbModal);


  onClick(content: TemplateRef<any>, event: MouseEvent) {
    event.stopPropagation();

    const options: NgbModalOptions = {
      ariaLabelledBy: this.caption() || "Delete",
    }

    this.modalService.open(content, options)
      .result
      .then(
        (result) => {
          if (result === 'Delete') {
            this.deleteConfirmed.emit()
          }
        },
        () => {
          // Do nothing. This exists only to avoid errors in console.
        }
      );
  }

}

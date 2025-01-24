import {Component, ElementRef, HostListener, inject, input, OnInit, output, Renderer2, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[app-delete-button]',
  imports: [],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.scss',
  host: {
    class: "btn btn-danger"
  }
})
export class DeleteButtonComponent implements OnInit {

  private modalService = inject(NgbModal);
  private hostElement = inject(ElementRef);
  private renderer = inject(Renderer2);

  @ViewChild("modalContent", {static: true})
  private modalContent!: TemplateRef<unknown>;

  public showIcon = input<boolean>(true);
  public caption = input<string>();
  public deleteConfirmed = output();

  public withConfirmation = input<boolean>(true);
  public confirmationTitle = input<string>();
  public confirmationMessage = input<string>();


  public ngOnInit() {
    this.renderer.setAttribute(this.hostElement.nativeElement, "type", "button");
  }


  @HostListener("click", ["$event"])
  protected onClickHost(event: MouseEvent) {
    event.stopPropagation();

    const options: NgbModalOptions = {
      ariaLabelledBy: this.caption() || $localize`:@@t.deleteCaption:Delete`,
    }

    this.modalService.open(this.modalContent, options)
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

import {Component, inject, TemplateRef} from '@angular/core';
import {TimeSlotViewComponent} from '../time-slot-view/time-slot-view.component';
import {TimeSlotService} from '../../services/time-slot.service';
import {AsyncPipe} from '@angular/common';
import {NgbOffcanvas, NgbOffcanvasOptions, OffcanvasDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TimeSlotEditComponent} from '../time-slot-edit/time-slot-edit.component';
import {createTimeSlot, TimeSlot} from '../../models/time-slot.model';


@Component({
  selector: 'app-time-slot-list',
  imports: [
    TimeSlotViewComponent,
    AsyncPipe,
    TimeSlotEditComponent
  ],
  templateUrl: './time-slot-list.component.html',
  styleUrl: './time-slot-list.component.scss'
})
export class TimeSlotListComponent {

  private slotService = inject(TimeSlotService);
  private offcanvas = inject(NgbOffcanvas);

  protected closeResult = "";

  protected slots$ = this.slotService.slots$;
  protected timeSlotToEdit?: TimeSlot;


  protected onAdd(content: TemplateRef<any>) {
    const options: NgbOffcanvasOptions = {
      ariaLabelledBy: "Add new time slot",
      position: "end"
    };
    this.timeSlotToEdit = createTimeSlot("");

    this.offcanvas.open(content, options)
      .result
      .then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed with: ${this.getDismissReason(reason)}`;
        }
      );
  }


  private getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }


  onAddCancelled() {
    this.offcanvas.dismiss();
  }


  onAddSaved(timeSlot: TimeSlot) {
    this.offcanvas.dismiss();
  }
}

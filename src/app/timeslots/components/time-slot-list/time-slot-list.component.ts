import {Component, inject, TemplateRef} from '@angular/core';
import {TimeSlotViewComponent} from '../time-slot-view/time-slot-view.component';
import {TimeSlotService} from '../../services/time-slot.service';
import {AsyncPipe} from '@angular/common';
import {NgbOffcanvas, NgbOffcanvasOptions} from '@ng-bootstrap/ng-bootstrap';
import {TimeSlotEditComponent} from '../time-slot-edit/time-slot-edit.component';
import {createTimeSlot, TimeSlot} from '../../models/time-slot.model';
import {AddHeaderBarComponent} from '../../../shared/components/add-header-bar/add-header-bar.component';


@Component({
  selector: 'app-time-slot-list',
  imports: [
    TimeSlotViewComponent,
    AsyncPipe,
    TimeSlotEditComponent,
    AddHeaderBarComponent
  ],
  templateUrl: './time-slot-list.component.html',
  styleUrl: './time-slot-list.component.scss'
})
export class TimeSlotListComponent {

  private slotService = inject(TimeSlotService);
  private offcanvas = inject(NgbOffcanvas);

  protected slots$ = this.slotService.slots$;
  protected timeSlotToEdit?: TimeSlot;
  protected canvasTitle: string = "";
  protected edit = false;


  protected onAdd(content: TemplateRef<any>) {
    this.timeSlotToEdit = createTimeSlot("");
    this.edit = false;
    this.openOffcanvas(content, "Add new time slot");
  }


  protected onEdit(content: TemplateRef<any>, slot: TimeSlot) {
    this.timeSlotToEdit = slot;
    this.edit = true;
    this.openOffcanvas(content, "Edit time slot");
  }


  protected onAddCancelled() {
    this.offcanvas.dismiss("cancelled");
  }


  protected onAddSaved() {
    this.offcanvas.dismiss("saved");
  }


  protected onDelete(slot: TimeSlot) {
    this.slotService.removeSlot(slot);
  }


  private openOffcanvas(content: TemplateRef<any>, title: string) {
    this.canvasTitle = title;

    const options: NgbOffcanvasOptions = {
      ariaLabelledBy: title,
      position: "end",
      backdropClass: "offcanvas-backdrop"
    };

    this.offcanvas.open(content, options);
  }

}

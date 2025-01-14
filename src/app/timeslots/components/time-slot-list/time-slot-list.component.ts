import {AfterViewInit, Component, inject, TemplateRef, ViewChild} from '@angular/core';
import {TimeSlotViewComponent} from '../time-slot-view/time-slot-view.component';
import {TimeSlotService} from '../../services/time-slot.service';
import {AsyncPipe} from '@angular/common';
import {NgbOffcanvas, NgbOffcanvasOptions} from '@ng-bootstrap/ng-bootstrap';
import {TimeSlotEditComponent} from '../time-slot-edit/time-slot-edit.component';
import {createTimeSlot, TimeSlot} from '../../models/time-slot.model';
import {DataNotAvailableViewComponent} from "../../../shared/components/data-not-available-view/data-not-available-view.component";
import {DataNotAvailableInfoComponent} from '../../../shared/components/data-not-available-info/data-not-available-info.component';
import {AddButtonComponent} from '../../../shared/components/add-button/add-button.component';
import {DeleteButtonComponent} from '../../../shared/components/delete-button/delete-button.component';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-time-slot-list',
  imports: [
    TimeSlotViewComponent,
    AsyncPipe,
    TimeSlotEditComponent,
    DataNotAvailableViewComponent,
    DataNotAvailableInfoComponent,
    AddButtonComponent,
    DeleteButtonComponent
  ],
  templateUrl: './time-slot-list.component.html',
  styleUrl: './time-slot-list.component.scss'
})
export class TimeSlotListComponent implements AfterViewInit {

  private slotService = inject(TimeSlotService);
  private offcanvas = inject(NgbOffcanvas);
  private route = inject(ActivatedRoute);

  @ViewChild("content")
  protected content!: TemplateRef<unknown>;

  protected slots$ = this.slotService.slots$;
  protected timeSlotCount$ = this.slotService.slotCount$;
  protected timeSlotToEdit?: TimeSlot;
  protected canvasTitle = "";
  protected edit = false;


  public ngAfterViewInit() {
    if (this.route.snapshot.queryParams["new"]) {
      this.resetPath();
      this.onAdd(this.content);
    }
  }


  protected onAdd(content: TemplateRef<unknown>) {
    this.timeSlotToEdit = createTimeSlot("");
    this.edit = false;
    this.openOffcanvas(content, "Add new time slot");
  }


  protected onEdit(content: TemplateRef<unknown>, slot: TimeSlot) {
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


  protected onDeleteAll() {
    this.slotService.removeAllSlots();
  }


  protected onAddDefaultSet() {
    this.slotService.addDefaultSet();
  }


  private openOffcanvas(content: TemplateRef<unknown>, title: string) {
    this.canvasTitle = title;

    const options: NgbOffcanvasOptions = {
      ariaLabelledBy: title,
      position: "end",
      backdropClass: "offcanvas-backdrop"
    };

    this.offcanvas.open(content, options);
  }


  private resetPath() {
    window.history.replaceState(null, "", window.location.pathname);
  }

}

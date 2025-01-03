import {Component, computed, effect, inject, input, output, signal} from '@angular/core';
import {TimeSlot} from '../../models/time-slot.model';
import {FormsModule} from '@angular/forms';
import {addToTime, createTime} from '../../../shared/models/time.model';
import {TimePipe} from '../../pipes/time.pipe';
import {TimeSlotService} from '../../services/time-slot.service';
import {dotCSSClass, fgCSSClass, timeSlotColors} from '../../../shared/data/default-colors.data';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-time-slot-edit',
  imports: [
    FormsModule,
    TimePipe,
    NgbTooltip
  ],
  templateUrl: './time-slot-edit.component.html',
  styleUrl: './time-slot-edit.component.scss'
})
export class TimeSlotEditComponent {

  public timeSlot = input<TimeSlot>();
  public edit = input<boolean>(false);
  public cancelled = output();
  public saved = output<TimeSlot>();

  protected description: string = "";
  protected startHour = signal(0);
  protected startMinute = signal(0);
  protected durationHour = signal(1);
  protected durationMinute = signal(30);
  protected endTime = computed(() => {
    const start = createTime(this.startHour(), this.startMinute());
    const duration = createTime(this.durationHour(), this.durationMinute());

    return addToTime(start, duration);
  });
  protected color: string = "noon";

  protected readonly fgCSSClass = fgCSSClass;
  protected readonly dotCSSClass = dotCSSClass;
  protected readonly colors = timeSlotColors;

  private timeSlotService = inject(TimeSlotService);


  constructor() {
    effect(() => {
      const slot = this.timeSlot();

      if (slot) {
        this.description = slot.description;
        this.startHour.set(slot.start.hour);
        this.startMinute.set(slot.start.minute);
      }
    });
  }


  protected onSubmit() {
    const start = createTime(this.startHour(), this.startMinute());
    const end = this.endTime();
    const timeSlot = {
      id: this.timeSlot()?.id || crypto.randomUUID(),
      description: this.description,
      start,
      end,
      color: this.color,
    }

    if (this.edit()) {
      this.timeSlotService.updateSlot(timeSlot)
    } else {
      this.timeSlotService.addSlot(timeSlot);
    }

    this.saved.emit(timeSlot);
  }


  protected onCancel() {
    this.cancelled.emit();
  }


  protected onColorKeySelected(keyboardEvent: KeyboardEvent, color: string) {
    if (keyboardEvent.code === "Space") {
      this.onColorSelected(color);
    }

    if (keyboardEvent.code === "Escape") {
      this.onCancel();
    }

    if (keyboardEvent.code === "Enter") {
      this.onSubmit();
    }
  }


  protected onColorSelected(color: string) {
    this.color = color;
  }
}

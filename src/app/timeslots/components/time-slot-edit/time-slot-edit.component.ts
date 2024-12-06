import {Component, computed, effect, inject, input, output, signal} from '@angular/core';
import {TimeSlot} from '../../models/time-slot.model';
import {FormsModule} from '@angular/forms';
import {Time} from '../../models/time.model';
import {TimePipe} from '../../pipes/time.pipe';
import {TimeSlotService} from '../../services/time-slot.service';


@Component({
  selector: 'app-time-slot-edit',
  imports: [
    FormsModule,
    TimePipe
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
    const start = new Time(this.startHour(), this.startMinute());
    const duration = new Time(this.durationHour(), this.durationMinute());

    return start.plus(duration)
  });

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
    const start = new Time(this.startHour(), this.startMinute());
    const end = this.endTime();
    const timeSlot = {
      id: this.timeSlot()?.id || crypto.randomUUID(),
      description: this.description,
      start,
      end
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
}

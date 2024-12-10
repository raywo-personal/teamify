import {Component, effect, inject, model, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PersonService} from '../../../persons/services/person.service';
import {TimeSlotService} from '../../../timeslots/services/time-slot.service';


@Component({
  selector: 'app-person-slot-filter',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './person-slot-filter.component.html',
  styleUrl: './person-slot-filter.component.scss'
})
export class PersonSlotFilterComponent implements OnInit {

  private personService = inject(PersonService);
  private slotService = inject(TimeSlotService);

  protected personFilter = model<string>("all");
  protected timeSlots$ = this.slotService.slots$;


  constructor() {
    effect(() => {
      const filter = this.personFilter();
      this.personService.slotFilter.set(filter);
    });
  }


  public ngOnInit(): void {
    this.personFilter.set(this.personService.slotFilter());
  }

}

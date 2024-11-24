import {Component, effect, inject, input, output} from '@angular/core';
import {Person} from '../../models/person.model';
import {FormsModule} from '@angular/forms';
import {PriorKnowledge} from '../../../prior-knowledge/models/prior-knowledge.model';
import {TimeSlot} from '../../../timeslots/models/time-slot.model';
import {PriorKnowledgeService} from '../../../prior-knowledge/services/prior-knowledge.service';
import {TimeSlotService} from '../../../timeslots/services/time-slot.service';
import {TimePipe} from '../../../timeslots/pipes/time.pipe';
import {PersonService} from '../../services/person.service';


interface PriorKnowledgeSelection {
  knowledge: PriorKnowledge
  selected: boolean;
}


interface TimeSlotSelection {
  slot: TimeSlot
  selected: boolean;
}


@Component({
  selector: 'app-person-edit',
  imports: [
    FormsModule,
    TimePipe
  ],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.scss'
})
export class PersonEditComponent {

  private personService = inject(PersonService);
  private knowledgeService = inject(PriorKnowledgeService);
  private timeSlotService = inject(TimeSlotService);

  public person = input<Person>();
  public edit = input<boolean>(false);
  public saved = output<Person>();
  public cancelled = output();

  protected name: string = "";
  protected knowledge: PriorKnowledgeSelection[] = [];
  protected slots: TimeSlotSelection[] = [];


  constructor() {
    effect(() => {
      const person = this.person();

      if (!person) {
        return;
      }

      this.name = person.name;

      this.knowledgeService.knowledgeList$
        .subscribe(knowledge => {
          this.knowledge = knowledge.map(k => {
            return {
              knowledge: k,
              selected: person.priorKnowledge.includes(k)
            }
          });
        });

      this.timeSlotService.slots$
        .subscribe(slots => {
          this.slots = slots.map(slot => {
            return {
              slot,
              selected: person.timeSlots.includes(slot)
            }
          });
        });
    });
  }


  protected onSubmit() {
    const person = {
      id: this.person()?.id,
      name: this.name,
      priorKnowledge: this.knowledge.filter(k => k.selected).map(k => k.knowledge),
      timeSlots: this.slots.filter(s => s.selected).map(s => s.slot)
    };

    if (this.edit()) {
      this.personService.updatePerson(person);
    } else {
      this.personService.addPerson(person);
    }

    this.saved.emit(person);
  }


  protected onCancel() {
    this.cancelled.emit();
  }


  protected onNextAdd() {
    const person = {
      name: this.name,
      priorKnowledge: this.knowledge.filter(k => k.selected).map(k => k.knowledge),
      timeSlots: this.slots.filter(s => s.selected).map(s => s.slot)
    };

    this.personService.addPerson(person);
    this.name = ""
    this.knowledge = [];
    this.slots = [];
  }
}

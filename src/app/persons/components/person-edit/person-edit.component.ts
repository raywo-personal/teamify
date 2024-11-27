import {Component, effect, inject, input, output} from '@angular/core';
import {Person} from '../../models/person.model';
import {FormsModule} from '@angular/forms';
import {PriorKnowledge} from '../../../prior-knowledge/models/prior-knowledge.model';
import {TimeSlot} from '../../../timeslots/models/time-slot.model';
import {PriorKnowledgeService} from '../../../prior-knowledge/services/prior-knowledge.service';
import {TimeSlotService} from '../../../timeslots/services/time-slot.service';
import {PersonService} from '../../services/person.service';
import {TimeSlotViewComponent} from '../../../timeslots/components/time-slot-view/time-slot-view.component';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {createPersonKnowledge, PersonKnowledge} from '../../models/person-knowledge.model';
import {createPersonTimeSlot, PersonTimeSlot} from '../../models/person-timeslot.model';


interface PriorKnowledgeSelection {
  knowledge: PriorKnowledge;
  remark: string;
  selected: boolean;
}


@Component({
  selector: 'app-person-edit',
  imports: [
    FormsModule,
    TimeSlotViewComponent,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    CdkDragPlaceholder
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
  protected info: string = "";

  protected knowledge: PriorKnowledgeSelection[] = [];
  protected timeSlots: TimeSlot[][] = [];
  protected timeSlotsSource: TimeSlot[] = [];


  constructor() {
    effect(() => {
      const person = this.person();

      if (!person) {
        return;
      }

      this.name = person.name;
      this.info = person.info;

      this.knowledgeService.knowledgeList$
        .subscribe(knowledge => {
          this.knowledge = knowledge.map(k => {
            return {
              knowledge: k,
              remark: "",
              selected: person.priorKnowledge.find(pK => pK.priorKnowledge.id === k.id) !== undefined
            }
          });
        });

      this.timeSlotService.slots$
        .subscribe(slots => {
          this.timeSlotsSource = slots;
          const length = slots.length
          this.timeSlots = new Array(length).fill(0).map(() => []);

          person.timeSlots.forEach(ts => {
            const priority = ts.priority || 1;
            this.timeSlots[priority - 1].push(ts.timeSlot);
          })
        });
    });
  }


  protected onSubmit() {
    const person = this.createPerson();

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
    const person = this.createPerson();

    this.personService.addPerson(person);
    this.name = "";
    this.info = "";
    this.knowledge = [];
    this.timeSlots = [];
  }


  protected onSlotDropped(dropEvent: CdkDragDrop<TimeSlot[], any>) {
    if (dropEvent.previousContainer === dropEvent.container) {
      moveItemInArray(dropEvent.container.data, dropEvent.previousIndex, dropEvent.currentIndex);
    } else {
      transferArrayItem(dropEvent.previousContainer.data,
        dropEvent.container.data,
        dropEvent.previousIndex,
        dropEvent.currentIndex);
    }
  }


  protected showTimeSlotPriority(index: number): boolean {
    if (index < 1) {
      return true;
    }

    return this.timeSlots[index - 1].length !== 0;
  }


  private createPerson() {
    let priorKnowledge: PersonKnowledge[] = this.knowledge
      .filter(k => k.selected)
      .map(k => createPersonKnowledge(k.knowledge, k.remark));
    let personTimeSlots: PersonTimeSlot[] = this.timeSlots
      .map((s, index) => {
        return s.map(slot => createPersonTimeSlot(slot, index + 1))
      })
      .flat();

    return {
      id: this.person()?.id,
      name: this.name,
      info: this.info,
      priorKnowledge: priorKnowledge,
      timeSlots: personTimeSlots
    };
  }
}

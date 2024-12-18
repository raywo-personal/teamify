import {Component, effect, inject, input, output} from '@angular/core';
import {createPerson, Person} from '../../models/person.model';
import {FormsModule} from '@angular/forms';
import {PriorKnowledge} from '../../../prior-knowledge/models/prior-knowledge.model';
import {TimeSlot} from '../../../timeslots/models/time-slot.model';
import {PriorKnowledgeService} from '../../../prior-knowledge/services/prior-knowledge.service';
import {TimeSlotService} from '../../../timeslots/services/time-slot.service';
import {PersonService} from '../../services/person.service';
import {TimeSlotViewComponent} from '../../../timeslots/components/time-slot-view/time-slot-view.component';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import {createPersonKnowledge, PersonKnowledge} from '../../models/person-knowledge.model';
import {createPersonTimeSlot, PersonTimeSlot} from '../../models/person-timeslot.model';
import {ListMustNotBeEmptyDirective} from '../../directives/list-must-not-be-empty.directive';


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
    CdkDragPlaceholder,
    ListMustNotBeEmptyDirective
  ],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.scss'
})
export class PersonEditComponent {

  private personService = inject(PersonService);
  private knowledgeService = inject(PriorKnowledgeService);
  private timeSlotService = inject(TimeSlotService);

  private _priorKnowledgeSource: PriorKnowledge[] = [];
  private _timeSlotSource: TimeSlot[] = [];
  private personId?: string;

  public person = input<Person>();
  public edit = input<boolean>(false);
  public saved = output<Person>();
  public cancelled = output();

  protected name: string = "";
  protected info: string = "";
  // This is just needed to make the form valid or invalid according to the
  // time slot list for priority 1.
  protected timeSlotListState: string = "";

  protected knowledge: PriorKnowledgeSelection[] = [];
  protected priorityTimeSlots: TimeSlot[][] = [];
  protected timeSlotsSource: TimeSlot[] = [];


  // TODO: Validate that time slots must not be empty.
  constructor() {
    effect(() => {
      const person = this.person();

      if (!person) {
        this.personId = undefined;
        return;
      }

      this.personId = person.id;
      this.name = person.name;
      this.info = person.info;

      this.knowledgeService.knowledgeList$
        .subscribe(knowledge => {
          this._priorKnowledgeSource = knowledge;
          this.fillKnowledge(person);
        });

      this.timeSlotService.slots$
        .subscribe(slots => {
          this._timeSlotSource = slots;
          this.fillTimeSlots(person);
        });
    });
  }


  protected onSubmit() {
    const person = this.createPersonFromEntries();

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
    const createdPerson = this.createPersonFromEntries();
    this.personService.addPerson(createdPerson);
    this.personId = crypto.randomUUID();

    const emptyPerson = createPerson("");
    this.name = "";
    this.info = "";
    this.fillKnowledge(emptyPerson)
    this.fillTimeSlots(emptyPerson);
  }


  protected onSlotDropped(dropEvent: CdkDragDrop<number, any>) {
    const targetIndex = dropEvent.container.data;
    const data = dropEvent.item.data;
    const sourceIndex = data.index;
    const slot = data.slot;
    // console.log("dragged data", data, "target index", targetIndex, "source index", sourceIndex, "slot", slot, "event", dropEvent);

    if (targetIndex === sourceIndex) return;

    if (sourceIndex === -1) {
      this.timeSlotsSource = this.timeSlotsSource.filter(s => s.id !== slot.id);
      this.priorityTimeSlots[targetIndex] = [...this.priorityTimeSlots[targetIndex], slot]
        .sort((a, b) => a.start.compareTo(b.start));
      return;
    }

    if (targetIndex === -1) {
      this.priorityTimeSlots[sourceIndex] = this.priorityTimeSlots[sourceIndex].filter(s => s.id !== slot.id);
      this.timeSlotsSource = [...this.timeSlotsSource, slot]
        .sort((a, b) => a.start.compareTo(b.start));
      return;
    }

    this.priorityTimeSlots[sourceIndex] = this.priorityTimeSlots[sourceIndex].filter(s => s.id !== slot.id);
    this.priorityTimeSlots[targetIndex] = [...this.priorityTimeSlots[targetIndex], slot]
      .sort((a, b) => a.start.compareTo(b.start));

  }


  protected showTimeSlotPriority(index: number): boolean {
    if (index < 1) {
      return true;
    }

    return this.priorityTimeSlots
      .slice(index - 1, this.priorityTimeSlots.length)
      .some(slot => slot.length !== 0);
  }


  private createPersonFromEntries(): Person {
    let priorKnowledge: PersonKnowledge[] = this.knowledge
      .filter(k => k.selected)
      .map(k => createPersonKnowledge(k.knowledge, k.remark));
    let personTimeSlots: PersonTimeSlot[] = this.priorityTimeSlots
      .map((s, index) => {
        return s.map(slot => createPersonTimeSlot(slot, index + 1))
      })
      .flat();

    return {
      id: this.personId,
      name: this.name,
      info: this.info,
      priorKnowledge: priorKnowledge,
      timeSlots: personTimeSlots
    };
  }


  private fillKnowledge(person: Person) {
    this.knowledge = this._priorKnowledgeSource.map(k => {
      const priorKnowledge = person.priorKnowledge.find(pK => pK.priorKnowledge.id === k.id)
      return {
        knowledge: k,
        remark: priorKnowledge?.remark || "",
        selected: priorKnowledge !== undefined
      }
    });
  }


  private fillTimeSlots(person: Person) {
    const length = this._timeSlotSource.length
    this.priorityTimeSlots = new Array(length).fill(0).map(() => []);

    person.timeSlots.forEach(ts => {
      const priority = ts.priority || 1;
      this.priorityTimeSlots[priority - 1].push(ts.timeSlot);
    });

    if (this.priorityTimeSlots[0].length > 0) {
      this.timeSlotListState = "not empty";
    }

    const personTimeSlots = person.timeSlots.map(t => t.timeSlot);
    this.timeSlotsSource = this._timeSlotSource.filter(s => {
      return !personTimeSlots.some(pts => pts.id === s.id);
    });
  }
}

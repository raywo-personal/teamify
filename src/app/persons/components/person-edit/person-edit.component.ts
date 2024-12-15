import {Component, effect, inject, input, output} from '@angular/core';
import {createPerson, Person} from '../../models/person.model';
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

  private _priorKnowledgeSource: PriorKnowledge[] = [];
  private _timeSlotSource: TimeSlot[] = [];
  private personId?: string;

  public person = input<Person>();
  public edit = input<boolean>(false);
  public saved = output<Person>();
  public cancelled = output();

  protected name: string = "";
  protected info: string = "";

  protected knowledge: PriorKnowledgeSelection[] = [];
  protected timeSlots: TimeSlot[][] = [];
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

    return this.timeSlots
      .slice(index - 1, this.timeSlots.length)
      .some(slot => slot.length !== 0);
  }


  private createPersonFromEntries(): Person {
    let priorKnowledge: PersonKnowledge[] = this.knowledge
      .filter(k => k.selected)
      .map(k => createPersonKnowledge(k.knowledge, k.remark));
    let personTimeSlots: PersonTimeSlot[] = this.timeSlots
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
    this.timeSlots = new Array(length).fill(0).map(() => []);

    person.timeSlots.forEach(ts => {
      const priority = ts.priority || 1;
      this.timeSlots[priority - 1].push(ts.timeSlot);
    });

    const personTimeSlots = person.timeSlots.map(t => t.timeSlot);
    this.timeSlotsSource = this._timeSlotSource.filter(s => !personTimeSlots.includes(s));
  }
}

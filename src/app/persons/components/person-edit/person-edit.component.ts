import {Component, effect, inject, input, output} from '@angular/core';
import {createPerson, Person} from '../../models/person.model';
import {FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {PriorKnowledge} from '../../../prior-knowledge/models/prior-knowledge.model';
import {TimeSlot} from '../../../timeslots/models/time-slot.model';
import {PriorKnowledgeService} from '../../../prior-knowledge/services/prior-knowledge.service';
import {TimeSlotService} from '../../../timeslots/services/time-slot.service';
import {PersonService} from '../../services/person.service';
import {CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import {PersonForm, PersonKnowledgeForm, PersonTimeSlotBucketForm} from '../../models/person-form.model';
import {SetCustomValidityDirective} from '../../../shared/directives/set-custom-validity.directive';
import {PersonKnowledgeEditComponent} from '../person-knowledge-edit/person-knowledge-edit.component';
import {TimeSlotViewComponent} from '../../../timeslots/components/time-slot-view/time-slot-view.component';
import {PersonTimeSlotBucketEditComponent} from '../person-time-slot-bucket-edit/person-time-slot-bucket-edit.component';
import {TimeSlotDragData} from '../../models/time-slot-drag-data.model';


@Component({
  selector: 'app-person-edit',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SetCustomValidityDirective,
    PersonKnowledgeEditComponent,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    TimeSlotViewComponent,
    PersonTimeSlotBucketEditComponent
  ],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.scss'
})
export class PersonEditComponent {

  private readonly personService = inject(PersonService);
  private readonly knowledgeService = inject(PriorKnowledgeService);
  private readonly timeSlotService = inject(TimeSlotService);
  private readonly formBuilder = inject(NonNullableFormBuilder);

  private _priorKnowledgeSource: PriorKnowledge[] = [];
  private _timeSlotSource: TimeSlot[] = [];
  private personId?: string;

  public person = input<Person>();
  public edit = input<boolean>(false);
  public saved = output<Person>();
  public cancelled = output();

  protected personForm: FormGroup<PersonForm>;
  // protected name: string = "";
  // protected info: string = "";
  // This is just needed to make the form valid or invalid according to the
  // time slot list for priority 1.
  // protected timeSlotListState: string = "";

  // protected knowledge: PriorKnowledgeSelection[] = [];
  // protected priorityTimeSlots: TimeSlot[][] = [];
  protected timeSlotsSource: TimeSlot[] = [];


  // TODO: Validate that time slots must not be empty.
  constructor() {
    this.personForm = this.emptyPersonForm()

    effect(() => {
      const person = this.person();

      if (!person) {
        this.personId = undefined;
        return;
      }

      this.personId = person.id;
      this.personForm.patchValue({
        name: person.name,
        info: person.info
      });

      this.knowledgeService.knowledgeList$
        .subscribe(knowledge => {
          this._priorKnowledgeSource = knowledge;
          this.personForm.controls.priorKnowledge = this.formBuilder.array(this.fillKnowledge(person));
        });

      this.timeSlotService.slots$
        .subscribe(slots => {
          this._timeSlotSource = slots;
          this.fillTimeSlots(person);
        });
    });
  }


  protected get priorityTimeSlots(): FormGroup<PersonTimeSlotBucketForm>[] {
    return this.personForm.controls.timeSlots.controls;
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
    // const createdPerson = this.createPersonFromEntries();
    // this.personService.addPerson(createdPerson);
    //
    // const emptyPerson = createPerson("");
    // this.personId = crypto.randomUUID();
    // this.name = "";
    // this.info = "";
    // this.fillKnowledge(emptyPerson)
    // this.fillTimeSlots(emptyPerson);
  }


  /**
   * Handles the logic when a drag-and-drop operation is completed for a time slot.
   *
   * If drag origin and drag target are the same nothing is to be done.
   * If a slot is dragged onto a priority bucket the respective child component
   * is responsible for adding the element to its array. The removal from the
   * origin is handled here.
   *
   * @param {CdkDragDrop<number, any, TimeSlotDragData>} dropEvent - The event containing information about
   *        the dragged item, its source, and the target container.
   * @return {void} This method does not return any value.
   */
  protected onSlotDropped(dropEvent: CdkDragDrop<number, any, TimeSlotDragData>): void {
    const targetPriority = dropEvent.container.data;
    const data = dropEvent.item.data;
    const sourcePriority = data.priority;
    const slot = data.slot;
    const availableSlotsPriority = -1;
    // console.log("dragged data", data, "target index", targetPriority, "source index", sourcePriority, "slot", slot, "event", dropEvent);

    if (targetPriority === sourcePriority) return;

    if (sourcePriority === availableSlotsPriority) {
      this.timeSlotsSource = this.timeSlotsSource.filter(s => s.id !== slot.id);
      this.addNextBucket();
      this.personForm.updateValueAndValidity();

      return;
    }

    if (targetPriority === -1) {
      this.removeSlotFromBucket(sourcePriority, slot);

      this.timeSlotsSource = this.timeSlotsSource.concat(slot)
        .sort((a, b) => a.start.compareTo(b.start));
      this.personForm.updateValueAndValidity();

      return;
    }

    this.removeSlotFromBucket(sourcePriority, slot);
    this.personForm.updateValueAndValidity();
  }


  protected get isNameFieldUsed(): boolean {
    const field = this.personForm.controls.name;

    return field.dirty || field.touched;
  }


  // TODO: Implement correctly.
  protected slotNeedsValidation(slot: FormGroup<PersonTimeSlotBucketForm>) {
    return true;
  }


  private createNewBucket(priority: number, timeSlots: TimeSlot[] = []): FormGroup<PersonTimeSlotBucketForm> {
    return this.formBuilder.group({
      validity: this.formBuilder.control("ok", [Validators.required, Validators.pattern("ok")]),
      priority: priority,
      slots: this.formBuilder.control(timeSlots)
    });
  }


  private addNextBucket() {
    const maxBuckets = this._timeSlotSource.length;
    const buckets = this.personForm.controls.timeSlots.controls;

    if (buckets.length < maxBuckets) {
      const nextBucket = this.createNewBucket(buckets.length + 1);
      const newBuckets = buckets.concat(nextBucket);
      this.personForm.controls.timeSlots = this.formBuilder.array(newBuckets);
    }
  }


  private removeSlotFromBucket(sourcePriority: number, slot: TimeSlot) {
    const bucket = this.personForm.controls.timeSlots.controls
      .find(t => t.controls.priority.value === sourcePriority)!;

    const timeSlots = bucket.controls.slots.value
      .filter(s => s.id !== slot.id);
    bucket.controls.slots.patchValue(timeSlots);

    const validity = bucket.controls.validity;
    validity.setValue(timeSlots.length > 0 ? "ok" : "");
    validity.updateValueAndValidity();
  }


  // TODO: Revitalise!
  private createPersonFromEntries(): Person {
    // let priorKnowledge: PersonKnowledge[] = this.knowledge
    //   .filter(k => k.selected)
    //   .map(k => createPersonKnowledge(k.knowledge, k.remark));
    // let personTimeSlots: PersonTimeSlot[] = this.priorityTimeSlots
    //   .map((s, index) => {
    //     return s.map(slot => createPersonTimeSlot(slot, index + 1))
    //   })
    //   .flat();
    //
    // return {
    //   id: this.personId,
    //   name: this.name,
    //   info: this.info,
    //   priorKnowledge: priorKnowledge,
    //   timeSlots: personTimeSlots
    // };
    return createPerson("");
  }


  private fillKnowledge(person: Person): FormGroup<PersonKnowledgeForm>[] {
    return this._priorKnowledgeSource.map(k => {
      const priorKnowledge = person.priorKnowledge.find(pK => pK.priorKnowledge.id === k.id)
      return this.formBuilder.group({
        priorKnowledge: this.formBuilder.control(k),
        remark: this.formBuilder.control(priorKnowledge?.remark || ""),
        selected: this.formBuilder.control(priorKnowledge !== undefined)
      })
    });
  }


  private fillTimeSlots(person: Person) {
    const length = person.timeSlots.length;

    if (length === 0) {
      const firstBucketForm = this.createNewBucket(1);
      firstBucketForm.controls.validity.setValue("");
      firstBucketForm.controls.validity.updateValueAndValidity();
      this.personForm.controls.timeSlots = this.formBuilder.array([firstBucketForm]);
      this.updateTimeSlotSource(person);

      return;
    }

    const timeSlotBuckets: TimeSlot[][] = new Array(length).fill(0).map(() => []);

    const timeSlots: FormGroup<PersonTimeSlotBucketForm>[] = person.timeSlots
      .map(t => {
        const priority = t.priority || 1;
        console.log("priority", priority)
        timeSlotBuckets[priority - 1].push(t.timeSlot);

        return this.createNewBucket(priority, timeSlotBuckets[priority - 1]);
      });

    this.personForm.controls.timeSlots = this.formBuilder.array(timeSlots);
    this.updateTimeSlotSource(person);
  }


  private updateTimeSlotSource(person: Person) {
    const personTimeSlots = person.timeSlots.map(t => t.timeSlot);
    this.timeSlotsSource = this._timeSlotSource.filter(s => {
      return !personTimeSlots.some(pts => pts.id === s.id);
    });
  }


  private emptyPersonForm(): FormGroup<PersonForm> {
    const priorKnowledge: FormGroup<PersonKnowledgeForm>[] = [];
    const timeSlots: FormGroup<PersonTimeSlotBucketForm>[] = [];
    const priorKnowledgeFormArray = this.formBuilder.array(priorKnowledge);

    return this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      info: ["", [Validators.minLength(2), Validators.maxLength(150)]],
      priorKnowledge: priorKnowledgeFormArray,
      timeSlots: this.formBuilder.array(timeSlots)
    });
  }
}

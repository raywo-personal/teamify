import {Component, effect, ElementRef, inject, input, output, ViewChild} from '@angular/core';
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
import {createPersonKnowledge, PersonKnowledge} from '../../models/person-knowledge.model';
import {createPersonTimeSlot, PersonTimeSlot} from '../../models/person-timeslot.model';


const AVAILABLE_SLOTS_PRIORITY = -1;


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
  @ViewChild("nameField")
  private nameField!: ElementRef;

  public person = input<Person>();
  public edit = input<boolean>(false);
  public saved = output<Person>();
  public cancelled = output();

  protected readonly AVAILABLE_SLOTS_PRIORITY = AVAILABLE_SLOTS_PRIORITY;
  protected personForm: FormGroup<PersonForm>;
  protected timeSlotsSource: TimeSlot[] = [];


  constructor() {
    this.personForm = this.emptyPersonForm()

    effect(() => {
      const person = this.person();

      if (!person) {
        this.personId = undefined;
        return;
      }

      this.updatePersonForm(person);
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
    const createdPerson = this.createPersonFromEntries();
    this.personService.addPerson(createdPerson);

    this.personForm.reset();
    this.updatePersonForm(createPerson(""));

    this.nameField.nativeElement.focus();
    this.nameField.nativeElement.select();
    this.nameField.nativeElement.scrollIntoView({behavior: "smooth", block: "nearest"});
  }


  /**
   * Handles the logic when a drag-and-drop operation is completed for a time slot.
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

    if (targetPriority === sourcePriority) return;

    if (sourcePriority === AVAILABLE_SLOTS_PRIORITY) {
      this.timeSlotsSource = this.timeSlotsSource.filter(s => s.id !== slot.id);
      this.addTimeSlotToBucket(targetPriority, slot);
      this.addNextBucket();
      this.personForm.updateValueAndValidity();

      return;
    }

    if (targetPriority === AVAILABLE_SLOTS_PRIORITY) {
      this.removeSlotFromBucket(sourcePriority, slot);
      this.timeSlotsSource = this.timeSlotsSource.concat(slot)
        .sort((a, b) => a.start.compareTo(b.start));
      this.cleanUpBuckets();
      this.validateAllSlotLists();
      this.personForm.updateValueAndValidity();

      return;
    }

    this.removeSlotFromBucket(sourcePriority, slot);
    this.addTimeSlotToBucket(targetPriority, slot);
    this.addNextBucket();
    this.cleanUpBuckets();
    this.validateAllSlotLists();
    this.personForm.updateValueAndValidity();
  }


  protected get isNameFieldUsed(): boolean {
    const field = this.personForm.controls.name;

    return field.dirty || field.touched;
  }


  private addTimeSlotToBucket(targetPriority: number, slot: TimeSlot) {
    const targetBucket = this.personForm.controls.timeSlots.controls.find(t => t.controls.priority.value === targetPriority)!;
    const targetSlots = targetBucket.controls.slots.value;
    targetBucket.controls.slots.patchValue(
      targetSlots
        .concat(slot)
        .sort((a, b) => a.start.compareTo(b.start))
    );
    targetBucket.controls.validity.setValue("ok");
    targetBucket.controls.validity.updateValueAndValidity();
  }


  private bucketNeedsValidation(priority: number) {
    if (priority === 1) return true;

    const length = this.priorityTimeSlots.length;
    const index = this.priorityTimeSlots.findIndex(t => t.controls.priority.value === priority);

    return index > 0 && index < length - 1;
  }


  private createNewBucket(priority: number, timeSlots: TimeSlot[] = []): FormGroup<PersonTimeSlotBucketForm> {
    return this.formBuilder.group({
      validity: this.formBuilder.control("", [Validators.required, Validators.pattern("ok")]),
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

    this.validateSlotList(buckets.length + 1);
  }


  private removeBucket(priority: number) {
    const buckets = this.personForm.controls.timeSlots.controls;
    const newBuckets = buckets.filter(t => t.controls.priority.value !== priority);
    this.personForm.controls.timeSlots = this.formBuilder.array(newBuckets);
  }


  private cleanUpBuckets() {
    const buckets = this.personForm.controls.timeSlots.controls;
    const length = buckets.length;

    if (length === 1) return;

    let lastFilledBucket = -1;

    buckets.forEach((bucket, index) => {
      const slots = bucket.controls.slots.value;
      const slotsLength = slots.length;

      if (slotsLength > 0) {
        lastFilledBucket = index;
      }
    });

    for (let i = lastFilledBucket + 2; i < length; i++) {
      this.removeBucket(buckets[i].controls.priority.value);
    }
  }


  private removeSlotFromBucket(sourcePriority: number, slot: TimeSlot) {
    const bucket = this.personForm.controls.timeSlots.controls
      .find(t => t.controls.priority.value === sourcePriority)!;

    const timeSlots = bucket.controls.slots.value
      .filter(s => s.id !== slot.id);
    bucket.controls.slots.patchValue(timeSlots);

    this.validateSlotList(sourcePriority);
  }


  private validateAllSlotLists() {
    this.priorityTimeSlots.forEach(t => {
      this.validateSlotList(t.controls.priority.value)
    });
  }


  private validateSlotList(priority: number) {
    const bucket = this.personForm.controls.timeSlots.controls
      .find(t => t.controls.priority.value === priority);

    if (!bucket) return;

    const slots = bucket.controls.slots.value;
    const slotsLength = slots.length;
    const validityField = bucket.controls.validity;

    if (this.bucketNeedsValidation(priority)) {
      validityField.setValue(slotsLength > 0 ? "ok" : "");
      validityField.updateValueAndValidity();
    } else {
      validityField.setValue("ok");
      validityField.updateValueAndValidity();
    }
  }


  private createPersonFromEntries(): Person {
    const priorKnowledge: PersonKnowledge[] = this.personForm.controls.priorKnowledge.controls
      .filter(k => k.value.selected)
      .map(k => createPersonKnowledge(k.value.priorKnowledge!, k.value.remark));
    let personTimeSlots: PersonTimeSlot[] = this.priorityTimeSlots
      .map(s => {
        return s.value.slots!.map(slot => createPersonTimeSlot(slot, s.controls.priority.value))
      })
      .flat();

    return {
      id: this.personId,
      name: this.personForm.controls.name.value,
      info: this.personForm.controls.info.value,
      priorKnowledge: priorKnowledge,
      timeSlots: personTimeSlots
    };
  }


  private fillKnowledge(person: Person): void {
    const knowledge = this._priorKnowledgeSource.map(k => {
      const priorKnowledge = person.priorKnowledge.find(pK => pK.priorKnowledge.id === k.id)

      return this.formBuilder.group({
        priorKnowledge: this.formBuilder.control(k),
        remark: this.formBuilder.control(priorKnowledge?.remark || ""),
        selected: this.formBuilder.control(priorKnowledge !== undefined)
      })
    });

    this.personForm.controls.priorKnowledge = this.formBuilder.array(knowledge);
  }


  private fillTimeSlots(person: Person) {
    const length = person.timeSlots.length;

    if (length === 0) {
      const firstBucketForm = this.createNewBucket(1);
      this.personForm.controls.timeSlots = this.formBuilder.array([firstBucketForm]);
      firstBucketForm.controls.validity.setValue("");
      firstBucketForm.controls.validity.updateValueAndValidity();
      this.updateTimeSlotSource(person);
      this.validateAllSlotLists();

      return;
    }

    const slotsMap = new Map<number, TimeSlot[]>();
    person.timeSlots.forEach(t => {
      const priorityKey = t.priority || 1;
      const slots = slotsMap.get(priorityKey) || [];
      slots.push(t.timeSlot);
      slotsMap.set(priorityKey, slots)
    });

    const timeSlots: FormGroup<PersonTimeSlotBucketForm>[] = [];
    slotsMap.forEach((slots, priority) => {
      timeSlots.push(this.createNewBucket(priority, slots));
    });

    this.personForm.controls.timeSlots = this.formBuilder.array(timeSlots);
    this.updateTimeSlotSource(person);
    this.addNextBucket();
    this.validateAllSlotLists();
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


  private updatePersonForm(person: Person) {
    this.personId = person.id;
    this.personForm.patchValue({
      name: person.name,
      info: person.info
    });

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
  }
}

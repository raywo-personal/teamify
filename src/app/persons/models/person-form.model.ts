import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {PriorKnowledge} from '../../prior-knowledge/models/prior-knowledge.model';
import {TimeSlot} from '../../timeslots/models/time-slot.model';


export interface PersonKnowledgeForm {
  priorKnowledge: FormControl<PriorKnowledge>;
  remark: FormControl<string>;
  selected: FormControl<boolean>;
}

export interface PersonTimeSlotBucketForm {
  validity: FormControl<string>;
  priority: FormControl<number>;
  slots: FormControl<TimeSlot[]>
}

export interface PersonForm {
  name: FormControl<string>;
  info: FormControl<string>;
  priorKnowledge: FormArray<FormGroup<PersonKnowledgeForm>>;
  timeSlots: FormArray<FormGroup<PersonTimeSlotBucketForm>>;
}

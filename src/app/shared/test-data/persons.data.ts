import {createPerson, Person} from '../../persons/models/person.model';
import {knowledgeList} from './knowledge.data';
import {createPersonKnowledge} from '../../persons/models/person-knowledge.model';
import {createPersonTimeSlot, PersonTimeSlot} from '../../persons/models/person-timeslot.model';
import {slot1, slot2, slot3} from './time-slots.data';


function createPersonTimeSlots(): PersonTimeSlot[] {
  return [
    createPersonTimeSlot(slot1, 2),
    createPersonTimeSlot(slot2, 1),
    createPersonTimeSlot(slot3, 2),
  ]
}

export const person1: Person = createPerson("Person 1", "some description 1");
export const person2: Person = createPerson("Person 2", "some description 2");

export const anton: Person = createPerson(
  "Anton",
  "Anton’s description",
  [...knowledgeList.map((k, index) =>
    createPersonKnowledge(k, `Comment ${index + 1}`))],
  createPersonTimeSlots()
);


export const persons: Person[] = [person1, person2]
export const personsWithData: Person[] = [anton]

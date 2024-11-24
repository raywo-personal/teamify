import {inject, Injectable} from '@angular/core';
import {createPerson, Person} from '../models/person.model';
import {BehaviorSubject} from 'rxjs';
import {PriorKnowledgeService} from '../../prior-knowledge/services/prior-knowledge.service';
import {TimeSlotService} from '../../timeslots/services/time-slot.service';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private knowledgeService = inject(PriorKnowledgeService);
  private timeSlotService = inject(TimeSlotService);

  private _persons: Person[] = [
    createPerson("Peter"),
    createPerson("Paul"),
    createPerson("Mary"),
  ];

  private personsSubject = new BehaviorSubject<Person[]>(this._persons);
  public readonly persons$ = this.personsSubject.asObservable();


  constructor() {
    this.knowledgeService.knowledgeList$
      .subscribe(knowledge => {
        this.persons.forEach(p => {
          const randomCount = this.randomNumber(knowledge.length);
          const indices = this.randomIndices(knowledge.length, randomCount);

          p.priorKnowledge = indices.map(i => knowledge[i]);
        });
      })

    this.timeSlotService.slots$
      .subscribe(slots => {
        this.persons.forEach(p => {
          const randomCount = this.randomNumber(slots.length, 1);
          const indices = this.randomIndices(slots.length, randomCount);

          p.timeSlots = indices.map(i => slots[i]);
        });
      })
  }


  public addPerson(person: Person) {
    this.persons = this.persons.concat(person);
  }


  public updatePerson(person: Person) {
    this.persons = this.persons.map(p => p.id === person.id ? person : p);
  }


  public removePerson(person: Person) {
    this.persons = this.persons.filter(p => p.id !== person.id);
  }


  private get persons() {
    return this.personsSubject.getValue();
  }


  private set persons(value: Person[]) {
    this.personsSubject.next(value);
  }


  // TODO: Remove!
  private randomNumber(max: number, min = 0): number {
    return Math.max(Math.floor(Math.random() * max), min);
    // return Math.floor(Math.random() * (max )) + min;
  }


  private randomIndices(max: number, count: number): number[] {
    const indices: number[] = [];

    while (indices.length < count) {
      const randomNumber = this.randomNumber(max);

      if (!indices.includes(randomNumber)) {
        indices.push(randomNumber);
      }
    }

    return indices;
  }
}

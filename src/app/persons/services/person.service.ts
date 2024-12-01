import {inject, Injectable} from '@angular/core';
import {Person} from '../models/person.model';
import {BehaviorSubject} from 'rxjs';
import {FakePersonDataService} from './fake-person-data.service';
import {PersonTimeSlot} from '../models/person-timeslot.model';
import {Time} from '../../timeslots/models/time.model';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private fakePersonDataService = inject(FakePersonDataService);
  private _persons: Person[] = this.fakePersonDataService.persons;

  private personsSubject = new BehaviorSubject<Person[]>([]);
  public readonly persons$ = this.personsSubject.asObservable();


  public get persons() {
    return this.personsSubject.getValue();
  }


  public earliestTimeSlot(person: Person): PersonTimeSlot {
    return person.timeSlots
      .filter(s => s.priority === 1)
      .reduce((smallest, current) => {
        return smallest.timeSlot.start.compareTo(current.timeSlot.start) < 0 ? smallest : current
      });
  }


  public earliestStartTime(person: Person): Time {
    return this.earliestTimeSlot(person).timeSlot.start;
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


  public createFakeData() {
    this._persons.forEach(person => this.addPerson(person));
  }


  private set persons(value: Person[]) {
    this.personsSubject.next(value);
  }

}

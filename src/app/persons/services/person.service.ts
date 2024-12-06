import {inject, Injectable} from '@angular/core';
import {Person} from '../models/person.model';
import {BehaviorSubject} from 'rxjs';
import {FakePersonDataService} from './fake-person-data.service';
import {PersonTimeSlot} from '../models/person-timeslot.model';
import {Time} from '../../timeslots/models/time.model';
import {randomNumber} from '../../shared/helper/random';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private fakePersonDataService = inject(FakePersonDataService);
  private _persons: Person[] = this.fakePersonDataService.persons;

  private personsSubject = new BehaviorSubject<Person[]>([]);
  public readonly persons$ = this.personsSubject.asObservable();

  private availablePersonsSubject = new BehaviorSubject<Person[]>([]);
  public readonly availablePersons$ = this.availablePersonsSubject.asObservable();



  public get persons() {
    return this.personsSubject.getValue();
  }


  public get availablePersons(): Person[] {
    return this.availablePersonsSubject.getValue();
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
    this.addAvailablePerson(person);
  }


  public updatePerson(person: Person) {
    this.persons = this.persons.map(p => p.id === person.id ? person : p);
    this.updateAvailablePerson(person);
  }


  public removePerson(person: Person) {
    this.persons = this.persons.filter(p => p.id !== person.id);
    this.removeAvailablePerson(person);
  }


  public addAvailablePerson(person: Person) {
    this.availablePersons = this.availablePersons.concat(person);
  }


  public updateAvailablePerson(person: Person) {
    this.availablePersons = this.availablePersons.map(p => p.id === person.id ? person : p);
  }


  public removeAvailablePerson(person: Person) {
    this.availablePersons = this.availablePersons.filter(p => p.id !== person.id);
  }


  public getRandomAvailablePerson(): Person | undefined {
    if (this.availablePersons.length === 0) {
      return undefined;
    }

    const randomIndex = randomNumber(this.availablePersons.length - 1);
    const person = this.availablePersons[randomIndex];
    this.removeAvailablePerson(person);

    return person;
  }


  public createFakeData() {
    this._persons.forEach(person => this.addPerson(person));
  }


  private set persons(value: Person[]) {
    this.personsSubject.next(value);
  }


  private set availablePersons(value: Person[]) {
    this.availablePersonsSubject.next(value);
  }

}

import {effect, inject, Injectable, signal} from '@angular/core';
import {Person} from '../models/person.model';
import {BehaviorSubject} from 'rxjs';
import {FakePersonDataService} from './fake-person-data.service';
import {PersonTimeSlot} from '../models/person-timeslot.model';
import {Time} from '../../timeslots/models/time.model';
import {randomNumber} from '../../shared/helper/random';
import {SortOrder, stringCompare, timeCompare} from '../../shared/helper/comparison';
import {Team} from '../../teams/models/team.model';


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

  private filteredPersonsSubject = new BehaviorSubject<Person[]>([]);
  public readonly filteredPersons$ = this.filteredPersonsSubject.asObservable();

  public readonly nameSortOrder = signal<SortOrder>("asc");
  public readonly slotSortOrder = signal<SortOrder>("asc");
  public readonly personFilter = signal<string>("");


  constructor() {
    effect(() => {
      const nameSortOrder = this.nameSortOrder();
      const timeSlotSortOrder = this.slotSortOrder();

      this.sortAvailablePersons(nameSortOrder, timeSlotSortOrder);
    });

    effect(() => {
      const personFilter = this.personFilter();
      this.filterAvailablePersons(personFilter);
    });

    this.sortAvailablePersons(this.nameSortOrder(), this.slotSortOrder());
  }


  public get persons() {
    return this.personsSubject.getValue();
  }


  public get availablePersons(): Person[] {
    return this.availablePersonsSubject.getValue();
  }


  public get filteredPersons(): Person[] {
    return this.filteredPersonsSubject.getValue();
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
    this.sortAvailablePersons(this.nameSortOrder(), this.slotSortOrder());
  }


  public updateAvailablePerson(person: Person) {
    this.availablePersons = this.availablePersons.map(p => p.id === person.id ? person : p);
    this.sortAvailablePersons(this.nameSortOrder(), this.slotSortOrder());
  }


  public removeAvailablePerson(person: Person) {
    this.availablePersons = this.availablePersons.filter(p => p.id !== person.id);
    this.sortAvailablePersons(this.nameSortOrder(), this.slotSortOrder());
  }


  public getRandomAvailablePerson(team: Team): Person | undefined {
    if (this.availablePersons.length === 0) {
      return undefined;
    }

    const candidates = this.availablePersons
      .filter(p =>
        p.timeSlots.some(t => t.timeSlot.id === team.timeSlot.id));
    const randomIndex = randomNumber(candidates.length - 1);
    const person = candidates[randomIndex];

    if (person) {
      this.removeAvailablePerson(person);
    }

    return person;
  }


  public resetAvailablePersons() {
    this.availablePersons = this.persons;
  }


  private sortAvailablePersons(nameSortOrder: SortOrder,
                               slotSortOrder: SortOrder) {
    this.availablePersons.sort((a, b) => {
      const aEarliestStart = this.earliestStartTime(a);
      const bEarliestStart = this.earliestStartTime(b);

      let slotComparison = timeCompare(
        aEarliestStart,
        bEarliestStart,
        slotSortOrder
      );

      if (slotComparison !== 0) {
        return slotComparison;
      }

      return stringCompare(a.name, b.name, nameSortOrder);
    });

    this.filterAvailablePersons(this.personFilter());
  }


  private filterAvailablePersons(filter: string) {
    if (filter === "all") {
      this.filteredPersons = [...this.availablePersons];
    } else {
      this.filteredPersons = this.availablePersons.filter(p => p.timeSlots.some(t => t.timeSlot.id === filter));
    }
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


  private set filteredPersons(value: Person[]) {
    this.filteredPersonsSubject.next(value);
  }
}

import {effect, Injectable, signal} from '@angular/core';
import {Person} from '../models/person.model';
import {BehaviorSubject, map, Subject} from 'rxjs';
import {PersonTimeSlot} from '../models/person-timeslot.model';
import {Time} from '../../timeslots/models/time.model';
import {randomNumber} from '../../shared/helper/random';
import {SortOrder, stringCompare, timeCompare} from '../../shared/helper/comparison';
import {Team} from '../../teams/models/team.model';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private personsSubject = new BehaviorSubject<Person[]>([]);
  public readonly persons$ = this.personsSubject.asObservable();

  private filteredPersonsSubject = new BehaviorSubject<Person[]>([]);
  public readonly filteredPersons$ = this.filteredPersonsSubject.asObservable();

  private availablePersonsSubject = new BehaviorSubject<Person[]>([]);
  public readonly availablePersons$ = this.availablePersonsSubject.asObservable();

  private filteredAvailablePersonsSubject = new BehaviorSubject<Person[]>([]);
  public readonly filteredAvailablePersons$ = this.filteredAvailablePersonsSubject.asObservable();

  public readonly nameSortOrder = signal<SortOrder>("asc");
  public readonly slotSortOrder = signal<SortOrder>("asc");
  public readonly slotFilter = signal<string>("all");
  public readonly nameFilter = signal<string>("");

  private personAddedSubject = new Subject<Person>();
  public readonly personAdded$ = this.personAddedSubject.asObservable();
  private personUpdatedSubject = new Subject<Person>();
  public readonly personUpdated$ = this.personUpdatedSubject.asObservable();
  private personRemovedSubject = new Subject<Person>();
  public readonly personRemoved$ = this.personRemovedSubject.asObservable();

  public readonly personCount$ = this.persons$.pipe(map(persons => persons.length));
  public readonly availablePersonCount$ = this.availablePersons$.pipe(map(persons => persons.length));


  constructor() {
    this.filteredPersons = [...this.persons];
    this.filteredAvailablePersons = [...this.availablePersons];

    this.sortPersons(this.nameSortOrder(), this.slotSortOrder());
    this.sortAvailablePersons(this.nameSortOrder(), this.slotSortOrder());

    effect(() => {
      const nameSortOrder = this.nameSortOrder();
      const timeSlotSortOrder = this.slotSortOrder();

      this.sortPersons(nameSortOrder, timeSlotSortOrder);
      this.sortAvailablePersons(nameSortOrder, timeSlotSortOrder);
    });

    effect(() => {
      const nameFilter = this.nameFilter();
      const personFilter = this.slotFilter();

      this.filterPersons(personFilter, nameFilter);
      this.filterAvailablePersons(personFilter, nameFilter);
    });
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


  public get filteredAvailablePersons(): Person[] {
    return this.filteredAvailablePersonsSubject.getValue();
  }


  public earliestTimeSlot(person: Person): PersonTimeSlot | undefined {
    return person.timeSlots
      .filter(s => s.priority === 1)
      .reduce((smallest: PersonTimeSlot | undefined, current) => {
        if (!smallest) return current;

        return smallest.timeSlot.start.compareTo(current.timeSlot.start) < 0 ? smallest : current
      }, undefined);
  }


  public earliestStartTime(person: Person): Time {
    return this.earliestTimeSlot(person)?.timeSlot.start || new Time(9, 0);
  }


  public addPerson(person: Person, isRestore: boolean = false) {
    this.persons = this.persons.concat(person);
    this.filteredPersons = this.filteredPersons.concat(person);
    this.addAvailablePerson(person);

    if (!isRestore) this.personAddedSubject.next(person);
  }


  public updatePerson(person: Person) {
    this.persons = this.persons.map(p => p.id === person.id ? person : p);
    this.filteredPersons = this.filteredPersons.map(p => p.id === person.id ? person : p);
    this.updateAvailablePerson(person);
    this.personUpdatedSubject.next(person);
  }


  public removePerson(person: Person) {
    this.persons = this.persons.filter(p => p.id !== person.id);
    this.filteredPersons = this.filteredPersons.filter(p => p.id !== person.id);
    this.removeAvailablePerson(person);
    this.personRemovedSubject.next(person);
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


  public updateAvailablePersons(alreadyAssignedPersons: Person[]) {
    this.availablePersons = this.persons.filter(p => {
      return !alreadyAssignedPersons.some(ap => ap.id === p.id);
    });
    this.filterAvailablePersons(this.slotFilter(), this.nameFilter());
  }


  public resetAvailablePersons() {
    this.availablePersons = this.persons;
    this.filterAvailablePersons(this.slotFilter(), this.nameFilter());
  }


  public resetPriorKnowledge() {
    this.persons.forEach(p => {
      p.priorKnowledge = [];
    });
  }


  public resetPersonsTimeSlots() {
    this.persons.forEach(p => {
      p.timeSlots = [];
    });
  }


  private sortPersons(nameSortOrder: SortOrder, slotSortOrder: SortOrder) {
    this.filterPersons(this.slotFilter(), this.nameFilter());

    this.filteredPersons.sort((a, b) => {
      return this.compareByNameAndEarliestStart(a, b, slotSortOrder, nameSortOrder);
    });
  }


  private sortAvailablePersons(nameSortOrder: SortOrder,
                               slotSortOrder: SortOrder) {
    this.filterAvailablePersons(this.slotFilter(), this.nameFilter());

    this.filteredAvailablePersons.sort((a, b) => {
      return this.compareByNameAndEarliestStart(a, b, nameSortOrder, slotSortOrder);
    });
  }


  private compareByNameAndEarliestStart(a: Person, b: Person, slotSortOrder: SortOrder, nameSortOrder: SortOrder): number {
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
  }


  private filterPersons(filter: string, nameFilter: string) {
    if (filter === "all" && nameFilter === "") {
      this.filteredPersons = [...this.persons];
      return;
    }

    this.filteredPersons = this.persons
      .filter(p => filter === "all" || p.timeSlots.some(t => t.timeSlot.id === filter))
      .filter(p => nameFilter === "" || p.name.toLowerCase().includes(nameFilter.toLowerCase()));
  }


  private filterAvailablePersons(filter: string, nameFilter: string) {
    if (filter === "all" && nameFilter === "") {
      this.filteredAvailablePersons = [...this.availablePersons];
      return;
    }

    this.filteredAvailablePersons = this.availablePersons
      .filter(p => filter === "all" || p.timeSlots.some(t => t.timeSlot.id === filter))
      .filter(p => nameFilter === "" || p.name.toLowerCase().includes(nameFilter.toLowerCase()));
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


  private set filteredAvailablePersons(value: Person[]) {
    this.filteredAvailablePersonsSubject.next(value);
  }
}

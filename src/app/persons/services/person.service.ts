import { Injectable } from '@angular/core';
import {createPerson, Person} from '../models/person.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private _persons: Person[] = [
    createPerson("Peter"),
    createPerson("Paul"),
    createPerson("Mary"),
  ];

  private personsSubject = new BehaviorSubject<Person[]>(this._persons);
  public readonly persons$ = this.personsSubject.asObservable();

  constructor() { }


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
}

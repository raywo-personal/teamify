import {inject, Injectable} from '@angular/core';
import {Person} from '../models/person.model';
import {BehaviorSubject} from 'rxjs';
import {FakePersonDataService} from './fake-person-data.service';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private fakePersonDataService = inject(FakePersonDataService);
  private _persons: Person[] = this.fakePersonDataService.persons;

  private personsSubject = new BehaviorSubject<Person[]>(this._persons);
  public readonly persons$ = this.personsSubject.asObservable();


  public addPerson(person: Person) {
    this.persons = this.persons.concat(person);
  }


  public updatePerson(person: Person) {
    this.persons = this.persons.map(p => p.id === person.id ? person : p);
  }


  public removePerson(person: Person) {
    this.persons = this.persons.filter(p => p.id !== person.id);
  }


  public get persons() {
    return this.personsSubject.getValue();
  }


  private set persons(value: Person[]) {
    this.personsSubject.next(value);
  }

}

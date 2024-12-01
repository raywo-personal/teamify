import {inject, Injectable} from '@angular/core';
import {createPerson, Person} from '../models/person.model';
import {PriorKnowledgeService} from '../../prior-knowledge/services/prior-knowledge.service';
import {TimeSlotService} from '../../timeslots/services/time-slot.service';
import {generate} from 'random-words';


@Injectable({
  providedIn: 'root'
})
export class FakePersonDataService {

  private knowledgeService = inject(PriorKnowledgeService);
  private timeSlotService = inject(TimeSlotService);

  private _persons: Person[] = [
    createPerson("Nikolaj", "on Premise"),
    createPerson("Stefan"),
    createPerson("Ute", "zOS"),
    createPerson("Franziska", "Testen"),
    createPerson("Thomas Frauenknecht"),
    createPerson("Sascha", "kein Entwickler"),
    createPerson("Michael Getrost", "on Premise"),
    createPerson("Thomas Gundelwein", "on Premise"),
    createPerson("Walther", "on Premise"),
    createPerson("Fabian"),
    createPerson("Birgit", "on Premise"),
    createPerson("Norbert Pick", "kein Entwickler"),
    createPerson("Dragan"),
    createPerson("Thomas Raffel"),
    createPerson("Arthur"),
    createPerson("Markus"),
    createPerson("Dmitry"),
    createPerson("Michael Schacher"),
    createPerson("Tanja"),
    createPerson("Orkun"),
    createPerson("Ralf"),
    createPerson("Norbert Tausend"),
    createPerson("Marius"),
    createPerson("Emre")
  ];


  // TODO: Remove once real data are available
  constructor() {
    this.knowledgeService.knowledgeList$
      .subscribe(knowledge => {
        this._persons.forEach(p => {
          const randomCount = this.randomNumber(knowledge.length);
          const indices = this.randomIndices(knowledge.length, randomCount);

          p.priorKnowledge = indices.map(i => {
            return {
              priorKnowledge: knowledge[i],
              remark: generate({min: 3, max: 15, join: " "})
            }
          });
        });
      })

    this.timeSlotService.slots$
      .subscribe(slots => {
        this._persons.forEach(p => {
          const randomCount = this.randomNumber(slots.length, 1);
          const indices = this.randomIndices(slots.length, randomCount);

          p.timeSlots = indices.map((i, index) => {
            return {
              timeSlot: slots[i],
              priority: index === 0 ? 1 : this.randomNumberIncludingUndefined(4)
            }
          });
        });
      })
  }


  public get persons() {
    return this._persons;
  }

  private randomNumber(max: number, min = 0): number {
    return Math.max(Math.floor(Math.random() * max), min);
  }


  private randomNumberIncludingUndefined(max: number): number | undefined {
    const random = this.randomNumber(max, -1);

    return random === -1 ? undefined : random + 1;
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

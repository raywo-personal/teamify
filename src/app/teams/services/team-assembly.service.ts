import {inject, Injectable} from '@angular/core';
import {PersonService} from '../../persons/services/person.service';
import {TeamService} from './team.service';
import {Team} from '../models/team.model';
import {Person} from '../../persons/models/person.model';
import {randomNumber} from '../../shared/helper/random';
import {PriorKnowledgeService} from '../../prior-knowledge/services/prior-knowledge.service';
import {PriorKnowledge} from '../../prior-knowledge/models/prior-knowledge.model';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TeamAssemblyService {

  private personService = inject(PersonService);
  private teamService = inject(TeamService);
  private knowledgeService = inject(PriorKnowledgeService);

  private availablePersonsSubject = new BehaviorSubject<Person[]>([]);
  public readonly availablePersons$ = this.availablePersonsSubject.asObservable();


  constructor() {
    this.personService.persons$.subscribe(persons => {
      this.availablePersons = persons;
    });
  }


  public assembleTeams() {
    const persons = this.personService.persons;
    this.availablePersons = persons;
    const teams = this.teamService.teams;
    const knowledgeList = this.knowledgeService.knowledgeList;

    const personsPerTeam = Math.ceil(persons.length / teams.length);

    // 1.  Build person buckets by time slot
    // 2.  Iterate over teams and add persons
    // 3.  Iterate over prior knowledge
    // 3.1 Pick the first person from bucket matching the team’s time slot
    //     where the team’s time slot has the highest priority for the person.
    // 3.2 If all prior knowledge is iterated over, go to next bucket
    // 4.  If all buckets are processed
    // 4.1 Start all over with the first bucket
    // 4.2 If the team is not already full add a random person to the team
    //     and go to next bucket.
    // 4.3 Repeat until all teams are full and all persons are distributed.

    // teams.forEach(team => {
    //   for (let i = 0; i < personsPerTeam; i++) {
    //     const person = this.pickPerson(team, persons);
    //     team.persons.push(person);
    //   }
    // });


    // 1. Build person buckets by time slot
    const buckets = this.buildPersonBuckets(persons);

    let allTeamsFilled = false;
    while (!allTeamsFilled) {
      allTeamsFilled = true;

      // 2. Iterate over teams and add persons
      teams.forEach(team => {
        // 3. Iterate over prior knowledge
        knowledgeList.forEach(knowledge => {
          while (team.persons.length < personsPerTeam) {
            const person = this.pickPersonByPriorKnowledge(team, buckets, knowledge);

            if (person) {
              team.persons.push(person);
            } else {
              // 4.2 If the team is not already full add a random person to the team
              const randomPerson = this.pickRandomPersonFromBuckets();
              if (randomPerson) {
                team.persons.push(randomPerson);
              }
            }
          }
        });

        if (team.persons.length < personsPerTeam) {
          allTeamsFilled = false;
        }
      });
    }
  }


  private buildPersonBuckets(persons: Person[]): Map<string, Person[]> {
    const buckets = new Map<string, Person[]>();

    persons.forEach(person => {
      person.timeSlots.forEach(slot => {
        if (!buckets.has(slot.timeSlot.id)) {
          buckets.set(slot.timeSlot.id, []);
        }
        buckets.get(slot.timeSlot.id)!.push(person);
      });
    });

    // Sort bucket’s person list by time slot priority
    [...buckets.keys()].forEach((key) => {
      const persons = buckets.get(key)!;
      persons.sort((a, b) => {
        const slotA = a.timeSlots.find(slot => slot.timeSlot.id === key);
        const slotB = b.timeSlots.find(slot => slot.timeSlot.id === key);

        const slotAPriority = slotA?.priority || Number.MAX_SAFE_INTEGER;
        const slotBPriority = slotB?.priority || Number.MAX_SAFE_INTEGER;

        return slotAPriority - slotBPriority;
      })
    });

    return buckets;
  }


  private pickPersonByPriorKnowledge(team: Team,
                                     buckets: Map<string, Person[]>,
                                     knowledge: PriorKnowledge): Person | undefined {
    const bucket = buckets.get(team.timeSlot.id)!;

    if (bucket.length > 0) {
      const pickedPersonIndex = bucket
        .findIndex(tmpPerson => {
            return tmpPerson.priorKnowledge.some(pK => pK.priorKnowledge.id === knowledge.id)
          }
        );

      if (pickedPersonIndex !== -1) {
        const [pickedPerson] = bucket.splice(pickedPersonIndex, 1);
        this.removeFromAllBuckets(pickedPerson, buckets);

        return pickedPerson;
      }
    }

    return undefined;
  }


  private removeFromAllBuckets(person: Person, buckets: Map<string, Person[]>) {
    buckets.forEach((persons, _) => {
      const personIndex = persons.findIndex(p => p.id === person.id);
      if (personIndex !== -1) {
        persons.splice(personIndex, 1);
      }
    });

    this.availablePersons = this.availablePersons.filter(p => p.id !== person.id);
  }


  private pickRandomPersonFromBuckets(): Person | null {
    if (this.availablePersons.length === 0) {
      return null;
    }

    const randomIndex = randomNumber(this.availablePersons.length);
    const pickedPerson = this.availablePersons[randomIndex];
    this.availablePersons = this.availablePersons.filter(p => p.id !== pickedPerson.id);

    return pickedPerson
  }


  private get availablePersons(): Person[] {
    return this.availablePersonsSubject.getValue();
  }


  private set availablePersons(value: Person[]) {
    this.availablePersonsSubject.next(value);
  }
}

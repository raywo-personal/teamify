import {inject, Injectable} from '@angular/core';
import {PersonService} from '../../persons/services/person.service';
import {TeamService} from './team.service';
import {Team} from '../models/team.model';
import {Person} from '../../persons/models/person.model';
import {PriorKnowledgeService} from '../../prior-knowledge/services/prior-knowledge.service';
import {PriorKnowledge} from '../../prior-knowledge/models/prior-knowledge.model';


@Injectable({
  providedIn: 'root'
})
export class TeamAssemblyService {

  private personService = inject(PersonService);
  private teamService = inject(TeamService);
  private knowledgeService = inject(PriorKnowledgeService);


  public assembleTeams() {
    const persons = this.personService.persons;
    const teams = this.teamService.teams;
    const knowledgeList = this.knowledgeService.knowledgeList;

    const personsPerTeam = Math.ceil(persons.length / teams.length);
    const buckets = this.buildPersonBuckets(persons);

    teams.forEach(team => {
      knowledgeList.forEach(knowledge => {
        const person = this.pickPersonByPriorKnowledge(team, buckets, knowledge);
        this.teamService.addToTeam(team, person);
      })
    });

    teams.forEach(team => {
      while (team.persons.length < personsPerTeam) {
        const person = this.personService.getRandomAvailablePerson(team.timeSlot.id);

        if (!person) break;

        this.teamService.addToTeam(team, person);
      }
    })
  }


  public resetTeams() {
    this.teamService.clearAllPersonsInTeams();
    this.personService.resetAvailablePersons();
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
        this.removePersonFromAvailableList(pickedPerson, buckets);

        return pickedPerson;
      }
    }

    return undefined;
  }


  private removePersonFromAvailableList(person: Person, buckets: Map<string, Person[]>) {
    buckets.forEach((persons, _) => {
      const personIndex = persons.findIndex(p => p.id === person.id);
      if (personIndex !== -1) {
        persons.splice(personIndex, 1);
      }
    });

    this.personService.removeAvailablePerson(person);
  }
}

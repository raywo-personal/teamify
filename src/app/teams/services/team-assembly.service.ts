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
    let allTeamsFilled = false;

    while (!allTeamsFilled) {
      allTeamsFilled = true;

      teams.forEach(team => {
        knowledgeList.forEach(knowledge => {
          while (team.persons.length < personsPerTeam) {
            const person = this.pickPersonByPriorKnowledge(team, buckets, knowledge);

            if (person) {
              team.persons.push(person);
            } else {
              // 4.2 If the team is not already full add a random person to the team
              const randomPerson = this.personService.getRandomAvailablePerson();
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

    this.personService.removeAvailablePerson(person);
  }
}

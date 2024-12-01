import {inject, Injectable} from '@angular/core';
import {PersonService} from '../../persons/services/person.service';
import {TeamService} from './team.service';
import {Team} from '../models/team.model';
import {Person} from '../../persons/models/person.model';


@Injectable({
  providedIn: 'root'
})
export class TeamAssemblyService {

  private personService = inject(PersonService);
  private teamService = inject(TeamService);


  constructor() {
  }


  public assembleTeams() {
    const persons = this.personService.persons;
    const teams = this.teamService.teams;

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

    teams.forEach(team => {
      for (let i = 0; i < personsPerTeam; i++) {
        const person = this.pickPerson(team, persons);
        team.persons.push(person);
      }
    });
  }


  private pickPerson(team: Team, persons: Person[]): Person {
    const max = persons.length - 1;

    return persons[this.randomNumber(max)];
  }


  private randomNumber(max: number, min = 0): number {
    return Math.max(Math.floor(Math.random() * max), min);
  }
}

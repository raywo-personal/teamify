import {TestBed} from '@angular/core/testing';

import {TeamAssemblyService} from './team-assembly.service';
import {TeamService} from './team.service';
import {PersonService} from '../../persons/services/person.service';
import {PriorKnowledgeService} from '../../prior-knowledge/services/prior-knowledge.service';
import {createTeam, Team} from '../models/team.model';
import {createTimeSlot, TimeSlot} from '../../timeslots/models/time-slot.model';
import {createPerson, Person} from '../../persons/models/person.model';
import {createPersonTimeSlot} from '../../persons/models/person-timeslot.model';
import {createPersonKnowledge} from '../../persons/models/person-knowledge.model';
import {createPriorKnowledge, PriorKnowledge} from '../../prior-knowledge/models/prior-knowledge.model';


describe('TeamAssemblyService', () => {
  let service: TeamAssemblyService;
  let teamService: TeamService;
  let personService: PersonService;

  const morningSlot = createTimeSlot('Morning');
  const afternoonSlot = createTimeSlot('Afternoon');
  const angular = createPriorKnowledge('Angular');

  const person = (name: string, slot: TimeSlot, knowledge?: PriorKnowledge): Person =>
    createPerson(name, '',
      knowledge ? [createPersonKnowledge(knowledge)] : [],
      [createPersonTimeSlot(slot, 1)]);

  const stored = (team: Team) => teamService.teams.find(t => t.id === team.id)!;

  let morning: Team;
  let afternoon: Team;
  let expert: Person;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamAssemblyService);
    teamService = TestBed.inject(TeamService);
    personService = TestBed.inject(PersonService);

    TestBed.inject(PriorKnowledgeService).addKnowledge(angular, true);

    morning = createTeam(morningSlot);
    afternoon = createTeam(afternoonSlot);
    teamService.addTeam(morning, true);
    teamService.addTeam(afternoon, true);

    expert = person('Expert', morningSlot, angular);
    [
      person('Anna', morningSlot),
      expert,
      person('Ben', afternoonSlot),
      person('Cleo', afternoonSlot),
    ].forEach(p => personService.addPerson(p, true));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fills every team from its own slot up to an even size', () => {
    service.assembleTeams();

    expect(stored(morning).persons.map(p => p.name)).toEqual(['Anna', 'Expert']);
    expect(stored(afternoon).persons.map(p => p.name)).toEqual(['Ben', 'Cleo']);
    expect(personService.availablePersons).toEqual([]);
  });

  it('places a person with the prior knowledge in the team of their slot', () => {
    service.assembleTeams();

    expect(stored(morning).persons).toContain(expert);
  });

  it('empties all teams and makes every person available again on reset', () => {
    service.assembleTeams();

    service.resetTeams();

    expect(stored(morning).persons).toEqual([]);
    expect(stored(afternoon).persons).toEqual([]);
    expect(personService.availablePersons.length).toBe(4);
  });
});

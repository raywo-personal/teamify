import {TestBed} from '@angular/core/testing';

import {TeamService} from './team.service';
import {createTeam, Team} from '../models/team.model';
import {createTimeSlot} from '../../timeslots/models/time-slot.model';
import {createPerson} from '../../persons/models/person.model';


describe('TeamService', () => {
  let service: TeamService;
  let morning: Team;
  let afternoon: Team;

  const alice = createPerson('Alice');
  const bob = createPerson('Bob');

  const stored = (team: Team) => service.teams.find(t => t.id === team.id)!;
  const names = (team: Team) => stored(team).persons.map(p => p.name);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamService);

    morning = createTeam(createTimeSlot('Morning'));
    afternoon = createTeam(createTimeSlot('Afternoon'));
    service.addTeam(morning, true);
    service.addTeam(afternoon, true);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('keeps persons added through an outdated team reference', () => {
    service.addToTeam(morning, bob);
    service.addToTeam(morning, alice);

    expect(names(morning)).toEqual(['Alice', 'Bob']);
  });

  it('moves a person between teams given outdated team references', () => {
    service.addToTeam(morning, alice);
    service.addToTeam(afternoon, bob);

    service.moveBetweenTeams(morning, afternoon, alice);

    expect(names(morning)).toEqual([]);
    expect(names(afternoon)).toEqual(['Alice', 'Bob']);
  });

  it('replaces teams instead of mutating them', () => {
    service.addToTeam(morning, alice);
    const before = stored(morning);

    service.removePersonFromTeam(morning, alice);

    expect(before.persons.map(p => p.name)).toEqual(['Alice']);
    expect(stored(morning)).not.toBe(before);
  });

  it('clears the persons of every team', () => {
    service.addToTeam(morning, alice);
    service.addToTeam(afternoon, bob);
    const emitted: Team[][] = [];
    service.teams$.subscribe(teams => emitted.push(teams));

    service.clearAllPersonsInTeams();

    expect(names(morning)).toEqual([]);
    expect(names(afternoon)).toEqual([]);
    expect(emitted.at(-1)!.every(team => team.persons.length === 0)).toBe(true);
  });
});

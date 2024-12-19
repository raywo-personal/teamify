import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Team} from '../models/team.model';
import {TimeSlot} from "../../timeslots/models/time-slot.model";
import {Person} from '../../persons/models/person.model';
import {EventBusService} from '../../shared/event-bus/event-bus.service';
import {createBusEvent, EventType} from '../../shared/event-bus/event.model';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamsSubject = new BehaviorSubject<Team[]>([]);
  public teams$ = this.teamsSubject.asObservable();

  private eventBus = inject(EventBusService);


  public get teams(): Team[] {
    return this.teamsSubject.getValue();
  }


  public getTeamForSlot(slot: TimeSlot): Team | undefined {
    return this.teams.find(team => team.timeSlot.id === slot.id);
  }


  public clearAllPersonsInTeams() {
    this.teams.forEach(team => {
      team.persons = [];
      this.eventBus.emit(createBusEvent(EventType.TEAM_UPDATED, team));
    });
  }


  public addTeam(team: Team, isRestore: boolean = false) {
    this.teams = this.teams.concat(team);

    if (!isRestore) this.eventBus.emit(createBusEvent(EventType.TEAM_CREATED, team));
  }


  public addToTeam(team: Team, person?: Person) {
    if (!person) return;

    team.persons = team.persons.filter(p => p.id !== person.id);
    team.persons = team.persons
      .concat(person)
      .sort((a, b) => a.name.localeCompare(b.name));

    this.eventBus.emit(createBusEvent(EventType.TEAM_UPDATED, team));
  }


  public updateTeam(team: Team) {
    this.teams = this.teams.map(t => t.id === team.id ? team : t);
    this.eventBus.emit(createBusEvent(EventType.TEAM_UPDATED, team));
  }


  public updateTeamForSlot(slot: TimeSlot) {
    this.teams = this.teams.map(t => {
      if (t.timeSlot.id === slot.id) {
        t.timeSlot = slot;
        t.name = slot.description;
      }

      return t;
    });

    const team = this.teams.find(t => t.timeSlot.id === slot.id)!;
    this.eventBus.emit(createBusEvent(EventType.TEAM_UPDATED, team));
  }


  public removeTeam(team: Team) {
    this.teams = this.teams.filter(t => t.id !== team.id);
    this.eventBus.emit(createBusEvent(EventType.TEAM_DELETED, team));
  }


  public removeAllTeams() {
    this.teams = [];
    this.eventBus.emit(createBusEvent(EventType.TEAMS_RESET));
  }


  public removePersonFromTeam(team: Team, person: Person) {
    team.persons = team.persons.filter(p => p.id !== person.id);
    this.eventBus.emit(createBusEvent(EventType.TEAM_UPDATED, team));
  }


  public removeTeamForSlot(slot: TimeSlot) {
    this.teams = this.teams.filter(t => t.timeSlot.id !== slot.id);
    const team = this.teams.find(t => t.timeSlot.id === slot.id)!;
    this.eventBus.emit(createBusEvent(EventType.TEAM_DELETED, team));
  }


  public moveBetweenTeams(fromTeam: Team, toTeam: Team, person: Person) {
    this.removePersonFromTeam(fromTeam, person);
    this.addToTeam(toTeam, person);

    this.eventBus.emit(createBusEvent(EventType.TEAM_UPDATED, fromTeam));
    this.eventBus.emit(createBusEvent(EventType.TEAM_UPDATED, toTeam));
  }


  private set teams(value: Team[]) {
    this.teamsSubject.next(value);
  }
}

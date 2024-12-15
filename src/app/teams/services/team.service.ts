import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Team} from '../models/team.model';
import {TimeSlot} from "../../timeslots/models/time-slot.model";
import {Person} from '../../persons/models/person.model';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamsSubject = new BehaviorSubject<Team[]>([]);
  public teams$ = this.teamsSubject.asObservable();

  private teamAddedSubject = new Subject<Team>();
  public readonly teamAdded$ = this.teamAddedSubject.asObservable();
  private teamRemovedSubject = new Subject<Team>();
  public readonly teamRemoved$ = this.teamRemovedSubject.asObservable();
  private teamUpdatedSubject = new Subject<Team>();
  public readonly teamUpdated$ = this.teamUpdatedSubject.asObservable();
  private teamResetSubject = new Subject<void>();
  public readonly teamReset$ = this.teamResetSubject.asObservable();


  public get teams(): Team[] {
    return this.teamsSubject.getValue();
  }


  public getTeamForSlot(slot: TimeSlot): Team | undefined {
    return this.teams.find(team => team.timeSlot.id === slot.id);
  }


  public clearAllPersonsInTeams() {
    this.teams.forEach(team => {
      team.persons = [];
      this.teamUpdatedSubject.next(team);
    });
  }


  public addTeam(team: Team, isRestore: boolean = false) {
    this.teams = this.teams.concat(team);

    if (!isRestore) this.teamAddedSubject.next(team);
  }


  public addToTeam(team: Team, person?: Person) {
    if (!person) return;

    team.persons = team.persons.filter(p => p.id !== person.id);
    team.persons = team.persons
      .concat(person)
      .sort((a, b) => a.name.localeCompare(b.name));

    this.teamUpdatedSubject.next(team);
  }


  public updateTeam(team: Team) {
    this.teams = this.teams.map(t => t.id === team.id ? team : t);
    this.teamUpdatedSubject.next(team);
  }


  public updateTeamForSlot(slot: TimeSlot) {
    this.teams = this.teams.map(t => {
      if (t.timeSlot.id === slot.id) {
        t.timeSlot = slot;
        t.name = slot.description;
      }

      return t;
    });

    this.teamUpdatedSubject.next(this.teams.find(t => t.timeSlot.id === slot.id)!);
  }


  public removeTeam(team: Team) {
    this.teams = this.teams.filter(t => t.id !== team.id);
    this.teamRemovedSubject.next(team);
  }


  public removeAllTeams() {
    this.teams = [];
    this.teamResetSubject.next();
  }


  public removePersonFromTeam(team: Team, person: Person) {
    team.persons = team.persons.filter(p => p.id !== person.id);
    this.teamUpdatedSubject.next(team);
  }


  public removeTeamForSlot(slot: TimeSlot) {
    this.teams = this.teams.filter(t => t.timeSlot.id !== slot.id);
    this.teamRemovedSubject.next(this.teams.find(t => t.timeSlot.id === slot.id)!);
  }


  public moveBetweenTeams(fromTeam: Team, toTeam: Team, person: Person) {
    this.removePersonFromTeam(fromTeam, person);
    this.addToTeam(toTeam, person);

    this.teamUpdatedSubject.next(fromTeam);
    this.teamUpdatedSubject.next(toTeam);
  }


  private set teams(value: Team[]) {
    this.teamsSubject.next(value);
  }
}

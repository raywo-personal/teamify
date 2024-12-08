import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Team} from '../models/team.model';
import {TimeSlot} from "../../timeslots/models/time-slot.model";
import {Person} from '../../persons/models/person.model';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamsSubject = new BehaviorSubject<Team[]>([]);
  public teams$ = this.teamsSubject.asObservable();


  public get teams(): Team[] {
    return this.teamsSubject.getValue();
  }


  public getTeamForSlot(slot: TimeSlot): Team | undefined {
    return this.teams.find(team => team.timeSlot.id === slot.id);
  }


  public clearAllPersonsInTeams() {
    this.teams.forEach(team => team.persons = []);
  }


  public addTeam(team: Team) {
    this.teams = this.teams.concat(team);
  }


  public addToTeam(team: Team, person?: Person) {
    if (!person) return;

    team.persons = team.persons.filter(p => p.id !== person.id);
    team.persons = team.persons
      .concat(person)
      .sort((a, b) => a.name.localeCompare(b.name));
  }


  public updateTeam(team: Team) {
    this.teams = this.teams.map(t => t.id === team.id ? team : t);
  }


  public updateTeamForSlot(slot: TimeSlot) {
    this.teams = this.teams.map(t => {
      if (t.timeSlot.id === slot.id) {
        t.timeSlot = slot;
        t.name = slot.description;
      }

      return t;
    })
  }


  public removeTeam(team: Team) {
    this.teams = this.teams.filter(t => t.id !== team.id);
  }


  public removePersonFromTeam(team: Team, person: Person) {
    team.persons = team.persons.filter(p => p.id !== person.id);
  }


  public removeTeamForSlot(slot: TimeSlot) {
    this.teams = this.teams.filter(t => t.timeSlot.id !== slot.id);
  }


  public moveBetweenTeams(fromTeam: Team, toTeam: Team, person: Person) {
    this.removePersonFromTeam(fromTeam, person);
    this.addToTeam(toTeam, person);
  }


  private set teams(value: Team[]) {
    this.teamsSubject.next(value);
  }
}

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Team} from '../models/team.model';
import {TimeSlot} from "../../timeslots/models/time-slot.model";


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamsSubject = new BehaviorSubject<Team[]>([]);
  public teams$ = this.teamsSubject.asObservable();


  public get teams(): Team[] {
    return this.teamsSubject.getValue();
  }


  public clearAllPersonsInTeams() {
    this.teams.forEach(team => team.persons = []);
    this.teams = this.teams.map(t => {
      t.persons = []
      return t;
    });
  }


  public addTeam(team: Team) {
    this.teams = this.teams.concat(team);
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


  public removeTeamForSlot(slot: TimeSlot) {
    this.teams = this.teams.filter(t => t.timeSlot.id !== slot.id);
  }


  private set teams(value: Team[]) {
    this.teamsSubject.next(value);
  }
}

import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Team} from '../models/team.model';
import {FakeTeamService} from './fake-team.service';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  // TODO: Remove once real data exist!
  private fakeTeamService = inject(FakeTeamService);
  private _teams: Team[] = this.fakeTeamService.teams;

  private teamsSubject = new BehaviorSubject<Team[]>(this._teams);
  public teams$ = this.teamsSubject.asObservable();


  constructor() {
  }


  public addTeam(team: Team) {
    this.teams = this.teams.concat(team);
  }


  public updateTeam(team: Team) {
    this.teams = this.teams.map(t => t.id === team.id ? team : t);
  }


  public removeTeam(team: Team) {
    this.teams = this.teams.filter(t => t.id !== team.id);
  }


  private get teams() {
    return this.teamsSubject.getValue();
  }


  private set teams(value: Team[]) {
    this.teamsSubject.next(value);
  }
}

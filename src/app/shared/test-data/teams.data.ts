import {createTeam, Team} from '../../teams/models/team.model';
import {slot1, slot2} from './time-slots.data';


export const team1: Team = createTeam("Team 1", slot1, []);
export const team2: Team = createTeam("Team 2", slot2, []);

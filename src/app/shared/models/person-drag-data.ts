import {Team} from '../../teams/models/team.model';
import {Person} from '../../persons/models/person.model';


export interface PersonDragData {

  origin?: string;
  originTeam: Team;
  person: Person;

}

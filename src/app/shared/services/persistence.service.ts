import {inject, Injectable} from '@angular/core';
import {PersonService} from '../../persons/services/person.service';
import {Person} from '../../persons/models/person.model';
import {TeamService} from '../../teams/services/team.service';
import {PriorKnowledgeService} from '../../prior-knowledge/services/prior-knowledge.service';
import {TimeSlotService} from '../../timeslots/services/time-slot.service';
import {Team} from '../../teams/models/team.model';
import {TimeSlot} from '../../timeslots/models/time-slot.model';
import {PriorKnowledge} from '../../prior-knowledge/models/prior-knowledge.model';


@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  private readonly personsKey = 'personsKey';
  private readonly teamsKey = 'teamsKey';
  private readonly slotsKey = 'slotsKey';
  private readonly knowledgeKey = 'knowledgeKey';

  private personService = inject(PersonService);
  private teamService = inject(TeamService);
  private slotService = inject(TimeSlotService);
  private knowledgeService = inject(PriorKnowledgeService);


  public readAllData() {
    this.readSlots();
    this.readKnowledge();
    this.readPersons();
    this.readTeams();

    const alreadyAssignedPersons = this.teamService.teams.flatMap(team => team.persons);
    this.personService.updateAvailablePersons(alreadyAssignedPersons);
  }


  public saveAllData() {
    this.saveSlots();
    this.saveKnowledge();
    this.savePersons();
    this.saveTeams();
  }


  public clearAllData() {
    this.clearSlots();
    this.clearKnowledge();
    this.clearPersons();
    this.clearTeams();
  }


  public readPersons() {
    const rawPersons = localStorage.getItem(this.personsKey) || "[]";
    const persons = JSON.parse(rawPersons) as Person[];

    persons.forEach(person => {
      this.personService.addPerson(person, true);
    });
  }


  public savePersons() {
    localStorage.setItem(this.personsKey, JSON.stringify(this.personService.persons));
  }


  public clearPersons() {
    localStorage.removeItem(this.personsKey);
  }


  public readTeams() {
    const rawTeams = localStorage.getItem(this.teamsKey) || "[]";
    const teams = JSON.parse(rawTeams) as Team[];

    teams.forEach(team => {
      this.teamService.addTeam(team);
    })
  }


  public saveTeams() {
    localStorage.setItem(this.teamsKey, JSON.stringify(this.teamService.teams));
  }


  public clearTeams() {
    localStorage.removeItem(this.teamsKey);
  }


  public readSlots() {
    const rawSlots = localStorage.getItem(this.slotsKey) || "[]";
    const slots = JSON.parse(rawSlots) as TimeSlot[];

    slots.forEach(slot => {
      this.slotService.addSlot(slot, true);
    });
  }


  public saveSlots() {
    localStorage.setItem(this.slotsKey, JSON.stringify(this.slotService.slots));
  }


  public clearSlots() {
    localStorage.removeItem(this.slotsKey);
  }


  public readKnowledge() {
    const rawKnowledge = localStorage.getItem(this.knowledgeKey) || "[]";
    const knowledge = JSON.parse(rawKnowledge) as PriorKnowledge[];

    knowledge.forEach(k => {
      this.knowledgeService.addKnowledge(k, true);
    });
  }


  public saveKnowledge() {
    localStorage.setItem(this.knowledgeKey,
      JSON.stringify(this.knowledgeService.knowledgeList));
  }


  public clearKnowledge() {
    localStorage.removeItem(this.knowledgeKey);
  }

}

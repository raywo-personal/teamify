import {inject, Injectable} from '@angular/core';
import {TimeSlotService} from '../../timeslots/services/time-slot.service';
import {PersonService} from '../../persons/services/person.service';
import {TeamService} from '../../teams/services/team.service';
import {TeamAssemblyService} from '../../teams/services/team-assembly.service';
import {PriorKnowledgeService} from '../../prior-knowledge/services/prior-knowledge.service';
import {createTeam} from '../../teams/models/team.model';
import {TimeSlot} from '../../timeslots/models/time-slot.model';
import {PriorKnowledge} from '../../prior-knowledge/models/prior-knowledge.model';
import {Person} from '../../persons/models/person.model';
import {PersistenceService} from './persistence.service';


@Injectable({
  providedIn: 'root'
})
export class DomainLogicService {

  private personService = inject(PersonService);
  private slotService = inject(TimeSlotService);
  private priorKnowledgeService = inject(PriorKnowledgeService);
  private teamService = inject(TeamService);
  private teamAssemblyService = inject(TeamAssemblyService);
  private persistenceService = inject(PersistenceService);


  constructor() {
    this.handlePersonEvents();
    this.handlePriorKnowledgeEvents();
    this.handleSlotEvents();
    this.handleTeamEvents();
  }


  public loadData() {
    this.persistenceService.readAllData();
  }


  public saveData() {
    this.persistenceService.saveAllData();
  }


  public resetData() {
    this.persistenceService.clearAllData();
  }


  private handlePersonEvents() {
    this.personService.personAdded$.subscribe(person => {
      this.persistenceService.saveAllData();
    });

    this.personService.personRemoved$.subscribe(person => {
      this.handlePersonRemoval(person);
      this.persistenceService.saveAllData();
    });

    this.personService.personUpdated$.subscribe(person => {
      this.persistenceService.saveAllData();
    });
  }


  private handleTeamEvents() {
    this.teamService.teamAdded$.subscribe(team => {
      this.persistenceService.saveAllData();
    });

    this.teamService.teamRemoved$.subscribe(team => {
      this.persistenceService.saveAllData();
    });

    this.teamService.teamUpdated$.subscribe(team => {
      this.persistenceService.saveAllData();
    });
  }


  private handlePriorKnowledgeEvents() {
    this.priorKnowledgeService.knowledgeAdded$.subscribe(knowledge => {
      this.persistenceService.saveAllData();
    });

    this.priorKnowledgeService.knowledgeRemoved$.subscribe(knowledge => {
      this.handleKnowledgeRemoval(knowledge);
      this.persistenceService.saveAllData();
    });

    this.priorKnowledgeService.knowledgeUpdated$.subscribe(knowledge => {
      this.persistenceService.saveAllData();
    })
  }


  private handleSlotEvents() {
    this.slotService.slotAdded$.subscribe(slot => {
      this.handleSlotAddition(slot);
      this.persistenceService.saveAllData();
    });

    this.slotService.slotUpdated$.subscribe(slot => {
      this.handleSlotUpdate(slot);
      this.persistenceService.saveAllData();
    });

    this.slotService.slotRemoved$.subscribe(slot => {
      this.handleSlotRemoval(slot);
      this.persistenceService.saveAllData();
    });
  }


  private handlePersonRemoval(person: Person) {
    this.teamService.teams.forEach(team => {
      this.teamService.removePersonFromTeam(team, person);
    });
  }


  private handleKnowledgeRemoval(knowledge: PriorKnowledge) {
    this.personService.persons.forEach(person => {
      person.priorKnowledge = person.priorKnowledge.filter(pK => pK.priorKnowledge.id !== knowledge.id);
    })
  }


  private handleSlotAddition(slot: TimeSlot) {
    this.teamService.addTeam(createTeam(slot.description, slot));
  }


  private handleSlotRemoval(slot: TimeSlot) {
    this.teamService.getTeamForSlot(slot)?.persons.forEach(person => {
      this.personService.addAvailablePerson(person);
    });

    this.teamService.removeTeamForSlot(slot);

    this.personService.persons.forEach(person => {
      person.timeSlots = person.timeSlots.filter(ts => ts.timeSlot.id !== slot.id);
    })
  }


  private handleSlotUpdate(slot: TimeSlot) {
    this.teamService.updateTeamForSlot(slot);
  }
}

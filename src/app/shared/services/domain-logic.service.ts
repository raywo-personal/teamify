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


@Injectable({
  providedIn: 'root'
})
export class DomainLogicService {

  private personService = inject(PersonService);
  private slotService = inject(TimeSlotService);
  private priorKnowledgeService = inject(PriorKnowledgeService);
  private teamService = inject(TeamService);
  private teamAssemblyService = inject(TeamAssemblyService);


  constructor() {
    this.handlePersonEvents();
    this.handlePriorKnowledgeEvents();
    this.handleSlotEvents();
  }


  private handlePersonEvents() {
    this.personService.personAdded$.subscribe(person => {
    });

    this.personService.personRemoved$.subscribe(person => {
      this.handlePersonRemoval(person)
    });

    this.personService.personUpdated$.subscribe(person => {
    });
  }


  private handlePriorKnowledgeEvents() {
    this.priorKnowledgeService.knowledgeRemoved$.subscribe(knowledge => {
      this.handleKnowledgeRemoval(knowledge);
    });
  }


  private handleSlotEvents() {
    this.slotService.slotAdded$.subscribe(slot => {
      this.handleSlotAddition(slot)
    });

    this.slotService.slotUpdated$.subscribe(slot => {
      this.handleSlotUpdate(slot);
    });

    this.slotService.slotRemoved$.subscribe(slot => {
      this.handleSlotRemoval(slot)
    });
  }


  private handlePersonRemoval(person: Person) {
    this.teamService.teams.forEach(team => {
      this.teamService.removePersonFromTeam(team, person);
    })
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

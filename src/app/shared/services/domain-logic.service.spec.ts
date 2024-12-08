import {TestBed} from '@angular/core/testing';

import {DomainLogicService} from './domain-logic.service';
import {PersonService} from '../../persons/services/person.service';
import {PriorKnowledgeService} from '../../prior-knowledge/services/prior-knowledge.service';
import {TimeSlotService} from '../../timeslots/services/time-slot.service';
import {allSlots, slot2} from '../test-data/time-slots.data';
import {knowledgeList} from '../test-data/knowledge.data';
import {personsWithData} from '../test-data/persons.data';


describe('DomainLogicService', () => {
  let sut: DomainLogicService;
  let personsService: PersonService;
  let knowledgeService: PriorKnowledgeService;
  let timeSlotService: TimeSlotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DomainLogicService,
        PersonService,
        PriorKnowledgeService,
        TimeSlotService
      ]
    });
    sut = TestBed.inject(DomainLogicService);
    personsService = TestBed.inject(PersonService);
    knowledgeService = TestBed.inject(PriorKnowledgeService);
    timeSlotService = TestBed.inject(TimeSlotService);
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should remove a deleted time slot from all existing persons', () => {
    // Arrange
    allSlots.forEach(slot => timeSlotService.addSlot(slot));
    knowledgeList.forEach(knowledge => knowledgeService.addKnowledge(knowledge));
    personsWithData.forEach(person => personsService.addPerson(person));

    // Act
    timeSlotService.removeSlot(slot2);

    // Assert
    expect(personsService.persons.length).toEqual(1);

    const timeSlots = personsService.persons[0].timeSlots;
    expect(timeSlots.find(s => s.timeSlot.id === slot2.id)).toBeFalsy();
    expect(timeSlots.map(s => s.priority).find(p => p! <= 1)).toBeFalsy();
  });
});

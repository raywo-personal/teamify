import {inject, Injectable} from '@angular/core';
import {EventHandler} from '../event.handler';
import {PriorKnowledge} from '../../../prior-knowledge/models/prior-knowledge.model';
import {PersonService} from '../../../persons/services/person.service';
import {EventType} from '../../event-bus/event.model';


@Injectable({
  providedIn: 'root'
})
export class PriorKnowledgeDeletedHandler implements EventHandler<PriorKnowledge> {

  private personService = inject(PersonService);

  public readonly eventType: EventType = EventType.PRIOR_KNOWLEDGE_DELETED;


  public handle(knowledge: PriorKnowledge) {
    this.personService.persons.forEach(person => {
      person.priorKnowledge = person.priorKnowledge.filter(pK => pK.priorKnowledge.id !== knowledge.id);
    });
  }

}

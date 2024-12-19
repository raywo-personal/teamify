import {inject, Injectable} from '@angular/core';
import {EventHandler} from '../event.handler';
import {PersonService} from '../../../persons/services/person.service';
import {EventType} from '../../event-bus/event.model';


@Injectable({
  providedIn: 'root'
})
export class PriorKnowledgeResetHandler implements EventHandler<void> {

  private personService = inject(PersonService);

  public readonly eventType: EventType = EventType.PRIOR_KNOWLEDGE_RESET;


  public handle() {
    this.personService.resetPriorKnowledge();
  }
}

import {inject, Injectable} from '@angular/core';
import {PersistenceService} from './persistence.service';
import {EventBusService} from '../event-bus/event-bus.service';
import {SlotCreatedHandler} from '../event-handler/slots/slot-created.handler';
import {EventPayload} from '../event-bus/event.model';
import {EventHandler} from '../event-handler/event.handler';
import {SlotUpdatedHandler} from '../event-handler/slots/slot-updated.handler';
import {SlotDeletedHandler} from '../event-handler/slots/slot-deleted.handler';
import {PersonDeletedHandler} from '../event-handler/persons/person-deleted.handler';
import {PriorKnowledgeDeletedHandler} from '../event-handler/prior-knowledge/prior-knowledge-deleted.handler';
import {PriorKnowledgeResetHandler} from '../event-handler/prior-knowledge/prior-knowledge-reset.handler';
import {TeamsResetHandler} from '../event-handler/teams/teams-reset.handler';
import {SlotResetHandler} from '../event-handler/slots/slot-reset.handler';


@Injectable({
  providedIn: 'root'
})
export class DomainLogicService {

  private eventBus = inject(EventBusService);
  private events$ = this.eventBus.events$;

  private persistenceService = inject(PersistenceService);

  private handler: EventHandler<EventPayload>[] = [
    inject(SlotCreatedHandler),
    inject(SlotUpdatedHandler),
    inject(SlotDeletedHandler),
    inject(SlotResetHandler),
    inject(PersonDeletedHandler),
    inject(PriorKnowledgeDeletedHandler),
    inject(PriorKnowledgeResetHandler),
    inject(TeamsResetHandler)
  ];


  constructor() {
    this.events$.subscribe(event => {
      this.handler
        .filter(handler => handler.eventType === event.type)
        .map(handler => handler.handle(event.payload));
      this.persistenceService.saveAllData();
    });
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
}

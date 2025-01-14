import {inject, Injectable} from '@angular/core';
import {PriorKnowledge} from '../models/prior-knowledge.model';
import {BehaviorSubject} from 'rxjs';
import {EventBusService} from '../../shared/event-bus/event-bus.service';
import {createBusEvent, EventType} from '../../shared/event-bus/event.model';


@Injectable({
  providedIn: 'root'
})
export class PriorKnowledgeService {

  private knowledgeListSubject = new BehaviorSubject<PriorKnowledge[]>([]);
  public readonly knowledgeList$ = this.knowledgeListSubject.asObservable();

  private eventBus = inject(EventBusService);


  public addKnowledge(knowledge: PriorKnowledge, isRestore = false) {
    this.knowledgeList = this.knowledgeList.concat(knowledge);

    if (!isRestore) this.eventBus.emit(createBusEvent(EventType.PRIOR_KNOWLEDGE_CREATED, knowledge));
  }


  public updateKnowledge(knowledge: PriorKnowledge) {
    this.knowledgeList = this.knowledgeList.map(k => k.id === knowledge.id ? knowledge : k);
    this.eventBus.emit(createBusEvent(EventType.PRIOR_KNOWLEDGE_UPDATED, knowledge));
  }


  public removeKnowledge(knowledge: PriorKnowledge) {
    this.knowledgeList = this.knowledgeList.filter(k => k.id !== knowledge.id);
    this.eventBus.emit(createBusEvent(EventType.PRIOR_KNOWLEDGE_DELETED, knowledge));
  }


  public removeAllKnowledge() {
    this.knowledgeList = [];
    this.eventBus.emit(createBusEvent(EventType.PRIOR_KNOWLEDGE_RESET));
  }


  public get knowledgeList() {
    return this.knowledgeListSubject.getValue();
  }


  private set knowledgeList(value: PriorKnowledge[]) {
    this.knowledgeListSubject.next(value);
  }

}

import {Injectable} from '@angular/core';
import {PriorKnowledge} from '../models/prior-knowledge.model';
import {BehaviorSubject, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PriorKnowledgeService {

  private knowledgeListSubject = new BehaviorSubject<PriorKnowledge[]>([]);
  public readonly knowledgeList$ = this.knowledgeListSubject.asObservable();

  private knowledgeAddedSubject = new Subject<PriorKnowledge>();
  public readonly knowledgeAdded$ = this.knowledgeAddedSubject.asObservable();
  private knowledgeRemovedSubject = new Subject<PriorKnowledge>();
  public readonly knowledgeRemoved$ = this.knowledgeRemovedSubject.asObservable();
  private knowledgeUpdatedSubject = new Subject<PriorKnowledge>();
  public readonly knowledgeUpdated$ = this.knowledgeUpdatedSubject.asObservable();


  public addKnowledge(knowledge: PriorKnowledge, isRestore: boolean = false) {
    this.knowledgeList = this.knowledgeList.concat(knowledge);

    if (!isRestore) this.knowledgeAddedSubject.next(knowledge);
  }


  public updateKnowledge(knowledge: PriorKnowledge) {
    this.knowledgeList = this.knowledgeList.map(k => k.id === knowledge.id ? knowledge : k);
    this.knowledgeUpdatedSubject.next(knowledge);
  }


  public removeKnowledge(knowledge: PriorKnowledge) {
    this.knowledgeList = this.knowledgeList.filter(k => k.id !== knowledge.id);
    this.knowledgeRemovedSubject.next(knowledge);
  }


  public get knowledgeList() {
    return this.knowledgeListSubject.getValue();
  }


  private set knowledgeList(value: PriorKnowledge[]) {
    this.knowledgeListSubject.next(value);
  }

}

import {Injectable} from '@angular/core';
import {createPriorKnowledge, PriorKnowledge} from '../models/prior-knowledge.model';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PriorKnowledgeService {

  private _knowledgeList: PriorKnowledge[] = [
    createPriorKnowledge(
      'Knowledge 1',
      'Knowledge 1 description'
    ),
    createPriorKnowledge(
      'Knowledge 2',
      'Knowledge 2 description'
    ),
    createPriorKnowledge(
      'Knowledge 3',
      'Knowledge 3 description'
    ),
    createPriorKnowledge(
      'Knowledge 4',
      'Knowledge 4 description'
    )
  ];

  private knowledgeListSubject = new BehaviorSubject<PriorKnowledge[]>(this._knowledgeList);
  public readonly knowledgeList$ = this.knowledgeListSubject.asObservable();


  public addKnowledge(knowledge: PriorKnowledge) {
    this.knowledgeList = this.knowledgeList.concat(knowledge);
  }


  public updateKnowledge(knowledge: PriorKnowledge) {
    this.knowledgeList = this.knowledgeList.map(k => k.id === knowledge.id ? knowledge : k);
  }


  public removeKnowledge(knowledge: PriorKnowledge) {
    this.knowledgeList = this.knowledgeList.filter(k => k.id !== knowledge.id);
  }


  private get knowledgeList() {
    return this.knowledgeListSubject.getValue();
  }


  private set knowledgeList(value: PriorKnowledge[]) {
    this.knowledgeListSubject.next(value);
  }
}

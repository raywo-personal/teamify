import {PriorKnowledge} from '../../prior-knowledge/models/prior-knowledge.model';


export interface PersonKnowledge {
  priorKnowledge: PriorKnowledge;
  remark: string;
}

export function createPersonKnowledge(priorKnowledge: PriorKnowledge,
                                      remark: string = ""): PersonKnowledge {
  return {
    priorKnowledge,
    remark
  };
}

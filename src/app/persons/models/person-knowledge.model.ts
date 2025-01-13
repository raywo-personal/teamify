import {knowledgeValidator, PriorKnowledge} from '../../prior-knowledge/models/prior-knowledge.model';
import {ObjectValidator, validateObject} from '../../shared/helper/validate-object';


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


export const personKnowledgeValidator: ObjectValidator<PersonKnowledge> = {
  priorKnowledge: (value: any) => validateObject<PriorKnowledge>(value, knowledgeValidator),
  remark: (value: any) => typeof value === "string"
}


export function isPersonKnowledgeArray(value: any): value is PersonKnowledge[] {
  if (!value || !Array.isArray(value)) return false;

  return value.every(item => validateObject<PersonKnowledge>(item, personKnowledgeValidator));
}

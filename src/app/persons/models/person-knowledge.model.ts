import {knowledgeValidator, PriorKnowledge} from '../../prior-knowledge/models/prior-knowledge.model';
import {ObjectValidator, validateObject} from '../../shared/helper/validate-object';


export interface PersonKnowledge {
  priorKnowledge: PriorKnowledge;
  remark: string;
}

export function createPersonKnowledge(priorKnowledge: PriorKnowledge,
                                      remark = ""): PersonKnowledge {
  return {
    priorKnowledge,
    remark
  };
}


export const personKnowledgeValidator: ObjectValidator<PersonKnowledge> = {
  priorKnowledge: (value: unknown) => validateObject<PriorKnowledge>(value, knowledgeValidator),
  remark: (value: unknown) => typeof value === "string"
}


export function isPersonKnowledgeArray(value: unknown): value is PersonKnowledge[] {
  if (!value || !Array.isArray(value)) return false;

  return value.every(item => validateObject<PersonKnowledge>(item, personKnowledgeValidator));
}

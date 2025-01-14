import {ObjectValidator, validateObject} from '../../shared/helper/validate-object';


export interface PriorKnowledge {

  id?: string;
  name: string;
  description: string;
  color: string;

}


export function createPriorKnowledge(name: string,
                                     description = "",
                                     color = "gray"): PriorKnowledge {
  return {
    id: crypto.randomUUID(),
    name,
    description,
    color
  };
}


export const knowledgeValidator: ObjectValidator<PriorKnowledge> = {
  id: (value: unknown) => typeof value === "string",
  name: (value: unknown) => typeof value === "string",
  description: (value: unknown) => typeof value === "string",
  color: (value: unknown) => typeof value === "string",
}


export function isKnowledgeArray(value: unknown): value is PriorKnowledge[] {
  if (!value || !Array.isArray(value)) return false;

  return value.every(item => validateObject<PriorKnowledge>(item, knowledgeValidator));
}

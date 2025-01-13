import {ObjectValidator, validateObject} from '../../shared/helper/validate-object';


export interface PriorKnowledge {

  id?: string;
  name: string;
  description: string;
  color: string;

}


export function createPriorKnowledge(name: string,
                                     description: string = "",
                                     color: string = "gray"): PriorKnowledge {
  return {
    id: crypto.randomUUID(),
    name,
    description,
    color
  };
}


export const knowledgeValidator: ObjectValidator<PriorKnowledge> = {
  id: (value: any) => typeof value === "string",
  name: (value: any) => typeof value === "string",
  description: (value: any) => typeof value === "string",
  color: (value: any) => typeof value === "string",
}


export function isKnowledgeArray(value: any): value is PriorKnowledge[] {
  if (!value || !Array.isArray(value)) return false;

  return value.every(item => validateObject<PriorKnowledge>(item, knowledgeValidator));
}

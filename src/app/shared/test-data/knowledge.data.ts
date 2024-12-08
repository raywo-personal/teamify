import {createPriorKnowledge, PriorKnowledge} from '../../prior-knowledge/models/prior-knowledge.model';


export const knowledge1: PriorKnowledge = createPriorKnowledge("Knowledge 1", "some description 1");
export const knowledge2: PriorKnowledge = createPriorKnowledge("Knowledge 2", "some description 2");

export const knowledgeList: PriorKnowledge[] = [knowledge1, knowledge2];

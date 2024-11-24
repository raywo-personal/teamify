export interface PriorKnowledge {

  id?: string;
  name: string;
  description: string;

}


export function createPriorKnowledge(name: string,
                                     description: string = ""): PriorKnowledge {
  return {
    id: crypto.randomUUID(),
    name,
    description
  };
}

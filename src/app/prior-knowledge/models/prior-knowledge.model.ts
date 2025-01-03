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

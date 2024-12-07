export function randomNumber(max: number, min: number = 0): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function randomNumberIncludingUndefined(max: number): number | undefined {
  const random = randomNumber(max, -1);

  return random === -1 ? undefined : random + 1;
}


export function randomIndices(max: number, count: number): number[] {
  const indices: number[] = [];

  while (indices.length < count) {
    const randomIndex = randomNumber(max);

    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }

  return indices;
}

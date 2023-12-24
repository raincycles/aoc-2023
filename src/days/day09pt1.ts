function extrapolateNext(values: number[]): number {
  const diffs: number[] = [];

  let foundNonZero = false;
  for (let i = 0; i < values.length - 1; i++) {
    const diff = values[i + 1] - values[i];

    if (!foundNonZero && diff !== 0) {
      foundNonZero = true;
    }

    diffs.push(diff);
  }

  if (!foundNonZero) {
    return values[values.length - 1];
  }

  return values[values.length - 1] + extrapolateNext(diffs);
}

export function solve(input: string): number {
  const lines = input.split("\n");
  let sum = 0;

  for (const ln of lines) {
    const chunks = ln.split(" ");
    const history = chunks.map((x) => Number.parseInt(x, 10));

    sum += extrapolateNext(history);
  }

  return sum;
}

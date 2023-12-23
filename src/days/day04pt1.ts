export function solve(input: string): number {
  const lines = input.split("\n");
  let sum = 0;

  for (const ln of lines) {
    const colonIndex = ln.indexOf(":");
    const body = ln.substring(colonIndex + 2);

    const pipeIndex = body.indexOf("|");
    const first = body.substring(0, pipeIndex - 1);
    const second = body.substring(pipeIndex + 2);

    const winningNumbers = new Set<number>();
    for (let i = 2; i < first.length + 1; i += 3) {
      winningNumbers.add(Number.parseInt(first.substring(i - 2, i), 10));
    }

    let matches = 0;
    for (let i = 2; i < second.length + 1; i += 3) {
      const nr = Number.parseInt(second.substring(i - 2, i), 10);

      if (winningNumbers.has(nr)) {
        matches++;
      }
    }

    if (matches > 0) {
      sum += Math.pow(2, matches - 1);
    }
  }

  return sum;
}

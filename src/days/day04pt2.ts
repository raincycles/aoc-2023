export function solve(input: string): number {
  const lines = input.split("\n");
  const matchesPerCard: number[] = new Array(lines.length).fill(0);

  for (const [lnNr, ln] of lines.entries()) {
    const colonIndex = ln.indexOf(":");
    const body = ln.substring(colonIndex + 2);

    const pipeIndex = body.indexOf("|");
    const first = body.substring(0, pipeIndex - 1);
    const second = body.substring(pipeIndex + 2);

    const winningNumbers = new Set<number>();
    for (let i = 2; i < first.length + 1; i += 3) {
      winningNumbers.add(Number.parseInt(first.substring(i - 2, i), 10));
    }

    for (let i = 2; i < second.length + 1; i += 3) {
      const nr = Number.parseInt(second.substring(i - 2, i), 10);

      if (winningNumbers.has(nr)) {
        matchesPerCard[lnNr]++;
      }
    }
  }

  const cardsToCheck: number[] = [];
  for (let i = 0; i < matchesPerCard.length; i++) {
    cardsToCheck.push(i);
  }

  let cardsChecked = 0;

  while (cardsToCheck.length > 0) {
    const lnNr = cardsToCheck.pop()!;
    const matches = matchesPerCard[lnNr];
    cardsChecked++;

    for (let i = lnNr + 1; i < lnNr + matches + 1; i++) {
      cardsToCheck.push(i);
    }
  }

  return cardsChecked;
}

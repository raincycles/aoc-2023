function isDigit(ch: string): boolean {
  return ch >= "0" && ch <= "9";
}

// prettier-ignore
const wordsToDigits = new Map([
    ["one",   1],
    ["two",   2],
    ["three", 3],
    ["four",  4],
    ["five",  5],
    ["six",   6],
    ["seven", 7],
    ["eight", 8],
    ["nine",  9],
  ]);

function getLastNamedDigit(source: string): number {
  for (let i = source.length - 1; i >= 0; i--) {
    const ch = source[i];

    if (isDigit(ch)) {
      return Number.parseInt(ch, 10);
    }

    for (let j = i; j < source.length; j++) {
      const chunk = source.substring(i, j + 1);

      if (wordsToDigits.has(chunk)) {
        return wordsToDigits.get(chunk)!;
      }
    }
  }

  throw new Error("Unreachable");
}

function getFirstNamedDigit(source: string): number {
  for (let i = 0; i < source.length; i++) {
    const ch = source[i];

    if (isDigit(ch)) {
      return Number.parseInt(ch, 10);
    }

    for (let j = i; j < source.length; j++) {
      const chunk = source.substring(i, j + 1);

      if (wordsToDigits.has(chunk)) {
        return wordsToDigits.get(chunk)!;
      }
    }
  }

  throw new Error("Unreachable");
}

export function solve(input: string): number {
  const lines = input.split("\n");
  let sum = 0;

  for (const ln of lines) {
    const firstDigit = getFirstNamedDigit(ln);
    const lastDigit = getLastNamedDigit(ln);
    sum += firstDigit * 10 + lastDigit;
  }

  return sum;
}

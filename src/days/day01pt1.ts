function isDigit(ch: string): boolean {
  return ch >= "0" && ch <= "9";
}

function getLastDigit(source: string): number {
  for (let i = source.length - 1; i >= 0; i--) {
    const ch = source[i];

    if (isDigit(ch)) {
      return Number.parseInt(ch, 10);
    }
  }

  throw new Error("Unreachable");
}

function getFirstDigit(source: string): number {
  for (const ch of source) {
    if (isDigit(ch)) {
      return Number.parseInt(ch, 10);
    }
  }

  throw new Error("Unreachable");
}

export function solve(input: string): number {
  const lines = input.split("\n");
  let sum = 0;

  for (const ln of lines) {
    const firstDigit = getFirstDigit(ln);
    const lastDigit = getLastDigit(ln);
    sum += firstDigit * 10 + lastDigit;
  }

  return sum;
}

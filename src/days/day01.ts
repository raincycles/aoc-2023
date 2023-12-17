function isDigit(ch: string): boolean {
  return ch >= "0" && ch <= "9";
}

function getLastDigit(source: string): string {
  for (let i = source.length - 1; i >= 0; i--) {
    const ch = source[i];

    if (isDigit(ch)) {
      return ch;
    }
  }

  throw new Error("Unreachable");
}

function getFirstDigit(source: string): string {
  for (const ch of source) {
    if (isDigit(ch)) {
      return ch;
    }
  }

  throw new Error("Unreachable");
}

export function part1(input: string): number {
  const lines = input.split("\n");
  let sum = 0;

  for (const ln of lines) {
    const firstDigit = getFirstDigit(ln);
    const lastDigit = getLastDigit(ln);
    sum += Number.parseInt(firstDigit + lastDigit, 10);
  }

  return sum;
}

export function part2(_input: string): number {
  throw new Error("Unimplemented");
}

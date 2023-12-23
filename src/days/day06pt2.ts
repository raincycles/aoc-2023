function isDigit(ch: string): boolean {
  return ch >= "0" && ch <= "9";
}

export function solve(input: string): number {
  const lines = input.split("\n");
  const sections: number[] = [];

  for (const ln of lines) {
    let rawValue = "";

    let current = 10;
    while (current < ln.length) {
      if (!isDigit(ln[current])) {
        current++;
        continue;
      }

      const start = current;
      let end = current + 1;
      while (end < ln.length && isDigit(ln[end])) {
        end++;
      }

      rawValue += ln.substring(start, end);
      current = end;
    }

    const value = Number.parseInt(rawValue, 10);
    sections.push(value);
  }

  const time = sections[0];
  const distance = sections[1];

  const b = -time;
  const c = distance + 1;

  const dSqrt = Math.sqrt(Math.pow(b, 2) - 4 * c);
  const x1 = (-b - dSqrt) / 2;
  const x2 = (-b + dSqrt) / 2;

  return Math.floor(x2) - Math.ceil(x1) + 1;
}

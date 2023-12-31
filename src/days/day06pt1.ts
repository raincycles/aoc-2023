function isDigit(ch: string): boolean {
  return ch >= "0" && ch <= "9";
}

export function solve(input: string): number {
  const lines = input.split("\n");
  const sections: number[][] = [];
  let acc = 1;

  for (const ln of lines) {
    const section: number[] = [];

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

      const value = Number.parseInt(ln.substring(start, end), 10);
      section.push(value);
      current = end;
    }

    sections.push(section);
  }

  const times = sections[0];
  const distances = sections[1];

  for (let i = 0; i < times.length; i++) {
    const b = -times[i];
    const c = distances[i] + 1;

    const dSqrt = Math.sqrt(Math.pow(b, 2) - 4 * c);
    const x1 = (-b - dSqrt) / 2;
    const x2 = (-b + dSqrt) / 2;

    acc *= Math.floor(x2) - Math.ceil(x1) + 1;
  }

  return acc;
}

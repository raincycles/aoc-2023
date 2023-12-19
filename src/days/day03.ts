function isDigit(ch: string): boolean {
  return ch >= "0" && ch <= "9";
}

function isSymbol(ch: string): boolean {
  return ch !== "." && !isDigit(ch);
}

export function part1(input: string): number {
  const lines = input.split("\n");

  const height = lines.length;
  const width = lines[0].length;

  // prettier-ignore
  const deltas = [
    [-1, -1], [-1, 0], [-1, 1],
    [0,  -1],          [0,  1],
    [1,  -1], [1,  0], [1,  1],
  ];

  let sum = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!isSymbol(lines[y][x])) {
        continue;
      }

      const partNumbers = new Set<number>();

      for (const [dy, dx] of deltas) {
        const cx = x + dx;
        const cy = y + dy;

        if (cx < 0 || cx > width || cy < 0 || cy > height) {
          continue;
        }

        if (!isDigit(lines[cy][cx])) {
          continue;
        }

        let start = cx - 1;
        while (start >= 0 && isDigit(lines[cy][start])) {
          start--;
        }

        let end = cx + 1;
        while (end < width && isDigit(lines[cy][end])) {
          end++;
        }

        const chunk = lines[cy].substring(start + 1, end);
        partNumbers.add(Number.parseInt(chunk, 10));
      }

      for (const v of partNumbers) {
        sum += v;
      }
    }
  }

  return sum;
}

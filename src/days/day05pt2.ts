type Mapping = [dst: number, src: number, len: number];
type Range = [from: number, to: number];

function defragment(ranges: Range[]): Range[] {
  ranges.sort((a, b) => a[0] - b[0]);

  const newRanges: Range[] = [];
  let currentRange = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    const nextRange = ranges[i];

    if (currentRange[1] >= nextRange[0]) {
      currentRange[1] = Math.max(currentRange[1], nextRange[1]);
      continue;
    }

    newRanges.push(currentRange);
    currentRange = nextRange;
  }

  newRanges.push(currentRange);

  return newRanges;
}

export function solve(input: string): number {
  const lines = input.split("\n");
  const sections: Mapping[][] = [];

  let current = 3;
  while (current < lines.length) {
    const mappings: Mapping[] = [];

    while (current < lines.length && lines[current].length > 0) {
      const chunks = lines[current].split(" ");
      const values = chunks.map((x) => Number.parseInt(x, 10));
      mappings.push(values as Mapping);
      current++;
    }

    sections.push(mappings);
    current += 2;
  }

  const chunks = lines[0].substring(7).split(" ");
  const seedValues = chunks.map((x) => Number.parseInt(x, 10));

  let ranges: Range[] = [];
  for (let i = 0; i < seedValues.length; i += 2) {
    const from = seedValues[i];
    const length = seedValues[i + 1];
    ranges.push([from, from + length]);
  }

  for (const mappings of sections) {
    const newRanges: Range[] = [];

    while (ranges.length > 0) {
      const [from, to] = ranges.pop()!;
      let hadOverlap = false;

      for (const [dst, src, len] of mappings) {
        const overFrom = Math.max(from, src);
        const overTo = Math.min(to, src + len);

        if (overFrom >= overTo) {
          continue;
        }

        const delta = dst - src;
        newRanges.push([overFrom + delta, overTo + delta]);
        hadOverlap = true;

        if (overFrom > from) {
          ranges.push([from, overFrom]);
        }

        if (overTo < to) {
          ranges.push([overTo, to]);
        }
      }

      if (!hadOverlap) {
        newRanges.push([from, to]);
      }
    }

    ranges = defragment(newRanges);
  }

  return ranges[0][0];
}

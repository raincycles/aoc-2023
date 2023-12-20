type Mapping = [dst: number, src: number, len: number];

function mapValue(mappings: Mapping[], value: number): number {
  for (const mapping of mappings) {
    const [dst, src, len] = mapping;

    if (value >= src && value < src + len) {
      return dst + value - src;
    }
  }

  return value;
}

export function part1(input: string): number {
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
  const mappedValues = chunks.map((x) => Number.parseInt(x, 10));

  for (const mappings of sections) {
    for (const [i, value] of mappedValues.entries()) {
      mappedValues[i] = mapValue(mappings, value);
    }
  }

  return Math.min.apply(null, mappedValues);
}

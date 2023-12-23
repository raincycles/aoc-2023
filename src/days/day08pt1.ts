type Fork = [left: string, right: string];

export function solve(input: string): number {
  const lines = input.split("\n");

  const directions = lines[0];
  const nodes = new Map<string, Fork>();

  for (let i = 2; i < lines.length; i++) {
    const ln = lines[i];

    const label = ln.substring(0, 3);
    const left = ln.substring(7, 10);
    const right = ln.substring(12, 15);

    nodes.set(label, [left, right]);
  }

  let steps = 0;
  let dirIndex = 0;
  let currentLabel = "AAA";

  while (currentLabel !== "ZZZ") {
    const [left, right] = nodes.get(currentLabel)!;

    if (directions[dirIndex] === "L") {
      currentLabel = left;
    } else {
      currentLabel = right;
    }

    dirIndex = (dirIndex + 1) % directions.length;
    steps++;
  }

  return steps;
}

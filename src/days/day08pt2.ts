type Fork = [left: string, right: string];

function gcd(a: number, b: number): number {
  if (b === 0) {
    return a;
  }

  return gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

export function solve(input: string): number {
  const lines = input.split("\n");

  const directions = lines[0];
  const nodes = new Map<string, Fork>();
  const firstLabels: string[] = [];

  for (let i = 2; i < lines.length; i++) {
    const ln = lines[i];

    const label = ln.substring(0, 3);
    const left = ln.substring(7, 10);
    const right = ln.substring(12, 15);

    if (label[2] === "A") {
      firstLabels.push(label);
    }

    nodes.set(label, [left, right]);
  }

  const cycleSteps: number[] = [];

  for (const label of firstLabels) {
    let steps = 0;
    let dirIndex = 0;
    let currentLabel = label;

    while (currentLabel[2] !== "Z") {
      const [left, right] = nodes.get(currentLabel)!;

      if (directions[dirIndex] === "L") {
        currentLabel = left;
      } else {
        currentLabel = right;
      }

      dirIndex = (dirIndex + 1) % directions.length;
      steps++;
    }

    cycleSteps.push(steps);
  }

  return cycleSteps.reduce((acc, x) => lcm(acc, x), 1);
}

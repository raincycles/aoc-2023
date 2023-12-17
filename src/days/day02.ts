type Hand = [red: number, green: number, blue: number];

function getHands(source: string): Hand[] {
  const hands: Hand[] = [];
  const chunks = source.split("; ");

  for (const chunk of chunks) {
    const hand: Hand = [0, 0, 0];
    const pulls = chunk.split(", ");

    for (const pull of pulls) {
      const chunks = pull.split(" ");
      const count = Number.parseInt(chunks[0], 10);
      const color = chunks[1];

      switch (color) {
        case "red":
          hand[0] += count;
          break;
        case "green":
          hand[1] += count;
          break;
        case "blue":
          hand[2] += count;
          break;
      }
    }

    hands.push(hand);
  }

  return hands;
}

function isHandPossible(hand: Hand): boolean {
  const [red, green, blue] = hand;
  return red <= 12 && green <= 13 && blue <= 14;
}

export function part1(input: string): number {
  const lines = input.split("\n");
  let sum = 0;

  for (const ln of lines) {
    const colonIndex = ln.indexOf(":");
    const id = Number.parseInt(ln.substring(5, colonIndex), 10);
    const body = ln.substring(colonIndex + 2);

    const hands = getHands(body);
    if (hands.every(isHandPossible)) {
      sum += id;
    }
  }

  return sum;
}

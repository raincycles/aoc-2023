// prettier-ignore
const HandCategory = {
  HighCard:     0,
  OnePair:      1,
  TwoPair:      2,
  ThreeOfAKind: 3,
  FullHouse:    4,
  FourOfAKind:  5,
  FiveOfAKind:  6,
} as const;

type HandCategory = (typeof HandCategory)[keyof typeof HandCategory];

// prettier-ignore
const cardToRank = new Map([
  ["J",  0],
  ["2",  1],
  ["3",  2],
  ["4",  3],
  ["5",  4],
  ["6",  5],
  ["7",  6],
  ["8",  7],
  ["9",  8],
  ["T",  9],
  ["Q", 10],
  ["K", 11],
  ["A", 12],
]);

function getHandCategory(hand: string): HandCategory {
  const cardCounts = new Map<string, number>();

  for (const card of hand) {
    const count = cardCounts.get(card);
    if (count !== undefined) {
      cardCounts.set(card, count + 1);
      continue;
    }

    cardCounts.set(card, 1);
  }

  const jokerCount = cardCounts.get("J") ?? 0;

  switch (cardCounts.size) {
    case 1:
      return HandCategory.FiveOfAKind;
    case 2:
      for (const count of cardCounts.values()) {
        switch (count) {
          case 3:
          case 2:
            switch (jokerCount) {
              case 3:
              case 2:
                return HandCategory.FiveOfAKind;
              default:
                return HandCategory.FullHouse;
            }
          case 4:
          case 1:
            switch (jokerCount) {
              case 4:
              case 1:
                return HandCategory.FiveOfAKind;
              default:
                return HandCategory.FourOfAKind;
            }
        }
      }

      throw new Error("Unreachable");
    case 3:
      for (const count of cardCounts.values()) {
        switch (count) {
          case 2:
            switch (jokerCount) {
              case 2:
                return HandCategory.FourOfAKind;
              case 1:
                return HandCategory.FullHouse;
              default:
                return HandCategory.TwoPair;
            }
          case 3:
            switch (jokerCount) {
              case 3:
              case 1:
                return HandCategory.FourOfAKind;
              default:
                return HandCategory.ThreeOfAKind;
            }
        }
      }

      throw new Error("Unreachable");
    case 4:
      switch (jokerCount) {
        case 1:
        case 2:
          return HandCategory.ThreeOfAKind;
        default:
          return HandCategory.OnePair;
      }
    case 5:
      if (jokerCount === 1) {
        return HandCategory.OnePair;
      }

      return HandCategory.HighCard;
    default:
      throw new Error("Unreachable");
  }
}

class Play {
  public hand: string;
  public category: HandCategory;
  public bid: number;

  constructor(hand: string, bid: number) {
    this.hand = hand;
    this.category = getHandCategory(hand);
    this.bid = bid;
  }
}

export function solve(input: string): number {
  const lines = input.split("\n");

  const plays: Play[] = [];

  for (const ln of lines) {
    const chunks = ln.split(" ");
    const hand = chunks[0];
    const bid = Number.parseInt(chunks[1], 10);

    plays.push(new Play(hand, bid));
  }

  plays.sort((a, b) => {
    const categoryA = a.category;
    const categoryB = b.category;

    if (categoryA !== categoryB) {
      return categoryA - categoryB;
    }

    for (let i = 0; i < 5; i++) {
      const cardA = a.hand[i];
      const cardB = b.hand[i];

      if (cardA !== cardB) {
        return cardToRank.get(cardA)! - cardToRank.get(cardB)!;
      }
    }

    throw new Error("Unreachable");
  });

  return plays.reduce((acc, x, i) => acc + x.bid * (i + 1), 0);
}

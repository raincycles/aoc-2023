// prettier-ignore
const Tile = {
  Start:      "S",
  Vertical:   "|",
  Horizontal: "-",
  NorthEast:  "L",
  NorthWest:  "J",
  SouthEast:  "F",
  SouthWest:  "7",
} as const;

// prettier-ignore
const Direction = {
  North: 0,
  East:  1,
  South: 2,
  West:  3,
} as const;

type Direction = (typeof Direction)[keyof typeof Direction];

function getTileAt(lines: string[], x: number, y: number): string | undefined {
  const width = lines[0].length;
  const height = lines.length;

  if (x >= 0 && x < width && y >= 0 && y < height) {
    return lines[y][x];
  }

  return undefined;
}

class Vec2D {
  constructor(
    public x: number,
    public y: number,
  ) {}
}

function findStart(lines: string[]): Vec2D {
  const width = lines[0].length;
  const height = lines.length;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (lines[y][x] === Tile.Start) {
        return new Vec2D(x, y);
      }
    }
  }

  throw new Error("Unreachable");
}

function followPipe(dir: Direction, pipe: string): Direction {
  switch (pipe) {
    case Tile.Vertical:
      if (dir === Direction.North) {
        return Direction.North;
      } else if (dir === Direction.South) {
        return Direction.South;
      }
      break;
    case Tile.Horizontal:
      if (dir === Direction.West) {
        return Direction.West;
      } else if (dir === Direction.East) {
        return Direction.East;
      }
      break;
    case Tile.NorthEast:
      if (dir === Direction.South) {
        return Direction.East;
      } else if (dir === Direction.West) {
        return Direction.North;
      }
      break;
    case Tile.NorthWest:
      if (dir === Direction.South) {
        return Direction.West;
      } else if (dir === Direction.East) {
        return Direction.North;
      }
      break;
    case Tile.SouthEast:
      if (dir === Direction.West) {
        return Direction.South;
      } else if (dir === Direction.North) {
        return Direction.East;
      }
      break;
    case Tile.SouthWest:
      if (dir === Direction.North) {
        return Direction.West;
      } else if (dir === Direction.East) {
        return Direction.South;
      }
      break;
    default:
      throw new Error("Unreachable");
  }

  throw new Error("Unreachable");
}

export function solve(input: string): number {
  const lines = input.split("\n");

  let current = findStart(lines);
  let dir: Direction;
  let steps = 1;

  const north = getTileAt(lines, current.x, current.y - 1);
  const east = getTileAt(lines, current.x + 1, current.y);
  const south = getTileAt(lines, current.x, current.y + 1);
  const west = getTileAt(lines, current.x - 1, current.y);

  const validNorth: string[] = [Tile.Vertical, Tile.SouthEast, Tile.SouthWest];
  const validEast: string[] = [Tile.Horizontal, Tile.NorthWest, Tile.SouthWest];
  const validSouth: string[] = [Tile.Vertical, Tile.NorthEast, Tile.NorthWest];
  const validWest: string[] = [Tile.Horizontal, Tile.NorthEast, Tile.SouthEast];

  if (north !== undefined && validNorth.includes(north)) {
    dir = Direction.North;
    current.y--;
  } else if (east !== undefined && validEast.includes(east)) {
    dir = Direction.East;
    current.x++;
  } else if (south !== undefined && validSouth.includes(south)) {
    dir = Direction.South;
    current.y++;
  } else if (west !== undefined && validWest.includes(west)) {
    dir = Direction.West;
    current.x--;
  } else {
    throw new Error("Unreachable");
  }

  while (true) {
    const tile = lines[current.y][current.x];

    if (tile === "S") {
      break;
    }

    dir = followPipe(dir, tile);

    switch (dir) {
      case Direction.North:
        current.y--;
        break;
      case Direction.East:
        current.x++;
        break;
      case Direction.South:
        current.y++;
        break;
      case Direction.West:
        current.x--;
        break;
    }

    steps++;
  }

  return steps / 2;
}

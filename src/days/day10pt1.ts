// prettier-ignore
const Tile = {
  Ground:     0,
  Vertical:   1,
  Horizontal: 2,
  NorthEast:  3,
  NorthWest:  4,
  SouthWest:  5,
  SouthEast:  6,
} as const;

type Tile = (typeof Tile)[keyof typeof Tile];

// prettier-ignore
const Direction = {
  North: 0,
  East:  1,
  South: 2,
  West:  3,
} as const;

type Direction = (typeof Direction)[keyof typeof Direction];

class Vec2 {
  constructor(
    public x: number,
    public y: number,
  ) {}

  public clone(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  public isEqual(vec: Vec2): boolean {
    return this.x === vec.x && this.y === vec.y;
  }
}

function getTileAt(grid: Tile[][], x: number, y: number): Tile | null {
  const height = grid.length;
  const width = grid[0].length;

  if (x >= 0 && x < width && y >= 0 && y < height) {
    return grid[y][x];
  }

  return null;
}

function isDirectionOpen(tile: Tile, dir: Direction): boolean {
  switch (tile) {
    case Tile.Vertical:
      return dir === Direction.North || dir === Direction.South;
    case Tile.Horizontal:
      return dir === Direction.East || dir === Direction.West;
    case Tile.NorthEast:
      return dir === Direction.North || dir === Direction.East;
    case Tile.NorthWest:
      return dir === Direction.North || dir === Direction.West;
    case Tile.SouthWest:
      return dir === Direction.South || dir === Direction.West;
    case Tile.SouthEast:
      return dir === Direction.South || dir === Direction.East;
    default:
      return false;
  }
}

function followTile(tile: Tile, dir: Direction): Direction {
  switch (tile) {
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
  }

  throw new Error("Invalid tile and direction combination");
}

export function solve(input: string): number {
  const lines = input.split("\n");

  const grid = Array.from(new Array(lines.length), () =>
    new Array(lines[0].length).fill(Tile.Ground),
  ) as Tile[][];

  const gridHeight = lines.length;
  const gridWidth = lines[0].length;

  let startPos = new Vec2(0, 0);

  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const ch = lines[y][x];

      let tile: Tile;
      switch (ch) {
        case "|":
          tile = Tile.Vertical;
          break;
        case "-":
          tile = Tile.Horizontal;
          break;
        case "L":
          tile = Tile.NorthEast;
          break;
        case "J":
          tile = Tile.NorthWest;
          break;
        case "7":
          tile = Tile.SouthWest;
          break;
        case "F":
          tile = Tile.SouthEast;
          break;
        case ".":
          tile = Tile.Ground;
          break;
        case "S":
          tile = Tile.Ground;
          startPos.x = x;
          startPos.y = y;
          break;
        default:
          throw new Error("Unknown tile");
      }

      grid[y][x] = tile;
    }
  }

  const northTile = getTileAt(grid, startPos.x, startPos.y - 1);
  const eastTile = getTileAt(grid, startPos.x + 1, startPos.y);
  const southTile = getTileAt(grid, startPos.x, startPos.y + 1);
  const westTile = getTileAt(grid, startPos.x - 1, startPos.y);

  const northOpen =
    northTile !== null && isDirectionOpen(northTile, Direction.South);
  const eastOpen =
    eastTile !== null && isDirectionOpen(eastTile, Direction.West);
  const southOpen =
    southTile !== null && isDirectionOpen(southTile, Direction.North);
  const westOpen =
    westTile !== null && isDirectionOpen(westTile, Direction.East);

  let startTile: Tile;
  if (northOpen && southOpen) {
    startTile = Tile.Vertical;
  } else if (northOpen && westOpen) {
    startTile = Tile.NorthWest;
  } else if (northOpen && eastOpen) {
    startTile = Tile.NorthEast;
  } else if (westOpen && eastOpen) {
    startTile = Tile.Horizontal;
  } else if (southOpen && westOpen) {
    startTile = Tile.SouthWest;
  } else if (southOpen && eastOpen) {
    startTile = Tile.SouthEast;
  } else {
    throw new Error("Invalid number of open directions");
  }

  grid[startPos.y][startPos.x] = startTile;

  let curPos = startPos.clone();

  let curDir: Direction;
  if (northOpen) {
    curDir = Direction.North;
    curPos.y--;
  } else if (eastOpen) {
    curDir = Direction.East;
    curPos.x++;
  } else if (southOpen) {
    curDir = Direction.South;
    curPos.y++;
  } else if (westOpen) {
    curDir = Direction.West;
    curPos.x--;
  } else {
    throw new Error("No open directions");
  }

  let steps = 1;
  while (!curPos.isEqual(startPos)) {
    steps++;

    const tile = grid[curPos.y][curPos.x];
    const newDir = followTile(tile, curDir);

    switch (newDir) {
      case Direction.North:
        curPos.y--;
        break;
      case Direction.East:
        curPos.x++;
        break;
      case Direction.South:
        curPos.y++;
        break;
      case Direction.West:
        curPos.x--;
        break;
    }

    curDir = newDir;
  }

  return steps / 2;
}

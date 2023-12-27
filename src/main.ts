import * as fs from "node:fs";
import * as day from "./days/day10pt1";

if (process.argv.length < 3) {
  console.error("Please provide a path to the input file.");
  process.exit(1);
}

let input = "";

try {
  const inputPath = process.argv[2];
  input = fs.readFileSync(inputPath, "utf-8");
} catch (err) {
  console.error(err);
  process.exit(1);
}

const solution = day.solve(input);
console.log(solution);

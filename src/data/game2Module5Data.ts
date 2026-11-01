import { Module45Play } from "./game2Module45Types";
import { MODULE_5_PART_1 } from "./game2Module5DataPart1";
import { MODULE_5_PART_2 } from "./game2Module5DataPart2";

export const MODULE_5_PLAYS: Module45Play[] = [
  ...MODULE_5_PART_1,
  ...MODULE_5_PART_2,
];

export * from "./game2Module45Types";

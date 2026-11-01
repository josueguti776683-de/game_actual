import { Module45Play } from "./game2Module45Types";
import { MODULE_4_PART_1 } from "./game2Module4DataPart1";
import { MODULE_4_PART_2 } from "./game2Module4DataPart2";

export const MODULE_4_PLAYS: Module45Play[] = [
  ...MODULE_4_PART_1,
  ...MODULE_4_PART_2,
];

export * from "./game2Module45Types";

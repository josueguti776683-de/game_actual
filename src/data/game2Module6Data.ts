import { Module45Play } from "./game2Module45Types";
import { MODULE_6_PART_1 } from "./game2Module6DataPart1";
import { MODULE_6_PART_2 } from "./game2Module6DataPart2";

export const MODULE_6_PLAYS: Module45Play[] = [
  ...MODULE_6_PART_1,
  ...MODULE_6_PART_2,
];

export * from "./game2Module45Types";

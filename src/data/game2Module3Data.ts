import { Module3Play } from './game2Module3Types';
import { MODULE_3_PLAYS_PART_1 } from './game2Module3DataPart1';
import { MODULE_3_PLAYS_PART_2 } from './game2Module3DataPart2';
import { MODULE_3_PLAYS_PART_3 } from './game2Module3DataPart3';

export * from './game2Module3Types';

export const MODULE_3_PLAYS: Module3Play[] = [
  ...MODULE_3_PLAYS_PART_1,
  ...MODULE_3_PLAYS_PART_2,
  ...MODULE_3_PLAYS_PART_3,
];

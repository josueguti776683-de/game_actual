import { Module7Play, Module7Question } from "./game2Module7Types";
import { MODULE_7_PART_1 } from "./game2Module7DataPart1";
import { MODULE_7_PART_2 } from "./game2Module7DataPart2";

export const GAME2_MODULE7_PLAYS: Module7Play[] = [
  ...MODULE_7_PART_1,
  ...MODULE_7_PART_2,
];

export function getModule7Play(playId: number): Module7Play | undefined {
  return GAME2_MODULE7_PLAYS.find((p) => p.playId === playId);
}

export function getAllModule7Questions(): Module7Question[] {
  return GAME2_MODULE7_PLAYS.flatMap((p) => p.questions);
}

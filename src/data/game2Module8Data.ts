import { Module8Play } from "./game2Module8Types";
import { MODULE8_PLAYS_PART1 } from "./game2Module8DataPart1";
import { MODULE8_PLAYS_PART2 } from "./game2Module8DataPart2";
import { MODULE8_PLAYS_PART3 } from "./game2Module8DataPart3";

export const ALL_MODULE8_PLAYS: Module8Play[] = [
  ...MODULE8_PLAYS_PART1, // Plays 1-3 (IDs 1-60)
  ...MODULE8_PLAYS_PART2, // Plays 4-6 (IDs 61-120)
  ...MODULE8_PLAYS_PART3, // Plays 7-10 (IDs 121-200)
];

export function getModule8PlayById(playId: number): Module8Play | undefined {
  return ALL_MODULE8_PLAYS.find((p) => p.playId === playId);
}

export function getTotalModule8Plays(): number {
  return ALL_MODULE8_PLAYS.length;
}

export function getTotalModule8Questions(): number {
  return ALL_MODULE8_PLAYS.reduce((acc, p) => acc + p.questions.length, 0);
}

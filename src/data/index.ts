import { level1 } from './level1';
import { level2 } from './level2';
import { level3 } from './level3';
import { level4 } from './level4';
import { level5 } from './level5';
import { level6 } from './level6';
import { level7 } from './level7';
import { level8 } from './level8';
import { level9 } from './level9';
import { level10 } from './level10';
import { level11 } from './level11';
import { level12 } from './level12';
import { level13 } from './level13';
import { level14 } from './level14';
import { level15 } from './level15';
import { level16 } from './level16';
import { level17 } from './level17';
import { level18 } from './level18';
import { level19 } from './level19';
import { level20 } from './level20';
import { level21 } from './level21';
import { level22 } from './level22';
import { level23 } from './level23';
import { level24 } from './level24';
import { level25 } from './level25';
import { level26 } from './level26';
import { level27 } from './level27';
import { level28 } from './level28';
import { level29 } from './level29';
import { level30 } from './level30';
import { LevelData } from '../types';

export const levelsData: Record<number, LevelData> = {
  1: level1,
  2: level2,
  3: level3,
  4: level4,
  5: level5,
  6: level6,
  7: level7,
  8: level8,
  9: level9,
  10: level10,
  11: level11,
  12: level12,
  13: level13,
  14: level14,
  15: level15,
  16: level16,
  17: level17,
  18: level18,
  19: level19,
  20: level20,
  21: level21,
  22: level22,
  23: level23,
  24: level24,
  25: level25,
  26: level26,
  27: level27,
  28: level28,
  29: level29,
  30: level30,
};

export const getAllLevels = (): LevelData[] => Object.values(levelsData);
export const getLevelById = (id: number): LevelData | undefined => levelsData[id];

export const getGlobalTranslations = (keyword: string): string[] => {
  if (!keyword) return [];
  const target = keyword.trim().toUpperCase();
  const allLevels = Object.values(levelsData);
  
  // Try to find the word in ANY level's vocabulary
  for (const lvl of allLevels) {
    const match = lvl.vocabPlay3.find(v => v.word.toUpperCase() === target);
    if (match) {
        const es = match.trans.trim();
        const results = [es];
        if (es.endsWith('a') || es.endsWith('e') || es.endsWith('i') || es.endsWith('o') || es.endsWith('u')) {
           results.push(es + 's');
        } else if (es.endsWith('ón')) {
           results.push(es.slice(0, -2) + 'ones'); 
        } else if (es.endsWith('ín')) {
           results.push(es.slice(0, -2) + 'ines'); 
        } else {
           results.push(es + 'es');
        }
        return results;
    }
  }

  // Handle singular/plural fallback for English keyword
  for (const lvl of allLevels) {
    let match;
    if (target.endsWith('S')) {
      match = lvl.vocabPlay3.find(v => v.word.toUpperCase() === target.slice(0, -1));
    } else {
      match = lvl.vocabPlay3.find(v => v.word.toUpperCase() === target + 'S');
    }
    if (match) {
        const es = match.trans.trim();
        const results = [es];
        if (es.endsWith('a') || es.endsWith('e') || es.endsWith('i') || es.endsWith('o') || es.endsWith('u')) {
           results.push(es + 's');
        } else if (es.endsWith('ón')) {
           results.push(es.slice(0, -2) + 'ones'); 
        } else if (es.endsWith('ín')) {
           results.push(es.slice(0, -2) + 'ines'); 
        } else {
           results.push(es + 'es');
        }
        return results;
    }
  }

  return [];
};

import { Module45Question } from "./game2Module45Types";

export function makeQ(
  id: number,
  fullEnglish: string,
  spanishTranslation: string,
  v1: [string, string], // [english, spanish]
  c1: [string, string, string, string], // [english, core, spanishCore, spanishFull]
  conn: [string, string] | null,
  v2: [string, string] | null,
  c2: [string, string, string, string] | null,
  comp: [string, string] | null,
  ata: string,
  model: string,
  acceptable?: string[]
): Module45Question {
  return {
    id,
    fullEnglish,
    spanishTranslation,
    acceptableTranslations: acceptable || [],
    breakdown: {
      verb1: { english: v1[0], spanish: v1[1] },
      component1: {
        english: c1[0],
        core: c1[1],
        spanishCore: c1[2],
        spanishFull: c1[3],
      },
      connector: conn ? { english: conn[0], spanish: conn[1] } : undefined,
      verb2: v2 ? { english: v2[0], spanish: v2[1] } : undefined,
      component2: c2
        ? {
            english: c2[0],
            core: c2[1],
            spanishCore: c2[2],
            spanishFull: c2[3],
          }
        : undefined,
      complement: comp ? { english: comp[0], spanish: comp[1] } : undefined,
    },
    ataChapter: ata,
    aircraftModel: model,
  };
}

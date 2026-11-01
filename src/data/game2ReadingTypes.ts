export type SectionType = 
  | "PRECAUTION" 
  | "DESCRIPTION" 
  | "INSPECTION_STEP" 
  | "PROCEDURE" 
  | "TOLERANCE_CHECK" 
  | "NOTE";

export interface TechnicalReadingParagraph {
  id: string;
  sectionType: SectionType;
  prefixLabel?: string; // e.g. "WARNING", "CAUTION", "NOTE", "STEP 1"
  englishText: string;
  spanishText: string;
  steVerbsInvolved: string[]; // e.g. ["MAKE SURE", "DISCONNECT", "DRAIN"]
}

export interface TechnicalVocabularyItem {
  term: string;
  translation: string;
  steCategory: "VERBO APROBADO" | "SUSTANTIVO TÉCNICO" | "ADJETIVO STE" | "AVISO DE SEGURIDAD";
  usageTip: string;
}

export interface TechnicalReadingPlay {
  playId: number; // 1 to 12
  aircraft: string; // e.g. "Cessna 172 Skyhawk"
  ataChapter: string; // e.g. "ATA 71 POWERPLANT"
  title: string; // English title
  titleSpanish: string;
  topicType: "INSPECCIÓN" | "INSTRUCCIÓN" | "EXPLICACIÓN" | "PROCEDIMIENTO";
  summary: string;
  paragraphs: TechnicalReadingParagraph[];
  keyVocabulary: TechnicalVocabularyItem[];
}

export interface ModuleReadingProgress {
  [playId: number]: {
    completed: boolean;
    listenedNormalCount: number;
    listenedSlowCount: number;
    completedAt?: string;
  };
}

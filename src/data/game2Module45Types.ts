export interface SentencePartClue {
  english: string;
  spanish: string;
}

export interface SentenceComponentClue {
  english: string;       // Full component phrase in English, e.g. "the upper cowling"
  core: string;          // Noun core in English, e.g. "cowling"
  spanishCore: string;   // Spanish translation of core, e.g. "carenado"
  spanishFull: string;   // Full Spanish phrase, e.g. "el carenado superior"
}

export interface Module45Breakdown {
  verb1: SentencePartClue;
  component1: SentenceComponentClue;
  connector?: SentencePartClue;        // e.g. { english: "and", spanish: "e" | "y" }
  verb2?: SentencePartClue;            // e.g. { english: "inspect", spanish: "inspeccione" }
  component2?: SentenceComponentClue;  // e.g. { english: "the exhaust manifold", core: "manifold", spanishCore: "múltiple", spanishFull: "el múltiple de escape" }
  complement?: SentencePartClue;       // e.g. { english: "for cracks", spanish: "en busca de rajaduras" }
}

export interface Module45Question {
  id: number;
  fullEnglish: string;
  spanishTranslation: string;          // Canonical technical translation
  acceptableTranslations?: string[];   // Additional valid technical variations
  breakdown: Module45Breakdown;
  ataChapter: string;
  aircraftModel: string;               // e.g. "Cessna 150", "Cessna 172", "Cessna 210"
}

export interface Module45Play {
  playId: number;
  title: string;
  subtitle: string;
  ataChapter: string;
  aircraftModel: string;
  questions: Module45Question[];
}

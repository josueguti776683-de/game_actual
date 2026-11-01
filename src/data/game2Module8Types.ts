export interface SteRuleVocab {
  approvedWord: string;
  partOfSpeech: "VERB" | "NOUN" | "ADJECTIVE" | "PREPOSITION" | "ADVERB" | "CONJUNCTION";
  unapprovedSynonyms: string[];
  meaningSTE: string;
  spanish: string;
  ammExample: string;
}

export interface SteRealAmmExample {
  aircraft: string;
  unapproved: string;
  approved: string;
  ruleExplanation: string;
}

export interface Module8QuestionOption {
  id: string; // "A" | "B" | "C"
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface Module8Question {
  id: number;
  questionType: "CHOICE_CORRECT_SENTENCE" | "CHOICE_APPROVED_WORD" | "IDENTIFY_ERROR" | "BUILD_STE_SENTENCE";
  prompt: string; // Pregunta didáctica
  contextSentence?: string; // Oración base / oración no aprobada a corregir
  options: Module8QuestionOption[];
  correctSentence: string; // Oración aprobada en ASD-STE100
  spanishTranslation: string; // Traducción al español
  scrambledChunks: string[]; // Fichas interactivas para el modo constructor / práctica de orden
  ruleTip: string; // Regla técnica STE aplicada en este caso
  ataChapter: string;
  aircraftModel: string;
}

export interface Module8Play {
  playId: number;
  title: string;
  subtitle: string;
  ruleCode: string; // e.g. "ASD-STE100 REGLA 1: VERBOS APROBADOS"
  ruleDescription: string;
  ruleSummaryBullets: string[];
  keyVocabulary: SteRuleVocab[];
  realAmmExamples: SteRealAmmExample[];
  questions: Module8Question[];
}

export interface Module8Progress {
  [playId: number]: {
    errors: number;
    bestScore: number;
    completedAt?: string;
  };
}

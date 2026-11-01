export interface Module7StructuralChunk {
  label: "SUJETO / REPORTE" | "COMPONENTE / NÚCLEO" | "CONDICIÓN / SÍNTOMA" | "UBICACIÓN / DETALLE" | "VERBO / ACCIÓN";
  english: string;
  spanish: string;
}

export interface Module7Question {
  id: number;
  spanishPrompt: string; // Oración completa con prefijo ("El piloto reporta: ...")
  failureOnlySpanish: string; // Solo la oración de la falla sin prefijo ("Falla en el tren de aterrizaje, no sube ni baja")
  englishSentence: string; // Traducción exacta en inglés ("The pilot reports: ...")
  failureOnlyEnglish: string; // Solo la falla en inglés
  structuralChunks: Module7StructuralChunk[]; // Grupos en estructura pedagógica (como módulos 4, 5 y 6)
  scrambledChunks: string[]; // Grupos de palabras desordenados
  scrambledWords: string[]; // Palabras individuales (compatibilidad)
  acceptableAnswers: string[]; // Variaciones aceptables
  ataChapter: string;
  aircraftModel: string;
  systemCategory: string; // Categoría del sistema reportado
  mechanicNote: string; // Acción recomendada de mantenimiento
}

export interface Module7Play {
  playId: number;
  title: string;
  subtitle: string;
  ataChapter: string;
  aircraftModel: string;
  questions: Module7Question[];
}

export interface Module7Progress {
  completedPlayIds: number[];
  currentPlayId: number;
  completedQuestionIds: number[];
  scoresByPlay: Record<number, number>;
}

export interface Module3WordBlank {
  word: string;
  originalIndex: number; // Order index among missing words (0, 1, etc.)
}

export interface Module3Question {
  id: number;
  fullEnglish: string; // "Inspect the fuselage for corrosion and cracking"
  templateEnglish: string; // "Inspect the {0} for corrosion and {1}"
  missingWords: string[]; // ["fuselage", "cracking"]
  wordBank: string[]; // ["fuselage", "cracking"] - displayed scrambled
  spanish: string; // Translation: "Inspeccione el fuselaje en busca de corrosión y agrietamiento"
  aircraftType: 'airplane' | 'helicopter' | 'both';
  partCategory: string; // e.g., "Fuselaje y Estructura", "Rotor y Transmisión", etc.
}

export interface Module3Play {
  playId: number;
  title: string;
  subtitle: string;
  ataChapter: string;
  questions: Module3Question[];
}

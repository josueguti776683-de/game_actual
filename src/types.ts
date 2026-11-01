export interface VocabItem {
  word: string;
  func: string;
  trans: string;
  displayWord: string;
}

export interface SentenceItem {
  english: string;
  spanish: string;
  keywords: string[];
  keywordsSpanish: string[];
}

export interface LevelData {
  id: number;
  name: string;
  vocab: VocabItem[];
  sentences: SentenceItem[];
  vocabPlay3: VocabItem[];
}

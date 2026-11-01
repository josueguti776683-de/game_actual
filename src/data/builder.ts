import { LevelData, VocabItem, SentenceItem } from '../types';

export function expandAbbr(abbr: string): string {
  const map: Record<string, string> = {
    APU: "APU (Auxiliary Power Unit)",
    ATC: "ATC (Air Traffic Control)",
    FAA: "FAA (Federal Aviation Administration)",
    EASA: "EASA (European Union Aviation Safety Agency)",
    VHF: "VHF (Very High Frequency)",
    GPS: "GPS (Global Positioning System)",
    ILS: "ILS (Instrument Landing System)",
    VOR: "VOR (VHF Omnidirectional Range)",
    DME: "DME (Distance Measuring Equipment)",
    ADF: "ADF (Automatic Direction Finder)",
    TCAS: "TCAS (Traffic Collision Avoidance System)",
    GPWS: "GPWS (Ground Proximity Warning System)",
    FADEC: "FADEC (Full Authority Digital Engine Control)",
    AP: "AP (Autopilot)",
    AT: "AT (Autothrottle)",
    ECAM: "ECAM (Electronic Centralized Aircraft Monitor)",
    CDU: "CDU (Control Display Unit)",
    FMS: "FMS (Flight Management System)",
    IRS: "IRS (Inertial Reference System)",
    ADIRU: "ADIRU (Air Data Inertial Reference Unit)",
    ELT: "ELT (Emergency Locator Transmitter)",
  };
  return map[abbr] || abbr;
}

export function buildLevel(
  id: number,
  name: string,
  vocabRaw: [string, string, string][],
  sentencesRaw: ([string, string, string, string] | [string, string, string, string, string, string])[],
  extraRaw: [string, string, string][]
): LevelData {
  const vocab: VocabItem[] = vocabRaw.map(([word, func, trans]) => ({
    word: word.trim(),
    func: func.trim(),
    trans: trans.trim(),
    displayWord: expandAbbr(word.trim())
  }));

  const allVocabRaw = [...vocabRaw, ...extraRaw];

  const sentences: SentenceItem[] = sentencesRaw.map((row) => {
    const english = row[0].trim();
    const spanish = row[1].trim();
    const kw1 = row[2].trim();
    const kw2 = row[3].trim();
    
    if (row.length === 6) {
      return {
        english,
        spanish,
        keywords: [kw1, kw2].filter(Boolean),
        keywordsSpanish: [row[4].trim(), row[5].trim()].filter(Boolean)
      };
    }

    // Find spanish translations for keywords
    const keywordsSpanish: string[] = [];
    
    const findTrans = (kw: string) => {
      if (!kw) return [];
      let target = kw.toUpperCase();
      let match = allVocabRaw.find(v => v[0].trim().toUpperCase() === target);
      if (match) {
          const es = match[2].trim();
          const results = [es];
          // Guess plurals
          if (es.endsWith('a') || es.endsWith('e') || es.endsWith('i') || es.endsWith('o') || es.endsWith('u')) {
             results.push(es + 's');
          } else if (es.endsWith('ón') || es.endsWith('ín')) {
             results.push(es.slice(0, -2) + 'on' + (es.endsWith('ón') ? 'es' : 'es')); 
          } else {
             results.push(es + 'es');
          }
          // Also try removing "el " or "la " if it has it
          return results;
      }
      
      // Try singular/plural fallback
      if (target.endsWith('S')) {
         match = allVocabRaw.find(v => v[0].trim().toUpperCase() === target.slice(0, -1));
         if (match) {
             const es = match[2].trim();
             const results = [es];
             if (es.endsWith('a') || es.endsWith('e') || es.endsWith('i') || es.endsWith('o') || es.endsWith('u')) {
                 results.push(es + 's');
             } else if (es.endsWith('ón') || es.endsWith('ín')) {
                 results.push(es.slice(0, -2) + 'on' + (es.endsWith('ón') ? 'es' : 'es')); 
             } else {
                 results.push(es + 'es');
             }
             return results;
         }
      } else {
         match = allVocabRaw.find(v => v[0].trim().toUpperCase() === target + 'S');
         if (match) {
             const es = match[2].trim();
             const results = [es];
             if (es.endsWith('a') || es.endsWith('e') || es.endsWith('i') || es.endsWith('o') || es.endsWith('u')) {
                 results.push(es + 's');
             } else if (es.endsWith('ón') || es.endsWith('ín')) {
                 results.push(es.slice(0, -2) + 'on' + (es.endsWith('ón') ? 'es' : 'es')); 
             } else {
                 results.push(es + 'es');
             }
             return results;
         }
      }
      return [];
    };

    keywordsSpanish.push(...findTrans(kw1));
    keywordsSpanish.push(...findTrans(kw2));

    // Sort descending by length so longer strings get replaced first
    keywordsSpanish.sort((a, b) => b.length - a.length);

    return {
      english: english.trim(),
      spanish: spanish.trim(),
      keywords: [kw1, kw2].filter(Boolean),
      keywordsSpanish
    };
  });

  const extra: VocabItem[] = extraRaw.map(([word, func, trans]) => ({
    word: word.trim(),
    func: func.trim(),
    trans: trans.trim(),
    displayWord: expandAbbr(word.trim())
  }));

  return {
    id,
    name,
    vocab,
    sentences,
    vocabPlay3: [...vocab, ...extra]
  };
}

import { levelsData } from '../src/data/index';

// Let's inspect each level and look for spelling, accent, capitalization, and grammar issues
for (let i = 1; i <= 30; i++) {
  const lvl = levelsData[i];
  const issues: string[] = [];

  // Check vocabPlay3 (which includes vocab and extra)
  lvl.vocabPlay3.forEach((v, idx) => {
    // Check English word
    if (!v.word || v.word.trim() === '') issues.push(`Vocab #${idx}: Empty English word`);
    // Check definition
    if (!v.func || v.func.trim() === '') issues.push(`Vocab #${idx} (${v.word}): Empty func`);
    // Check Spanish translation
    if (!v.trans || v.trans.trim() === '') issues.push(`Vocab #${idx} (${v.word}): Empty Spanish translation`);

    // Check for common missing accents in Spanish translations
    const trans = v.trans;
    // Check specific known words without accents
    const testPatterns = [
      /\bpresurizacion\b/i, /\bpresurizado\b/i, /\baltimetro\b/i, /\belectrico\b/i, /\bhidraulico\b/i,
      /\bneumatico\b/i, /\bhelice\b/i, /\boxigeno\b/i, /\btransmision\b/i, /\bcombustion\b/i,
      /\bpropulsion\b/i, /\bposicion\b/i, /\brotacion\b/i, /\bcalibracion\b/i, /\bdesviacion\b/i,
      /\binclinacion\b/i, /\boperacion\b/i, /\bmedicion\b/i, /\bconduccion\b/i, /\baccion\b/i,
      /\bvibracion\b/i, /\bpresion\b/i, /\bfriccion\b/i, /\bseccion\b/i, /\bturbina\b/i,
      /\bavion\b/i, /\bvalvula\b/i, /\bbrujula\b/i, /\bconexion\b/i, /\binspeccion\b/i
    ];
    testPatterns.forEach(pat => {
      if (pat.test(trans)) {
        issues.push(`Vocab #${idx} (${v.word} -> "${trans}"): Missing tilde in ${pat}`);
      }
    });
  });

  // Check sentences
  lvl.sentences.forEach((s, idx) => {
    if (!s.english || s.english.trim() === '') issues.push(`Sentence #${idx}: Empty English`);
    if (!s.spanish || s.spanish.trim() === '') issues.push(`Sentence #${idx}: Empty Spanish`);
    
    // Check punctuation: does English end with period?
    if (!/[.!?]$/.test(s.english.trim())) {
      issues.push(`Sentence #${idx} EN missing ending punctuation: "${s.english}"`);
    }
    if (!/[.!?]$/.test(s.spanish.trim())) {
      issues.push(`Sentence #${idx} ES missing ending punctuation: "${s.spanish}"`);
    }

    // Check tildes in Spanish sentence
    const spanish = s.spanish;
    const testPatterns = [
      /\bpresurizacion\b/i, /\baltimetro\b/i, /\belectrico\b/i, /\belectrica\b/i, /\bhidraulico\b/i,
      /\bhidraulica\b/i, /\bneumatico\b/i, /\bhelice\b/i, /\boxigeno\b/i, /\btransmision\b/i,
      /\bcombustion\b/i, /\bpropulsion\b/i, /\bposicion\b/i, /\brotacion\b/i, /\bcalibracion\b/i,
      /\bdesviacion\b/i, /\binclinacion\b/i, /\boperacion\b/i, /\bmedicion\b/i, /\bvibracion\b/i,
      /\bpresion\b/i, /\bfriccion\b/i, /\bseccion\b/i, /\bavion\b/i, /\bvalvula\b/i, /\bbateria\b/i,
      /\bconexion\b/i, /\binspeccion\b/i, /\blinea\b/i, /\bautomatico\b/i, /\bautomatica\b/i,
      /\bmaximo\b/i, /\bmaxima\b/i, /\bminimo\b/i, /\bminima\b/i
    ];
    testPatterns.forEach(pat => {
      if (pat.test(spanish)) {
        issues.push(`Sentence #${idx} ("${spanish}"): Missing tilde in ${pat}`);
      }
    });
  });

  if (issues.length > 0) {
    console.log(`=== LEVEL ${i}: ${lvl.name} (${issues.length} potential issues) ===`);
    issues.forEach(iss => console.log('  - ' + iss));
  } else {
    console.log(`=== LEVEL ${i}: ${lvl.name} (0 regex issues) ===`);
  }
}

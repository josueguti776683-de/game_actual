import fs from 'fs';

// Check every level file individually and print any spelling or orthography anomaly
for (let lvl = 1; lvl <= 30; lvl++) {
  const filePath = `src/data/level${lvl}.ts`;
  const content = fs.readFileSync(filePath, 'utf8');

  console.log(`========================================`);
  console.log(`AUDIT FOR LEVEL ${lvl}`);
  console.log(`========================================`);

  // Let's parse the buildLevel call
  // Find strings
  const stringLiterals = content.match(/"([^"\\]|\\.)*"/g) || [];
  const issues: string[] = [];

  // Check specific dropped-vowel words
  const droppedVowels: Record<string, string> = {
    'salt': 'saltó',
    'revent': 'reventó',
    'corrodo': 'corroído',
    'enfra': 'enfría',
    'mltiple': 'múltiple',
    'rel': 'relé',
    'mviles': 'móviles',
    'tubera': 'tubería',
    'captulo': 'capítulo',
    'prrafo': 'párrafo',
    'ttulo': 'título',
    'subttulo': 'subtítulo',
    'bibliografa': 'bibliografía',
    'pgina': 'página',
    'grfica': 'gráfica',
    'grfico': 'gráfico',
    'ms': 'más (or check context)',
    'daado': 'dañado',
    'daada': 'dañada',
    'pao': 'paño',
    'ptimo': 'óptimo',
    'compresin': 'compresión',
    'torsin': 'torsión',
    'flexin': 'flexión',
    'erosin': 'erosión',
    'lubricacin': 'lubricación',
    'conduccin': 'conducción',
    'conveccin': 'convección',
    'expansin': 'expansión',
    'contraccin': 'contracción',
    'magnticos': 'magnéticos',
    'magntico': 'magnético',
    'cermica': 'cerámica',
    'elctricas': 'eléctricas',
    'elctrico': 'eléctrico',
    'elctrica': 'eléctrica',
    'latn': 'latón',
    'argn': 'argón',
    'combustin': 'combustión',
    'hidrulicos': 'hidráulicos',
    'hidrulico': 'hidráulico',
    'cua': 'cuña',
    'vehculo': 'vehículo',
    'crculo': 'círculo',
    'crculos': 'círculos',
    'lder': 'líder',
    'concntrico': 'concéntrico',
    'concntricos': 'concéntricos',
    'excntrico': 'excéntrico',
    'simtrico': 'simétrico',
    'asimtrico': 'asimétrico',
    'perifrico': 'periférico',
    'dimetro': 'diámetro',
    'receptculo': 'receptáculo',
    'bao': 'baño',
    'detrs': 'detrás',
    'bruir': 'bruñir',
    'estaar': 'estañar',
    'auditora': 'auditoría',
    'encontr': 'encontró',
    'xido': 'óxido'
  };

  // Check English typos
  const englishTypos: Record<string, string> = {
    'Capo': 'cap',
    'Explosion': 'EXPLOSION / explosion',
    'Revision': 'REVISION / revision',
    'Corrosion': 'CORROSION / corrosion',
    'Dimension': 'DIMENSION / dimension',
    'Tension': 'TENSION / tension',
    'Caída paso': 'cada paso'
  };

  // Check strings
  stringLiterals.forEach(lit => {
    const raw = lit.slice(1, -1);
    
    // Check for dropped vowels
    Object.entries(droppedVowels).forEach(([bad, good]) => {
      const regex = new RegExp(`\\b${bad}\\b`, 'i');
      if (regex.test(raw)) {
        // Special case: 'rel' in English could be 'relative'? No, in Spanish it's 'relé'.
        // Check if raw is not English 'relative', 'ms' as millisecond, etc.
        if (bad === 'ms' && /\b(ms|5\s*ms|10\s*ms)\b/i.test(raw)) return;
        if (bad === 'salt' && /\b(salt spray|salt water)\b/i.test(raw)) return;
        issues.push(`Dropped vowel "${bad}" (expected "${good}") in string: "${raw}"`);
      }
    });

    // Check English typos
    Object.entries(englishTypos).forEach(([bad, good]) => {
      const regex = new RegExp(`\\b${bad}\\b`);
      if (regex.test(raw)) {
        issues.push(`Typo / Casing "${bad}" (expected "${good}") in string: "${raw}"`);
      }
    });

    // Check incorrect qué
    if (/\b(hasta qué|de qué|para qué|pasos qué|recomendamos qué|asegúrese de qué|evita qué)\b/i.test(raw)) {
      issues.push(`Incorrect accent on "qué" in: "${raw}"`);
    }

    // Check conditional Sí
    if (/\bSí la luz\b/i.test(raw) || (raw.trim() === 'Sí' && raw.includes('Condition'))) {
      issues.push(`Incorrect accent on conditional "Sí" in: "${raw}"`);
    }

    // Check demonstrative está
    if (/\bEstá sección\b/i.test(raw) || /\bde está directiva\b/i.test(raw)) {
      issues.push(`Incorrect accent on demonstrative "Está" in: "${raw}"`);
    }
  });

  if (issues.length === 0) {
    console.log(`Level ${lvl}: Clean (0 known issues)`);
  } else {
    console.log(`Level ${lvl}: Found ${issues.length} issues:`);
    issues.forEach(iss => console.log(`  - ${iss}`));
  }
}

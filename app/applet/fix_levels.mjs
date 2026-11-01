import fs from 'fs';
import path from 'path';

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function levenshtein(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1,
                                Math.min(matrix[i][j - 1] + 1,
                                         matrix[i - 1][j] + 1));
      }
    }
  }
  return matrix[b.length][a.length];
}

const levelsDir = path.join(process.cwd(), 'src', 'data');
const files = fs.readdirSync(levelsDir).filter(f => f.startsWith('level') && f.endsWith('.ts'));

files.forEach(f => {
  const filePath = path.join(levelsDir, f);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Very simplistic parsing as the files follow a strict structure
  // We look for the sentences array: `[ \n    ["Eng", "Span", "K1", "K2"], ... ]`
  
  const vocabRegex = /\[\s*"([^"]+)",\s*"[^"]+",\s*"([^"]+)"\s*\]/g;
  let allVocab = [];
  let m;
  while ((m = vocabRegex.exec(content)) !== null) {
      allVocab.push({ word: m[1].trim().toUpperCase(), trans: m[2].trim() });
  }

  const getTrans = (kw) => {
      let match = allVocab.find(v => v.word === kw.toUpperCase());
      if (match) {
         let es = match.trans;
         let res = [es];
         if (es.endsWith('a') || es.endsWith('e') || es.endsWith('i') || es.endsWith('o') || es.endsWith('u')) {
             res.push(es + 's');
         } else if (es.endsWith('ón') || es.endsWith('ín')) {
             res.push(es.slice(0, -2) + 'on' + (es.endsWith('ón') ? 'es' : 'es'));
         } else {
             res.push(es + 'es');
         }
         return res;
      }
      return [];
  };

  const sentenceRegex = /\[\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\s*\]/g;
  
  content = content.replace(sentenceRegex, (match, en, sp, k1, k2) => {
     let keywordsSpanish = [];
     const words = sp.match(/[\p{L}\p{M}]+/gu) || [];
     
     [k1, k2].forEach(kw => {
         if (!kw) return;
         let transList = getTrans(kw);
         if (!transList || transList.length === 0) return;
         
         const cleanTrans = transList.map(t => removeAccents(t.toLowerCase()));
         let bestMatch = '';
         let bestScore = 0;
         
         for (let word of words) {
            if (word.length <= 2) continue;
            let cleanWord = removeAccents(word.toLowerCase());
            if (['las', 'los', 'una', 'del', 'con', 'por', 'que'].includes(cleanWord)) continue;
            
            for (let tr of cleanTrans) {
                if (cleanWord === tr) {
                    bestMatch = word; bestScore = 100; break;
                }
                if (cleanWord.includes(tr) || tr.includes(cleanWord)) {
                   if (Math.min(cleanWord.length, tr.length) >= 4) {
                      if (80 > bestScore) { bestScore = 80; bestMatch = word; }
                   }
                }
                let d = levenshtein(cleanWord, tr);
                if (tr.length > 5 && d <= 2) {
                   if (70 > bestScore) { bestScore = 70; bestMatch = word; }
                } else if (tr.length <= 5 && d <= 1) {
                   if (60 > bestScore) { bestScore = 60; bestMatch = word; }
                }
                if (tr.length >= 5 && cleanWord.length >= 5) {
                   let prefix = tr.substring(0, tr.length - 2);
                   if (cleanWord.startsWith(prefix)) {
                       if (50 > bestScore) { bestScore = 50; bestMatch = word; }
                   }
                }
            }
            if (bestScore === 100) break;
         }
         if (bestMatch && !keywordsSpanish.includes(bestMatch)) {
             keywordsSpanish.push(bestMatch);
         }
     });
     
     // Pad keywords if we didn't find exactly 2 to prevent arrays with wrong lengths
     // Or just append them if found
     if (keywordsSpanish.length > 0) {
        let kw1_sp = keywordsSpanish[0] || '';
        let kw2_sp = keywordsSpanish[1] || '';
        return `["${en}", "${sp}", "${k1}", "${k2}", "${kw1_sp}", "${kw2_sp}"]`;
     }
     
     return match;
  });

  fs.writeFileSync(filePath, content, 'utf-8');
});
console.log("Done updating levels");

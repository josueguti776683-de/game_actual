import fs from 'fs';
import path from 'path';

const levelsDir = path.join(process.cwd(), 'src', 'data');
const files = fs.readdirSync(levelsDir).filter(f => f.startsWith('level') && f.endsWith('.ts'));

const allWords = new Set();
files.forEach(f => {
  const content = fs.readFileSync(path.join(levelsDir, f), 'utf-8');
  const sentenceRegex = /\[\s*"([^"\\]|\\.)*",\s*"([^"\\]|\\.)*"/g;
  let match;
  while ((match = sentenceRegex.exec(content)) !== null) {
      let words = match[2].match(/[\p{L}]+/gu) || [];
      words.forEach(w => allWords.add(w.toLowerCase()));
  }
});

fs.writeFileSync('all_words.txt', Array.from(allWords).sort().join('\n'));
console.log("Words written to all_words.txt");

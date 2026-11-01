import { Module7Question, Module7StructuralChunk } from "./game2Module7Types";

// Helper to shuffle array with a deterministic or pseudo-random seed
function shuffleArray<T>(array: T[], seed: number): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    // simple deterministic pseudo-random index based on seed + i
    const j = Math.floor(((seed * 9301 + 49297 + i * 233) % 233280) / 233280 * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  // Ensure it's not identical to original if length > 1
  if (result.length > 1 && result.every((val, idx) => val === array[idx])) {
    const temp = result[0];
    result[0] = result[result.length - 1];
    result[result.length - 1] = temp;
  }
  return result;
}

export function parseSquawkChunks(
  englishSentence: string,
  spanishPrompt: string
): {
  structuralChunks: Module7StructuralChunk[];
  enChunks: string[];
  failureOnlySpanish: string;
  failureOnlyEnglish: string;
} {
  const failureOnlyEnglish = englishSentence.replace(/^the pilot reports:\s*/i, "").trim();
  const rawEsFailure = spanishPrompt.replace(/^el piloto reporta:\s*/i, "").trim();
  const failureOnlySpanish = rawEsFailure
    ? rawEsFailure.charAt(0).toUpperCase() + rawEsFailure.slice(1)
    : "";

  let enParts: string[] = [];
  let esParts: string[] = [];

  if (failureOnlyEnglish.includes(",")) {
    const rawEn = failureOnlyEnglish.split(",").map((s) => s.trim()).filter(Boolean);
    enParts = rawEn.map((s, idx) => (idx === 0 ? s + "," : s));

    if (rawEsFailure.includes(",")) {
      const rawEs = rawEsFailure.split(",").map((s) => s.trim()).filter(Boolean);
      esParts = rawEs.map((s, idx) => (idx === 0 ? s + "," : s));
    } else {
      esParts = [rawEsFailure];
    }
  } else {
    // Split on key boundary predicates and prepositions
    const enSplitRegex =
      /\s+(?=(?:is |are |does not|will not|sounds at|drops below|fluctuates|fails to|on the|in the|at the|during|after|with))\b/i;
    enParts = failureOnlyEnglish.split(enSplitRegex).map((s) => s.trim()).filter(Boolean);

    const esSplitRegex =
      /\s+(?=(?:es |está |no |suena |cae por debajo de|fluctúa|falla al|en el|en la|en los|en las|durante|después de|baja de|con |sin |esponjoso))\b/i;
    esParts = rawEsFailure.split(esSplitRegex).map((s) => s.trim()).filter(Boolean);
  }

  // Ensure reasonable chunk length (2 to 4 failure chunks)
  if (enParts.length < 2) {
    const words = failureOnlyEnglish.split(/\s+/);
    if (words.length >= 4) {
      const mid = Math.ceil(words.length / 2);
      enParts = [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
    } else {
      enParts = [failureOnlyEnglish];
    }
  }

  // Construct structural clues
  const structuralChunks: Module7StructuralChunk[] = [
    {
      label: "SUJETO / REPORTE",
      english: "The pilot reports:",
      spanish: "El piloto reporta:",
    },
  ];

  enParts.forEach((part, idx) => {
    let label: Module7StructuralChunk["label"] = "COMPONENTE / NÚCLEO";
    if (idx === 0) {
      label = "COMPONENTE / NÚCLEO";
    } else if (idx === 1) {
      label = /is|are|does|will|fails|sounds|drops|fluctuates|remains/i.test(part)
        ? "CONDICIÓN / SÍNTOMA"
        : /on|in|at|during|with|after/i.test(part)
        ? "UBICACIÓN / DETALLE"
        : "CONDICIÓN / SÍNTOMA";
    } else {
      label = "UBICACIÓN / DETALLE";
    }

    const spanishText =
      esParts[idx] || (idx === 0 ? rawEsFailure : rawEsFailure);

    structuralChunks.push({
      label,
      english: part,
      spanish: spanishText,
    });
  });

  // Only the actual sentence/discrepancy chunks (omitting "The pilot reports:")
  const enChunks = [...enParts];

  return {
    structuralChunks,
    enChunks,
    failureOnlySpanish,
    failureOnlyEnglish,
  };
}

export function makeSquawk(
  id: number,
  spanishPrompt: string,
  englishSentence: string,
  ataChapter: string,
  aircraftModel: string,
  systemCategory: string,
  mechanicNote: string,
  extraAcceptable: string[] = [],
  customTokens?: string[]
): Module7Question {
  const { structuralChunks, enChunks, failureOnlySpanish, failureOnlyEnglish } =
    parseSquawkChunks(englishSentence, spanishPrompt);

  // Scrambled structural groups (desordenados en grupo de estructura)
  const scrambledChunks = shuffleArray(enChunks, id * 19 + 7);

  // Legacy word-by-word tokens for compatibility
  let tokens: string[];
  if (customTokens && customTokens.length > 0) {
    tokens = customTokens;
  } else {
    tokens = englishSentence
      .replace(/[.,:;?!]/g, " ")
      .split(/\s+/)
      .filter((w) => w.trim().length > 0);
  }
  const scrambledWords = shuffleArray(tokens, id * 17);

  // Generate standard acceptable list
  const acceptable = new Set<string>();

  // Sentence without prefix (the main target)
  if (failureOnlyEnglish) {
    acceptable.add(failureOnlyEnglish.trim());
    acceptable.add(failureOnlyEnglish.toLowerCase().trim());
    acceptable.add(failureOnlyEnglish.replace(/[.,:;?!]/g, "").trim());
    acceptable.add(failureOnlyEnglish.toLowerCase().replace(/[.,:;?!]/g, "").trim());
  }

  // Also accept assembled chunks joined by spaces
  acceptable.add(enChunks.join(" ").trim());
  acceptable.add(enChunks.join(" ").toLowerCase().trim());
  acceptable.add(enChunks.join(" ").replace(/[.,:;?!]/g, "").trim());
  acceptable.add(enChunks.join(" ").toLowerCase().replace(/[.,:;?!]/g, "").trim());

  // Also accept full sentence with prefix if user enters it
  acceptable.add(englishSentence.trim());
  acceptable.add(englishSentence.replace(/[.,:;?!]/g, "").trim());
  acceptable.add(englishSentence.toLowerCase().trim());
  acceptable.add(englishSentence.toLowerCase().replace(/[.,:;?!]/g, "").trim());

  // Also accept without "The " if starts with "The pilot reports:"
  if (englishSentence.startsWith("The pilot reports:")) {
    const withoutThe = englishSentence.replace(/^The\s+/, "");
    acceptable.add(withoutThe.trim());
    acceptable.add(withoutThe.toLowerCase().trim());
    acceptable.add(withoutThe.replace(/[.,:;?!]/g, "").trim());
    acceptable.add(withoutThe.toLowerCase().replace(/[.,:;?!]/g, "").trim());
  }

  // Also accept without "The pilot reports: " prefix if user types just the discrepancy
  const colonIndex = englishSentence.indexOf(":");
  if (colonIndex !== -1) {
    const discrepancyOnly = englishSentence.slice(colonIndex + 1).trim();
    acceptable.add(discrepancyOnly);
    acceptable.add(discrepancyOnly.toLowerCase());
    acceptable.add(discrepancyOnly.replace(/[.,:;?!]/g, "").trim());
    acceptable.add(discrepancyOnly.toLowerCase().replace(/[.,:;?!]/g, "").trim());
  }

  extraAcceptable.forEach((alt) => {
    acceptable.add(alt.trim());
    acceptable.add(alt.toLowerCase().trim());
    acceptable.add(alt.replace(/[.,:;?!]/g, "").trim());
    acceptable.add(alt.toLowerCase().replace(/[.,:;?!]/g, "").trim());
  });

  return {
    id,
    spanishPrompt,
    failureOnlySpanish,
    englishSentence,
    failureOnlyEnglish,
    structuralChunks,
    scrambledChunks,
    scrambledWords,
    acceptableAnswers: Array.from(acceptable),
    ataChapter,
    aircraftModel,
    systemCategory,
    mechanicNote,
  };
}

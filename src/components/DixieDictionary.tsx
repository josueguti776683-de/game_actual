import React, { useState, useMemo } from "react";
import { 
  ArrowLeft, 
  Search, 
  MoreVertical, 
  BookOpen, 
  Shuffle, 
  ChevronDown, 
  ChevronUp, 
  X, 
  SlidersHorizontal,
  BookmarkCheck,
  Flame,
  Wrench,
  Plane,
  Droplet,
  Zap,
  ShieldAlert,
  Beaker,
  CheckCircle2,
  Info,
  Layers,
  List,
  Star,
  Trash2,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { PronunciationButton } from "./PronunciationButton";
import { 
  DIXIE_DICTIONARY_DATA, 
  DIXIE_CATEGORIES, 
  DIXIE_PARTS_OF_SPEECH, 
  DixieWordItem 
} from "../data/dixieDictionaryData";
import { getAllLevels } from "../data";
import { getUSIPA } from "../utils/ipa";

// Normalización de texto (elimina acentos, diacríticos, mayúsculas y espacios innecesarios)
function normalizeText(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Cálculo de distancia de edición (Levenshtein) para sugerencias de búsqueda
function getLevenshteinDistance(a: string, b: string): number {
  const an = a.length;
  const bn = b.length;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix: number[][] = [];
  for (let i = 0; i <= bn; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= an; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= bn; i++) {
    for (let j = 1; j <= an; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // sustitución
          matrix[i][j - 1] + 1,     // inserción
          matrix[i - 1][j] + 1      // eliminación
        );
      }
    }
  }
  return matrix[bn][an];
}

// Generador de sugerencias ("Quisiste decir...") para búsquedas mal escritas o inexactas
function getSearchSuggestions(rawQuery: string, dictionary: DixieWordItem[]): DixieWordItem[] {
  const q = normalizeText(rawQuery);
  if (q.length < 2) return [];

  const candidates: { item: DixieWordItem; score: number }[] = [];
  const seenWords = new Set<string>();

  for (const item of dictionary) {
    const w = normalizeText(item.word);
    if (seenWords.has(w)) continue;
    seenWords.add(w);

    let score = 0;

    // 1. Inclusión de subpalabra (e.g. "unlocke" incluye "unlock" y "lock")
    if (w === q) {
      score = 150;
    } else if (q.includes(w) && w.length >= 3) {
      score = 100 - (q.length - w.length) * 4;
    } else if (w.includes(q)) {
      score = 95 - (w.length - q.length) * 3;
    }

    // 2. Distancia Levenshtein para faltas de ortografía (e.g. "unlocke" -> "unlock", "fuselaje" -> "fuselage")
    const maxAllowedDist = q.length <= 3 ? 1 : q.length <= 6 ? 2 : 3;
    const dist = getLevenshteinDistance(q, w);
    if (dist <= maxAllowedDist) {
      const levScore = 95 - dist * 10;
      if (levScore > score) {
        score = levScore;
      }
    }

    // 3. Coincidencia de prefijo (e.g. "unl...")
    if (q.length >= 3 && w.length >= 3 && w.slice(0, 3) === q.slice(0, 3)) {
      score += 8;
    }

    // 4. Coincidencia con significado en español (e.g. "fuselaje" -> FUSELAGE, "motor" -> ENGINE)
    const spa = normalizeText(item.spanish);
    if (spa.includes(q) || q.includes(spa) || spa.split("/").some(s => s.trim() === q)) {
      score = Math.max(score, 90);
    } else {
      const primarySpa = spa.split("/")[0].trim();
      const spaDist = getLevenshteinDistance(q, primarySpa);
      if (spaDist <= maxAllowedDist) {
        score = Math.max(score, 85 - spaDist * 10);
      }
    }

    if (score >= 60) {
      candidates.push({ item, score });
    }
  }

  // Ordenar por puntuación descendente y devolver hasta 6 sugerencias
  // Ordenar por puntuación descendente y devolver hasta 6 sugerencias
  return candidates
    .sort((a, b) => b.score - a.score)
    .map(c => c.item)
    .slice(0, 6);
}

// =========================================================
// COMPILACIÓN DEL DICCIONARIO TÉCNICO COMPLETO (MÓDULO)
// =========================================================
function buildFullDictionary(): DixieWordItem[] {
  const map = new Map<string, DixieWordItem>();

  // 1. Primero añadir los términos autorizados ASD-STE100
  DIXIE_DICTIONARY_DATA.forEach(item => {
    const key = item.word.toUpperCase().trim();
    map.set(key, {
      ...item,
      ipa: item.ipa || getUSIPA(item.word)
    });
  });

  // 2. Extraer e incorporar los términos técnicos de los niveles 1 al 30 de Game 1
  try {
    const levels = getAllLevels();
    levels.forEach(lvl => {
      lvl.vocabPlay3.forEach(v => {
        const key = v.word.toUpperCase().trim();
        if (!map.has(key) && key.length > 1) {
          // Determinar categoría técnica
          let cat: DixieWordItem["category"] = "MAINTENANCE";
          const k = key.toLowerCase();
          if (k.includes("engine") || k.includes("turbine") || k.includes("combust") || k.includes("thrust") || k.includes("rpm") || k.includes("propeller") || k.includes("exhaust")) {
            cat = "ENGINE";
          } else if (k.includes("wing") || k.includes("flap") || k.includes("rudder") || k.includes("elevator") || k.includes("fuselage") || k.includes("gear") || k.includes("tail") || k.includes("slat") || k.includes("door")) {
            cat = "AIRFRAME";
          } else if (k.includes("hydraulic") || k.includes("pressure") || k.includes("leak") || k.includes("fluid") || k.includes("drain") || k.includes("pump") || k.includes("bleed")) {
            cat = "HYDRAULIC";
          } else if (k.includes("radio") || k.includes("altimeter") || k.includes("transponder") || k.includes("screen") || k.includes("switch") || k.includes("circuit") || k.includes("busbar") || k.includes("wire") || k.includes("volt")) {
            cat = "AVIONICS";
          } else if (k.includes("warn") || k.includes("danger") || k.includes("safe") || k.includes("precaution") || k.includes("fire") || k.includes("emergency")) {
            cat = "SAFETY";
          } else if (k.includes("seal") || k.includes("oil") || k.includes("grease") || k.includes("paint") || k.includes("solvent") || k.includes("tape")) {
            cat = "MATERIALS";
          }

          const ipa = getUSIPA(v.word);

          const matchingSentence = lvl.sentences?.find(s => 
            s.english.toUpperCase().includes(key)
          );

          const conj = {
            base: `${key} (${v.trans})`,
            derived: `${key}S (${v.trans}s)`
          };

          map.set(key, {
            id: key.toLowerCase().replace(/\s+/g, "-"),
            word: key,
            ipa: ipa,
            spanish: v.trans,
            partOfSpeech: "NOUN",
            category: cat,
            definitionSTE: v.func || "Término técnico aeronáutico de mantenimiento certificado.",
            usageRule: "Regla STE 1.5 (Technical Names): Utilizar de acuerdo a la nomenclatura del manual IPC y AMM.",
            exampleEnglish: matchingSentence ? matchingSentence.english.toUpperCase() : `EXAMINE THE ${key} FOR DAMAGE.`,
            exampleSpanish: matchingSentence ? matchingSentence.spanish : `Examine el/la ${v.trans.toLowerCase()} en busca de daños.`,
            conjugations: conj
          });
        }
      });
    });
  } catch (e) {
    console.error("Error agregando niveles para el diccionario Dixie", e);
  }

  // Ordenar alfabéticamente
  return Array.from(map.values()).sort((a, b) => a.word.localeCompare(b.word));
}

// Diccionario compilado una sola vez en memoria para acceso instantáneo (0ms)
const FULL_DIXIE_DICTIONARY: DixieWordItem[] = buildFullDictionary();

// Rastreador del último índice mostrado al entrar para garantizar que cada entrada sea una palabra diferente
let lastShownWordIndex: number = -1;

function getRandomDictionaryIndex(totalLength: number): number {
  if (totalLength <= 1) return 0;
  let nextIdx = Math.floor(Math.random() * totalLength);
  if (nextIdx === lastShownWordIndex) {
    nextIdx = (nextIdx + 1) % totalLength;
  }
  lastShownWordIndex = nextIdx;
  return nextIdx;
}

export const DixieDictionary: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  // Search query & filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState<string>("ALL");
  const [showOptionsModal, setShowOptionsModal] = useState<boolean>(false);

  // Collapsible tabs outside the main card
  const [isConjugationOpen, setIsConjugationOpen] = useState<boolean>(false);
  const [isSavedOpen, setIsSavedOpen] = useState<boolean>(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);

  // Pestaña Plegable de Descripción (Definición STE Oficial + Regla Técnica)
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("dixie_description_open");
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const toggleDescription = () => {
    setIsDescriptionOpen(prev => {
      const next = !prev;
      try {
        localStorage.setItem("dixie_description_open", JSON.stringify(next));
      } catch (e) {
        console.error("Error saving description tab state", e);
      }
      return next;
    });
  };

  // Pestaña Plegable de Traducción Técnica Aeronáutica (Ocultar / Desplegar)
  const [isTranslationOpen, setIsTranslationOpen] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("dixie_translation_open");
      return saved !== null ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const toggleTranslation = () => {
    setIsTranslationOpen(prev => {
      const next = !prev;
      try {
        localStorage.setItem("dixie_translation_open", JSON.stringify(next));
      } catch (e) {
        console.error("Error saving translation tab state", e);
      }
      return next;
    });
  };

  // Palabra seleccionada para el Flashcard: SIEMPRE ALEATORIA CADA VEZ QUE SE ENTRA
  const [selectedWordIndex, setSelectedWordIndex] = useState<number>(() => {
    return getRandomDictionaryIndex(FULL_DIXIE_DICTIONARY.length);
  });

  // Asegurar que cada vez que el componente se monta (cada vez que el usuario entra al diccionario),
  // se elija una palabra diferente y aleatoria sin repetir la anterior.
  React.useEffect(() => {
    if (FULL_DIXIE_DICTIONARY.length > 0) {
      const freshRandomIdx = getRandomDictionaryIndex(FULL_DIXIE_DICTIONARY.length);
      setSelectedWordIndex(freshRandomIdx);
    }
  }, []);

  // Palabras guardadas (persistidas en localStorage)
  const [savedWords, setSavedWords] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("dixie_saved_words");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleSaveWord = (word: string) => {
    setSavedWords(prev => {
      const upper = word.toUpperCase().trim();
      const next = prev.includes(upper)
        ? prev.filter(w => w !== upper)
        : [...prev, upper];
      try {
        localStorage.setItem("dixie_saved_words", JSON.stringify(next));
      } catch (e) {
        console.error("Error saving words to localStorage", e);
      }
      return next;
    });
  };

  const isWordSaved = (word: string) => {
    return savedWords.includes(word.toUpperCase().trim());
  };

  const removeSavedWord = (word: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSavedWords(prev => {
      const upper = word.toUpperCase().trim();
      const next = prev.filter(w => w !== upper);
      try {
        localStorage.setItem("dixie_saved_words", JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const clearAllSavedWords = () => {
    setSavedWords([]);
    try {
      localStorage.removeItem("dixie_saved_words");
    } catch (err) {
      console.error(err);
    }
  };

  // Diccionario completo compilado (disponible de forma instantánea)
  const fullDictionary: DixieWordItem[] = FULL_DIXIE_DICTIONARY;

  // Filtered list with intelligent relevance ranking (exact term match first, never random definition matches)
  const filteredWords = useMemo(() => {
    if (!fullDictionary || fullDictionary.length === 0) return [];

    const rawQuery = searchTerm.trim();
    const query = normalizeText(rawQuery);

    // 1. Filtrar primero por categoría, letra y partOfSpeech si están activos
    const baseList = fullDictionary.filter(item => {
      // Alphabet filter
      if (selectedLetter !== "ALL") {
        if (!item.word.toUpperCase().startsWith(selectedLetter)) return false;
      }
      // Category filter
      if (selectedCategory !== "ALL") {
        if (item.category !== selectedCategory) return false;
      }
      // Part of Speech filter
      if (selectedPartOfSpeech !== "ALL") {
        if (item.partOfSpeech !== selectedPartOfSpeech) return false;
      }
      return true;
    });

    if (!query) {
      return baseList;
    }

    // 2. Si hay término de búsqueda, puntuar por relevancia para garantizar que la palabra correcta salga primero
    const scored: { item: DixieWordItem; score: number }[] = [];

    for (const item of baseList) {
      const eng = normalizeText(item.word);
      const spa = normalizeText(item.spanish);
      let score = 0;

      // a) Coincidencia EXACTA en inglés (ej: "fuselage" -> FUSELAGE)
      if (eng === query) {
        score = 10000;
      }
      // b) Coincidencia EXACTA en español (ej: "fuselaje" -> FUSELAGE)
      else if (spa === query || spa.split("/").some(s => s.trim() === query)) {
        score = 9000;
      }
      // c) Comienza exactamente con la búsqueda en inglés (ej: "fuse..." -> FUSELAGE)
      else if (eng.startsWith(query)) {
        score = 8000 - (eng.length - query.length);
      }
      // d) Comienza exactamente con la búsqueda en español
      else if (spa.split("/").some(s => s.trim().startsWith(query))) {
        score = 7000;
      } else if (spa.startsWith(query)) {
        score = 6500;
      }
      // e) Palabra exacta completa contenida en español
      else if (new RegExp(`(^|[\\s/(),.])${query}([\\s/(),.]|$)`, "i").test(spa)) {
        score = 6000;
      }
      // f) Palabra exacta completa contenida en inglés
      else if (new RegExp(`(^|[\\s/(),.])${query}([\\s/(),.]|$)`, "i").test(eng)) {
        score = 5500;
      }
      // g) Subcadena en palabra en inglés
      else if (eng.includes(query)) {
        score = 5000 - (eng.length - query.length);
      }
      // h) Subcadena en español
      else if (spa.includes(query)) {
        score = 4000 - (spa.length - query.length);
      }
      // i) Coincidencia en conjugaciones (ej: "fuselages", "unlocked", etc.)
      else if (
        item.conjugations &&
        Object.values(item.conjugations).some(v => v && normalizeText(v).includes(query))
      ) {
        score = 3000;
      }

      if (score > 0) {
        scored.push({ item, score });
      }
    }

    // Ordenar de mayor a menor puntuación (el resultado exacto siempre queda como WORD 1 OF X)
    return scored.sort((a, b) => b.score - a.score).map(s => s.item);
  }, [fullDictionary, searchTerm, selectedLetter, selectedCategory, selectedPartOfSpeech]);

  // Verificar si la búsqueda coincide exactamente con una palabra en inglés
  const hasExactEnglishMatch = useMemo(() => {
    if (!searchTerm.trim()) return false;
    const q = normalizeText(searchTerm);
    return fullDictionary.some(item => normalizeText(item.word) === q);
  }, [searchTerm, fullDictionary]);

  // Sugerencias inteligentes si no hay resultados, si está mal escrita o si se buscan opciones similares
  const suggestions: DixieWordItem[] = useMemo(() => {
    if (!searchTerm.trim() || searchTerm.trim().length < 2) return [];
    return getSearchSuggestions(searchTerm, fullDictionary);
  }, [searchTerm, fullDictionary]);

  // Keep index within bounds
  const currentWord: DixieWordItem | undefined = useMemo(() => {
    if (filteredWords.length === 0) return undefined;
    const safeIdx = Math.max(0, Math.min(selectedWordIndex, filteredWords.length - 1));
    return filteredWords[safeIdx];
  }, [filteredWords, selectedWordIndex]);

  // Handle navigation with NEXT / BACK
  const handleNextWord = () => {
    if (filteredWords.length === 0) return;
    setSelectedWordIndex((prev) => (prev + 1) % filteredWords.length);
  };

  const handlePrevWord = () => {
    if (filteredWords.length === 0) return;
    setSelectedWordIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
  };

  const handleRandomWord = () => {
    if (filteredWords.length <= 1) return;
    let nextIdx = Math.floor(Math.random() * filteredWords.length);
    if (nextIdx === selectedWordIndex) {
      nextIdx = (nextIdx + 1) % filteredWords.length;
    }
    setSelectedWordIndex(nextIdx);
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const getCategoryIcon = (cat: DixieWordItem["category"]) => {
    switch (cat) {
      case "ENGINE": return <Flame className="w-3.5 h-3.5 text-amber-400" />;
      case "AIRFRAME": return <Plane className="w-3.5 h-3.5 text-sky-400" />;
      case "HYDRAULIC": return <Droplet className="w-3.5 h-3.5 text-cyan-400" />;
      case "AVIONICS": return <Zap className="w-3.5 h-3.5 text-yellow-400" />;
      case "SAFETY": return <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />;
      case "MATERIALS": return <Beaker className="w-3.5 h-3.5 text-emerald-400" />;
      default: return <Wrench className="w-3.5 h-3.5 text-blue-400" />;
    }
  };

  const hasActiveFilters = selectedLetter !== "ALL" || selectedCategory !== "ALL" || selectedPartOfSpeech !== "ALL";
  const progressPct = filteredWords.length > 0 ? ((selectedWordIndex + 1) / filteredWords.length) * 100 : 0;

  // Lista de objetos de palabras guardadas
  const savedWordObjects: DixieWordItem[] = useMemo(() => {
    return savedWords.map(savedKey => {
      const match = fullDictionary.find(w => w.word.toUpperCase().trim() === savedKey);
      if (match) return match;
      return {
        id: `saved-${savedKey}`,
        word: savedKey,
        ipa: getUSIPA(savedKey),
        spanish: "Término guardado",
        partOfSpeech: "NOUN" as const,
        category: "MAINTENANCE" as const,
        definitionSTE: "Término técnico de mantenimiento aeronáutico.",
        usageRule: "Uso específico de acuerdo con los manuales técnicos de aeronaves.",
        exampleEnglish: `${savedKey} is recorded in the technical log.`,
        exampleSpanish: `${savedKey} está registrado en la bitácora técnica.`,
        conjugations: { base: savedKey }
      };
    });
  }, [savedWords, fullDictionary]);

  // Navegar directamente a una palabra guardada en el flashcard
  const handleSelectSavedWord = (targetWord: string) => {
    const targetKey = targetWord.toUpperCase().trim();
    // Restablecer filtros para que se visualice correctamente
    setSearchTerm("");
    setSelectedLetter("ALL");
    setSelectedCategory("ALL");
    setSelectedPartOfSpeech("ALL");

    const idx = fullDictionary.findIndex(w => w.word.toUpperCase().trim() === targetKey);
    if (idx !== -1) {
      setSelectedWordIndex(idx);
    }
    // Desplazar la vista suavemente hacia el flashcard
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Navegar directamente a una sugerencia ("Quisiste decir...")
  const handleSelectSuggestion = (targetWord: string) => {
    setSearchTerm(targetWord);
    setSelectedLetter("ALL");
    setSelectedCategory("ALL");
    setSelectedPartOfSpeech("ALL");
    setSelectedWordIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen py-2 sm:py-4 px-2 sm:px-4">
      
      {/* =========================================================
          HEADER DEL JUEGO (ESTILO GAME 1 EXACTO)
          ORDEN ESTRICTO SOLICITADO:
          1. TÍTULO
          2. SUBTÍTULO
          3. BOTÓN DE BACK Y EN LA MISMA RECTORA LOS TRES PUNTOS
          4. DEBAJO DE ESO LA BARRA DE BUSCADOR (MISMO ANCHO QUE EL FLASHCARD)
          5. DEBAJO DE ESO EL FLASHCARD
          ========================================================= */}
      <div className="w-full max-w-[680px] flex flex-col items-center mb-2 sm:mb-3 px-1">
        
        {/* 1. EL TÍTULO & 2. SUBTÍTULO */}
        <div className="dict-header text-center w-full">
          <h1 className="text-2xl sm:text-3xl md:text-[2.2rem] font-[900] uppercase m-0 leading-tight">
            DIXIE - DICTIONARY
          </h1>
          <div className="text-[--muted] text-[0.92rem] sm:text-[0.96rem] font-[600] mt-1.5 uppercase tracking-wide">
            ASD-STE100 & MANUALES AMM
          </div>
        </div>

        {/* 3. EL BOTÓN DE BACK Y EN LA MISMA RECTORA LOS TRES PUNTOS */}
        <div className="w-full flex items-center justify-between mt-3">
          <button
            onClick={onBack}
            className="home-btn px-[20px] py-[8px] font-bold text-xs sm:text-sm uppercase cursor-pointer border-none shadow-md flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK</span>
          </button>

          {/* BOTÓN DE TRES PUNTOS (⋮) EN LA MISMA RECTA QUE EL BOTÓN DE BACK */}
          <button
            onClick={() => setShowOptionsModal(true)}
            className={`p-2.5 rounded-full cursor-pointer transition-all active:scale-95 flex items-center justify-center shrink-0 border ${
              hasActiveFilters
                ? "bg-[#79c6ff] text-black border-[#79c6ff] shadow-[0_0_12px_rgba(121,198,255,0.6)]"
                : "bg-[#0b1a2f] text-[#79c6ff] border-[#79c6ff]/40 hover:bg-[#132845]"
            }`}
            title="Opciones y Filtros (A-Z, Categorías, Tipo gramatical)"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* 4. DEBAJO DE ESO LA BARRA DE BUSCADOR (EL MISMO ANCHO QUE EL FLASHCARD) */}
        <div className="w-full mt-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedWordIndex(0);
              }}
              placeholder="Buscar término en inglés o traducción en español..."
              className="w-full bg-[#081322] border border-[#79c6ff]/40 focus:border-[#79c6ff] rounded-xl py-2.5 pl-10 pr-9 text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none transition-all shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedWordIndex(getRandomDictionaryIndex(FULL_DIXIE_DICTIONARY.length));
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* SUGERENCIAS DEL BUSCADOR: QUISISTE DECIR... Y OPCIONES DISPONIBLES */}
          {searchTerm.trim().length >= 2 && suggestions.length > 0 && (!hasExactEnglishMatch || filteredWords.length === 0) && (
            <div className="w-full mt-2 p-2 sm:p-2.5 rounded-xl bg-[#08172c] border border-amber-400/60 shadow-lg animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="flex items-center justify-between gap-1.5 mb-1.5">
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-amber-300 font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>¿Quisiste decir?</span>
                </div>
                <span className="text-[10px] text-[#79c6ff]/80 font-mono">
                  Opciones del diccionario
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {suggestions.map((sug) => (
                  <button
                    key={sug.id}
                    type="button"
                    onClick={() => handleSelectSuggestion(sug.word)}
                    className="px-2.5 py-1 rounded-lg bg-[#0e2444] hover:bg-[#1a3d6f] active:scale-95 border border-[#79c6ff]/40 hover:border-[#79c6ff] text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm group"
                    title={`Seleccionar ${sug.word} (${sug.spanish})`}
                  >
                    <span className="text-[#79c6ff] group-hover:text-white uppercase tracking-wide">{sug.word}</span>
                    <span className="text-[10.5px] text-amber-300 font-normal">({sug.spanish.split("/")[0].trim()})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* INDICADOR COMPACTO SI HAY FILTRO ACTIVO */}
          {hasActiveFilters && (
            <div className="w-full flex items-center justify-between mt-1 px-1.5 text-[10.5px] text-[#79c6ff] font-mono">
              <span>
                Filtro activo: {selectedLetter !== "ALL" ? `Letra ${selectedLetter} ` : ""}{selectedCategory !== "ALL" ? `• ${DIXIE_CATEGORIES[selectedCategory]?.label} ` : ""}{selectedPartOfSpeech !== "ALL" ? `• ${DIXIE_PARTS_OF_SPEECH[selectedPartOfSpeech]}` : ""}
              </span>
              <button
                onClick={() => {
                  setSelectedLetter("ALL");
                  setSelectedCategory("ALL");
                  setSelectedPartOfSpeech("ALL");
                  setSelectedWordIndex(0);
                }}
                className="underline text-slate-400 hover:text-white cursor-pointer font-sans"
              >
                Restablecer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================
          RECUADRO DEL CONTORNO CELESTE (PLAY-CARD DEL GAME 1)
          CONTIENE TODO LO PRINCIPAL ORGANIZADO EN FORMA DE LISTA
          UNO DEBAJO DEL OTRO PARA AHORRAR ESPACIO
          ========================================================= */}
      <div className="play-card !mt-0 !mb-3 animate-in fade-in zoom-in duration-300">
        
        {/* 1. CONTADOR Y BARRA DE PROGRESO */}
        <div className="text-center text-[--muted] text-[0.85rem] sm:text-[0.9rem] font-[600] mb-1.5 tracking-wide uppercase">
          WORD {filteredWords.length > 0 ? selectedWordIndex + 1 : 0} OF {filteredWords.length}
        </div>
        <div className="progress-bar mb-3 sm:mb-4">
          <div
            className="progress-fill"
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>

        {currentWord ? (
          <div className="flex flex-col gap-2.5 w-full">
            
            {/* 2. EL NOMBRE / PALABRA EN INGLÉS (DESTACADO Y CENTRADO) */}
            <div className="text-center my-0.5">
              <span className="text-2xl sm:text-3xl md:text-4xl font-[900] tracking-wider uppercase text-white font-mono break-words drop-shadow-md">
                {currentWord.word}
              </span>
            </div>

            {/* 3. DEBAJO DE LA PALABRA: PRONUNCIACIÓN IPA + BOTÓN DE AUDIO */}
            <div className="flex items-center justify-center gap-2.5 my-0.5">
              <PronunciationButton
                text={currentWord.word}
                size={22}
                className="bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] hover:bg-[#79c6ff]/40 p-2 rounded-full shrink-0 shadow-[0_0_10px_rgba(121,198,255,0.3)]"
              />
              <span className="text-[#79c6ff] font-mono text-base sm:text-lg font-bold tracking-wider">
                {currentWord.ipa}
              </span>
            </div>

            {/* 4. TRADUCCIÓN TÉCNICA AERONÁUTICA (PESTAÑA PLEGABLE / DESPLEGABLE) */}
            <div className="w-full bg-[#0b172a] rounded-xl border border-[#334155] overflow-hidden">
              <button
                type="button"
                onClick={toggleTranslation}
                className="w-full flex items-center justify-between px-3 py-2 bg-[#0d1e35] hover:bg-[#132c4d] cursor-pointer transition-colors border-b border-[#334155]/60 text-left select-none"
                title={
                  isTranslationOpen
                    ? "Haga clic para ocultar (guardar) la traducción"
                    : "Haga clic para desplegar la traducción técnica"
                }
              >
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>📖</span>
                  <span>TRADUCCIÓN TÉCNICA AERONÁUTICA:</span>
                </span>
                <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-[#07111e] text-slate-300 border border-slate-700">
                  {isTranslationOpen ? "▲ OCULTAR" : "▼ DESPLEGAR"}
                </span>
              </button>

              {isTranslationOpen && (
                <div className="p-3 text-center animate-in fade-in duration-200">
                  <span className="text-base sm:text-lg font-bold text-amber-300 tracking-wide block">
                    {currentWord.spanish}
                  </span>
                </div>
              )}
            </div>

            {/* 5. CATEGORÍA TÉCNICA, TIPO GRAMATICAL Y OPCIÓN GUARDAR TÉRMINO */}
            <div className="flex flex-col items-center gap-2 my-0.5">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-[#132b4d] text-[#79c6ff] border border-[#79c6ff]/40 flex items-center gap-1">
                  {getCategoryIcon(currentWord.category)}
                  <span>{DIXIE_CATEGORIES[currentWord.category]?.label || currentWord.category}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-[#1e293b] text-slate-300 border border-slate-600">
                  {DIXIE_PARTS_OF_SPEECH[currentWord.partOfSpeech] || currentWord.partOfSpeech}
                </span>
              </div>

              {/* BOTÓN PARA GUARDAR PALABRA O TÉRMINO */}
              <button
                onClick={() => toggleSaveWord(currentWord.word)}
                className={`py-1.5 px-4 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer flex items-center gap-2 active:scale-95 shadow-sm border ${
                  isWordSaved(currentWord.word)
                    ? "bg-amber-400/20 text-amber-300 border-amber-400/80 shadow-[0_0_12px_rgba(251,191,36,0.3)]"
                    : "bg-[#0b172a] text-slate-300 border-[#79c6ff]/40 hover:text-[#79c6ff] hover:border-[#79c6ff] hover:bg-[#11243f]"
                }`}
                title={isWordSaved(currentWord.word) ? "Término guardado. Clic para quitar de guardadas." : "Guardar término para repasar más tarde"}
              >
                <Star
                  className={`w-3.5 h-3.5 transition-transform ${
                    isWordSaved(currentWord.word)
                      ? "text-amber-400 fill-amber-400 scale-110"
                      : "text-slate-400"
                  }`}
                />
                <span>
                  {isWordSaved(currentWord.word) ? "★ TÉRMINO GUARDADO" : "☆ GUARDAR TÉRMINO"}
                </span>
              </button>
            </div>

            {/* 6. PESTAÑA: DESCRIPCIÓN (DEFINICIÓN STE OFICIAL + REGLA TÉCNICA) */}
            <div className="w-full bg-[#0a1526] rounded-xl border border-[#233857] overflow-hidden shadow-sm transition-all">
              <button
                type="button"
                onClick={toggleDescription}
                className="w-full p-2.5 sm:p-3 flex items-center justify-between text-left cursor-pointer hover:bg-[#0f1f38] transition-colors"
                title={isDescriptionOpen ? "Clic para guardar/plegar descripción" : "Clic para desplegar descripción"}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#79c6ff]" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    DESCRIPCIÓN
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10.5px] text-[#79c6ff] font-mono font-bold">
                  <span>{isDescriptionOpen ? "GUARDAR" : "DESPLEGAR"}</span>
                  {isDescriptionOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#79c6ff]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#79c6ff]" />
                  )}
                </div>
              </button>

              {isDescriptionOpen && (
                <div className="p-3 pt-1 border-t border-white/10 flex flex-col gap-2.5 text-left animate-in fade-in duration-200">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-[#79c6ff] uppercase tracking-wider flex items-center gap-1 mb-0.5">
                      <Info className="w-3 h-3 text-[#79c6ff]" />
                      <span>DEFINICIÓN STE OFICIAL:</span>
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 m-0 leading-relaxed font-medium">
                      {currentWord.definitionSTE}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-2">
                    <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 mb-0.5">
                      <BookmarkCheck className="w-3 h-3 text-amber-400" />
                      <span>CÓMO USAR ESTA PALABRA (REGLA TÉCNICA):</span>
                    </span>
                    <p className="text-xs sm:text-sm text-amber-100 m-0 leading-relaxed font-medium">
                      {currentWord.usageRule}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 7. EJEMPLO DE USO APROBADO (AMM / STE) CON AUDIO Y TRADUCCIÓN */}
            <div className="bg-[#071322] rounded-xl p-3 border border-[#3b82f6]/40 text-left">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-mono font-black tracking-widest text-[#79c6ff] uppercase">
                  EJEMPLO APROBADO (AMM / STE):
                </span>
                <PronunciationButton text={currentWord.exampleEnglish} size={18} title="Escuchar oración completa" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-white m-0 font-mono tracking-wide leading-relaxed">
                "{currentWord.exampleEnglish}"
              </p>
              <p className="text-xs text-slate-300 italic m-0 mt-0.5 leading-relaxed">
                "{currentWord.exampleSpanish}"
              </p>
            </div>

            {/* 8. BOTONES DE NAVEGACIÓN DENTRO DEL RECUADRO CON TÉRMINOS ESTÁNDAR: BACK / NEXT */}
            <div className="flex items-center justify-between gap-2.5 mt-2 w-full">
              <button
                onClick={handlePrevWord}
                className="home-btn flex-1 py-2.5 sm:py-3 px-4 font-bold text-xs sm:text-sm uppercase cursor-pointer border-none shadow-md flex items-center justify-center gap-1.5"
              >
                <span>⬅ BACK</span>
              </button>

              <button
                onClick={handleRandomWord}
                className="px-3.5 py-2.5 sm:py-3 rounded-full bg-[#11243e] hover:bg-[#1a355c] text-[#79c6ff] border border-[#79c6ff]/40 text-xs font-bold uppercase cursor-pointer transition-all flex items-center justify-center gap-1 shrink-0"
                title="Palabra aleatoria"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">RANDOM</span>
              </button>

              <button
                onClick={handleNextWord}
                className="home-btn flex-1 py-2.5 sm:py-3 px-4 font-black text-xs sm:text-sm uppercase cursor-pointer border-none shadow-md flex items-center justify-center gap-1.5"
              >
                <span>NEXT ➔</span>
              </button>
            </div>

          </div>
        ) : (
          <div className="py-7 sm:py-9 px-3 text-center flex flex-col items-center justify-center animate-in fade-in duration-200">
            {/* ICONO Y TITULO DESTACADO: PALABRA NO ENCONTRADA */}
            <div className="w-12 h-12 rounded-full bg-rose-500/15 border-2 border-rose-500/50 flex items-center justify-center mb-3 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="text-xl sm:text-2xl font-[900] uppercase tracking-wider text-white font-mono mb-2">
              PALABRA NO ENCONTRADA
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-[420px] mx-auto leading-relaxed mb-4">
              {searchTerm.trim() ? (
                <>
                  No se encontró el término <span className="text-amber-300 font-mono font-bold">"{searchTerm}"</span> en el diccionario aeronáutico.
                </>
              ) : (
                <>No hay términos que coincidan con los filtros seleccionados.</>
              )}
            </p>

            {/* SI HAY SUGERENCIAS ("QUISISTE DECIR") */}
            {suggestions.length > 0 && (
              <div className="w-full max-w-[480px] bg-[#071322] border border-amber-400/50 rounded-xl p-3 sm:p-4 mb-4 text-left shadow-lg">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold uppercase tracking-wide mb-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>¿QUISISTE DECIR? TÉRMINOS DISPONIBLES:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {suggestions.map((sug) => (
                    <button
                      key={sug.id}
                      type="button"
                      onClick={() => handleSelectSuggestion(sug.word)}
                      className="p-2.5 rounded-lg bg-[#0c1e38] hover:bg-[#142e54] border border-[#79c6ff]/40 hover:border-[#79c6ff] text-left transition-all cursor-pointer flex items-center justify-between gap-2 group active:scale-98 shadow-sm"
                    >
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-mono font-bold text-white group-hover:text-[#79c6ff]">
                          {sug.word}
                        </div>
                        <div className="text-[11px] text-amber-300 truncate">
                          {sug.spanish}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#79c6ff] bg-[#11243f] px-2 py-0.5 rounded border border-[#79c6ff]/30 shrink-0">
                        VER ➔
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* BOTONES DE ACCIÓN PARA REINICIAR O EXPLORAR */}
            <div className="flex items-center justify-center gap-2.5 flex-wrap">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedLetter("ALL");
                  setSelectedCategory("ALL");
                  setSelectedPartOfSpeech("ALL");
                  setSelectedWordIndex(getRandomDictionaryIndex(FULL_DIXIE_DICTIONARY.length));
                }}
                className="home-btn px-5 py-2.5 text-xs font-bold uppercase cursor-pointer border-none shadow-md flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                <span>LIMPIAR BÚSQUEDA</span>
              </button>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedLetter("ALL");
                  setSelectedCategory("ALL");
                  setSelectedPartOfSpeech("ALL");
                  setSelectedWordIndex(0);
                  setIsCatalogOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#0e213b] hover:bg-[#15325b] text-[#79c6ff] border border-[#79c6ff]/40 text-xs font-bold uppercase cursor-pointer transition-all flex items-center gap-1.5"
              >
                <List className="w-3.5 h-3.5" />
                <span>EXPLORAR CATÁLOGO</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* =========================================================
          ELEMENTOS FUERA DEL RECUADRO CELESTE (ORGANIZADOS EN
          PESTAÑAS PLEGABLES PARA GUARDAR Y AHORRAR ESPACIO)
          ========================================================= */}
      <div className="w-full max-w-[680px] flex flex-col gap-2.5 px-1 pb-6">
        
        {/* PESTAÑA 1: CONJUGACIÓN & FORMAS ASOCIADAS (PLEGABLE) */}
        {currentWord && (
          <div className="w-full bg-[#081322] border border-[#79c6ff]/30 rounded-xl overflow-hidden shadow-md">
            <button
              onClick={() => setIsConjugationOpen(!isConjugationOpen)}
              className="w-full p-2.5 sm:p-3 flex items-center justify-between text-left cursor-pointer hover:bg-[#0c1d33] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#79c6ff]" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-white">
                  CONJUGACIÓN & FORMAS ASOCIADAS
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#79c6ff] font-mono">
                <span>{isConjugationOpen ? "GUARDAR" : "VER"}</span>
                {isConjugationOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {isConjugationOpen && (
              <div className="p-3 pt-0 border-t border-white/5 flex flex-col gap-2 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs mt-2">
                  <div className="p-2 rounded-lg bg-[#050c17] border border-white/5 flex flex-col">
                    <span className="text-[8.5px] text-slate-400 uppercase font-bold">FORMA BASE / INFINITIVO</span>
                    <span className="font-bold text-white font-mono mt-0.5">{currentWord.conjugations.base}</span>
                  </div>

                  {currentWord.conjugations.thirdPerson && (
                    <div className="p-2 rounded-lg bg-[#050c17] border border-white/5 flex flex-col">
                      <span className="text-[8.5px] text-slate-400 uppercase font-bold">PRESENTE (3ª PERSONA)</span>
                      <span className="font-bold text-sky-300 font-mono mt-0.5">{currentWord.conjugations.thirdPerson}</span>
                    </div>
                  )}

                  {currentWord.conjugations.past && (
                    <div className="p-2 rounded-lg bg-[#050c17] border border-white/5 flex flex-col">
                      <span className="text-[8.5px] text-slate-400 uppercase font-bold">PASADO SIMPLE</span>
                      <span className="font-bold text-amber-300 font-mono mt-0.5">{currentWord.conjugations.past}</span>
                    </div>
                  )}

                  {currentWord.conjugations.participle && (
                    <div className="p-2 rounded-lg bg-[#050c17] border border-white/5 flex flex-col">
                      <span className="text-[8.5px] text-slate-400 uppercase font-bold">PARTICIPIO / ADJETIVO</span>
                      <span className="font-bold text-emerald-300 font-mono mt-0.5">{currentWord.conjugations.participle}</span>
                    </div>
                  )}

                  {currentWord.conjugations.derived && (
                    <div className="p-2 rounded-lg bg-[#050c17] border border-white/5 flex flex-col sm:col-span-2">
                      <span className="text-[8.5px] text-slate-400 uppercase font-bold">DERIVADO TÉCNICO / FORMAS RELACIONADAS</span>
                      <span className="font-bold text-slate-200 font-mono mt-0.5">{currentWord.conjugations.derived}</span>
                    </div>
                  )}
                </div>

                {currentWord.unapprovedAlternatives && (
                  <div className="text-[10px] text-rose-300 bg-rose-950/40 p-2 rounded-lg border border-rose-500/20 font-mono">
                    ⚠️ {currentWord.unapprovedAlternatives}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* PESTAÑA 2: PALABRAS GUARDADAS (PLEGABLE - REPASAR MÁS TARDE) */}
        <div className="w-full bg-[#081322] border border-[#79c6ff]/35 rounded-xl overflow-hidden shadow-md">
          <button
            onClick={() => setIsSavedOpen(!isSavedOpen)}
            className="w-full p-2.5 sm:p-3 flex items-center justify-between text-left cursor-pointer hover:bg-[#0c1d33] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-white flex items-center gap-1.5">
                <span>PALABRAS GUARDADAS</span>
                <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  {savedWords.length}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#79c6ff] font-mono">
              <span>{isSavedOpen ? "GUARDAR" : "VER LISTA"}</span>
              {isSavedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {isSavedOpen && (
            <div className="p-3 pt-0 border-t border-white/5 flex flex-col gap-2 animate-in fade-in duration-200">
              {savedWordObjects.length === 0 ? (
                <div className="py-5 text-center px-3">
                  <Star className="w-7 h-7 text-amber-400/40 mx-auto mb-2" />
                  <p className="text-xs text-slate-200 font-bold uppercase mb-1">
                    No tienes palabras guardadas todavía
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed max-w-[380px] mx-auto">
                    Haz clic en <span className="text-amber-300 font-mono font-bold">☆ GUARDAR TÉRMINO</span> en el flashcard superior para guardar cualquier palabra y repasarla aquí cuando desees.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mt-2 mb-1 px-1">
                    <span className="text-[10px] text-slate-400 italic">
                      Términos seleccionados para estudio técnico ({savedWordObjects.length}):
                    </span>
                    {savedWordObjects.length > 1 && (
                      <button
                        onClick={clearAllSavedWords}
                        className="text-[10px] text-rose-400 hover:text-rose-300 underline cursor-pointer font-mono"
                      >
                        Limpiar todas
                      </button>
                    )}
                  </div>

                  <div className="max-h-[260px] overflow-y-auto flex flex-col gap-1.5 pr-1">
                    {savedWordObjects.map((item) => {
                      const isCurrentlyActive = currentWord?.word.toUpperCase().trim() === item.word.toUpperCase().trim();
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleSelectSavedWord(item.word)}
                          className={`p-2 sm:p-2.5 rounded-lg border text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                            isCurrentlyActive
                              ? "bg-amber-400/15 border-amber-400/80 text-white font-bold shadow-[0_0_10px_rgba(251,191,36,0.15)]"
                              : "bg-[#050c17] border-white/5 text-slate-300 hover:bg-[#0e213b] hover:border-amber-400/30"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs uppercase text-white font-bold">
                                  {item.word}
                                </span>
                                <span className="text-[10px] text-[#79c6ff] font-mono">
                                  {item.ipa}
                                </span>
                              </div>
                              <span className="text-[11px] text-amber-300 truncate font-semibold">
                                {item.spanish}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <PronunciationButton
                              text={item.word}
                              size={15}
                              className="p-1 rounded-full bg-slate-800 text-sky-300 hover:bg-slate-700"
                            />
                            <button
                              onClick={(e) => removeSavedWord(item.word, e)}
                              className="p-1.5 rounded-full text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                              title="Quitar de guardadas"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* PESTAÑA 3: CATÁLOGO EN FORMA DE LISTA (PLEGABLE PARA AHORRAR ESPACIO) */}
        <div className="w-full bg-[#081322] border border-[#79c6ff]/30 rounded-xl overflow-hidden shadow-md">
          <button
            onClick={() => setIsCatalogOpen(!isCatalogOpen)}
            className="w-full p-2.5 sm:p-3 flex items-center justify-between text-left cursor-pointer hover:bg-[#0c1d33] transition-colors"
          >
            <div className="flex items-center gap-2">
              <List className="w-4 h-4 text-[#79c6ff]" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-white">
                CATÁLOGO DE PALABRAS ({filteredWords.length})
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#79c6ff] font-mono">
              <span>{isCatalogOpen ? "GUARDAR" : "VER LISTA"}</span>
              {isCatalogOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {isCatalogOpen && (
            <div className="p-3 pt-0 border-t border-white/5 flex flex-col animate-in fade-in duration-200">
              <span className="text-[10px] text-slate-400 italic mb-2 block">
                Selecciona cualquier palabra de la lista para estudiarla en la tarjeta superior:
              </span>
              <div className="max-h-[260px] overflow-y-auto flex flex-col gap-1 pr-1">
                {filteredWords.map((item, idx) => {
                  const isSelected = currentWord?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedWordIndex(idx);
                        // Subir la vista para ver la tarjeta principal
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`p-2 rounded-lg border text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                        isSelected
                          ? "bg-blue-600/30 border-[#79c6ff] text-white font-bold"
                          : "bg-[#050c17] border-white/5 text-slate-300 hover:bg-[#0e213b] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-mono text-xs uppercase text-white font-bold">
                          {item.word}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate">
                          — {item.spanish}
                        </span>
                      </div>

                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/50 text-[#79c6ff] border border-white/5 shrink-0">
                        {item.partOfSpeech.slice(0, 3)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* =========================================================
          BARRA DE OPCIONES DENTRO DE LOS TRES PUNTOS (⋮)
          ESTRUCTURADO EN FORMA DE LISTA UNO DEBAJO DEL OTRO
          CON PESTAÑA PARA GUARDAR / APLICAR LIMPIAMENTE
          ========================================================= */}
      {showOptionsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-[#0b182c] border-2 border-[#79c6ff]/40 rounded-2xl w-full max-w-lg p-4 sm:p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* ENCABEZADO DE OPCIONES CON PESTAÑA PARA GUARDAR */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#79c6ff]" />
                <h3 className="text-sm font-black uppercase text-white m-0 tracking-wide">
                  OPCIONES & FILTROS DEL DICCIONARIO
                </h3>
              </div>
              <button
                onClick={() => setShowOptionsModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
                title="Cerrar y Guardar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* LISTA ESTRUCTURADA DE OPCIONES UNO DEBAJO DEL OTRO */}
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4">
              
              {/* 1. FILTRO POR ALFABETO A - Z */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold text-[#79c6ff] uppercase block">
                  1. FILTRO POR LETRA (A - Z):
                </label>
                <div className="flex flex-wrap gap-1">
                  <button
                    onClick={() => {
                      setSelectedLetter("ALL");
                      setSelectedWordIndex(0);
                    }}
                    className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold cursor-pointer transition-all ${
                      selectedLetter === "ALL"
                        ? "bg-[#4fa7ff] text-black font-black shadow-sm"
                        : "bg-[#071322] text-slate-300 hover:bg-[#12243d]"
                    }`}
                  >
                    TODAS (A-Z)
                  </button>
                  {alphabet.map((letter) => {
                    const isLetterActive = selectedLetter === letter;
                    return (
                      <button
                        key={letter}
                        onClick={() => {
                          setSelectedLetter(letter);
                          setSelectedWordIndex(0);
                        }}
                        className={`w-7 h-7 rounded-lg text-[11px] font-mono font-black flex items-center justify-center cursor-pointer transition-all ${
                          isLetterActive
                            ? "bg-[#4fa7ff] text-black scale-105 shadow-sm"
                            : "bg-[#071322] text-slate-300 hover:bg-[#12243d]"
                        }`}
                      >
                        {letter}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. CATEGORÍAS TÉCNICAS (EN FORMA DE LISTA VERTICAL UNO DEBAJO DEL OTRO) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold text-[#79c6ff] uppercase block">
                  2. CATEGORÍAS TÉCNICAS (SISTEMAS AMM):
                </label>
                <div className="flex flex-col gap-1">
                  {Object.entries(DIXIE_CATEGORIES).map(([catKey, catObj]) => {
                    const isCatActive = selectedCategory === catKey;
                    return (
                      <button
                        key={catKey}
                        onClick={() => {
                          setSelectedCategory(catKey);
                          setSelectedWordIndex(0);
                        }}
                        className={`p-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer flex items-center justify-between border ${
                          isCatActive
                            ? "bg-[#4fa7ff] text-black border-[#79c6ff] font-black"
                            : "bg-[#071322] text-slate-300 border-white/5 hover:bg-[#11233d]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{catObj.icon}</span>
                          <div className="flex flex-col">
                            <span>{catObj.label}</span>
                            <span className="text-[9.5px] opacity-75 font-normal">{catObj.desc}</span>
                          </div>
                        </div>
                        {isCatActive && <CheckCircle2 className="w-4 h-4 text-black" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. TIPO GRAMATICAL (PART OF SPEECH) EN FORMA DE LISTA */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold text-[#79c6ff] uppercase block">
                  3. TIPO GRAMATICAL (PART OF SPEECH):
                </label>
                <div className="flex flex-col gap-1">
                  {Object.entries(DIXIE_PARTS_OF_SPEECH).map(([posKey, posLabel]) => {
                    const isPosActive = selectedPartOfSpeech === posKey;
                    return (
                      <button
                        key={posKey}
                        onClick={() => {
                          setSelectedPartOfSpeech(posKey);
                          setSelectedWordIndex(0);
                        }}
                        className={`p-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer flex items-center justify-between border ${
                          isPosActive
                            ? "bg-blue-600 text-white border-blue-400 font-black"
                            : "bg-[#071322] text-slate-300 border-white/5 hover:bg-[#11233d]"
                        }`}
                      >
                        <span>{posLabel}</span>
                        {isPosActive && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* PESTAÑA INFERIOR: GUARDAR Y APLICAR FILTROS */}
            <div className="pt-3 border-t border-white/10 mt-3 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setSelectedLetter("ALL");
                  setSelectedCategory("ALL");
                  setSelectedPartOfSpeech("ALL");
                  setSelectedWordIndex(0);
                }}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold uppercase cursor-pointer"
              >
                Limpiar
              </button>

              <button
                onClick={() => setShowOptionsModal(false)}
                className="home-btn flex-1 py-2.5 px-4 font-black text-xs uppercase cursor-pointer border-none shadow-md flex items-center justify-center gap-1"
              >
                <span>GUARDAR & APLICAR ({filteredWords.length})</span>
                <span>✓</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};


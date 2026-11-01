import React, { useState, useMemo, useEffect, useRef } from "react";
import { Module45Play, Module45Question } from "../data/game2Module45Types";
import { playAudio } from "../utils/audioEngine";
import { combatAudio } from "../utils/combatAudio";
import { Game2FinalCompletionScreen } from "./Game2FinalCompletionScreen";
import {
  ArrowLeft,
  Volume2,
  CheckCircle2,
  Award,
  RotateCcw,
  ChevronRight,
  Plane,
  Sparkles,
  AlertTriangle,
  Wrench,
  Edit3,
  Lightbulb,
  Check,
  RefreshCw,
  Eye,
  Info
} from "lucide-react";

interface Props {
  moduleNumber: 4 | 5 | 6;
  moduleTitle: string;
  moduleSubtitle: string;
  storageKey: string;
  plays: Module45Play[];
  onBack: () => void;
}

interface DisplayClue {
  englishText: string;
  translation: string;
  partType: "VERBO" | "NUCLEO";
  coreWord?: string;
}

// Helper to normalize strings for comparison (accents, punctuation, lowercasing)
function normalizeSpanish(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics / accents
    .replace(/[.,/#!$%^&*;:{}=\-_`~()¿?¡!"']/g, " ") // replace punctuation with spaces
    .replace(/\s+/g, " ")
    .trim();
}

export const Game2Module45GenericView: React.FC<Props> = ({
  moduleNumber,
  moduleTitle,
  moduleSubtitle,
  storageKey,
  plays,
  onBack,
}) => {
  // Navigation: "LIST" (select Play 1 to 10) or "GAME" (playing a specific Play)
  const [selectedPlayId, setSelectedPlayId] = useState<number | null>(null);

  // Progress saved in localStorage
  const [completedPlays, setCompletedPlays] = useState<
    Record<number, { errors: number; date: string; bestScore: number }>
  >(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const activePlay = useMemo<Module45Play | null>(() => {
    if (selectedPlayId === null) return null;
    return plays.find((p) => p.playId === selectedPlayId) || null;
  }, [selectedPlayId, plays]);

  const [playQuestions, setPlayQuestions] = useState<Module45Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // PEDAGOGICAL FLOW STATE:
  // Phase 'STUDY_CLUES': English sentence displayed with ONLY translation of Verb and Core Noun below.
  // Phase 'WRITE_TRANSLATION': English sentence displayed with text box for student to write Spanish translation.
  const [currentPhase, setCurrentPhase] = useState<"STUDY_CLUES" | "WRITE_TRANSLATION">("STUDY_CLUES");

  // Input value written by the student
  const [userTranslation, setUserTranslation] = useState<string>("");
  // Verification status
  const [status, setStatus] = useState<"IDLE" | "CORRECT" | "WRONG">("IDLE");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [totalErrors, setTotalErrors] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const startPlay = (playId: number, randomize = false) => {
    const targetPlay = plays.find((p) => p.playId === playId);
    if (targetPlay) {
      const qs = randomize
        ? [...targetPlay.questions].sort(() => 0.5 - Math.random())
        : [...targetPlay.questions];
      setPlayQuestions(qs);
    }
    setSelectedPlayId(playId);
    setCurrentIndex(0);
    setCurrentPhase("STUDY_CLUES");
    setUserTranslation("");
    setStatus("IDLE");
    setFeedbackMessage("");
    setShowHint(false);
    setAttempts(0);
    setTotalErrors(0);
    setIsCompleted(false);
  };

  const currentQuestion: Module45Question | null = useMemo(() => {
    if (playQuestions.length > 0) {
      return playQuestions[currentIndex] || null;
    }
    if (activePlay && activePlay.questions[currentIndex]) {
      return activePlay.questions[currentIndex];
    }
    return null;
  }, [playQuestions, activePlay, currentIndex]);

  // Extract clues for Verb and Core Noun from question breakdown
  const currentClues: DisplayClue[] = useMemo(() => {
    if (!currentQuestion) return [];
    const bd = currentQuestion.breakdown;
    const list: DisplayClue[] = [];

    // Verb 1
    if (bd.verb1) {
      list.push({
        englishText: bd.verb1.english,
        translation: bd.verb1.spanish,
        partType: "VERBO",
      });
    }

    // Component 1 / Core Noun
    if (bd.component1) {
      list.push({
        englishText: bd.component1.english,
        translation: bd.component1.spanishFull,
        partType: "NUCLEO",
        coreWord: bd.component1.spanishCore,
      });
    }

    // Verb 2 (if any)
    if (bd.verb2) {
      list.push({
        englishText: bd.verb2.english,
        translation: bd.verb2.spanish,
        partType: "VERBO",
      });
    }

    // Component 2 / Core Noun (if any)
    if (bd.component2) {
      list.push({
        englishText: bd.component2.english,
        translation: bd.component2.spanishFull,
        partType: "NUCLEO",
        coreWord: bd.component2.spanishCore,
      });
    }

    return list;
  }, [currentQuestion]);

  // When question changes, reset to study phase
  useEffect(() => {
    if (!currentQuestion) return;
    setCurrentPhase("STUDY_CLUES");
    setUserTranslation("");
    setStatus("IDLE");
    setFeedbackMessage("");
    setShowHint(false);
    setAttempts(0);

    // Auto-play audio when entering new question
    try {
      playAudio(currentQuestion.fullEnglish);
    } catch {
      // safe ignore
    }
  }, [currentIndex, currentQuestion]);

  // Focus textarea when switching to WRITE_TRANSLATION
  useEffect(() => {
    if (currentPhase === "WRITE_TRANSLATION") {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 150);
    }
  }, [currentPhase]);

  // Audio trigger
  const handleListen = () => {
    if (!currentQuestion) return;
    playAudio(currentQuestion.fullEnglish);
  };

  // Validate the user's Spanish translation
  const handleVerifyTranslation = () => {
    if (!currentQuestion) return;

    const trimmed = userTranslation.trim();
    if (!trimmed) {
      setStatus("WRONG");
      setFeedbackMessage("⚠️ Por favor escribe la traducción en español en el recuadro antes de verificar.");
      combatAudio.playWarning();
      return;
    }

    const normInput = normalizeSpanish(trimmed);
    const normTarget = normalizeSpanish(currentQuestion.spanishTranslation);
    const altTargets = (currentQuestion.acceptableTranslations || []).map(normalizeSpanish);

    // 1. Direct match with target or any alternative
    const isExactMatch = normInput === normTarget || altTargets.some((alt) => alt === normInput);

    // 2. High semantic overlap (check if major key terms are present)
    let semanticPass = false;
    if (!isExactMatch) {
      const verbClues = currentClues.filter((c) => c.partType === "VERBO");
      const nounClues = currentClues.filter((c) => c.partType === "NUCLEO");

      const hasAllVerbs = verbClues.every((c) => normInput.includes(normalizeSpanish(c.translation)));
      const hasMajorNoun = nounClues.some((c) => {
        const normNoun = normalizeSpanish(c.translation);
        const normCore = c.coreWord ? normalizeSpanish(c.coreWord) : "";
        const words = normNoun.split(" ").filter((w) => w.length > 3);
        return (
          normInput.includes(normNoun) ||
          (normCore && normInput.includes(normCore)) ||
          words.some((w) => normInput.includes(w))
        );
      });

      // If user included all mandatory technical verbs and core nouns, and has reasonable length
      if (hasAllVerbs && hasMajorNoun && normInput.length >= normTarget.length * 0.55) {
        semanticPass = true;
      }
    }

    if (isExactMatch || semanticPass) {
      // SUCCESS
      setStatus("CORRECT");
      setFeedbackMessage("¡Excelente traducción técnica! Procedimiento aeronáutico verificado.");
      combatAudio.playVictoryChime();
    } else {
      // ERROR - DO NOT ADVANCE. THE SENTENCE STAYS UNTIL WRITTEN CORRECTLY.
      setStatus("WRONG");
      setTotalErrors((prev) => prev + 1);
      setAttempts((prev) => prev + 1);
      combatAudio.playWarning();

      // Analyze what is missing for constructive feedback
      const missingClues = currentClues.filter(
        (c) => !normInput.includes(normalizeSpanish(c.translation))
      );

      if (missingClues.length > 0) {
        const topMissing = missingClues[0];
        setFeedbackMessage(
          `❌ Traducción inexacta. Revisa el ${topMissing.partType.toLowerCase()} ("${topMissing.englishText}" ➔ "${topMissing.translation}"). La oración se mantiene activa hasta escribirla bien.`
        );
      } else {
        setFeedbackMessage(
          "❌ Traducción incompleta. Comprueba la redacción técnica exacta. La oración se mantiene activa hasta escribirla bien."
        );
      }
    }
  };

  // Move to next question after correct verification
  const handleNext = () => {
    if (!activePlay) return;

    if (currentIndex + 1 < activePlay.questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed all 20 questions in the play!
      setIsCompleted(true);
      combatAudio.playVictoryChime();

      // Save stats to localStorage
      const updated = {
        ...completedPlays,
        [activePlay.playId]: {
          errors: totalErrors,
          date: new Date().toLocaleDateString(),
          bestScore: Math.max(0, 20 - totalErrors),
        },
      };
      setCompletedPlays(updated);
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {
        // safe ignore
      }
    }
  };

  // =========================================================================
  // VIEW: LIST OF PLAYS (MENU)
  // =========================================================================
  if (selectedPlayId === null || !activePlay) {
    return (
      <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto px-2 sm:px-4 py-3 animate-in fade-in duration-200">
        {/* TOP BAR */}
        <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#79c6ff]/20">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0b1b30] hover:bg-[#132c4e] border border-[#79c6ff]/40 text-[#79c6ff] text-xs font-bold uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Menú</span>
          </button>

          <div className="text-right">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#79c6ff] block">
              MÓDULO {moduleNumber} • 200 ORACIONES
            </span>
            <span className="text-xs font-black text-white">
              10 PLAYS • 20 ORACIONES C/U
            </span>
          </div>
        </div>

        {/* BANNER HEADER */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-[#79c6ff]/50 shadow-[0_0_25px_rgba(79,167,255,0.2)] mb-4 bg-gradient-to-r from-[#0a182c] via-[#0d223f] to-[#0a182c] p-4 sm:p-5">
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#79c6ff]/20 border border-[#79c6ff]/40 text-[#79c6ff] text-[10px] font-black uppercase tracking-wider mb-1.5">
                <Plane className="w-3.5 h-3.5" />
                <span>MANUALES DE MANTENIMIENTO CESSNA & ASD-STE100</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black uppercase text-white tracking-wide m-0">
                {moduleTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 m-0 mt-1 max-w-2xl leading-relaxed">
                {moduleSubtitle}
              </p>
            </div>

            <div className="flex flex-col items-end gap-1 bg-[#081526]/80 p-2.5 rounded-xl border border-[#79c6ff]/30 text-right">
              <span className="text-[10px] font-mono text-[#79c6ff] uppercase">Progreso Total</span>
              <span className="text-base font-black text-white">
                {Object.keys(completedPlays).length} / {plays.length} PLAYS
              </span>
            </div>
          </div>
        </div>

        {/* PEDAGOGICAL INSTRUCTIONS BOX */}
        <div className="bg-[#091729]/90 rounded-xl p-3 border border-[#79c6ff]/30 shadow-sm mb-4 text-left">
          <div className="flex items-center gap-2 mb-1 text-[#79c6ff] text-xs font-black uppercase tracking-wider">
            <Info className="w-4 h-4" />
            <span>MÉTODO PEDAGÓGICO DE APRENDIZAJE:</span>
          </div>
          <ol className="text-slate-300 text-[11.5px] sm:text-xs space-y-1 list-decimal list-inside m-0 leading-relaxed">
            <li>
              <strong>Paso 1:</strong> Al dar clic al Play, se muestra la oración en inglés y en la parte de abajo <strong>únicamente la traducción del Verbo y del Núcleo/Componente</strong>.
            </li>
            <li>
              <strong>Paso 2:</strong> Al presionar <strong>"Verificar y Traducir"</strong>, aparece el cuadro de texto para redactar la traducción completa en español.
            </li>
            <li>
              <strong>Paso 3:</strong> Si la traducción tiene errores, <strong>la oración se mantiene en pantalla</strong> hasta escribirla correctamente.
            </li>
          </ol>
        </div>

        {/* GRID OF 10 PLAYS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {plays.map((play) => {
            const stats = completedPlays[play.playId];
            const isDone = !!stats;

            return (
              <div
                key={play.playId}
                className={`rounded-2xl border transition-all duration-200 p-3.5 sm:p-4 flex flex-col justify-between text-left ${
                  isDone
                    ? "bg-gradient-to-br from-[#0c233c] to-[#09192c] border-[#79c6ff]/70 shadow-[0_0_15px_rgba(79,167,255,0.2)]"
                    : "bg-gradient-to-br from-[#0a182c] to-[#071324] border-[#79c6ff]/30 hover:border-[#79c6ff]/60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#79c6ff] bg-[#0c1f38] px-2 py-0.5 rounded border border-[#79c6ff]/30">
                      {play.ataChapter}
                    </span>
                    {isDone && (
                      <span className="flex items-center gap-1 text-[10px] font-black text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>COMPLETADO</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-tight m-0 mb-1">
                    {play.title}
                  </h3>
                  <p className="text-[11.5px] text-slate-300 leading-snug m-0 mb-2">
                    {play.subtitle}
                  </p>
                  <span className="text-[10.5px] font-mono text-slate-400 block mb-3">
                    Aeronave: <strong className="text-slate-200">{play.aircraftModel}</strong> • 20 Tareas AMM
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#79c6ff]/15">
                  <button
                    onClick={() => startPlay(play.playId, false)}
                    className="flex-1 py-2 px-3 rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-[#4fa7ff] to-[#79c6ff] hover:brightness-110 text-black border border-[#79c6ff] shadow-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>{isDone ? "REPETIR PLAY" : "INICIAR PLAY"}</span>
                  </button>

                  <button
                    onClick={() => startPlay(play.playId, true)}
                    title="Jugar en orden aleatorio"
                    className="py-2 px-3 rounded-xl font-bold text-xs uppercase bg-[#0b1e36] hover:bg-[#122b4d] text-[#79c6ff] border border-[#79c6ff]/40 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: PLAY COMPLETED SUMMARY
  // =========================================================================
  if (isCompleted) {
    const nextPlayId = activePlay.playId < plays.length ? activePlay.playId + 1 : 1;
    const totalQuestionsCount = activePlay.questions.length || 20;

    return (
      <Game2FinalCompletionScreen
        moduleTitle={moduleTitle}
        playId={activePlay.playId}
        totalErrors={totalErrors}
        totalQuestionsCount={totalQuestionsCount}
        nextPlayId={nextPlayId}
        onAgain={() => startPlay(activePlay.playId, true)}
        onBack={() => setSelectedPlayId(null)}
        onNext={() => startPlay(nextPlayId, false)}
      />
    );
  }

  // =========================================================================
  // VIEW: ACTIVE PLAY SCREEN (2 PHASES: STUDY_CLUES -> WRITE_TRANSLATION)
  // =========================================================================
  if (!currentQuestion) return null;

  return (
    <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto px-2 sm:px-4 py-2 animate-in fade-in duration-200">
      {/* TOP STATUS HEADER */}
      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#79c6ff]/20">
        <button
          onClick={() => setSelectedPlayId(null)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0b1b30] hover:bg-[#132c4e] border border-[#79c6ff]/40 text-[#79c6ff] text-xs font-bold uppercase transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Plays</span>
        </button>

        <div className="text-center">
          <span className="text-[10.5px] font-mono text-[#79c6ff] uppercase block font-bold">
            PLAY {activePlay.playId}: {activePlay.ataChapter}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-black text-white bg-[#0e223d] px-2.5 py-1 rounded-lg border border-[#79c6ff]/30">
            {currentIndex + 1} / {activePlay.questions.length}
          </span>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full bg-[#081525] rounded-full h-1.5 mb-3 border border-[#79c6ff]/20 overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#4fa7ff] to-[#79c6ff] h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / activePlay.questions.length) * 100}%` }}
        />
      </div>

      {/* QUESTION CARD */}
      <div className="w-full bg-gradient-to-b from-[#0a182c] to-[#071324] border-2 border-[#79c6ff]/50 rounded-2xl p-4 sm:p-5 shadow-[0_0_25px_rgba(79,167,255,0.15)] flex flex-col gap-4 text-left">
        
        {/* AIRCRAFT BADGE & LISTEN BUTTON */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 bg-[#0c1f38] px-2.5 py-1 rounded-md border border-[#79c6ff]/30">
            ✈️ {currentQuestion.aircraftModel} • {currentQuestion.ataChapter}
          </span>

          <button
            onClick={handleListen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0e2747] hover:bg-[#153a68] border border-[#79c6ff]/60 text-[#79c6ff] text-xs font-black uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <Volume2 className="w-4 h-4 text-[#79c6ff]" />
            <span>Escuchar Inglés</span>
          </button>
        </div>

        {/* ENGLISH SENTENCE */}
        <div className="bg-[#050f1d] p-3.5 sm:p-4 rounded-xl border border-[#79c6ff]/40 shadow-inner">
          <span className="text-[9.5px] font-mono uppercase tracking-widest text-[#79c6ff] block mb-1">
            ORACIÓN EN INGLÉS (ENGLISH TASK):
          </span>
          <p className="text-base sm:text-lg font-bold text-white leading-relaxed m-0 tracking-wide font-sans">
            "{currentQuestion.fullEnglish}"
          </p>
        </div>

        {/* ===================================================================
            PHASE 1: STUDY CLUES (ONLY TRANSLATIONS OF VERB AND CORE NOUN)
            User requested: "al dar clic en el play, se muestra la oracion en ingles,
            en la parte de abajo solo la traduccion de las palabras, del verbo, nucleo,
            solo eso lo demas se mantiene en ingles"
           =================================================================== */}
        {currentPhase === "STUDY_CLUES" && (
          <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-[#79c6ff] tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>PALABRAS CLAVE: VERBO Y NÚCLEO (ESTUDIA SU TRADUCCIÓN):</span>
            </div>

            {/* CLUES PILLS / CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentClues.map((clue, idx) => {
                const isVerbo = clue.partType === "VERBO";
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border transition-all flex flex-col justify-between ${
                      isVerbo
                        ? "bg-[#0a223e]/70 border-[#79c6ff]/60 shadow-[0_0_12px_rgba(79,167,255,0.15)]"
                        : "bg-[#091d35]/60 border-[#79c6ff]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span
                        className={`text-[9px] font-mono uppercase font-black px-2 py-0.5 rounded ${
                          isVerbo
                            ? "bg-[#4fa7ff]/30 text-[#79c6ff] border border-[#79c6ff]/40"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {isVerbo ? "VERBO TÉCNICO" : "NÚCLEO / COMPONENTE"}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Inglés:</span>
                    </div>

                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-300">
                        "{clue.englishText}"
                      </span>
                      <span className="text-xs text-slate-400 font-mono">➔</span>
                      <span className="text-sm sm:text-base font-black text-white underline decoration-[#79c6ff] decoration-2 underline-offset-4">
                        {clue.translation}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-[#081525] rounded-xl border border-[#79c6ff]/20 text-slate-300 text-[11.5px] leading-relaxed">
              💡 <em>Observa la estructura técnica: <strong>Verbo</strong> ➔ <strong>Componente</strong> ➔ <strong>Complemento</strong>. Cuando estés listo, haz clic en el botón de abajo para redactar la oración completa en español.</em>
            </div>

            {/* ACTION BUTTON TO ENTER TRANSLATION PHASE */}
            <button
              onClick={() => setCurrentPhase("WRITE_TRANSLATION")}
              className="w-full py-3.5 px-6 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-[#4fa7ff] via-[#79c6ff] to-[#a6d8ff] text-black border border-[#79c6ff] hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(79,167,255,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-1"
            >
              <Edit3 className="w-4 h-4" />
              <span>VERIFICAR Y TRADUCIR (ESCRIBIR EN ESPAÑOL) ➔</span>
            </button>
          </div>
        )}

        {/* ===================================================================
            PHASE 2: WRITE TRANSLATION IN SPANISH (CUADRO DE TEXTO)
            User requested: "y al dar clic se muestra la oracion en ingles completa
            con un cuadro de texto para escribir la traduccion en español si esta
            mal se mantien la oracion, hasta escribir la oracion bien"
           =================================================================== */}
        {currentPhase === "WRITE_TRANSLATION" && (
          <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-black uppercase text-[#79c6ff] flex items-center gap-1.5">
                <Edit3 className="w-4 h-4" />
                <span>ESCRIBE LA TRADUCCIÓN COMPLETA EN ESPAÑOL:</span>
              </span>

              <button
                onClick={() => setShowHint(!showHint)}
                className="text-[10px] font-mono text-[#79c6ff] hover:text-white uppercase flex items-center gap-1 underline cursor-pointer"
              >
                <Lightbulb className="w-3 h-3" />
                <span>{showHint ? "Ocultar pistas" : "Ver pistas de palabras"}</span>
              </button>
            </div>

            {/* COLLAPSIBLE HINT PILLS */}
            {showHint && (
              <div className="p-3 bg-[#081525] rounded-xl border border-[#79c6ff]/30 text-xs text-slate-200 flex flex-wrap gap-2 animate-in fade-in duration-150">
                {currentClues.map((c, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded bg-[#0d223c] border border-[#79c6ff]/40 text-[11px] text-[#79c6ff] font-mono"
                  >
                    <strong>{c.englishText}</strong>: {c.translation}
                  </span>
                ))}
              </div>
            )}

            {/* TEXTAREA FOR SPANISH TRANSLATION */}
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={userTranslation}
                onChange={(e) => {
                  setUserTranslation(e.target.value);
                  if (status === "WRONG") setStatus("IDLE");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (status === "CORRECT") {
                      handleNext();
                    } else {
                      handleVerifyTranslation();
                    }
                  }
                }}
                disabled={status === "CORRECT"}
                placeholder="Escribe aquí la traducción técnica aeronáutica en español..."
                rows={3}
                className={`w-full p-3.5 rounded-xl text-sm sm:text-base font-medium leading-relaxed outline-none transition-all resize-none shadow-inner ${
                  status === "CORRECT"
                    ? "bg-emerald-950/40 text-emerald-200 border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    : status === "WRONG"
                    ? "bg-red-950/30 text-white border-2 border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                    : "bg-[#061221] text-white border-2 border-[#79c6ff]/40 focus:border-[#79c6ff] focus:shadow-[0_0_15px_rgba(79,167,255,0.25)]"
                }`}
              />
            </div>

            {/* FEEDBACK BANNER */}
            {feedbackMessage && (
              <div
                className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold flex items-start gap-2.5 animate-in fade-in duration-200 ${
                  status === "CORRECT"
                    ? "bg-emerald-950/70 border-emerald-500/80 text-emerald-200"
                    : "bg-red-950/70 border-red-500/80 text-red-200"
                }`}
              >
                {status === "CORRECT" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="m-0 leading-relaxed">{feedbackMessage}</p>
                  {status === "CORRECT" && (
                    <p className="text-[11.5px] text-emerald-300/80 mt-1 m-0 italic">
                      Traducción exacta AMM: "{currentQuestion.spanishTranslation}"
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-2 mt-1">
              {status !== "CORRECT" ? (
                <>
                  <button
                    onClick={handleVerifyTranslation}
                    className="flex-1 py-3 px-6 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-[#4fa7ff] to-[#79c6ff] hover:brightness-110 text-black border border-[#79c6ff] shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>VERIFICAR TRADUCCIÓN</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserTranslation("");
                      setStatus("IDLE");
                      setFeedbackMessage("");
                      textareaRef.current?.focus();
                    }}
                    title="Limpiar texto"
                    className="py-3 px-4 rounded-xl font-bold text-xs uppercase bg-[#0b1e36] hover:bg-[#122b4d] text-slate-300 border border-[#79c6ff]/30 active:scale-95 transition-all cursor-pointer"
                  >
                    Limpiar
                  </button>

                  <button
                    onClick={() => setCurrentPhase("STUDY_CLUES")}
                    title="Volver a ver las palabras clave"
                    className="py-3 px-4 rounded-xl font-bold text-xs uppercase bg-[#0b1e36] hover:bg-[#122b4d] text-[#79c6ff] border border-[#79c6ff]/30 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Claves</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full py-3.5 px-6 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 text-black border border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>SIGUIENTE ORACIÓN (NEXT) ➔</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER NOTICE */}
      <div className="mt-3 text-center">
        <span className="text-[10px] font-mono text-slate-400">
          REGLA: En caso de error, la oración se mantendrá activa hasta escribirla correctamente según las especificaciones del manual AMM.
        </span>
      </div>
    </div>
  );
};

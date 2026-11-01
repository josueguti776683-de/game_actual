import React, { useState, useMemo, useEffect, useRef } from "react";
import { Module8Play, Module8Question } from "../data/game2Module8Types";
import { ALL_MODULE8_PLAYS, getModule8PlayById } from "../data/game2Module8Data";
import { playAudio } from "../utils/audioEngine";
import { combatAudio } from "../utils/combatAudio";
import { safeStorage } from "../utils/safeStorage";
import { Game2FinalCompletionScreen } from "./Game2FinalCompletionScreen";
import {
  ArrowLeft,
  Volume2,
  CheckCircle2,
  Award,
  RotateCcw,
  ChevronRight,
  ClipboardList,
  Wrench,
  AlertCircle,
  Sparkles,
  HelpCircle,
  Delete,
  Check,
  Plane,
  XCircle,
  BookOpen,
  Send,
  CornerDownLeft,
  Flame,
  Zap,
  FileText,
  ShieldCheck,
  AlertTriangle,
  GraduationCap
} from "lucide-react";

interface Props {
  onBack: () => void;
}

const STORAGE_KEY = "GAME2_MOD8_PROGRESS";

// Normalizes English strings for comparing chunk-assembled or typed answers
function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .replace(/[.,:;?!'"-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const Game2Module8View: React.FC<Props> = ({ onBack }) => {
  // Navigation: "LIST" (10 Plays selection) or "GAME" (playing a specific Play)
  const [selectedPlayId, setSelectedPlayId] = useState<number | null>(null);

  // Tab mode inside a play: "STUDY" (Learning rules, vocab, AMM examples) or "EXAM" (Mini-Exam & Sentence Builder)
  const [playSubTab, setPlaySubTab] = useState<"STUDY" | "EXAM">("STUDY");

  // Local storage progress: map of playId -> stats
  const [completedPlays, setCompletedPlays] = useState<
    Record<number, { errors: number; date: string; bestScore: number }>
  >(() => {
    try {
      const saved = safeStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Active Play State
  const activePlay = useMemo<Module8Play | undefined>(() => {
    if (!selectedPlayId) return undefined;
    return getModule8PlayById(selectedPlayId);
  }, [selectedPlayId]);

  // Quiz / Exam state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [placedChunks, setPlacedChunks] = useState<string[]>([]);
  const [availableScrambledChunks, setAvailableScrambledChunks] = useState<
    { id: string; text: string; used: boolean }[]
  >([]);

  // Penalty / Verification state (Game 1 mechanics integration)
  const [phase, setPhase] = useState<"QUESTION" | "PENALTY" | "SUCCESS">("QUESTION");
  const [penaltyTypedInput, setPenaltyTypedInput] = useState("");
  const [feedback, setFeedback] = useState<"IDLE" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showRuleTip, setShowRuleTip] = useState(false);

  // Scoring & Combo streak
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [errorsThisQuestion, setErrorsThisQuestion] = useState(0);
  const [totalErrorsInPlay, setTotalErrorsInPlay] = useState(0);
  const [isPlayCompleted, setIsPlayCompleted] = useState(false);

  const penaltyInputRef = useRef<HTMLInputElement>(null);

  const currentQ: Module8Question | undefined = activePlay?.questions[currentIndex];

  // Initialize question state whenever currentQ changes
  useEffect(() => {
    if (!currentQ) return;
    setSelectedOptionId(null);
    setPlacedChunks([]);
    setFeedback("IDLE");
    setErrorMessage(null);
    setShowRuleTip(false);
    setErrorsThisQuestion(0);
    setPhase("QUESTION");
    setPenaltyTypedInput("");

    // Prepare scrambled structural chunks for interactive sentence building
    const chunks = (currentQ.scrambledChunks || []).map((chunkText, idx) => ({
      id: `${currentQ.id}-${idx}-${chunkText}`,
      text: chunkText,
      used: false,
    }));
    // Randomize initial order of chunks to challenge sentence building
    setAvailableScrambledChunks([...chunks].sort(() => 0.5 - Math.random()));
  }, [currentQ, currentIndex]);

  // Pronunciation speaker using centralized audioEngine
  const speakSentence = (text: string) => {
    if (!text) return;
    playAudio(text, undefined, undefined, false, 0.9);
  };

  // Handle clicking a scrambled chunk
  const handleSelectChunk = (item: { id: string; text: string; used: boolean }) => {
    if (item.used || feedback === "SUCCESS" || phase === "PENALTY") return;

    setAvailableScrambledChunks((prev) =>
      prev.map((t) => (t.id === item.id ? { ...t, used: true } : t))
    );

    const newPlaced = [...placedChunks, item.text];
    setPlacedChunks(newPlaced);

    // Play subtle audio tone
    try {
      combatAudio.playLockTone();
    } catch {
      // safe
    }
  };

  // Remove placed chunk
  const handleRemoveChunk = (index: number) => {
    if (feedback === "SUCCESS" || phase === "PENALTY") return;

    const removedText = placedChunks[index];
    const newPlaced = placedChunks.filter((_, i) => i !== index);
    setPlacedChunks(newPlaced);

    // Free first matching used chunk
    setAvailableScrambledChunks((prev) => {
      let found = false;
      return prev.map((item) => {
        if (!found && item.used && item.text === removedText) {
          found = true;
          return { ...item, used: false };
        }
        return item;
      });
    });
  };

  // Clear all placed chunks
  const handleClearChunks = () => {
    if (feedback === "SUCCESS" || phase === "PENALTY") return;
    setPlacedChunks([]);
    setAvailableScrambledChunks((prev) => prev.map((t) => ({ ...t, used: false })));
  };

  // Check Multiple Choice Option
  const handleSelectOption = (optionId: string) => {
    if (feedback === "SUCCESS" || phase === "PENALTY" || !currentQ) return;
    setSelectedOptionId(optionId);

    const chosen = currentQ.options.find((o) => o.id === optionId);
    if (!chosen) return;

    if (chosen.isCorrect) {
      handleSuccess();
    } else {
      handleError(chosen.explanation || "Opción incorrecta según la regla de ASD-STE100.");
    }
  };

  // Verify Sentence Assembled via Chunks
  const handleVerifyChunkSentence = () => {
    if (!currentQ || feedback === "SUCCESS" || phase === "PENALTY") return;

    const assembledSentence = placedChunks.join(" ").trim();
    if (!assembledSentence) {
      setErrorMessage("Coloca los bloques de palabras para formar la oración aprobada en STE.");
      return;
    }

    const normPlaced = normalizeText(assembledSentence);
    const normTarget = normalizeText(currentQ.correctSentence);

    if (normPlaced === normTarget) {
      handleSuccess();
    } else {
      handleError("El orden o los términos no cumplen con la regla de ASD-STE100.");
    }
  };

  // SUCCESS HANDLER
  const handleSuccess = () => {
    if (!currentQ || !activePlay) return;

    setFeedback("SUCCESS");
    setErrorMessage(null);
    setPhase("SUCCESS");

    const newStreak = streak + 1;
    setStreak(newStreak);
    if (newStreak > maxStreak) setMaxStreak(newStreak);

    try {
      if (newStreak >= 5) {
        combatAudio.playVictoryChime();
      } else {
        combatAudio.playLockTone();
      }
    } catch {
      // safe
    }

    // Read out the correct sentence
    speakSentence(currentQ.correctSentence);

    // Move to next question after brief celebration delay
    setTimeout(() => {
      if (currentIndex + 1 < activePlay.questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Complete the Play!
        handleCompletePlay();
      }
    }, 1600);
  };

  // ERROR HANDLER (Game 1 Penalty integration)
  const handleError = (reason: string) => {
    if (!currentQ) return;

    setFeedback("ERROR");
    setErrorMessage(reason);
    setErrorsThisQuestion((prev) => prev + 1);
    setTotalErrorsInPlay((prev) => prev + 1);
    setStreak(0); // reset streak

    try {
      combatAudio.playWarning();
    } catch {
      // safe
    }

    // Switch to penalty verification phase to guarantee rule retention
    setPhase("PENALTY");
    setTimeout(() => {
      penaltyInputRef.current?.focus();
    }, 200);
  };

  // DISMISS / RETRY PENALTY (Exit penalty mode immediately to continue learning)
  const handleDismissPenalty = () => {
    setPhase("QUESTION");
    setFeedback("IDLE");
    setErrorMessage(null);
    setPenaltyTypedInput("");
    handleClearChunks();
    setSelectedOptionId(null);
    try {
      combatAudio.playLockTone();
    } catch {
      // safe
    }
  };

  // PENALTY CORRECTION SUBMISSION
  const handlePenaltySubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    handleDismissPenalty();
  };

  // PLAY COMPLETION
  const handleCompletePlay = () => {
    if (!activePlay) return;

    setIsPlayCompleted(true);
    const score = Math.max(0, activePlay.questions.length - totalErrorsInPlay);

    // Update persistent progress
    setCompletedPlays((prev) => {
      const existing = prev[activePlay.playId];
      const best = existing ? Math.max(existing.bestScore, score) : score;
      const updated = {
        ...prev,
        [activePlay.playId]: {
          errors: totalErrorsInPlay,
          date: new Date().toLocaleDateString(),
          bestScore: best,
        },
      };
      try {
        safeStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // safe
      }
      return updated;
    });
  };

  // Restart current play
  const handleRestartPlay = () => {
    setCurrentIndex(0);
    setTotalErrorsInPlay(0);
    setStreak(0);
    setIsPlayCompleted(false);
    setFeedback("IDLE");
    setErrorMessage(null);
    setPhase("QUESTION");
    setPlaySubTab("EXAM");
  };

  // =========================================================================
  // VIEW: UNIFIED COMPLETION SCREEN (Errors > 0 vs Errors === 0)
  // =========================================================================
  if (isPlayCompleted && activePlay) {
    const nextPlayId = activePlay.playId < ALL_MODULE8_PLAYS.length ? activePlay.playId + 1 : 1;

    return (
      <Game2FinalCompletionScreen
        moduleTitle="MÓDULO 8: REGLAS Y CONSTRUCCIÓN DE ORACIONES STE"
        playId={activePlay.playId}
        totalErrors={totalErrorsInPlay}
        totalQuestionsCount={activePlay.questions.length}
        nextPlayId={nextPlayId}
        onAgain={handleRestartPlay}
        onBack={() => {
          setSelectedPlayId(null);
          setIsPlayCompleted(false);
        }}
        onNext={() => {
          setSelectedPlayId(nextPlayId);
          setIsPlayCompleted(false);
          setCurrentIndex(0);
          setTotalErrorsInPlay(0);
          setStreak(0);
          setPlaySubTab("STUDY");
        }}
      />
    );
  }

  // =========================================================================
  // VIEW: 10 PLAYS SELECTION LIST (selectedPlayId === null)
  // =========================================================================
  if (selectedPlayId === null) {
    const completedCount = Object.keys(completedPlays).length;
    const totalPlaysCount = ALL_MODULE8_PLAYS.length;

    return (
      <div className="flex flex-col flex-1 w-full max-w-full min-w-0 overflow-hidden animate-in fade-in duration-200">
        {/* TOP BAR */}
        <div className="flex items-center justify-between pb-3 border-b border-[#79c6ff]/20 mb-3.5">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#091526] hover:bg-[#132847] border border-[#79c6ff]/40 text-slate-300 hover:text-white text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-[#79c6ff]" />
            <span>VOLVER A MENÚ GAME 2</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold bg-[#0c1e38] text-[#79c6ff] px-2.5 py-1 rounded-full border border-[#79c6ff]/40">
              {completedCount} / {totalPlaysCount} PLAYS COMPLETADOS
            </span>
          </div>
        </div>

        {/* HEADER HERO */}
        <div className="bg-gradient-to-r from-[#0d1f3c] via-[#09162a] to-[#0a1b33] border-2 border-[#79c6ff]/60 rounded-2xl p-4 sm:p-5 shadow-[0_0_25px_rgba(79,167,255,0.2)] mb-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <GraduationCap className="w-6 h-6 text-[#79c6ff]" />
            <h2 className="text-base sm:text-xl font-black uppercase text-white tracking-wider m-0">
              MÓDULO 8: REGLAS Y CONSTRUCCIÓN DE ORACIONES STE
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed mb-3">
            Normativa oficial <strong>ASD-STE100</strong> (Simplified Technical English): aprende cuándo usar cada verbo, tiempo verbal, sustantivos técnicos, límites de grupos nominales, eliminación de la voz pasiva y brevedad en manuales aeronáuticos.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-slate-300">
            <span className="bg-[#0b2447] px-2.5 py-1 rounded-md border border-[#79c6ff]/30 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#79c6ff]" /> 10 Reglas Clave
            </span>
            <span className="bg-[#0b2447] px-2.5 py-1 rounded-md border border-[#79c6ff]/30 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> 200 Preguntas Prácticas
            </span>
            <span className="bg-[#0b2447] px-2.5 py-1 rounded-md border border-[#79c6ff]/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> AMM Boeing, Airbus & Cessna
            </span>
          </div>
        </div>

        {/* PLAYS LIST (10 PLAYS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto no-scrollbar pb-6">
          {ALL_MODULE8_PLAYS.map((play) => {
            const stats = completedPlays[play.playId];
            const isFinished = !!stats;

            return (
              <div
                key={play.playId}
                className="bg-gradient-to-b from-[#09192f] to-[#071324] border-2 border-[#79c6ff]/40 hover:border-[#79c6ff] rounded-xl p-3.5 sm:p-4 shadow-sm hover:shadow-[0_0_20px_rgba(79,167,255,0.2)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-black uppercase text-amber-400 bg-amber-950/60 border border-amber-500/40 px-2 py-0.5 rounded-full">
                      {play.ruleCode}
                    </span>
                    {isFinished && (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {stats.bestScore}/20 pts ({stats.errors} err)
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs sm:text-sm font-black uppercase text-white tracking-wide mb-1">
                    {play.title}
                  </h3>
                  <p className="text-[11.5px] text-slate-300 leading-relaxed mb-3">
                    {play.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#79c6ff]/15">
                  <button
                    onClick={() => {
                      setSelectedPlayId(play.playId);
                      setPlaySubTab("STUDY");
                    }}
                    className="flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase bg-[#0d223f] hover:bg-[#132e54] text-[#79c6ff] border border-[#79c6ff]/40 transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#79c6ff]" />
                    <span>ESTUDIAR REGLA</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPlayId(play.playId);
                      setPlaySubTab("EXAM");
                    }}
                    className="flex-1 py-2 px-3 rounded-lg text-xs font-black uppercase bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white border border-amber-400/60 transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-200" />
                    <span>EXAMEN (20 Qs)</span>
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
  // VIEW: PLAY ACTIVE (activePlay !== undefined)
  // =========================================================================
  return (
    <div className="flex flex-col flex-1 w-full max-w-full min-w-0 overflow-hidden animate-in fade-in duration-200">
      {/* PLAY TOP BAR */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#79c6ff]/20 mb-3">
        <button
          onClick={() => {
            setSelectedPlayId(null);
            setFeedback("IDLE");
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#091526] hover:bg-[#132847] border border-[#79c6ff]/40 text-slate-300 hover:text-white text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-[#79c6ff]" />
          <span>LISTA DE REGLAS</span>
        </button>

        {/* SUBTABS TOGGLE: REGLA & TEORÍA vs MINI-EXAMEN */}
        <div className="flex items-center bg-[#071324] p-0.5 rounded-xl border border-[#79c6ff]/40">
          <button
            onClick={() => setPlaySubTab("STUDY")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              playSubTab === "STUDY"
                ? "bg-[#0f2a4f] text-[#79c6ff] shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>REGLA Y TEORÍA</span>
          </button>
          <button
            onClick={() => setPlaySubTab("EXAM")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              playSubTab === "EXAM"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>MINI-EXAMEN ({currentIndex + 1}/{activePlay?.questions.length})</span>
          </button>
        </div>

        {/* STREAK & ERRORS */}
        <div className="flex items-center gap-2">
          {streak >= 2 && (
            <span className="hidden sm:flex items-center gap-1 text-[11px] font-mono font-black text-amber-400 bg-amber-950/70 border border-amber-500/50 px-2.5 py-1 rounded-full animate-bounce">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              {streak} EN RACHA!
            </span>
          )}
          <span className="text-[11px] font-mono font-bold bg-[#140b0d] text-red-400 px-2.5 py-1 rounded-full border border-red-500/40">
            {totalErrorsInPlay} ERR
          </span>
        </div>
      </div>

      {/* =================================================================== */}
      {/* SUBTAB 1: REGLA Y TEORÍA (VOCABULARIO, EJEMPLOS REALES AMM)         */}
      {/* =================================================================== */}
      {playSubTab === "STUDY" && activePlay && (
        <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar space-y-4 pb-6">
          {/* RULE HERO CARD */}
          <div className="bg-gradient-to-r from-[#0b1c38] to-[#071324] border-2 border-[#79c6ff]/60 rounded-2xl p-4 sm:p-5 shadow-[0_0_20px_rgba(79,167,255,0.18)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono font-black text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                {activePlay.ruleCode}
              </span>
              <h2 className="text-sm sm:text-base font-black uppercase text-white tracking-wide m-0">
                {activePlay.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
              {activePlay.ruleDescription}
            </p>

            {/* BULLETS */}
            <div className="bg-[#081527]/90 rounded-xl p-3 border border-[#79c6ff]/20 space-y-2">
              <span className="text-[11px] font-bold uppercase text-[#79c6ff] tracking-wider block">
                PRINCIPIOS FUNDAMENTALES:
              </span>
              <ul className="space-y-1.5 m-0 pl-4 text-xs text-slate-300 list-disc">
                {activePlay.ruleSummaryBullets.map((bullet, idx) => (
                  <li key={idx} className="leading-snug">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* REAL AMM EXAMPLES COMPARISON */}
          {activePlay.realAmmExamples && activePlay.realAmmExamples.length > 0 && (
            <div className="bg-[#081527] border-2 border-emerald-500/40 rounded-2xl p-4 shadow-sm">
              <h3 className="text-xs sm:text-sm font-black uppercase text-emerald-400 tracking-wider mb-3 flex items-center gap-2">
                <Plane className="w-4 h-4 text-emerald-400" />
                <span>CASOS REALES EN MANUALES AMM (ANTES VS DESPUÉS DE STE)</span>
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {activePlay.realAmmExamples.map((ex, idx) => (
                  <div key={idx} className="bg-[#0a182d] p-3 rounded-xl border border-slate-700 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase block">
                      AERONAVE: {ex.aircraft}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="bg-red-950/40 p-2.5 rounded-lg border border-red-500/30">
                        <span className="text-[10px] font-bold text-red-400 uppercase block mb-1">
                          ❌ NO APROBADO EN STE:
                        </span>
                        <p className="text-slate-300 italic m-0">"{ex.unapproved}"</p>
                      </div>
                      <div className="bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/30">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase block mb-1">
                          ✅ APROBADO EN ASD-STE100:
                        </span>
                        <p className="text-emerald-200 font-semibold m-0">"{ex.approved}"</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-300 m-0 italic">
                      <strong>Fundamento:</strong> {ex.ruleExplanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VOCABULARY TABLE */}
          {activePlay.keyVocabulary && activePlay.keyVocabulary.length > 0 && (
            <div className="bg-[#081527] border-2 border-[#79c6ff]/40 rounded-2xl p-4 shadow-sm">
              <h3 className="text-xs sm:text-sm font-black uppercase text-[#79c6ff] tracking-wider mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#79c6ff]" />
                <span>VOCABULARIO TÉCNICO Y CATEGORÍAS GRAMATICALES</span>
              </h3>

              <div className="space-y-2.5">
                {activePlay.keyVocabulary.map((voc, idx) => (
                  <div key={idx} className="bg-[#0b1b31] p-3 rounded-xl border border-[#79c6ff]/20">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-black text-white font-mono">
                          {voc.approvedWord}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#102a4e] text-[#79c6ff] border border-[#79c6ff]/30 font-bold">
                          {voc.partOfSpeech}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-amber-300">
                        {voc.spanish}
                      </span>
                    </div>

                    <p className="text-[11.5px] text-slate-300 m-0 mb-1.5 leading-snug">
                      {voc.meaningSTE}
                    </p>

                    {voc.unapprovedSynonyms.length > 0 && (
                      <p className="text-[11px] text-red-300 m-0 mb-1">
                        <strong>Términos Prohibidos / No Aprobados:</strong> {voc.unapprovedSynonyms.join(", ")}
                      </p>
                    )}

                    <div className="bg-[#071324] p-2 rounded-lg border border-slate-700/60 flex items-center justify-between gap-2">
                      <span className="text-xs text-slate-300 italic font-mono">
                        "{voc.ammExample}"
                      </span>
                      <button
                        onClick={() => speakSentence(voc.ammExample)}
                        className="p-1.5 rounded-lg bg-[#0c1f38] hover:bg-[#132e54] text-[#79c6ff] transition-all cursor-pointer shrink-0"
                        title="Escuchar audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA: GO TO EXAM */}
          <div className="pt-2 text-center">
            <button
              onClick={() => setPlaySubTab("EXAM")}
              className="w-full sm:w-auto min-w-[320px] py-3.5 px-8 rounded-2xl font-black text-sm uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Zap className="w-5 h-5 text-slate-950" />
              <span>INICIAR MINI-EXAMEN (20 PREGUNTAS) ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SUBTAB 2: MINI-EXAMEN & CONSTRUCCIÓN DE ORACIONES                  */}
      {/* =================================================================== */}
      {playSubTab === "EXAM" && currentQ && (
        <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar space-y-3.5 pb-6">
          {/* PROGRESS BAR */}
          <div className="w-full bg-[#081527] h-2 rounded-full overflow-hidden border border-[#79c6ff]/30">
            <div
              className="bg-gradient-to-r from-[#79c6ff] to-amber-400 h-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / (activePlay?.questions.length || 20)) * 100}%`,
              }}
            />
          </div>

          {/* QUESTION CARD */}
          <div className="bg-gradient-to-r from-[#0b1c38] to-[#071324] border-2 border-[#79c6ff]/60 rounded-2xl p-4 sm:p-5 shadow-[0_0_20px_rgba(79,167,255,0.18)]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400">
                <span className="bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40 font-black">
                  {currentQ.ataChapter}
                </span>
                <span className="bg-[#0f2444] px-2 py-0.5 rounded text-[#79c6ff] border border-[#79c6ff]/30 font-bold">
                  {currentQ.aircraftModel}
                </span>
              </div>

              <button
                onClick={() => setShowRuleTip(!showRuleTip)}
                className="text-[11px] font-bold text-[#79c6ff] hover:text-white flex items-center gap-1 cursor-pointer bg-[#0c1e38] px-2.5 py-1 rounded-full border border-[#79c6ff]/40"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#79c6ff]" />
                <span>{showRuleTip ? "Ocultar Regla" : "Pista / Regla STE"}</span>
              </button>
            </div>

            {/* PROMPT */}
            <h3 className="text-sm sm:text-base font-black text-white leading-snug mb-2">
              {currentQ.prompt}
            </h3>

            {/* CONTEXT SENTENCE IF PRESENT */}
            {currentQ.contextSentence && (
              <div className="bg-[#071324] p-3 rounded-xl border border-amber-500/30 mb-3 flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-mono text-amber-200 italic">
                  "{currentQ.contextSentence}"
                </span>
                <button
                  onClick={() => speakSentence(currentQ.contextSentence!)}
                  className="p-1.5 rounded-lg bg-[#0e2444] hover:bg-[#132f58] text-[#79c6ff] transition-all cursor-pointer shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* RULE TIP ACCORDION */}
            {showRuleTip && (
              <div className="bg-[#0e264a]/90 p-3 rounded-xl border border-[#79c6ff]/50 mb-3 text-xs text-slate-200 animate-in slide-in-from-top-1 duration-150">
                <span className="font-bold text-amber-400 block mb-1">REGLA ASD-STE100:</span>
                {currentQ.ruleTip}
              </div>
            )}

            {/* SPANISH TRANSLATION PREVIEW */}
            <p className="text-xs text-slate-400 m-0">
              <strong className="text-slate-300">Significado técnico en español:</strong> {currentQ.spanishTranslation}
            </p>
          </div>

          {/* =============================================================== */}
          {/* PENALTY OVERLAY / BOX (Game 1 integration when error occurs)    */}
          {/* =============================================================== */}
          {phase === "PENALTY" && (
            <div className="bg-gradient-to-b from-[#220c10] to-[#14070a] border-2 border-red-500 rounded-2xl p-4 sm:p-5 shadow-[0_0_25px_rgba(239,68,68,0.35)] animate-in shake duration-200 text-center">
              <div className="flex items-center justify-center gap-2 text-red-400 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider m-0">
                  ¡DESVIACIÓN DE LA NORMA ASD-STE100! (PENALIZACIÓN)
                </h4>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {errorMessage || "Tu respuesta no cumple la regla de Simplified Technical English."}
              </p>

              {/* RULE TIP FOR CONTEXT */}
              {currentQ.ruleTip && (
                <div className="bg-[#0e1e35] p-3 rounded-xl border border-[#79c6ff]/30 mb-3 text-left">
                  <span className="text-[10.5px] font-mono font-bold text-amber-400 uppercase block mb-1">
                    💡 REGLA TÉCNICA APLICABLE:
                  </span>
                  <p className="text-xs text-slate-200 m-0 leading-relaxed">
                    {currentQ.ruleTip}
                  </p>
                </div>
              )}

              {/* TARGET SENTENCE TO REINFORCE */}
              <div className="bg-[#0b172a] p-3 rounded-xl border border-[#79c6ff]/40 mb-3 text-center">
                <span className="text-[10px] font-mono text-[#79c6ff] uppercase font-bold block mb-1">
                  ORACIÓN TÉCNICA APROBADA EN ASD-STE100:
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs sm:text-sm font-mono font-black text-emerald-300 block">
                    "{currentQ.correctSentence}"
                  </span>
                  <button
                    onClick={() => speakSentence(currentQ.correctSentence)}
                    className="p-1.5 rounded-lg bg-[#0e2444] hover:bg-[#132f58] text-[#79c6ff] transition-all cursor-pointer shrink-0"
                    title="Escuchar pronunciación técnica"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* RETRY / ACKNOWLEDGE BUTTONS */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <button
                  onClick={handleDismissPenalty}
                  className="w-full sm:w-auto py-3 px-8 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white shadow-lg transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>ENTENDIDO, CORREGIR Y CONTINUAR ➔</span>
                </button>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* INTERACTIVE QUESTION MODES: OPTIONS vs SENTENCE BUILDER CHUNKS  */}
          {/* =============================================================== */}
          {phase !== "PENALTY" && (
            <div className="space-y-4">
              {/* 1. MULTIPLE CHOICE OPTIONS */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#79c6ff] block">
                  SELECCIONA LA OPCIÓN CORRECTA SEGÚN ASD-STE100:
                </span>

                {currentQ.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let btnBg = "bg-[#09192f] hover:bg-[#112a4d] border-[#79c6ff]/30 text-slate-200";

                  if (isSelected && feedback === "SUCCESS" && opt.isCorrect) {
                    btnBg = "bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
                  } else if (isSelected && feedback === "ERROR") {
                    btnBg = "bg-red-950/80 border-red-500 text-red-200";
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      disabled={feedback === "SUCCESS"}
                      className={`w-full text-left p-3 sm:p-3.5 rounded-xl border-2 transition-all flex items-start gap-3 cursor-pointer active:scale-[0.99] ${btnBg}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-[#0e274b] border border-[#79c6ff]/40 flex items-center justify-center text-xs font-mono font-black text-[#79c6ff] shrink-0 mt-0.5">
                        {opt.id}
                      </span>
                      <div className="flex-1">
                        <span className="text-xs sm:text-sm font-semibold block leading-snug">
                          {opt.text}
                        </span>
                        {isSelected && opt.explanation && (
                          <span className="text-[11px] text-slate-300 block mt-1 italic">
                            {opt.explanation}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 2. INTERACTIVE SENTENCE ASSEMBLER (CHUNKS) */}
              {currentQ.scrambledChunks && currentQ.scrambledChunks.length > 0 && (
                <div className="bg-[#081527] border border-[#79c6ff]/30 rounded-2xl p-4 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      O ARMA LA ORACIÓN TÉCNICA CON BLOQUES:
                    </span>
                    {placedChunks.length > 0 && (
                      <button
                        onClick={handleClearChunks}
                        className="text-[10px] font-mono text-slate-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Delete className="w-3 h-3" /> Limpiar
                      </button>
                    )}
                  </div>

                  {/* DROP / ASSEMBLED ZONE */}
                  <div className="min-h-[50px] p-3 rounded-xl bg-[#0a1b33] border-2 border-dashed border-[#79c6ff]/50 flex flex-wrap items-center gap-2">
                    {placedChunks.length === 0 ? (
                      <span className="text-xs text-slate-400 italic">
                        Toca los bloques de abajo en el orden correcto para construir la oración...
                      </span>
                    ) : (
                      placedChunks.map((chunk, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRemoveChunk(idx)}
                          className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-mono text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-300/40 shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
                          title="Toca para quitar"
                        >
                          <span>{chunk}</span>
                          <span className="text-[10px] text-amber-200">✕</span>
                        </button>
                      ))
                    )}
                  </div>

                  {/* SCRAMBLED CHUNKS POOL */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {availableScrambledChunks.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelectChunk(item)}
                        disabled={item.used}
                        className={`font-mono text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer active:scale-95 ${
                          item.used
                            ? "bg-[#0a1626]/40 text-slate-600 border-slate-800 opacity-40 cursor-not-allowed"
                            : "bg-[#0d2547] hover:bg-[#12335f] text-[#79c6ff] border-[#79c6ff]/40 shadow-sm hover:border-[#79c6ff]"
                        }`}
                      >
                        {item.text}
                      </button>
                    ))}
                  </div>

                  {/* VERIFY BUTTON */}
                  {placedChunks.length > 0 && (
                    <div className="pt-2">
                      <button
                        onClick={handleVerifyChunkSentence}
                        className="w-full py-2.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                      >
                        <Check className="w-4 h-4" />
                        <span>COMPROBAR ORACIÓN CONSTRUIDA</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

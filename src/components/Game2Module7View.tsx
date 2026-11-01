import React, { useState, useMemo, useEffect, useRef } from "react";
import { Module7Play, Module7Question } from "../data/game2Module7Types";
import { GAME2_MODULE7_PLAYS } from "../data/game2Module7Data";
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
  CornerDownLeft
} from "lucide-react";

interface Props {
  onBack: () => void;
}

const STORAGE_KEY = "GAME2_MOD7_PROGRESS";

// Clean and normalize strings for robust comparison
function normalizeEnglish(str: string): string {
  return str
    .toLowerCase()
    .replace(/[.,:;?!'"-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const Game2Module7View: React.FC<Props> = ({ onBack }) => {
  // Navigation: "LIST" (10 Plays selection) or "GAME" (playing a specific Play)
  const [selectedPlayId, setSelectedPlayId] = useState<number | null>(null);

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
  const activePlay = useMemo<Module7Play | undefined>(() => {
    if (!selectedPlayId) return undefined;
    return GAME2_MODULE7_PLAYS.find((p) => p.playId === selectedPlayId);
  }, [selectedPlayId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputEnglish, setInputEnglish] = useState("");
  const [placedChunks, setPlacedChunks] = useState<string[]>([]);
  const [availableScrambledChunks, setAvailableScrambledChunks] = useState<
    { id: string; text: string; used: boolean }[]
  >([]);

  const [feedback, setFeedback] = useState<"IDLE" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showMechanicNote, setShowMechanicNote] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [errorsThisQuestion, setErrorsThisQuestion] = useState(0);
  const [totalErrorsInPlay, setTotalErrorsInPlay] = useState(0);
  const [isPlayCompleted, setIsPlayCompleted] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentQ: Module7Question | undefined = activePlay?.questions[currentIndex];

  // Initialize question state whenever currentQ changes
  useEffect(() => {
    if (!currentQ) return;
    setInputEnglish("");
    setPlacedChunks([]);
    setFeedback("IDLE");
    setErrorMessage(null);
    setShowMechanicNote(false);
    setShowHint(false);
    setErrorsThisQuestion(0);

    // Prepare scrambled structural group chunks (ensuring "The pilot reports:" is removed so only the sentence remains)
    const chunks = currentQ.scrambledChunks
      .filter((chunkText) => !/^the pilot reports:?$/i.test(chunkText.trim()))
      .map((chunkText, idx) => ({
        id: `${currentQ.id}-${idx}-${chunkText}`,
        text: chunkText,
        used: false,
      }));
    setAvailableScrambledChunks(chunks);

    // Auto focus textarea
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  }, [currentQ]);

  // Audio pronunciation function using centralized audioEngine
  const speakSentence = (text: string) => {
    if (!text) return;
    playAudio(text, undefined, undefined, false, 0.9);
  };

  // Handle clicking on a scrambled structural chunk
  const handleSelectChunk = (item: { id: string; text: string; used: boolean }) => {
    if (item.used || feedback === "SUCCESS") return;

    // Mark as used
    setAvailableScrambledChunks((prev) =>
      prev.map((t) => (t.id === item.id ? { ...t, used: true } : t))
    );

    // Append chunk to placed chunks
    const newPlaced = [...placedChunks, item.text];
    setPlacedChunks(newPlaced);

    // Update text field
    const newText = newPlaced.join(" ");
    setInputEnglish(newText);

    inputRef.current?.focus();
  };

  // Handle removing a placed chunk by clicking it
  const handleRemovePlacedChunk = (indexToRemove: number) => {
    if (feedback === "SUCCESS") return;

    const chunkToRemove = placedChunks[indexToRemove];
    const newPlaced = placedChunks.filter((_, idx) => idx !== indexToRemove);
    setPlacedChunks(newPlaced);

    // Mark one matching used chunk as unused
    setAvailableScrambledChunks((prev) => {
      let restored = false;
      return prev.map((t) => {
        if (!restored && t.used && t.text === chunkToRemove) {
          restored = true;
          return { ...t, used: false };
        }
        return t;
      });
    });

    const newText = newPlaced.join(" ");
    setInputEnglish(newText);

    inputRef.current?.focus();
  };

  // Handle manual typing in textarea
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputEnglish(val);
    if (feedback === "ERROR") {
      setFeedback("IDLE");
      setErrorMessage(null);
    }
  };

  // Clear all entered words
  const handleClear = () => {
    if (feedback === "SUCCESS") return;
    setInputEnglish("");
    setPlacedChunks([]);
    setAvailableScrambledChunks((prev) => prev.map((t) => ({ ...t, used: false })));
    setFeedback("IDLE");
    setErrorMessage(null);
    inputRef.current?.focus();
  };

  // Verification logic
  const handleVerify = () => {
    if (!currentQ || feedback === "SUCCESS") return;

    const trimmedInput = inputEnglish.trim();
    if (!trimmedInput) {
      setFeedback("ERROR");
      setErrorMessage("Escribe o selecciona las palabras en inglés para verificar el reporte.");
      try {
        combatAudio.playWarning();
      } catch {
        // ignore
      }
      return;
    }

    const normalizedInput = normalizeEnglish(trimmedInput);
    const failureTarget = normalizeEnglish(
      currentQ.failureOnlyEnglish || currentQ.englishSentence.replace(/^the pilot reports:\s*/i, "")
    );
    const fullTarget = normalizeEnglish(currentQ.englishSentence);

    // Check direct equality or acceptable answers
    const isDirectMatch = normalizedInput === failureTarget || normalizedInput === fullTarget;
    const isAcceptableMatch = currentQ.acceptableAnswers.some(
      (alt) => normalizeEnglish(alt) === normalizedInput
    );

    // Also check if user typed discrepancy without "the pilot reports"
    const colonPos = currentQ.englishSentence.indexOf(":");
    let isDiscrepancyOnlyMatch = false;
    if (colonPos !== -1) {
      const targetDiscrepancy = normalizeEnglish(currentQ.englishSentence.slice(colonPos + 1));
      if (normalizedInput === targetDiscrepancy) {
        isDiscrepancyOnlyMatch = true;
      }
    }

    if (isDirectMatch || isAcceptableMatch || isDiscrepancyOnlyMatch) {
      // CORRECT!
      setFeedback("SUCCESS");
      setErrorMessage(null);
      setShowMechanicNote(true);

      try {
        combatAudio.playVictoryChime();
      } catch {
        // ignore
      }

      speakSentence(
        currentQ.failureOnlyEnglish ||
          currentQ.englishSentence.replace(/^the pilot reports:\s*/i, "")
      );
    } else {
      // WRONG! The sentence stays active as mandated by the user
      setFeedback("ERROR");
      setErrorsThisQuestion((prev) => prev + 1);
      setTotalErrorsInPlay((prev) => prev + 1);
      setErrorMessage(
        "¡Atención técnico! La redacción aún no coincide con el estándar aeronáutico. Revisa el orden de las palabras o corrige la ortografía."
      );

      try {
        combatAudio.playWarning();
      } catch {
        // ignore
      }

      // Keep focus
      inputRef.current?.focus();
    }
  };

  // Next question handler
  const handleNext = () => {
    if (!activePlay) return;

    if (currentIndex < activePlay.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Complete Play!
      setIsPlayCompleted(true);
      try {
        combatAudio.playVictoryChime();
      } catch {
        // ignore
      }

      // Save to localStorage
      const newCompleted = {
        ...completedPlays,
        [activePlay.playId]: {
          errors: totalErrorsInPlay,
          date: new Date().toISOString(),
          bestScore: Math.max(0, 20 - totalErrorsInPlay),
        },
      };
      setCompletedPlays(newCompleted);
      try {
        safeStorage.setItem(STORAGE_KEY, JSON.stringify(newCompleted));
      } catch {
        // ignore
      }
    }
  };

  // Start a specific Play
  const handleStartPlay = (playId: number) => {
    setSelectedPlayId(playId);
    setCurrentIndex(0);
    setTotalErrorsInPlay(0);
    setIsPlayCompleted(false);
  };

  // Restart current Play
  const handleRestartPlay = () => {
    setCurrentIndex(0);
    setTotalErrorsInPlay(0);
    setIsPlayCompleted(false);
    setInputEnglish("");
    setPlacedChunks([]);
    setFeedback("IDLE");
  };

  // =========================================================================
  // VIEW: LIST OF 10 PLAYS
  // =========================================================================
  if (!selectedPlayId || !activePlay) {
    const totalQuestions = 200;
    const completedCount = Object.keys(completedPlays).length;

    return (
      <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 text-slate-100 flex flex-col min-h-screen">
        {/* HEADER BAR */}
        <div className="flex items-center justify-between gap-3 mb-6 bg-gradient-to-r from-[#0d1f38] to-[#071324] border border-[#79c6ff]/40 rounded-2xl p-4 shadow-lg">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0c1e38] text-[#79c6ff] border border-[#79c6ff]/30 hover:bg-[#132847] hover:text-white transition-all text-xs sm:text-sm font-bold active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>VOLVER A GAME 2</span>
          </button>

          <div className="text-right">
            <div className="text-[10px] font-mono tracking-widest text-[#79c6ff] uppercase">
              REPORTE DE HANGAR • PILOT DISCREPANCY LOG
            </div>
            <div className="text-xs sm:text-sm font-black text-amber-400">
              {completedCount} DE 10 PLAYS COMPLETADOS ({completedCount * 20}/{totalQuestions} REPS)
            </div>
          </div>
        </div>

        {/* HERO BANNER */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#0b1b36] via-[#071426] to-[#040c17] border-2 border-amber-500/50 rounded-2xl p-5 sm:p-7 mb-6 shadow-2xl">
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 font-mono text-[11px] font-bold tracking-wider uppercase mb-3">
              <ClipboardList className="w-4 h-4 text-amber-400" />
              <span>MÓDULO 7 • REPORTE DE HANGAR (DISCREPANCIAS DE PILOTO)</span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-white tracking-wide mb-2">
              SQUAWK SHEET: 200 REPORTES DE VUELO
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed mb-4">
              Aprende a interpretar y redactar en inglés técnico aeronáutico los reportes reales de discrepancia de los pilotos en el hangar.
              Lee la falla técnica directa reportada por el piloto, analiza la estructura por bloques (Sujeto, Núcleo y Condición) y redacta la oración en orden en el cuadro de texto.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-2xl text-[11px] font-mono">
              <div className="bg-[#0b172a]/90 border border-amber-500/30 rounded-xl p-2.5 text-center">
                <span className="block text-amber-400 font-black text-base sm:text-lg">200</span>
                <span className="text-slate-400 uppercase text-[9px]">Reportes Totales</span>
              </div>
              <div className="bg-[#0b172a]/90 border border-[#79c6ff]/30 rounded-xl p-2.5 text-center">
                <span className="block text-[#79c6ff] font-black text-base sm:text-lg">10</span>
                <span className="text-slate-400 uppercase text-[9px]">Plays de 20 Reps</span>
              </div>
              <div className="bg-[#0b172a]/90 border border-emerald-500/30 rounded-xl p-2.5 text-center">
                <span className="block text-emerald-400 font-black text-base sm:text-lg">AMM / ATA</span>
                <span className="text-slate-400 uppercase text-[9px]">Capítulos Clave</span>
              </div>
              <div className="bg-[#0b172a]/90 border border-cyan-500/30 rounded-xl p-2.5 text-center">
                <span className="block text-cyan-400 font-black text-base sm:text-lg">AUDIO</span>
                <span className="text-slate-400 uppercase text-[9px]">Pronunciación US</span>
              </div>
            </div>
          </div>
        </div>

        {/* 10 PLAYS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-8">
          {GAME2_MODULE7_PLAYS.map((play) => {
            const isDone = Boolean(completedPlays[play.playId]);
            const stats = completedPlays[play.playId];

            return (
              <div
                key={play.playId}
                className={`relative group bg-gradient-to-r from-[#0a182e] to-[#061220] border-2 ${
                  isDone
                    ? "border-emerald-500/60 hover:border-emerald-400"
                    : "border-amber-500/40 hover:border-amber-400"
                } rounded-2xl p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between shadow-md hover:shadow-xl`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] font-bold uppercase">
                      <Wrench className="w-3 h-3" />
                      <span>{play.ataChapter}</span>
                    </span>

                    {isDone ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] border border-emerald-500/40">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>COMPLETADO ({stats?.bestScore ?? 20}/20)</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400">
                        20 REPORTES
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wide mb-1 group-hover:text-amber-300 transition-colors">
                    {play.title}
                  </h3>

                  <p className="text-xs text-slate-300 mb-2 leading-snug">
                    {play.subtitle}
                  </p>

                  <div className="inline-block text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40 mb-3">
                    Aeronaves: {play.aircraftModel}
                  </div>
                </div>

                <button
                  onClick={() => handleStartPlay(play.playId)}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 ${
                    isDone
                      ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/80"
                      : "bg-gradient-to-r from-amber-600/30 to-amber-700/40 text-amber-300 border border-amber-500/50 hover:bg-amber-600/50 hover:text-white"
                  }`}
                >
                  <span>{isDone ? "REPASAR PLAY" : "INICIAR PLAY ➔"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* INSTRUCTIONS BOX */}
        <div className="bg-[#091526]/80 border border-amber-500/30 rounded-2xl p-4 sm:p-5 text-xs text-slate-300 leading-relaxed">
          <div className="font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>REGLAS PEDAGÓGICAS DEL MÓDULO 7 (REPORTE DE HANGAR)</span>
          </div>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
            <li>
              <strong className="text-white">El Piloto Reporta:</strong> Muestra directamente la falla técnica reportada por el piloto de la aeronave.
            </li>
            <li>
              <strong className="text-white">Estructura por Bloques (como Módulos 4, 5 y 6):</strong> Guía de apoyo que desglosa la oración en Sujeto/Reporte, Núcleo del Componente y Condición/Síntoma con su traducción respectiva.
            </li>
            <li>
              <strong className="text-white">Palabras Disponibles en Grupo Desordenadas:</strong> Bloques sintácticos en inglés desordenados para aprender la estructura correcta de la oración.
            </li>
            <li>
              <strong className="text-white">Cuadro de Texto:</strong> Escribe la oración completa en orden técnico en inglés, o haz clic en los bloques para ensamblarla paso a paso.
            </li>
            <li>
              <strong className="text-white">Retención Obligatoria:</strong> Si la redacción tiene errores, la oración se mantendrá activa hasta que la formules con exactitud técnica antes de pasar a la siguiente.
            </li>
          </ul>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: PLAY COMPLETED SUMMARY SCREEN
  // =========================================================================
  if (isPlayCompleted) {
    const nextPlayId = activePlay.playId < 10 ? activePlay.playId + 1 : 1;

    return (
      <Game2FinalCompletionScreen
        moduleTitle="MÓDULO 7"
        playId={activePlay.playId}
        totalErrors={totalErrorsInPlay}
        totalQuestionsCount={20}
        nextPlayId={nextPlayId}
        onAgain={handleRestartPlay}
        onBack={() => setSelectedPlayId(null)}
        onNext={() => handleStartPlay(nextPlayId)}
      />
    );
  }

  // =========================================================================
  // VIEW: ACTIVE PLAY QUESTION SCREEN
  // =========================================================================
  if (!currentQ) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 text-slate-100 flex flex-col min-h-screen">
      {/* TOP BAR */}
      <div className="flex items-center justify-between gap-3 mb-4 bg-gradient-to-r from-[#0d1f38] to-[#071324] border border-amber-500/40 rounded-2xl p-3.5 shadow-lg">
        <button
          onClick={() => setSelectedPlayId(null)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0c1e38] text-amber-400 border border-amber-500/30 hover:bg-[#132847] hover:text-white transition-all text-xs font-bold active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>LISTA DE PLAYS</span>
        </button>

        <div className="text-center">
          <div className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">
            PLAY {activePlay.playId}: {activePlay.ataChapter}
          </div>
          <div className="text-xs font-black text-white">
            REPORTE {currentIndex + 1} DE {activePlay.questions.length}
          </div>
        </div>

        <button
          onClick={() => speakSentence(currentQ.englishSentence)}
          title="Escuchar pronunciación del reporte técnico"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0c1e38] text-[#79c6ff] border border-[#79c6ff]/30 hover:bg-[#132847] hover:text-white transition-all text-xs font-bold active:scale-95"
        >
          <Volume2 className="w-4 h-4" />
          <span className="hidden sm:inline">AUDIO</span>
        </button>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full bg-[#0a1628] rounded-full h-2 mb-5 border border-[#79c6ff]/20 overflow-hidden">
        <div
          className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-300 rounded-full"
          style={{
            width: `${((currentIndex + (feedback === "SUCCESS" ? 1 : 0)) / activePlay.questions.length) * 100}%`,
          }}
        />
      </div>

      {/* CARD 1: DISCREPANCIA DIRECTA (EL PILOTO REPORTA) */}
      <div className="relative bg-gradient-to-b from-[#0e213b] to-[#071324] border-2 border-amber-500/60 rounded-2xl p-4 sm:p-5 shadow-xl mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 font-mono text-[10.5px] font-bold uppercase">
            <ClipboardList className="w-3.5 h-3.5 text-amber-400" />
            <span>REPORTE DE HANGAR (DISCREPANCIA DE VUELO)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-700/40">
              {currentQ.systemCategory}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {currentQ.aircraftModel}
            </span>
          </div>
        </div>

        {/* EL PILOTO REPORTA; Y ABAJO LA ORACIÓN DE LA FALLA DIRECTO */}
        <div className="bg-[#071322]/95 border border-amber-500/40 rounded-xl p-4 sm:p-5 text-amber-100 shadow-inner">
          <div className="text-amber-400 font-black text-xs sm:text-sm font-mono uppercase tracking-wider mb-1.5 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span>EL PILOTO REPORTA:</span>
          </div>
          <div className="text-white font-bold text-base sm:text-xl leading-relaxed pl-4 border-l-2 border-amber-500/60">
            {currentQ.failureOnlySpanish ||
              currentQ.spanishPrompt.replace(/^el piloto reporta:\s*/i, "")}
          </div>
        </div>
      </div>

      {/* CARD: PALABRAS DISPONIBLES EN GRUPO EN ESTRUCTURA (DESORDENADOS) */}
      <div className="bg-gradient-to-b from-[#0a182e] to-[#061220] border-2 border-[#79c6ff]/40 rounded-2xl p-4 sm:p-5 shadow-lg mb-4">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#79c6ff] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#79c6ff]" />
            <span>PALABRAS DISPONIBLES EN GRUPO EN ESTRUCTURA (DESORDENADOS):</span>
          </span>

          <span className="text-[10px] font-mono text-slate-400">
            {availableScrambledChunks.filter((t) => !t.used).length} BLOQUES RESTANTES
          </span>
        </div>

        {/* STRUCTURAL CHIPS */}
        <div className="flex flex-wrap gap-2.5 min-h-[56px] p-3 rounded-xl bg-[#040c17]/80 border border-[#79c6ff]/20 items-center">
          {availableScrambledChunks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectChunk(item)}
              disabled={item.used || feedback === "SUCCESS"}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer select-none active:scale-95 flex items-center gap-2 ${
                item.used
                  ? "opacity-25 bg-slate-800 text-slate-500 cursor-not-allowed line-through border border-transparent"
                  : "bg-gradient-to-b from-[#112a4f] to-[#0c1f3b] text-white border border-[#79c6ff]/60 hover:border-[#79c6ff] hover:bg-[#163665] shadow-md hover:shadow-cyan-500/20"
              }`}
            >
              <span>{item.text}</span>
            </button>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 mt-2 italic">
          💡 Haz clic en los bloques para colocarlos en orden o escribe directamente en el cuadro de texto de abajo.
        </p>
      </div>

      {/* CARD: CUADRO DE TEXTO PARA ESCRIBIR EN ORDEN LA ORACIÓN */}
      <div
        className={`bg-gradient-to-b from-[#0d1e38] to-[#081526] border-2 rounded-2xl p-4 sm:p-5 shadow-xl mb-4 transition-all ${
          feedback === "SUCCESS"
            ? "border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.25)]"
            : feedback === "ERROR"
            ? "border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.25)]"
            : "border-[#79c6ff]/50"
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <label
            htmlFor="english-input"
            className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5 text-[#79c6ff]" />
            <span>CUADRO DE TEXTO: ESCRIBE EN ORDEN LA ORACIÓN EN INGLÉS:</span>
          </label>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              disabled={feedback === "SUCCESS" || (!inputEnglish && placedChunks.length === 0)}
              className="text-[11px] font-mono text-slate-400 hover:text-amber-400 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Delete className="w-3.5 h-3.5" />
              <span>Limpiar</span>
            </button>
          </div>
        </div>

        {/* TEXTAREA INPUT */}
        <div className="relative mb-3">
          <textarea
            id="english-input"
            ref={inputRef}
            rows={3}
            value={inputEnglish}
            onChange={handleTextChange}
            disabled={feedback === "SUCCESS"}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (feedback === "SUCCESS") {
                  handleNext();
                } else {
                  handleVerify();
                }
              }
            }}
            placeholder="Escribe en orden la oración en inglés aquí o haz clic en los bloques..."
            className={`w-full p-3.5 rounded-xl bg-[#040c17] text-white font-mono text-sm leading-relaxed outline-none border transition-all resize-none ${
              feedback === "SUCCESS"
                ? "border-emerald-500 bg-emerald-950/20 text-emerald-200"
                : feedback === "ERROR"
                ? "border-red-500 bg-red-950/20 text-red-200"
                : "border-[#79c6ff]/40 focus:border-[#79c6ff] focus:ring-1 focus:ring-[#79c6ff]/40"
            }`}
          />

          {feedback === "SUCCESS" && (
            <div className="absolute right-3 top-3 text-emerald-400 flex items-center gap-1 text-xs font-mono font-bold bg-emerald-950/80 px-2 py-1 rounded border border-emerald-500/40">
              <CheckCircle2 className="w-4 h-4" />
              <span>REPORTE VÁLIDO</span>
            </div>
          )}
        </div>

        {/* INTERACTIVE CHIP TRAY (CHUNKS CLICKED SO FAR) */}
        {placedChunks.length > 0 && feedback !== "SUCCESS" && (
          <div className="mb-3 p-2.5 rounded-xl bg-[#050f1d] border border-[#79c6ff]/20">
            <span className="text-[10px] font-mono text-slate-400 block mb-1.5 uppercase">
              Secuencia de bloques seleccionados (haz clic en uno para retirarlo):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {placedChunks.map((chunk, idx) => (
                <span
                  key={`${chunk}-${idx}`}
                  onClick={() => handleRemovePlacedChunk(idx)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0e2547] text-cyan-300 border border-cyan-500/40 text-xs font-mono font-semibold cursor-pointer hover:bg-red-950 hover:text-red-300 hover:border-red-500/40 transition-colors"
                >
                  <span>{chunk}</span>
                  <span className="text-[11px] text-cyan-400 hover:text-red-400 font-bold">×</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* FEEDBACK BANNER */}
        {feedback === "ERROR" && (
          <div className="mb-3 p-3 rounded-xl bg-red-950/60 border border-red-500/60 text-red-200 text-xs flex items-start gap-2.5 animate-shake">
            <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-bold text-red-300 uppercase tracking-wide mb-0.5">
                DISCREPANCIA NO VALIDADA:
              </div>
              <div>{errorMessage}</div>
              <div className="text-[11px] text-slate-400 mt-1">
                La oración permanece activa. Revisa la ortografía técnica, mayúsculas o haz clic en "Ver Pista".
              </div>
            </div>
            <button
              onClick={() => setShowHint(true)}
              className="px-2 py-1 rounded bg-red-900/60 text-amber-300 text-[10px] font-mono font-bold hover:bg-red-800 transition-colors shrink-0"
            >
              VER PISTA
            </button>
          </div>
        )}

        {/* HINT DISPLAY */}
        {showHint && (
          <div className="mb-3 p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wider block mb-0.5">Pista de Redacción:</span>
              <span className="font-mono text-white">
                "{currentQ.failureOnlyEnglish || currentQ.englishSentence.replace(/^the pilot reports:\s*/i, "")}"
              </span>
            </div>
          </div>
        )}

        {/* SUCCESS MECHANIC NOTE */}
        {showMechanicNote && (
          <div className="mb-3 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-200 text-xs flex items-start gap-2.5">
            <Wrench className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-emerald-300 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <span>ACCIÓN DE MANTENIMIENTO RECOMENDADA EN HANGAR:</span>
              </div>
              <p className="text-slate-200 leading-relaxed">{currentQ.mechanicNote}</p>
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="text-[11px] font-mono text-slate-400">
            {errorsThisQuestion > 0 && (
              <span className="text-amber-400">
                Reintentos en este reporte: {errorsThisQuestion}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {feedback !== "SUCCESS" ? (
              <button
                onClick={handleVerify}
                className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg hover:from-amber-500 hover:to-amber-600 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>VERIFICAR REPORTE</span>
                <CornerDownLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg hover:from-emerald-500 hover:to-teal-500 active:scale-95 transition-all flex items-center gap-2 cursor-pointer animate-pulse"
              >
                <span>
                  {currentIndex < activePlay.questions.length - 1
                    ? "SIGUIENTE REPORTE ➔"
                    : "FINALIZAR PLAY ➔"}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER NOTICE */}
      <div className="mt-auto pt-3 text-center text-[10px] font-mono text-slate-500 uppercase tracking-wider">
        MÓDULO 7 • MANUALES DE MANTENIMIENTO CESSNA 150 / 172 / 182 / 210 / 208 • ESTÁNDAR ATA 100
      </div>
    </div>
  );
};

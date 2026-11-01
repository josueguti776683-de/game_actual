import React, { useState, useMemo, useEffect } from "react";
import { 
  MODULE_3_PLAYS, 
  Module3Play, 
  Module3Question 
} from "../data/game2Module3Data";
import { playAudio, audioEngine } from "../utils/audioEngine";
import { combatAudio } from "../utils/combatAudio";
import { 
  ArrowLeft, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  ChevronRight, 
  Plane,
  Sparkles,
  BookCheck,
  AlertTriangle,
  Flame,
  ClipboardList,
  Check,
  HelpCircle,
  Wrench
} from "lucide-react";
import { Game2FinalCompletionScreen } from "./Game2FinalCompletionScreen";

export const Game2Module3View: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  // Navigation inside Module 3: "LIST" (15 Plays) or "GAME" (playing a specific Play)
  const [selectedPlayId, setSelectedPlayId] = useState<number | null>(null);

  // Local storage stats: save completed plays and scores
  const [completedPlays, setCompletedPlays] = useState<Record<number, { errors: number; date: string }>>(() => {
    try {
      const saved = localStorage.getItem("GAME2_MOD3_PROGRESS");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // -------------------------------------------------------------
  // CURRENT PLAY STATE
  // -------------------------------------------------------------
  const activePlay = useMemo<Module3Play | null>(() => {
    if (selectedPlayId === null) return null;
    return MODULE_3_PLAYS.find((p) => p.playId === selectedPlayId) || null;
  }, [selectedPlayId]);

  const [playQuestions, setPlayQuestions] = useState<Module3Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // Interactive blanks state:
  // slotWords[i] holds the word placed in blank slot i (or null if empty)
  const [slotWords, setSlotWords] = useState<(string | null)[]>([]);
  // Available bank words remaining to place
  const [availableBank, setAvailableBank] = useState<string[]>([]);
  
  // Feedback state:
  const [verificationStatus, setVerificationStatus] = useState<'IDLE' | 'CORRECT' | 'WRONG'>('IDLE');
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [totalErrors, setTotalErrors] = useState<number>(0);
  const [questionAttempts, setQuestionAttempts] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const startPlay = (playId: number, randomize = false) => {
    const targetPlay = MODULE_3_PLAYS.find((p) => p.playId === playId);
    if (targetPlay) {
      const qs = randomize
        ? [...targetPlay.questions].sort(() => 0.5 - Math.random())
        : [...targetPlay.questions];
      setPlayQuestions(qs);
    }
    setSelectedPlayId(playId);
    setCurrentIndex(0);
    setTotalErrors(0);
    setIsCompleted(false);
    setVerificationStatus('IDLE');
    setFeedbackMessage("");
    setQuestionAttempts(0);
  };

  const currentQuestion: Module3Question | null = useMemo(() => {
    if (playQuestions.length > 0) {
      return playQuestions[currentIndex] || null;
    }
    if (activePlay && activePlay.questions[currentIndex]) {
      return activePlay.questions[currentIndex];
    }
    return null;
  }, [playQuestions, activePlay, currentIndex]);

  // When currentQuestion changes, initialize slots and scrambled word bank
  useEffect(() => {
    if (!currentQuestion) return;
    
    const numSlots = currentQuestion.missingWords.length;
    setSlotWords(new Array(numSlots).fill(null));
    
    // Scramble the wordBank for freshness
    const scrambled = [...currentQuestion.wordBank].sort(() => 0.5 - Math.random());
    setAvailableBank(scrambled);
    setVerificationStatus('IDLE');
    setFeedbackMessage("");
  }, [currentQuestion, currentIndex]);

  // Handler: click word from available bank to place into first empty slot
  const handleSelectWordFromBank = (word: string, bankIdx: number) => {
    if (verificationStatus === 'CORRECT') return; // already solved
    
    // Find first empty slot
    const emptySlotIdx = slotWords.findIndex((w) => w === null);
    if (emptySlotIdx === -1) return; // All slots filled

    try {
      combatAudio.playLockTone();
    } catch {
      // Safe ignore
    }

    const newSlots = [...slotWords];
    newSlots[emptySlotIdx] = word;
    setSlotWords(newSlots);

    // Remove this instance from available bank
    const newBank = [...availableBank];
    newBank.splice(bankIdx, 1);
    setAvailableBank(newBank);
    
    // Reset any previous error feedback when typing/rearranging
    if (verificationStatus === 'WRONG') {
      setVerificationStatus('IDLE');
      setFeedbackMessage("");
    }
  };

  // Handler: click filled slot to remove word back to bank
  const handleRemoveWordFromSlot = (slotIdx: number) => {
    if (verificationStatus === 'CORRECT') return; // already solved
    const word = slotWords[slotIdx];
    if (!word) return;

    try {
      combatAudio.playLockTone();
    } catch {
      // Safe ignore
    }

    const newSlots = [...slotWords];
    newSlots[slotIdx] = null;
    setSlotWords(newSlots);

    // Return to available bank
    setAvailableBank((prev) => [...prev, word]);

    if (verificationStatus === 'WRONG') {
      setVerificationStatus('IDLE');
      setFeedbackMessage("");
    }
  };

  // VERIFY HANDLER
  const handleVerify = () => {
    if (!currentQuestion) return;

    // Check if all slots are filled
    const hasEmptySlot = slotWords.some((w) => w === null);
    if (hasEmptySlot) {
      setFeedbackMessage("⚠️ Selecciona las palabras de abajo para llenar todos los espacios.");
      try {
        combatAudio.playWarning();
      } catch {
        // Safe ignore
      }
      return;
    }

    // Compare placed words with missingWords
    let isAllCorrect = true;
    for (let i = 0; i < currentQuestion.missingWords.length; i++) {
      const placed = (slotWords[i] || "").trim().toLowerCase();
      const expected = currentQuestion.missingWords[i].trim().toLowerCase();
      if (placed !== expected) {
        isAllCorrect = false;
        break;
      }
    }

    if (isAllCorrect) {
      // SUCCESS!
      setVerificationStatus('CORRECT');
      try {
        combatAudio.playLockTone();
      } catch {
        // Safe ignore
      }
      setFeedbackMessage("¡EXCELENTE! Oración técnica completada correctamente.");
      
      // Pronounce the full sentence in English
      playAudio(currentQuestion.fullEnglish);
    } else {
      // WRONG!
      setVerificationStatus('WRONG');
      setTotalErrors((prev) => prev + 1);
      setQuestionAttempts((prev) => prev + 1);
      try {
        combatAudio.playWarning();
      } catch {
        // Safe ignore
      }
      setFeedbackMessage("❌ Orden incorrecto de las partes. Haz clic en las palabras para reorganizarlas y vuelve a verificar.");
    }
  };

  // Handler: Advance to next sentence
  const handleNextSentence = () => {
    if (!activePlay) return;
    const questionsCount = playQuestions.length || activePlay.questions.length;
    const nextIdx = currentIndex + 1;

    if (nextIdx >= questionsCount) {
      // Completed the play!
      setIsCompleted(true);
      const updated = {
        ...completedPlays,
        [activePlay.playId]: {
          errors: totalErrors,
          date: new Date().toLocaleDateString(),
        },
      };
      setCompletedPlays(updated);
      try {
        localStorage.setItem("GAME2_MOD3_PROGRESS", JSON.stringify(updated));
      } catch (err) {
        console.error("Error saving progress", err);
      }
      
      if (totalErrors === 0) {
        try {
          combatAudio.playVictoryChime();
        } catch {
          // Safe ignore
        }
      } else {
        try {
          combatAudio.playExplosion();
        } catch {
          // Safe ignore
        }
      }
    } else {
      setCurrentIndex(nextIdx);
    }
  };

  // Reset current question to try again immediately
  const handleResetCurrentQuestion = () => {
    if (!currentQuestion) return;
    const numSlots = currentQuestion.missingWords.length;
    setSlotWords(new Array(numSlots).fill(null));
    const scrambled = [...currentQuestion.wordBank].sort(() => 0.5 - Math.random());
    setAvailableBank(scrambled);
    setVerificationStatus('IDLE');
    setFeedbackMessage("");
  };

  // =========================================================================
  // VIEW: LIST OF 15 PLAYS (UNIFIED SCREEN SCROLL)
  // =========================================================================
  if (selectedPlayId === null) {
    const totalPlaysCompleted = Object.keys(completedPlays).length;

    return (
      <div className="flex flex-col w-full max-w-[540px] md:max-w-[580px] mx-auto min-w-0 animate-in fade-in duration-200 pb-6">
        
        {/* HEADER BAR */}
        <div className="flex items-center justify-between gap-2 mb-3 bg-[#0c1a2f]/90 p-3 rounded-2xl border border-[#79c6ff]/30 shadow-md">
          <button
            onClick={() => {
              audioEngine.flushAndStop();
              onBack();
            }}
            className="p-2 rounded-xl bg-[#132847] hover:bg-[#1a3863] text-[#79c6ff] border border-[#79c6ff]/40 transition-colors flex items-center gap-1.5 cursor-pointer text-xs font-bold uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>MENÚ GAME 2</span>
          </button>

          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">
              PROGRESO MÓDULO 3
            </span>
            <span className="text-xs font-black text-amber-300 font-mono">
              {totalPlaysCompleted}/15 PLAYS COMPLETADOS
            </span>
          </div>
        </div>

        {/* TITLE & DESCRIPTION CARD */}
        <div className="bg-gradient-to-r from-[#0a1b33] to-[#0d223f] border-2 border-[#79c6ff]/60 rounded-2xl p-3 sm:p-4 mb-3 shadow-[0_0_20px_rgba(79,167,255,0.2)] text-center">
          <div className="flex items-center justify-center gap-2 mb-1 text-[#79c6ff]">
            <Wrench className="w-5 h-5" />
            <h1 className="text-sm sm:text-base font-black uppercase tracking-wider text-white">
              MÓDULO 3: 300 ORACIONES • PARTES DE AERONAVES
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed max-w-xl mx-auto font-medium">
            Completa y ordena las oraciones técnicas de mantenimiento aeronáutico. Selecciona las partes correspondientes (cabina, fuselaje, turbina, mamparos, remaches, bujías, rotores y sistemas) y pulsa <strong>VERIFY</strong> para comprobar el reglaje.
          </p>
        </div>

        {/* LIST OF 15 PLAYS */}
        <div className="w-full flex flex-col gap-2.5 pb-3">
          {MODULE_3_PLAYS.map((play) => {
            const isDone = Boolean(completedPlays[play.playId]);
            const playErrors = completedPlays[play.playId]?.errors;

            return (
              <div
                key={play.playId}
                onClick={() => startPlay(play.playId)}
                className={`p-3 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 shadow-md hover:scale-[1.01] active:scale-[0.99] ${
                  isDone
                    ? playErrors === 0
                      ? "bg-gradient-to-r from-[#0a271c] to-[#081e18] border-emerald-400/80 shadow-[0_0_15px_rgba(52,211,153,0.2)]"
                      : "bg-gradient-to-r from-[#2a141a] to-[#1e0e14] border-red-400/80 shadow-[0_0_15px_rgba(248,113,113,0.2)]"
                    : "bg-gradient-to-r from-[#0c1e38] to-[#081527] border-[#79c6ff]/40 hover:border-[#79c6ff] hover:bg-[#102747]"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-mono font-black text-sm border ${
                      isDone
                        ? playErrors === 0
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-400"
                          : "bg-red-500/20 text-red-300 border-red-400"
                        : "bg-[#132847] text-[#79c6ff] border-[#79c6ff]/40"
                    }`}
                  >
                    {play.playId}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-white uppercase tracking-wider font-mono">
                        PLAY {play.playId}
                      </span>
                      <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-slate-400 border border-slate-700">
                        {play.ataChapter}
                      </span>
                    </div>
                    <p className="text-[11.5px] sm:text-xs text-slate-300 font-semibold truncate m-0">
                      {play.subtitle}
                    </p>
                    <span className="text-[10px] text-[#79c6ff]/80 font-mono block">
                      20 oraciones técnicas con partes de aeronaves
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {isDone ? (
                    <div className="text-right">
                      {playErrors === 0 ? (
                        <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase bg-emerald-950/80 px-2 py-0.5 rounded-lg border border-emerald-500/40">
                          ✓ 0 ERRORES
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-red-400 font-bold block uppercase bg-red-950/80 px-2 py-0.5 rounded-lg border border-red-500/40">
                          {playErrors} {playErrors === 1 ? "ERROR" : "ERRORES"}
                        </span>
                      )}
                      <span className="text-[9px] font-mono text-slate-400 block mt-0.5">
                        {completedPlays[play.playId].date}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[#79c6ff] font-bold text-xs bg-[#132847] px-2.5 py-1.5 rounded-xl border border-[#79c6ff]/30">
                      <span>JUGAR</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER MESSAGE */}
        <div className="bg-[rgba(16,33,58,0.9)] rounded-[18px] px-3.5 py-2.5 border border-[--line] text-center w-full max-w-full min-w-0 break-words mt-1">
          <span className="text-[8.5px] font-mono tracking-wider text-[--muted] block mb-0.5 uppercase">
            MÓDULO 3 • VOCABULARIO TÉCNICO ESTRUCTURAL
          </span>
          <span className="text-[9.5px] sm:text-[10px] text-[#79c6ff] uppercase font-bold block leading-snug">
            300 ORACIONES TÉCNICAS • 15 PLAYS DE 20 ORACIONES C/U
          </span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: PLAYING THE ACTIVE PLAY (OR FINAL ACCIDENT / VICTORY SCREEN)
  // =========================================================================
  if (activePlay) {
    const totalQuestionsCount = playQuestions.length || activePlay.questions.length;
    const currentNum = currentIndex + 1;
    const progressPercent = Math.round((currentNum / totalQuestionsCount) * 100);

    // -----------------------------------------------------------------------
    // FINAL SUMMARY SCREENS (WHEN PLAY IS FINISHED)
    // -----------------------------------------------------------------------
    if (isCompleted) {
      const nextPlayId = activePlay.playId < 15 ? activePlay.playId + 1 : 1;

      return (
        <Game2FinalCompletionScreen
          moduleTitle="MÓDULO 3"
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

    // -----------------------------------------------------------------------
    // ACTIVE QUESTION VIEW
    // -----------------------------------------------------------------------
    if (!currentQuestion) return null;

    // Split template into text parts around {0}, {1}, etc.
    const templateParts = currentQuestion.templateEnglish.split(/\{(\d+)\}/g);

    return (
      <div className="flex flex-col w-full max-w-[540px] md:max-w-[580px] mx-auto min-w-0 animate-in fade-in duration-200 pb-6">
        
        {/* TOP BAR: CONTROLS & PROGRESS */}
        <div className="flex items-center justify-between gap-2 mb-3 bg-[#0c1a2f]/90 p-3 rounded-2xl border border-[#79c6ff]/30 shadow-md">
          <button
            onClick={() => {
              audioEngine.flushAndStop();
              setSelectedPlayId(null);
            }}
            className="p-2 rounded-xl bg-[#132847] hover:bg-[#1a3863] text-[#79c6ff] border border-[#79c6ff]/40 transition-colors flex items-center gap-1 cursor-pointer text-xs font-bold uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>PLAYS</span>
          </button>

          <div className="text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">
              PLAY {activePlay.playId} • {currentNum}/{totalQuestionsCount}
            </span>
            <div className="w-24 sm:w-32 bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-[#4fa7ff] to-[#79c6ff] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {totalErrors > 0 && (
              <div className="px-2 py-1 rounded-lg bg-red-950/80 border border-red-500/50 text-red-400 font-mono text-[10px] font-bold">
                {totalErrors} {totalErrors === 1 ? "ERR" : "ERRS"}
              </div>
            )}
            <button
              onClick={() => playAudio(currentQuestion.fullEnglish)}
              title="Escuchar pronunciación técnica en inglés"
              className="p-2 rounded-xl bg-[#132847] hover:bg-[#1f3d69] text-[#79c6ff] border border-[#79c6ff]/50 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* INSTRUCTION CARD */}
        <div className="bg-[#09192f] border border-[#79c6ff]/30 rounded-xl p-2.5 mb-3 flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#79c6ff] animate-ping" />
            <span className="font-bold text-white uppercase text-[10.5px]">
              {currentQuestion.partCategory}
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#79c6ff] uppercase">
            {currentQuestion.aircraftType === "both" ? "Avión & Helicóptero" : currentQuestion.aircraftType === "helicopter" ? "Helicóptero" : "Avión"}
          </span>
        </div>

        {/* MAIN SENTENCE DISPLAY WITH INTERACTIVE BLANKS */}
        <div className="w-full bg-gradient-to-b from-[#091b33] to-[#071426] border-2 border-[#79c6ff]/60 rounded-2xl p-4 sm:p-5 shadow-[0_0_25px_rgba(79,167,255,0.22)] mb-3 flex flex-col justify-center min-h-[170px]">
          
          <div className="text-center mb-3">
            <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#79c6ff] block font-bold mb-1">
              COMPLETA LOS ESPACIOS VACÍOS CON LAS PARTES CORRECTAS
            </span>
          </div>

          {/* THE SENTENCE WITH BLANKS */}
          <div className="flex flex-wrap items-center justify-center gap-2 leading-loose text-sm sm:text-base md:text-lg font-bold text-white text-center">
            {templateParts.map((part, index) => {
              // If index is odd, it's a blank index (e.g. "0", "1")
              if (index % 2 === 1) {
                const slotIndex = parseInt(part, 10);
                const wordInSlot = slotWords[slotIndex];

                return (
                  <button
                    key={index}
                    onClick={() => handleRemoveWordFromSlot(slotIndex)}
                    title={wordInSlot ? "Haz clic para quitar de la oración" : "Espacio vacío"}
                    className={`inline-flex items-center justify-center min-w-[110px] sm:min-w-[130px] px-3 py-1 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                      wordInSlot
                        ? "border-2 border-[#79c6ff] bg-[#0c2445] text-[#79c6ff] shadow-[0_0_12px_rgba(121,198,255,0.45)] hover:border-red-400 hover:text-red-300"
                        : "border-2 border-dashed border-[#79c6ff]/60 bg-[#071324] text-slate-400 hover:border-[#79c6ff]"
                    }`}
                  >
                    {wordInSlot ? (
                      <span className="flex items-center gap-1.5 underline underline-offset-4 decoration-[#79c6ff]">
                        {wordInSlot}
                        <span className="text-[10px] text-slate-400 hover:text-red-400 font-mono">✕</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-[#79c6ff]/70 tracking-widest">
                        _________
                      </span>
                    )}
                  </button>
                );
              }

              // Normal text fragment
              if (!part) return null;
              return (
                <span key={index} className="text-slate-100 font-semibold drop-shadow-sm">
                  {part}
                </span>
              );
            })}
          </div>

          {/* SPANISH MEANING (CLUE / TRANSLATION) */}
          <div className="mt-4 pt-3 border-t border-[#79c6ff]/20 text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase block mb-0.5">
              SIGNIFICADO TÉCNICO EN ESPAÑOL:
            </span>
            <p className="text-xs sm:text-sm font-medium text-[#a6d8ff] italic m-0">
              "{currentQuestion.spanish}"
            </p>
          </div>
        </div>

        {/* FEEDBACK BANNER (IF VERIFIED) */}
        {feedbackMessage && (
          <div
            className={`w-full p-3 rounded-2xl border mb-3 text-xs sm:text-sm font-bold flex items-start gap-2.5 animate-in slide-in-from-top-2 duration-200 ${
              verificationStatus === "CORRECT"
                ? "bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                : verificationStatus === "WRONG"
                ? "bg-red-950/80 border-red-400 text-red-200 shadow-[0_0_15px_rgba(248,113,113,0.3)]"
                : "bg-amber-950/80 border-amber-400 text-amber-200"
            }`}
          >
            {verificationStatus === "CORRECT" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="m-0 leading-snug">{feedbackMessage}</p>
            </div>
          </div>
        )}

        {/* WORD BANK CONTAINER */}
        <div className="w-full bg-[#0a192e] border-2 border-[#79c6ff]/40 rounded-2xl p-3.5 sm:p-4 mb-3 shadow-md">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#79c6ff]/20">
            <span className="text-[10px] font-mono text-[#79c6ff] uppercase font-bold flex items-center gap-1.5">
              <span>🔤</span> PALABRAS CLAVE DISPONIBLES (CONTORNO CELESTE):
            </span>
            <button
              onClick={handleResetCurrentQuestion}
              className="text-[10px] font-mono text-slate-400 hover:text-white underline cursor-pointer"
            >
              Reiniciar palabras
            </button>
          </div>

          {availableBank.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-2.5 py-1">
              {availableBank.map((word, bIdx) => (
                <button
                  key={`${word}-${bIdx}`}
                  onClick={() => handleSelectWordFromBank(word, bIdx)}
                  className="py-2 px-4 sm:px-5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider bg-[#0d2340] hover:bg-[#122e54] text-white border-2 border-[#79c6ff] shadow-[0_0_12px_rgba(121,198,255,0.3)] hover:shadow-[0_0_16px_rgba(121,198,255,0.6)] active:scale-95 transition-all cursor-pointer"
                >
                  {word}
                </button>
              ))}
            </div>
          ) : (
            <div className="py-2 text-center text-xs text-slate-400 font-mono italic">
              Todas las palabras han sido colocadas en la oración. Haz clic en VERIFY.
            </div>
          )}
        </div>

        {/* ACTION BUTTON: VERIFY OR NEXT */}
        <div className="w-full">
          {verificationStatus === "CORRECT" ? (
            <button
              onClick={handleNextSentence}
              className="w-full py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-black border border-emerald-300 hover:brightness-110 active:scale-95 shadow-[0_0_25px_rgba(52,211,153,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>CONTINUAR A LA SIGUIENTE ORACIÓN</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleVerify}
              className="w-full py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider bg-gradient-to-r from-[#4fa7ff] via-[#79c6ff] to-[#a6d8ff] text-black border-2 border-[#79c6ff] hover:brightness-110 active:scale-95 shadow-[0_0_22px_rgba(79,167,255,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5 stroke-[3]" />
              <span>VERIFY</span>
            </button>
          )}
        </div>

      </div>
    );
  }

  return null;
};

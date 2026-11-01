import React, { useState, useMemo, useEffect } from "react";
import { 
  MODULE_1_PLAYS, 
  Module1Play, 
  Module1Question 
} from "../data/game2Module1Data";
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
  ClipboardList
} from "lucide-react";
import { Game2FinalCompletionScreen } from "./Game2FinalCompletionScreen";

interface OptionItem {
  id: string;
  text: string;
  isCorrect: boolean;
}

function shuffleOptions(question: Module1Question): OptionItem[] {
  const false1 = question.falseSentencesSpanish?.[0] || question.falseSentences[0];
  const false2 = question.falseSentencesSpanish?.[1] || question.falseSentences[1];

  const items: OptionItem[] = [
    { id: "true", text: question.spanish, isCorrect: true },
    { id: "false1", text: false1, isCorrect: false },
    { id: "false2", text: false2, isCorrect: false },
  ];
  return items.sort(() => 0.5 - Math.random());
}

export const Game2Module1View: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  // Navigation inside Module 1: "LIST" (shows the 10 Plays) or "GAME" (playing a specific Play)
  const [selectedPlayId, setSelectedPlayId] = useState<number | null>(null);

  // Local storage stats: save completed plays and scores
  const [completedPlays, setCompletedPlays] = useState<Record<number, { errors: number; date: string }>>(() => {
    try {
      const saved = localStorage.getItem("GAME2_MOD1_PROGRESS");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // -------------------------------------------------------------
  // CURRENT PLAY STATE
  // -------------------------------------------------------------
  const activePlay = useMemo<Module1Play | null>(() => {
    if (selectedPlayId === null) return null;
    return MODULE_1_PLAYS.find((p) => p.playId === selectedPlayId) || null;
  }, [selectedPlayId]);

  const [playQuestions, setPlayQuestions] = useState<Module1Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [shuffledOptions, setShuffledOptions] = useState<OptionItem[]>([]);
  const [totalErrors, setTotalErrors] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const startPlay = (playId: number, randomize = false) => {
    const targetPlay = MODULE_1_PLAYS.find((p) => p.playId === playId);
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
    setSelectedOptionId(null);
    setHasAnswered(false);
  };

  const currentQuestion: Module1Question | null = useMemo(() => {
    if (playQuestions.length > 0) {
      return playQuestions[currentIndex] || null;
    }
    if (activePlay && activePlay.questions[currentIndex]) {
      return activePlay.questions[currentIndex];
    }
    return null;
  }, [playQuestions, activePlay, currentIndex]);

  // When switching questions, shuffle the 3 options (1 true, 2 false)
  useEffect(() => {
    if (currentQuestion) {
      setShuffledOptions(shuffleOptions(currentQuestion));
      setSelectedOptionId(null);
      setHasAnswered(false);
    }
  }, [currentQuestion]);

  const handleSelectOption = (opt: OptionItem) => {
    if (hasAnswered || !currentQuestion) return;

    setSelectedOptionId(opt.id);
    setHasAnswered(true);

    if (opt.isCorrect) {
      // Play correct sound
      try {
        combatAudio.playLockTone();
      } catch {
        // Safe ignore
      }
      // Speak the correct sentence in English
      playAudio(currentQuestion.correctSentence);
    } else {
      // Play error sound and record error
      try {
        combatAudio.playWarning();
      } catch {
        // Safe ignore
      }
      setTotalErrors((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!activePlay) return;

    const totalQ = playQuestions.length || activePlay.questions.length;
    if (currentIndex + 1 < totalQ) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed this Play of 20 sentences!
      setIsCompleted(true);
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

      // Save progress to local storage
      const newProgress = {
        ...completedPlays,
        [activePlay.playId]: {
          errors: totalErrors,
          date: new Date().toLocaleDateString(),
        },
      };
      setCompletedPlays(newProgress);
      try {
        localStorage.setItem("GAME2_MOD1_PROGRESS", JSON.stringify(newProgress));
      } catch {
        // Safe ignore
      }
    }
  };

  // =========================================================================
  // VIEW 1: LIST OF 10 PLAYS (MÓDULO 1 - 200 ORACIONES EN 10 OPCIONES)
  // =========================================================================
  if (selectedPlayId === null || !activePlay) {
    const totalPlaysCompleted = Object.keys(completedPlays).length;

    return (
      <div className="flex flex-col w-full max-w-[540px] md:max-w-[580px] mx-auto min-w-0 animate-in fade-in duration-200 pb-6">
        
        {/* HEADER BAR */}
        <div className="flex items-center justify-between gap-2 mb-3 bg-[#0c1a2f]/90 p-3 rounded-2xl border border-[#79c6ff]/30 shadow-md">
          <button
            onClick={onBack}
            className="text-xs font-mono font-bold uppercase tracking-wider text-[#79c6ff] bg-[#091526] hover:bg-[#132847] px-3.5 py-2 rounded-xl border border-[#79c6ff]/40 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>GAME 2</span>
          </button>

          <div className="text-center flex-1">
            <span className="text-[10px] font-mono tracking-widest text-[#79c6ff] uppercase font-bold block">
              MÓDULO 1 • PLAY 1
            </span>
            <h1 className="text-sm sm:text-base font-black uppercase text-white tracking-wide m-0">
              200 ORACIONES TÉCNICAS (AMM)
            </h1>
          </div>

          <div className="text-right">
            <span className="text-[9px] font-mono text-slate-300 block font-semibold">PROGRESO</span>
            <span className="text-xs font-mono font-black text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/40">
              {totalPlaysCompleted} / 10
            </span>
          </div>
        </div>

        {/* INFORMATIVE BANNER */}
        <div className="mb-3.5 bg-gradient-to-r from-[#0d2342] to-[#0a182c] border border-[#79c6ff]/40 rounded-2xl p-3 text-center shadow-sm">
          <p className="text-xs sm:text-[13px] text-slate-200 m-0 leading-relaxed font-medium">
            Entrena las <strong>200 oraciones de aviación</strong> en <strong>10 Plays de 20 oraciones</strong>.
            Visualiza la <strong>oración técnica en inglés en la parte superior</strong> y selecciona la <strong>traducción correcta en español</strong> entre las 3 opciones de selección múltiple.
          </p>
        </div>

        {/* LIST OF 10 PLAYS (TODO EN UNA SOLA PANTALLA FLUIDA) */}
        <div className="w-full flex flex-col gap-2.5 pb-3">
          {MODULE_1_PLAYS.map((play) => {
            const isDone = Boolean(completedPlays[play.playId]);
            const playErrors = completedPlays[play.playId]?.errors;

            return (
              <div
                key={play.playId}
                onClick={() => startPlay(play.playId)}
                className="w-full bg-[#0c1e38] hover:bg-[#122849] border-2 border-[#79c6ff]/40 hover:border-[#79c6ff] rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(79,167,255,0.25)] transition-all active:scale-[0.99] group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Play badge / number */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#4fa7ff] to-[#0c2340] border border-[#79c6ff] flex flex-col items-center justify-center text-black font-black flex-shrink-0 shadow-sm">
                    <span className="text-[9px] font-mono leading-none text-white/90">PLAY</span>
                    <span className="text-base sm:text-lg font-black leading-none text-white">{play.playId}</span>
                  </div>

                  {/* Play Title & Description */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-xs sm:text-sm font-black uppercase text-white tracking-wide group-hover:text-[#79c6ff] transition-colors">
                        {play.title}: {play.rangeText}
                      </span>
                      {isDone && (
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 px-2 py-0.2 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>COMPLETADO ({playErrors} ERR)</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-300 font-medium line-clamp-1 m-0">
                      {play.description}
                    </p>
                  </div>
                </div>

                {/* Arrow Action */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="hidden sm:inline-block text-[11px] font-mono font-bold text-[#79c6ff] uppercase tracking-wider">
                    20 ORACIONES
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#0c1a2f] border border-[#79c6ff]/40 flex items-center justify-center text-[#79c6ff] group-hover:bg-[#4fa7ff] group-hover:text-black transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="footer-message bg-[rgba(16,33,58,0.9)] rounded-[18px] px-3.5 py-2.5 border border-[--line] text-center mt-2">
          <span className="text-[9px] sm:text-[10px] text-[#79c6ff] uppercase font-bold tracking-wide">
            AVIADOR: CADA PLAY REFUERZA LA IDENTIFICACIÓN DE ORACIONES AUTÉNTICAS AMM Y PROCEDIMIENTOS STE.
          </span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: COMPLETION SCREENS (2 PANTALLAS: ERRORES > 0 vs ERRORES === 0)
  // =========================================================================
  if (isCompleted) {
    const totalQuestionsCount = playQuestions.length || 20;
    const nextPlayId = activePlay.playId < 10 ? activePlay.playId + 1 : 1;

    return (
      <Game2FinalCompletionScreen
        moduleTitle="MÓDULO 1"
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
  // VIEW 3: ACTIVE PLAY QUIZ (20 SENTENCES WITH CELESTE / CYAN BOX)
  // =========================================================================
  const progressPercent = ((currentIndex + 1) / 20) * 100;

  return (
    <div className="flex flex-col flex-1 w-full max-w-full min-w-0 overflow-hidden animate-in fade-in duration-200">
      
      {/* TOP HEADER: BACK, PLAY INFO, COUNTERS */}
      <div className="flex items-center justify-between gap-2 mb-2 bg-[#0c1a2f]/90 p-2.5 sm:p-3 rounded-2xl border border-[#79c6ff]/30 shadow-md">
        <button
          onClick={() => setSelectedPlayId(null)}
          className="text-xs font-mono font-bold uppercase tracking-wider text-[#79c6ff] bg-[#091526] hover:bg-[#132847] px-3 py-1.5 rounded-xl border border-[#79c6ff]/40 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>PLAYS</span>
        </button>

        <div className="text-center">
          <span className="text-[10px] font-mono tracking-widest text-[#79c6ff] uppercase font-bold block">
            {activePlay.title} • {activePlay.rangeText}
          </span>
          <span className="text-xs sm:text-sm font-black text-white font-mono">
            ORACIÓN {currentIndex + 1} / 20
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-right">
          <span className="text-[10px] font-mono text-slate-300 font-bold uppercase">FALLOS:</span>
          <span className="text-xs font-mono font-black text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/40">
            {totalErrors}
          </span>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full bg-[#0c1a2f] h-2.5 rounded-full overflow-hidden mb-3 border border-[#79c6ff]/30 p-0.5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#4fa7ff] to-[#79c6ff] transition-all duration-300 shadow-[0_0_10px_rgba(79,167,255,0.5)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* CUADRO CELESTE: MISMO DISEÑO Y ORDEN */}
      {currentQuestion && (
        <div className="flex-1 flex flex-col justify-between w-full max-w-full bg-gradient-to-b from-[#0c2340] to-[#081527] border-2 border-[#79c6ff] rounded-3xl p-3.5 sm:p-5 shadow-[0_0_25px_rgba(79,167,255,0.25)] relative overflow-hidden">
          
          {/* TOP SECTION: REFERENCIA DE PALABRA CLAVE + ORACIÓN EN LA PARTE SUPERIOR */}
          <div className="mb-2">
            {/* BADGE DE PALABRA CLAVE COMO REFERENCIA */}
            <div className="flex items-center justify-between gap-2 mb-2 px-0.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4fa7ff]/15 border border-[#79c6ff]/40 text-[#79c6ff] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#79c6ff]" />
                <span>PALABRA CLAVE (REFERENCIA): <strong className="text-white tracking-widest">{currentQuestion.targetWord}</strong></span>
                {currentQuestion.ipa && (
                  <span className="text-slate-300 font-normal">({currentQuestion.ipa})</span>
                )}
              </div>

              <button
                onClick={() => {
                  try {
                    audioEngine.wakeUp();
                    playAudio(currentQuestion.targetWord);
                  } catch {
                    // Safe ignore
                  }
                }}
                title="Pronunciación de la palabra clave"
                className="w-8 h-8 rounded-full bg-[#0c1a2f] border border-[#79c6ff]/50 hover:border-[#79c6ff] text-[#79c6ff] hover:bg-[#4fa7ff] hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-90 flex-shrink-0"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* ORACIÓN EN LA PARTE DE ARRIBA (DESTACADA, EN INGLÉS) */}
            <div className="bg-[#09172c]/95 border-2 border-[#79c6ff]/60 rounded-2xl p-3.5 sm:p-4 text-center shadow-[0_0_18px_rgba(79,167,255,0.18)] relative">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#79c6ff] font-black">
                  ORACIÓN EN INGLÉS (AMM):
                </span>
                <button
                  onClick={() => playAudio(currentQuestion.correctSentence)}
                  title="Escuchar oración en inglés"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#4fa7ff]/20 hover:bg-[#4fa7ff] text-[#79c6ff] hover:text-black border border-[#79c6ff]/50 text-[10px] font-mono font-bold transition-all cursor-pointer shadow-sm active:scale-90"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>ESCUCHAR</span>
                </button>
              </div>
              <p className="text-sm sm:text-base md:text-lg font-bold text-white leading-relaxed m-0 drop-shadow-sm">
                "{currentQuestion.correctSentence}"
              </p>
            </div>

            {/* INSTRUCCIÓN CLARA */}
            <div className="mt-2.5 pt-1 text-center">
              <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-200 uppercase tracking-wide flex items-center justify-center gap-1.5">
                <BookCheck className="w-3.5 h-3.5 text-[#79c6ff]" />
                <span>SELECCIONA LA TRADUCCIÓN CORRECTA EN ESPAÑOL:</span>
              </span>
            </div>
          </div>

          {/* MULTIPLE CHOICE OPTIONS EN ESPAÑOL: 2 FALSAS Y 1 VERDADERA */}
          <div className="flex flex-col gap-2.5 flex-1 justify-center my-1">
            {shuffledOptions.map((opt, index) => {
              const letter = String.fromCharCode(65 + index); // A, B, C
              const isSelected = selectedOptionId === opt.id;

              let optionStyle = "bg-[#0c1e38]/90 border-[#79c6ff]/40 hover:border-[#79c6ff] hover:bg-[#122849] text-white";
              let badgeStyle = "bg-[#79c6ff]/20 text-[#79c6ff] border-[#79c6ff]/50";

              if (hasAnswered) {
                if (opt.isCorrect) {
                  // The true sentence (green highlight)
                  optionStyle = "bg-emerald-950/80 border-emerald-400 text-white shadow-[0_0_15px_rgba(52,211,153,0.3)]";
                  badgeStyle = "bg-emerald-500 text-black border-emerald-400 font-black";
                } else if (isSelected && !opt.isCorrect) {
                  // The false sentence chosen by the user (red highlight)
                  optionStyle = "bg-red-950/80 border-red-500 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.3)]";
                  badgeStyle = "bg-red-500 text-white border-red-400 font-black";
                } else {
                  // The other false sentence
                  optionStyle = "bg-[#081527]/50 border-slate-700/50 text-slate-400 opacity-60";
                  badgeStyle = "bg-slate-800 text-slate-400 border-slate-700";
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full text-left p-3 sm:p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 active:scale-[0.99] ${optionStyle}`}
                >
                  {/* Option letter chip (A, B, C) */}
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl border flex items-center justify-center text-xs sm:text-sm font-mono font-bold flex-shrink-0 mt-0.5 ${badgeStyle}`}>
                    {hasAnswered && opt.isCorrect ? "✓" : hasAnswered && isSelected && !opt.isCorrect ? "✗" : letter}
                  </div>

                  {/* Option Spanish Sentence */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-[13.5px] leading-snug font-medium m-0">
                      {opt.text}
                    </p>

                    {/* Status Tag on Answer */}
                    {hasAnswered && opt.isCorrect && (
                      <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>TRADUCCIÓN CORRECTA</span>
                      </span>
                    )}
                    {hasAnswered && isSelected && !opt.isCorrect && (
                      <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">
                        <XCircle className="w-3 h-3" />
                        <span>OPCIÓN FALSA</span>
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* ADVANCE BUTTON (DIRECTLY VISIBLE ONCE ANSWERED) */}
          {hasAnswered && (
            <div className="mt-3 pt-3 border-t border-[#79c6ff]/20 animate-in slide-in-from-bottom-2 duration-200">
              {/* NEXT BUTTON */}
              <button
                onClick={handleNextQuestion}
                className="w-full py-3.5 px-6 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-[#4fa7ff] to-[#79c6ff] text-black border border-[#79c6ff] hover:brightness-110 active:scale-95 shadow-[0_0_18px_rgba(79,167,255,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>
                  {currentIndex + 1 < 20 ? "NEXT SENTENCE" : "FINISH PLAY"}
                </span>
                <span>➔</span>
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

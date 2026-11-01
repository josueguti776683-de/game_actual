import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Volume1,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Eye,
  EyeOff,
  Type,
  Award,
  Layers,
  FileText,
  RotateCcw,
} from "lucide-react";
import { TechnicalReadingPlay, ModuleReadingProgress } from "../data/game2ReadingTypes";
import { audioEngine } from "../utils/audioEngine";
import { combatAudio } from "../utils/combatAudio";
import { safeStorage } from "../utils/safeStorage";
import { Game2FinalCompletionScreen } from "./Game2FinalCompletionScreen";

interface Game2ReadingModuleViewProps {
  moduleNumber: number; // 9 or 10
  moduleTitle: string;
  moduleSubtitle: string;
  storageKey: string;
  plays: TechnicalReadingPlay[];
  onBack: () => void;
}

export const Game2ReadingModuleView: React.FC<Game2ReadingModuleViewProps> = ({
  moduleNumber,
  moduleTitle,
  moduleSubtitle,
  storageKey,
  plays,
  onBack,
}) => {
  // Navigation & Active Play
  const [activePlayId, setActivePlayId] = useState<number>(1);
  const [showVocabModal, setShowVocabModal] = useState<boolean>(false);
  const [showCompletionScreen, setShowCompletionScreen] = useState<boolean>(false);

  // Options Toolbar State
  const [expandedTranslations, setExpandedTranslations] = useState<Record<string, boolean>>({});
  const [textSize, setTextSize] = useState<"sm" | "base" | "lg">("base");
  const [highlightSteVerbs, setHighlightSteVerbs] = useState<boolean>(true);

  // Audio Playback State
  const [playingParagraphId, setPlayingParagraphId] = useState<string | null>(null);
  const [currentSpeechRate, setCurrentSpeechRate] = useState<number>(0.95);
  const [isReadingAll, setIsReadingAll] = useState<boolean>(false);
  const readAllCancelRef = useRef<boolean>(false);

  // Reading Progress Persistence
  const [progress, setProgress] = useState<ModuleReadingProgress>(() => {
    const saved = safeStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    const initial: ModuleReadingProgress = {};
    plays.forEach((p) => {
      initial[p.playId] = {
        completed: false,
        listenedNormalCount: 0,
        listenedSlowCount: 0,
      };
    });
    return initial;
  });

  // Save progress on change
  useEffect(() => {
    safeStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress, storageKey]);

  // Clean up audio on unmount or play switch
  useEffect(() => {
    return () => {
      readAllCancelRef.current = true;
      audioEngine.flushAndStop();
    };
  }, []);

  const activePlay = useMemo(() => {
    return plays.find((p) => p.playId === activePlayId) || plays[0];
  }, [plays, activePlayId]);

  // Count completed plays
  const completedCount = useMemo(() => {
    return Object.values(progress).filter((p) => p.completed).length;
  }, [progress]);

  // Handle Play Selection
  const handleSelectPlay = (id: number) => {
    readAllCancelRef.current = true;
    audioEngine.flushAndStop();
    setPlayingParagraphId(null);
    setIsReadingAll(false);
    setExpandedTranslations({});
    setActivePlayId(id);
    try {
      combatAudio.playLockTone();
    } catch {
      // safe
    }
  };

  // Toggle individual paragraph translation accordion
  const toggleTranslation = (paragraphId: string) => {
    setExpandedTranslations((prev) => ({
      ...prev,
      [paragraphId]: !prev[paragraphId],
    }));
  };

  // Play Audio for a Single Paragraph
  const handlePlayParagraph = (
    paragraphId: string,
    englishText: string,
    rate: number
  ) => {
    readAllCancelRef.current = true;
    setIsReadingAll(false);

    // If already playing this paragraph with same rate, stop it
    if (playingParagraphId === paragraphId && currentSpeechRate === rate) {
      audioEngine.flushAndStop();
      setPlayingParagraphId(null);
      return;
    }

    setPlayingParagraphId(paragraphId);
    setCurrentSpeechRate(rate);

    audioEngine.speak(
      englishText,
      () => {
        setPlayingParagraphId(paragraphId);
      },
      () => {
        setPlayingParagraphId((prev) => (prev === paragraphId ? null : prev));
      },
      rate
    );

    // Track audio statistics
    setProgress((prev) => {
      const current = prev[activePlayId] || {
        completed: false,
        listenedNormalCount: 0,
        listenedSlowCount: 0,
      };
      return {
        ...prev,
        [activePlayId]: {
          ...current,
          listenedNormalCount:
            rate >= 0.85
              ? current.listenedNormalCount + 1
              : current.listenedNormalCount,
          listenedSlowCount:
            rate < 0.85
              ? current.listenedSlowCount + 1
              : current.listenedSlowCount,
        },
      };
    });
  };

  // Stop All Audio
  const handleStopAudio = () => {
    readAllCancelRef.current = true;
    audioEngine.flushAndStop();
    setPlayingParagraphId(null);
    setIsReadingAll(false);
  };

  // Play Entire Text Sequentially (Normal or Slow)
  const handlePlayAll = (rate: number) => {
    readAllCancelRef.current = false;
    setIsReadingAll(true);
    setCurrentSpeechRate(rate);

    const paragraphs = activePlay.paragraphs;
    let idx = 0;

    const playNext = () => {
      if (readAllCancelRef.current || idx >= paragraphs.length) {
        setPlayingParagraphId(null);
        setIsReadingAll(false);
        return;
      }

      const p = paragraphs[idx];
      setPlayingParagraphId(p.id);

      audioEngine.speak(
        p.englishText,
        () => {
          setPlayingParagraphId(p.id);
        },
        () => {
          idx++;
          if (!readAllCancelRef.current) {
            setTimeout(playNext, 450);
          }
        },
        rate
      );
    };

    playNext();
  };

  // Mark Active Play as Completed / Practiced
  const handleToggleComplete = () => {
    try {
      combatAudio.playVictoryChime();
    } catch {
      // safe
    }
    setProgress((prev) => {
      const current = prev[activePlayId] || {
        completed: false,
        listenedNormalCount: 0,
        listenedSlowCount: 0,
      };
      const newStatus = !current.completed;
      return {
        ...prev,
        [activePlayId]: {
          ...current,
          completed: newStatus,
          completedAt: newStatus ? new Date().toISOString() : undefined,
        },
      };
    });
  };

  // Render text with STE verbs highlighted
  const renderHighlightedText = (
    text: string,
    steVerbs: string[]
  ): React.ReactNode => {
    if (!highlightSteVerbs || !steVerbs || steVerbs.length === 0) {
      return text;
    }

    // Build regex for the STE verbs
    const escaped = steVerbs.map((v) =>
      v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );
    const regex = new RegExp(`\\b(${escaped.join("|")})\\b`, "gi");

    const parts = text.split(regex);
    return parts.map((part, index) => {
      const isMatch = steVerbs.some(
        (v) => v.toLowerCase() === part.toLowerCase()
      );
      if (isMatch) {
        return (
          <span
            key={index}
            className="bg-amber-400/20 text-amber-200 font-bold px-1 py-0.5 rounded border-b-2 border-amber-400"
            title="Término / Verbo STE Aprobado"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Get style according to section type
  const getSectionBadgeStyle = (type: string) => {
    switch (type) {
      case "PRECAUTION":
        return "bg-red-950/70 text-red-300 border-red-500/50";
      case "INSPECTION_STEP":
        return "bg-cyan-950/70 text-cyan-300 border-cyan-500/50";
      case "PROCEDURE":
        return "bg-blue-950/70 text-[#79c6ff] border-[#79c6ff]/50";
      case "TOLERANCE_CHECK":
        return "bg-emerald-950/70 text-emerald-300 border-emerald-500/50";
      case "NOTE":
        return "bg-amber-950/70 text-amber-300 border-amber-500/50";
      default:
        return "bg-slate-900/80 text-slate-300 border-slate-600";
    }
  };

  // If user opened final completion screen
  if (showCompletionScreen) {
    return (
      <Game2FinalCompletionScreen
        moduleTitle={`MÓDULO ${moduleNumber}: LECTURA TÉCNICA CESSNA AMM`}
        playId={activePlayId}
        totalErrors={0} // Reading mode has 0 errors upon completing readings
        totalQuestionsCount={plays.length}
        nextPlayId={activePlayId < plays.length ? activePlayId + 1 : 1}
        onAgain={() => {
          setShowCompletionScreen(false);
          handleSelectPlay(1);
        }}
        onBack={() => setShowCompletionScreen(false)}
        onNext={() => {
          setShowCompletionScreen(false);
          if (activePlayId < plays.length) {
            handleSelectPlay(activePlayId + 1);
          } else {
            handleSelectPlay(1);
          }
        }}
      />
    );
  }

  const isCurrentPlayCompleted = !!progress[activePlayId]?.completed;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col flex-1 pb-10 text-slate-100 animate-in fade-in duration-200">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[rgba(13,27,49,0.92)] backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-[--line] mb-3 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              handleStopAudio();
              onBack();
            }}
            className="p-2 sm:p-2.5 rounded-xl bg-[#0e223f] hover:bg-[#153460] text-[#79c6ff] border border-[--line] transition-all cursor-pointer active:scale-95 shrink-0"
            title="Regresar al menú de Game 2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#79c6ff] font-bold block">
              GAME 2 • MÓDULO {moduleNumber} DE 10
            </span>
            <h1 className="text-sm sm:text-base font-black uppercase tracking-wide text-white m-0">
              {moduleTitle}
            </h1>
          </div>
        </div>

        {/* PROGRESS INDICATOR & FINAL CERTIFICATE BUTTON */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <div className="bg-[#091526] px-3 py-1.5 rounded-xl border border-[--line] text-right">
            <span className="text-[9.5px] font-mono text-slate-400 uppercase block">
              LECTURAS COMPLETADAS
            </span>
            <span className="text-xs sm:text-sm font-black text-amber-300">
              {completedCount} / {plays.length} PLAYS
            </span>
          </div>

          <button
            onClick={() => setShowCompletionScreen(true)}
            className="py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
            title="Ver pantalla de certificación final de lecturas técnicas"
          >
            <Award className="w-4 h-4" />
            <span className="hidden sm:inline">CERTIFICADO</span>
          </button>
        </div>
      </div>

      {/* 12 PLAYS NAVIGATION CHIPS */}
      <div className="bg-[#0c1b33] p-2.5 rounded-2xl border border-[--line] mb-3">
        <div className="flex items-center justify-between gap-2 mb-2 px-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#79c6ff] font-bold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>SELECCIONA UN PLAY DE LECTURA (1 AL 12)</span>
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handleSelectPlay(Math.max(1, activePlayId - 1))}
              disabled={activePlayId <= 1}
              className="p-1 rounded-lg bg-[#0e2444] hover:bg-[#14335c] text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
              title="Play anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-amber-300 px-1">
              {activePlayId} / {plays.length}
            </span>
            <button
              onClick={() => handleSelectPlay(Math.min(plays.length, activePlayId + 1))}
              disabled={activePlayId >= plays.length}
              className="p-1 rounded-lg bg-[#0e2444] hover:bg-[#14335c] text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
              title="Play siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chip grid */}
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
          {plays.map((p) => {
            const isDone = !!progress[p.playId]?.completed;
            const isCurrent = p.playId === activePlayId;
            return (
              <button
                key={p.playId}
                onClick={() => handleSelectPlay(p.playId)}
                className={`py-1.5 px-1 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex flex-col items-center justify-center relative ${
                  isCurrent
                    ? "bg-[#4fa7ff] text-slate-950 font-black shadow-[0_0_12px_rgba(79,167,255,0.6)] scale-102 border border-white"
                    : isDone
                    ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-900/60"
                    : "bg-[#09172c] text-slate-400 border border-slate-800 hover:bg-[#122744] hover:text-white"
                }`}
              >
                <span>P{p.playId}</span>
                {isDone && !isCurrent && (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 absolute -top-1 -right-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* OPTIONS TOOLBAR (BARRA DE OPCIONES) */}
      <div className="bg-[#0d1f3b] p-3 rounded-2xl border border-[--line] mb-3 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Global Audio Controls */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10.5px] font-mono text-slate-400 uppercase font-bold mr-1 hidden sm:inline">
              AUDIO GLOBAL:
            </span>

            <button
              onClick={() => handlePlayAll(0.95)}
              className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isReadingAll && currentSpeechRate >= 0.85
                  ? "bg-emerald-500 text-slate-950 font-black shadow-md ring-2 ring-emerald-300"
                  : "bg-[#14325a] hover:bg-[#194073] text-[#79c6ff] border border-[#79c6ff]/30"
              }`}
              title="Reproducir todo el texto a velocidad estándar"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>TODO NORMAL (1.0x)</span>
            </button>

            <button
              onClick={() => handlePlayAll(0.65)}
              className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isReadingAll && currentSpeechRate < 0.85
                  ? "bg-amber-400 text-slate-950 font-black shadow-md ring-2 ring-amber-200"
                  : "bg-[#1a3150] hover:bg-[#23426c] text-amber-300 border border-amber-400/30"
              }`}
              title="Reproducir todo el texto lentamente para estudio fonético"
            >
              <Volume1 className="w-3.5 h-3.5" />
              <span>TODO LENTO (0.65x)</span>
            </button>

            {(playingParagraphId || isReadingAll) && (
              <button
                onClick={handleStopAudio}
                className="py-1.5 px-3 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-md active:scale-95"
                title="Detener reproducción de audio"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span>DETENER</span>
              </button>
            )}
          </div>

          {/* Reading Preferences & Tools */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Bilingual / Global translation collapse toggle */}
            <button
              onClick={() => {
                const areAnyOpen = activePlay.paragraphs.some((p) => expandedTranslations[p.id]);
                if (areAnyOpen) {
                  setExpandedTranslations({});
                } else {
                  const allOpen: Record<string, boolean> = {};
                  activePlay.paragraphs.forEach((p) => {
                    allOpen[p.id] = true;
                  });
                  setExpandedTranslations(allOpen);
                }
              }}
              className={`py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                activePlay.paragraphs.some((p) => expandedTranslations[p.id])
                  ? "bg-[#122846] text-[#79c6ff] border-[#79c6ff]/40"
                  : "bg-[#091526] text-slate-400 border-slate-700"
              }`}
              title="Desplegar u ocultar todas las pestañas de traducción técnica"
            >
              {activePlay.paragraphs.some((p) => expandedTranslations[p.id]) ? (
                <Eye className="w-3.5 h-3.5" />
              ) : (
                <EyeOff className="w-3.5 h-3.5" />
              )}
              <span>
                {activePlay.paragraphs.some((p) => expandedTranslations[p.id])
                  ? "OCULTAR TODAS"
                  : "DESPLEGAR TODAS"}
              </span>
            </button>

            {/* Font Size Selector */}
            <div className="flex items-center bg-[#091526] rounded-xl border border-slate-700 p-0.5">
              <button
                onClick={() => setTextSize("sm")}
                className={`px-2 py-1 text-xs rounded-lg font-mono font-bold transition-all cursor-pointer ${
                  textSize === "sm" ? "bg-[#4fa7ff] text-slate-950 font-black" : "text-slate-400 hover:text-white"
                }`}
                title="Texto pequeño"
              >
                A-
              </button>
              <button
                onClick={() => setTextSize("base")}
                className={`px-2 py-1 text-xs rounded-lg font-mono font-bold transition-all cursor-pointer ${
                  textSize === "base" ? "bg-[#4fa7ff] text-slate-950 font-black" : "text-slate-400 hover:text-white"
                }`}
                title="Texto normal"
              >
                A
              </button>
              <button
                onClick={() => setTextSize("lg")}
                className={`px-2 py-1 text-xs rounded-lg font-mono font-bold transition-all cursor-pointer ${
                  textSize === "lg" ? "bg-[#4fa7ff] text-slate-950 font-black" : "text-slate-400 hover:text-white"
                }`}
                title="Texto grande"
              >
                A+
              </button>
            </div>

            {/* Highlight STE Verbs toggle */}
            <button
              onClick={() => setHighlightSteVerbs(!highlightSteVerbs)}
              className={`py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                highlightSteVerbs
                  ? "bg-amber-950/70 text-amber-300 border-amber-400/50"
                  : "bg-[#091526] text-slate-400 border-slate-700"
              }`}
              title="Resaltar verbos y acciones técnicas STE"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">RESALTAR STE</span>
            </button>

            {/* Key Vocabulary Drawer Button */}
            <button
              onClick={() => setShowVocabModal(true)}
              className="py-1.5 px-2.5 rounded-xl text-xs font-bold bg-[#14325a] hover:bg-[#1d4375] text-[#79c6ff] border border-[#79c6ff]/40 transition-all cursor-pointer flex items-center gap-1.5"
              title="Abrir glosario del Play"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>VOCABULARIO</span>
            </button>
          </div>
        </div>
      </div>

      {/* ACTIVE PLAY TITLE CARD */}
      <div className="bg-gradient-to-r from-[#0c1f3d] via-[#102952] to-[#0c1f3d] p-4 sm:p-5 rounded-2xl border border-[#79c6ff]/40 mb-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#4fa7ff] text-slate-950 text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-lg uppercase tracking-wider font-mono">
              PLAY {activePlay.playId} DE 12
            </span>
            <span className="bg-[#102c52] text-[#79c6ff] text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-lg uppercase font-mono border border-[#79c6ff]/30">
              {activePlay.aircraft}
            </span>
            <span className="bg-[#1e1e38] text-amber-300 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-lg uppercase font-mono border border-amber-400/30">
              {activePlay.ataChapter}
            </span>
            <span className="bg-[#0b332b] text-emerald-300 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-lg uppercase font-mono border border-emerald-400/30">
              {activePlay.topicType}
            </span>
          </div>

          {/* Mark as Completed Button */}
          <button
            onClick={handleToggleComplete}
            className={`py-1.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 ${
              isCurrentPlayCompleted
                ? "bg-emerald-500 text-slate-950 shadow-md"
                : "bg-[#0c2446] hover:bg-[#12315c] text-emerald-400 border border-emerald-400/40"
            }`}
            title="Marcar este Play como leído y practicado"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCurrentPlayCompleted ? "PLAY PRACTICADO ✓" : "MARCAR COMO PRACTICADO"}</span>
          </button>
        </div>

        <h2 className="text-base sm:text-xl font-black text-white uppercase tracking-wide mb-1 leading-snug">
          {activePlay.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#79c6ff] font-medium m-0 leading-relaxed">
          {activePlay.titleSpanish}
        </p>
      </div>

      {/* READING PARAGRAPHS CONTAINER */}
      <div className="space-y-3.5">
        {activePlay.paragraphs.map((p, index) => {
          const isPlaying = playingParagraphId === p.id;
          const isNormalPlaying = isPlaying && currentSpeechRate >= 0.85;
          const isSlowPlaying = isPlaying && currentSpeechRate < 0.85;

          return (
            <div
              key={p.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 shadow-md ${
                isPlaying
                  ? "bg-[#112a4d] border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.25)] ring-1 ring-amber-400"
                  : p.sectionType === "PRECAUTION"
                  ? "bg-[rgba(36,12,18,0.7)] border-red-500/40"
                  : "bg-[rgba(13,26,48,0.85)] border-[--line]"
              }`}
            >
              {/* Card Top: Prefix Badge & Paragraph Audio Buttons */}
              <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-700/50">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[10px] sm:text-xs font-mono font-bold px-2.5 py-0.5 rounded-md uppercase border ${getSectionBadgeStyle(
                      p.sectionType
                    )}`}
                  >
                    {p.prefixLabel || `SECCIÓN ${index + 1}`}
                  </span>
                  {p.steVerbsInvolved && p.steVerbsInvolved.length > 0 && (
                    <div className="hidden sm:flex items-center gap-1 text-[9.5px] font-mono text-slate-400">
                      <span>STE:</span>
                      {p.steVerbsInvolved.slice(0, 4).map((verb) => (
                        <span
                          key={verb}
                          className="bg-[#09172a] text-amber-300 px-1.5 py-0.5 rounded border border-slate-700 font-bold"
                        >
                          {verb}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2 AUDIO BUTTONS: NORMAL & SLOW */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Normal Audio Button */}
                  <button
                    onClick={() => handlePlayParagraph(p.id, p.englishText, 0.95)}
                    className={`py-1.5 px-2.5 sm:px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isNormalPlaying
                        ? "bg-emerald-500 text-slate-950 font-black shadow-md scale-105 animate-pulse"
                        : "bg-[#102747] hover:bg-[#163660] text-[#79c6ff] border border-[#79c6ff]/30 active:scale-95"
                    }`}
                    title="Reproducir pronunciación normal en inglés técnico (0.95x)"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-mono">NORMAL</span>
                  </button>

                  {/* Slow Audio Button */}
                  <button
                    onClick={() => handlePlayParagraph(p.id, p.englishText, 0.65)}
                    className={`py-1.5 px-2.5 sm:px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSlowPlaying
                        ? "bg-amber-400 text-slate-950 font-black shadow-md scale-105 animate-pulse"
                        : "bg-[#182942] hover:bg-[#203657] text-amber-300 border border-amber-400/30 active:scale-95"
                    }`}
                    title="Reproducir pronunciación lenta en inglés técnico (0.65x)"
                  >
                    <Volume1 className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-mono">LENTO</span>
                  </button>
                </div>
              </div>

              {/* ENGLISH TECHNICAL TEXT */}
              <div
                className={`font-sans leading-relaxed text-slate-100 mb-3 select-text ${
                  textSize === "sm"
                    ? "text-xs sm:text-sm"
                    : textSize === "lg"
                    ? "text-base sm:text-lg"
                    : "text-sm sm:text-base"
                }`}
              >
                {renderHighlightedText(p.englishText, p.steVerbsInvolved)}
              </div>

              {/* PESTAÑA DESPLEGABLE: TRADUCCIÓN TÉCNICA AERONÁUTICA */}
              <div className="pt-2 border-t border-slate-700/40">
                <button
                  type="button"
                  onClick={() => toggleTranslation(p.id)}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-left cursor-pointer transition-all border select-none ${
                    expandedTranslations[p.id]
                      ? "bg-[#0d1e35] border-amber-400/60 shadow-sm"
                      : "bg-[#0a1524]/80 hover:bg-[#0f233c] border-slate-700/60 hover:border-amber-400/40"
                  }`}
                  title={
                    expandedTranslations[p.id]
                      ? "Haga clic para ocultar (guardar) la traducción"
                      : "Haga clic para desplegar la traducción técnica"
                  }
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                      <span>📖</span>
                      <span>TRADUCCIÓN TÉCNICA AERONÁUTICA:</span>
                    </span>
                    <span
                      className={`text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                        expandedTranslations[p.id]
                          ? "bg-amber-950/70 text-amber-300 border-amber-500/40"
                          : "bg-[#07111e] text-slate-400 border-slate-800"
                      }`}
                    >
                      {expandedTranslations[p.id] ? "DESPLEGADA" : "CLICK PARA DESPLEGAR"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-amber-400 shrink-0">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold hidden sm:inline">
                      {expandedTranslations[p.id] ? "OCULTAR" : "DESPLEGAR"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        expandedTranslations[p.id] ? "rotate-180 text-amber-400" : "text-slate-400"
                      }`}
                    />
                  </div>
                </button>

                {/* CONTENIDO DESPLEGABLE DE LA TRADUCCIÓN */}
                {expandedTranslations[p.id] && (
                  <div className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed bg-[#081424]/95 p-3 rounded-xl border border-amber-400/30 animate-in fade-in slide-in-from-top-1 duration-150 shadow-inner">
                    <p className="m-0 leading-relaxed font-sans text-slate-200 select-text">
                      {p.spanishText}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER ACTIONS: NEXT / PREVIOUS & COMPLETION */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-[--line]">
        <button
          onClick={() => handleSelectPlay(Math.max(1, activePlayId - 1))}
          disabled={activePlayId <= 1}
          className="w-full sm:w-auto py-2.5 px-5 rounded-xl font-bold text-xs uppercase bg-[#0d223f] hover:bg-[#14325a] text-[#79c6ff] border border-[--line] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>PLAY ANTERIOR</span>
        </button>

        <button
          onClick={handleToggleComplete}
          className={`w-full sm:w-auto py-3 px-6 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
            isCurrentPlayCompleted
              ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
              : "bg-gradient-to-r from-[#4fa7ff] to-[#79c6ff] hover:brightness-110 text-slate-950 border border-[#79c6ff]"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>
            {isCurrentPlayCompleted ? "PLAY YA PRACTICADO ✓" : "MARCAR PLAY COMO PRACTICADO"}
          </span>
        </button>

        {activePlayId < plays.length ? (
          <button
            onClick={() => handleSelectPlay(activePlayId + 1)}
            className="w-full sm:w-auto py-2.5 px-5 rounded-xl font-bold text-xs uppercase bg-[#0d223f] hover:bg-[#14325a] text-[#79c6ff] border border-[--line] cursor-pointer transition-all flex items-center justify-center gap-2"
          >
            <span>SIGUIENTE PLAY</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setShowCompletionScreen(true)}
            className="w-full sm:w-auto py-2.5 px-5 rounded-xl font-black text-xs uppercase bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 cursor-pointer shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>VER CERTIFICADO FINAL</span>
          </button>
        )}
      </div>

      {/* MODAL: VOCABULARIO TÉCNICO STE DEL PLAY */}
      {showVocabModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-[#0c1c36] border border-[#79c6ff] w-full max-w-lg rounded-2xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700 mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-300" />
                <h3 className="text-sm sm:text-base font-black uppercase text-white m-0 tracking-wide">
                  VOCABULARIO CLAVE • PLAY {activePlay.playId}
                </h3>
              </div>
              <button
                onClick={() => setShowVocabModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#79c6ff] mb-3">
              Términos técnicos y verbos aprobados por ASD-STE100 utilizados en esta lectura:
            </p>

            <div className="space-y-2.5">
              {activePlay.keyVocabulary.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#081527] p-3 rounded-xl border border-slate-700/60"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono font-black text-amber-300">
                      {item.term}
                    </span>
                    <span className="text-[9.5px] font-mono font-bold bg-[#112542] text-[#79c6ff] px-2 py-0.5 rounded border border-slate-700">
                      {item.steCategory}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-slate-200 mb-1">
                    {item.translation}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-snug">
                    💡 <span className="italic">{item.usageTip}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 text-center">
              <button
                onClick={() => setShowVocabModal(false)}
                className="w-full py-2.5 rounded-xl bg-[#4fa7ff] hover:bg-[#79c6ff] text-slate-950 font-black text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95"
              >
                ENTENDIDO, VOLVER A LA LECTURA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

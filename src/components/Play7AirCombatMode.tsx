import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { levelsData } from "../data";
import { VocabItem } from "../types";
import { playAudio, audioEngine } from "../utils/audioEngine";
import { getUSIPA } from "../utils/ipa";
import { CompletionScreen } from "./CompletionScreen";
import { combatAudio } from "../utils/combatAudio";
import { Volume2, VolumeX, Shield, Crosshair, Award, Radio } from "lucide-react";

interface Play7AirCombatModeProps {
  levelId: number;
  onBack: () => void;
  customVocab?: VocabItem[];
}

interface TargetQuestion {
  item: VocabItem;
  options: VocabItem[];
  correctIndex: number;
}

export const Play7AirCombatMode: React.FC<Play7AirCombatModeProps> = ({
  levelId,
  onBack,
  customVocab,
}) => {
  const isLestime = levelId === 999 || levelId === 909;

  const level = useMemo(() => {
    if (customVocab && customVocab.length > 0) {
      return {
        id: levelId,
        name: isLestime
          ? `MODE: 5 MINUTES (${customVocab.length} WORDS)`
          : levelsData[levelId]?.name || `LEVEL ${levelId}`,
        vocab: customVocab,
        sentences: [],
        vocabPlay3: [],
      };
    }

    if (isLestime) {
      const wordCount = levelId === 909 ? 9 : 15;
      const allVocab: VocabItem[] = [];
      Object.values(levelsData).forEach((l) => {
        if (l && l.vocab) {
          allVocab.push(...l.vocab);
        }
      });
      const uniqueVocab = Array.from(new Map(allVocab.map((v) => [v.word, v])).values());
      const shuffled = [...uniqueVocab].sort(() => 0.5 - Math.random());
      return {
        id: levelId,
        name: `MODE: 5 MINUTES (${wordCount} WORDS)`,
        vocab: shuffled.slice(0, wordCount),
        sentences: [],
        vocabPlay3: [],
      };
    }

    return levelsData[levelId] || null;
  }, [levelId, isLestime, customVocab]);

  const allVocab = useMemo(() => level?.vocab || [], [level]);

  // Queue of remaining targets to intercept
  const [queue, setQueue] = useState<VocabItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"INTRO" | "COMBAT" | "DEBRIEF" | "COMPLETE">("INTRO");

  // Combat Stats
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [destroyedCount, setDestroyedCount] = useState(0);
  const [hullIntegrity, setHullIntegrity] = useState(100);

  // Audio / Mute
  const [isSfxMuted, setIsSfxMuted] = useState(false);

  // Combat Interception Animation states
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [combatEvent, setCombatEvent] = useState<{
    status: "hit" | "miss";
    message: string;
  } | null>(null);
  const [isExploding, setIsExploding] = useState(false);
  const [isFiringMissile, setIsFiringMissile] = useState(false);
  const [showDamageFlash, setShowDamageFlash] = useState(false);

  // Timer per target (12 seconds per target for high adrenaline)
  const [timeLeft, setTimeLeft] = useState(12);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  // Penalty Review Modal when pilot misses
  const [showIntelModal, setShowIntelModal] = useState(false);
  const [intelTarget, setIntelTarget] = useState<VocabItem | null>(null);

  // Initialize mission
  const initMission = useCallback(() => {
    if (!allVocab.length) return;
    const shuffled = [...allVocab].sort(() => 0.5 - Math.random());
    setQueue(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setTotalErrors(0);
    setDestroyedCount(0);
    setHullIntegrity(100);
    setCombatEvent(null);
    setIsExploding(false);
    setIsFiringMissile(false);
    setSelectedOption(null);
    setTimeLeft(12);
    setPhase("COMBAT");
  }, [allVocab]);

  const currentTarget = queue[currentIndex] || null;

  // Build current question with 4 options (1 correct, 3 decoys)
  const currentQuestion = useMemo<TargetQuestion | null>(() => {
    if (!currentTarget || !allVocab.length) return null;

    // Pick 3 random decoys different from currentTarget
    const otherVocab = allVocab.filter((v) => v.word !== currentTarget.word);
    const shuffledOthers = [...otherVocab].sort(() => 0.5 - Math.random());
    const decoys = shuffledOthers.slice(0, 3);

    const options = [currentTarget, ...decoys].sort(() => 0.5 - Math.random());
    const correctIndex = options.findIndex((opt) => opt.word === currentTarget.word);

    return {
      item: currentTarget,
      options,
      correctIndex,
    };
  }, [currentTarget, allVocab]);

  // Read target pronunciation via radio
  const handleRadioCall = useCallback(() => {
    if (!currentTarget) return;
    playAudio(currentTarget.word);
    combatAudio.playLockTone();
  }, [currentTarget]);

  // Target lock-on tone when new bogey enters
  useEffect(() => {
    if (phase === "COMBAT" && currentTarget && !isTimerPaused && !showIntelModal) {
      combatAudio.playLockTone();
      setTimeLeft(12);
      setSelectedOption(null);
      setCombatEvent(null);
      setIsExploding(false);
      setIsFiringMissile(false);
    }
  }, [phase, currentIndex, currentTarget, isTimerPaused, showIntelModal]);

  // Countdown timer effect
  useEffect(() => {
    if (phase !== "COMBAT" || isTimerPaused || showIntelModal || isFiringMissile || isExploding) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Timeout counts as miss
          handleTimeout();
          return 0;
        }
        if (prev <= 4) {
          combatAudio.playWarning();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, isTimerPaused, showIntelModal, isFiringMissile, isExploding, currentTarget]);

  // Handle timeout
  const handleTimeout = () => {
    if (!currentTarget || isFiringMissile || isExploding) return;
    handleInterceptionResult(false, -1, "¡ALERTA! BLANCO ESCAPÓ DE RANGO");
  };

  // Process pilot decision
  const handleOptionClick = (optionIdx: number) => {
    if (isFiringMissile || isExploding || showIntelModal || !currentQuestion) return;

    setSelectedOption(optionIdx);
    const isCorrect = optionIdx === currentQuestion.correctIndex;

    if (isCorrect) {
      handleInterceptionResult(true, optionIdx, "FOX TWO! BLANCO DESTRUIDO");
    } else {
      handleInterceptionResult(false, optionIdx, "ERROR DE TIRO! CONTRAATAQUE DETECTADO");
    }
  };

  const handleInterceptionResult = (isCorrect: boolean, optionIdx: number, message: string) => {
    if (!currentTarget) return;

    if (isCorrect) {
      // SUCCESSFUL KILL
      combatAudio.playMissileLaunch();
      setIsFiringMissile(true);
      setCombatEvent({ status: "hit", message });

      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);

      const addedScore = 100 + newCombo * 25 + timeLeft * 10;
      setScore((s) => s + addedScore);
      setDestroyedCount((d) => d + 1);

      // Play audio of the learned word
      playAudio(currentTarget.word);

      // Explosion trigger after missile travel (350ms)
      setTimeout(() => {
        combatAudio.playExplosion();
        setIsFiringMissile(false);
        setIsExploding(true);
      }, 350);

      // Advance after explosion
      setTimeout(() => {
        setIsExploding(false);
        setCombatEvent(null);
        setSelectedOption(null);

        if (currentIndex + 1 >= queue.length) {
          // Victory!
          combatAudio.playVictoryChime();
          setPhase("COMPLETE");
        } else {
          setCurrentIndex((idx) => idx + 1);
        }
      }, 1000);
    } else {
      // MISSED OR TIMEOUT
      combatAudio.playWarning();
      setTotalErrors((e) => e + 1);
      setCombo(0);
      setShowDamageFlash(true);
      setCombatEvent({ status: "miss", message });

      // Damage hull
      setHullIntegrity((prev) => Math.max(15, prev - 25));

      // Re-insert failed target at end of queue so player reinforces learning
      setQueue((prevQueue) => {
        const failedItem = prevQueue[currentIndex];
        const remaining = prevQueue.filter((_, idx) => idx !== currentIndex);
        return [...remaining, failedItem];
      });

      setTimeout(() => {
        setShowDamageFlash(false);
        // Show tactical briefing modal to study the word
        setIntelTarget(currentTarget);
        setShowIntelModal(true);
        playAudio(currentTarget.word);
      }, 600);
    }
  };

  // Close intel modal and resume combat
  const handleResumeFlight = () => {
    setShowIntelModal(false);
    setIntelTarget(null);
    setCombatEvent(null);
    setSelectedOption(null);
    setTimeLeft(12);
  };

  // Toggle SFX
  const handleToggleSfx = () => {
    const muted = combatAudio.toggleMute();
    setIsSfxMuted(muted);
  };

  // Rank calculation based on score and errors
  const pilotRank = useMemo(() => {
    if (totalErrors === 0) return { title: "AS DEL COMBATE AÉREO", badge: "🎖️ TOP GUN ACE", color: "text-amber-400" };
    if (totalErrors <= 3) return { title: "LÍDER DE ESCUADRÓN", badge: "⭐ SQUADRON LEADER", color: "text-[#79c6ff]" };
    return { title: "PILOTO INTERCEPTOR", badge: "✈️ WINGMAN", color: "text-emerald-400" };
  }, [totalErrors]);

  // Completion screen
  if (phase === "COMPLETE") {
    return (
      <div className="min-h-screen w-full px-2 sm:px-4 py-4 flex flex-col items-center justify-center">
        <CompletionScreen
          playName="PLAY 7 • AIR COMBAT"
          gradeText={`RANGO: ${pilotRank.badge} | BLANCOS: ${destroyedCount} | RACHA MÁXIMA: x${maxCombo}`}
          totalErrors={totalErrors}
          onAgain={initMission}
          onHome={onBack}
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center transition-colors duration-300 ${
        showDamageFlash ? "bg-red-950/60" : ""
      }`}
    >
      {/* 1. Encabezado Táctico Superior */}
      <div className="w-full max-w-[680px] flex flex-col items-center mb-3 sm:mb-4 px-1">
        <div className="dict-header text-center w-full">
          <h1 className="text-2xl sm:text-3xl md:text-[2.2rem] font-[900] uppercase m-0 leading-tight text-white flex items-center justify-center gap-2">
            PLAY 7 - AIR COMBAT
          </h1>
          <div className="text-[--muted] text-xs sm:text-sm font-[600] mt-1 uppercase tracking-wide">
            {level?.name}
          </div>
        </div>

        {/* Barra de Controles Rápidos: Botón Volver + Mute SFX + Hull / Escudo */}
        <div className="w-full flex items-center justify-between mt-3 px-1">
          <button
            onClick={onBack}
            className="home-btn px-4 py-2 font-bold text-xs sm:text-sm uppercase cursor-pointer border-none shadow-md"
          >
            ⬅ SALIR
          </button>

          <div className="flex items-center gap-2.5">
            {/* Hull integrity shield */}
            <div className="flex items-center gap-1.5 bg-[#091629] border border-[#79c6ff]/30 px-3 py-1.5 rounded-xl">
              <Shield className={`w-4 h-4 ${hullIntegrity > 50 ? "text-emerald-400" : "text-amber-400 animate-pulse"}`} />
              <span className="text-xs font-black text-white">{hullIntegrity}%</span>
            </div>

            {/* SFX Mute button */}
            <button
              onClick={handleToggleSfx}
              title={isSfxMuted ? "Activar Sonido de Combate" : "Silenciar Sonido"}
              className="p-2 rounded-xl bg-[#091629] border border-[#79c6ff]/30 text-[#79c6ff] hover:bg-[#79c6ff]/20 transition-all cursor-pointer"
            >
              {isSfxMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Pantalla de Introducción / Briefing de Misión */}
      {phase === "INTRO" && (
        <div className="play-card !mt-0 animate-in zoom-in-95 duration-300 w-full max-w-[680px]">
          <div className="border border-[#79c6ff]/40 bg-[#0a1628] rounded-2xl p-5 sm:p-7 flex flex-col items-center gap-4 text-center shadow-[0_0_25px_rgba(121,198,255,0.12)]">
            <div className="w-20 h-20 rounded-2xl bg-[#0c1e38] border-2 border-[#79c6ff] text-[#79c6ff] flex items-center justify-center text-4xl shadow-lg animate-pulse">
              ✈️
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs text-amber-400 font-extrabold uppercase tracking-widest">
                INSTRUCCIONES DE MISIÓN DE COMBATE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white m-0">
                AIR COMBAT
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-[500px]">
              Los escuadrones enemigos se aproximan en el radar táctico. Cada blanco presenta una orden de aviación técnica. Dispara el misil interceptor correcto en inglés antes de que el blanco escape o te contraataque.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-[460px] my-2 text-left">
              <div className="bg-[#0e213d] p-3 rounded-xl border border-sky-800/40">
                <span className="text-[10px] text-sky-400 font-bold uppercase block">Blancos en Nivel</span>
                <span className="text-lg font-black text-white">{allVocab.length} BOGEYS</span>
              </div>
              <div className="bg-[#0e213d] p-3 rounded-xl border border-sky-800/40">
                <span className="text-[10px] text-amber-400 font-bold uppercase block">Tiempo / Blanco</span>
                <span className="text-lg font-black text-white">12 SEGUNDOS</span>
              </div>
              <div className="bg-[#0e213d] p-3 rounded-xl border border-sky-800/40 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-emerald-400 font-bold uppercase block">Racha de Fuego</span>
                <span className="text-lg font-black text-white">MULTIPLICADOR X</span>
              </div>
            </div>

            <button
              onClick={initMission}
              className="main-btn w-full max-w-[340px] py-4 text-lg tracking-widest uppercase mt-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer"
            >
              🚀 INICIAR COMBATE
            </button>
          </div>
        </div>
      )}

      {/* 3. Escenario de Combate Aéreo Táctico */}
      {phase === "COMBAT" && currentTarget && currentQuestion && (
        <div className="play-card !mt-0 animate-in fade-in duration-200 w-full max-w-[680px] flex flex-col gap-3.5">
          {/* Barra de Telemetría: Blanco actual, Score, Combo, Timer */}
          <div className="grid grid-cols-4 gap-2 w-full">
            <div className="bg-[#0a182c] border border-[#79c6ff]/30 rounded-xl p-2 sm:p-2.5 flex flex-col items-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold">BLANCO</span>
              <span className="text-sm sm:text-base font-black text-[#79c6ff]">
                {currentIndex + 1} / {queue.length}
              </span>
            </div>

            <div className="bg-[#0a182c] border border-[#79c6ff]/30 rounded-xl p-2 sm:p-2.5 flex flex-col items-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold">PUNTAJE</span>
              <span className="text-sm sm:text-base font-black text-amber-400">{score}</span>
            </div>

            <div className="bg-[#0a182c] border border-[#79c6ff]/30 rounded-xl p-2 sm:p-2.5 flex flex-col items-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold">RACHA</span>
              <span className={`text-sm sm:text-base font-black ${combo > 1 ? "text-emerald-400 animate-bounce-short" : "text-white"}`}>
                x{combo}
              </span>
            </div>

            <div
              className={`border rounded-xl p-2 sm:p-2.5 flex flex-col items-center transition-colors ${
                timeLeft <= 4
                  ? "bg-red-950/80 border-red-500 animate-pulse"
                  : "bg-[#0a182c] border-[#79c6ff]/30"
              }`}
            >
              <span className="text-[10px] text-slate-400 uppercase font-bold">RADAR</span>
              <span className={`text-sm sm:text-base font-black ${timeLeft <= 4 ? "text-red-400" : "text-sky-300"}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* RADAR HUD COCKPIT: El avión / blanco enemigo en la mira */}
          <div className="relative border-2 border-[#79c6ff]/60 rounded-2xl p-4 sm:p-6 bg-[#07111e] overflow-hidden shadow-[0_0_25px_rgba(121,198,255,0.18)]">
            {/* Fondo de Líneas de Escáner de Radar Militar */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #79c6ff 1px, transparent 1px), linear-gradient(to right, rgba(121,198,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(121,198,255,0.05) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Mira de Combate (Crosshair) */}
            <div className="absolute top-3 left-3 text-[#79c6ff]/40 text-xs font-mono">
              HUD: LOCK_ON // ALT: 24,000 FT
            </div>
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-mono text-emerald-400 font-bold">RADAR ACTIVO</span>
            </div>

            {/* Contenido Central del Blanco */}
            <div className="relative z-10 flex flex-col items-center text-center gap-3 pt-4 pb-2">
              {/* Animación del Avión Enemigo / Fuego de Misil / Explosión */}
              <div className="relative w-28 h-20 flex items-center justify-center">
                {isExploding ? (
                  <div className="text-6xl filter drop-shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-in zoom-in-150 duration-200">
                    💥
                  </div>
                ) : isFiringMissile ? (
                  <div className="text-5xl filter drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] animate-bounce">
                    🚀
                  </div>
                ) : (
                  <div className="text-6xl filter drop-shadow-[0_0_12px_rgba(121,198,255,0.5)] transform -scale-x-100 animate-pulse">
                    🛩️
                  </div>
                )}

                {/* Retícula de disparo */}
                <Crosshair className="absolute w-28 h-28 text-[#79c6ff]/40 pointer-events-none animate-spin-slow" />
              </div>

              {/* Título de la Orden / Traducción en Español */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                  ORDEN DEL BLANCO AÉREO (ESPAÑOL)
                </span>
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-wide px-3 py-1 bg-[#0f233f]/70 border border-[#79c6ff]/40 rounded-xl shadow-inner">
                  "{currentTarget.trans}"
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  Función técnica: <strong className="text-sky-300">{currentTarget.func}</strong>
                </span>
              </div>

              {/* Botón de Radio para escuchar pronunciación en inglés */}
              <button
                type="button"
                onClick={handleRadioCall}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e3a5f] hover:bg-[#254b7d] text-[#79c6ff] border border-[#79c6ff]/40 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>ESCUCHAR RADIO ({getUSIPA(currentTarget.word)})</span>
              </button>

              {/* Mensaje de Evento de Combate (Impacto / Fallo) */}
              {combatEvent && (
                <div
                  className={`font-black text-sm sm:text-base uppercase tracking-wider py-1 px-4 rounded-lg animate-in zoom-in-95 ${
                    combatEvent.status === "hit"
                      ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500 shadow-[0_0_15px_rgba(74,222,128,0.3)]"
                      : "bg-red-950/80 text-red-300 border border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                  }`}
                >
                  {combatEvent.message}
                </div>
              )}
            </div>
          </div>

          {/* 4 Opciones: MISILES INTERCEPTORES GUIADOS */}
          <div className="flex flex-col gap-2.5 w-full">
            <div className="text-xs font-extrabold tracking-widest text-[#79c6ff] uppercase flex items-center justify-between px-1">
              <span>SELECCIONA MISIL INTERCEPTOR EN INGLÉS:</span>
              <span className="text-slate-400 font-normal lowercase">1 clic para disparar</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correctIndex;
                let cardStyle = "border-[#334155] bg-[#0c1a2f] hover:bg-[#132847] hover:border-[#79c6ff]";

                if (selectedOption !== null) {
                  if (isSelected && isCorrect) {
                    cardStyle = "border-emerald-500 bg-emerald-950/80 text-emerald-200 shadow-[0_0_15px_rgba(74,222,128,0.4)]";
                  } else if (isSelected && !isCorrect) {
                    cardStyle = "border-red-500 bg-red-950/80 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.4)]";
                  } else if (isCorrect) {
                    cardStyle = "border-emerald-500/70 bg-emerald-950/40 text-emerald-300";
                  } else {
                    cardStyle = "opacity-40 border-[#1e293b] bg-[#08101e]";
                  }
                }

                return (
                  <button
                    key={opt.word + idx}
                    type="button"
                    disabled={selectedOption !== null}
                    onClick={() => handleOptionClick(idx)}
                    className={`p-3.5 sm:p-4 rounded-xl border text-left flex items-center justify-between gap-3 transition-all active:scale-98 cursor-pointer ${cardStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#071322] border border-[#79c6ff]/30 text-[#79c6ff] flex items-center justify-center font-black text-xs shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-extrabold text-base sm:text-lg text-white tracking-wide">
                          {opt.displayWord || opt.word}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {getUSIPA(opt.word)}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-sky-400 font-bold shrink-0">
                      🚀 DISPARAR
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE INTELIGENCIA TÁCTICA: REFUERZO DE APRENDIZAJE AL COMETER ERROR */}
      {showIntelModal && intelTarget && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0a182c] border-2 border-red-500/80 rounded-2xl p-5 sm:p-6 w-full max-w-[480px] shadow-[0_0_30px_rgba(239,68,68,0.3)] flex flex-col gap-4 text-center">
            <div className="text-4xl animate-bounce">⚠️</div>

            <div className="flex flex-col gap-1">
              <span className="text-red-400 font-black text-xs uppercase tracking-widest">
                INFORME DE INTELIGENCIA DE COMBATE
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase m-0">
                BLANCO NO ELIMINADO
              </h3>
            </div>

            <div className="bg-[#050f1d] p-4 rounded-xl border border-[#334155] flex flex-col gap-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Término Correcto en Inglés</span>
              <span className="text-2xl font-black text-[#79c6ff] tracking-wide uppercase">
                {intelTarget.word}
              </span>
              <span className="text-xs font-mono text-amber-400">{getUSIPA(intelTarget.word)}</span>

              <div className="border-t border-[#1e293b] pt-2 mt-1">
                <span className="text-xs text-slate-400 uppercase font-semibold block mb-0.5">Significado en Español</span>
                <span className="text-base font-bold text-white uppercase">
                  {intelTarget.trans}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300">
              Este blanco ha sido reincorporado a la cola de radar para que lo destruyas antes de finalizar la misión.
            </p>

            <button
              onClick={handleResumeFlight}
              className="main-btn w-full py-3.5 text-base tracking-wider uppercase cursor-pointer"
            >
              🔄 REENGANCHAR COMBATE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

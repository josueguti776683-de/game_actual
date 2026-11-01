import React, { useEffect } from "react";
import {
  Flame,
  Sparkles,
  ClipboardList,
  RotateCcw,
  ArrowLeft,
} from "lucide-react";
import { combatAudio } from "../utils/combatAudio";
import planeCrashImg from "../assets/images/plane_crash_fire_1788697019472.jpg";
import planeFlyingImg from "../assets/images/plane_flying_clouds_1788697040261.jpg";

export interface Game2FinalCompletionScreenProps {
  moduleTitle: string; // e.g. "MÓDULO 1", "MÓDULO 2", "MÓDULO 3", "MÓDULO 4", etc.
  playId: number;
  totalErrors: number;
  totalQuestionsCount: number;
  nextPlayId: number;
  onAgain: () => void;
  onBack: () => void;
  onNext: () => void;
}

export const Game2FinalCompletionScreen: React.FC<Game2FinalCompletionScreenProps> = ({
  moduleTitle,
  playId,
  totalErrors,
  totalQuestionsCount = 20,
  nextPlayId,
  onAgain,
  onBack,
  onNext,
}) => {
  useEffect(() => {
    try {
      if (totalErrors > 0) {
        combatAudio.playExplosion();
      } else {
        combatAudio.playVictoryChime();
      }
    } catch {
      // safe ignore
    }
  }, [totalErrors]);

  const accuracy = Math.max(
    0,
    Math.round((totalQuestionsCount / (totalQuestionsCount + totalErrors)) * 100)
  );
  const score = Math.max(0, totalQuestionsCount - totalErrors);

  // -----------------------------------------------------------------------
  // PANTALLA 1: SI HAY ERRORES (totalErrors > 0)
  // -----------------------------------------------------------------------
  if (totalErrors > 0) {
    return (
      <div className="flex flex-col flex-1 w-full max-w-full min-w-0 items-center justify-start p-2 sm:p-4 pb-14 sm:pb-20 animate-in zoom-in-95 duration-200">
        <div className="w-full max-w-md bg-gradient-to-b from-[#19090b] via-[#101b2e] to-[#081527] border-2 border-red-500/90 rounded-3xl p-4 sm:p-5 shadow-[0_0_35px_rgba(239,68,68,0.35)] text-center">
          {/* 1. CENTRO ARRIBA: AVIÓN ACCIDENTADO GRANDE CON NUBES Y FUEGO */}
          <div className="relative w-full overflow-hidden rounded-2xl border-2 border-red-500/70 shadow-[0_0_20px_rgba(239,68,68,0.4)] mb-3 bg-black">
            <img
              src={planeCrashImg}
              alt="Avión accidentado con nubes y fuego"
              className="w-full h-44 sm:h-52 object-cover object-center"
            />
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-red-950/90 border border-red-500/60 text-red-300 font-mono text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
              <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>ALERTA CRÍTICA</span>
            </div>
          </div>

          {/* 2. TÍTULO */}
          <h2 className="text-xl sm:text-2xl font-black uppercase text-red-500 tracking-wider mb-2 flex items-center justify-center gap-2 drop-shadow-[0_2px_10px_rgba(239,68,68,0.5)]">
            <Flame className="w-6 h-6 text-red-500 animate-pulse flex-shrink-0" />
            <span>¡ACCIDENTE AÉREO!</span>
            <Flame className="w-6 h-6 text-red-500 animate-pulse flex-shrink-0" />
          </h2>

          {/* 3. MOTIVACIÓN */}
          <div className="bg-red-950/45 border border-red-500/40 rounded-2xl p-3 sm:p-3.5 mb-3.5 text-left shadow-inner">
            <p className="text-xs sm:text-[12px] text-red-200 font-bold uppercase leading-relaxed mb-2">
              COMPLETASTE LA TAREA, BUEN TRABAJO, PERO CON FALLAS Y ERRORES. ESO COSTÓ UN AVIÓN ACCIDENTADO Y TRAJO LA MUERTE DE PERSONAS.
            </p>
            <p className="text-xs sm:text-[11.5px] text-amber-200/90 font-medium leading-relaxed m-0 uppercase">
              CONCÉNTRATE Y APRENDE PARA NO COMETER ESOS ERRORES NI FALLAS. MECÁNICO, TÚ PUEDES MEJORAR; ES HORA DE DESPEGAR Y SER MEJOR CADA DÍA.
            </p>
          </div>

          {/* 4. BITÁCORA DE APRENDIZAJE */}
          <div className="bg-[#09172c] border border-[#79c6ff]/40 rounded-2xl p-3 sm:p-3.5 mb-4 text-left shadow-md">
            <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-[#79c6ff]/20">
              <div className="flex items-center gap-1.5 text-[#79c6ff]">
                <ClipboardList className="w-4 h-4" />
                <span className="text-[11px] font-mono font-black uppercase tracking-wider">
                  BITÁCORA DE APRENDIZAJE
                </span>
              </div>
              <span className="text-[10px] font-mono text-red-400 font-bold uppercase">
                {totalErrors} {totalErrors === 1 ? "ERROR" : "ERRORES"}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="bg-[#0c1e38] p-2 rounded-xl border border-[#79c6ff]/20">
                <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">
                  GRADO
                </span>
                <span className="text-xs sm:text-sm font-black text-white font-mono">
                  {moduleTitle}
                </span>
              </div>
              <div className="bg-[#0c1e38] p-2 rounded-xl border border-[#79c6ff]/20">
                <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">
                  NOMBRE
                </span>
                <span className="text-xs sm:text-sm font-black text-[#79c6ff] font-mono">
                  PLAY {playId}
                </span>
              </div>
              <div className="bg-[#0c1e38] p-2 rounded-xl border border-red-500/40">
                <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">
                  ERRORES
                </span>
                <span className="text-xs sm:text-sm font-black text-red-400 font-mono">
                  {totalErrors}
                </span>
              </div>
              <div className="bg-[#0c1e38] p-2 rounded-xl border border-[#79c6ff]/20">
                <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">
                  NOTA
                </span>
                <span className="text-xs sm:text-sm font-black text-amber-300 font-mono">
                  {score}/{totalQuestionsCount} ({accuracy}%)
                </span>
              </div>
            </div>
          </div>

          {/* 5. LOS 3 BOTONES DINÁMICOS */}
          <div className="flex flex-col gap-2 w-full">
            {/* AGAIN */}
            <button
              onClick={onAgain}
              className="w-full py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-[#0d223f] hover:bg-[#132c52] text-white border border-[#79c6ff]/50 active:scale-95 transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5"
            >
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#79c6ff]">
                <RotateCcw className="w-4 h-4" />
                <span>AGAIN</span>
              </div>
              <span className="text-[10px] font-mono text-slate-300 font-normal normal-case">
                Para volver y aprender de nuevo (aleatorio)
              </span>
            </button>

            {/* BACK */}
            <button
              onClick={onBack}
              className="w-full py-2 px-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-[#081527] hover:bg-[#0c1a2f] text-slate-300 hover:text-white border border-slate-700/60 active:scale-95 transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5"
            >
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black">
                <ArrowLeft className="w-4 h-4" />
                <span>BACK</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 font-normal normal-case">
                Retroceder a la lista de Plays
              </span>
            </button>

            {/* NEXT */}
            <button
              onClick={onNext}
              className="w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-[#4fa7ff] to-[#79c6ff] text-black border border-[#79c6ff] hover:brightness-110 active:scale-95 shadow-[0_0_18px_rgba(79,167,255,0.4)] transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5"
            >
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black">
                <span>NEXT: PLAY {nextPlayId}</span>
                <span>➔</span>
              </div>
              <span className="text-[10px] font-mono font-bold opacity-85 normal-case">
                Siguiente Play en secuencia
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------------
  // PANTALLA 2: SI HAY CERO ERRORES (totalErrors === 0)
  // -----------------------------------------------------------------------
  return (
    <div className="flex flex-col flex-1 w-full max-w-full min-w-0 items-center justify-start p-2 sm:p-4 pb-14 sm:pb-20 animate-in zoom-in-95 duration-200">
      <div className="w-full max-w-md bg-gradient-to-b from-[#082236] via-[#091b2e] to-[#081527] border-2 border-emerald-400 rounded-3xl p-4 sm:p-5 shadow-[0_0_35px_rgba(52,211,153,0.35)] text-center">
        {/* 1. CENTRO ARRIBA: AVIÓN COMERCIAL CON NUBES VOLANDO, GRANDE */}
        <div className="relative w-full overflow-hidden rounded-2xl border-2 border-emerald-400/80 shadow-[0_0_20px_rgba(52,211,153,0.4)] mb-3 bg-black">
          <img
            src={planeFlyingImg}
            alt="Avión comercial volando en las nubes"
            className="w-full h-44 sm:h-52 object-cover object-center"
          />
          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-emerald-950/90 border border-emerald-400/60 text-emerald-300 font-mono text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>CERO ERRORES (100%)</span>
          </div>
        </div>

        {/* 2. TÍTULO */}
        <h2 className="text-xl sm:text-2xl font-black uppercase text-emerald-400 tracking-wider mb-2 flex items-center justify-center gap-2 drop-shadow-[0_2px_10px_rgba(52,211,153,0.5)]">
          <Sparkles className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <span>¡BIENVENIDO TÉCNICO, GANASTE!</span>
          <Sparkles className="w-6 h-6 text-emerald-400 flex-shrink-0" />
        </h2>

        {/* 3. MOTIVACIÓN */}
        <div className="bg-emerald-950/45 border border-emerald-500/40 rounded-2xl p-3 sm:p-3.5 mb-3.5 text-center shadow-inner">
          <p className="text-xs sm:text-[12px] text-emerald-100 font-bold uppercase leading-relaxed m-0">
            ¡BUEN TRABAJO, TÉCNICO! ERES BUENO, PERO PARA SER EL MEJOR TIENES QUE SEGUIR APRENDIENDO Y PRACTICANDO, PORQUE ¡EL CIELO NO ES EL LÍMITE, ES EL DESTINO!
          </p>
        </div>

        {/* 4. BITÁCORA DE APRENDIZAJE */}
        <div className="bg-[#09172c] border border-[#79c6ff]/40 rounded-2xl p-3 sm:p-3.5 mb-4 text-left shadow-md">
          <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-[#79c6ff]/20">
            <div className="flex items-center gap-1.5 text-[#79c6ff]">
              <ClipboardList className="w-4 h-4" />
              <span className="text-[11px] font-mono font-black uppercase tracking-wider">
                BITÁCORA DE APRENDIZAJE
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
              0 ERRORES (PERFECTO)
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="bg-[#0c1e38] p-2 rounded-xl border border-[#79c6ff]/20">
              <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">
                GRADO
              </span>
              <span className="text-xs sm:text-sm font-black text-white font-mono">
                {moduleTitle}
              </span>
            </div>
            <div className="bg-[#0c1e38] p-2 rounded-xl border border-[#79c6ff]/20">
              <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">
                NOMBRE
              </span>
              <span className="text-xs sm:text-sm font-black text-[#79c6ff] font-mono">
                PLAY {playId}
              </span>
            </div>
            <div className="bg-[#0c1e38] p-2 rounded-xl border border-emerald-500/40">
              <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">
                ERRORES
              </span>
              <span className="text-xs sm:text-sm font-black text-emerald-400 font-mono">
                0
              </span>
            </div>
            <div className="bg-[#0c1e38] p-2 rounded-xl border border-[#79c6ff]/20">
              <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">
                NOTA
              </span>
              <span className="text-xs sm:text-sm font-black text-emerald-300 font-mono">
                {totalQuestionsCount}/{totalQuestionsCount} (100%)
              </span>
            </div>
          </div>
        </div>

        {/* 5. LOS 3 BOTONES DINÁMICOS */}
        <div className="flex flex-col gap-2 w-full">
          {/* AGAIN */}
          <button
            onClick={onAgain}
            className="w-full py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-[#0d223f] hover:bg-[#132c52] text-white border border-[#79c6ff]/50 active:scale-95 transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5"
          >
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#79c6ff]">
              <RotateCcw className="w-4 h-4" />
              <span>AGAIN</span>
            </div>
            <span className="text-[10px] font-mono text-slate-300 font-normal normal-case">
              Para volver y aprender de nuevo (aleatorio)
            </span>
          </button>

          {/* BACK */}
          <button
            onClick={onBack}
            className="w-full py-2 px-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-[#081527] hover:bg-[#0c1a2f] text-slate-300 hover:text-white border border-slate-700/60 active:scale-95 transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5"
          >
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black">
              <ArrowLeft className="w-4 h-4" />
              <span>BACK</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 font-normal normal-case">
              Retroceder a la lista de Plays
            </span>
          </button>

          {/* NEXT */}
          <button
            onClick={onNext}
            className="w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-[#10b981] to-[#34d399] text-black border border-emerald-400 hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(52,211,153,0.45)] transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5"
          >
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black">
              <span>NEXT: PLAY {nextPlayId}</span>
              <span>➔</span>
            </div>
            <span className="text-[10px] font-mono font-bold opacity-85 normal-case">
              Siguiente Play en secuencia
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

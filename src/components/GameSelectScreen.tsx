import React, { useState } from "react";
import { levelsData } from "../data";
import { unlockAudioEngine } from "../utils/audioEngine";

interface Props {
  levelId: number;
  onBack: () => void;
  onPlay: (
    type: "PLAY1" | "PLAY2" | "PLAY3" | "PLAY3_1" | "PLAY3_2" | "PLAY4" | "PLAY4_1" | "PLAY5" | "PLAY6" | "PLAY7" | "PLAY8",
    group?: 1 | 2
  ) => void;
}

export const GameSelectScreen = ({
  levelId,
  onBack,
  onPlay,
}: Props) => {
  const level = levelsData[levelId];
  const [selectedSubmenu, setSelectedSubmenu] = useState<"NONE" | "PLAY1" | "PLAY3" | "PLAY3_1" | "PLAY3_2">("NONE");

  const handlePlay = (
    type: "PLAY1" | "PLAY2" | "PLAY3" | "PLAY3_1" | "PLAY3_2" | "PLAY4" | "PLAY4_1" | "PLAY5" | "PLAY6" | "PLAY7" | "PLAY8",
    group?: 1 | 2
  ) => {
    unlockAudioEngine();
    onPlay(type, group);
  };

  if (selectedSubmenu === "PLAY1") {
    return (
      <div className="min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
        {/* Encabezado: Título GAME STE -> Subtítulo de Nivel -> Botón Volver al lado izquierdo */}
        <div className="w-full max-w-[680px] flex flex-col items-center mb-3 sm:mb-4 px-1">
          <div className="dict-header text-center w-full">
            <h1 className="text-2xl sm:text-3xl md:text-[2.2rem] font-[900] uppercase m-0 leading-tight">
              GAME STE
            </h1>
            <div className="text-[--muted] text-[0.96rem] font-[600] mt-1.5 uppercase tracking-wide">
              {level.name}
            </div>
          </div>
          <div className="w-full flex justify-start mt-3">
            <button
              onClick={() => setSelectedSubmenu("NONE")}
              className="home-btn px-[20px] py-[8px] font-bold text-sm uppercase cursor-pointer border-none shadow-md"
            >
              ⬅ VOLVER A PLAYS
            </button>
          </div>
        </div>

        {/* Tarjeta con contorno celeste que cubre únicamente las opciones */}
        <div className="play-card !mt-0 !mb-2 animate-in slide-in-from-right duration-300">
          <div className="dict-header text-center mb-4 sm:mb-5">
            <div className="inline-block px-3 py-1 bg-[#79c6ff]/15 border border-[#79c6ff]/40 rounded-full text-[#79c6ff] font-extrabold text-xs uppercase tracking-widest mb-2">
              PLAY 1 • VOCABULARY
            </div>
            <h2 className="text-xl sm:text-2xl font-[900] uppercase m-0 leading-tight text-white">
              SELECCIONA GRUPO
            </h2>
            <div className="text-[--muted] text-xs sm:text-sm font-[600] mt-1 uppercase">
              (30 PALABRAS TOTALES)
            </div>
          </div>

          <div className="flex flex-col gap-3.5 sm:gap-4 w-full my-1">
            <button
              onClick={() => handlePlay("PLAY1", 1)}
              className="game-card w-full flex items-center justify-between p-5 px-6 rounded-2xl bg-[#0c1a2f] border border-[#79c6ff]/40 hover:bg-[#79c6ff]/20 text-white font-bold transition-all shadow-lg active:scale-98 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] flex items-center justify-center text-lg font-black shrink-0 group-hover:scale-105 transition-transform">
                  G1
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-base sm:text-lg font-extrabold text-white">GRUPO 1</span>
                  <span className="text-xs text-[#79c6ff] font-semibold tracking-wider uppercase">
                    15 PALABRAS (1 - 15)
                  </span>
                </div>
              </div>
              <span className="text-[#79c6ff] font-bold text-sm bg-[#79c6ff]/10 px-3 py-1.5 rounded-xl border border-[#79c6ff]/30">
                INICIAR →
              </span>
            </button>

            <button
              onClick={() => handlePlay("PLAY1", 2)}
              className="game-card w-full flex items-center justify-between p-5 px-6 rounded-2xl bg-[#0c1a2f] border border-[#79c6ff]/40 hover:bg-[#79c6ff]/20 text-white font-bold transition-all shadow-lg active:scale-98 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] flex items-center justify-center text-lg font-black shrink-0 group-hover:scale-105 transition-transform">
                  G2
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-base sm:text-lg font-extrabold text-white">GRUPO 2</span>
                  <span className="text-xs text-[#79c6ff] font-semibold tracking-wider uppercase">
                    15 PALABRAS (16 - 30)
                  </span>
                </div>
              </div>
              <span className="text-[#79c6ff] font-bold text-sm bg-[#79c6ff]/10 px-3 py-1.5 rounded-xl border border-[#79c6ff]/30">
                INICIAR →
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedSubmenu === "PLAY3") {
    return (
      <div className="min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
        {/* Encabezado: Título GAME STE -> Subtítulo de Nivel -> Botón Volver al lado izquierdo */}
        <div className="w-full max-w-[680px] flex flex-col items-center mb-3 sm:mb-4 px-1">
          <div className="dict-header text-center w-full">
            <h1 className="text-2xl sm:text-3xl md:text-[2.2rem] font-[900] uppercase m-0 leading-tight">
              GAME STE
            </h1>
            <div className="text-[--muted] text-[0.96rem] font-[600] mt-1.5 uppercase tracking-wide">
              {level.name}
            </div>
          </div>
          <div className="w-full flex justify-start mt-3">
            <button
              onClick={() => setSelectedSubmenu("NONE")}
              className="home-btn px-[20px] py-[8px] font-bold text-sm uppercase cursor-pointer border-none shadow-md"
            >
              ⬅ VOLVER A PLAYS
            </button>
          </div>
        </div>

        {/* Tarjeta con contorno celeste que cubre únicamente las opciones */}
        <div className="play-card !mt-0 !mb-2 animate-in slide-in-from-right duration-300">
          <div className="dict-header text-center mb-4 sm:mb-5">
            <div className="inline-block px-3 py-1 bg-[#79c6ff]/15 border border-[#79c6ff]/40 rounded-full text-[#79c6ff] font-extrabold text-xs uppercase tracking-widest mb-2">
              PLAY 3 • TRANSLATE
            </div>
            <h2 className="text-xl sm:text-2xl font-[900] uppercase m-0 leading-tight text-white">
              SELECCIONA GRUPO
            </h2>
            <div className="text-[--muted] text-xs sm:text-sm font-[600] mt-1 uppercase">
              (60 PALABRAS TOTALES)
            </div>
          </div>

          <div className="flex flex-col gap-3.5 sm:gap-4 w-full my-1">
            <button
              onClick={() => handlePlay("PLAY3", 1)}
              className="game-card w-full flex items-center justify-between p-5 px-6 rounded-2xl bg-[#0c1a2f] border border-[#79c6ff]/40 hover:bg-[#79c6ff]/20 text-white font-bold transition-all shadow-lg active:scale-98 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] flex items-center justify-center text-lg font-black shrink-0 group-hover:scale-105 transition-transform">
                  G1
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-base sm:text-lg font-extrabold text-white">GRUPO 1</span>
                  <span className="text-xs text-[#79c6ff] font-semibold tracking-wider uppercase">
                    30 PALABRAS (1 - 30)
                  </span>
                </div>
              </div>
              <span className="text-[#79c6ff] font-bold text-sm bg-[#79c6ff]/10 px-3 py-1.5 rounded-xl border border-[#79c6ff]/30">
                INICIAR →
              </span>
            </button>

            <button
              onClick={() => handlePlay("PLAY3", 2)}
              className="game-card w-full flex items-center justify-between p-5 px-6 rounded-2xl bg-[#0c1a2f] border border-[#79c6ff]/40 hover:bg-[#79c6ff]/20 text-white font-bold transition-all shadow-lg active:scale-98 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] flex items-center justify-center text-lg font-black shrink-0 group-hover:scale-105 transition-transform">
                  G2
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-base sm:text-lg font-extrabold text-white">GRUPO 2</span>
                  <span className="text-xs text-[#79c6ff] font-semibold tracking-wider uppercase">
                    30 PALABRAS (31 - 60)
                  </span>
                </div>
              </div>
              <span className="text-[#79c6ff] font-bold text-sm bg-[#79c6ff]/10 px-3 py-1.5 rounded-xl border border-[#79c6ff]/30">
                INICIAR →
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedSubmenu === "PLAY3_1") {
    return (
      <div className="min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
        {/* Encabezado: Título GAME STE -> Subtítulo de Nivel -> Botón Volver al lado izquierdo */}
        <div className="w-full max-w-[680px] flex flex-col items-center mb-3 sm:mb-4 px-1">
          <div className="dict-header text-center w-full">
            <h1 className="text-2xl sm:text-3xl md:text-[2.2rem] font-[900] uppercase m-0 leading-tight">
              GAME STE
            </h1>
            <div className="text-[--muted] text-[0.96rem] font-[600] mt-1.5 uppercase tracking-wide">
              {level.name}
            </div>
          </div>
          <div className="w-full flex justify-start mt-3">
            <button
              onClick={() => setSelectedSubmenu("NONE")}
              className="home-btn px-[20px] py-[8px] font-bold text-sm uppercase cursor-pointer border-none shadow-md"
            >
              ⬅ VOLVER A PLAYS
            </button>
          </div>
        </div>

        {/* Tarjeta con contorno celeste que cubre únicamente las opciones */}
        <div className="play-card !mt-0 !mb-2 animate-in slide-in-from-right duration-300">
          <div className="dict-header text-center mb-4 sm:mb-5">
            <div className="inline-block px-3 py-1 bg-[#79c6ff]/15 border border-[#79c6ff]/40 rounded-full text-[#79c6ff] font-extrabold text-xs uppercase tracking-widest mb-2">
              PLAY 3.1 • MATCH PAIRS
            </div>
            <h2 className="text-xl sm:text-2xl font-[900] uppercase m-0 leading-tight text-white">
              SELECCIONA GRUPO
            </h2>
            <div className="text-[--muted] text-xs sm:text-sm font-[600] mt-1 uppercase">
              (60 PALABRAS TOTALES)
            </div>
          </div>

          <div className="flex flex-col gap-3.5 sm:gap-4 w-full my-1">
            <button
              onClick={() => handlePlay("PLAY3_1", 1)}
              className="game-card w-full flex items-center justify-between p-5 px-6 rounded-2xl bg-[#0c1a2f] border border-[#79c6ff]/40 hover:bg-[#79c6ff]/20 text-white font-bold transition-all shadow-lg active:scale-98 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] flex items-center justify-center text-lg font-black shrink-0 group-hover:scale-105 transition-transform">
                  G1
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-base sm:text-lg font-extrabold text-white">GRUPO 1</span>
                  <span className="text-xs text-[#79c6ff] font-semibold tracking-wider uppercase">
                    30 PALABRAS (1 - 30)
                  </span>
                </div>
              </div>
              <span className="text-[#79c6ff] font-bold text-sm bg-[#79c6ff]/10 px-3 py-1.5 rounded-xl border border-[#79c6ff]/30">
                INICIAR →
              </span>
            </button>

            <button
              onClick={() => handlePlay("PLAY3_1", 2)}
              className="game-card w-full flex items-center justify-between p-5 px-6 rounded-2xl bg-[#0c1a2f] border border-[#79c6ff]/40 hover:bg-[#79c6ff]/20 text-white font-bold transition-all shadow-lg active:scale-98 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] flex items-center justify-center text-lg font-black shrink-0 group-hover:scale-105 transition-transform">
                  G2
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-base sm:text-lg font-extrabold text-white">GRUPO 2</span>
                  <span className="text-xs text-[#79c6ff] font-semibold tracking-wider uppercase">
                    30 PALABRAS (31 - 60)
                  </span>
                </div>
              </div>
              <span className="text-[#79c6ff] font-bold text-sm bg-[#79c6ff]/10 px-3 py-1.5 rounded-xl border border-[#79c6ff]/30">
                INICIAR →
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedSubmenu === "PLAY3_2") {
    return (
      <div className="min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
        {/* Encabezado: Título GAME STE -> Subtítulo de Nivel -> Botón Volver al lado izquierdo */}
        <div className="w-full max-w-[680px] flex flex-col items-center mb-3 sm:mb-4 px-1">
          <div className="dict-header text-center w-full">
            <h1 className="text-2xl sm:text-3xl md:text-[2.2rem] font-[900] uppercase m-0 leading-tight">
              GAME STE
            </h1>
            <div className="text-[--muted] text-[0.96rem] font-[600] mt-1.5 uppercase tracking-wide">
              {level.name}
            </div>
          </div>
          <div className="w-full flex justify-start mt-3">
            <button
              onClick={() => setSelectedSubmenu("NONE")}
              className="home-btn px-[20px] py-[8px] font-bold text-sm uppercase cursor-pointer border-none shadow-md"
            >
              ⬅ VOLVER A PLAYS
            </button>
          </div>
        </div>

        {/* Tarjeta con contorno celeste que cubre únicamente las opciones */}
        <div className="play-card !mt-0 !mb-2 animate-in slide-in-from-right duration-300">
          <div className="dict-header text-center mb-4 sm:mb-5">
            <div className="inline-block px-3 py-1 bg-[#79c6ff]/15 border border-[#79c6ff]/40 rounded-full text-[#79c6ff] font-extrabold text-xs uppercase tracking-widest mb-2">
              PLAY 3.2 • TEST ESCRITURA
            </div>
            <h2 className="text-xl sm:text-2xl font-[900] uppercase m-0 leading-tight text-white">
              SELECCIONA GRUPO
            </h2>
            <div className="text-[--muted] text-xs sm:text-sm font-[600] mt-1 uppercase">
              (60 PALABRAS TOTALES)
            </div>
          </div>

          <div className="flex flex-col gap-3.5 sm:gap-4 w-full my-1">
            <button
              onClick={() => handlePlay("PLAY3_2", 1)}
              className="game-card w-full flex items-center justify-between p-5 px-6 rounded-2xl bg-[#0c1a2f] border border-[#79c6ff]/40 hover:bg-[#79c6ff]/20 text-white font-bold transition-all shadow-lg active:scale-98 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] flex items-center justify-center text-lg font-black shrink-0 group-hover:scale-105 transition-transform">
                  G1
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-base sm:text-lg font-extrabold text-white">GRUPO 1</span>
                  <span className="text-xs text-[#79c6ff] font-semibold tracking-wider uppercase">
                    30 PALABRAS (1 - 30)
                  </span>
                </div>
              </div>
              <span className="text-[#79c6ff] font-bold text-sm bg-[#79c6ff]/10 px-3 py-1.5 rounded-xl border border-[#79c6ff]/30">
                INICIAR →
              </span>
            </button>

            <button
              onClick={() => handlePlay("PLAY3_2", 2)}
              className="game-card w-full flex items-center justify-between p-5 px-6 rounded-2xl bg-[#0c1a2f] border border-[#79c6ff]/40 hover:bg-[#79c6ff]/20 text-white font-bold transition-all shadow-lg active:scale-98 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] flex items-center justify-center text-lg font-black shrink-0 group-hover:scale-105 transition-transform">
                  G2
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-base sm:text-lg font-extrabold text-white">GRUPO 2</span>
                  <span className="text-xs text-[#79c6ff] font-semibold tracking-wider uppercase">
                    30 PALABRAS (31 - 60)
                  </span>
                </div>
              </div>
              <span className="text-[#79c6ff] font-bold text-sm bg-[#79c6ff]/10 px-3 py-1.5 rounded-xl border border-[#79c6ff]/30">
                INICIAR →
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
      {/* 1. Título GAME STE, 2. Subtítulo LEVEL, 3. Botón BACK al lado izquierdo */}
      <div className="w-full max-w-[680px] flex flex-col items-center mb-3 sm:mb-4 px-1">
        <div className="dict-header text-center w-full">
          <h1 className="text-2xl sm:text-3xl md:text-[2.2rem] font-[900] uppercase m-0 leading-tight">
            GAME STE
          </h1>
          <div className="text-[--muted] text-[0.96rem] font-[600] mt-1.5 uppercase tracking-wide">
            {level.name}
          </div>
        </div>
        <div className="w-full flex justify-start mt-3">
          <button
            onClick={onBack}
            className="home-btn px-[20px] py-[8px] font-bold text-sm uppercase cursor-pointer border-none shadow-md"
          >
            ⬅ BACK
          </button>
        </div>
      </div>

      {/* 4. Tarjeta con contorno celeste que comienza recién debajo y cubre las opciones */}
      <div className="play-card !mt-0 !mb-2 animate-in slide-in-from-right duration-300">
        <div className="game-selector flex flex-col gap-3 w-full">
        <div
          onClick={() => setSelectedSubmenu("PLAY1")}
          className="game-card w-full flex items-center justify-between p-3.5 sm:p-4 px-5 active:scale-98 transition-all cursor-pointer gap-3"
        >
          <div className="flex items-center gap-3.5">
            <span className="text-base sm:text-lg shrink-0 w-9 h-9 rounded-full bg-[#0c1a2f] border border-[#79c6ff]/30 flex items-center justify-center font-black text-[#79c6ff]">
              1
            </span>
            <div className="flex flex-col">
              <div className="font-bold text-base sm:text-lg text-white">PLAY 1</div>
              <div className="text-[--muted] text-xs font-semibold tracking-wider uppercase">
                VOCABULARY (30 PALABRAS)
              </div>
            </div>
          </div>
          <div className="text-[#79c6ff] font-bold text-xs sm:text-sm flex items-center gap-1">
            ✏️ ENTRAR →
          </div>
        </div>

        <div
          onClick={() => handlePlay("PLAY2")}
          className="game-card w-full flex items-center justify-between p-3.5 sm:p-4 px-5 active:scale-98 transition-all cursor-pointer gap-3"
        >
          <div className="flex items-center gap-3.5">
            <span className="text-base sm:text-lg shrink-0 w-9 h-9 rounded-full bg-[#0c1a2f] border border-[#79c6ff]/30 flex items-center justify-center font-black text-[#79c6ff]">
              2
            </span>
            <div className="flex flex-col">
              <div className="font-bold text-base sm:text-lg text-white">PLAY 2</div>
              <div className="text-[--muted] text-xs font-semibold tracking-wider uppercase">
                SENTENCES
              </div>
            </div>
          </div>
          <div className="text-[#79c6ff] font-bold text-xs sm:text-sm flex items-center gap-1">
            📝 ENTRAR →
          </div>
        </div>

        <div
          onClick={() => setSelectedSubmenu("PLAY3")}
          className="game-card w-full flex items-center justify-between p-3.5 sm:p-4 px-5 active:scale-98 transition-all cursor-pointer gap-3"
        >
          <div className="flex items-center gap-3.5">
            <span className="text-base sm:text-lg shrink-0 w-9 h-9 rounded-full bg-[#0c1a2f] border border-[#79c6ff]/30 flex items-center justify-center font-black text-[#79c6ff]">
              3
            </span>
            <div className="flex flex-col">
              <div className="font-bold text-base sm:text-lg text-white">PLAY 3</div>
              <div className="text-[--muted] text-xs font-semibold tracking-wider uppercase">
                TRANSLATE (60 PALABRAS)
              </div>
            </div>
          </div>
          <div className="text-[#79c6ff] font-bold text-xs sm:text-sm flex items-center gap-1">
            🎯 ENTRAR →
          </div>
        </div>

        <div
          onClick={() => setSelectedSubmenu("PLAY3_1")}
          className="game-card w-full flex items-center justify-between p-3.5 sm:p-4 px-5 active:scale-98 transition-all cursor-pointer gap-3"
        >
          <div className="flex items-center gap-3.5">
            <span className="text-sm sm:text-base shrink-0 w-9 h-9 rounded-full bg-[#0c1a2f] border border-[#79c6ff]/30 flex items-center justify-center font-black text-[#79c6ff]">
              3.1
            </span>
            <div className="flex flex-col">
              <div className="font-bold text-base sm:text-lg text-white">PLAY 3.1</div>
              <div className="text-[--muted] text-xs font-semibold tracking-wider uppercase">
                MATCH PAIRS (60 PALABRAS)
              </div>
            </div>
          </div>
          <div className="text-[#79c6ff] font-bold text-xs sm:text-sm flex items-center gap-1">
            🎯 ENTRAR →
          </div>
        </div>

        <div
          onClick={() => setSelectedSubmenu("PLAY3_2")}
          className="game-card w-full flex items-center justify-between p-3.5 sm:p-4 px-5 active:scale-98 transition-all cursor-pointer gap-3"
        >
          <div className="flex items-center gap-3.5">
            <span className="text-sm sm:text-base shrink-0 w-9 h-9 rounded-full bg-[#0c1a2f] border border-[#79c6ff]/30 flex items-center justify-center font-black text-[#79c6ff]">
              3.2
            </span>
            <div className="flex flex-col">
              <div className="font-bold text-base sm:text-lg text-white">PLAY 3.2</div>
              <div className="text-[--muted] text-xs font-semibold tracking-wider uppercase">
                TEST ESCRITURA (60 PALABRAS)
              </div>
            </div>
          </div>
          <div className="text-[#79c6ff] font-bold text-xs sm:text-sm flex items-center gap-1">
            ✍️ ENTRAR →
          </div>
        </div>

        <div
          onClick={() => handlePlay("PLAY4")}
          className="game-card w-full flex items-center justify-between p-3.5 sm:p-4 px-5 active:scale-98 transition-all cursor-pointer gap-3"
        >
          <div className="flex items-center gap-3.5">
            <span className="text-base sm:text-lg shrink-0 w-9 h-9 rounded-full bg-[#0c1a2f] border border-[#79c6ff]/30 flex items-center justify-center font-black text-[#79c6ff]">
              4
            </span>
            <div className="flex flex-col">
              <div className="font-bold text-base sm:text-lg text-white">PLAY 4</div>
              <div className="text-[--muted] text-xs font-semibold tracking-wider uppercase">
                MATCH PAIRS
              </div>
            </div>
          </div>
          <div className="text-[#79c6ff] font-bold text-xs sm:text-sm flex items-center gap-1">
            🧩 ENTRAR →
          </div>
        </div>

        <div
          onClick={() => handlePlay("PLAY4_1")}
          className="game-card w-full flex items-center justify-between p-3.5 sm:p-4 px-5 active:scale-98 transition-all cursor-pointer gap-3"
        >
          <div className="flex items-center gap-3.5">
            <span className="text-sm sm:text-base shrink-0 w-9 h-9 rounded-full bg-[#0c1a2f] border border-[#79c6ff]/30 flex items-center justify-center font-black text-[#79c6ff]">
              4.1
            </span>
            <div className="flex flex-col">
              <div className="font-bold text-base sm:text-lg text-white">PLAY 4.1</div>
              <div className="text-[--muted] text-xs font-semibold tracking-wider uppercase">
                MATCH AUDIO &amp; IPA (30 PALABRAS)
              </div>
            </div>
          </div>
          <div className="text-[#79c6ff] font-bold text-xs sm:text-sm flex items-center gap-1">
            🎧 ENTRAR →
          </div>
        </div>

        <div
          onClick={() => handlePlay("PLAY5")}
          className="game-card w-full flex items-center justify-between p-3.5 sm:p-4 px-5 active:scale-98 transition-all cursor-pointer gap-3"
        >
          <div className="flex items-center gap-3.5">
            <span className="text-base sm:text-lg shrink-0 w-9 h-9 rounded-full bg-[#0c1a2f] border border-[#79c6ff]/30 flex items-center justify-center font-black text-[#79c6ff]">
              5
            </span>
            <div className="flex flex-col">
              <div className="font-bold text-base sm:text-lg text-white">PLAY 5</div>
              <div className="text-[--muted] text-xs font-semibold tracking-wider uppercase">
                TEST 1 - ESCRITURA
              </div>
            </div>
          </div>
          <div className="text-[#79c6ff] font-bold text-xs sm:text-sm flex items-center gap-1">
            ✍️ ENTRAR →
          </div>
        </div>

        <div
          onClick={() => handlePlay("PLAY6")}
          className="game-card w-full flex items-center justify-between p-3.5 sm:p-4 px-5 active:scale-98 transition-all cursor-pointer gap-3"
        >
          <div className="flex items-center gap-3.5">
            <span className="text-base sm:text-lg shrink-0 w-9 h-9 rounded-full bg-[#0c1a2f] border border-[#79c6ff]/30 flex items-center justify-center font-black text-[#79c6ff]">
              6
            </span>
            <div className="flex flex-col">
              <div className="font-bold text-base sm:text-lg text-white">PLAY 6</div>
              <div className="text-[--muted] text-xs font-semibold tracking-wider uppercase">
                TEST 2 - AUDIO
              </div>
            </div>
          </div>
          <div className="text-[#79c6ff] font-bold text-xs sm:text-sm flex items-center gap-1">
            🎧 ENTRAR →
          </div>
        </div>

        <div
          onClick={() => handlePlay("PLAY7")}
          className="game-card w-full flex items-center justify-between p-3.5 sm:p-4 px-5 active:scale-98 transition-all cursor-pointer gap-3"
        >
          <div className="flex items-center gap-3.5">
            <span className="text-base sm:text-lg shrink-0 w-9 h-9 rounded-full bg-[#0c1a2f] border border-[#79c6ff]/30 flex items-center justify-center font-black text-[#79c6ff]">
              7
            </span>
            <div className="flex flex-col">
              <div className="font-bold text-base sm:text-lg text-white">PLAY 7</div>
              <div className="text-[--muted] text-xs font-semibold tracking-wider uppercase">
                AIR COMBAT
              </div>
            </div>
          </div>
          <div className="text-[#79c6ff] font-bold text-xs sm:text-sm flex items-center gap-1">
            ✈️ ENTRAR →
          </div>
        </div>

        <div
          onClick={() => handlePlay("PLAY8")}
          className="game-card w-full flex items-center justify-between p-3.5 sm:p-4 px-5 active:scale-98 transition-all cursor-pointer gap-3 border border-[#79c6ff]/40 bg-[#0c1a2f] hover:bg-[#132847]"
        >
          <div className="flex items-center gap-3.5">
            <span className="text-base sm:text-lg shrink-0 w-9 h-9 rounded-full bg-[#0c1a2f] border border-[#79c6ff]/50 flex items-center justify-center font-black text-[#79c6ff]">
              8
            </span>
            <div className="flex flex-col">
              <div className="font-bold text-base sm:text-lg text-white">PLAY 8</div>
              <div className="text-[--muted] text-xs font-semibold tracking-wider uppercase">
                AIR CHALLENGE (DESAFÍO EN EL AIRE)
              </div>
            </div>
          </div>
          <div className="text-[#79c6ff] font-bold text-xs sm:text-sm flex items-center gap-1">
            🚀 ENTRAR →
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

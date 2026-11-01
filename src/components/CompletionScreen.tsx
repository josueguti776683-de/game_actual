import React from "react";
import { Plane, Wrench } from "lucide-react";

interface CompletionScreenProps {
  playName: string;
  gradeText: string;
  totalErrors: number;
  onFastTest?: () => void;
  onAgain: () => void;
  onHome: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  playName,
  gradeText,
  totalErrors,
  onFastTest,
  onAgain,
  onHome,
}) => {
  const isCopa = totalErrors === 0;

  // NOTA calculation:
  // 0 errores: 100
  // > 0 (1 a 5 errores): 84
  // > 5 errores: 70
  let nota = "100";
  if (totalErrors > 5) {
    nota = "70";
  } else if (totalErrors > 0) {
    nota = "84";
  } else {
    nota = "100";
  }

  const title = isCopa ? "GLORIA Y VICTORIA AVIADOR" : "NO TE RINDAS";
  const message = isCopa
    ? "BIENVENIDO AVIADOR SIGA A PRENDIENDO Y NO SE RINDA, NO SE RINDA, POR QUE ASI LLEGARÁS A DONDE OTROS NO PUEDEN LLEGAR."
    : "NO LLORES COMO UNA NENITA, APRENDE DE TUS ERRORES, SE EL MEJOR CADA DIA.";

  return (
    <div className="animate-in slide-in-from-bottom flex flex-col items-center gap-3.5 sm:gap-4 p-2 sm:p-4 my-auto w-full max-w-[500px] mx-auto">
      {/* 1. Medalla o Copa, en la parte de arriba en el centro grande y llamativo */}
      <div className="text-[4.5rem] sm:text-[5.5rem] leading-none mb-0.5 filter drop-shadow-[0_0_15px_rgba(255,215,0,0.4)] animate-bounce-short">
        {isCopa ? "🏆" : "🥇"}
      </div>

      {/* 2. Debajo título */}
      <div
        className={`font-[900] text-xl sm:text-2xl md:text-3xl tracking-wider uppercase text-center leading-tight ${
          isCopa ? "text-[#79c6ff]" : "text-amber-400"
        }`}
      >
        {title}
      </div>

      {/* 3. Contorno celeste que encierra el mensaje y el cuadro de detalles */}
      <div className="bg-[#0a182c]/95 border-2 border-[#79c6ff]/60 rounded-2xl p-4 sm:p-5 w-full shadow-[0_0_20px_rgba(121,198,255,0.18)] flex flex-col gap-3.5 my-1">
        {/* Mensaje */}
        <div className="font-extrabold text-sm sm:text-base tracking-wide uppercase text-center leading-relaxed text-white break-words px-1">
          {message}
        </div>

        {/* Separador visual con icono mediano: Avión (Copa) o Llave Cresen de Mecánico (Medalla) */}
        <div className="flex items-center justify-center gap-3 my-0.5">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#79c6ff]/40 to-transparent"></div>
          <div
            className={`p-2.5 rounded-full border shadow-md flex items-center justify-center transition-all ${
              isCopa
                ? "bg-[#0c2242] border-[#79c6ff]/60 text-[#79c6ff] shadow-[0_0_12px_rgba(121,198,255,0.35)]"
                : "bg-[#251b0e] border-amber-400/60 text-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.3)]"
            }`}
          >
            {isCopa ? (
              <Plane size={30} className="stroke-[2.2] animate-pulse" />
            ) : (
              <Wrench size={30} className="stroke-[2.2]" />
            )}
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#79c6ff]/40 to-transparent"></div>
        </div>

        {/* Cuadro de Bitácora / Detalles */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-[#79c6ff]/20">
            <span className="text-[#94a3b8] font-bold text-xs uppercase tracking-wider">
              NOMBRE:
            </span>
            <span className="text-[#79c6ff] font-extrabold text-sm sm:text-base uppercase text-right">
              {playName}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-[#79c6ff]/20">
            <span className="text-[#94a3b8] font-bold text-xs uppercase tracking-wider">
              GRADO:
            </span>
            <span className="text-white font-extrabold text-sm sm:text-base uppercase text-right">
              {gradeText}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-[#79c6ff]/20">
            <span className="text-[#94a3b8] font-bold text-xs uppercase tracking-wider">
              ERRORES:
            </span>
            <span
              className={`font-extrabold text-sm sm:text-base uppercase ${
                isCopa ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {totalErrors}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#94a3b8] font-bold text-xs uppercase tracking-wider">
              NOTA:
            </span>
            <span
              className={`font-extrabold text-sm sm:text-base uppercase ${
                isCopa
                  ? "text-emerald-400"
                  : totalErrors <= 5
                  ? "text-[#79c6ff]"
                  : "text-amber-400"
              }`}
            >
              {nota}%
            </span>
          </div>
        </div>
      </div>

      {/* 4. Debajo de eso las 3 opciones: FAST-TEST, AGAIN y HOME */}
      <div className="flex flex-col w-full gap-2.5 sm:gap-3 mt-1.5">
        <button
          onClick={onFastTest || onAgain}
          className="main-btn py-3.5 px-8 text-base sm:text-lg shadow-lg w-full cursor-pointer uppercase font-extrabold bg-gradient-to-r from-[#182f4d] to-[#0c1a2f] border border-[#79c6ff]/50 text-[#79c6ff] hover:bg-[#79c6ff]/20 active:scale-98 transition-all"
        >
          FAST-TEST
        </button>
        <button
          onClick={onAgain}
          className="main-btn py-3.5 px-8 text-base sm:text-lg shadow-lg w-full cursor-pointer uppercase font-extrabold active:scale-98 transition-all"
        >
          AGAIN
        </button>
        <button
          onClick={onHome}
          className="home-btn py-3.5 px-8 text-base sm:text-lg shadow-lg w-full font-black border-none text-black cursor-pointer uppercase text-center active:scale-98 transition-all"
        >
          HOME
        </button>
      </div>
    </div>
  );
};

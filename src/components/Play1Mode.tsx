import React, { useState, useEffect, useMemo } from "react";
import { levelsData } from "../data";
import { VocabItem } from "../types";
import { PronunciationButton } from "./PronunciationButton";
import { getRandomMessage } from "../motivation";
import { getUSIPA } from "../utils/ipa";
import { Play4T1Mode } from "./Play4T1Mode";
import { CompletionScreen } from "./CompletionScreen";
import { AirplaneSideView } from "./AirplaneSideView";

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const Play1Mode = ({
  levelId,
  onBack,
  group = 1,
}: {
  levelId: number;
  onBack: () => void;
  group?: 1 | 2;
}) => {
  const isLestime = levelId === 999 || levelId === 909;

  const level = useMemo(() => {
    if (isLestime) {
      const wordCount = levelId === 909 ? 9 : 15;
      const allVocab: VocabItem[] = [];
      Object.values(levelsData).forEach((l) => {
        if (l && l.vocab) {
          allVocab.push(...l.vocab);
        }
      });
      // Deduplicate words so there are no repeating identical terms in the mixed list
      const uniqueVocab = Array.from(new Map(allVocab.map(v => [v.word, v])).values());
      const shuffled = [...uniqueVocab].sort(() => 0.5 - Math.random());
      return {
        id: levelId,
        name: `MODE: 5 MINUTES (${wordCount} WORDS)`,
        vocab: shuffled.slice(0, wordCount),
        sentences: [],
        vocabPlay3: []
      };
    }

    const fullLevel = levelsData[levelId];
    if (!fullLevel) return null;

    const rawVocab = fullLevel.vocab || [];
    // Group 1: 0 to 15 (first 15 words)
    // Group 2: 15 to 30 (remaining 15 words)
    const slicedVocab = group === 2 ? rawVocab.slice(15, 30) : rawVocab.slice(0, 15);

    return {
      ...fullLevel,
      vocab: slicedVocab,
    };
  }, [levelId, isLestime, group]);

  const [queue, setQueue] = useState<VocabItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<
    "PREVIEW" | "GAME" | "PENALTY" | "SUCCESS" | "COMPLETE"
  >("PREVIEW");
  const [inputValue, setInputValue] = useState("");
  const [penaltyInputValue, setPenaltyInputValue] = useState("");
  const [hasPenaltyTypo, setHasPenaltyTypo] = useState(false);
  const [penaltyCount, setPenaltyCount] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [isFastTestMode, setIsFastTestMode] = useState(false);

  const [isFuncOpen, setIsFuncOpen] = useState(true);
  const [isTransOpen, setIsTransOpen] = useState(true);

  const victoryMsg = useMemo(
    () => getRandomMessage("COMPLETE_VICTORY"),
    [phase],
  );
  const retryMsg = useMemo(() => getRandomMessage("COMPLETE_RETRY"), [phase]);
  const penaltyMsg = useMemo(
    () => getRandomMessage("PENALTY"),
    [phase, totalErrors],
  );
  const successMsg = useMemo(
    () => getRandomMessage("SUCCESS", currentIndex, queue.length),
    [phase, currentIndex, queue.length],
  );

  const initGame = () => {
    if (level) {
      setQueue(shuffleArray(level.vocab));
      setCurrentIndex(0);
      setPhase("PREVIEW");
      setPenaltyCount(0);
      setTotalErrors(0);
    }
  };

  useEffect(() => {
    initGame();
  }, [level]);

  const handlePenaltyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPenaltyInputValue(val);

    if (!currentWord) return;

    const target = currentWord.word.toUpperCase().trim();
    const typed = val.toUpperCase();

    if (!typed) {
      setHasPenaltyTypo(false);
      return;
    }

    if (target.startsWith(typed)) {
      setHasPenaltyTypo(false);

      if (typed === target) {
        const nextCount = penaltyCount + 1;
        setPenaltyCount(nextCount);
        setPenaltyInputValue("");

        if (nextCount >= 3) {
          setTimeout(() => {
            setPhase("GAME");
            setInputValue("");
            setPenaltyCount(0);
            setPenaltyInputValue("");
            setHasPenaltyTypo(false);
          }, 250);
        }
      }
    } else {
      // Made a typo / finger slip: outline blinks red and count resets to 0
      setHasPenaltyTypo(true);
      if (penaltyCount > 0) {
        setPenaltyCount(0);
      }
    }
  };

  if (queue.length === 0) return null;

  const currentWord = queue[currentIndex];
  const progressPct = ((currentIndex + 1) / queue.length) * 100;

  const handleLearnClick = () => {
    setPhase("GAME");
    setInputValue("");
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (inputValue.trim().toUpperCase() === currentWord.word.toUpperCase()) {
      setPhase("SUCCESS");
    } else {
      setTotalErrors((prev) => prev + 1);
      setPhase("PENALTY");
      setPenaltyCount(0);
      setPenaltyInputValue("");
      setHasPenaltyTypo(false);

      // Reinsert the failed word further down in the queue (skipping 2-3 words or near the end)
      setQueue((prevQueue) => {
        const failedWord = prevQueue[currentIndex];
        const newQueue = [...prevQueue];
        const insertOffset = 3 + Math.floor(Math.random() * 2); // 3 to 4 words ahead
        const targetIndex = Math.min(currentIndex + insertOffset, newQueue.length);
        newQueue.splice(targetIndex, 0, failedWord);
        return newQueue;
      });
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleNextTerm = () => {
    if (currentIndex + 1 >= queue.length) {
      setPhase("COMPLETE");
    } else {
      setCurrentIndex((c) => c + 1);
      setPhase("PREVIEW");
      setInputValue("");
    }
  };

  if (isFastTestMode && level) {
    return (
      <Play4T1Mode
        levelId={levelId}
        group={group}
        customVocab={level.vocab}
        onBack={() => setIsFastTestMode(false)}
      />
    );
  }

  if (phase === "COMPLETE") {
    return (
      <div className="min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
        <CompletionScreen
          playName={isLestime ? (level?.name || "MODO 5 MINUTOS") : `PLAY 1 - GRUPO ${group}`}
          gradeText={isLestime ? "MODO 5 MINUTOS" : `NIVEL ${levelId}`}
          totalErrors={totalErrors}
          onFastTest={() => setIsFastTestMode(true)}
          onAgain={initGame}
          onHome={onBack}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-[680px] flex flex-col items-center mb-3 sm:mb-4 px-1">
        <div className="dict-header text-center w-full">
          <h1 className="text-2xl sm:text-3xl md:text-[2.2rem] font-[900] uppercase m-0 leading-tight">
            {isLestime ? "MODE: 5 MINUTES" : "PLAY 1 - VOCABULARY"}
          </h1>
          <div className="text-[--muted] text-[0.96rem] font-[600] mt-1.5 uppercase tracking-wide">
            {isLestime ? (levelId === 909 ? "9 WORDS" : "15 WORDS") : `${level?.name || `LEVEL ${levelId}`} • GRUPO ${group}`}
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

      <div className="play-card !mt-0 !mb-2 relative overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="text-center text-[--muted] text-[0.9rem] font-[600] mb-2 tracking-wide uppercase">
          Word {Math.min(currentIndex + 1, queue.length)} of {queue.length}
        </div>
        <div className="progress-bar mb-3 sm:mb-4">
          <div
            className="progress-fill"
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>

      {phase === "PREVIEW" && (
        <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-4">
          
          {/* EXPLANATION BOX */}
          {currentWord?.func && (
            <div className="border border-[#334155] rounded-[20px] p-4 sm:p-5 w-full flex flex-col gap-3">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setIsFuncOpen(!isFuncOpen)}
              >
                <div className="icon-btn shrink-0">E</div>
                <span className="font-bold tracking-wider uppercase text-white">
                  EXPLANATION
                </span>
              </div>
              {isFuncOpen && (
                <div className="bg-[#0f172a] rounded-lg p-3.5 sm:p-4 border border-[#334155] text-[--text] leading-relaxed text-sm mt-1">
                  {currentWord.func}
                </div>
              )}
            </div>
          )}

          {/* WORD & TRANSLATION BOX */}
          <div className="border border-[#334155] rounded-[20px] p-4 sm:p-5 w-full flex flex-col gap-3.5">
            <div className="flex flex-row items-center justify-start gap-3.5 w-full flex-wrap">
              <div
                className="icon-btn cursor-pointer shrink-0"
                onClick={() => setIsTransOpen(!isTransOpen)}
              >
                T
              </div>
              <span className="font-bold tracking-wider uppercase text-white shrink-0">WORD:</span>
              
              <span className="word-badge text-sm sm:text-base md:text-[1.2rem] px-4 sm:px-6 py-2 uppercase flex items-center justify-center max-w-full break-words">
                {currentWord.displayWord}
              </span>
            </div>
            
            {isTransOpen && (
              <div className="bg-[#0f172a] rounded-xl p-3.5 border border-[#334155] text-white mt-0.5">
                <span className="font-bold text-[#94a3b8]">S: </span>
                <span className="tracking-wide break-words font-semibold text-white">{currentWord.trans}</span>
              </div>
            )}

            {/* AUDIO & US IPA BOX (ALWAYS VISIBLE) */}
            <div className="bg-[#0f172a] rounded-xl p-3 sm:p-3.5 border border-[#334155] flex items-center gap-3.5 flex-wrap mt-0.5">
              <span className="font-bold tracking-wider uppercase text-white shrink-0">A:</span>
              <PronunciationButton
                text={currentWord.word}
                size={20}
                autoPlay={isLestime}
                className="bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] hover:bg-[#79c6ff]/40 p-2 rounded-full shrink-0 shadow-[0_0_10px_rgba(121,198,255,0.2)] cursor-pointer"
              />
              <span className="text-[#79c6ff] font-mono text-base sm:text-lg font-bold tracking-wider">
                {getUSIPA(currentWord.word)}
              </span>
            </div>
          </div>
          
          {/* LEARN BUTTON */}
          <button
            onClick={handleLearnClick}
            className="main-btn w-full py-3.5 sm:py-4 text-lg sm:text-xl tracking-widest shadow-lg uppercase mt-2 cursor-pointer"
          >
            LEARN
          </button>
          
          <p className="text-[--muted] text-xs sm:text-sm text-center mt-1">
            Type the word in English. The translation is only a reference.
          </p>
        </div>
      )}

      {phase === "GAME" && (
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-3 sm:gap-4 items-center justify-start flex-1 animate-in zoom-in-95 mt-1 sm:mt-2 py-0">
          {/* SPANISH WORD TO WRITE IN ENGLISH */}
          <div className="flex flex-col items-center gap-2.5 w-full bg-[#0f172a] border border-[#334155] rounded-2xl p-4 sm:p-5 text-center shadow-md">
            <span className="text-[#94a3b8] font-bold text-xs uppercase tracking-wider">
              PALABRA EN ESPAÑOL:
            </span>
            <div className="text-white font-normal text-xl sm:text-2xl md:text-3xl tracking-wide break-words max-w-full">
              {currentWord.trans}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 w-full mt-1">
            <span className="text-[--muted] font-bold text-xs uppercase tracking-wider">
              ESCRIBE EN INGLÉS:
            </span>
            <input
              type="text"
              placeholder="WRITE HERE.."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              className="main-input w-full py-3.5 sm:py-4 px-4 text-base sm:text-lg md:text-xl font-normal tracking-wider uppercase"
              disabled={phase !== "GAME"}
            />
            <button
              type="submit"
              className="home-btn w-full max-w-[280px] sm:max-w-[340px] py-3.5 sm:py-4 px-8 font-black text-base sm:text-lg uppercase cursor-pointer border-none shadow-lg mt-2 tracking-widest flex items-center justify-center"
            >
              VERIFY
            </button>
          </div>

          <p className="text-[--muted] text-xs sm:text-sm mt-1 text-center">
            Type the word in English. The translation is above for reference.
          </p>
        </form>
      )}

      {phase === "PENALTY" && (
        <div className="alert animate-in zoom-in w-full flex flex-col items-center gap-3.5 p-4 sm:p-6 my-auto">
          <div className="text-[#f87171] font-black text-lg sm:text-xl tracking-widest uppercase text-center">
            TECHNICAL DISCREPANCY
          </div>
          <div className="text-white font-medium text-xs sm:text-sm text-center tracking-wide uppercase">
            REPEAT THE WORD 3 TIMES:
          </div>

          {/* 1. Palabra en inglés (sin negrita normal para que quepan palabras largas) */}
          <div className="text-xl sm:text-2xl md:text-3xl font-normal text-white bg-red-900/40 px-5 sm:px-7 py-2.5 rounded-xl border border-red-500/50 break-words text-center max-w-full tracking-wide uppercase shadow-lg">
            {currentWord.word}
          </div>

          {/* 2. Debajo de la palabra: Icono de audio + Pronunciación IPA */}
          <div className="flex items-center gap-3 justify-center my-0.5">
            <PronunciationButton
              text={currentWord.word}
              size={24}
              autoPlay
              cascadeTimes={1}
              className="bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] hover:bg-[#79c6ff]/40 p-2 rounded-full shrink-0 shadow-[0_0_10px_rgba(121,198,255,0.3)]"
            />
            <span className="text-[#79c6ff] font-mono text-base sm:text-lg font-bold tracking-wider">
              {getUSIPA(currentWord.word)}
            </span>
          </div>

          {/* 3. Cuadro de texto automático y dinámico */}
          <div className="w-full max-w-[340px] mt-1">
            <input
              type="text"
              inputMode="text"
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck="false"
              className={`w-full py-3 px-4 text-base sm:text-lg font-normal text-center uppercase tracking-wider rounded-xl transition-all outline-none cursor-text select-text pointer-events-auto ${
                hasPenaltyTypo
                  ? "border-2 border-red-500 bg-red-950/40 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.7)] animate-pulse"
                  : "main-input text-white"
              }`}
              placeholder="TYPE HERE..."
              value={penaltyInputValue}
              onChange={handlePenaltyInputChange}
              autoComplete="off"
            />
          </div>

          {/* 4. Debajo del cuadro de texto: Contador de palabras */}
          <div className="text-xl sm:text-2xl font-bold font-mono text-[#fca5a5] mt-0.5">
            {penaltyCount} / 3
          </div>

          {/* 5. Regla y Frase de motivación al final */}
          <div className="text-[#ccc] text-[0.8rem] flex flex-col gap-0.5 w-full mt-0.5 text-center">
            <span>PENALTY +1 (Word added to queue)</span>
            <span className="text-[#f87171] font-bold">
              {penaltyMsg}
            </span>
          </div>
        </div>
      )}

      {phase === "SUCCESS" && (() => {
        const progressRatio = queue.length > 1 ? currentIndex / (queue.length - 1) : 1;
        const currentFlightLevel = Math.min(390, Math.max(20, Math.round(((currentIndex + 1) / queue.length) * 390)));
        const flightPhaseText = progressRatio <= 0.35 ? "TAKEOFF" : progressRatio <= 0.75 ? "CLIMBING" : "CRUISING";
        const leftPercent = 8 + progressRatio * 82;
        // En Takeoff rueda sobre la pista, luego asciende
        const verticalLift = progressRatio <= 0.2 ? 0 : (progressRatio - 0.2) * 42;
        // Ángulo de cabeceo realista: 0 en carrera de despegue, -14° (nariz arriba) en rotación/ascenso, se nivela a -4° en crucero
        const pitchAngle = progressRatio <= 0.15 
          ? 0 
          : progressRatio <= 0.75 
            ? -14 
            : -5;

        return (
          <div className="success animate-in slide-in-from-bottom flex flex-col items-center gap-4 sm:gap-5 p-5 sm:p-7 my-auto">
            <div className="font-black text-lg sm:text-xl md:text-2xl tracking-wide uppercase text-center leading-snug break-words px-2 text-emerald-400">
              {successMsg}
            </div>

            {/* PISTA Y AVIÓN EN ASCENSO DINÁMICO DE PRINCIPIO A FIN */}
            <div className="flex flex-col items-center justify-center my-1 w-full max-w-[320px]">
              {/* Radar y Cielo con Pista de Aeropuerto 3D Continua y Avión en Vuelo */}
              <div className="relative w-full h-26 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-xl border border-emerald-500/30 shadow-inner">
                {/* Nube y Altitud de Destino FL390 en el cielo */}
                <div className="absolute right-3 top-2.5 flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-300 uppercase tracking-tight bg-slate-900/90 px-2 py-0.5 rounded-full border border-emerald-500/40 z-10 shadow">
                  <span>FL390</span>
                  <span>☁️</span>
                </div>

                {/* SVG: PISTA LARGA Y REALISTA DE AEROPUERTO EN PERSPECTIVA (FIJA EN LA BASE) */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-0"
                  viewBox="0 0 320 100"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="runwayAsphalt" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="40%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    <linearGradient id="grassBed" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#064e3b" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#022c22" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Franja de terreno / césped del aeródromo */}
                  <rect x="0" y="66" width="320" height="34" fill="url(#grassBed)" />

                  {/* Cuerpo principal del asfalto de la pista en perspectiva 3D */}
                  <polygon
                    points="6,72 314,72 318,94 2,94"
                    fill="url(#runwayAsphalt)"
                    stroke="#475569"
                    strokeWidth="1"
                  />

                  {/* Borde superior de pista (Edge Line) */}
                  <line x1="6" y1="72.5" x2="314" y2="72.5" stroke="#94a3b8" strokeWidth="1.2" strokeOpacity="0.7" />
                  {/* Borde inferior de pista (Edge Line) */}
                  <line x1="2" y1="93.5" x2="318" y2="93.5" stroke="#94a3b8" strokeWidth="1.2" strokeOpacity="0.7" />

                  {/* Rayas de Umbral (Threshold Piano Keys) al inicio de la pista */}
                  <g fill="#f8fafc" opacity="0.9">
                    <rect x="14" y="74.5" width="3" height="17" rx="0.5" />
                    <rect x="19" y="74.5" width="3" height="17" rx="0.5" />
                    <rect x="24" y="74.5" width="3" height="17" rx="0.5" />
                    <rect x="29" y="74.5" width="3" height="17" rx="0.5" />
                    <rect x="34" y="74.5" width="3" height="17" rx="0.5" />
                  </g>

                  {/* Marcas de Zona de Toma de Contacto (Touchdown Zone Bars) */}
                  <g fill="#f8fafc" opacity="0.85">
                    <rect x="46" y="75" width="10" height="2.5" rx="0.5" />
                    <rect x="46" y="88.5" width="10" height="2.5" rx="0.5" />
                    <rect x="64" y="75" width="10" height="2.5" rx="0.5" />
                    <rect x="64" y="88.5" width="10" height="2.5" rx="0.5" />
                  </g>

                  {/* Línea Central (Centerline) de pista larga en perspectiva continua */}
                  <g fill="#f8fafc" opacity="0.9">
                    <rect x="85" y="82" width="18" height="2" rx="0.5" />
                    <rect x="115" y="82" width="18" height="2" rx="0.5" />
                    <rect x="145" y="82" width="18" height="2" rx="0.5" />
                    <rect x="175" y="82" width="18" height="2" rx="0.5" />
                    <rect x="205" y="82" width="18" height="2" rx="0.5" />
                    <rect x="235" y="82" width="18" height="2" rx="0.5" />
                    <rect x="265" y="82" width="18" height="2" rx="0.5" />
                  </g>

                  {/* Umbral final de pista (End threshold bars) */}
                  <g fill="#f8fafc" opacity="0.9">
                    <rect x="292" y="74.5" width="2.5" height="17" rx="0.5" />
                    <rect x="296.5" y="74.5" width="2.5" height="17" rx="0.5" />
                    <rect x="301" y="74.5" width="2.5" height="17" rx="0.5" />
                  </g>

                  {/* Luces verdes de cabecera de pista (Threshold Green Lights) */}
                  <circle cx="8" cy="73" r="1.8" fill="#4ade80" />
                  <circle cx="8" cy="83" r="1.8" fill="#4ade80" />
                  <circle cx="8" cy="93" r="1.8" fill="#4ade80" />

                  {/* Luces rojas de fin de pista */}
                  <circle cx="312" cy="73" r="1.8" fill="#ef4444" />
                  <circle cx="314" cy="83" r="1.8" fill="#ef4444" />
                  <circle cx="316" cy="93" r="1.8" fill="#ef4444" />
                </svg>

                {/* AVIÓN EN VISTA DE PERFIL LATERAL DESPEGANDO Y ASCENDIENDO LIBREMENTE */}
                <div 
                  className="absolute transition-all duration-700 ease-out z-10 pointer-events-none"
                  style={{
                    left: `${leftPercent}%`,
                    bottom: `${14 + verticalLift}px`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <AirplaneSideView pitchAngle={pitchAngle} />
                </div>
              </div>

              {/* Etiqueta de telemetría y altitud */}
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 tracking-wider uppercase mt-2">
                <span className="text-emerald-500/90">{flightPhaseText}:</span>
                <span className="text-white bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-500/40 font-mono">
                  FL{currentFlightLevel.toString().padStart(3, "0")} ↗
                </span>
                <span className="text-[11px] text-emerald-300/80">({currentIndex + 1}/{queue.length})</span>
              </div>
            </div>

            <button
              onClick={handleNextTerm}
              className="main-btn py-3 px-8 text-base sm:text-lg shadow-lg cursor-pointer"
            >
              NEXT TERM
            </button>
          </div>
        );
      })()}
    </div>
  </div>
);
};

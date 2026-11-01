import React, { useState, useEffect, useRef, useMemo } from "react";
import { levelsData } from "../data";
import { SentenceItem } from "../types";
import { PronunciationButton } from "./PronunciationButton";
import { unlockAudioEngine } from "../utils/audioEngine";
import { getRandomMessage } from "../motivation";
import { getUSIPA } from "../utils/ipa";
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

const HighlightedText = ({
  text,
  keywords,
}: {
  text: string;
  keywords: string[];
}) => {
  if (!keywords || keywords.length === 0)
    return <span dangerouslySetInnerHTML={{ __html: text }} />;

  let result = text;
  const validKw = keywords.filter(Boolean).sort((a, b) => b.length - a.length);

  validKw.forEach((kw) => {
    const safeKw = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp("(" + safeKw + ")", "gi");
    result = result.replace(regex, '<span class="keyword-highlight">$1</span>');
  });

  return <span dangerouslySetInnerHTML={{ __html: result }} />;
};

export const Play2Mode = ({
  levelId,
  onBack,
}: {
  levelId: number;
  onBack: () => void;
}) => {
  const level = levelsData[levelId];
  const [queue, setQueue] = useState<SentenceItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<
    "PREVIEW" | "GAME" | "PENALTY" | "SUCCESS" | "COMPLETE"
  >("PREVIEW");

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input1Done, setInput1Done] = useState(false);
  const [input2Done, setInput2Done] = useState(false);
  const [activeBox, setActiveBox] = useState<1 | 2>(1);

  // For penalty
  const [penaltyTarget, setPenaltyTarget] = useState("");
  const [penaltyCount, setPenaltyCount] = useState(0);
  const [penaltyInput, setPenaltyInput] = useState("");
  const [hasPenaltyTypo, setHasPenaltyTypo] = useState(false);
  const [totalErrors, setTotalErrors] = useState(0);

  const [isTransOpen, setIsTransOpen] = useState(true);

  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const penaltyInputRef = useRef<HTMLInputElement>(null);

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
    setQueue(shuffleArray(level.sentences));
    setCurrentIndex(0);
    setTotalErrors(0);
    resetGameState();
  };

  const resetGameState = () => {
    setPhase("PREVIEW");
    setInput1("");
    setInput2("");
    setInput1Done(false);
    setInput2Done(false);
    setActiveBox(1);
    setPenaltyCount(0);
    setPenaltyInput("");
    setHasPenaltyTypo(false);
  };

  useEffect(() => {
    unlockAudioEngine();
    initGame();
  }, [levelId]);

  const currentItem = queue[currentIndex];
  const keyword1 = currentItem?.keywords?.[0] || "";
  const keyword2 = currentItem?.keywords?.[1] || "";
  const spanishKw1 = currentItem?.keywordsSpanish?.[0] || "";
  const spanishKw2 = currentItem?.keywordsSpanish?.[1] || "";

  // Auto-focus effects for GAME and PENALTY phases
  useEffect(() => {
    if (phase === "PENALTY") {
      const timer = setTimeout(() => {
        penaltyInputRef.current?.focus();
      }, 120);
      return () => clearTimeout(timer);
    } else if (phase === "GAME") {
      const timer = setTimeout(() => {
        if (!input1Done && activeBox === 1) {
          input1Ref.current?.focus();
        } else if (!input2Done && activeBox === 2) {
          input2Ref.current?.focus();
        } else if (!input1Done) {
          input1Ref.current?.focus();
        } else if (!input2Done) {
          input2Ref.current?.focus();
        }
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [phase, activeBox, input1Done, input2Done]);

  const handlePenaltyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPenaltyInput(val);

    if (!penaltyTarget) return;

    const target = penaltyTarget.toUpperCase().trim();
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
        setPenaltyInput("");

        if (nextCount >= 3) {
          setTimeout(() => {
            setPhase("GAME");
            if (penaltyTarget === keyword1) {
              setInput1("");
              setInput1Done(false);
              setActiveBox(1);
              setTimeout(() => input1Ref.current?.focus(), 150);
            } else if (penaltyTarget === keyword2) {
              setInput2("");
              setInput2Done(false);
              setActiveBox(2);
              setTimeout(() => input2Ref.current?.focus(), 150);
            }
            setPenaltyCount(0);
            setPenaltyInput("");
            setHasPenaltyTypo(false);
          }, 250);
        }
      }
    } else {
      setHasPenaltyTypo(true);
      if (penaltyCount > 0) {
        setPenaltyCount(0);
      }
    }
  };

  if (queue.length === 0) return null;

  const progressPct = ((currentIndex + 1) / queue.length) * 100;

  const triggerPenalty = (failedWord: string) => {
    setPenaltyTarget(failedWord);
    setTotalErrors((prev) => prev + 1);
    setPhase("PENALTY");
    setPenaltyInput("");
    setPenaltyCount(0);
    setHasPenaltyTypo(false);

    // Reinsert sentence in queue to reinforce learning
    setQueue((prevQueue) => {
      const failedSentence = prevQueue[currentIndex];
      const newQueue = [...prevQueue];
      const insertOffset = 3 + Math.floor(Math.random() * 2);
      const targetIndex = Math.min(currentIndex + insertOffset, newQueue.length);
      newQueue.splice(targetIndex, 0, failedSentence);
      return newQueue;
    });
  };

  const verifyBox = (boxNum: 1 | 2) => {
    if (boxNum === 1) {
      const text1 = input1.trim().toUpperCase();
      const target1 = keyword1.trim().toUpperCase();

      if (!text1) {
        input1Ref.current?.focus();
        return;
      }

      if (text1 === target1) {
        setInput1Done(true);
        if (!keyword2 || input2Done) {
          setPhase("SUCCESS");
        } else {
          setActiveBox(2);
          setTimeout(() => input2Ref.current?.focus(), 150);
        }
      } else {
        triggerPenalty(keyword1);
      }
    } else if (boxNum === 2 && keyword2) {
      const text2 = input2.trim().toUpperCase();
      const target2 = keyword2.trim().toUpperCase();

      if (!text2) {
        input2Ref.current?.focus();
        return;
      }

      if (text2 === target2) {
        setInput2Done(true);
        if (input1Done) {
          setPhase("SUCCESS");
        } else {
          setActiveBox(1);
          setTimeout(() => input1Ref.current?.focus(), 150);
        }
      } else {
        triggerPenalty(keyword2);
      }
    }
  };

  const handleGameSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input1Done) {
      verifyBox(1);
    } else if (keyword2 && !input2Done) {
      verifyBox(2);
    }
  };

  const handleLearnClick = () => {
    setPhase("GAME");
    setInput1("");
    setInput2("");
    setInput1Done(false);
    setInput2Done(false);
    setActiveBox(1);
  };

  if (phase === "COMPLETE") {
    return (
      <div className="min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
        <CompletionScreen
          playName="PLAY 2 • ORACIONES & AUDIOS"
          gradeText={`NIVEL ${levelId}`}
          totalErrors={totalErrors}
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
            PLAY 2 - SENTENCES
          </h1>
          <div className="text-[--muted] text-[0.96rem] font-[600] mt-1.5 uppercase tracking-wide">
            {level?.name || `LEVEL ${levelId}`}
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

      <div className="play-card !mt-0 !mb-2 animate-in fade-in zoom-in duration-300">
        <div className="text-center text-[--muted] text-[0.9rem] font-[600] mb-2 tracking-wide uppercase">
          Sentence {Math.min(currentIndex + 1, queue.length)} of {queue.length}
        </div>
        <div className="progress-bar mb-4 sm:mb-5">
          <div
            className="progress-fill"
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>

      {phase === "PREVIEW" && (
        <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-4">
          {/* SENTENCE & TRANSLATION BOX */}
          <div className="border border-[#334155] rounded-[20px] p-4 sm:p-5 w-full flex flex-col gap-4">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-row items-center gap-3">
                <div
                  className="icon-btn cursor-pointer shrink-0"
                  onClick={() => setIsTransOpen(!isTransOpen)}
                >
                  T
                </div>
                <span className="font-bold tracking-wider uppercase text-white">SENTENCE:</span>
              </div>
              
              <div className="sentence-box text-base sm:text-lg md:text-[1.2rem] p-3 sm:p-5 uppercase flex flex-col items-start gap-3 mt-2">
                <div className="text-base sm:text-lg md:text-[1.2rem] normal-case tracking-wide font-medium text-white break-words">
                  <HighlightedText
                    text={currentItem.english}
                    keywords={currentItem.keywords}
                  />
                </div>
              </div>
            </div>
            
            {isTransOpen && (
              <div className="mt-1 text-white text-sm sm:text-base bg-[#0f172a] rounded-xl p-3.5 border border-[#334155]">
                <span className="font-bold text-[#94a3b8]">S: </span>
                <span className="tracking-wide text-sm sm:text-base md:text-[1.1rem]">
                  <HighlightedText
                    text={currentItem.spanish}
                    keywords={currentItem.keywordsSpanish || []}
                  />
                </span>
              </div>
            )}

            {/* AUDIO CONTROLS (ALWAYS VISIBLE BELOW SPANISH TRANSLATION) */}
            <div className="bg-[#0f172a] rounded-xl p-3 sm:p-3.5 border border-[#334155] flex items-center gap-3.5 flex-wrap">
              <span className="font-bold tracking-wider uppercase text-white shrink-0">A:</span>
              <div className="flex items-center gap-3 flex-wrap">
                {/* NORMAL SPEED AUDIO */}
                <PronunciationButton
                  text={currentItem.english}
                  size={19}
                  speechRate={1.0}
                  label="NORMAL"
                  title="Pronunciación en Velocidad Normal"
                  className="bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] hover:bg-[#79c6ff]/40 px-3.5 py-2 rounded-xl shadow-[0_0_10px_rgba(121,198,255,0.2)] text-xs font-bold uppercase tracking-wider cursor-pointer"
                />

                {/* SLOW SPEED AUDIO */}
                <PronunciationButton
                  text={currentItem.english}
                  size={19}
                  speechRate={0.65}
                  label="LENTO"
                  title="Pronunciación Lenta"
                  className="bg-amber-400/20 border border-amber-400 text-amber-300 hover:bg-amber-400/40 px-3.5 py-2 rounded-xl shadow-[0_0_10px_rgba(251,191,36,0.2)] text-xs font-bold uppercase tracking-wider cursor-pointer"
                />
              </div>
            </div>
          </div>
          
          {/* LEARN BUTTON */}
          <button
            onClick={handleLearnClick}
            className="main-btn w-full py-4 text-xl tracking-widest shadow-lg uppercase mt-2 cursor-pointer"
          >
            LEARN
          </button>
          
          <p className="text-[--muted] text-sm text-center mt-2">
            Aprende las 2 palabras clave y pulsa LEARN para escribirlas en inglés.
          </p>
        </div>
      )}

      {phase === "GAME" && (
        <div className="flex flex-col gap-4 sm:gap-5 animate-in zoom-in-95 w-full">
          {/* TARJETA DE REFERENCIA: ORACIÓN EN ESPAÑOL */}
          <div className="border border-[#334155] rounded-2xl p-4 sm:p-5 bg-[#0f172a] shadow-md flex flex-col gap-2 border-l-4 border-l-orange-400">
            <div className="text-orange-400 font-black text-xs sm:text-sm tracking-widest uppercase flex items-center justify-between">
              <span>ORACIÓN EN ESPAÑOL (REFERENCIA)</span>
              <span className="text-[#94a3b8] font-normal text-xs normal-case hidden sm:inline">
                {keyword2 ? "Escribe las 2 palabras aprendidas" : "Escribe la palabra aprendida"}
              </span>
            </div>
            <div className="text-base sm:text-lg md:text-xl font-medium text-white leading-relaxed">
              <HighlightedText
                text={currentItem.spanish}
                keywords={currentItem.keywordsSpanish || []}
              />
            </div>
          </div>

          {/* SECCIÓN DE CUADROS DE TEXTO INDEPENDIENTES */}
          <div className="flex flex-col gap-3.5 w-full">
            <div className="text-[--primary2] font-black text-xs sm:text-sm tracking-widest uppercase">
              ESCRIBE CADA PALABRA EN INGLÉS (CUADROS INDEPENDIENTES):
            </div>

            {/* CUADRO 1: INDEPENDIENTE */}
            <div
              className={`border rounded-2xl p-4 sm:p-5 transition-all flex flex-col gap-3 ${
                input1Done
                  ? "border-emerald-500/70 bg-emerald-950/20 shadow-[0_0_15px_rgba(74,222,128,0.15)]"
                  : activeBox === 1
                  ? "border-[#79c6ff]/60 bg-[#0b1329] shadow-[0_0_15px_rgba(121,198,255,0.15)]"
                  : "border-[#334155] bg-[#0b1329]/80"
              }`}
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-[#1e293b] text-[#79c6ff] px-2.5 py-1 rounded-lg text-xs font-bold font-mono uppercase tracking-wider">
                    PALABRA 1
                  </span>
                  {spanishKw1 ? (
                    <span className="text-slate-300 font-semibold text-sm sm:text-base">
                      "{spanishKw1}"
                    </span>
                  ) : (
                    <span className="text-slate-400 text-xs italic">1ª palabra clave</span>
                  )}
                </div>
                {input1Done ? (
                  <span className="text-emerald-400 font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-1">
                    ✓ CORRECTO
                  </span>
                ) : (
                  <span className="text-[#94a3b8] text-xs font-medium uppercase tracking-wider">
                    {activeBox === 1 ? "EN EDICIÓN" : "PENDIENTE"}
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 items-stretch">
                <div className="relative flex-1">
                  <input
                    ref={input1Ref}
                    type="text"
                    placeholder="ESCRIBE EN INGLÉS..."
                    value={input1}
                    disabled={input1Done}
                    onFocus={() => setActiveBox(1)}
                    onChange={(e) => {
                      setInput1(e.target.value);
                      if (input1Done) setInput1Done(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        verifyBox(1);
                      }
                    }}
                    className={`main-input w-full py-3.5 px-4 text-base sm:text-lg font-normal tracking-wider uppercase transition-all ${
                      input1Done
                        ? "border-emerald-500 text-emerald-300 bg-emerald-950/30"
                        : ""
                    }`}
                    autoComplete="off"
                    spellCheck="false"
                  />
                  {input1Done && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 font-black text-xl pointer-events-none">
                      ✓
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  disabled={input1Done}
                  onClick={() => verifyBox(1)}
                  className={`px-6 py-3 sm:py-3.5 font-black text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-md ${
                    input1Done
                      ? "bg-emerald-600/30 text-emerald-400 border border-emerald-500/50 cursor-default"
                      : "home-btn bg-[#2563eb] hover:bg-[#1d4ed8] text-white border-none"
                  }`}
                >
                  {input1Done ? "LISTO ✓" : "VERIFICAR 1"}
                </button>
              </div>
            </div>

            {/* CUADRO 2: INDEPENDIENTE (si existe keyword2) */}
            {keyword2 && (
              <div
                className={`border rounded-2xl p-4 sm:p-5 transition-all flex flex-col gap-3 ${
                  input2Done
                    ? "border-emerald-500/70 bg-emerald-950/20 shadow-[0_0_15px_rgba(74,222,128,0.15)]"
                    : activeBox === 2
                    ? "border-[#79c6ff]/60 bg-[#0b1329] shadow-[0_0_15px_rgba(121,198,255,0.15)]"
                    : "border-[#334155] bg-[#0b1329]/80"
                }`}
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#1e293b] text-[#79c6ff] px-2.5 py-1 rounded-lg text-xs font-bold font-mono uppercase tracking-wider">
                      PALABRA 2
                    </span>
                    {spanishKw2 ? (
                      <span className="text-slate-300 font-semibold text-sm sm:text-base">
                        "{spanishKw2}"
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs italic">2ª palabra clave</span>
                    )}
                  </div>
                  {input2Done ? (
                    <span className="text-emerald-400 font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-1">
                      ✓ CORRECTO
                    </span>
                  ) : (
                    <span className="text-[#94a3b8] text-xs font-medium uppercase tracking-wider">
                      {activeBox === 2 ? "EN EDICIÓN" : "PENDIENTE"}
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 items-stretch">
                  <div className="relative flex-1">
                    <input
                      ref={input2Ref}
                      type="text"
                      placeholder="ESCRIBE EN INGLÉS..."
                      value={input2}
                      disabled={input2Done}
                      onFocus={() => setActiveBox(2)}
                      onChange={(e) => {
                        setInput2(e.target.value);
                        if (input2Done) setInput2Done(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          verifyBox(2);
                        }
                      }}
                      className={`main-input w-full py-3.5 px-4 text-base sm:text-lg font-normal tracking-wider uppercase transition-all ${
                        input2Done
                          ? "border-emerald-500 text-emerald-300 bg-emerald-950/30"
                          : ""
                      }`}
                      autoComplete="off"
                      spellCheck="false"
                    />
                    {input2Done && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 font-black text-xl pointer-events-none">
                        ✓
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={input2Done}
                    onClick={() => verifyBox(2)}
                    className={`px-6 py-3 sm:py-3.5 font-black text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-md ${
                      input2Done
                        ? "bg-emerald-600/30 text-emerald-400 border border-emerald-500/50 cursor-default"
                        : "home-btn bg-[#2563eb] hover:bg-[#1d4ed8] text-white border-none"
                    }`}
                  >
                    {input2Done ? "LISTO ✓" : "VERIFICAR 2"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="text-[--muted] text-xs sm:text-sm text-center mt-1">
            Cada cuadro es independiente. Presiona ENTER en el cuadro o su botón VERIFICAR. Si te equivocas, irás a penalización para practicar esa palabra.
          </p>
        </div>
      )}

      {phase === "PENALTY" && (
        <div className="alert animate-in zoom-in w-full flex flex-col items-center gap-3.5 p-4 sm:p-6 my-auto">
          <div className="text-[#f87171] font-black text-lg sm:text-xl tracking-widest uppercase text-center">
            TECHNICAL DISCREPANCY
          </div>
          <div className="text-white font-medium text-xs sm:text-sm text-center tracking-wide uppercase">
            REPEAT THE WORD 3 TIMES:
          </div>

          {/* 1. Palabra en inglés */}
          <div className="text-xl sm:text-2xl md:text-3xl font-normal text-white bg-red-900/40 px-5 sm:px-7 py-2.5 rounded-xl border border-red-500/50 break-words text-center max-w-full tracking-wide uppercase shadow-lg">
            {penaltyTarget}
          </div>

          {/* 2. Debajo de la palabra: Icono de audio + Pronunciación IPA */}
          <div className="flex items-center gap-3 justify-center my-0.5">
            <PronunciationButton
              text={penaltyTarget}
              size={24}
              autoPlay
              cascadeTimes={1}
              className="bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] hover:bg-[#79c6ff]/40 p-2 rounded-full shrink-0 shadow-[0_0_10px_rgba(121,198,255,0.3)]"
            />
            <span className="text-[#79c6ff] font-mono text-base sm:text-lg font-bold tracking-wider">
              {getUSIPA(penaltyTarget)}
            </span>
          </div>

          {/* 3. Cuadro de texto automático y dinámico */}
          <div className="w-full max-w-[340px] mt-1">
            <input
              ref={penaltyInputRef}
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
              value={penaltyInput}
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
            <span>PENALTY +1 (Sentence added to queue)</span>
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
            <div className="font-black text-xl sm:text-2xl tracking-wide uppercase text-center text-emerald-400">
              ✓ CORRECT! {successMsg}
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
                    <linearGradient id="runwayAsphaltPlay2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="40%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    <linearGradient id="grassBedPlay2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#064e3b" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#022c22" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Franja de terreno / césped del aeródromo */}
                  <rect x="0" y="66" width="320" height="34" fill="url(#grassBedPlay2)" />

                  {/* Cuerpo principal del asfalto de la pista en perspectiva 3D */}
                  <polygon
                    points="6,72 314,72 318,94 2,94"
                    fill="url(#runwayAsphaltPlay2)"
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
              onClick={() => {
                if (currentIndex + 1 >= queue.length) {
                  setPhase("COMPLETE");
                } else {
                  setCurrentIndex((c) => c + 1);
                  resetGameState();
                }
              }}
              className="main-btn py-3 px-10 text-lg shadow-lg cursor-pointer"
            >
              NEXT SENTENCE
            </button>
          </div>
        );
      })()}
    </div>
  </div>
);
};

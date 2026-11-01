import React, { useState, useEffect, useRef, useMemo } from "react";
import { levelsData } from "../data";
import { VocabItem } from "../types";
import { getRandomMessage } from "../motivation";
import { PronunciationButton } from "./PronunciationButton";
import { getUSIPA } from "../utils/ipa";
import { CompletionScreen } from "./CompletionScreen";

export const Play4T1Mode = ({
  levelId,
  onBack,
  group,
  customVocab,
}: {
  levelId: number;
  onBack: () => void;
  group?: 1 | 2;
  customVocab?: VocabItem[];
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

  const [queue, setQueue] = useState<VocabItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"GAME" | "COMPLETE">("GAME");

  const [inputValue, setInputValue] = useState("");
  const [showPenaltyModal, setShowPenaltyModal] = useState(false);
  const [totalErrors, setTotalErrors] = useState(0);

  const victoryMsg = useMemo(
    () => getRandomMessage("COMPLETE_VICTORY"),
    [phase],
  );
  const retryMsg = useMemo(() => getRandomMessage("COMPLETE_RETRY"), [phase]);
  const penaltyMsg = useMemo(
    () => getRandomMessage("PENALTY"),
    [phase, totalErrors],
  );

  // Penalty State
  const [penaltyInput, setPenaltyInput] = useState("");
  const [penaltyCount, setPenaltyCount] = useState(0);
  const [hasPenaltyTypo, setHasPenaltyTypo] = useState(false);

  const isAdvancing = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const penaltyInputRef = useRef<HTMLInputElement>(null);

  const initGame = () => {
    let rawVocab = level?.vocab || [];
    if (!isLestime) {
      if (group === 1) {
        rawVocab = rawVocab.slice(0, 15);
      } else if (group === 2) {
        rawVocab = rawVocab.slice(15, 30);
      }
    }
    const initialQueue = [...rawVocab];
    setQueue(initialQueue);
    setCurrentIndex(0);
    setTotalErrors(0);
    setPhase("GAME");
    setInputValue("");
  };

  useEffect(() => {
    initGame();
  }, [level, group]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isAdvancing.current) return;
    const val = e.target.value.toUpperCase();
    setInputValue(val);

    const currentWord = queue[currentIndex];
    if (val.trim().toLowerCase() === currentWord.word.toLowerCase()) {
      isAdvancing.current = true;
      setTimeout(() => {
        setInputValue("");
        advanceToNext();
        isAdvancing.current = false;
      }, 150);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (showPenaltyModal) {
      return;
    }

    if (!inputValue.trim()) return;

    const currentWord = queue[currentIndex];

    // Only check incorrect submissions (via Enter key)
    if (inputValue.trim().toLowerCase() !== currentWord.word.toLowerCase()) {
      // Incorrect!
      setTotalErrors((prev) => prev + 1);

      // Add word to the end of queue (+1 penalty)
      setQueue((prevQueue) => [...prevQueue, currentWord]);

      // Setup and show penalty
      setPenaltyCount(0);
      setPenaltyInput("");
      setHasPenaltyTypo(false);
      setShowPenaltyModal(true);
    }
  };

  const handlePenaltyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPenaltyInput(val);

    const currentWord = queue[currentIndex];
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
        const newCount = penaltyCount + 1;
        setPenaltyCount(newCount);
        setPenaltyInput("");

        if (newCount >= 3) {
          setTimeout(() => {
            setShowPenaltyModal(false);
            setInputValue(""); // clear main input to force them to retype it
            setPenaltyCount(0);
            setPenaltyInput("");
            setHasPenaltyTypo(false);
          }, 250);
        }
      }
    } else {
      // Made a typo: border blinks red and counter resets to 0
      setHasPenaltyTypo(true);
      if (penaltyCount > 0) {
        setPenaltyCount(0);
      }
    }
  };

  const advanceToNext = (queueOverride?: VocabItem[]) => {
    const activeQueue = queueOverride || queue;
    if (currentIndex + 1 >= activeQueue.length) {
      setPhase("COMPLETE");
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (queue.length === 0) return null;

  if (phase === "COMPLETE") {
    return (
      <div className="min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
        <CompletionScreen
          playName={group ? `PLAY 5 • TEST 1 (GRUPO ${group})` : (isLestime ? (level?.name || "MODO 5 MINUTOS") : `PLAY 5 • TEST 1 ESCRITURA`)}
          gradeText={isLestime ? "MODO 5 MINUTOS" : `NIVEL ${levelId}`}
          totalErrors={totalErrors}
          onAgain={initGame}
          onHome={onBack}
        />
      </div>
    );
  }

  const currentWord = queue[currentIndex];
  const progressPct = ((currentIndex + 1) / queue.length) * 100;
  const initialTotal = group === 1 
    ? Math.min(15, level?.vocab?.length || 15) 
    : group === 2 
    ? Math.max(0, (level?.vocab?.length || 30) - 15) 
    : (level?.vocab?.length || queue.length);

  return (
    <div className="min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
      {showPenaltyModal && (
        <div className="p3-penalty-overlay">
          <div className="p3-penalty-box p-6 sm:p-8 max-w-[380px] w-full flex flex-col items-center text-center gap-3.5 animate-in zoom-in-95">
            <div className="p3-penalty-title text-[#f87171] font-[900] text-[1.1rem] sm:text-[1.2rem] tracking-[2px] uppercase">
              TECHNICAL DISCREPANCY
            </div>
            <div className="text-white font-medium text-xs sm:text-sm text-center tracking-wide uppercase">
              REPEAT THE WORD 3 TIMES:
            </div>

            {/* 1. Palabra en inglés */}
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

            {/* 3. Cuadro de texto para escribir la palabra */}
            <div className="w-full mt-1">
              <input
                ref={penaltyInputRef}
                type="text"
                inputMode="text"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck="false"
                value={penaltyInput}
                onChange={handlePenaltyInputChange}
                placeholder="TYPE HERE..."
                className={`w-full py-3 px-4 text-base sm:text-lg font-normal text-center uppercase tracking-wider rounded-xl transition-all outline-none cursor-text select-text pointer-events-auto ${
                  hasPenaltyTypo
                    ? "border-2 border-red-500 bg-red-950/40 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.7)] animate-pulse"
                    : "main-input text-white"
                }`}
                autoComplete="off"
              />
            </div>

            {/* 4. Contador de palabras */}
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#fca5a5] mt-0.5">
              {penaltyCount} / 3
            </div>

            {/* 5. Regla y Frase de motivación al final */}
            <div className="text-[#ccc] text-[0.8rem] flex flex-col gap-0.5 w-full mt-0.5">
              <span>PENALTY +1 (Word added to queue)</span>
              <span className="text-[#f87171] font-bold">
                {penaltyMsg}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-[680px] flex flex-col items-center mb-3 sm:mb-4 px-1">
        <div className="dict-header text-center w-full">
          <h1 className="text-2xl sm:text-3xl md:text-[2.2rem] font-[900] uppercase m-0 leading-tight">
            {isLestime ? "FAST TEST - 5 MINUTES" : "PLAY 5 - TEST 1 (ESCRITURA)"}
          </h1>
          <div className="text-[--muted] text-[0.96rem] font-[600] mt-1.5 uppercase tracking-wide">
            {level?.name || `LEVEL ${levelId}`}{group ? ` • GRUPO ${group}` : ''}
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
          Word {currentIndex + 1} OF {queue.length}
        </div>
        <div className="progress-bar mb-6 sm:mb-8" id="t1Progress">
          <div
            className="progress-fill"
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>

        <div className="flex flex-col items-center mb-6 sm:mb-10 w-full">
          <div className="p3-word-label text-[--muted] font-bold tracking-widest mb-3 sm:mb-4">
            SPANISH:
          </div>
          <div className="flex items-center justify-center gap-3 w-full">
            <div className="word-badge text-base sm:text-lg md:text-[1.28rem] px-4 sm:px-8 py-3 sm:py-4 shadow-lg text-center break-words max-w-full">
              {currentWord.trans}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-auto mb-6 sm:mb-10 w-full"
        >
          <div className="text-center text-[--muted] font-bold tracking-widest text-sm mb-2">
            TYPE IN ENGLISH:
          </div>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="WRITE HERE.."
            className="w-full bg-black/40 border-2 border-[#334155] outline-none p-3 sm:p-5 rounded-xl sm:rounded-2xl text-white font-mono text-center text-lg sm:text-2xl tracking-widest uppercase focus:border-slate-400 transition-colors shadow-inner"
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
};

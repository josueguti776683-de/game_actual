import React, { useState, useEffect, useRef, useMemo } from "react";
import { levelsData } from "../data";
import { VocabItem } from "../types";
import { PronunciationButton } from "./PronunciationButton";
import { getRandomMessage } from "../motivation";
import { getUSIPA } from "../utils/ipa";
import { CompletionScreen } from "./CompletionScreen";

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const Play3Mode = ({
  levelId,
  onBack,
  group = 1,
}: {
  levelId: number;
  onBack: () => void;
  group?: 1 | 2;
}) => {
  const fullLevel = levelsData[levelId];
  const level = useMemo(() => {
    if (!fullLevel) return null;
    const rawVocab = fullLevel.vocabPlay3 || fullLevel.vocab || [];
    // Group 1: 0 to 30 (first 30 words)
    // Group 2: 30 to 60 (next 30 words)
    const slicedVocab = group === 2 ? rawVocab.slice(30, 60) : rawVocab.slice(0, 30);
    return {
      ...fullLevel,
      vocabPlay3: slicedVocab,
    };
  }, [fullLevel, group]);

  const [queue, setQueue] = useState<VocabItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"GAME" | "COMPLETE">("GAME");

  const [options, setOptions] = useState<VocabItem[]>([]);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isWrong, setIsWrong] = useState(false);
  const [showPenaltyModal, setShowPenaltyModal] = useState(false);
  const [totalErrors, setTotalErrors] = useState(0);

  // Penalty Typing State
  const [penaltyInput, setPenaltyInput] = useState("");
  const [penaltyCount, setPenaltyCount] = useState(0);
  const [hasPenaltyTypo, setHasPenaltyTypo] = useState(false);
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

  const initGame = () => {
    if (!level) return;
    const initialQueue = shuffleArray(level.vocabPlay3);
    setQueue(initialQueue);
    setCurrentIndex(0);
    setTotalErrors(0);
    setPhase("GAME");
    setPenaltyInput("");
    setPenaltyCount(0);
    setHasPenaltyTypo(false);
    setShowPenaltyModal(false);
    generateOptions(initialQueue[0], initialQueue);
  };

  useEffect(() => {
    initGame();
  }, [levelId, group]);

  const generateOptions = (
    currentWord: VocabItem,
    currentQueue: VocabItem[],
  ) => {
    // Pick 2 random distractors from the current pool that are NOT the current word
    const distractors = currentQueue.filter((w) => w.word !== currentWord.word);
    const shuffledDistractors = shuffleArray(distractors).slice(0, 2);

    // Combine and shuffle
    setOptions(shuffleArray([currentWord, ...shuffledDistractors]));
    setSelectedOpt(null);
    setIsWrong(false);
  };

  const handleOptionClick = (opt: VocabItem, index: number) => {
    if (selectedOpt !== null || showPenaltyModal) return; // Ignore clicks if animating

    setSelectedOpt(index);
    const currentWord = queue[currentIndex];

    if (opt.word === currentWord.word) {
      // Correct
      setIsWrong(false);
      setTimeout(() => advanceToNext(), 600);
    } else {
      // Incorrect
      setIsWrong(true);
      setTotalErrors((prev) => prev + 1);

      // Add current word to the end of the queue for later repetition
      setQueue((prevQueue) => {
        return [...prevQueue, currentWord];
      });

      // Show penalty modal with typing requirement
      setTimeout(() => {
        setPenaltyCount(0);
        setPenaltyInput("");
        setHasPenaltyTypo(false);
        setShowPenaltyModal(true);
      }, 400);
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
            setSelectedOpt(null);
            setIsWrong(false);
            setPenaltyCount(0);
            setPenaltyInput("");
            setHasPenaltyTypo(false);
          }, 250);
        }
      }
    } else {
      // Made a typo: blink red and reset count to 0
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
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      generateOptions(activeQueue[nextIdx], activeQueue);
    }
  };

  if (queue.length === 0) return null;

  if (phase === "COMPLETE") {
    return (
      <div className="min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
        <CompletionScreen
          playName={`PLAY 3 - GRUPO ${group}`}
          gradeText={`NIVEL ${levelId}`}
          totalErrors={totalErrors}
          onAgain={initGame}
          onHome={onBack}
        />
      </div>
    );
  }

  const currentWord = queue[currentIndex];
  // Calculate progress against dynamic length
  const progressPct = ((currentIndex + 1) / queue.length) * 100;

  return (
    <div className="min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
      {/* PENALTY MODAL WITH WORD TYPING */}
      {showPenaltyModal && (
        <div className="p3-penalty-overlay z-[9999]">
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
            <div className="text-[#ccc] text-[0.8rem] flex flex-col gap-0.5 w-full mt-0.5 text-center">
              <span>PENALTY +1</span>
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
            PLAY 3 - TRANSLATE
          </h1>
          <div className="text-[--muted] text-[0.96rem] font-[600] mt-1.5 uppercase tracking-wide">
            {level?.name || `LEVEL ${levelId}`} • GRUPO {group}
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
          <div className="progress-bar mb-6 sm:mb-8" id="p3Progress">
            <div
              className="progress-fill"
              style={{ width: `${progressPct}%` }}
            ></div>
          </div>

          <div className="flex flex-col items-center mb-6 sm:mb-8 w-full">
            <div className="flex flex-col items-center justify-center gap-3 w-full">
              <div
                id="p3WordEl"
                className="p3-word word-badge text-base sm:text-lg md:text-[1.28rem] px-6 sm:px-8 py-2.5 sm:py-3 shadow-lg flex items-center justify-center text-center max-w-full break-words uppercase"
              >
                {currentWord.displayWord}
              </div>

              {/* AUDIO & US IPA BOX BELOW THE WORD */}
              <div className="bg-[#0f172a] rounded-xl p-3 sm:p-3.5 border border-[#334155] flex items-center justify-center gap-3.5 flex-wrap w-full">
                <span className="font-bold tracking-wider uppercase text-white shrink-0">A:</span>
                <PronunciationButton
                  text={currentWord.word}
                  size={20}
                  className="bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] hover:bg-[#79c6ff]/40 p-2 rounded-full shrink-0 shadow-[0_0_10px_rgba(121,198,255,0.2)]"
                />
                <span className="text-[#79c6ff] font-mono text-base sm:text-lg font-bold tracking-wider">
                  {getUSIPA(currentWord.word)}
                </span>
              </div>
            </div>
          </div>

          <div className="p3-options flex flex-col gap-3 sm:gap-4 mt-auto mb-6 sm:mb-10">
            {options.map((opt, idx) => {
              let btnClass =
                "p3-option w-full py-2.5 sm:py-[14px] px-4 sm:px-[22px] font-medium text-sm sm:text-base md:text-lg leading-tight cursor-pointer";
              if (selectedOpt !== null) {
                if (opt.word === currentWord.word) {
                  btnClass += " correct-flash"; // Always highlight correct option green when interacting
                } else if (selectedOpt === idx && isWrong) {
                  btnClass += " wrong-flash"; // Highlight chosen wrong option red
                } else {
                  btnClass += " opacity-50"; // Dim others
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(opt, idx)}
                  className={btnClass}
                  disabled={selectedOpt !== null}
                >
                  {opt.trans}
                </button>
              );
            })}
          </div>

          <p className="text-[--muted] text-sm text-center mt-auto">
            Select the correct Spanish translation for each word.
          </p>
      </div>
  </div>
);
};

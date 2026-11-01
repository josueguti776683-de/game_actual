import React, { useState, useEffect, useRef, useMemo } from "react";
import { levelsData } from "../data";
import { VocabItem } from "../types";
import { PronunciationButton } from "./PronunciationButton";
import { getRandomMessage } from "../motivation";
import { getUSIPA } from "../utils/ipa";
import { CompletionScreen } from "./CompletionScreen";

export const Play4T2Mode = ({
  levelId,
  onBack,
  customVocab,
}: {
  levelId: number;
  onBack: () => void;
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
  const [penaltyListenCount, setPenaltyListenCount] = useState(0);
  const [showRemember, setShowRemember] = useState(false);
  const [showInputBox, setShowInputBox] = useState(false);

  const [penaltyInput, setPenaltyInput] = useState("");
  const [penaltyTypeCount, setPenaltyTypeCount] = useState(0);
  const [hasPenaltyTypo, setHasPenaltyTypo] = useState(false);

  const isAdvancing = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const penaltyInputRef = useRef<HTMLInputElement>(null);

  const initGame = () => {
    // Uses vocab
    const initialQueue = [...(level?.vocab || [])];
    setQueue(initialQueue);
    setCurrentIndex(0);
    setTotalErrors(0);
    setPhase("GAME");
    setInputValue("");
  };

  useEffect(() => {
    initGame();
  }, [level]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isAdvancing.current) return;
    const val = e.target.value.toUpperCase();
    setInputValue(val);

    const currentWord = queue[currentIndex];
    if (val.trim().toLowerCase() === currentWord.word.toLowerCase()) {
      isAdvancing.current = true;
      // Auto advance
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

    // Check answer case insensitive
    if (inputValue.trim().toLowerCase() !== currentWord.word.toLowerCase()) {
      // Incorrect!
      setTotalErrors((prev) => prev + 1);

      // Add word to the end of queue (+1 penalty)
      setQueue((prevQueue) => [...prevQueue, currentWord]);

      // Setup and show penalty
      setPenaltyListenCount(0);
      setShowRemember(false);
      setShowInputBox(false);

      setPenaltyInput("");
      setPenaltyTypeCount(0);
      setHasPenaltyTypo(false);
      setShowPenaltyModal(true);
    }
  };

  const handlePenaltyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPenaltyInput(val);

    if (!showInputBox) return;

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
        const newCount = penaltyTypeCount + 1;
        setPenaltyTypeCount(newCount);
        setPenaltyInput("");

        if (newCount >= 3) {
          setTimeout(() => {
            setShowPenaltyModal(false);
            setInputValue(""); // clear main input to force them to retype it
            setPenaltyTypeCount(0);
            setPenaltyInput("");
            setHasPenaltyTypo(false);
          }, 250);
        }
      }
    } else {
      // Typo: red blink and reset counter
      setHasPenaltyTypo(true);
      if (penaltyTypeCount > 0) {
        setPenaltyTypeCount(0);
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

  const maskWord = (word: string) => {
    if (word.length <= 2) return word;
    const first = word[0];
    const last = word[word.length - 1];
    let middle = "";
    for (let i = 1; i < word.length - 1; i++) {
      middle += word[i] === " " ? " " : " _ ";
    }
    return first + middle + last;
  };

  if (queue.length === 0) return null;

  if (phase === "COMPLETE") {
    return (
      <div className="min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
        <CompletionScreen
          playName={isLestime ? (level?.name || "MODO 5 MINUTOS") : "PLAY 6 • TEST 2 (AUDIO)"}
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
  const initialTotal = level?.vocab?.length || queue.length;

  return (
    <div className="min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
      {showPenaltyModal && (
        <div className="p3-penalty-overlay overflow-y-auto">
          <div className="p3-penalty-box p-8 max-w-[380px] w-full flex flex-col items-center text-center gap-4 animate-in zoom-in-95 my-auto">
            <div className="p3-penalty-title text-[#f87171] font-[900] text-[1.1rem] tracking-[2px] uppercase">
              ALERTA DISCREPANCIA TÉCNICA DE ERROR
            </div>

            <div className="text-[--muted] text-sm mb-1 uppercase font-semibold">
              LISTEN TO THE WORD 3 TIMES
            </div>

            <PronunciationButton
              text={currentWord.word}
              size={48}
              onClick={() => {
                if (penaltyListenCount < 3) {
                  const nc = penaltyListenCount + 1;
                  setPenaltyListenCount(nc);
                  if (nc >= 3) {
                    setShowRemember(true);
                  }
                }
              }}
            />

            <div className="text-[#f87171] font-bold mt-2">
              {Math.min(penaltyListenCount, 3)} / 3
            </div>

            {showRemember && !showInputBox && (
              <button
                onClick={() => setShowInputBox(true)}
                className="mt-4 main-btn py-3 px-6 rounded-full w-full uppercase shadow-lg text-[1.1rem]"
              >
                REMEMBER
              </button>
            )}

            {showInputBox && (
              <div className="w-full flex flex-col items-center animate-in slide-in-from-top-4 mt-4 border-t border-[--line]/30 pt-4 gap-3.5">
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
                  {penaltyTypeCount} / 3
                </div>

                {/* 5. Regla y Frase de motivación al final */}
                <div className="text-[#ccc] text-[0.8rem] flex flex-col gap-0.5 w-full mt-0.5">
                  <span>PENALTY +1 (Word added to queue)</span>
                  <span className="text-[#f87171] font-bold">
                    {penaltyMsg}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="w-full max-w-[680px] flex flex-col items-center mb-3 sm:mb-4 px-1">
        <div className="dict-header text-center w-full">
          <h1 className="text-2xl sm:text-3xl md:text-[2.2rem] font-[900] uppercase m-0 leading-tight">
            {isLestime ? "FAST TEST (AUDIO) - 5 MINUTES" : "PLAY 6 - TEST 2 (AUDIO)"}
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
          Word {currentIndex + 1} OF {queue.length}
        </div>
        <div className="progress-bar mb-6 sm:mb-8" id="t2Progress">
          <div
            className="progress-fill"
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>

        <div className="flex flex-col items-center mb-6 sm:mb-8 w-full gap-3.5">
          <div className="p3-word-label text-[--muted] font-bold tracking-widest mb-1 sm:mb-2">
            LISTEN & GUESS:
          </div>

          {/* 1. Palabra enmascarada con letra al inicio, lineas segmentadas y letra final */}
          <div className="flex items-center justify-center w-full">
            <div className="word-badge text-lg sm:text-2xl md:text-[2.1rem] px-6 sm:px-10 py-3 sm:py-4 shadow-lg text-center break-words uppercase font-mono tracking-widest text-[--primary2] max-w-full">
              {maskWord(currentWord.word)}
            </div>
          </div>

          {/* 2. Debajo de la palabra: Icono de audio en circulo + Pronunciacion IPA al costado */}
          <div className="flex items-center gap-3 justify-center mt-1">
            <PronunciationButton
              text={currentWord.word}
              size={24}
              autoPlay={true}
              cascadeTimes={1}
              className="bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] hover:bg-[#79c6ff]/40 p-2.5 rounded-full shrink-0 shadow-[0_0_10px_rgba(121,198,255,0.3)] transition-all cursor-pointer"
            />
            <span className="text-[#79c6ff] font-mono text-base sm:text-lg md:text-xl font-bold tracking-wider">
              {getUSIPA(currentWord.word)}
            </span>
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

import React, { useState, useEffect, useRef, useMemo } from "react";
import { levelsData } from "../data";
import { VocabItem } from "../types";
import { PronunciationButton } from "./PronunciationButton";
import { playAudio } from "../utils/audioEngine";
import { getRandomMessage } from "../motivation";
import { getUSIPA } from "../utils/ipa";
import { CompletionScreen } from "./CompletionScreen";

interface CardItem {
  id: string;
  word: string;
  text: string;
  type: "AUDIO_IPA" | "EN";
  original: VocabItem;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const Play4_1Mode = ({
  levelId,
  onBack,
}: {
  levelId: number;
  onBack: () => void;
}) => {
  const level = levelsData[levelId];
  const BATCH_SIZE = 6;
  const totalWords = (level?.vocab || []).length; // 30 words
  const totalBatches = Math.ceil(totalWords / BATCH_SIZE);

  const [batchIndex, setBatchIndex] = useState(0);
  const [totalMatched, setTotalMatched] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [phase, setPhase] = useState<"GAME" | "COMPLETE">("GAME");

  // Current batch cards
  const [audioCards, setAudioCards] = useState<CardItem[]>([]);
  const [enCards, setEnCards] = useState<CardItem[]>([]);

  // Selection & matching
  const [selectedAudioId, setSelectedAudioId] = useState<string | null>(null);
  const [selectedEnId, setSelectedEnId] = useState<string | null>(null);
  const [matchedWords, setMatchedWords] = useState<Set<string>>(new Set());
  const [feedbackState, setFeedbackState] = useState<{
    audioId: string;
    enId: string;
    status: "correct" | "wrong";
  } | null>(null);

  // Penalty State
  const [showPenaltyModal, setShowPenaltyModal] = useState(false);
  const [penaltyTarget, setPenaltyTarget] = useState<VocabItem | null>(null);
  const [penaltyInput, setPenaltyInput] = useState("");
  const [penaltyCount, setPenaltyCount] = useState(0);
  const [hasPenaltyTypo, setHasPenaltyTypo] = useState(false);

  const penaltyInputRef = useRef<HTMLInputElement>(null);

  const victoryMsg = useMemo(
    () => getRandomMessage("COMPLETE_VICTORY"),
    [phase]
  );
  const retryMsg = useMemo(() => getRandomMessage("COMPLETE_RETRY"), [phase]);
  const penaltyMsg = useMemo(
    () => getRandomMessage("PENALTY"),
    [phase, totalErrors]
  );

  // Initialize or reset game
  const initGame = () => {
    setBatchIndex(0);
    setTotalMatched(0);
    setTotalErrors(0);
    setPhase("GAME");
    loadBatch(0);
  };

  useEffect(() => {
    initGame();
  }, [levelId]);

  // Load batch words
  const loadBatch = (bIdx: number) => {
    if (!level) return;
    const batchWords = level.vocab.slice(bIdx * BATCH_SIZE, (bIdx + 1) * BATCH_SIZE);

    // Audio + IPA Column
    const audioList: CardItem[] = batchWords.map((w) => ({
      id: `${w.word}_audio`,
      word: w.word,
      text: getUSIPA(w.word),
      type: "AUDIO_IPA",
      original: w,
    }));

    // English Column
    const enList: CardItem[] = batchWords.map((w) => ({
      id: `${w.word}_en`,
      word: w.word,
      text: w.displayWord,
      type: "EN",
      original: w,
    }));

    setAudioCards(shuffleArray(audioList));
    setEnCards(shuffleArray(enList));
    setMatchedWords(new Set());
    setSelectedAudioId(null);
    setSelectedEnId(null);
    setFeedbackState(null);
  };

  // Handle Card Click
  const handleCardClick = (card: CardItem) => {
    if (feedbackState !== null || matchedWords.has(card.word) || showPenaltyModal) return;

    if (card.type === "AUDIO_IPA") {
      // Reproduce el audio de la palabra al seleccionarla o tocarla
      playAudio(card.word);
      const nextAudioId = selectedAudioId === card.id ? null : card.id;
      setSelectedAudioId(nextAudioId);

      if (nextAudioId && selectedEnId) {
        checkPair(nextAudioId, selectedEnId);
      }
    } else {
      const nextEnId = selectedEnId === card.id ? null : card.id;
      setSelectedEnId(nextEnId);

      if (selectedAudioId && nextEnId) {
        checkPair(selectedAudioId, nextEnId);
      }
    }
  };

  // Check Pair Logic
  const checkPair = (audioId: string, enId: string) => {
    const audioCard = audioCards.find((c) => c.id === audioId);
    const enCard = enCards.find((c) => c.id === enId);

    if (!audioCard || !enCard) return;

    if (audioCard.word === enCard.word) {
      // CORRECT MATCH
      setFeedbackState({ audioId, enId, status: "correct" });
      playAudio(enCard.word);

      setTimeout(() => {
        const newMatched = new Set(matchedWords);
        newMatched.add(enCard.word);
        setMatchedWords(newMatched);

        const newTotalMatched = totalMatched + 1;
        setTotalMatched(newTotalMatched);

        setSelectedAudioId(null);
        setSelectedEnId(null);
        setFeedbackState(null);

        // Check if current batch finished
        if (newMatched.size === BATCH_SIZE || newMatched.size === audioCards.length) {
          if (batchIndex + 1 < totalBatches) {
            const nextBatch = batchIndex + 1;
            setBatchIndex(nextBatch);
            loadBatch(nextBatch);
          } else {
            // All 30 words completed!
            setPhase("COMPLETE");
          }
        }
      }, 450);
    } else {
      // INCORRECT MATCH
      setFeedbackState({ audioId, enId, status: "wrong" });
      setTotalErrors((prev) => prev + 1);
      setPenaltyTarget(enCard.original);

      setTimeout(() => {
        setSelectedAudioId(null);
        setSelectedEnId(null);
        setFeedbackState(null);

        // Open Penalty Modal
        setPenaltyCount(0);
        setPenaltyInput("");
        setHasPenaltyTypo(false);
        setShowPenaltyModal(true);
      }, 450);
    }
  };

  // Penalty Input Change
  const handlePenaltyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPenaltyInput(val);

    if (!penaltyTarget) return;

    const target = penaltyTarget.word.toUpperCase().trim();
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
            setPenaltyTarget(null);
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

  const progressPct = Math.min(100, (totalMatched / totalWords) * 100);

  if (phase === "COMPLETE") {
    return (
      <div className="min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
        <CompletionScreen
          playName="PLAY 4.1 • MATCH AUDIO & IPA (IPA-EN)"
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
      {/* PENALTY MODAL */}
      {showPenaltyModal && penaltyTarget && (
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
              {penaltyTarget.word}
            </div>

            {/* 2. Debajo de la palabra: Icono de audio + Pronunciación IPA */}
            <div className="flex items-center gap-3 justify-center my-0.5">
              <PronunciationButton
                text={penaltyTarget.word}
                size={24}
                autoPlay
                cascadeTimes={1}
                className="bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] hover:bg-[#79c6ff]/40 p-2 rounded-full shrink-0 shadow-[0_0_10px_rgba(121,198,255,0.3)]"
              />
              <span className="text-[#79c6ff] font-mono text-base sm:text-lg font-bold tracking-wider">
                {getUSIPA(penaltyTarget.word)}
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
            PLAY 4.1 - MATCH AUDIO &amp; IPA
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
        <div className="flex items-center justify-between text-[--muted] text-[0.88rem] sm:text-[0.92rem] font-[700] mb-2 tracking-wide uppercase px-1">
          <span>PAIRS: {totalMatched} OF {totalWords}</span>
          <span className="text-[--primary2]">BATCH {batchIndex + 1} / {totalBatches}</span>
        </div>

            {/* PROGRESS BAR */}
            <div className="progress-bar mb-5 sm:mb-6" id="p4_1Progress">
              <div
                className="progress-fill"
                style={{ width: `${progressPct}%` }}
              ></div>
            </div>

            <div className="text-center text-xs sm:text-sm font-semibold text-[--muted] uppercase tracking-wider mb-4">
              EMPAREJA EL AUDIO / IPA CON LA PALABRA EN INGLÉS
            </div>

            {/* GAME CARDS GRID: 2 COLUMNS (AUDIO & IPA | ENGLISH) */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-6 w-full">
              {/* AUDIO & IPA COLUMN */}
              <div className="flex flex-col gap-2.5 sm:gap-3">
                <div className="text-center text-[0.75rem] font-black text-[#79c6ff] tracking-widest uppercase mb-0.5">
                  AUDIO &amp; IPA
                </div>
                {audioCards.map((card) => {
                  const isMatched = matchedWords.has(card.word);
                  const isSelected = selectedAudioId === card.id;
                  const isCorrect = feedbackState?.audioId === card.id && feedbackState.status === "correct";
                  const isWrong = feedbackState?.audioId === card.id && feedbackState.status === "wrong";

                  let cardStyle = "bg-[#0a1628]/90 border-[#79c6ff]/30 text-white hover:border-[#79c6ff]/60";
                  if (isMatched) {
                    cardStyle = "bg-[#102a1d]/40 border-[#4ade80]/20 text-[#4ade80]/40 opacity-30 pointer-events-none";
                  } else if (isCorrect) {
                    cardStyle = "bg-[#4ade80]/30 border-[#4ade80] text-[#4ade80] font-bold scale-[1.02] shadow-lg shadow-green-900/40 animate-pulse";
                  } else if (isWrong) {
                    cardStyle = "bg-[#f87171]/30 border-[#f87171] text-[#f87171] font-bold scale-95 shadow-lg shadow-red-900/40";
                  } else if (isSelected) {
                    cardStyle = "bg-[#79c6ff]/25 border-[#79c6ff] text-[#79c6ff] font-bold scale-[1.02] shadow-md shadow-blue-900/40";
                  }

                  return (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(card)}
                      className={`p-2 sm:p-2.5 rounded-xl border-2 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1 min-h-[64px] sm:min-h-[72px] ${cardStyle}`}
                    >
                      {/* Icono de audio en la parte de arriba */}
                      <PronunciationButton
                        text={card.word}
                        size={18}
                        className="bg-[#79c6ff]/20 hover:bg-[#79c6ff]/40 p-1.5 rounded-full text-[#79c6ff] border border-[#79c6ff]/40 shrink-0"
                      />
                      {/* Pronunciación IPA en la parte de abajo */}
                      <span className="font-mono font-bold text-[0.72rem] sm:text-xs md:text-sm text-[#79c6ff] text-center leading-tight break-all max-w-full px-1">
                        {card.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* ENGLISH COLUMN */}
              <div className="flex flex-col gap-2.5 sm:gap-3">
                <div className="text-center text-[0.75rem] font-black text-[#79c6ff] tracking-widest uppercase mb-0.5">
                  ENGLISH WORD
                </div>
                {enCards.map((card) => {
                  const isMatched = matchedWords.has(card.word);
                  const isSelected = selectedEnId === card.id;
                  const isCorrect = feedbackState?.enId === card.id && feedbackState.status === "correct";
                  const isWrong = feedbackState?.enId === card.id && feedbackState.status === "wrong";

                  let cardStyle = "bg-[#0a1628]/90 border-[#79c6ff]/30 text-white hover:border-[#79c6ff]/60";
                  if (isMatched) {
                    cardStyle = "bg-[#102a1d]/40 border-[#4ade80]/20 text-[#4ade80]/40 opacity-30 pointer-events-none";
                  } else if (isCorrect) {
                    cardStyle = "bg-[#4ade80]/30 border-[#4ade80] text-[#4ade80] font-bold scale-[1.02] shadow-lg shadow-green-900/40 animate-pulse";
                  } else if (isWrong) {
                    cardStyle = "bg-[#f87171]/30 border-[#f87171] text-[#f87171] font-bold scale-95 shadow-lg shadow-red-900/40";
                  } else if (isSelected) {
                    cardStyle = "bg-[#79c6ff]/25 border-[#79c6ff] text-[#79c6ff] font-bold scale-[1.02] shadow-md shadow-blue-900/40";
                  }

                  return (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(card)}
                      className={`p-2 sm:p-2.5 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-center text-center gap-1 min-h-[64px] sm:min-h-[72px] ${cardStyle}`}
                    >
                      <span className="font-bold text-[11px] sm:text-xs md:text-sm leading-tight break-words uppercase max-w-full px-1 hyphens-auto">
                        {card.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-[--muted] text-xs sm:text-sm text-center mt-auto">
              Escucha el audio o lee la transcripción IPA y selecciona su palabra en inglés correspondiente.
            </p>
      </div>
    </div>
  );
};

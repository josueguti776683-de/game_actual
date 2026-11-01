import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { levelsData } from "../data";
import { VocabItem } from "../types";
import { playAudio } from "../utils/audioEngine";
import { combatAudio } from "../utils/combatAudio";
import { getUSIPA } from "../utils/ipa";
import { CompletionScreen } from "./CompletionScreen";
import { PronunciationButton } from "./PronunciationButton";
import {
  Plane,
  Volume2,
  VolumeX,
  Radio,
  AlertTriangle,
  CheckCircle2,
  Award,
  Sparkles,
  Flame,
  ArrowRight,
  Shield,
  Target,
  RotateCcw,
  Shuffle
} from "lucide-react";

interface Play8AirChallengeModeProps {
  levelId: number;
  onBack: () => void;
}

// 6 Mini-game stages per 6-word batch: 1 Learn & Write, 2 Multiple Choice, 3 Pairs, 4 Typing, 5 Audio, 6 Scramble
type ChallengeStage = 1 | 2 | 3 | 4 | 5 | 6;

// Scramble letters helper for Stage 6
function scrambleWord(text: string): string {
  if (!text) return "";
  const clean = text.trim();
  const words = clean.split(/\s+/);

  return words
    .map((w) => {
      if (w.length <= 1) return w;
      const chars = w.split("");
      let scrambled = w;
      let attempts = 0;
      while (scrambled.toUpperCase() === w.toUpperCase() && attempts < 35) {
        attempts++;
        for (let i = chars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [chars[i], chars[j]] = [chars[j], chars[i]];
        }
        scrambled = chars.join("");
      }
      if (scrambled.toUpperCase() === w.toUpperCase() && chars.length > 1) {
        scrambled = chars.slice().reverse().join("");
      }
      return scrambled;
    })
    .join(" ");
}

interface MultipleChoiceQuestion {
  item: VocabItem;
  options: VocabItem[];
  correctIndex: number;
}

interface MatchCard {
  id: string;
  word: string;
  text: string;
  type: "EN" | "ES";
  original: VocabItem;
}

export function Play8AirChallengeMode({
  levelId,
  onBack,
}: Play8AirChallengeModeProps) {
  const isLestime = levelId === 999 || levelId === 909;

  const level = useMemo(() => {
    if (levelsData[levelId]) {
      return levelsData[levelId];
    }
    // Safe fallback for special modes (5-min speed test, Lestime) or unmapped level IDs
    const allVocab: VocabItem[] = [];
    Object.values(levelsData).forEach((l) => {
      if (l && l.vocab) allVocab.push(...l.vocab);
      if (l && l.vocabPlay3) allVocab.push(...l.vocabPlay3);
    });
    const uniqueVocab = Array.from(new Map(allVocab.map((v) => [v.word, v])).values());
    return {
      id: levelId,
      name: isLestime ? "MODO DESAFÍO RÁPIDO" : `NIVEL ${levelId}`,
      vocab: uniqueVocab.slice(0, 30),
      sentences: [],
      vocabPlay3: uniqueVocab.slice(30, 90),
    };
  }, [levelId, isLestime]);

  // 1. Vocabulary Extraction for the 3 Challenges (30 words each)
  const challenge1Vocab = useMemo(() => {
    const list = level?.vocab || [];
    if (list.length >= 30) return list.slice(0, 30);
    const extra = level?.vocabPlay3 || [];
    return [...list, ...extra].slice(0, 30);
  }, [level]);

  const challenge2Vocab = useMemo(() => {
    const list = level?.vocabPlay3 || [];
    if (list.length >= 30) return list.slice(0, 30);
    return (level?.vocab || []).slice(0, 30);
  }, [level]);

  const challenge3Vocab = useMemo(() => {
    const list = (level?.vocabPlay3 || []).slice(30, 60);
    if (list.length >= 30) return list;
    return (level?.vocab || []).slice(0, 30);
  }, [level]);

  // Main flow states
  const [phase, setPhase] = useState<"SELECT" | "IN_GAME" | "COMPLETE">("SELECT");
  const [selectedChallenge, setSelectedChallenge] = useState<1 | 2 | 3>(1);
  const [activeVocab, setActiveVocab] = useState<VocabItem[]>([]);

  // Batching (5 batches of 6 words = 30 words)
  const BATCH_SIZE = 6;
  const [batchIndex, setBatchIndex] = useState(0); // 0 to 4
  const [stage, setStage] = useState<ChallengeStage>(1);
  const [subPhase, setSubPhase] = useState<"PLAYING" | "INTERMEDIO" | "PENALTY">("PLAYING");

  // Scoring and telemetry
  const [score, setScore] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [stageErrors, setStageErrors] = useState(0);
  const [combo, setCombo] = useState(0);
  const [isSfxMuted, setIsSfxMuted] = useState(false);

  // Penalty Modal State
  const [penaltyTarget, setPenaltyTarget] = useState<VocabItem | null>(null);
  const [penaltyInput, setPenaltyInput] = useState("");
  const [penaltyCount, setPenaltyCount] = useState(0);
  const [hasPenaltyTypo, setHasPenaltyTypo] = useState(false);
  const [resumeCallback, setResumeCallback] = useState<(() => void) | null>(null);
  const penaltyInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (subPhase === "PENALTY") {
      setPenaltyCount(0);
      setPenaltyInput("");
      setHasPenaltyTypo(false);
    }
  }, [subPhase]);

  // Active 6 words for current batch
  const currentBatchWords = useMemo(() => {
    const start = batchIndex * BATCH_SIZE;
    return activeVocab.slice(start, start + BATCH_SIZE);
  }, [activeVocab, batchIndex]);

  // ==========================================
  // STAGE 1: LEARN & WRITE STATE (like Play 1)
  // ==========================================
  const [learnIdx, setLearnIdx] = useState(0);
  const [learnSubStep, setLearnSubStep] = useState<"PREVIEW" | "WRITE">("PREVIEW");
  const [learnInput, setLearnInput] = useState("");
  const [isLearnTransOpen, setIsLearnTransOpen] = useState(true);
  const [isLearnFuncOpen, setIsLearnFuncOpen] = useState(true);
  const learnInputRef = useRef<HTMLInputElement>(null);

  const currentLearnWord = currentBatchWords[learnIdx] || null;

  const handleLearnClick = () => {
    combatAudio.playLockTone();
    setLearnSubStep("WRITE");
    setLearnInput("");
  };

  const handleLearnSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!currentLearnWord) return;

    const typed = learnInput.trim().toUpperCase();
    const target = currentLearnWord.word.toUpperCase();

    if (typed === target) {
      combatAudio.playMissileLaunch();
      playAudio(currentLearnWord.word);
      setScore((s) => s + 100);
      setCombo((c) => c + 1);

      if (learnIdx + 1 < currentBatchWords.length) {
        setLearnIdx((prev) => prev + 1);
        setLearnSubStep("PREVIEW");
        setLearnInput("");
      } else {
        combatAudio.playLockTone();
        setSubPhase("INTERMEDIO");
      }
    } else {
      triggerPenalty(currentLearnWord, () => {
        setLearnInput("");
        setSubPhase("PLAYING");
      });
    }
  };

  // ==========================================
  // STAGE 2: MULTIPLE CHOICE STATE
  // ==========================================
  const [mcCurrentIdx, setMcCurrentIdx] = useState(0);
  const [mcSelectedOption, setMcSelectedOption] = useState<number | null>(null);

  const currentMcQuestion = useMemo<MultipleChoiceQuestion | null>(() => {
    if (!currentBatchWords.length || mcCurrentIdx >= currentBatchWords.length) return null;
    const item = currentBatchWords[mcCurrentIdx];

    // Pick 2 decoys from activeVocab (1 correct + 2 false = 3 options total)
    const others = activeVocab.filter((v) => v.word !== item.word);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random());
    const decoys = shuffledOthers.slice(0, 2);

    const options = [item, ...decoys].sort(() => 0.5 - Math.random());
    const correctIndex = options.findIndex((opt) => opt.word === item.word);

    return { item, options, correctIndex };
  }, [currentBatchWords, mcCurrentIdx, activeVocab]);

  // ==========================================
  // STAGE 2: MATCH PAIRS STATE
  // ==========================================
  const [enCards, setEnCards] = useState<MatchCard[]>([]);
  const [esCards, setEsCards] = useState<MatchCard[]>([]);
  const [selectedEnId, setSelectedEnId] = useState<string | null>(null);
  const [selectedEsId, setSelectedEsId] = useState<string | null>(null);
  const [matchedWords, setMatchedWords] = useState<Set<string>>(new Set());
  const [matchFeedback, setMatchFeedback] = useState<{
    enId: string;
    esId: string;
    status: "correct" | "wrong";
  } | null>(null);

  // ==========================================
  // STAGE 3: TYPING TEST STATE
  // ==========================================
  const [typingIdx, setTypingIdx] = useState(0);
  const [typingInput, setTypingInput] = useState("");

  // ==========================================
  // STAGE 4: AUDIO & HIDDEN WORD STATE
  // ==========================================
  const [audioTestIdx, setAudioTestIdx] = useState(0);
  const [audioInput, setAudioInput] = useState("");

  // Mask word with first and last letter visible
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

  // Toggle SFX mute
  const handleToggleSfx = () => {
    const muted = combatAudio.toggleMute();
    setIsSfxMuted(muted);
  };

  // Trigger Penalty Modal
  const triggerPenalty = (target: VocabItem, onResolved: () => void) => {
    combatAudio.playWarning();
    setTotalErrors((prev) => prev + 1);
    setStageErrors((prev) => prev + 1);
    setCombo(0);

    setPenaltyTarget(target);
    setPenaltyInput("");
    setPenaltyCount(0);
    setHasPenaltyTypo(false);
    setResumeCallback(() => onResolved);
    setSubPhase("PENALTY");
  };

  // Handle Penalty Input Change
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
          combatAudio.playLockTone();
          setTimeout(() => {
            setSubPhase("PLAYING");
            setPenaltyTarget(null);
            setPenaltyCount(0);
            setPenaltyInput("");
            setHasPenaltyTypo(false);
            if (resumeCallback) {
              resumeCallback();
            }
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

  // Initialize Match Pairs for current batch
  const initMatchPairs = useCallback((words: VocabItem[]) => {
    const en: MatchCard[] = words.map((w, idx) => ({
      id: `en-${idx}-${w.word}`,
      word: w.word,
      text: w.displayWord || w.word,
      type: "EN",
      original: w,
    }));
    const es: MatchCard[] = words.map((w, idx) => ({
      id: `es-${idx}-${w.word}`,
      word: w.word,
      text: w.trans,
      type: "ES",
      original: w,
    }));

    setEnCards([...en].sort(() => 0.5 - Math.random()));
    setEsCards([...es].sort(() => 0.5 - Math.random()));
    setSelectedEnId(null);
    setSelectedEsId(null);
    setMatchedWords(new Set());
    setMatchFeedback(null);
  }, []);

  // Start selected challenge mission
  const handleStartMission = (challengeNum: 1 | 2 | 3) => {
    let vocabList: VocabItem[] = [];
    if (challengeNum === 1) vocabList = challenge1Vocab;
    else if (challengeNum === 2) vocabList = challenge2Vocab;
    else vocabList = challenge3Vocab;

    if (vocabList.length === 0) return;

    setSelectedChallenge(challengeNum);
    setActiveVocab(vocabList);
    setBatchIndex(0);
    setStage(1);
    setScore(0);
    setTotalErrors(0);
    setStageErrors(0);
    setCombo(0);

    // Reset stages
    setLearnIdx(0);
    setLearnSubStep("PREVIEW");
    setLearnInput("");
    setMcCurrentIdx(0);
    setMcSelectedOption(null);
    setTypingIdx(0);
    setTypingInput("");
    setAudioTestIdx(0);
    setAudioInput("");
    setScrambleIdx(0);
    setScrambleSubStep("PREVIEW");
    setScrambleInput("");
    setSubPhase("PLAYING");
    setPhase("IN_GAME");
    combatAudio.playLockTone();
  };

  // Move to next stage in current batch, or next batch if stage 6 completed
  const handleNextStage = () => {
    combatAudio.playLockTone();
    setStageErrors(0);

    if (stage === 1) {
      // Transition from Stage 1 (Learn & Write) to Stage 2: Multiple Choice
      setStage(2);
      setMcCurrentIdx(0);
      setMcSelectedOption(null);
      setSubPhase("PLAYING");
    } else if (stage === 2) {
      // Transition to Stage 3: Match Pairs
      setStage(3);
      initMatchPairs(currentBatchWords);
      setSubPhase("PLAYING");
    } else if (stage === 3) {
      // Transition to Stage 4: Typing
      setStage(4);
      setTypingIdx(0);
      setTypingInput("");
      setSubPhase("PLAYING");
    } else if (stage === 4) {
      // Transition to Stage 5: Audio Test
      setStage(5);
      setAudioTestIdx(0);
      setAudioInput("");
      setSubPhase("PLAYING");
      // Read first audio
      if (currentBatchWords[0]) {
        playAudio(currentBatchWords[0].word);
      }
    } else if (stage === 5) {
      // Transition to Stage 6: Orden y Mezcla (Scramble & Unscramble)
      setStage(6);
      setScrambleIdx(0);
      setScrambleSubStep("PREVIEW");
      setScrambleInput("");
      setSubPhase("PLAYING");
    } else if (stage === 6) {
      // End of this batch!
      if (batchIndex + 1 < 5) {
        // Next 6 words batch!
        const nextBatch = batchIndex + 1;
        setBatchIndex(nextBatch);
        setStage(1);
        setLearnIdx(0);
        setLearnSubStep("PREVIEW");
        setLearnInput("");
        setMcCurrentIdx(0);
        setMcSelectedOption(null);
        setTypingIdx(0);
        setTypingInput("");
        setAudioTestIdx(0);
        setAudioInput("");
        setScrambleIdx(0);
        setScrambleSubStep("PREVIEW");
        setScrambleInput("");
        setSubPhase("PLAYING");
      } else {
        // Complete all 30 words!
        combatAudio.playVictoryChime();
        setPhase("COMPLETE");
      }
    }
  };

  // Repeat current mission/stage for the current batch of words
  const handleRepeatStage = () => {
    combatAudio.playLockTone();
    setStageErrors(0);

    if (stage === 1) {
      setLearnIdx(0);
      setLearnSubStep("PREVIEW");
      setLearnInput("");
      setSubPhase("PLAYING");
    } else if (stage === 2) {
      setMcCurrentIdx(0);
      setMcSelectedOption(null);
      setSubPhase("PLAYING");
    } else if (stage === 3) {
      initMatchPairs(currentBatchWords);
      setSubPhase("PLAYING");
    } else if (stage === 4) {
      setTypingIdx(0);
      setTypingInput("");
      setSubPhase("PLAYING");
    } else if (stage === 5) {
      setAudioTestIdx(0);
      setAudioInput("");
      setSubPhase("PLAYING");
      if (currentBatchWords[0]) {
        playAudio(currentBatchWords[0].word);
      }
    } else if (stage === 6) {
      setScrambleIdx(0);
      setScrambleSubStep("PREVIEW");
      setScrambleInput("");
      setSubPhase("PLAYING");
    }
  };

  // ==========================================
  // STAGE 1 HANDLERS (Multiple Choice)
  // ==========================================
  const handleMcOptionClick = (optionIdx: number) => {
    if (mcSelectedOption !== null || !currentMcQuestion) return;

    setMcSelectedOption(optionIdx);
    const isCorrect = optionIdx === currentMcQuestion.correctIndex;

    if (isCorrect) {
      combatAudio.playMissileLaunch();
      playAudio(currentMcQuestion.item.word);
      const newCombo = combo + 1;
      setCombo(newCombo);
      setScore((s) => s + 100 + newCombo * 20);

      setTimeout(() => {
        setMcSelectedOption(null);
        if (mcCurrentIdx + 1 < currentBatchWords.length) {
          setMcCurrentIdx((idx) => idx + 1);
        } else {
          // Finished Stage 1 for this batch!
          combatAudio.playLockTone();
          setSubPhase("INTERMEDIO");
        }
      }, 700);
    } else {
      triggerPenalty(currentMcQuestion.item, () => {
        setMcSelectedOption(null);
        // Repeat or advance
      });
    }
  };

  // ==========================================
  // STAGE 2 HANDLERS (Match Pairs)
  // ==========================================
  const handleCardClick = (card: MatchCard) => {
    if (matchFeedback) return;

    if (card.type === "EN") {
      if (selectedEnId === card.id) {
        setSelectedEnId(null);
        return;
      }
      setSelectedEnId(card.id);
      playAudio(card.word);

      if (selectedEsId) {
        checkMatch(card.id, selectedEsId);
      }
    } else {
      if (selectedEsId === card.id) {
        setSelectedEsId(null);
        return;
      }
      setSelectedEsId(card.id);

      if (selectedEnId) {
        checkMatch(selectedEnId, card.id);
      }
    }
  };

  const checkMatch = (enId: string, esId: string) => {
    const enCard = enCards.find((c) => c.id === enId);
    const esCard = esCards.find((c) => c.id === esId);

    if (!enCard || !esCard) return;

    if (enCard.word === esCard.word) {
      // Correct match!
      combatAudio.playLockTone();
      setMatchFeedback({ enId, esId, status: "correct" });

      const newCombo = combo + 1;
      setCombo(newCombo);
      setScore((s) => s + 120 + newCombo * 15);

      setTimeout(() => {
        const nextMatched = new Set(matchedWords);
        nextMatched.add(enCard.word);
        setMatchedWords(nextMatched);
        setSelectedEnId(null);
        setSelectedEsId(null);
        setMatchFeedback(null);

        // Check if all 6 matched
        if (nextMatched.size >= currentBatchWords.length) {
          setTimeout(() => {
            combatAudio.playLockTone();
            setSubPhase("INTERMEDIO");
          }, 300);
        }
      }, 400);
    } else {
      // Wrong match
      combatAudio.playWarning();
      setTotalErrors((e) => e + 1);
      setStageErrors((e) => e + 1);
      setCombo(0);
      setMatchFeedback({ enId, esId, status: "wrong" });

      setTimeout(() => {
        setSelectedEnId(null);
        setSelectedEsId(null);
        setMatchFeedback(null);
      }, 700);
    }
  };

  // ==========================================
  // STAGE 3 HANDLERS (Typing Test)
  // ==========================================
  const currentTypingWord = currentBatchWords[typingIdx] || null;

  const handleTypingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTypingInput(val);

    if (!currentTypingWord) return;

    if (val.trim().toUpperCase() === currentTypingWord.word.toUpperCase()) {
      combatAudio.playLockTone();
      playAudio(currentTypingWord.word);
      const newCombo = combo + 1;
      setCombo(newCombo);
      setScore((s) => s + 150 + newCombo * 25);

      setTimeout(() => {
        setTypingInput("");
        if (typingIdx + 1 < currentBatchWords.length) {
          setTypingIdx((idx) => idx + 1);
        } else {
          combatAudio.playLockTone();
          setSubPhase("INTERMEDIO");
        }
      }, 300);
    }
  };

  const handleTypingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTypingWord || !typingInput.trim()) return;

    if (typingInput.trim().toUpperCase() !== currentTypingWord.word.toUpperCase()) {
      triggerPenalty(currentTypingWord, () => {
        setTypingInput("");
      });
    }
  };

  // ==========================================
  // STAGE 5 HANDLERS (Audio & Hidden Word Test)
  // ==========================================
  const currentAudioWord = currentBatchWords[audioTestIdx] || null;

  useEffect(() => {
    if (stage === 5 && subPhase === "PLAYING" && currentAudioWord) {
      playAudio(currentAudioWord.word);
    }
  }, [stage, subPhase, audioTestIdx, currentAudioWord]);

  const handleAudioInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAudioInput(val);

    if (!currentAudioWord) return;

    if (val.trim().toUpperCase() === currentAudioWord.word.toUpperCase()) {
      combatAudio.playLockTone();
      playAudio(currentAudioWord.word);
      const newCombo = combo + 1;
      setCombo(newCombo);
      setScore((s) => s + 150 + newCombo * 25);

      setTimeout(() => {
        setAudioInput("");
        if (audioTestIdx + 1 < currentBatchWords.length) {
          setAudioTestIdx((idx) => idx + 1);
        } else {
          combatAudio.playLockTone();
          setSubPhase("INTERMEDIO");
        }
      }, 300);
    }
  };

  const handleAudioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAudioWord || !audioInput.trim()) return;

    if (audioInput.trim().toUpperCase() !== currentAudioWord.word.toUpperCase()) {
      triggerPenalty(currentAudioWord, () => {
        setAudioInput("");
      });
    }
  };

  // ==========================================
  // STAGE 6: ORDEN Y MEZCLA STATE & HANDLERS
  // ==========================================
  const [scrambleIdx, setScrambleIdx] = useState(0);
  const [scrambleSubStep, setScrambleSubStep] = useState<"PREVIEW" | "WRITE">("PREVIEW");
  const [scrambleInput, setScrambleInput] = useState("");
  const scrambleInputRef = useRef<HTMLInputElement>(null);

  const currentScrambleWord = currentBatchWords[scrambleIdx] || null;

  const scrambledWordText = useMemo(() => {
    if (!currentScrambleWord) return "";
    return scrambleWord(currentScrambleWord.word);
  }, [currentScrambleWord]);

  const handleScrambleStartWrite = () => {
    combatAudio.playLockTone();
    setScrambleSubStep("WRITE");
    setScrambleInput("");
  };

  const handleScrambleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!currentScrambleWord) return;

    const typed = scrambleInput.trim().toUpperCase();
    const target = currentScrambleWord.word.toUpperCase();

    if (typed === target) {
      combatAudio.playMissileLaunch();
      playAudio(currentScrambleWord.word);
      setScore((s) => s + 100);
      setCombo((c) => c + 1);

      if (scrambleIdx + 1 < currentBatchWords.length) {
        setScrambleIdx((prev) => prev + 1);
        setScrambleSubStep("PREVIEW");
        setScrambleInput("");
      } else {
        combatAudio.playLockTone();
        setSubPhase("INTERMEDIO");
      }
    } else {
      triggerPenalty(currentScrambleWord, () => {
        setScrambleInput("");
        setSubPhase("PLAYING");
      });
    }
  };

  // Safety & Motivation Messages based on error count
  const intermedioMessage = useMemo(() => {
    if (stageErrors > 0) {
      const accidentAlerts = [
        "⚠️ ALERTA DE SEGURIDAD OPERACIONAL: Un error en mantenimiento técnico pone en riesgo vidas y derriba aeronaves. ¡Atención al detalle y precisión estricta!",
        "💥 REPORTE DE DISCREPANCIA TÉCNICA: En aviación un manual mal interpretado genera accidentes graves. ¡Aprende del fallo y corrige con rigor!",
        "🚨 ALERTA ROJA EN VUELO: Un procedimiento técnico erróneo derriba aeronaves y cobra vidas humanas. ¡Enfócate y no permitas que vuelva a repetirse!",
        "🛠️ RIGOR PROFESIONAL: El mecánico aeronautico firma con su vida y la de los pasajeros. ¡Cero tolerancia a descuidos técnicos!",
      ];
      return accidentAlerts[(batchIndex + stage) % accidentAlerts.length];
    } else {
      const cleanFlightAlerts = [
        "✈️ ¡BRAVO! ERES EL MEJOR TÉCNICO: Aeronaves en vuelo 100% seguro. ¡Buen trabajo mecánico, todos los sistemas operan en excelencia!",
        "🛡️ RIGOR AERONÁUTICO IMPECABLE: Cero discrepancias operativas. Mantenimiento certificado con estándar de oro.",
        "⭐ ESCUADRÓN EN FORMACIÓN PERFECTA: Misión completada sin fallas. ¡Excelente disciplina y velocidad técnica!",
        "🌟 ESTÁNDAR TOP GUN: Precisión absoluta en la interpretación técnica aeronáutica. ¡Continúa con el mismo temple!",
      ];
      return cleanFlightAlerts[(batchIndex + stage) % cleanFlightAlerts.length];
    }
  }, [stageErrors, batchIndex, stage]);

  // ==========================================
  // COMPLETION SCREEN
  // ==========================================
  if (phase === "COMPLETE") {
    return (
      <div className="min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
        <CompletionScreen
          playName="PLAY 8 • AIR CHALLENGE"
          gradeText={`DESAFÍO ${selectedChallenge} • ${level?.name || `NIVEL ${levelId}`} | PUNTOS: ${score}`}
          totalErrors={totalErrors}
          onAgain={() => handleStartMission(selectedChallenge)}
          onHome={onBack}
        />
      </div>
    );
  }

  // ==========================================
  // START / SELECTION SCREEN
  // ==========================================
  if (phase === "SELECT") {
    return (
      <div className="min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
        {/* Encabezado: Título PLAY 8 - AIR CHALLENGE */}
        <div className="w-full max-w-[680px] flex flex-col items-center mb-3 sm:mb-4 px-1">
          <div className="dict-header text-center w-full">
            <h1 className="text-2xl sm:text-3xl md:text-[2.2rem] font-[900] uppercase m-0 leading-tight text-white flex items-center justify-center gap-2">
              PLAY 8 - AIR CHALLENGE
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
              ⬅ VOLVER A PLAYS
            </button>
          </div>
        </div>

        {/* Tarjeta de Selección con contorno celeste */}
        <div className="play-card !mt-0 !mb-2 animate-in slide-in-from-right duration-300 w-full max-w-[680px]">
          {/* Avión parpadeante / radar horizonte artificial táctico */}
          <div className="relative border border-[#79c6ff]/40 bg-[#0a1628] rounded-2xl p-5 sm:p-6 flex flex-col items-center gap-3 text-center shadow-[0_0_25px_rgba(121,198,255,0.12)] overflow-hidden mb-4">
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #79c6ff 1px, transparent 1px), linear-gradient(to right, rgba(121,198,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(121,198,255,0.05) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-[#0c1e38] border-2 border-[#79c6ff] text-[#79c6ff] flex items-center justify-center text-3xl shadow-lg animate-pulse">
                ✈️
              </div>
              <span className="text-xs text-amber-400 font-black uppercase tracking-widest">
                SISTEMA DE ENTRENAMIENTO INTEGRAL Y RETENCIÓN
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-white m-0">
                SELECCIONA TU DESAFÍO TÉCNICO
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-[520px] leading-relaxed">
                Cada desafío reúne 30 palabras organizadas en bloques de 6. Superarás de forma consecutiva las 6 misiones tácticas: Aprender & Escribir, Selección Múltiple, Emparejamiento, Escritura Táctica, Comprensión Auditiva y Orden y Mezcla.
              </p>
            </div>
          </div>

          {/* Opciones: Desafío 1, 2 y 3 */}
          <div className="flex flex-col gap-3.5 w-full my-1">
            <button
              onClick={() => setSelectedChallenge(1)}
              className={`game-card w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                selectedChallenge === 1
                  ? "bg-[#112544] border-[#79c6ff] shadow-[0_0_20px_rgba(121,198,255,0.3)] scale-[1.01]"
                  : "bg-[#0c1a2f] border-[#79c6ff]/40 hover:bg-[#79c6ff]/10"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] flex items-center justify-center text-lg font-black shrink-0">
                  D1
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-base sm:text-lg font-extrabold text-white">
                    DESAFÍO 1
                  </span>
                  <span className="text-xs text-[#79c6ff] font-semibold tracking-wider uppercase">
                    30 PALABRAS (PLAY 1 • 1 - 30)
                  </span>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-bold bg-[#79c6ff]/10 px-3 py-1.5 rounded-xl border border-[#79c6ff]/30 text-[#79c6ff]">
                {selectedChallenge === 1 ? "✓ SELECCIONADO" : "ELEGIR"}
              </span>
            </button>

            <button
              onClick={() => setSelectedChallenge(2)}
              className={`game-card w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                selectedChallenge === 2
                  ? "bg-[#112544] border-[#79c6ff] shadow-[0_0_20px_rgba(121,198,255,0.3)] scale-[1.01]"
                  : "bg-[#0c1a2f] border-[#79c6ff]/40 hover:bg-[#79c6ff]/10"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] flex items-center justify-center text-lg font-black shrink-0">
                  D2
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-base sm:text-lg font-extrabold text-white">
                    DESAFÍO 2
                  </span>
                  <span className="text-xs text-[#79c6ff] font-semibold tracking-wider uppercase">
                    30 PALABRAS (PLAY 3 • 1 - 30)
                  </span>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-bold bg-[#79c6ff]/10 px-3 py-1.5 rounded-xl border border-[#79c6ff]/30 text-[#79c6ff]">
                {selectedChallenge === 2 ? "✓ SELECCIONADO" : "ELEGIR"}
              </span>
            </button>

            <button
              onClick={() => setSelectedChallenge(3)}
              className={`game-card w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                selectedChallenge === 3
                  ? "bg-[#112544] border-[#79c6ff] shadow-[0_0_20px_rgba(121,198,255,0.3)] scale-[1.01]"
                  : "bg-[#0c1a2f] border-[#79c6ff]/40 hover:bg-[#79c6ff]/10"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] flex items-center justify-center text-lg font-black shrink-0">
                  D3
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-base sm:text-lg font-extrabold text-white">
                    DESAFÍO 3
                  </span>
                  <span className="text-xs text-[#79c6ff] font-semibold tracking-wider uppercase">
                    30 PALABRAS (PLAY 3 • 31 - 60)
                  </span>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-bold bg-[#79c6ff]/10 px-3 py-1.5 rounded-xl border border-[#79c6ff]/30 text-[#79c6ff]">
                {selectedChallenge === 3 ? "✓ SELECCIONADO" : "ELEGIR"}
              </span>
            </button>
          </div>

          {/* Botón Iniciar Misión de Prueba */}
          <button
            onClick={() => handleStartMission(selectedChallenge)}
            className="main-btn w-full py-4 text-base sm:text-lg tracking-widest uppercase mt-4 shadow-[0_0_25px_rgba(79,167,255,0.4)] cursor-pointer flex items-center justify-center gap-2 font-black"
          >
            <span>🚀 INICIAR MISIÓN DE PRUEBA</span>
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // IN-GAME SCREEN: COCKPIT CABIN & ARTIFICIAL HORIZON
  // ==========================================
  return (
    <div className="min-h-screen w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
      {/* 1. Encabezado Táctico Superior */}
      <div className="w-full max-w-[680px] flex flex-col items-center mb-3 sm:mb-4 px-1">
        <div className="dict-header text-center w-full">
          <h1 className="text-2xl sm:text-3xl md:text-[2.2rem] font-[900] uppercase m-0 leading-tight text-white flex items-center justify-center gap-2">
            PLAY 8 - AIR CHALLENGE
          </h1>
          <div className="text-[--muted] text-xs sm:text-sm font-[600] mt-1 uppercase tracking-wide">
            {level?.name} • DESAFÍO {selectedChallenge}
          </div>
        </div>

        {/* Barra de Controles Rápidos: Botón Volver + Mute SFX */}
        <div className="w-full flex items-center justify-between mt-3 px-1">
          <button
            onClick={() => setPhase("SELECT")}
            className="home-btn px-4 py-2 font-bold text-xs sm:text-sm uppercase cursor-pointer border-none shadow-md"
          >
            ⬅ MENÚ PLAY 8
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSfx}
              title={isSfxMuted ? "Activar Sonido" : "Silenciar Sonido"}
              className="p-2 rounded-xl bg-[#091629] border border-[#79c6ff]/30 text-[#79c6ff] hover:bg-[#79c6ff]/20 transition-all cursor-pointer"
            >
              {isSfxMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. CABINA DE VUELO & HORIZONTE ARTIFICIAL (COCKPIT HUD FLIGHT DECK) */}
      <div className="play-card !mt-0 !mb-2 animate-in fade-in duration-300 w-full max-w-[680px] flex flex-col gap-3 relative overflow-hidden bg-[#06101d] border-2 border-[#79c6ff]/50">
        {/* HUD INSTRUMENT PANEL: Telemetría de Puntos, Errores, Bloque y Etapa (Solo durante el juego, no en intermedio) */}
        {subPhase === "PLAYING" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full z-10 animate-in fade-in duration-200">
            <div className="bg-[#09172c]/90 border border-[#79c6ff]/30 rounded-xl p-2 flex flex-col items-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold">PUNTOS</span>
              <span className="text-base font-black text-amber-400">{score} PTS</span>
            </div>

            <div className="bg-[#09172c]/90 border border-[#79c6ff]/30 rounded-xl p-2 flex flex-col items-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold">FALLAS</span>
              <span className={`text-base font-black ${totalErrors > 0 ? "text-red-400" : "text-emerald-400"}`}>
                {totalErrors}
              </span>
            </div>

            <div className="bg-[#09172c]/90 border border-[#79c6ff]/30 rounded-xl p-2 flex flex-col items-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold">BLOQUE</span>
              <span className="text-base font-black text-[#79c6ff]">
                {batchIndex + 1}/5 ({batchIndex * 6 + 1}-{(batchIndex + 1) * 6})
              </span>
            </div>

            <div className="bg-[#09172c]/90 border border-[#79c6ff]/30 rounded-xl p-2 flex flex-col items-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold">MISIÓN</span>
              <span className="text-base font-black text-sky-300">
                {stage === 1
                  ? "1/6 APRENDER"
                  : stage === 2
                  ? "2/6 MULTIPLE"
                  : stage === 3
                  ? "3/6 PARES"
                  : stage === 4
                  ? "4/6 ESCRITURA"
                  : stage === 5
                  ? "5/6 AUDIO"
                  : "6/6 ORDEN"}
              </span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SUBPHASE: INTERMEDIO / DESCANSO ENTRE MISIONES            */}
        {/* ========================================================= */}
        {subPhase === "INTERMEDIO" && (
          <div className="flex flex-col items-center gap-4 py-2 sm:py-4 animate-in zoom-in-95 text-center">
            {/* ESCENA EN EL AIRE: ESCUADRÓN DE 6 AVIONES (CORRESPONDIENTES A LAS 6 PALABRAS) */}
            {(() => {
              const numAccidents = Math.min(stageErrors, 6);
              const numSafe = 6 - numAccidents;

              const AIRCRAFT_FLEET = [
                {
                  id: 0,
                  callsign: "ALPHA 1",
                  role: "LÍDER",
                  model: "✈️",
                  modelDesc: "Jet Táctico Pesado",
                  isCenter: true,
                  posClass: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30",
                },
                {
                  id: 1,
                  callsign: "BRAVO 2",
                  role: "ESCOLTA",
                  model: "🛩️",
                  modelDesc: "Caza Reactor",
                  isCenter: false,
                  posClass: "top-4 sm:top-5 left-2.5 sm:left-5 z-20",
                },
                {
                  id: 2,
                  callsign: "CHARLIE 3",
                  role: "INTERCEPTOR",
                  model: "🛫",
                  modelDesc: "Supersónico",
                  isCenter: false,
                  posClass: "top-4 sm:top-5 right-2.5 sm:right-5 z-20",
                },
                {
                  id: 3,
                  callsign: "DELTA 4",
                  role: "HELICÓPTERO",
                  model: "🚁",
                  modelDesc: "Helicóptero",
                  isCenter: false,
                  posClass: "bottom-4 sm:bottom-6 left-2.5 sm:left-5 z-20",
                },
                {
                  id: 4,
                  callsign: "ECO 5",
                  role: "RECONOCIMIENTO",
                  model: "🛬",
                  modelDesc: "Bimotor",
                  isCenter: false,
                  posClass: "bottom-4 sm:bottom-6 right-2.5 sm:right-5 z-20",
                },
                {
                  id: 5,
                  callsign: "FOXTROT 6",
                  role: "VANGUARDIA",
                  model: "🛩️",
                  modelDesc: "Patrulla",
                  isCenter: false,
                  posClass: "top-4 sm:top-5 left-1/2 -translate-x-1/2 z-20",
                },
              ];

              return (
                <>
                  {/* CUADRO PRINCIPAL DE LAS 6 AERONAVES */}
                  <div className="relative w-full max-w-[560px] h-[370px] sm:h-[410px] bg-gradient-to-b from-[#092244] via-[#0b1c34] to-[#040d1a] rounded-2xl border-2 border-[#79c6ff]/40 overflow-hidden flex flex-col justify-center items-center p-3 sm:p-4 shadow-[0_0_30px_rgba(121,198,255,0.2)] select-none">
                    {/* Radar HUD concéntrico en el fondo */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-[#79c6ff]/10 pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-52 sm:h-52 rounded-full border border-[#79c6ff]/15 pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(121,198,255,0.08)_0%,transparent_70%)] pointer-events-none" />

                    {/* Nubes distribuidas en la escena de vuelo */}
                    {/* Nubes a los lados del avión grande central */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-10 text-4xl sm:text-5xl opacity-80 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] animate-pulse pointer-events-none">
                      ☁️
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-10 text-4xl sm:text-5xl opacity-80 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] animate-pulse pointer-events-none">
                      ☁️
                    </div>
                    {/* Nubes ambientales flotantes */}
                    <div className="absolute top-24 left-16 sm:left-24 text-2xl opacity-30 animate-pulse pointer-events-none">
                      ☁️
                    </div>
                    <div className="absolute top-24 right-16 sm:right-24 text-2xl opacity-30 animate-pulse pointer-events-none">
                      ☁️
                    </div>
                    <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 text-3xl opacity-35 animate-pulse pointer-events-none">
                      ☁️
                    </div>

                    {/* RENDERIZADO DE LAS 6 AERONAVES DEL ESCUADRÓN */}
                    {AIRCRAFT_FLEET.map((craft) => {
                      const isAccident = craft.id < numAccidents;
                      const wordObj = currentBatchWords[craft.id];
                      const wordName = wordObj ? (wordObj.displayWord || wordObj.word) : `PALABRA ${craft.id + 1}`;

                      if (craft.isCenter) {
                        // 1. AVIÓN GRANDE PRINCIPAL (CENTRO)
                        return (
                          <div
                            key={craft.id}
                            className={`absolute ${craft.posClass} flex flex-col items-center justify-center text-center max-w-[200px]`}
                          >
                            {isAccident ? (
                              <div className="flex flex-col items-center animate-pulse">
                                <div className="relative flex items-center justify-center">
                                  <span className="text-6xl sm:text-7xl transform rotate-45 inline-block filter drop-shadow-[0_0_25px_rgba(239,68,68,0.95)] leading-none">
                                    🛩️
                                  </span>
                                  <span className="absolute -top-4 -right-3 text-3xl sm:text-4xl animate-ping">💥</span>
                                  <span className="absolute -bottom-3 -left-3 text-2xl sm:text-3xl">🔥</span>
                                </div>
                                <span className="text-sm sm:text-base font-black text-red-300 font-mono mt-2 tracking-widest uppercase bg-red-950/90 px-4 py-1 rounded-xl border border-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.7)]">
                                  ¡ACCIDENTE!
                                </span>
                                <span className="text-[10px] sm:text-xs text-red-400 font-mono mt-0.5 uppercase tracking-wider font-bold truncate max-w-[180px]">
                                  {craft.callsign} • {wordName}
                                </span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center">
                                <span className="text-6xl sm:text-7xl filter drop-shadow-[0_0_20px_rgba(121,198,255,0.85)] animate-bounce leading-none">
                                  {craft.model}
                                </span>
                                <span className="text-xs sm:text-sm font-black text-emerald-300 font-mono mt-2 tracking-widest uppercase bg-emerald-950/90 px-3.5 py-1 rounded-xl border border-emerald-500/70 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                  ACIERTO • EN VUELO
                                </span>
                                <span className="text-[10px] sm:text-xs text-sky-300 font-mono mt-0.5 font-black tracking-widest uppercase bg-[#09172c]/90 px-3 py-0.5 rounded-full border border-[#79c6ff]/40 shadow-sm truncate max-w-[180px]">
                                  {craft.callsign} • {wordName}
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      }

                      // 2. OTRAS 5 AERONAVES (INCLUYE HELICÓPTERO Y CAZAS DISTRIBUIDOS)
                      return (
                        <div
                          key={craft.id}
                          className={`absolute ${craft.posClass} flex flex-col items-center text-center max-w-[125px] sm:max-w-[145px]`}
                        >
                          {isAccident ? (
                            <div className="flex flex-col items-center animate-pulse">
                              <div className="relative">
                                <span className="text-3xl sm:text-4xl transform rotate-45 inline-block filter drop-shadow-[0_0_15px_rgba(239,68,68,0.95)]">
                                  {craft.model}
                                </span>
                                <span className="absolute -top-2.5 -right-2 text-lg sm:text-xl animate-ping">💥</span>
                                <span className="absolute -bottom-2 -left-2 text-base sm:text-lg">🔥</span>
                              </div>
                              <span className="text-[8px] sm:text-[9px] text-red-300 font-mono mt-0.5 font-extrabold uppercase bg-red-950/90 px-2 py-0.5 rounded border border-red-500/60 shadow-sm">
                                ¡ACCIDENTE!
                              </span>
                              <span className="text-[8px] sm:text-[9px] text-red-400 font-mono font-bold uppercase tracking-tight truncate max-w-[120px]">
                                {craft.callsign} • {wordName}
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <span
                                className={`text-3xl sm:text-4xl filter drop-shadow-[0_0_12px_rgba(121,198,255,0.7)] ${
                                  craft.model === "🚁" ? "animate-pulse" : "animate-pulse transform -rotate-6"
                                }`}
                              >
                                {craft.model}
                              </span>
                              <span className="text-[8px] sm:text-[9px] text-emerald-300 font-mono mt-0.5 font-bold uppercase bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 shadow-sm">
                                ACIERTO
                              </span>
                              <span className="text-[8px] sm:text-[9px] text-sky-300 font-mono font-semibold uppercase tracking-tight truncate max-w-[120px]">
                                {craft.callsign} • {wordName}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* CONTADORES FUERA DEL CONTORNO (ENTRE EL CUADRADO DEL ESCUADRÓN Y EL MENSAJE DE MOTIVACIÓN) */}
                  <div className="w-full max-w-[560px] grid grid-cols-2 sm:grid-cols-3 gap-2 px-1">
                    {/* Contador de Aciertos */}
                    <div className="flex items-center justify-center gap-2 bg-[#081e36]/90 border border-emerald-500/60 px-3 py-2 rounded-xl shadow-md">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                      <span className="text-xs sm:text-sm font-mono font-black text-emerald-300">
                        {numSafe} ACIERTOS
                      </span>
                    </div>

                    {/* Contador de Accidentes */}
                    <div
                      className={`flex items-center justify-center gap-2 bg-[#081e36]/90 border px-3 py-2 rounded-xl shadow-md transition-all ${
                        numAccidents > 0
                          ? "border-red-500/70 bg-red-950/40 text-red-300"
                          : "border-slate-700/60 text-slate-400"
                      }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          numAccidents > 0
                            ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)] animate-ping"
                            : "bg-slate-500"
                        }`}
                      />
                      <span className="text-xs sm:text-sm font-mono font-black">
                        {numAccidents} ACCIDENTE(S)
                      </span>
                    </div>

                    {/* Estado del Escuadrón */}
                    <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 bg-[#081e36]/90 border border-[#79c6ff]/40 px-3 py-2 rounded-xl text-sky-200 text-xs sm:text-sm font-mono font-bold shadow-md">
                      <span>✈️</span>
                      <span>ESCUADRÓN: 6 AVIONES</span>
                    </div>
                  </div>
                </>
              );
            })()}

            {/* DEBAJO DE LOS AVIONES: Frase de Seguridad / Motivación Aeronáutica */}
            <div
              className={`p-4 rounded-xl border-2 w-full max-w-[500px] flex flex-col gap-1.5 transition-all ${
                stageErrors > 0
                  ? "bg-red-950/70 border-red-500 text-red-200 animate-border-pulse-red"
                  : "bg-emerald-950/60 border-emerald-500/80 text-emerald-200 shadow-[0_0_15px_rgba(74,222,128,0.25)]"
              }`}
            >
              <div className="flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest">
                {stageErrors > 0 ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span className="text-red-300">DISCREPANCIAS: {stageErrors} ERROR(ES) EN ESTA MISIÓN</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">MISIÓN PERFECTA: 0 ERRORES REGISTRADOS</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm font-semibold leading-relaxed m-0 text-white">
                {intermedioMessage}
              </p>
            </div>

            {/* NOTA ESPECIAL DE FIN DE BLOQUE / NUEVAS PALABRAS AL COMPLETAR ETAPA 6 (ORDEN Y MEZCLA) */}
            {stage === 6 && (
              <div className="w-full max-w-[500px] p-4 sm:p-5 rounded-2xl border-2 border-sky-400/80 bg-gradient-to-br from-[#0c2240] via-[#091b34] to-[#040e1d] shadow-[0_0_25px_rgba(56,189,248,0.25)] flex flex-col gap-3 text-left animate-in slide-in-from-bottom-2">
                {/* Cabecera de la Nota */}
                <div className="flex items-center justify-between border-b border-sky-400/30 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎖️</span>
                    <div>
                      <span className="text-xs sm:text-sm font-black text-sky-300 uppercase tracking-widest block leading-tight">
                        MISIÓN CUMPLIDA • BLOQUE {batchIndex + 1}/5
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Palabras {batchIndex * 6 + 1} a {(batchIndex + 1) * 6} de 30
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`text-[11px] font-mono font-black px-2.5 py-0.5 rounded-full border ${
                        stageErrors > 0
                          ? "bg-red-950/90 border-red-500/70 text-red-300"
                          : "bg-emerald-950/90 border-emerald-500/70 text-emerald-300"
                      }`}
                    >
                      {stageErrors > 0 ? `${stageErrors} ERROR(ES)` : "0 ERRORES"}
                    </span>
                    <span className="text-[9px] text-slate-400 mt-0.5">
                      Fallas acum.: {totalErrors}
                    </span>
                  </div>
                </div>

                {/* Resumen de Desempeño */}
                <p className="m-0 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Has completado con éxito la misión de <strong className="text-amber-300 font-bold">Orden y Mezcla</strong> y cerrado el ciclo táctico del bloque actual con <strong className={stageErrors > 0 ? "text-red-400 font-black" : "text-emerald-400 font-black"}>{stageErrors === 0 ? "0 errores (misión perfecta)" : `${stageErrors} error(es) registrado(s)`}</strong>.
                </p>

                {/* Sección Dinámica: Siguiente Misión Nuevas Palabras o Finalización */}
                {batchIndex + 1 < 5 ? (
                  <div className="bg-[#051428] border-2 border-sky-500/50 rounded-xl p-3 sm:p-3.5 flex flex-col gap-2 shadow-inner">
                    <div className="flex items-center gap-2 text-sky-300 font-black text-xs sm:text-sm uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
                      <span>SIGUIENTE MISIÓN: ¡NUEVAS PALABRAS!</span>
                    </div>
                    <p className="m-0 text-[11px] sm:text-xs text-slate-200 leading-relaxed">
                      ¡Entrando a un nuevo comienzo con nuevas palabras! En la siguiente misión comenzarás con el <strong className="text-sky-300 font-bold">Bloque {batchIndex + 2}/5</strong> correspondiente a las palabras <strong className="text-amber-300 font-black">{(batchIndex + 1) * 6 + 1} a {(batchIndex + 2) * 6} de 30</strong>.
                    </p>
                    <div className="bg-[#030a16]/80 rounded-lg p-2 border border-sky-500/30 text-[10px] sm:text-[11px] text-slate-300 flex flex-col gap-1">
                      <span className="text-sky-400 font-black uppercase tracking-wider">
                        Mecánica Táctica (Se repite paso a paso):
                      </span>
                      <span className="text-slate-300">
                        1. Aprender & Escribir • 2. Selección Múltiple • 3. Pares • 4. Escritura Táctica • 5. Audio • 6. Orden y Mezcla
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#051c14] border-2 border-emerald-500/60 rounded-xl p-3 sm:p-3.5 flex flex-col gap-1.5 shadow-inner">
                    <div className="flex items-center gap-2 text-emerald-300 font-black text-xs sm:text-sm uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>¡ENTRENAMIENTO COMPLETO! (30/30 PALABRAS)</span>
                    </div>
                    <p className="m-0 text-[11px] sm:text-xs text-emerald-100/90 leading-relaxed">
                      Has superado con éxito las 30 palabras del nivel a través de todas las fases tácticas. Presiona el botón a continuación para finalizar y acceder al reporte de vuelo con tus insignias.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Contenedor de Botones: SIGUIENTE MISIÓN y AGAIN MISIÓN */}
            <div className="flex flex-col gap-2.5 w-full max-w-[360px] items-center">
              {/* Botón Siguiente Misión */}
              <button
                onClick={handleNextStage}
                className="main-btn w-full py-4 text-base sm:text-lg tracking-widest uppercase shadow-[0_0_20px_rgba(79,167,255,0.4)] cursor-pointer font-black flex items-center justify-center gap-2"
              >
                <span>
                  {stage === 6
                    ? batchIndex + 1 < 5
                      ? "SIGUIENTE MISIÓN: NUEVAS PALABRAS"
                      : "FINALIZAR NIVEL (30 PALABRAS)"
                    : "SIGUIENTE MISIÓN"}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Botón AGAIN MISIÓN (Repetir esta misión para seguir practicando o reforzar palabras) */}
              <button
                onClick={handleRepeatStage}
                className="w-full py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider bg-[#0c1e38] hover:bg-[#132d54] text-[#79c6ff] border-2 border-[#79c6ff]/50 hover:border-[#79c6ff] shadow-[0_0_15px_rgba(121,198,255,0.2)] transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>AGAIN MISIÓN</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SUBPHASE: STAGE 1 - APRENDIZAJE & ESCRITURA (PLAY 1)      */}
        {/* ========================================================= */}
        {subPhase === "PLAYING" && stage === 1 && currentLearnWord && (
          <div className="flex flex-col gap-3.5 w-full animate-in fade-in">
            {/* Header del juego */}
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest">
                MISIÓN 1: APRENDIZAJE & ESCRITURA ({learnIdx + 1}/{currentBatchWords.length})
              </span>
              <span className="text-xs text-sky-300 font-bold uppercase tracking-wider">
                {learnSubStep === "PREVIEW" ? "FASE: REPASO" : "FASE: ESCRITURA"}
              </span>
            </div>

            {/* SUB-PASO 1: PREVIEW (Palabra en inglés, traducción, pronunciación, botón LEARN) */}
            {learnSubStep === "PREVIEW" && (
              <div className="flex flex-col gap-3.5 animate-in slide-in-from-bottom-3">
                {/* Cuadro de Explicación (si existe) */}
                {currentLearnWord.func && (
                  <div className="border border-[#334155] bg-[#09172c]/90 rounded-2xl p-3.5 sm:p-4 w-full flex flex-col gap-2">
                    <div
                      className="flex items-center gap-3 cursor-pointer select-none"
                      onClick={() => setIsLearnFuncOpen(!isLearnFuncOpen)}
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#1e3a5f] text-sky-300 font-black text-xs flex items-center justify-center border border-[#79c6ff]/40 shrink-0">
                        E
                      </div>
                      <span className="font-bold tracking-wider uppercase text-white text-xs sm:text-sm">
                        EXPLANATION
                      </span>
                    </div>
                    {isLearnFuncOpen && (
                      <div className="bg-[#06101d] rounded-xl p-3 border border-[#1e293b] text-slate-300 leading-relaxed text-xs sm:text-sm mt-1">
                        {currentLearnWord.func}
                      </div>
                    )}
                  </div>
                )}

                {/* Cuadro Principal: Palabra y Traducción */}
                <div className="border border-[#334155] bg-[#09172c]/90 rounded-2xl p-4 sm:p-5 w-full flex flex-col gap-3">
                  <div className="flex flex-row items-center justify-start gap-3 w-full flex-wrap">
                    <div
                      className="w-7 h-7 rounded-lg bg-[#1e3a5f] text-amber-400 font-black text-xs flex items-center justify-center border border-amber-400/40 shrink-0 cursor-pointer select-none"
                      onClick={() => setIsLearnTransOpen(!isLearnTransOpen)}
                    >
                      T
                    </div>
                    <span className="font-bold tracking-wider uppercase text-white text-xs sm:text-sm shrink-0">
                      WORD:
                    </span>
                    <span className="word-badge text-sm sm:text-base md:text-[1.2rem] px-4 sm:px-6 py-2 uppercase flex items-center justify-center max-w-full break-words">
                      {currentLearnWord.displayWord || currentLearnWord.word}
                    </span>
                  </div>

                  {/* Traducción en Español */}
                  {isLearnTransOpen && (
                    <div className="bg-[#06101d] rounded-xl p-3.5 border border-[#1e293b] text-white mt-0.5">
                      <span className="font-bold text-[#94a3b8] text-xs">S: </span>
                      <span className="tracking-wide break-words font-semibold text-white text-sm sm:text-base">
                        {currentLearnWord.trans}
                      </span>
                    </div>
                  )}

                  {/* Audio y US IPA */}
                  <div className="bg-[#06101d] rounded-xl p-3 border border-[#1e293b] flex items-center gap-3 flex-wrap mt-0.5">
                    <span className="font-bold tracking-wider uppercase text-white text-xs shrink-0">A:</span>
                    <PronunciationButton
                      text={currentLearnWord.word}
                      size={20}
                      className="bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] hover:bg-[#79c6ff]/40 p-2 rounded-full shrink-0 shadow-[0_0_10px_rgba(121,198,255,0.2)]"
                    />
                    <span className="text-[#79c6ff] font-mono text-sm sm:text-base font-bold tracking-wider">
                      {getUSIPA(currentLearnWord.word)}
                    </span>
                  </div>
                </div>

                {/* Botón LEARN */}
                <button
                  type="button"
                  onClick={handleLearnClick}
                  className="main-btn w-full py-4 text-base sm:text-lg tracking-widest uppercase shadow-lg mt-1 cursor-pointer font-black"
                >
                  LEARN
                </button>

                <p className="text-slate-400 text-xs text-center mt-0.5">
                  Type the word in English. The translation is only a reference.
                </p>
              </div>
            )}

            {/* SUB-PASO 2: WRITE (Escribir en inglés a partir del español) */}
            {learnSubStep === "WRITE" && (
              <form
                onSubmit={handleLearnSubmit}
                className="flex flex-col w-full gap-3 sm:gap-4 items-center justify-start flex-1 mt-1"
              >
                {/* Palabra en Español */}
                <div className="flex flex-col items-center gap-2 w-full bg-[#09172c] border border-[#334155] rounded-2xl p-4 sm:p-5 text-center shadow-md">
                  <span className="text-[#94a3b8] font-bold text-xs uppercase tracking-wider">
                    PALABRA EN ESPAÑOL:
                  </span>
                  <div className="text-white font-normal text-xl sm:text-2xl md:text-3xl tracking-wide break-words max-w-full">
                    {currentLearnWord.trans}
                  </div>
                </div>

                {/* Input para Escribir en Inglés */}
                <div className="flex flex-col items-center gap-2 w-full mt-1">
                  <label htmlFor="p8-learn-input" className="text-slate-400 font-bold text-xs uppercase tracking-wider cursor-pointer select-none">
                    ESCRIBE EN INGLÉS:
                  </label>
                  <input
                    id="p8-learn-input"
                    ref={learnInputRef}
                    type="text"
                    placeholder="WRITE HERE.."
                    value={learnInput}
                    onChange={(e) => setLearnInput(e.target.value)}
                    className="main-input w-full py-3.5 sm:py-4 px-4 text-center text-base sm:text-lg md:text-xl font-normal tracking-wider uppercase cursor-text touch-manipulation"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                    inputMode="text"
                  />
                  <button
                    type="submit"
                    className="home-btn w-full max-w-[280px] sm:max-w-[340px] py-3.5 sm:py-4 px-8 font-black text-base sm:text-lg uppercase cursor-pointer border-none shadow-lg mt-2 tracking-widest flex items-center justify-center active:scale-95 transition-transform"
                  >
                    VERIFY
                  </button>
                </div>

                <p className="text-slate-400 text-xs sm:text-sm mt-1 text-center">
                  Type the word in English. The translation is above for reference.
                </p>
              </form>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* SUBPHASE: STAGE 2 - SELECCIÓN MÚLTIPLE                    */}
        {/* ========================================================= */}
        {subPhase === "PLAYING" && stage === 2 && currentMcQuestion && (
          <div className="flex flex-col gap-3 w-full animate-in fade-in">
            {/* Header del juego */}
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest">
                MISIÓN 2: SELECCIÓN MÚLTIPLE ({mcCurrentIdx + 1}/{currentBatchWords.length})
              </span>
              <span className="text-xs text-slate-400">1 clic para responder</span>
            </div>

            {/* Target Card: Palabra en Español */}
            <div className="border-2 border-[#79c6ff]/60 rounded-2xl p-4 sm:p-5 bg-[#09172c] text-center flex flex-col items-center gap-2 shadow-lg">
              <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                TÉRMINO EN ESPAÑOL:
              </span>
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-wide">
                "{currentMcQuestion.item.trans}"
              </div>
              <span className="text-xs text-sky-300 font-medium">
                Función: {currentMcQuestion.item.func}
              </span>

              {/* Botón Escuchar Pronunciación */}
              <button
                type="button"
                onClick={() => {
                  playAudio(currentMcQuestion.item.word);
                  combatAudio.playLockTone();
                }}
                className="mt-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e3a5f] hover:bg-[#254b7d] text-[#79c6ff] border border-[#79c6ff]/40 text-xs font-bold transition-all cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>ESCUCHAR RADIO ({getUSIPA(currentMcQuestion.item.word)})</span>
              </button>
            </div>

            {/* 3 Opciones en Inglés - solo la palabra en inglés centrada, sin números ni elegir */}
            <div className="flex flex-col gap-3 w-full max-w-[480px] mx-auto mt-2">
              {currentMcQuestion.options.map((opt, idx) => {
                const isSelected = mcSelectedOption === idx;
                const isCorrect = idx === currentMcQuestion.correctIndex;
                let btnStyle = "border-[#334155] bg-[#0c1a2f] hover:bg-[#132847] hover:border-[#79c6ff]";

                if (mcSelectedOption !== null) {
                  if (isSelected && isCorrect) {
                    btnStyle = "border-emerald-500 bg-emerald-950/80 text-emerald-200 shadow-[0_0_15px_rgba(74,222,128,0.4)]";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "border-red-500 bg-red-950/80 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.4)]";
                  } else if (isCorrect) {
                    btnStyle = "border-emerald-500/70 bg-emerald-950/40 text-emerald-300";
                  } else {
                    btnStyle = "opacity-40 border-[#1e293b] bg-[#08101e]";
                  }
                }

                return (
                  <button
                    key={opt.word + idx}
                    type="button"
                    disabled={mcSelectedOption !== null}
                    onClick={() => handleMcOptionClick(idx)}
                    className={`py-4 px-6 rounded-2xl border text-center flex items-center justify-center transition-all active:scale-98 cursor-pointer ${btnStyle}`}
                  >
                    <span className="font-extrabold text-lg sm:text-xl text-white tracking-wide uppercase text-center">
                      {opt.displayWord || opt.word}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SUBPHASE: STAGE 3 - SELECCIÓN DE PARES                    */}
        {/* ========================================================= */}
        {subPhase === "PLAYING" && stage === 3 && (
          <div className="flex flex-col gap-3 w-full animate-in fade-in">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest">
                MISIÓN 3: EMPAREJAR TÉRMINOS ({matchedWords.size}/{currentBatchWords.length} PARES)
              </span>
              <span className="text-xs text-slate-400">Selecciona EN y luego ES</span>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              {/* Columna Inglés */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] text-[#79c6ff] font-extrabold uppercase text-center">
                  INGLÉS ({enCards.length - matchedWords.size})
                </span>
                {enCards.map((card) => {
                  const isMatched = matchedWords.has(card.word);
                  const isSelected = selectedEnId === card.id;
                  const isFeedback = matchFeedback && matchFeedback.enId === card.id;

                  if (isMatched) {
                    return (
                      <div
                        key={card.id}
                        className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-center text-xs font-bold opacity-30 line-through select-none"
                      >
                        {card.text}
                      </div>
                    );
                  }

                  let btnStyle = "border-[#334155] bg-[#0c1a2f] text-white hover:border-[#79c6ff]";
                  if (isSelected) {
                    btnStyle = "border-[#79c6ff] bg-[#1a365d] shadow-[0_0_12px_rgba(121,198,255,0.4)]";
                  }
                  if (isFeedback) {
                    btnStyle =
                      matchFeedback.status === "correct"
                        ? "border-emerald-500 bg-emerald-950 text-emerald-200"
                        : "border-red-500 bg-red-950 text-red-200 animate-shake";
                  }

                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => handleCardClick(card)}
                      className={`p-3 rounded-xl border text-center font-black text-sm tracking-wide transition-all active:scale-95 cursor-pointer ${btnStyle}`}
                    >
                      {card.text}
                    </button>
                  );
                })}
              </div>

              {/* Columna Español */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] text-amber-400 font-extrabold uppercase text-center">
                  ESPAÑOL ({esCards.length - matchedWords.size})
                </span>
                {esCards.map((card) => {
                  const isMatched = matchedWords.has(card.word);
                  const isSelected = selectedEsId === card.id;
                  const isFeedback = matchFeedback && matchFeedback.esId === card.id;

                  if (isMatched) {
                    return (
                      <div
                        key={card.id}
                        className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-center text-xs font-bold opacity-30 line-through select-none"
                      >
                        {card.text}
                      </div>
                    );
                  }

                  let btnStyle = "border-[#334155] bg-[#0c1a2f] text-white hover:border-amber-400";
                  if (isSelected) {
                    btnStyle = "border-amber-400 bg-[#352511] shadow-[0_0_12px_rgba(251,191,36,0.4)]";
                  }
                  if (isFeedback) {
                    btnStyle =
                      matchFeedback.status === "correct"
                        ? "border-emerald-500 bg-emerald-950 text-emerald-200"
                        : "border-red-500 bg-red-950 text-red-200 animate-shake";
                  }

                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => handleCardClick(card)}
                      className={`p-3 rounded-xl border text-center font-bold text-xs tracking-wide transition-all active:scale-95 cursor-pointer ${btnStyle}`}
                    >
                      {card.text}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SUBPHASE: STAGE 4 - TEST DE ESCRITURA                     */}
        {/* ========================================================= */}
        {subPhase === "PLAYING" && stage === 4 && currentTypingWord && (
          <form onSubmit={handleTypingSubmit} className="flex flex-col gap-3 w-full animate-in fade-in">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest">
                MISIÓN 4: ESCRITURA TÉCNICA ({typingIdx + 1}/{currentBatchWords.length})
              </span>
              <span className="text-xs text-slate-400">Escribe exactamente en inglés</span>
            </div>

            <div className="border-2 border-[#79c6ff]/60 rounded-2xl p-4 sm:p-5 bg-[#09172c] text-center flex flex-col items-center gap-2 shadow-lg">
              <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                PALABRA EN ESPAÑOL:
              </span>
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-wide">
                "{currentTypingWord.trans}"
              </div>
              <span className="text-xs text-sky-300 font-medium">
                Función: {currentTypingWord.func}
              </span>
            </div>

            <div className="flex flex-col gap-2 w-full mt-1">
              <label htmlFor="p8-typing-input" className="sr-only">Escribe en inglés</label>
              <input
                id="p8-typing-input"
                type="text"
                value={typingInput}
                onChange={handleTypingChange}
                placeholder="ESCRIBE EN INGLÉS..."
                className="main-input w-full py-4 px-4 text-center text-lg sm:text-xl font-black tracking-widest uppercase rounded-xl cursor-text touch-manipulation"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="characters"
                spellCheck={false}
                inputMode="text"
              />
              <button
                type="submit"
                className="main-btn w-full py-3.5 text-base font-black tracking-widest uppercase cursor-pointer"
              >
                VERIFICAR COMANDO
              </button>
            </div>
          </form>
        )}

        {/* ========================================================= */}
        {/* SUBPHASE: STAGE 5 - TEST DE AUDIO & PALABRA OCULTA        */}
        {/* ========================================================= */}
        {subPhase === "PLAYING" && stage === 5 && currentAudioWord && (
          <form onSubmit={handleAudioSubmit} className="flex flex-col gap-3 w-full animate-in fade-in">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest">
                MISIÓN 5: COMPRENSIÓN AUDITIVA & CLAVE ({audioTestIdx + 1}/{currentBatchWords.length})
              </span>
              <span className="text-xs text-slate-400">Escucha y completa la clave</span>
            </div>

            <div className="border-2 border-[#79c6ff]/60 rounded-2xl p-4 sm:p-5 bg-[#09172c] text-center flex flex-col items-center gap-3 shadow-lg">
              {/* Botón de audio gigante */}
              <button
                type="button"
                onClick={() => playAudio(currentAudioWord.word)}
                className="w-16 h-16 rounded-full bg-[#18365d] border-2 border-[#79c6ff] text-[#79c6ff] hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(121,198,255,0.4)] flex items-center justify-center cursor-pointer"
              >
                <Radio className="w-8 h-8 text-amber-400 animate-pulse" />
              </button>

              <span className="text-xs text-slate-400 uppercase font-semibold">
                PISTA (PALABRA OCULTA):
              </span>
              <div className="text-2xl sm:text-3xl font-mono font-black text-[#79c6ff] tracking-[4px] uppercase bg-[#050f1d] px-4 py-2 rounded-xl border border-[#79c6ff]/30">
                {maskWord(currentAudioWord.word)}
              </div>

              <span className="text-xs text-slate-300">
                Significado: <strong className="text-white uppercase">{currentAudioWord.trans}</strong>
              </span>
            </div>

            <div className="flex flex-col gap-2 w-full mt-1">
              <label htmlFor="p8-audio-input" className="sr-only">Escribe la palabra escuchada</label>
              <input
                id="p8-audio-input"
                type="text"
                value={audioInput}
                onChange={handleAudioInputChange}
                placeholder="ESCRIBE LA PALABRA ESCUCHADA..."
                className="main-input w-full py-4 px-4 text-center text-lg sm:text-xl font-black tracking-widest uppercase rounded-xl cursor-text touch-manipulation"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="characters"
                spellCheck={false}
                inputMode="text"
              />
              <button
                type="submit"
                className="main-btn w-full py-3.5 text-base font-black tracking-widest uppercase cursor-pointer"
              >
                CONFIRMAR PALABRA
              </button>
            </div>
          </form>
        )}

        {/* ========================================================= */}
        {/* SUBPHASE: STAGE 6 - ORDEN Y MEZCLA (SCRAMBLED WORD)        */}
        {/* ========================================================= */}
        {subPhase === "PLAYING" && stage === 6 && currentScrambleWord && (
          <div className="flex flex-col gap-3.5 w-full animate-in fade-in">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Shuffle className="w-3.5 h-3.5" />
                MISIÓN 6: ORDEN Y MEZCLA ({scrambleIdx + 1}/{currentBatchWords.length})
              </span>
              <span className="text-xs text-sky-300 font-bold uppercase tracking-wider">
                {scrambleSubStep === "PREVIEW" ? "FASE: DETECTAR" : "FASE: ORDENAR"}
              </span>
            </div>

            {/* PANTALLA 1: DETECTAR / PALABRA DESORDENADA */}
            {scrambleSubStep === "PREVIEW" && (
              <div className="flex flex-col gap-3.5 animate-in slide-in-from-bottom-3">
                {/* Cuadro Principal de Palabra Desordenada */}
                <div className="border-2 border-amber-500/50 bg-[#09172c]/90 rounded-2xl p-4 sm:p-5 w-full flex flex-col gap-3 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                  {/* Título de estado */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      PALABRA DESORDENADA:
                    </span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-amber-400/30">
                      LETRAS MEZCLADAS
                    </span>
                  </div>

                  {/* Palabra en inglés desordenada */}
                  <div className="bg-[#06101d] rounded-xl p-3 sm:p-4 border border-amber-500/30 flex items-center justify-center text-center">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-mono font-black text-amber-300 tracking-[6px] uppercase drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]">
                      {scrambledWordText}
                    </span>
                  </div>

                  {/* Audio y Pronunciación IPA */}
                  <div className="bg-[#06101d] rounded-xl p-3 border border-[#1e293b] flex items-center gap-3 flex-wrap">
                    <span className="font-bold tracking-wider uppercase text-white text-xs shrink-0">A:</span>
                    <PronunciationButton
                      text={currentScrambleWord.word}
                      size={20}
                      className="bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] hover:bg-[#79c6ff]/40 p-2 rounded-full shrink-0 shadow-[0_0_10px_rgba(121,198,255,0.2)]"
                    />
                    <span className="text-[#79c6ff] font-mono text-sm sm:text-base font-bold tracking-wider">
                      {getUSIPA(currentScrambleWord.word)}
                    </span>
                  </div>

                  {/* Traducción al Español */}
                  <div className="bg-[#06101d] rounded-xl p-3.5 border border-[#1e293b] text-white">
                    <span className="font-bold text-[#94a3b8] text-xs">S: </span>
                    <span className="tracking-wide break-words font-semibold text-white text-sm sm:text-base">
                      {currentScrambleWord.trans}
                    </span>
                  </div>
                </div>

                {/* Botón dinámico ORDENAR */}
                <button
                  type="button"
                  onClick={handleScrambleStartWrite}
                  className="main-btn w-full py-4 text-base sm:text-lg tracking-widest uppercase shadow-[0_0_20px_rgba(79,167,255,0.4)] hover:shadow-[0_0_30px_rgba(79,167,255,0.7)] cursor-pointer font-black flex items-center justify-center gap-2 transition-all"
                >
                  <Shuffle className="w-5 h-5 animate-pulse" />
                  <span>ORDENAR</span>
                </button>

                <p className="text-slate-400 text-xs text-center">
                  Presiona Ordenar para reorganizar y escribir la palabra correctamente en inglés.
                </p>
              </div>
            )}

            {/* PANTALLA 2: ESCRIBIR DE FORMA CORRECTA */}
            {scrambleSubStep === "WRITE" && (
              <form
                onSubmit={handleScrambleSubmit}
                className="flex flex-col w-full gap-3 sm:gap-4 items-center justify-start flex-1 mt-1"
              >
                {/* Referencia: Letras Mezcladas y Traducción */}
                <div className="flex flex-col items-center gap-2.5 w-full bg-[#09172c] border border-[#334155] rounded-2xl p-4 sm:p-5 text-center shadow-md">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[#94a3b8] font-bold text-xs uppercase tracking-wider">
                      DESORDENADO:
                    </span>
                    <span className="text-amber-400 font-mono font-bold tracking-widest text-sm">
                      {scrambledWordText}
                    </span>
                  </div>

                  <div className="w-full h-px bg-[#1e293b] my-0.5" />

                  <span className="text-[#94a3b8] font-bold text-xs uppercase tracking-wider">
                    SIGNIFICADO EN ESPAÑOL:
                  </span>
                  <div className="text-white font-normal text-xl sm:text-2xl md:text-3xl tracking-wide break-words max-w-full">
                    {currentScrambleWord.trans}
                  </div>
                </div>

                {/* Campo para Escribir Correctamente */}
                <div className="flex flex-col items-center gap-2 w-full mt-1">
                  <label htmlFor="p8-scramble-input" className="text-slate-400 font-bold text-xs uppercase tracking-wider cursor-pointer select-none">
                    ESCRIBE DE FORMA CORRECTA:
                  </label>
                  <input
                    id="p8-scramble-input"
                    ref={scrambleInputRef}
                    type="text"
                    placeholder="WRITE HERE.."
                    value={scrambleInput}
                    onChange={(e) => setScrambleInput(e.target.value)}
                    className="main-input w-full py-3.5 sm:py-4 px-4 text-center text-base sm:text-lg md:text-xl font-black tracking-wider uppercase cursor-text touch-manipulation"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                    inputMode="text"
                  />
                  <button
                    type="submit"
                    className="home-btn w-full max-w-[280px] sm:max-w-[340px] py-3.5 sm:py-4 px-8 font-black text-base sm:text-lg uppercase cursor-pointer border-none shadow-lg mt-2 tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    <span>VERIFY</span>
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-slate-400 text-xs sm:text-sm mt-1 text-center">
                  Ordena las letras y escribe la palabra en inglés con precisión técnica.
                </p>
              </form>
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* PENALTY MODAL (PANTALLA DE PENALIZACIÓN 3 REPETICIONES)    */}
      {/* ========================================================= */}
      {subPhase === "PENALTY" && penaltyTarget && (
        <div className="p3-penalty-overlay overflow-y-auto">
          <div className="p3-penalty-box p-6 sm:p-8 max-w-[420px] w-full flex flex-col items-center text-center gap-3.5 my-auto">
            <div className="p3-penalty-title text-[#f87171] font-[900] text-[1.1rem] tracking-[2px] uppercase flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
              <span>ALERTA DE DISCREPANCIA TÉCNICA</span>
            </div>

            <div className="text-[--muted] text-xs uppercase font-semibold">
              ESCRIBA 3 VECES CORRECTAMENTE PARA RESTABLECER EL VUELO:
            </div>

            <div className="border border-[#334155] rounded-xl p-4 bg-[#0b1626] w-full flex flex-col items-center gap-1.5 shadow-inner">
              <span className="text-xs text-slate-400 uppercase font-bold">TÉRMINO CORRECTO</span>
              <span className="text-2xl sm:text-3xl font-black text-[#79c6ff] tracking-wider uppercase">
                {penaltyTarget.word}
              </span>

              {/* Debajo de la palabra: Icono de audio + Pronunciación IPA */}
              <div className="flex items-center gap-2.5 justify-center my-0.5">
                <PronunciationButton
                  text={penaltyTarget.word}
                  size={22}
                  autoPlay
                  cascadeTimes={1}
                  className="bg-[#79c6ff]/20 border border-[#79c6ff] text-[#79c6ff] hover:bg-[#79c6ff]/40 p-2 rounded-full shrink-0 shadow-[0_0_10px_rgba(121,198,255,0.3)]"
                />
                <span className="text-sm sm:text-base text-amber-400 font-mono font-bold tracking-wider">
                  {getUSIPA(penaltyTarget.word)}
                </span>
              </div>

              <span className="text-xs sm:text-sm text-slate-300 font-medium">
                {penaltyTarget.trans}
              </span>
            </div>

            <div className="w-full mt-1">
              <label htmlFor="p8-penalty-input" className="sr-only">Escriba aquí</label>
              <input
                id="p8-penalty-input"
                ref={penaltyInputRef}
                type="text"
                value={penaltyInput}
                onChange={handlePenaltyInputChange}
                placeholder="ESCRIBA AQUÍ..."
                className={`w-full py-3 px-4 text-base sm:text-lg font-bold text-center uppercase tracking-wider rounded-xl transition-colors outline-none cursor-text select-text pointer-events-auto touch-manipulation ${
                  hasPenaltyTypo
                    ? "border-2 border-red-500 bg-red-950/40 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.7)]"
                    : "main-input text-white"
                }`}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="characters"
                spellCheck={false}
                inputMode="text"
              />
            </div>

            <div className="text-2xl font-bold font-mono text-[#fca5a5]">
              {penaltyCount} / 3
            </div>

            <p className="text-[11px] text-red-300 m-0">
              Un error en vuelo no se perdona. Escribe sin fallas para reanudar la cabina.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

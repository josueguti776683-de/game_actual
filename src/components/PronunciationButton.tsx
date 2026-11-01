import React, { useEffect, useState, useRef } from "react";
import { Volume2 } from "lucide-react";
import { playAudio, playAudioCascade, isAudioReady } from "../utils/audioEngine";

interface PronunciationButtonProps {
  text: string;
  className?: string;
  size?: number;
  onClick?: () => void;
  autoPlay?: boolean;
  cascadeTimes?: number;
  speechRate?: number;
  title?: string;
  label?: string;
}

export const PronunciationButton: React.FC<PronunciationButtonProps> = ({
  text,
  className = "",
  size = 24,
  onClick,
  autoPlay = false,
  cascadeTimes = 1,
  speechRate = 0.95,
  title = "Listen to pronunciation",
  label,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const isMounted = useRef(true);
  const autoPlayDone = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    autoPlayDone.current = false;
  }, [text]);

  // Manejo de autoPlay al montar o cambiar palabra
  useEffect(() => {
    if (!autoPlay || autoPlayDone.current || !text) return;

    let timeoutId: number | null = null;

    const tryAutoPlay = () => {
      if (!isMounted.current) return;
      autoPlayDone.current = true;
      executePlay();
    };

    if (isAudioReady()) {
      tryAutoPlay();
    } else {
      timeoutId = window.setTimeout(tryAutoPlay, 50);
    }

    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [autoPlay, text]);

  const executePlay = () => {
    if (!text || !isMounted.current) return;

    setIsPlaying(true);

    if (cascadeTimes > 1) {
      playAudioCascade(
        text,
        cascadeTimes,
        300,
        () => {
          if (isMounted.current) setIsPlaying(false);
        },
        () => isMounted.current
      );
    } else {
      playAudio(
        text,
        () => {
          if (isMounted.current) setIsPlaying(true);
        },
        () => {
          if (isMounted.current) setIsPlaying(false);
        },
        true,
        speechRate
      );
    }
  };

  const handleClick = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    // Ejecuta inmediatamente la pronunciación sin demora
    executePlay();

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center cursor-pointer transition-all active:scale-95 select-none ${
        label ? "gap-2 px-4 py-2 rounded-xl font-bold tracking-wider" : "p-2 rounded-full"
      } ${
        isPlaying
          ? "bg-[--primary2] text-white shadow-[0_0_15px_rgba(121,198,255,0.7)] ring-2 ring-[--primary2]/50 brightness-110"
          : "hover:bg-[--primary2]/20 text-[--primary2]"
      } ${className}`}
      title={title}
    >
      <Volume2 size={size} className={`shrink-0 ${isPlaying ? "animate-pulse scale-110" : ""}`} />
      {label && <span className="shrink-0">{label}</span>}
    </button>
  );
};

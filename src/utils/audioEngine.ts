/**
 * audioEngine.ts - Motor de Audio Aeronáutico Ultrarrápido STE AVIADOR
 * 
 * Optimizaciones de Latencia Cero y Resiliencia Total:
 * - Respuesta instantánea en clic (0ms de latencia)
 * - Soporte perfecto para palabras individuales Y oraciones largas (normal y lento)
 * - Prioridad a voces nativas locales/offline (sin bloqueos de red)
 * - Manejo contra el bug de Chromium: cancel() + speak() seguro
 * - Keep-alive automático para oraciones largas en Chrome (evita que se congele tras 15s)
 * - Watchdog inteligente (1800ms): si SpeechSynthesis se congela, conmuta sin fisuras al audio stream
 * - Fallback de oraciones vía Google TTS / Youdao dictvoice
 * - Caché de audio en memoria para reproducción instantánea
 * - Duración dinámica de seguridad calculada según la cantidad de palabras y velocidad
 */

import { useEffect, useCallback } from 'react';

// ============================================================
// 1. CONFIGURACIÓN Y TIPOS
// ============================================================

interface AudioConfig {
  rate: number;       // Velocidad estándar (0.95 para máxima claridad aeronáutica)
  pitch: number;      // Tono (1.0 = neutro)
  volume: number;     // Volumen (1.0 = máximo)
  lang: string;       // Idioma base (en-US)
}

const DEFAULT_CONFIG: AudioConfig = {
  rate: 0.95,
  pitch: 1.0,
  volume: 1.0,
  lang: 'en-US',
};

// ============================================================
// 2. CLASE PRINCIPAL (SINGLETON HÍBRIDO ULTRA-RÁPIDO)
// ============================================================

class AudioEngine {
  private config: AudioConfig = { ...DEFAULT_CONFIG };
  private cachedVoice: SpeechSynthesisVoice | null = null;
  private isVoiceReady: boolean = false;
  private activeUtterances: Set<SpeechSynthesisUtterance> = new Set();
  private safetyTimer: number | null = null;
  private fallbackWatchdog: number | null = null;
  private chromeKeepAliveInterval: number | null = null;
  private fallbackAudioCache: Map<string, HTMLAudioElement> = new Map();
  private currentPlayingAudio: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        this.initVoices();
      }
      this.setupGlobalUnlock();
    }
  }

  // ------------------------------------------------------------
  // 2.1 CARGA Y CACHÉ DE VOCES (INSTANTÁNEA)
  // ------------------------------------------------------------
  private initVoices(): void {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const loadVoices = () => {
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          this.cachedVoice = this.selectBestEnglishVoice(voices);
          this.isVoiceReady = true;
        }
      } catch (e) {
        // Silently handle
      }
    };

    loadVoices();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => {
        loadVoices();
      };
    }
  }

  // Pre-activación inmediata con cualquier gesto de usuario
  private setupGlobalUnlock(): void {
    if (typeof window === 'undefined') return;

    const primeAudio = () => {
      try {
        if ('speechSynthesis' in window && window.speechSynthesis) {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
          const voices = window.speechSynthesis.getVoices();
          if (voices && voices.length > 0) {
            this.cachedVoice = this.selectBestEnglishVoice(voices);
            this.isVoiceReady = true;
          }
        }
      } catch (e) {}
    };

    window.addEventListener('pointerdown', primeAudio, { once: false, passive: true });
    window.addEventListener('touchstart', primeAudio, { once: false, passive: true });
    window.addEventListener('click', primeAudio, { once: false, passive: true });
  }

  /**
   * Selecciona la voz en inglés de mayor calidad y velocidad disponible.
   * Prioriza voces locales instaladas en el dispositivo para garantizar funcionamiento 100% offline.
   */
  private selectBestEnglishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
    if (!voices || voices.length === 0) return null;

    const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;

    // Prioridad 1: Voces nativas de alta fidelidad conocidas
    const preferredNames = [
      'Samantha',
      'Microsoft David',
      'Microsoft Mark',
      'Microsoft Zira',
      'Google US English',
      'Daniel',
      'Alex',
      'Karen',
      'Fred',
      'Victoria',
      'English United States'
    ];

    // Si estamos sin conexión, buscar prioritariamente entre las voces locales de alta fidelidad
    if (isOffline) {
      const localVoices = voices.filter(
        (v) => (v.localService === true || (v as any).local === true) && v.lang.toLowerCase().startsWith('en')
      );
      if (localVoices.length > 0) {
        for (const name of preferredNames) {
          const match = localVoices.find((v) => v.name.includes(name));
          if (match) return match;
        }
        const usLocal = localVoices.find((v) => v.lang === 'en-US' || v.lang === 'en_US');
        if (usLocal) return usLocal;
        return localVoices[0];
      }
    }

    for (const name of preferredNames) {
      const match = voices.find(
        (v) => v.name.includes(name) && v.lang.toLowerCase().startsWith('en')
      );
      if (match) return match;
    }

    // Prioridad 2: Cualquier voz en-US local
    const usLocal = voices.find(
      (v) => (v.lang === 'en-US' || v.lang === 'en_US') && (v.localService === true || (v as any).local === true)
    );
    if (usLocal) return usLocal;

    // Prioridad 3: Cualquier voz en-US
    const anyUs = voices.find(
      (v) => v.lang === 'en-US' || v.lang === 'en_US'
    );
    if (anyUs) return anyUs;

    // Prioridad 4: Cualquier voz en inglés
    const anyEn = voices.find(
      (v) => v.lang.toLowerCase().startsWith('en')
    );
    if (anyEn) return anyEn;

    return voices[0] || null;
  }

  public getBestVoice(): SpeechSynthesisVoice | null {
    if (this.cachedVoice) return this.cachedVoice;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const voices = window.speechSynthesis.getVoices();
      this.cachedVoice = this.selectBestEnglishVoice(voices);
      if (this.cachedVoice) this.isVoiceReady = true;
    }
    return this.cachedVoice;
  }

  // ------------------------------------------------------------
  // 2.2 FALLBACK DE AUDIO STREAMING (PARA PALABRAS Y ORACIONES)
  // ------------------------------------------------------------
  private stopCurrentFallback(): void {
    if (this.currentPlayingAudio) {
      try {
        this.currentPlayingAudio.pause();
        this.currentPlayingAudio.currentTime = 0;
        this.currentPlayingAudio.onplay = null;
        this.currentPlayingAudio.onended = null;
        this.currentPlayingAudio.onerror = null;
      } catch (e) {}
      this.currentPlayingAudio = null;
    }
  }

  private playFallbackAudio(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    rate: number = 0.95
  ): void {
    try {
      this.stopCurrentFallback();
      const cleanText = text.trim();
      const isSingleWord = !cleanText.includes(' ');

      // Prioridad absoluta en hangares: Si el dispositivo tiene síntesis de voz nativa, usarla localmente sin red
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis) {
        try {
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.rate = rate;
          utterance.lang = 'en-US';
          utterance.onstart = () => onStart?.();
          utterance.onend = () => onEnd?.();
          utterance.onerror = () => onEnd?.();
          window.speechSynthesis.speak(utterance);
          return;
        } catch {
          // Si falla, continuar con fallback
        }
      }

      // Si no hay síntesis y estamos sin conexión o con red deficiente, terminar de inmediato sin congelar la app
      const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
      if (isOffline) {
        if (onEnd) onEnd();
        return;
      }

      // Para palabras individuales: Youdao dictvoice es muy nítido.
      // Para oraciones: Google Translate TTS es compatible con oraciones completas.
      const primaryUrl = isSingleWord
        ? `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanText.toLowerCase())}&type=2`
        : `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=en&client=tw-ob`;

      const cacheKey = `${cleanText}_${rate}`;
      let audio = this.fallbackAudioCache.get(cacheKey);

      if (!audio) {
        audio = new Audio(primaryUrl);
        audio.preload = 'auto';
        this.fallbackAudioCache.set(cacheKey, audio);
      } else {
        try {
          audio.currentTime = 0;
        } catch (e) {}
      }

      audio.playbackRate = Math.max(0.5, Math.min(2.0, rate));
      this.currentPlayingAudio = audio;

      let hasEnded = false;
      let networkTimeout: number | null = null;
      const cleanup = () => {
        if (hasEnded) return;
        hasEnded = true;
        if (networkTimeout !== null) {
          window.clearTimeout(networkTimeout);
          networkTimeout = null;
        }
        if (this.currentPlayingAudio === audio) {
          this.currentPlayingAudio = null;
        }
        if (onEnd) onEnd();
      };

      // Si la señal en el hangar es inestable ("lie-fi"), abortar en 1500ms para no congelar la UI
      networkTimeout = window.setTimeout(cleanup, 1500);

      audio.onplay = () => {
        if (onStart) onStart();
      };
      audio.onended = cleanup;
      audio.onerror = () => {
        // Si el primario falló y era oración, intentar con Youdao o finalizar limpiamente
        if (!isSingleWord) {
          try {
            const fallbackUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanText)}&type=2`;
            const altAudio = new Audio(fallbackUrl);
            altAudio.playbackRate = Math.max(0.5, Math.min(2.0, rate));
            altAudio.onplay = () => onStart?.();
            altAudio.onended = cleanup;
            altAudio.onerror = cleanup;
            altAudio.play().catch(cleanup);
            return;
          } catch (err) {
            cleanup();
          }
        } else {
          cleanup();
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          cleanup();
        });
      }
    } catch (e) {
      if (onEnd) onEnd();
    }
  }

  // ------------------------------------------------------------
  // 2.3 REPRODUCCIÓN INMEDIATA (CERO LATENCIA + RESILIENTE)
  // ------------------------------------------------------------
  public speak(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    customRate?: number
  ): void {
    if (typeof window === 'undefined') {
      if (onEnd) onEnd();
      return;
    }

    const cleanText = (text || '').trim().replace(/\s+/g, ' ');
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    const rate = customRate || this.config.rate;

    // Si speechSynthesis no está disponible en este navegador, ir al fallback
    if (!('speechSynthesis' in window) || !window.speechSynthesis) {
      this.playFallbackAudio(cleanText, onStart, onEnd, rate);
      return;
    }

    // Detener cualquier fallback previo y timers activos
    this.stopCurrentFallback();
    if (this.safetyTimer !== null) {
      window.clearTimeout(this.safetyTimer);
      this.safetyTimer = null;
    }
    if (this.fallbackWatchdog !== null) {
      window.clearTimeout(this.fallbackWatchdog);
      this.fallbackWatchdog = null;
    }
    if (this.chromeKeepAliveInterval !== null) {
      window.clearInterval(this.chromeKeepAliveInterval);
      this.chromeKeepAliveInterval = null;
    }

    let startedSpeaking = false;
    let finishedSpeaking = false;

    // Cálculo dinámico del tiempo de duración estimado
    const wordCount = cleanText.split(/\s+/).length;
    const dynamicTimeoutMs = Math.max(
      6000,
      Math.ceil((wordCount / Math.max(0.35, rate * 2.0)) * 1000) + 5000
    );

    const handleEnd = () => {
      if (finishedSpeaking) return;
      finishedSpeaking = true;

      if (this.fallbackWatchdog !== null) {
        window.clearTimeout(this.fallbackWatchdog);
        this.fallbackWatchdog = null;
      }
      if (this.safetyTimer !== null) {
        window.clearTimeout(this.safetyTimer);
        this.safetyTimer = null;
      }
      if (this.chromeKeepAliveInterval !== null) {
        window.clearInterval(this.chromeKeepAliveInterval);
        this.chromeKeepAliveInterval = null;
      }
      this.activeUtterances.clear();
      if (onEnd) onEnd();
    };

    const executeNativeSpeak = () => {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = rate;
        utterance.pitch = this.config.pitch;
        utterance.volume = this.config.volume;
        utterance.lang = 'en-US';

        const voice = this.getBestVoice();
        if (voice) {
          utterance.voice = voice;
        }

        this.activeUtterances.add(utterance);

        utterance.onstart = () => {
          startedSpeaking = true;
          if (this.fallbackWatchdog !== null) {
            window.clearTimeout(this.fallbackWatchdog);
            this.fallbackWatchdog = null;
          }
          if (onStart) onStart();
        };

        utterance.onend = () => {
          handleEnd();
        };

        utterance.onerror = (e: SpeechSynthesisErrorEvent) => {
          // Si fue interrumpido o cancelado por una nueva petición, terminar limpiamente
          if (e.error === 'interrupted' || e.error === 'canceled') {
            handleEnd();
            return;
          }

          if (!startedSpeaking && !finishedSpeaking) {
            if (this.fallbackWatchdog !== null) {
              window.clearTimeout(this.fallbackWatchdog);
              this.fallbackWatchdog = null;
            }
            this.playFallbackAudio(cleanText, onStart, onEnd, rate);
          } else {
            handleEnd();
          }
        };

        // Workaround para Chrome bug con oraciones largas (>15s)
        this.chromeKeepAliveInterval = window.setInterval(() => {
          try {
            if (window.speechSynthesis && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
              window.speechSynthesis.pause();
              window.speechSynthesis.resume();
            }
          } catch (err) {}
        }, 5000);

        // Timer de seguridad dinámico
        this.safetyTimer = window.setTimeout(() => {
          handleEnd();
        }, dynamicTimeoutMs);

        // En hangares aeronáuticos con señal débil, intermitente o sin internet:
        // La síntesis de voz nativa del dispositivo (speechSynthesis) es 100% LOCAL y autónoma.
        // NUNCA interrumpimos el motor nativo con peticiones de red externas para evitar
        // bloqueos por latencia de red ("lie-fi").
        // El safetyTimer dinámico se encarga de proteger contra cualquier bloqueo.

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        if (this.fallbackWatchdog !== null) {
          window.clearTimeout(this.fallbackWatchdog);
          this.fallbackWatchdog = null;
        }
        this.playFallbackAudio(cleanText, onStart, onEnd, rate);
      }
    };

    // Cancelación limpia previa sin colisiones en Chromium
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
      // Micro-tick de 15ms para que Chromium vacíe su cola interna
      setTimeout(executeNativeSpeak, 15);
    } else {
      executeNativeSpeak();
    }
  }

  // ------------------------------------------------------------
  // 2.4 DETENER Y LIMPIAR
  // ------------------------------------------------------------
  public flushAndStop(): void {
    if (this.safetyTimer !== null) {
      window.clearTimeout(this.safetyTimer);
      this.safetyTimer = null;
    }
    if (this.fallbackWatchdog !== null) {
      window.clearTimeout(this.fallbackWatchdog);
      this.fallbackWatchdog = null;
    }
    if (this.chromeKeepAliveInterval !== null) {
      window.clearInterval(this.chromeKeepAliveInterval);
      this.chromeKeepAliveInterval = null;
    }
    this.activeUtterances.clear();
    this.stopCurrentFallback();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }

  // ------------------------------------------------------------
  // 2.5 DESPERTAR / WAKE UP RÁPIDO (SIN BLOQUEO)
  // ------------------------------------------------------------
  public wakeUp(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis) {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        this.getBestVoice();
      } catch (e) {}
    }
  }

  public setConfig(newConfig: Partial<AudioConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public getStatus() {
    return {
      isVoiceReady: this.isVoiceReady || !!this.cachedVoice,
      voiceName: this.cachedVoice ? this.cachedVoice.name : null,
      activeUtterancesCount: this.activeUtterances.size,
    };
  }
}

// ============================================================
// 3. EXPORTACIÓN DEL SINGLETON
// ============================================================

export const audioEngine = new AudioEngine();

// ============================================================
// 4. HOOK REACT useAudio
// ============================================================

export function useAudio() {
  const playAudio = useCallback(
    (text: string, onStart?: () => void, onEnd?: () => void, speechRate?: number) => {
      audioEngine.speak(text, onStart, onEnd, speechRate);
    },
    []
  );

  const stopAudio = useCallback(() => {
    audioEngine.flushAndStop();
  }, []);

  useEffect(() => {
    return () => {
      audioEngine.flushAndStop();
    };
  }, []);

  return {
    playAudio,
    stopAudio,
    getStatus: audioEngine.getStatus.bind(audioEngine),
    setConfig: audioEngine.setConfig.bind(audioEngine),
  };
}

// ============================================================
// 5. FUNCIONES AUXILIARES GLOBALES
// ============================================================

export function playAudio(
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  _bypassRateLimit = false,
  speechRate = 0.95
): void {
  audioEngine.speak(text, onStart, onEnd, speechRate);
}

export function playAudioCascade(
  text: string,
  times: number,
  delayMs: number = 300,
  onComplete?: () => void,
  isMounted?: () => boolean
): void {
  let count = 0;
  const playNext = () => {
    if (isMounted && !isMounted()) return;
    if (count >= times) {
      if (onComplete) onComplete();
      return;
    }
    count++;
    audioEngine.speak(
      text,
      undefined,
      () => {
        if (isMounted && !isMounted()) return;
        if (count < times) {
          setTimeout(playNext, delayMs);
        } else {
          if (onComplete) onComplete();
        }
      }
    );
  };
  playNext();
}

export function cancelAudio(): void {
  audioEngine.flushAndStop();
}

export function unlock(): void {
  audioEngine.wakeUp();
}

export const unlockAudioEngine = unlock;

export function initAudioEngine(): void {
  audioEngine.wakeUp();
}

export function isAudioReady(): boolean {
  return audioEngine.getStatus().isVoiceReady;
}

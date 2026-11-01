import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed standalone app, hide the install button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`inline-flex items-center justify-center gap-2 font-black uppercase tracking-wider rounded-xl cursor-pointer transition-all duration-200 active:scale-95 ${
          compact
            ? 'py-2 px-3 text-[11px] bg-gradient-to-r from-emerald-500 to-teal-400 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:brightness-110'
            : 'w-full py-3 px-4 text-xs bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-black font-extrabold shadow-[0_0_18px_rgba(16,185,129,0.5)] border border-emerald-300'
        }`}
        title="Instalar aplicación en tu dispositivo (Android / PC)"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>📲 INSTALAR APP (APK / PWA)</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`inline-flex items-center justify-center gap-1.5 font-bold uppercase rounded-xl cursor-pointer transition-all ${
            compact
              ? 'py-2 px-3 text-[11px] bg-slate-800/80 border border-cyan-500/30 text-cyan-300 hover:bg-slate-700/80'
              : 'w-full py-2.5 px-4 text-xs bg-slate-800/80 border border-cyan-500/30 text-cyan-300'
          }`}
        >
          <span>📲 INSTALAR EN IPHONE</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-2xl bg-[#0f1d33] border border-cyan-500/40 p-6 shadow-2xl text-slate-100">
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
                <h3 className="text-base font-black text-cyan-300 flex items-center gap-2">
                  <span>✈️</span> INSTALAR EN IPHONE / IPAD
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="text-xs bg-red-900/40 border border-red-500/40 text-red-300 px-2 py-1 rounded-lg font-bold"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed space-y-2">
                1. Toca el botón <strong>Compartir (Share ⬆️)</strong> en Safari.<br />
                2. Desplázate hacia abajo y selecciona <strong>"Agregar a pantalla de inicio" (Add to Home Screen)</strong>.<br />
                3. Toca <strong>Agregar</strong> arriba a la derecha.
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-cyan-500 py-2.5 text-xs font-black uppercase text-black hover:bg-cyan-400"
              >
                ENTENDIDO
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

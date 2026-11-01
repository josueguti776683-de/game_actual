import React from "react";

interface AirplaneSideViewProps {
  className?: string;
  pitchAngle?: number; // ángulo de cabeceo en grados (positivo = nariz arriba)
}

/**
 * Componente de Avión Comercial en Vista de Perfil Lateral (Side Elevation)
 * Diseñado con estándares técnicos aeronáuticos:
 * - Fuselaje aerodinámico de perfil lateral.
 * - Cabina de mando (Cockpit windshield) y ventanas de pasajeros.
 * - Ala con motor turbofán en góndola (Nacelle & Pylon).
 * - Estabilizador vertical (Vertical Tail Fin) y estabilizador horizontal.
 * - Tren de aterrizaje (Landing gear) que se retrae visualmente en vuelo.
 */
export const AirplaneSideView: React.FC<AirplaneSideViewProps> = ({
  className = "",
  pitchAngle = 0,
}) => {
  return (
    <div
      className={`inline-block transition-transform duration-500 ease-out select-none ${className}`}
      style={{
        transform: `rotate(${pitchAngle}deg)`,
        transformOrigin: "center center",
      }}
    >
      <svg
        width="60"
        height="32"
        viewBox="0 0 120 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_4px_12px_rgba(74,222,128,0.7)]"
      >
        <defs>
          {/* Gradiente de pintura del fuselaje aeronáutico */}
          <linearGradient id="fuselageGrad" x1="0" y1="20" x2="0" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="60%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          {/* Franja de aerolínea decorativa azul/esmeralda */}
          <linearGradient id="stripeGrad" x1="10" y1="32" x2="110" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="70%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          {/* Sombra / Acabado metálico motor */}
          <linearGradient id="engineGrad" x1="45" y1="36" x2="45" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
        </defs>

        {/* Estabilizador Horizontal (Cola de perfil) */}
        <path
          d="M 12 28 L 2 24 L 8 32 L 20 32 Z"
          fill="#94a3b8"
          stroke="#475569"
          strokeWidth="0.8"
        />

        {/* Estabilizador Vertical (Vertical Tail Fin) */}
        <path
          d="M 16 30 L 26 4 L 38 4 L 32 30 Z"
          fill="#0284c7"
          stroke="#0369a1"
          strokeWidth="1"
        />
        {/* Detalle en cola */}
        <path
          d="M 28 6 L 36 6 L 31 26 L 24 26 Z"
          fill="#38bdf8"
          opacity="0.8"
        />

        {/* Fuselaje Principal de Perfil (Fuselage) */}
        <path
          d="M 14 30 C 14 24, 25 22, 50 22 C 85 22, 105 24, 114 30 C 117 32, 117 35, 113 37 C 104 42, 85 43, 50 43 C 25 43, 14 38, 14 30 Z"
          fill="url(#fuselageGrad)"
          stroke="#94a3b8"
          strokeWidth="1"
        />

        {/* Franja lateral de pintura (Cheatline) */}
        <path
          d="M 16 33 C 35 33, 85 33, 114 33 C 112 35, 105 36, 85 36 C 50 36, 25 36, 16 35 Z"
          fill="url(#stripeGrad)"
        />

        {/* Parabrisas de Cabina (Cockpit Windshield) */}
        <path
          d="M 104 26 L 111 29 L 108 32 L 102 30 Z"
          fill="#0f172a"
          stroke="#38bdf8"
          strokeWidth="0.8"
        />

        {/* Ventanas de Pasajeros (Cabin Windows) */}
        <g fill="#0284c7" opacity="0.95">
          <rect x="42" y="27" width="2.5" height="3.5" rx="1" />
          <rect x="48" y="27" width="2.5" height="3.5" rx="1" />
          <rect x="54" y="27" width="2.5" height="3.5" rx="1" />
          <rect x="60" y="27" width="2.5" height="3.5" rx="1" />
          <rect x="66" y="27" width="2.5" height="3.5" rx="1" />
          <rect x="72" y="27" width="2.5" height="3.5" rx="1" />
          <rect x="78" y="27" width="2.5" height="3.5" rx="1" />
          <rect x="84" y="27" width="2.5" height="3.5" rx="1" />
          <rect x="90" y="27" width="2.5" height="3.5" rx="1" />
          <rect x="96" y="27" width="2.5" height="3.5" rx="1" />
        </g>

        {/* Ala de perfil (Wing Root & Wing) */}
        <path
          d="M 52 35 L 76 34 L 70 41 L 46 41 Z"
          fill="#cbd5e1"
          stroke="#64748b"
          strokeWidth="1"
        />

        {/* Góndola del Motor Turbofán (Turbofan Engine Pod) */}
        <g>
          {/* Pilón del motor */}
          <rect x="58" y="38" width="3" height="4" fill="#64748b" />
          {/* Capó del motor */}
          <rect x="52" y="42" width="20" height="9" rx="4.5" fill="url(#engineGrad)" stroke="#1e293b" strokeWidth="0.8" />
          {/* Toma de aire delantera */}
          <ellipse cx="72" cy="46.5" rx="2" ry="4" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.8" />
          {/* Escape tobera */}
          <path d="M 52 44 L 49 46.5 L 52 49 Z" fill="#f97316" opacity="0.9" />
        </g>

        {/* Luz estroboscópica / navegación anticolisión en fuselaje */}
        <circle cx="62" cy="22" r="1.5" fill="#ef4444" className="animate-pulse" />
        <circle cx="58" cy="43" r="1.5" fill="#ef4444" className="animate-pulse" />
      </svg>
    </div>
  );
};

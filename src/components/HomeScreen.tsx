import { useState, useEffect } from "react";
import { getAllLevels } from "../data";
import { PlayGame2Mode } from "./PlayGame2Mode";
import { safeStorage } from "../utils/safeStorage";
import { unlockAudioEngine } from "../utils/audioEngine";
import { PWAInstallButton } from "./PWAInstallButton";

export const HomeScreen = ({
  onSelectLevel,
  initialGameTab = "GAME1",
  onGameTabChange,
  onSelectGame2Play,
}: {
  onSelectLevel: (lvl: number) => void;
  initialGameTab?: "GAME1" | "GAME2";
  onGameTabChange?: (tab: "GAME1" | "GAME2") => void;
  onSelectGame2Play?: (play: "DIXIE" | "MODULE1" | "MODULE2" | "MODULE3" | "MODULE4" | "MODULE5" | "MODULE6" | "MODULE7" | "MODULE8" | "MODULE9" | "MODULE10") => void;
}) => {
  const levels = getAllLevels();
  const [activeTab, setActiveTab] = useState<"NONE" | "RULES" | "WHY" | "DAY">("NONE");
  const [selectedGameTab, setSelectedGameTab] = useState<"GAME1" | "GAME2">(initialGameTab);
  const [show5MinSubmenu, setShow5MinSubmenu] = useState(false);

  // Track weekly word progress for Monday to Sunday
  const [weeklyStats, setWeeklyStats] = useState<Record<string, number>>(() => {
    try {
      const saved = safeStorage.getItem("tma_weekly_learn_stats");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return {
      Lunes: 15,
      Martes: 10,
      Miércoles: 25,
      Jueves: 0,
      Viernes: 15,
      Sábado: 0,
      Domingo: 0,
    };
  });

  useEffect(() => {
    try {
      safeStorage.setItem("tma_weekly_learn_stats", JSON.stringify(weeklyStats));
    } catch {
      // Fallback
    }
  }, [weeklyStats]);

  const handleIncrement = (day: string) => {
    setWeeklyStats((prev) => ({
      ...prev,
      [day]: (prev[day] || 0) + 5,
    }));
  };

  const handleDecrement = (day: string) => {
    setWeeklyStats((prev) => ({
      ...prev,
      [day]: Math.max(0, (prev[day] || 0) - 5),
    }));
  };

  const handleResetStats = () => {
    setWeeklyStats({
      Lunes: 0,
      Martes: 0,
      Miércoles: 0,
      Jueves: 0,
      Viernes: 0,
      Sábado: 0,
      Domingo: 0,
    });
  };

  const totalWeeklyWords = Object.keys(weeklyStats).reduce((acc, key) => acc + (weeklyStats[key] as number || 0), 0);

  return (
    <div className="flex flex-col h-fit w-full max-w-[520px] sm:max-w-[540px] md:max-w-[580px] min-w-0 overflow-hidden glass-panel rounded-2xl sm:rounded-[30px] p-4 sm:p-6 mx-auto animate-in fade-in zoom-in duration-300">
      
      {/* HEADER SECTION */}
      <div className="dict-header text-center mb-3.5 relative">
        <h1 className="text-2xl sm:text-3xl md:text-[2.15rem] font-[900] uppercase m-0 leading-tight">
          GAME
        </h1>
        <div
          id="headerSubtitle"
          className="sub text-[--muted] text-[0.96rem] font-[600] mt-0.5"
        >
          Aviator Technical English
        </div>
        <div className="mt-2.5">
          <PWAInstallButton />
        </div>
      </div>

      {/* GAME TAB CONTROLLER: GAME 1 VS GAME 2 (APARTE) */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          onClick={() => {
            setSelectedGameTab("GAME1");
            setActiveTab("NONE");
            onGameTabChange?.("GAME1");
          }}
          className={`py-3.5 px-3 sm:px-4 rounded-xl font-extrabold text-[0.82rem] sm:text-[0.9rem] uppercase tracking-wider transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 ${
            selectedGameTab === "GAME1"
              ? "bg-gradient-to-r from-[#4fa7ff] to-[#79c6ff] text-black shadow-[0_0_12px_rgba(79,167,255,0.5)] border border-[#79c6ff]"
              : "bg-[#101f35]/80 text-[--muted] border border-[rgba(79,167,255,0.15)] hover:bg-[#152a48]"
          }`}
        >
          🛠️ GAME 1 (LEVELS)
        </button>
        <button
          onClick={() => {
            setSelectedGameTab("GAME2");
            onGameTabChange?.("GAME2");
          }}
          className={`py-3.5 px-3 sm:px-4 rounded-xl font-extrabold text-[0.82rem] sm:text-[0.9rem] uppercase tracking-wider transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 ${
            selectedGameTab === "GAME2"
              ? "bg-gradient-to-r from-[#4fa7ff] to-[#79c6ff] text-black shadow-[0_0_12px_rgba(79,167,255,0.5)] border border-[#79c6ff]"
              : "bg-[#101f35]/80 text-[--muted] border border-[rgba(79,167,255,0.15)] hover:bg-[#152a48]"
          }`}
        >
          ✈️ GAME 2 (PLAYS)
        </button>
      </div>

      {/* CONDITIONAL BRANCHING BY GAME SELECTION */}
      {selectedGameTab === "GAME1" ? (
        <div className="flex flex-col flex-1 animate-in fade-in duration-200">
          
          {/* DYNAMIC BUTTONS (RULES, WHY, DAY) - INSIDE GAME 1 */}
          <div className="grid grid-cols-3 gap-2 mt-2 mb-5">
            <button
              onClick={() => setActiveTab(activeTab === "RULES" ? "NONE" : "RULES")}
              className={`py-3 px-1 text-center font-bold text-xs uppercase cursor-pointer rounded-xl border transition-all duration-200 active:scale-95 ${
                activeTab === "RULES"
                  ? "bg-[--primary] text-black border-[--primary] font-[800] shadow-[0_0_12px_rgba(79,167,255,0.5)]"
                  : "bg-[#101f35]/80 text-[--muted] border-[rgba(79,167,255,0.2)] hover:bg-[#152a48]"
              }`}
            >
              📋 RULES
            </button>
            <button
              onClick={() => setActiveTab(activeTab === "WHY" ? "NONE" : "WHY")}
              className={`py-3 px-1 text-center font-bold text-xs uppercase cursor-pointer rounded-xl border transition-all duration-200 active:scale-95 ${
                activeTab === "WHY"
                  ? "bg-[--primary] text-black border-[--primary] font-[800] shadow-[0_0_12px_rgba(79,167,255,0.5)]"
                  : "bg-[#101f35]/80 text-[--muted] border-[rgba(79,167,255,0.2)] hover:bg-[#152a48]"
              }`}
            >
              ❓ WHY
            </button>
            <button
              onClick={() => setActiveTab(activeTab === "DAY" ? "NONE" : "DAY")}
              className={`py-3 px-1 text-center font-bold text-xs uppercase cursor-pointer rounded-xl border transition-all duration-200 active:scale-95 ${
                activeTab === "DAY"
                  ? "bg-[--primary] text-black border-[--primary] font-[800] shadow-[0_0_12px_rgba(79,167,255,0.5)]"
                  : "bg-[#101f35]/80 text-[--muted] border-[rgba(79,167,255,0.2)] hover:bg-[#152a48]"
              }`}
            >
              🗓️ DAY
            </button>
          </div>

          {/* INLINE CONTENT MANAGER */}
          {activeTab === "RULES" && (
            <div className="flex flex-col flex-1 animate-in slide-in-from-bottom duration-200 bg-[rgba(10,22,40,0.6)] border border-[rgba(79,167,255,0.25)] rounded-[24px] p-5 mb-5 h-auto">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[--line]/30">
                <h3 className="text-[--accent] m-0 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                  📋 REGLAS DE USO PARA EL HANGAR
                </h3>
                <button
                  onClick={() => setActiveTab("NONE")}
                  className="text-xs bg-red-900/30 border border-red-500/40 text-red-300 px-3 py-1 rounded-lg font-bold hover:bg-red-900/50"
                >
                  CERRAR [X]
                </button>
              </div>
              
              <div className="flex flex-col gap-3 text-xs leading-relaxed text-[--text] max-h-[280px] sm:max-h-[350px] overflow-y-auto scroll-container pr-1.5">
                <div className="p-3 bg-[#0a1526]/80 rounded-xl border border-[rgba(121,198,255,0.15)]">
                  <strong className="text-[--primary] block mb-1">1. VOCABULARY & AUDIO IPA (Play 1)</strong>
                  Aprende el vocabulario técnico aeronáutico, consulta la pronunciación fonética (IPA EE. UU.) y reproduce el audio para afianzar tu memoria muscular-auditiva.
                </div>
                
                <div className="p-3 bg-[#0a1526]/80 rounded-xl border border-[rgba(121,198,255,0.15)]">
                  <strong className="text-[--primary] block mb-1">2. ORACIONES Y AUDIO DOBLE (Play 2)</strong>
                  Analiza oraciones de manuales reales con palabras clave destacadas. Utiliza la reproducción de audio Normal y Lento (debajo de la traducción) para perfeccionar tu audición.
                </div>
                
                <div className="p-3 bg-[#0a1526]/80 rounded-xl border border-[rgba(121,198,255,0.15)]">
                  <strong className="text-[--primary] block mb-1">3. TRADUCCIÓN Y ESCRITURA (Play 3)</strong>
                  Traduce y escribe los términos sin omitir caracteres. Apóyate en el botón de audio e IPA estadounidense situado directamente debajo de la palabra.
                </div>
                
                <div className="p-3 bg-[#0a1526]/80 rounded-xl border border-[rgba(121,198,255,0.15)]">
                  <strong className="text-[--primary] block mb-1">4. MATCH PAIRS (Play 4)</strong>
                  Empareja los conceptos técnicos inglés-español con rapidez y precisión para consolidar tu agilidad mental y vocabulario de aviación.
                </div>
                
                <div className="p-3 bg-[#0a1526]/80 rounded-xl border border-[rgba(121,198,255,0.15)]">
                  <strong className="text-[--primary] block mb-1">5. TEST 1 - ESCRITURA (Play 5)</strong>
                  Evaluación de precisión técnica al 100%. Un solo carácter erróneo en un manual real puede provocar no conformidad técnica o fallas operativas.
                </div>

                <div className="p-3 bg-[#0a1526]/80 rounded-xl border border-[rgba(121,198,255,0.15)]">
                  <strong className="text-[--primary] block mb-1">6. TEST 2 - AUDIO (Play 6)</strong>
                  Evaluación de comprensión auditiva en entorno de hangar. Escucha con atención y valida tu capacidad de entendimiento de comandos y términos.
                </div>
                
                <div className="p-3 bg-[#0a1526]/80 rounded-xl border border-[rgba(121,198,255,0.15)]">
                  <strong className="text-[--primary] block mb-1">7. AIR COMBAT (Play 7)</strong>
                  Modo de combate táctico aéreo. Identifica y derriba bogeys enemigos disparando el misil guiado correcto con el término aeronáutico antes de que el blanco escape o te contraataque.
                </div>

                <div className="p-3 bg-[#0a1526]/80 rounded-xl border border-[rgba(121,198,255,0.15)]">
                  <strong className="text-[--primary] block mb-1">8. AIR CHALLENGE (Play 8)</strong>
                  Desafío integral en cabina de vuelo con horizonte artificial. Supera en grupos de 6 palabras la selección múltiple, pares, escritura técnica y test auditivo con telemetría de puntos y aviones en formación.
                </div>

                <div className="p-3 bg-[#0a1526]/80 rounded-xl border border-[rgba(121,198,255,0.15)]">
                  <strong className="text-[--primary] block mb-1">9. CONSTANCIA DIARIA DE MANTENIMIENTO</strong>
                  Forma tu rigor profesional. Completa al menos un nivel o ciclo de estudio todos los días para consolidar el hábito operativo sin vacíos.
                </div>
              </div>

              <div className="mt-5 p-3 bg-gradient-to-r from-blue-950 to-slate-900 rounded-xl text-center border border-[--line]/40">
                <span className="text-[0.7rem] uppercase text-[--muted] block mb-1 font-semibold tracking-widest">MENSAJE DE MOTIVACIÓN</span>
                <strong className="text-[--accent] text-xs uppercase font-extrabold block">
                  STAY ACCURATE. STAY SAFE. EXCELLENCE IS OUR ONLY QUALITY STANDARD.
                </strong>
              </div>
            </div>
          )}

          {activeTab === "WHY" && (
            <div className="flex flex-col flex-1 animate-in slide-in-from-bottom duration-200 bg-[rgba(10,22,40,0.6)] border border-[rgba(239,68,68,0.25)] rounded-[24px] p-5 mb-5 h-auto">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-red-500/30">
                <h3 className="text-red-400 m-0 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                  🚨 POR QUÉ ESTUDIAR INGLÉS DE AVIACIÓN
                </h3>
                <button
                  onClick={() => setActiveTab("NONE")}
                  className="text-xs bg-red-900/30 border border-red-500/40 text-red-300 px-3 py-1 rounded-lg font-bold hover:bg-red-900/50"
                >
                  CERRAR [X]
                </button>
              </div>
              
              <div className="flex flex-col gap-3 text-xs leading-relaxed text-[--text] max-h-[320px] sm:max-h-[420px] overflow-y-auto scroll-container pr-1.5">
                {/* FIRST MESSAGE: PROGRAM STATISTICS BOX */}
                <div className="p-3.5 bg-gradient-to-r from-[#0c1e38] to-[#122b50] rounded-xl border border-[#79c6ff]/40 shadow-md">
                  <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-[#79c6ff]/20">
                    <span className="text-base">📊</span>
                    <strong className="text-[#79c6ff] font-black uppercase text-xs tracking-wider">
                      ESTADÍSTICAS GLOBALES DEL PROGRAMA (30 NIVELES)
                    </strong>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-center my-2">
                    <div className="bg-[#081326] p-2 sm:p-2.5 rounded-lg border border-[#79c6ff]/20 flex flex-col items-center justify-center">
                      <span className="text-[0.65rem] font-bold text-[#94a3b8] uppercase tracking-wider">POR NIVEL</span>
                      <span className="text-sm sm:text-base font-black text-white">30 Palabras</span>
                      <span className="text-xs font-semibold text-emerald-400">30 Oraciones</span>
                    </div>

                    <div className="bg-[#081326] p-2 sm:p-2.5 rounded-lg border border-[#79c6ff]/20 flex flex-col items-center justify-center">
                      <span className="text-[0.65rem] font-bold text-[#94a3b8] uppercase tracking-wider">VARIACIONES VOCABULARIOS</span>
                      <span className="text-sm sm:text-base font-black text-[#79c6ff]">60 Términos</span>
                      <span className="text-[0.6rem] text-slate-400">por nivel en Plays</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center mt-2 pt-2 border-t border-[#79c6ff]/20">
                    <div className="bg-[#0f2444] p-2.5 rounded-lg border border-[#79c6ff]/30 flex flex-col items-center justify-center">
                      <span className="text-[0.62rem] sm:text-[0.65rem] font-extrabold text-[#79c6ff] uppercase tracking-wider">TOTAL PALABRAS APRENDIDAS</span>
                      <span className="text-xl sm:text-2xl font-black text-white">900</span>
                      <span className="text-[0.6rem] text-slate-300 font-medium">Palabras Técnicas (30 Niveles)</span>
                    </div>

                    <div className="bg-[#0f2444] p-2.5 rounded-lg border border-[#79c6ff]/30 flex flex-col items-center justify-center">
                      <span className="text-[0.62rem] sm:text-[0.65rem] font-extrabold text-emerald-400 uppercase tracking-wider">TOTAL ORACIONES APRENDIDAS</span>
                      <span className="text-xl sm:text-2xl font-black text-emerald-300">900</span>
                      <span className="text-[0.6rem] text-slate-300 font-medium">Oraciones Completa AMM (30 Niveles)</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#11080d]/80 rounded-xl border border-red-500/20">
                  <span className="text-red-500 font-extrabold block mb-1">MOTIVO 1: LA BARRERA DE SEGURIDAD</span>
                  "El inglés técnico de aviación no es meramente académico; representa la línea de seguridad infranqueable entre un vuelo seguro y un desastre estructural."
                </div>
                
                <div className="p-3 bg-[#11080d]/80 rounded-xl border border-red-500/20">
                  <span className="text-red-500 font-extrabold block mb-1">MOTIVO 2: EL CERO MARGEN DE ERROR</span>
                  "Si interpretas erróneamente una instrucción en los boletines AMM, puedes causar una mala distribución de esfuerzos, fallas mecánicas e incidentes fatales catastróficos."
                </div>
                
                <div className="p-3 bg-[#11080d]/80 rounded-xl border border-red-500/20">
                  <span className="text-red-500 font-extrabold block mb-1">MOTIVO 3: RESPONSABILIDAD LEGAL DE QC</span>
                  "Si un Inspector de Control de Calidad carece del dominio técnico para descifrar de manera precisa el manual, certificará piezas dudosas, enviando fallas directas al aire."
                </div>
                
                <div className="p-3 bg-[#11080d]/80 rounded-xl border border-red-500/20">
                  <span className="text-red-500 font-extrabold block mb-1">MOTIVO 4: REGLAS DEL BLUEPRINT GLOBAL</span>
                  "Todos los manuales de aeronavegabilidad aeronáutica son diseñados, actualizados y redactados estrictamente en inglés. En el hangar de servicio, adivinar es negligencia criminal."
                </div>
                
                <div className="p-3 bg-[#11080d]/80 rounded-xl border border-red-500/20">
                  <span className="text-red-500 font-extrabold block mb-1">MOTIVO 5: SEGURIDAD DE VIDAS HUMANAS</span>
                  "Cuando firmas un documento técnico de liberación o bitácora de vuelo, cientos de familias en el aire depositan su vida completa en tu rigurosa interpretación técnica."
                </div>
              </div>

              <div className="mt-5 p-3 bg-gradient-to-r from-red-950 to-slate-900 rounded-xl text-center border border-red-500/40">
                <span className="text-[0.7rem] uppercase text-red-400 block mb-1 font-semibold tracking-widest">REGLA NÚMERO UNO</span>
                <strong className="text-white text-xs uppercase font-extrabold block">
                  NO HABRÁ SEGUNDAS OPORTUNIDADES SI EL MECANISMO FALLA EN EL AIRE.
                </strong>
              </div>
            </div>
          )}

          {activeTab === "DAY" && (
            <div className="flex flex-col flex-1 animate-in slide-in-from-bottom duration-200 bg-[rgba(10,22,40,0.6)] border border-[rgba(79,167,255,0.25)] rounded-[24px] p-5 mb-5 h-auto">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[--line]/30">
                <h3 className="text-[--accent] m-0 font-bold uppercase tracking-wider text-sm">
                  🗓️ BITÁCORA DIARIA DE PROGRESO
                </h3>
                <button
                  onClick={() => setActiveTab("NONE")}
                  className="text-xs bg-red-900/30 border border-red-500/40 text-red-300 px-3 py-1 rounded-lg font-bold hover:bg-red-900/50"
                >
                  CERRAR [X]
                </button>
              </div>

              {/* TOTAL SCORE */}
              <div className="flex items-center justify-between bg-[#08152c]/90 px-4 py-3 rounded-2xl border border-[--line]/25 mb-4">
                <div className="text-xs text-[--muted] uppercase font-bold">TOTAL APRENDIDO ESTA SEMANA</div>
                <div className="text-lg font-black text-[--accent]">{totalWeeklyWords} PALABRAS</div>
              </div>
              
              <div className="flex flex-col gap-2.5 max-h-[240px] sm:max-h-[300px] overflow-y-auto scroll-container pr-1.5">
                {Object.entries(weeklyStats).map(([day, valRaw]) => {
                  const val = valRaw as number;
                  return (
                    <div key={day} className="flex items-center justify-between bg-[#0c1a2f]/80 p-3 rounded-xl border border-[rgba(121,198,255,0.1)] gap-4">
                      <span className="text-xs font-bold text-white w-20 uppercase tracking-wider">{day}</span>
                      
                      {/* PROGRESS BAR BAR */}
                      <div className="flex-1 bg-black/40 rounded-full h-2.5 overflow-hidden border border-white/5">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (val / 15) * 100)}%` }}
                        />
                      </div>

                      {/* COUNTER & CONTROLS */}
                      <div className="flex items-center gap-2">
                        <span className="text-[0.75rem] font-black text-[--muted] w-14 text-center bg-black/30 px-2 py-0.5 rounded-md">
                          {val} Voc
                        </span>
                        <button 
                          onClick={() => handleDecrement(day)}
                          className="w-6 h-6 rounded-md bg-stone-900/95 text-red-400 border border-red-500/20 text-xs font-black flex items-center justify-center hover:bg-stone-800"
                        >
                          -
                        </button>
                        <button 
                          onClick={() => handleIncrement(day)}
                          className="w-6 h-6 rounded-md bg-stone-900/95 text-emerald-400 border border-emerald-500/20 text-xs font-black flex items-center justify-center hover:bg-stone-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={handleResetStats}
                  className="text-[0.65rem] font-bold tracking-wider uppercase border border-red-500/30 text-red-400 hover:bg-red-950/20 px-3 py-1.5 rounded-lg"
                >
                  🔄 RESET TOTAL DIARIO
                </button>
              </div>

              <div className="mt-4 p-3 bg-gradient-to-r from-blue-950 to-slate-900 rounded-xl text-center border border-[--line]/40">
                <span className="text-[0.7rem] uppercase text-[--muted] block mb-1 font-semibold tracking-widest">CONSEJO DEL DÍA</span>
                <strong className="text-[--accent] text-xs uppercase font-extrabold block">
                  EVERY REPETITION SHAPES A HIGHER LEVEL OF SAFETY IN THE SKIES.
                </strong>
              </div>
            </div>
          )}

          {/* RENDER LEVELS / ACTIONS LIST */}
          {activeTab === "NONE" && (
            <div className="flex flex-col flex-1 animate-in slide-in-from-bottom duration-200">
              
              {/* ⏱️ MODE: 5 MINUTES PROMINENT GAME BUTTON */}
              <button
                onClick={() => {
                  unlockAudioEngine();
                  setShow5MinSubmenu(!show5MinSubmenu);
                }}
                className="w-full py-4 px-6 mb-3 text-[1.05rem] sm:text-[1.12rem] font-black tracking-wider text-center uppercase cursor-pointer rounded-[24px] bg-gradient-to-r from-[#4fa7ff] to-[#79c6ff] text-black shadow-[0_0_15px_rgba(79,167,255,0.35)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 border border-[#79c6ff]"
              >
                ⏱️ MODE: 5 MINUTES {show5MinSubmenu ? "▲" : "▼"}
              </button>

              {/* INTERACTIVE SUBMENU FOR WORD SELECTION */}
              {show5MinSubmenu && (
                <div className="animate-in slide-in-from-top-2 duration-200 bg-[#0c1a2f]/90 border border-[#79c6ff]/40 rounded-2xl p-3 mb-4 flex flex-col sm:flex-row gap-2.5 justify-center shadow-lg">
                  <button
                    onClick={() => {
                      unlockAudioEngine();
                      onSelectLevel(999);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-[#4fa7ff] to-[#79c6ff] text-black border border-[#79c6ff] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    ⚡ 15 PALABRAS (15 WORDS)
                  </button>
                  <button
                    onClick={() => {
                      unlockAudioEngine();
                      onSelectLevel(909);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-[#4fa7ff] to-[#79c6ff] text-black border border-[#79c6ff] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    🚀 9 PALABRAS (9 WORDS)
                  </button>
                </div>
              )}

              <div className="levels-container flex-1 pr-1.5 mb-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[350px] sm:max-h-[380px] overflow-y-auto scroll-container">
                {levels.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => onSelectLevel(lvl.id)}
                    className="level-btn w-full py-3 px-4 text-sm sm:text-base font-bold text-center uppercase cursor-pointer transition-all duration-150 active:scale-98"
                  >
                    {lvl.name}
                  </button>
                ))}
              </div>

              <div className="footer-message bg-[rgba(16,33,58,0.9)] rounded-[18px] px-4 py-3 border border-[--line] text-center mt-auto">
                <p className="m-0 text-[0.82rem] sm:text-[0.88rem] leading-snug text-[#79c6ff] uppercase font-bold tracking-wide">
                  AVIADOR: YOU CAN DO IT, DO NOT GIVE UP. COMPLETE ALL LEVELS, AVIATOR, AND YOU WILL SEE THE GLORY OF AVIATION AND THE VICTORY OF A GOOD JOB.
                </p>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* GAME 2: AIR INSPECT VIEW */
        <div className="flex flex-col flex-1 animate-in fade-in duration-200 mt-1 w-full max-w-full min-w-0 overflow-hidden">
          <PlayGame2Mode
            onBack={() => {
              setSelectedGameTab("GAME1");
              onGameTabChange?.("GAME1");
            }}
            onOpenPlay={onSelectGame2Play}
          />
        </div>
      )}
      
    </div>
  );
};

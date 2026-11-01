import { useState } from "react";
import { 
  BookOpen,
  Sparkles,
  Compass,
  CheckCircle2,
  Layers,
  Wrench,
  Edit3,
  ClipboardList,
  Volume2,
  FileText
} from "lucide-react";
import { DixieDictionary } from "./DixieDictionary";
import { Game2Module1View } from "./Game2Module1View";
import { Game2Module2View } from "./Game2Module2View";
import { Game2Module3View } from "./Game2Module3View";
import { Game2Module4View } from "./Game2Module4View";
import { Game2Module5View } from "./Game2Module5View";
import { Game2Module6View } from "./Game2Module6View";
import { Game2Module7View } from "./Game2Module7View";
import { Game2Module8View } from "./Game2Module8View";
import { Game2Module9View } from "./Game2Module9View";
import { Game2Module10View } from "./Game2Module10View";

export type Game2PlayType = "NONE" | "DIXIE" | "MODULE1" | "MODULE2" | "MODULE3" | "MODULE4" | "MODULE5" | "MODULE6" | "MODULE7" | "MODULE8" | "MODULE9" | "MODULE10";

export const PlayGame2Mode = ({
  onBack: _onBack,
  initialPlay = "NONE",
  onOpenPlay,
}: {
  onBack: () => void;
  initialPlay?: Game2PlayType;
  onOpenPlay?: (play: Exclude<Game2PlayType, "NONE">) => void;
}) => {
  // Active Play selection: "NONE" (Menu), "DIXIE", "MODULE1" through "MODULE10"
  const [activePlay, setActivePlay] = useState<Game2PlayType>(
    initialPlay === "DIXIE"
      ? "DIXIE"
      : initialPlay === "MODULE1"
      ? "MODULE1"
      : initialPlay === "MODULE2"
      ? "MODULE2"
      : initialPlay === "MODULE3"
      ? "MODULE3"
      : initialPlay === "MODULE4"
      ? "MODULE4"
      : initialPlay === "MODULE5"
      ? "MODULE5"
      : initialPlay === "MODULE6"
      ? "MODULE6"
      : initialPlay === "MODULE7"
      ? "MODULE7"
      : initialPlay === "MODULE8"
      ? "MODULE8"
      : initialPlay === "MODULE9"
      ? "MODULE9"
      : initialPlay === "MODULE10"
      ? "MODULE10"
      : "NONE"
  );
  const [showMecanicoQuote, setShowMecanicoQuote] = useState<boolean>(false);
  const [showRules, setShowRules] = useState<boolean>(false);

  // ==========================================
  // VIEW: MAIN MENU (activePlay === "NONE")
  // ==========================================
  if (activePlay === "NONE") {
    return (
      <div className="flex flex-col flex-1 w-full max-w-full min-w-0 overflow-hidden animate-in fade-in duration-200">
        
        {/* HEADER QUOTE / MOTIVATION */}
        <div className="text-center bg-[#091526]/80 p-3 sm:p-3.5 rounded-2xl border border-[#79c6ff]/20 shadow-[0_0_15px_rgba(79,167,255,0.1)] mb-3 w-full max-w-full min-w-0 break-words flex flex-col items-center">
          <button
            onClick={() => setShowMecanicoQuote(!showMecanicoQuote)}
            className="text-[9.5px] sm:text-[10px] font-mono tracking-wider text-[#79c6ff] bg-[#0c1a2f] hover:bg-[#132847] px-3.5 py-1.5 rounded-full border border-[#79c6ff]/40 uppercase font-black cursor-pointer transition-all flex items-center gap-1.5 max-w-full shadow-sm active:scale-95"
          >
            <span>🛠️ MECÁNICO DE MANTENIMIENTO DE AERONAVES</span>
            <span className="text-[10px] text-[#79c6ff] font-bold">{showMecanicoQuote ? "▲" : "▼"}</span>
          </button>
          
          {showMecanicoQuote && (
            <p className="text-[0.75rem] sm:text-xs text-slate-200 mt-2.5 m-0 leading-relaxed font-semibold italic max-w-full px-1 break-words animate-in slide-in-from-top-1 duration-200">
              "Tu firma en la bitácora es el pacto sagrado e infranqueable que garantiza que cada estructura, motor y sistema operará con precisión milimétrica. Me esforzaré constantemente por perfeccionar mi conocimiento técnico y jamás comprometeré el honor ni la seguridad de una aeronave."
            </p>
          )}
        </div>

        {/* BOTÓN DINÁMICO RULES: (ARRIBA DE LA OPCIÓN DICCIONARIO) */}
        <div className="w-full flex flex-col items-center mb-3">
          <button
            onClick={() => setShowRules(!showRules)}
            className="w-full sm:w-auto min-w-[280px] py-2 px-5 rounded-full font-mono text-[10px] sm:text-xs uppercase font-black tracking-wider text-[#79c6ff] bg-[#0c1e38] hover:bg-[#132847] border border-[#79c6ff]/60 shadow-[0_0_15px_rgba(79,167,255,0.25)] flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-[#79c6ff]" />
            <span>RULES: GUÍA Y FUNCIONAMIENTO</span>
            <span className="text-[10px] text-[#79c6ff] font-bold">{showRules ? "▲" : "▼"}</span>
          </button>

          {showRules && (
            <div className="w-full mt-2.5 p-3.5 sm:p-4 bg-gradient-to-b from-[#0a182c] to-[#071324] border-2 border-[#79c6ff]/50 rounded-2xl text-left shadow-[0_0_25px_rgba(79,167,255,0.2)] animate-in slide-in-from-top-2 duration-200">
              <div className="flex items-center gap-2 border-b border-[#79c6ff]/20 pb-2 mb-2.5">
                <Sparkles className="w-4 h-4 text-[#79c6ff]" />
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white m-0">
                  GUÍA Y REGLAS DE ENTRENAMIENTO AERONÁUTICO
                </h4>
              </div>

              <div className="space-y-2.5 text-xs text-slate-200 leading-relaxed">
                {/* DICCIONARIO */}
                <div className="bg-[#0f2442]/60 p-2.5 rounded-xl border border-[#79c6ff]/25">
                  <span className="text-[#79c6ff] font-black uppercase block mb-1 flex items-center gap-1.5 text-xs">
                    <span>📖</span> DICCIONARIO TÉCNICO (DIXIE)
                  </span>
                  <p className="text-slate-300 m-0 text-[11.5px] leading-relaxed">
                    Catálogo técnico clasificado bajo estándares <strong>ASD-STE100 & AMM</strong>. Ofrece flashcards interactivas con transcripción fonética IPA, pronunciación en audio nativo en inglés, reglas gramaticales y conjugaciones verbales para dominar el léxico de mantenimiento.
                  </p>
                </div>

                {/* MÓDULO 1 */}
                <div className="bg-[#0f2442]/60 p-2.5 rounded-xl border border-[#79c6ff]/25">
                  <span className="text-[#79c6ff] font-black uppercase block mb-1 flex items-center gap-1.5 text-xs">
                    <span>⚙️</span> MÓDULO 1: 200 ORACIONES TÉCNICAS AMM
                  </span>
                  <p className="text-slate-300 m-0 text-[11.5px] leading-relaxed">
                    10 Plays con 20 oraciones técnicas cada uno (200 en total). Escucha la oración en inglés en la parte superior y selecciona la traducción técnica exacta en español. Incluye bitácora con registro de errores y pantallas evaluativas reflexivas (*¡ACCIDENTE AÉREO!* o *¡BIENVENIDO TÉCNICO, GANASTE!*).
                  </p>
                </div>

                {/* MÓDULO 2 */}
                <div className="bg-[#0f2442]/60 p-2.5 rounded-xl border border-[#79c6ff]/25">
                  <span className="text-[#79c6ff] font-black uppercase block mb-1 flex items-center gap-1.5 text-xs">
                    <span>✈️</span> MÓDULO 2: 200 ORACIONES TÉCNICAS AMM Y ATA
                  </span>
                  <p className="text-slate-300 m-0 text-[11.5px] leading-relaxed">
                    10 Plays con 20 oraciones técnicas cada uno (200 oraciones nuevas). Cubre sistemas hidráulicos (ATA 29), neumáticos y presurización (ATA 36/21), potencia eléctrica (ATA 24), combustible e incendios (ATA 28/26), mandos de vuelo (ATA 27), tren de aterrizaje y frenos (ATA 32), turbinas FADEC (ATA 71-80), aviónica (ATA 34/23), inspección estructural NDT (ATA 51-57) y APU (ATA 49).
                  </p>
                </div>

                {/* MÓDULO 3 */}
                <div className="bg-[#0f2442]/60 p-2.5 rounded-xl border border-[#79c6ff]/25">
                  <span className="text-[#79c6ff] font-black uppercase block mb-1 flex items-center gap-1.5 text-xs">
                    <span>🔧</span> MÓDULO 3: 300 ORACIONES • PARTES DE AERONAVES
                  </span>
                  <p className="text-slate-300 m-0 text-[11.5px] leading-relaxed">
                    15 Plays con 20 oraciones técnicas cada uno (300 oraciones en total). Inspección y montaje de fuselaje, cabina, mamparos, costillas, remaches, turbinas, compresores, bujías, rotores, alerones, bombas hidráulicas y sistemas. Las oraciones contienen espacios vacíos y palabras clave con contorno celeste para ordenar y completar. Incluye botón <strong>VERIFY</strong> interactivo y pantallas evaluativas con bitácora.
                  </p>
                </div>

                {/* MÓDULO 4 */}
                <div className="bg-[#0f2442]/60 p-2.5 rounded-xl border border-[#79c6ff]/25">
                  <span className="text-[#79c6ff] font-black uppercase block mb-1 flex items-center gap-1.5 text-xs">
                    <span>📝</span> MÓDULO 4: 200 ORACIONES • CESSNA 150/172 & STE
                  </span>
                  <p className="text-slate-300 m-0 text-[11.5px] leading-relaxed">
                    10 Plays con 20 oraciones técnicas cada uno (200 en total). Flujo pedagógico: visualiza la oración en inglés, estudia las traducciones del verbo y núcleo, y escribe la traducción en español en el cuadro de texto. En caso de error, <strong>la oración se mantiene activa hasta escribirla correctamente</strong>.
                  </p>
                </div>

                {/* MÓDULO 5 */}
                <div className="bg-[#0f2442]/60 p-2.5 rounded-xl border border-[#79c6ff]/25">
                  <span className="text-[#79c6ff] font-black uppercase block mb-1 flex items-center gap-1.5 text-xs">
                    <span>⚡</span> MÓDULO 5: 200 ORACIONES • CESSNA 210, TURBO Y SISTEMAS AVANZADOS
                  </span>
                  <p className="text-slate-300 m-0 text-[11.5px] leading-relaxed">
                    10 Plays con 20 oraciones técnicas cada uno (200 en total). Mantenimiento avanzado de Cessna 210 Centurion: tren retráctil electrohidráulico, turboalimentador Continental TSIO-520, hélice McCauley de velocidad constante, presurización y sistemas complejos con redacción en cuadro de texto.
                  </p>
                </div>

                {/* MÓDULO 6 */}
                <div className="bg-[#0f2442]/60 p-2.5 rounded-xl border border-[#79c6ff]/25">
                  <span className="text-[#79c6ff] font-black uppercase block mb-1 flex items-center gap-1.5 text-xs">
                    <span>🛩️</span> MÓDULO 6: 200 ORACIONES • TURBOPROP PT6A, NDT, APU Y SISTEMAS ESPECIALES
                  </span>
                  <p className="text-slate-300 m-0 text-[11.5px] leading-relaxed">
                    10 Plays con 20 oraciones técnicas cada uno (200 en total). Mantenimiento de turbohélice PT6A (Cessna 208 Caravan), hélice reversible, protección contra fuego HRD, ciclo de aire ACM, radar meteorológico, NDT (corrientes de Eddy, ultrasonido, penetrantes), bleed air, ELT 406 MHz, APU y RVSM/CVR.
                  </p>
                </div>

                {/* MÓDULO 7 */}
                <div className="bg-[#0f2442]/60 p-2.5 rounded-xl border border-[#79c6ff]/25">
                  <span className="text-[#79c6ff] font-black uppercase block mb-1 flex items-center gap-1.5 text-xs">
                    <span>📋</span> MÓDULO 7: 200 ORACIONES • REPORTE DE HANGAR (DISCREPANCIAS DE PILOTO)
                  </span>
                  <p className="text-slate-300 m-0 text-[11.5px] leading-relaxed">
                    10 Plays con 20 oraciones técnicas cada uno (200 en total). Simulación real de reportes de pilotos y discrepancias en bitácora de vuelo (AOG, cockpit, navegación, motores, combustible, tren de aterrizaje y aviónica) con traducción técnica y ensamblado estructural.
                  </p>
                </div>

                {/* MÓDULO 8 */}
                <div className="bg-[#0f2442]/60 p-2.5 rounded-xl border border-amber-500/40">
                  <span className="text-amber-400 font-black uppercase block mb-1 flex items-center gap-1.5 text-xs">
                    <span>⚡</span> MÓDULO 8: REGLAS Y CONSTRUCCIÓN DE ORACIONES STE (ASD-STE100)
                  </span>
                  <p className="text-slate-300 m-0 text-[11.5px] leading-relaxed">
                    10 Plays con 20 ejercicios y preguntas cada uno (200 en total). Aprende la normativa oficial ASD-STE100: qué verbos usar (Make sure, Do, Obey, Discard), voz activa, tiempos verbales simples, eliminación del gerundio "-ing", clusters nominales de máx 3 palabras, falsos verbos técnicos (Oil, Torque, Test) y límite de 20 palabras por instrucción con penalizaciones, recompensas y pantalla final estándar.
                  </p>
                </div>

                {/* MÓDULO 9 */}
                <div className="bg-[#0f2442]/60 p-2.5 rounded-xl border border-emerald-500/40">
                  <span className="text-emerald-400 font-black uppercase block mb-1 flex items-center gap-1.5 text-xs">
                    <span>📖</span> MÓDULO 9: LECTURA TÉCNICA AMM CESSNA 150/172/210 (12 PLAYS)
                  </span>
                  <p className="text-slate-300 m-0 text-[11.5px] leading-relaxed">
                    12 Plays de lectura técnica pura extraída de manuales de mantenimiento Cessna (ATA 71, 73, 32, 27, 34, 72, 61, 74, 81, 28, 21). Incluye <strong>2 botones de audio (Normal 1.0x y Lento 0.65x)</strong> para practicar pronunciación paso a paso, barra de opciones con modo bilingüe/solo inglés, tamaño de texto, resaltador de verbos STE y vocabulario de cada play.
                  </p>
                </div>

                {/* MÓDULO 10 */}
                <div className="bg-[#0f2442]/60 p-2.5 rounded-xl border border-cyan-500/40">
                  <span className="text-cyan-400 font-black uppercase block mb-1 flex items-center gap-1.5 text-xs">
                    <span>🛩️</span> MÓDULO 10: LECTURA TÉCNICA AVANZADA CESSNA 208 TURBOPROP (12 PLAYS)
                  </span>
                  <p className="text-slate-300 m-0 text-[11.5px] leading-relaxed">
                    12 Plays de lectura técnica avanzada sobre Cessna 208 Caravan y turbohélice PT6A: boroscopio, inyectores dúplex, anillo beta de hélice reversible, neumática y máquina de ciclo de aire (ACM), extintor HRD, botas de deshielo, NDT corrientes de Eddy, suite Garmin G1000, ELT 406 MHz, programa CPCP y retorno al servicio (RTS 14 CFR 43). Con <strong>audio normal y lento</strong> y barra de opciones.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* OPTIONS CONTAINER: DICCIONARIO, MÓDULO 1, 2, 3, 4 Y 5 */}
        <div className="flex-1 flex flex-col justify-center items-center py-1 px-1 mb-4 w-full gap-3.5">
          
          {/* OPCIÓN 1: DICCIONARIO TÉCNICO */}
          <div className="w-full bg-gradient-to-r from-[#0d223f] to-[#0a182c] border-2 border-[#79c6ff]/60 hover:border-[#79c6ff] rounded-2xl p-4 sm:p-5 shadow-[0_0_20px_rgba(79,167,255,0.2)] flex flex-col items-center text-center transition-all duration-200">
            <h2 className="text-base sm:text-lg font-black uppercase text-white tracking-wide mb-3 flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5 text-[#79c6ff]" />
              <span>DICCIONARIO TÉCNICO</span>
            </h2>

            <button
              onClick={() => {
                if (onOpenPlay) {
                  onOpenPlay("DIXIE");
                } else {
                  setActivePlay("DIXIE");
                }
              }}
              className="w-full sm:w-auto min-w-[260px] py-3 px-8 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-[#4fa7ff] via-[#79c6ff] to-[#a6d8ff] text-black border border-[#79c6ff] hover:brightness-110 active:scale-95 shadow-[0_0_18px_rgba(79,167,255,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>ENTER DIXIE ➔</span>
            </button>
          </div>

          {/* OPCIÓN 2: MÓDULO 1: 200 ORACIONES TÉCNICAS AMM */}
          <div className="w-full bg-gradient-to-r from-[#0a192e] to-[#071324] border-2 border-[#79c6ff]/60 hover:border-[#79c6ff] rounded-2xl p-4 sm:p-5 shadow-[0_0_20px_rgba(79,167,255,0.18)] flex flex-col items-center text-center transition-all duration-200">
            <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-wide mb-3 flex items-center justify-center gap-2">
              <Layers className="w-5 h-5 text-[#79c6ff]" />
              <span>MÓDULO 1: 200 ORACIONES TÉCNICAS AMM</span>
            </h3>

            <button
              onClick={() => {
                if (onOpenPlay) {
                  onOpenPlay("MODULE1");
                } else {
                  setActivePlay("MODULE1");
                }
              }}
              className="w-full sm:w-auto min-w-[260px] py-2.5 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-[#0c1e38] text-white border border-[#79c6ff]/40 hover:bg-[#132847] active:scale-95 shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4 text-[#79c6ff]" />
              <span>ENTRAR A MÓDULO 1 (10 PLAYS) ➔</span>
            </button>
          </div>

          {/* OPCIÓN 3: MÓDULO 2: 200 ORACIONES TÉCNICAS AMM Y ATA */}
          <div className="w-full bg-gradient-to-r from-[#0a192e] to-[#071324] border-2 border-[#79c6ff]/60 hover:border-[#79c6ff] rounded-2xl p-4 sm:p-5 shadow-[0_0_20px_rgba(79,167,255,0.18)] flex flex-col items-center text-center transition-all duration-200">
            <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-wide mb-3 flex items-center justify-center gap-2">
              <Layers className="w-5 h-5 text-[#79c6ff]" />
              <span>MÓDULO 2: 200 ORACIONES TÉCNICAS AMM Y ATA</span>
            </h3>

            <button
              onClick={() => {
                if (onOpenPlay) {
                  onOpenPlay("MODULE2");
                } else {
                  setActivePlay("MODULE2");
                }
              }}
              className="w-full sm:w-auto min-w-[260px] py-2.5 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-[#0c1e38] text-white border border-[#79c6ff]/40 hover:bg-[#132847] active:scale-95 shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4 text-[#79c6ff]" />
              <span>ENTRAR A MÓDULO 2 (10 PLAYS) ➔</span>
            </button>
          </div>

          {/* OPCIÓN 4: MÓDULO 3: 300 ORACIONES • PARTES DE AERONAVES */}
          <div className="w-full bg-gradient-to-r from-[#0a192e] to-[#071324] border-2 border-[#79c6ff]/60 hover:border-[#79c6ff] rounded-2xl p-4 sm:p-5 shadow-[0_0_20px_rgba(79,167,255,0.18)] flex flex-col items-center text-center transition-all duration-200">
            <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-wide mb-3 flex items-center justify-center gap-2">
              <Wrench className="w-5 h-5 text-[#79c6ff]" />
              <span>MÓDULO 3: 300 ORACIONES • PARTES DE AERONAVES</span>
            </h3>

            <button
              onClick={() => {
                if (onOpenPlay) {
                  onOpenPlay("MODULE3");
                } else {
                  setActivePlay("MODULE3");
                }
              }}
              className="w-full sm:w-auto min-w-[260px] py-2.5 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-[#0c1e38] text-white border border-[#79c6ff]/40 hover:bg-[#132847] active:scale-95 shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Wrench className="w-4 h-4 text-[#79c6ff]" />
              <span>ENTRAR A MÓDULO 3 (15 PLAYS) ➔</span>
            </button>
          </div>

          {/* OPCIÓN 5: MÓDULO 4: 200 ORACIONES • CESSNA 150/172 & STE */}
          <div className="w-full bg-gradient-to-r from-[#0a192e] to-[#071324] border-2 border-[#79c6ff]/60 hover:border-[#79c6ff] rounded-2xl p-4 sm:p-5 shadow-[0_0_20px_rgba(79,167,255,0.18)] flex flex-col items-center text-center transition-all duration-200">
            <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-wide mb-3 flex items-center justify-center gap-2">
              <Edit3 className="w-5 h-5 text-[#79c6ff]" />
              <span>MÓDULO 4: 200 ORACIONES • CESSNA 150/172 & STE</span>
            </h3>

            <button
              onClick={() => {
                if (onOpenPlay) {
                  onOpenPlay("MODULE4");
                } else {
                  setActivePlay("MODULE4");
                }
              }}
              className="w-full sm:w-auto min-w-[260px] py-2.5 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-[#0c1e38] text-white border border-[#79c6ff]/40 hover:bg-[#132847] active:scale-95 shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4 text-[#79c6ff]" />
              <span>ENTRAR A MÓDULO 4 (10 PLAYS) ➔</span>
            </button>
          </div>

          {/* OPCIÓN 6: MÓDULO 5: 200 ORACIONES • CESSNA 210, TURBO Y SISTEMAS */}
          <div className="w-full bg-gradient-to-r from-[#0a192e] to-[#071324] border-2 border-[#79c6ff]/60 hover:border-[#79c6ff] rounded-2xl p-4 sm:p-5 shadow-[0_0_20px_rgba(79,167,255,0.18)] flex flex-col items-center text-center transition-all duration-200">
            <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-wide mb-3 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-[#79c6ff]" />
              <span>MÓDULO 5: 200 ORACIONES • CESSNA 210, TURBO Y SISTEMAS</span>
            </h3>

            <button
              onClick={() => {
                if (onOpenPlay) {
                  onOpenPlay("MODULE5");
                } else {
                  setActivePlay("MODULE5");
                }
              }}
              className="w-full sm:w-auto min-w-[260px] py-2.5 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-[#0c1e38] text-white border border-[#79c6ff]/40 hover:bg-[#132847] active:scale-95 shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#79c6ff]" />
              <span>ENTRAR A MÓDULO 5 (10 PLAYS) ➔</span>
            </button>
          </div>

          {/* OPCIÓN 7: MÓDULO 6: 200 ORACIONES • TURBOPROP PT6A, NDT, APU Y SISTEMAS */}
          <div className="w-full bg-gradient-to-r from-[#0d1b33] to-[#09152a] border-2 border-[#79c6ff]/70 hover:border-[#79c6ff] rounded-2xl p-4 sm:p-5 shadow-[0_0_25px_rgba(79,167,255,0.25)] flex flex-col items-center text-center transition-all duration-200">
            <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-wide mb-3 flex items-center justify-center gap-2">
              <Compass className="w-5 h-5 text-[#79c6ff]" />
              <span>MÓDULO 6: 200 ORACIONES • TURBOPROP PT6A, NDT, APU Y SISTEMAS</span>
            </h3>

            <button
              onClick={() => {
                if (onOpenPlay) {
                  onOpenPlay("MODULE6");
                } else {
                  setActivePlay("MODULE6");
                }
              }}
              className="w-full sm:w-auto min-w-[260px] py-2.5 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-[#112a4f] to-[#0c1e38] text-white border border-[#79c6ff]/50 hover:border-[#79c6ff] active:scale-95 shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#79c6ff]" />
              <span>ENTRAR A MÓDULO 6 (10 PLAYS) ➔</span>
            </button>
          </div>

          {/* OPCIÓN 8: MÓDULO 7: 200 ORACIONES • REPORTE DE HANGAR (DISCREPANCIAS DE PILOTO) */}
          <div className="w-full bg-gradient-to-r from-[#141e33] to-[#0c1626] border-2 border-amber-500/70 hover:border-amber-400 rounded-2xl p-4 sm:p-5 shadow-[0_0_25px_rgba(245,158,11,0.2)] flex flex-col items-center text-center transition-all duration-200">
            <h3 className="text-base sm:text-lg font-black uppercase text-amber-400 tracking-wide mb-3 flex items-center justify-center gap-2">
              <ClipboardList className="w-5 h-5 text-amber-400" />
              <span>MÓDULO 7: 200 ORACIONES • REPORTE DE HANGAR (DISCREPANCIAS DE PILOTO)</span>
            </h3>

            <button
              onClick={() => {
                if (onOpenPlay) {
                  onOpenPlay("MODULE7");
                } else {
                  setActivePlay("MODULE7");
                }
              }}
              className="w-full sm:w-auto min-w-[260px] py-2.5 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-amber-600 to-amber-700 text-white border border-amber-400/60 hover:bg-amber-500 hover:shadow-lg active:scale-95 shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ClipboardList className="w-4 h-4 text-amber-200" />
              <span>ENTRAR A MÓDULO 7 (10 PLAYS) ➔</span>
            </button>
          </div>

          {/* OPCIÓN 9: MÓDULO 8: 200 ORACIONES • REGLAS ASD-STE100 Y CONSTRUCCIÓN DE ORACIONES */}
          <div className="w-full bg-gradient-to-r from-[#0d223f] via-[#091a33] to-[#071324] border-2 border-[#79c6ff]/80 hover:border-[#79c6ff] rounded-2xl p-4 sm:p-5 shadow-[0_0_30px_rgba(79,167,255,0.3)] flex flex-col items-center text-center transition-all duration-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono font-black uppercase text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                ASD-STE100 ISSUE 8
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-wide mb-3 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-[#79c6ff]" />
              <span>MÓDULO 8: 200 PREGUNTAS • REGLAS Y CONSTRUCCIÓN DE ORACIONES STE</span>
            </h3>

            <button
              onClick={() => {
                if (onOpenPlay) {
                  onOpenPlay("MODULE8");
                } else {
                  setActivePlay("MODULE8");
                }
              }}
              className="w-full sm:w-auto min-w-[260px] py-2.5 px-6 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-[#4fa7ff] via-[#79c6ff] to-[#a6d8ff] text-slate-950 border border-[#79c6ff] hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(79,167,255,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>ENTRAR A MÓDULO 8 (10 PLAYS) ➔</span>
            </button>
          </div>

          {/* OPCIÓN 10: MÓDULO 9: LECTURA TÉCNICA CESSNA 150/172/210 (12 PLAYS) */}
          <div className="w-full bg-gradient-to-r from-[#0a2324] via-[#091e2b] to-[#071520] border-2 border-emerald-400/80 hover:border-emerald-300 rounded-2xl p-4 sm:p-5 shadow-[0_0_30px_rgba(52,211,153,0.25)] flex flex-col items-center text-center transition-all duration-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono font-black uppercase text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                12 PLAYS • AUDIO NORMAL & LENTO • SOLO LECTURA
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-wide mb-3 flex items-center justify-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              <span>MÓDULO 9: LECTURA TÉCNICA CESSNA 150/172/210</span>
            </h3>

            <p className="text-xs text-slate-300 max-w-lg mb-3 leading-relaxed">
              Práctica de lectura técnica en inglés aeronáutico extraída de manuales AMM. Cada play incluye <strong>2 botones de audio (Normal y Lento)</strong>, modo bilingüe, tamaño de texto ajustable y resaltador de verbos STE.
            </p>

            <button
              onClick={() => {
                if (onOpenPlay) {
                  onOpenPlay("MODULE9");
                } else {
                  setActivePlay("MODULE9");
                }
              }}
              className="w-full sm:w-auto min-w-[260px] py-2.5 px-6 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-slate-950 border border-emerald-400 hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(52,211,153,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4 text-slate-950" />
              <span>ENTRAR A MÓDULO 9 (12 PLAYS) ➔</span>
            </button>
          </div>

          {/* OPCIÓN 11: MÓDULO 10: LECTURA TÉCNICA CESSNA 208 TURBOPROP (12 PLAYS) */}
          <div className="w-full bg-gradient-to-r from-[#0d2138] via-[#091b30] to-[#071424] border-2 border-cyan-400/80 hover:border-cyan-300 rounded-2xl p-4 sm:p-5 shadow-[0_0_30px_rgba(34,211,238,0.25)] flex flex-col items-center text-center transition-all duration-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono font-black uppercase text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-500/40">
                12 PLAYS • PT6A TURBOPROP & RTS • AUDIO NORMAL & LENTO
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-wide mb-3 flex items-center justify-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              <span>MÓDULO 10: LECTURA TÉCNICA CESSNA 208 TURBOPROP</span>
            </h3>

            <p className="text-xs text-slate-300 max-w-lg mb-3 leading-relaxed">
              Lecturas avanzadas de turbohélice PT6A, hélice reversible beta, botas de deshielo, NDT corrientes de Eddy, Garmin G1000, CPCP y retorno al servicio (RTS) con audio normal y lento.
            </p>

            <button
              onClick={() => {
                if (onOpenPlay) {
                  onOpenPlay("MODULE10");
                } else {
                  setActivePlay("MODULE10");
                }
              }}
              className="w-full sm:w-auto min-w-[260px] py-2.5 px-6 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 text-slate-950 border border-cyan-400 hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4 text-slate-950" />
              <span>ENTRAR A MÓDULO 10 (12 PLAYS) ➔</span>
            </button>
          </div>

        </div>

        {/* FOOTER MESSAGE */}
        <div className="footer-message bg-[rgba(16,33,58,0.9)] rounded-[18px] px-3.5 py-2.5 border border-[--line] text-center mt-auto w-full max-w-full min-w-0 break-words">
          <span className="text-[8.5px] font-mono tracking-wider text-[--muted] block mb-0.5 uppercase">
            GAME 2: MÓDULOS DE ENTRENAMIENTO AERONÁUTICO
          </span>
          <span className="text-[9.5px] sm:text-[10px] text-amber-400 uppercase font-bold block leading-snug">
            MÓDULOS 1 AL 10: 1,700 ORACIONES TÉCNICAS Y 24 PLAYS DE LECTURA TÉCNICA CESSNA AMM
          </span>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: MÓDULO 1 (200 ORACIONES)
  // ==========================================
  if (activePlay === "MODULE1") {
    return <Game2Module1View onBack={() => setActivePlay("NONE")} />;
  }

  // ==========================================
  // VIEW: MÓDULO 2 (200 ORACIONES NUEVAS)
  // ==========================================
  if (activePlay === "MODULE2") {
    return <Game2Module2View onBack={() => setActivePlay("NONE")} />;
  }

  // ==========================================
  // VIEW: MÓDULO 3 (300 ORACIONES PARTES)
  // ==========================================
  if (activePlay === "MODULE3") {
    return <Game2Module3View onBack={() => setActivePlay("NONE")} />;
  }

  // ==========================================
  // VIEW: MÓDULO 4 (200 ORACIONES CESSNA 150/172 & STE)
  // ==========================================
  if (activePlay === "MODULE4") {
    return <Game2Module4View onBack={() => setActivePlay("NONE")} />;
  }

  // ==========================================
  // VIEW: MÓDULO 5 (200 ORACIONES CESSNA 210, TURBO Y SISTEMAS)
  // ==========================================
  if (activePlay === "MODULE5") {
    return <Game2Module5View onBack={() => setActivePlay("NONE")} />;
  }

  // ==========================================
  // VIEW: MÓDULO 6 (200 ORACIONES PT6A, NDT, APU Y SISTEMAS)
  // ==========================================
  if (activePlay === "MODULE6") {
    return <Game2Module6View onBack={() => setActivePlay("NONE")} />;
  }

  // ==========================================
  // VIEW: MÓDULO 7 (200 ORACIONES REPORTE DE HANGAR)
  // ==========================================
  if (activePlay === "MODULE7") {
    return <Game2Module7View onBack={() => setActivePlay("NONE")} />;
  }

  // ==========================================
  // VIEW: MÓDULO 8 (200 ORACIONES Y REGLAS STE)
  // ==========================================
  if (activePlay === "MODULE8") {
    return <Game2Module8View onBack={() => setActivePlay("NONE")} />;
  }

  // ==========================================
  // VIEW: MÓDULO 9 (12 PLAYS LECTURA TÉCNICA CESSNA 150/172/210)
  // ==========================================
  if (activePlay === "MODULE9") {
    return <Game2Module9View onBack={() => setActivePlay("NONE")} />;
  }

  // ==========================================
  // VIEW: MÓDULO 10 (12 PLAYS LECTURA TÉCNICA CESSNA 208 TURBOPROP)
  // ==========================================
  if (activePlay === "MODULE10") {
    return <Game2Module10View onBack={() => setActivePlay("NONE")} />;
  }

  // ==========================================
  // VIEW: DIXIE (TECHNICAL DICTIONARY & FLASHCARDS)
  // ==========================================
  if (activePlay === "DIXIE") {
    return <DixieDictionary onBack={() => setActivePlay("NONE")} />;
  }

  return null;
};

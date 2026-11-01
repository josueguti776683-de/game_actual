import React from "react";
import { MODULE_6_PLAYS } from "../data/game2Module6Data";
import { Game2Module45GenericView } from "./Game2Module45GenericView";

export const Game2Module6View: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  return (
    <Game2Module45GenericView
      moduleNumber={6}
      moduleTitle="MÓDULO 6: 200 ORACIONES • TURBOPROP PT6A, NDT, APU, CVR Y SISTEMAS ESPECIALES"
      moduleSubtitle="10 Plays con 20 oraciones técnicas cada uno (200 en total). Cubre turbopropulsor PT6A (Cessna 208 Caravan), hélice reversible en rango beta, extinción de incendios HRD, ciclo de aire ACM, radar meteorológico y transpondedor TCAS/ADS-B, ensayos no destructivos (NDT), aire de sangrado, equipo de emergencia ELT 406 MHz, planta auxiliar APU y datos de aire RVSM bajo estándar ASD-STE100."
      storageKey="GAME2_MOD6_PROGRESS"
      plays={MODULE_6_PLAYS}
      onBack={onBack}
    />
  );
};

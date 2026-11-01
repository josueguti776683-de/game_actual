import React from "react";
import { MODULE_5_PLAYS } from "../data/game2Module5Data";
import { Game2Module45GenericView } from "./Game2Module45GenericView";

export const Game2Module5View: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  return (
    <Game2Module45GenericView
      moduleNumber={5}
      moduleTitle="MÓDULO 5: 200 ORACIONES • CESSNA 210, MOTORES TURBO Y SISTEMAS AVANZADOS"
      moduleSubtitle="10 Plays con 20 oraciones técnicas cada uno (200 en total). Cubre tren retráctil electrohidráulico, turboalimentador Continental TSIO-520, hélice McCauley de velocidad constante, presurización, oxígeno y aviónica avanzada bajo estándar ASD-STE100."
      storageKey="GAME2_MOD5_PROGRESS"
      plays={MODULE_5_PLAYS}
      onBack={onBack}
    />
  );
};

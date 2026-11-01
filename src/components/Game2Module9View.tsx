import React from "react";
import { MODULE_9_PLAYS } from "../data/game2Module9Data";
import { Game2ReadingModuleView } from "./Game2ReadingModuleView";

export const Game2Module9View: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  return (
    <Game2ReadingModuleView
      moduleNumber={9}
      moduleTitle="MÓDULO 9: LECTURA TÉCNICA AMM CESSNA 150/172/210 (12 PLAYS)"
      moduleSubtitle="Práctica de lectura técnica con audio normal y lento. Textos auténticos de manuales AMM Cessna (ATA 71, 73, 32, 27, 34, 72, 61, 74, 81, 28, 21)."
      storageKey="GAME2_MOD9_READING_PROGRESS"
      plays={MODULE_9_PLAYS}
      onBack={onBack}
    />
  );
};

import React from "react";
import { MODULE_10_PLAYS } from "../data/game2Module10Data";
import { Game2ReadingModuleView } from "./Game2ReadingModuleView";

export const Game2Module10View: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  return (
    <Game2ReadingModuleView
      moduleNumber={10}
      moduleTitle="MÓDULO 10: LECTURA TÉCNICA AMM CESSNA 208 TURBOPROP (12 PLAYS)"
      moduleSubtitle="Práctica de lectura técnica avanzada con audio normal y lento. PT6A Turboprop, Anillo Beta, Botas de Deshielo, NDT Corrientes de Eddy, Bahía de Aviónica G1000, CPCP y Retorno al Servicio."
      storageKey="GAME2_MOD10_READING_PROGRESS"
      plays={MODULE_10_PLAYS}
      onBack={onBack}
    />
  );
};

import React from "react";
import { MODULE_4_PLAYS } from "../data/game2Module4Data";
import { Game2Module45GenericView } from "./Game2Module45GenericView";

export const Game2Module4View: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  return (
    <Game2Module45GenericView
      moduleNumber={4}
      moduleTitle="MÓDULO 4: 200 ORACIONES • CESSNA 150/172 & STE (ATA)"
      moduleSubtitle="10 Plays con 20 oraciones técnicas cada uno (200 en total). Flujo pedagógico: visualiza la oración en inglés, estudia las traducciones del verbo y núcleo, y escribe la traducción en español en el cuadro de texto. La oración se mantiene activa hasta escribirla correctamente."
      storageKey="GAME2_MOD4_PROGRESS"
      plays={MODULE_4_PLAYS}
      onBack={onBack}
    />
  );
};

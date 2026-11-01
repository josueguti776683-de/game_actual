export interface DixieConjugation {
  base: string;
  thirdPerson?: string;
  past?: string;
  participle?: string;
  derived?: string;
}

export interface DixieWordItem {
  id: string;
  word: string;
  ipa: string;
  spanish: string;
  partOfSpeech: "VERB" | "NOUN" | "ADJECTIVE" | "ADVERB" | "PREPOSITION" | "CONJUNCTION";
  category: "MAINTENANCE" | "ENGINE" | "AIRFRAME" | "HYDRAULIC" | "AVIONICS" | "SAFETY" | "MATERIALS";
  definitionSTE: string;
  usageRule: string;
  exampleEnglish: string;
  exampleSpanish: string;
  conjugations: DixieConjugation;
  unapprovedAlternatives?: string;
}

export const DIXIE_CATEGORIES: Record<string, { label: string; icon: string; desc: string }> = {
  ALL: { label: "Todas las Categorías", icon: "🌐", desc: "Catálogo técnico completo" },
  MAINTENANCE: { label: "Mantenimiento y Procedimientos", icon: "🛠️", desc: "Verbos y tareas AMM / STE" },
  ENGINE: { label: "Motor y Propulsión", icon: "🔥", desc: "Turbinas, compresor, empuje" },
  AIRFRAME: { label: "Estructura y Superficies", icon: "✈️", desc: "Fuselaje, alas, empenaje, mandos" },
  HYDRAULIC: { label: "Hidráulica y Neumática", icon: "💧", desc: "Tuberías, actuadores, presión" },
  AVIONICS: { label: "Aviónica y Eléctrico", icon: "⚡", desc: "Instrumentos, radar, barras eléctricas" },
  SAFETY: { label: "Seguridad y Precauciones", icon: "⚠️", desc: "Warnings, cautions, protección" },
  MATERIALS: { label: "Materiales y Consumibles", icon: "🧪", desc: "Sellantes, aceites, aleaciones" },
};

export const DIXIE_PARTS_OF_SPEECH: Record<string, string> = {
  ALL: "Todas las Categorías Gramaticales",
  VERB: "Verbos (v)",
  NOUN: "Sustantivos / Nombres Técnicos (n)",
  ADJECTIVE: "Adjetivos (adj)",
  ADVERB: "Adverbios (adv)",
  PREPOSITION: "Preposiciones (prep)",
  CONJUNCTION: "Conjunciones (conj)",
};

export const DIXIE_DICTIONARY_DATA: DixieWordItem[] = [
  // ================= A =================
  {
    id: "absorb",
    word: "ABSORB",
    ipa: "/əbˈzɔːrb/",
    spanish: "Absorber / Amortiguar",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "1. Tomar o retener un líquido. 2. Disminuir el efecto de una fuerza o impacto.",
    usageRule: "Regla 1.2 / 5.3: Usar en imperativo en procedimientos de limpieza o choque mecánico.",
    exampleEnglish: "ABSORB THE FLUID WITH A CLEAN CLOTH.",
    exampleSpanish: "Absorba el fluido con un paño limpio.",
    conjugations: {
      base: "ABSORB (Absorber)",
      thirdPerson: "ABSORBS (Absorbe)",
      past: "ABSORBED (Absorbió)",
      participle: "ABSORBED (Absorbido - Adjetivo)",
      derived: "ABSORPTION (Absorción)"
    },
    unapprovedAlternatives: "Reemplaza a: soak up, take in"
  },
  {
    id: "access",
    word: "ACCESS",
    ipa: "/ˈæk.ses/",
    spanish: "Acceso / Vía de entrada",
    partOfSpeech: "NOUN",
    category: "AIRFRAME",
    definitionSTE: "La capacidad física o abertura para entrar o acercarse a una zona de la aeronave.",
    usageRule: "Regla 1.2: Aprobado solo como sustantivo. Escriba 'GET ACCESS TO', nunca 'access the unit' como verbo.",
    exampleEnglish: "GET ACCESS TO THE ACCUMULATOR FOR THE NO. 1 HYDRAULIC SYSTEM.",
    exampleSpanish: "Tenga acceso al acumulador para el sistema hidráulico número 1.",
    conjugations: {
      base: "ACCESS (Acceso)",
      derived: "ACCESS PANEL (Panel de acceso)"
    },
    unapprovedAlternatives: "Reemplaza al verbo no aprobado 'access' -> usar 'GET ACCESS TO'"
  },
  {
    id: "accident",
    word: "ACCIDENT",
    ipa: "/ˈæk.sɪ.dənt/",
    spanish: "Accidente / Siniestro",
    partOfSpeech: "NOUN",
    category: "SAFETY",
    definitionSTE: "Un suceso imprevisto que ocasiona lesiones al personal o daños a la estructura/equipo.",
    usageRule: "Regla 7.1: Término de seguridad crítica. Debe usarse para identificar consecuencias en advertencias.",
    exampleEnglish: "MAKE SURE THAT THE PINS ARE INSTALLED TO PREVENT ACCIDENTS.",
    exampleSpanish: "Asegúrese de que los pines estén instalados para prevenir accidentes.",
    conjugations: {
      base: "ACCIDENT (Accidente)",
      derived: "ACCIDENTAL (Accidental) / ACCIDENTALLY (Accidentalmente)"
    }
  },
  {
    id: "adjust",
    word: "ADJUST",
    ipa: "/əˈdʒʌst/",
    spanish: "Ajustar / Calibrar posición",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Colocar o llevar un componente a una posición o valor específico prescrito.",
    usageRule: "Regla 5.3: Usar siempre en imperativo en pasos de mantenimiento. No usar 'regulate' ni 'trim'.",
    exampleEnglish: "ADJUST THE FREQUENCY TO THE VALUE GIVEN IN TABLE 1.",
    exampleSpanish: "Ajuste la frecuencia al valor indicado en la tabla 1.",
    conjugations: {
      base: "ADJUST (Ajustar)",
      thirdPerson: "ADJUSTS (Ajusta)",
      past: "ADJUSTED (Ajustó)",
      participle: "ADJUSTED (Ajustado - Adjetivo)",
      derived: "ADJUSTMENT (Ajuste) / ADJUSTABLE (Ajustable)"
    },
    unapprovedAlternatives: "Reemplaza a: regulate, trim, calibrate (cuando es ajuste mecánico)"
  },
  {
    id: "aft",
    word: "AFT",
    ipa: "/æft/",
    spanish: "Trasero / Hacia popa (aeronave)",
    partOfSpeech: "ADJECTIVE",
    category: "AIRFRAME",
    definitionSTE: "Más cercano a la parte trasera o empenaje de una aeronave o vehículo.",
    usageRule: "Regla 1.2: Usar 'AFT' como adjetivo/adverbio y 'AFT OF' como preposición. No usar 'back of' ni 'rear of'.",
    exampleEnglish: "THE PUMP IS IN THE AFT CELL OF THE FUSELAGE TANK.",
    exampleSpanish: "La bomba se encuentra en la celda trasera del tanque del fuselaje.",
    conjugations: {
      base: "AFT (Trasero / Hacia atrás)",
      derived: "AFT OF (Detrás de / Hacia popa de)"
    },
    unapprovedAlternatives: "Reemplaza a: rear of, back of, backwards"
  },
  {
    id: "aileron",
    word: "AILERON",
    ipa: "/ˈeɪ.lə.rɑːn/",
    spanish: "Alerón",
    partOfSpeech: "NOUN",
    category: "AIRFRAME",
    definitionSTE: "Superficie de control de vuelo primaria ubicada en el borde de salida del ala que controla el alabeo (roll).",
    usageRule: "Regla 1.5 (Categoría 6): Nombre técnico oficial de mandos de vuelo primarios.",
    exampleEnglish: "MOVE THE CONTROL WHEEL TO OPERATE THE AILERONS.",
    exampleSpanish: "Mueva el volante de control para operar los alerones.",
    conjugations: {
      base: "AILERON (Alerón)",
      derived: "AILERONS (Alerones - Plural)"
    }
  },
  {
    id: "airflow",
    word: "AIRFLOW",
    ipa: "/ˈer.floʊ/",
    spanish: "Flujo de aire / Ventilación",
    partOfSpeech: "NOUN",
    category: "ENGINE",
    definitionSTE: "Corriente o volumen continuo de aire en movimiento a través de un conducto o motor.",
    usageRule: "Regla 1.2: Aprobado como sustantivo. No use 'draft' ni el verbo 'ventilate'; use 'AIRFLOW'.",
    exampleEnglish: "MAKE SURE THAT THERE IS SUFFICIENT AIRFLOW IN THE WORK AREA.",
    exampleSpanish: "Asegúrese de que haya suficiente flujo de aire en el área de trabajo.",
    conjugations: {
      base: "AIRFLOW (Flujo de aire)"
    },
    unapprovedAlternatives: "Reemplaza a: ventilation, draft, breeze"
  },
  {
    id: "altimeter",
    word: "ALTIMETER",
    ipa: "/ælˈtɪm.ə.t̬ɚ/",
    spanish: "Altímetro",
    partOfSpeech: "NOUN",
    category: "AVIONICS",
    definitionSTE: "Instrumento barométrico o de radio que mide y muestra la altitud de la aeronave.",
    usageRule: "Regla 1.5 (Categoría 7/15): Nombre técnico oficial de instrumentación de vuelo.",
    exampleEnglish: "SET THE ALTIMETER SCALE TO 1013 MBAR.",
    exampleSpanish: "Ajuste la escala del altímetro a 1013 mbar.",
    conjugations: {
      base: "ALTIMETER (Altímetro)",
      derived: "ALTIMETERS (Altímetros - Plural)"
    }
  },
  {
    id: "apply",
    word: "APPLY",
    ipa: "/əˈplaɪ/",
    spanish: "Aplicar / Untar / Ejercer fuerza",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Poner o esparcir una sustancia sobre una superficie, o ejercer una fuerza o carga.",
    usageRule: "Regla 1.3: Significado estricto STE. Prohibido usar 'put on' o 'spread' cuando se aplica sellante o fuerza.",
    exampleEnglish: "APPLY A THIN LAYER OF SEALANT ON THE FLANGE.",
    exampleSpanish: "Aplique una capa delgada de sellante en la brida.",
    conjugations: {
      base: "APPLY (Aplicar)",
      thirdPerson: "APPLIES (Aplica)",
      past: "APPLIED (Aplicó)",
      participle: "APPLIED (Aplicado - Adjetivo)",
      derived: "APPLICATION (Aplicación)"
    },
    unapprovedAlternatives: "Reemplaza a: spread, smear, exert, put on (para sustancias)"
  },
  {
    id: "assemble",
    word: "ASSEMBLE",
    ipa: "/əˈsem.bəl/",
    spanish: "Ensamblar / Montar partes",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Unir, fijar o conectar los componentes de un conjunto para formar una unidad.",
    usageRule: "Regla 1.2: Usar 'ASSEMBLE'. Prohibido usar 'build', 'construct' o 'put together' en mantenimiento.",
    exampleEnglish: "ASSEMBLE THE VALVE AS FOLLOWS:",
    exampleSpanish: "Ensamble la válvula de la siguiente manera:",
    conjugations: {
      base: "ASSEMBLE (Ensamblar)",
      thirdPerson: "ASSEMBLES (Ensambla)",
      past: "ASSEMBLED (Ensambló)",
      participle: "ASSEMBLED (Ensamblado - Adjetivo)",
      derived: "ASSEMBLY (Conjunto / Ensamble)"
    },
    unapprovedAlternatives: "Reemplaza a: build, construct, erect, fit together"
  },
  {
    id: "attach",
    word: "ATTACH",
    ipa: "/əˈtætʃ/",
    spanish: "Fijar / Unir / Sujetar",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Hacer que dos o más elementos permanezcan unidos físicamente mediante fijaciones o herrajes.",
    usageRule: "Regla 1.2 / 5.3: Verbo técnico estándar. Reemplaza a 'fasten', 'secure', 'mount' y 'tie'.",
    exampleEnglish: "ATTACH THE BRACKET TO THE BULKHEAD WITH THE FOUR BOLTS.",
    exampleSpanish: "Fije el soporte al mamparo con los cuatro pernos.",
    conjugations: {
      base: "ATTACH (Fijar / Sujetar)",
      thirdPerson: "ATTACHES (Fija)",
      past: "ATTACHED (Fijó)",
      participle: "ATTACHED (Fijado - Adjetivo)",
      derived: "ATTACHMENT (Fijación / Sujeción)"
    },
    unapprovedAlternatives: "Reemplaza a: fasten, fix, secure, mount, bind, couple"
  },

  // ================= B =================
  {
    id: "bleed",
    word: "BLEED",
    ipa: "/bliːd/",
    spanish: "Purgar (aire / gas)",
    partOfSpeech: "VERB",
    category: "HYDRAULIC",
    definitionSTE: "Extraer aire atrapado o gas fuera de un sistema de fluido presurizado.",
    usageRule: "Regla 1.3: Significado único técnico. Nunca usar para sangrado médico en manuales aeronáuticos.",
    exampleEnglish: "BLEED THE SPEEDBRAKE HYDRAULIC SYSTEM.",
    exampleSpanish: "Purgue el sistema hidráulico de los frenos de velocidad.",
    conjugations: {
      base: "BLEED (Purgar)",
      thirdPerson: "BLEEDS (Purga)",
      past: "BLED (Purgó)",
      participle: "BLED (Purgado - Adjetivo)",
      derived: "BLEEDING (Purga)"
    },
    unapprovedAlternatives: "Reemplaza a: deaerate, vent air, expel bubbles"
  },
  {
    id: "blockage",
    word: "BLOCKAGE",
    ipa: "/ˈblɑː.kɪdʒ/",
    spanish: "Obstrucción / Bloqueo",
    partOfSpeech: "NOUN",
    category: "HYDRAULIC",
    definitionSTE: "Elemento u objeto que impide el libre flujo o la correcta operación en una línea o ducto.",
    usageRule: "Regla 1.2: Usar el sustantivo 'BLOCKAGE'. Para el verbo, usar 'CAUSE A BLOCKAGE', no 'block'.",
    exampleEnglish: "MAKE SURE THAT THERE IS NO BLOCKAGE IN THE PITOT PIPE.",
    exampleSpanish: "Asegúrese de que no haya ninguna obstrucción en el tubo pitot.",
    conjugations: {
      base: "BLOCKAGE (Obstrucción)",
      derived: "BLOCKED (Bloqueado / Obstruido - Adjetivo)"
    },
    unapprovedAlternatives: "Reemplaza a: obstruction, clog, choking"
  },
  {
    id: "bolt",
    word: "BOLT",
    ipa: "/boʊlt/",
    spanish: "Perno / Tornillo estructural",
    partOfSpeech: "NOUN",
    category: "MAINTENANCE",
    definitionSTE: "Fijación roscada que se utiliza conjuntamente con una tuerca para unir componentes.",
    usageRule: "Regla 1.7: Prohibido usar 'bolt' como verbo. Escriba 'ATTACH WITH BOLTS'.",
    exampleEnglish: "REMOVE THE FOUR BOLTS THAT ATTACH THE COVER TO THE HOUSING.",
    exampleSpanish: "Remueva los cuatro pernos que fijan la cubierta a la carcasa.",
    conjugations: {
      base: "BOLT (Perno)",
      derived: "BOLTS (Pernos - Plural)"
    },
    unapprovedAlternatives: "Evite el verbo no aprobado 'bolt' -> usar 'ATTACH WITH BOLTS'"
  },
  {
    id: "bond",
    word: "BOND",
    ipa: "/bɑːnd/",
    spanish: "Adherir / Masa eléctrica (bonding)",
    partOfSpeech: "VERB",
    category: "MATERIALS",
    definitionSTE: "1. Unir firmemente dos materiales. 2. Realizar una conexión eléctrica de continuidad estructural.",
    usageRule: "Regla 1.2: Puede usarse como verbo o sustantivo con los dos significados aprobados en STE.",
    exampleEnglish: "THE STATIC DISCHARGER IS ELECTRICALLY BONDED TO THE FRAME.",
    exampleSpanish: "El descargador estático está eléctricamente conectado a masa con el marco.",
    conjugations: {
      base: "BOND (Adherir / Conectar masa)",
      thirdPerson: "BONDS (Adhiere)",
      past: "BONDED (Adhirió)",
      participle: "BONDED (Adherido / Puesto a masa - Adjetivo)",
      derived: "BONDING (Conexión de masa / Pegado)"
    },
    unapprovedAlternatives: "Reemplaza a: glue, adhere, stick"
  },
  {
    id: "bulkhead",
    word: "BULKHEAD",
    ipa: "/ˈbʌlk.hed/",
    spanish: "Mamparo estructural / Pared divisoria",
    partOfSpeech: "NOUN",
    category: "AIRFRAME",
    definitionSTE: "Pared divisoria transversal o de contención estructural y de presurización en el fuselaje.",
    usageRule: "Regla 1.5 (Categoría 2/6): Nombre técnico oficial en manuales de mantenimiento (AMM).",
    exampleEnglish: "THE PRESSURE REGULATOR IS INSTALLED FORWARD OF THE PRESSURE BULKHEAD.",
    exampleSpanish: "El regulador de presión está instalado delante del mamparo de presión.",
    conjugations: {
      base: "BULKHEAD (Mamparo)",
      derived: "BULKHEADS (Mamparos - Plural)"
    }
  },

  // ================= C =================
  {
    id: "calculate",
    word: "CALCULATE",
    ipa: "/ˈkæl.kjə.leɪt/",
    spanish: "Calcular / Determinar valor numérico",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Obtener un resultado numérico o dimensión mediante fórmulas matemáticas.",
    usageRule: "Regla 1.2: Verbo aprobado. Reemplaza a 'compute', 'determine' (con números) y 'assess'.",
    exampleEnglish: "CALCULATE THE PRESSURE WITH THE APPLICABLE FORMULA.",
    exampleSpanish: "Calcule la presión con la fórmula correspondiente.",
    conjugations: {
      base: "CALCULATE (Calcular)",
      thirdPerson: "CALCULATES (Calcula)",
      past: "CALCULATED (Calculó)",
      participle: "CALCULATED (Calculado - Adjetivo)",
      derived: "CALCULATION (Cálculo)"
    },
    unapprovedAlternatives: "Reemplaza a: compute, assess, figure out, determine"
  },
  {
    id: "calibrate",
    word: "CALIBRATE",
    ipa: "/ˈkæl.ə.breɪt/",
    spanish: "Calibrar / Graduar instrumento",
    partOfSpeech: "VERB",
    category: "AVIONICS",
    definitionSTE: "Medir y ajustar con precisión la escala o lectura de un instrumento frente a un patrón.",
    usageRule: "Regla 1.2: Usar solo para instrumentos y medidores. Para ajustes mecánicos usar 'ADJUST'.",
    exampleEnglish: "CALIBRATE THE THERMOMETER TO THE CELSIUS SCALE.",
    exampleSpanish: "Calibre el termómetro en la escala Celsius.",
    conjugations: {
      base: "CALIBRATE (Calibrar)",
      thirdPerson: "CALIBRATES (Calibra)",
      past: "CALIBRATED (Calibró)",
      participle: "CALIBRATED (Calibrado - Adjetivo)",
      derived: "CALIBRATION (Calibración)"
    }
  },
  {
    id: "caution",
    word: "CAUTION",
    ipa: "/ˈkɔː.ʃən/",
    spanish: "Precaución (Alerta de daño a equipo)",
    partOfSpeech: "NOUN",
    category: "SAFETY",
    definitionSTE: "Instrucción de seguridad para prevenir daños a máquinas, herramientas o componentes.",
    usageRule: "Regla 7.1: Debe reservarse para riesgo a OBJETOS y EQUIPOS (si hay riesgo a personas es WARNING).",
    exampleEnglish: "CAUTION: DO NOT USE BLEACH OR CLEANSERS THAT CONTAIN CHLORINE.",
    exampleSpanish: "PRECAUCIÓN: NO USE BLANQUEADORES NI LIMPIADORES QUE CONTENGAN CLORO.",
    conjugations: {
      base: "CAUTION (Precaución)",
      derived: "CAUTIONARY (De precaución)"
    },
    unapprovedAlternatives: "Nunca use 'caution' como verbo; use 'TELL NOT TO' o la cabecera 'CAUTION:'."
  },
  {
    id: "clean",
    word: "CLEAN",
    ipa: "/kliːn/",
    spanish: "Limpiar / Limpio",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Remover suciedad o material no deseado de una superficie o componente.",
    usageRule: "Regla 1.2 / 1.3: Aprobado como verbo y adjetivo. Reemplaza a 'wash', 'purify', 'sanitize' y 'wipe'.",
    exampleEnglish: "CLEAN THE GASKET CONTACT SURFACE WITH AN APPROVED SOLVENT.",
    exampleSpanish: "Limpie la superficie de contacto de la junta con un solvente aprobado.",
    conjugations: {
      base: "CLEAN (Limpiar)",
      thirdPerson: "CLEANS (Limpia)",
      past: "CLEANED (Limpió)",
      participle: "CLEANED (Limpiado / Limpio - Adjetivo)",
      derived: "CLEANER (Limpiador)"
    },
    unapprovedAlternatives: "Reemplaza a: wash, wipe, purify, scrub, sanitize"
  },
  {
    id: "clearance",
    word: "CLEARANCE",
    ipa: "/ˈklɪr.əns/",
    spanish: "Holgura / Luz de separación",
    partOfSpeech: "NOUN",
    category: "MAINTENANCE",
    definitionSTE: "Espacio o distancia libre reglamentaria entre dos objetos móviles para evitar roce.",
    usageRule: "Regla 2.1: Nombre técnico fundamental. No usar 'gap', 'play' o 'margin' para huelgos de diseño.",
    exampleEnglish: "MAKE SURE THAT THERE IS CLEARANCE BETWEEN THE LEVER AND THE ROLLER.",
    exampleSpanish: "Asegúrese de que haya holgura entre la palanca y el rodillo.",
    conjugations: {
      base: "CLEARANCE (Holgura)",
      derived: "CLEAR (Despejado / Sin obstrucción - Adjetivo)"
    },
    unapprovedAlternatives: "Reemplaza a: gap, play (cuando es espacio libre), spacing"
  },
  {
    id: "close",
    word: "CLOSE",
    ipa: "/kloʊz/",
    spanish: "Cerrar / Cerrado",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "1. Mover una compuerta/válvula a posición cerrada. 2. Enclavar un disyuntor (circuit breaker).",
    usageRule: "Regla 3.2 / 5.3: En procedimental usar 'CLOSE'. Para disyuntores eléctricos significa energizar.",
    exampleEnglish: "CLOSE THE CIRCUIT BREAKER AND MAKE SURE THAT THE BUSBAR ENERGIZES.",
    exampleSpanish: "Cierre el disyuntor y asegúrese de que la barra se energice.",
    conjugations: {
      base: "CLOSE (Cerrar)",
      thirdPerson: "CLOSES (Cierra)",
      past: "CLOSED (Cerró)",
      participle: "CLOSED (Cerrado - Adjetivo)",
      derived: "CLOSURE (Cierre)"
    },
    unapprovedAlternatives: "Reemplaza a: shut, collapse, latch, engage (un disyuntor)"
  },
  {
    id: "cockpit",
    word: "COCKPIT",
    ipa: "/ˈkɑːk.pɪt/",
    spanish: "Cabina de pilotaje / Cabina de mando",
    partOfSpeech: "NOUN",
    category: "AIRFRAME",
    definitionSTE: "Compartimento delantero de la aeronave donde los pilotos operan los controles de vuelo.",
    usageRule: "Regla 1.5 (Categoría 2): Nombre técnico oficial de ubicación en la aeronave.",
    exampleEnglish: "YOU CAN HEAR THE WARNING SIGNAL IN THE COCKPIT.",
    exampleSpanish: "Se puede escuchar la señal de advertencia en la cabina de mando.",
    conjugations: {
      base: "COCKPIT (Cabina de mando)"
    }
  },
  {
    id: "compress",
    word: "COMPRESS",
    ipa: "/kəmˈpres/",
    spanish: "Comprimir",
    partOfSpeech: "VERB",
    category: "ENGINE",
    definitionSTE: "Disminuir el volumen o longitud de un material, resorte o gas por aplicación de fuerza.",
    usageRule: "Regla 1.3: Usar para resortes mecánicos o compresión de gases en turbinas.",
    exampleEnglish: "COMPRESS THE SPRING AND CAREFULLY INSTALL THE COVER.",
    exampleSpanish: "Comprima el resorte e instale cuidadosamente la cubierta.",
    conjugations: {
      base: "COMPRESS (Comprimir)",
      thirdPerson: "COMPRESSES (Comprime)",
      past: "COMPRESSED (Comprimió)",
      participle: "COMPRESSED (Comprimido - Adjetivo)",
      derived: "COMPRESSION (Compresión) / COMPRESSOR (Compresor)"
    }
  },
  {
    id: "contamination",
    word: "CONTAMINATION",
    ipa: "/kənˌtæm.əˈneɪ.ʃən/",
    spanish: "Contaminación / Suciedad extraña",
    partOfSpeech: "NOUN",
    category: "MATERIALS",
    definitionSTE: "Presencia no deseada de agentes químicos, sólidos extraños o agua en fluidos o sistemas.",
    usageRule: "Regla 1.2: Sustantivo aprobado. No usar 'impurity' ni 'foreign matter'; use 'CONTAMINATION'.",
    exampleEnglish: "REMOVE ALL CONTAMINATION FROM THE FUEL TANKS.",
    exampleSpanish: "Remueva toda la contaminación de los tanques de combustible.",
    conjugations: {
      base: "CONTAMINATION (Contaminación)",
      derived: "CONTAMINATED (Contaminado / Sucio - Adjetivo)"
    },
    unapprovedAlternatives: "Reemplaza a: pollution, impurities, debris, dirt"
  },
  {
    id: "cowling",
    word: "COWLING",
    ipa: "/ˈkaʊ.lɪŋ/",
    spanish: "Capó del motor / Carenado de planta motriz",
    partOfSpeech: "NOUN",
    category: "ENGINE",
    definitionSTE: "Cubierta removible o abatible que rodea el motor para protección y perfil aerodinámico.",
    usageRule: "Regla 1.5 (Categoría 1/6): Nombre técnico oficial de estructura de motor.",
    exampleEnglish: "OPEN THE ENGINE COWLING TO GET ACCESS TO THE OIL FILTER.",
    exampleSpanish: "Abra el capó del motor para tener acceso al filtro de aceite.",
    conjugations: {
      base: "COWLING (Capó de motor)",
      derived: "COWLINGS (Capós - Plural)"
    }
  },

  // ================= D =================
  {
    id: "damage",
    word: "DAMAGE",
    ipa: "/ˈdæm.ɪdʒ/",
    spanish: "Daño / Deterioro",
    partOfSpeech: "NOUN",
    category: "MAINTENANCE",
    definitionSTE: "Cambio no deseado en la condición física de una pieza respecto a su estado original.",
    usageRule: "Regla 1.2 / 1.7: Aprobado solo como sustantivo. Prohibido usar 'damage' como verbo; escriba 'CAUSE DAMAGE TO'.",
    exampleEnglish: "BE CAREFUL NOT TO CAUSE DAMAGE TO THE FLANGE ASSEMBLY.",
    exampleSpanish: "Tenga cuidado de no causar daños al conjunto de la brida.",
    conjugations: {
      base: "DAMAGE (Daño)",
      derived: "DAMAGED (Dañado - Adjetivo)"
    },
    unapprovedAlternatives: "Evite el verbo 'damage' -> use 'CAUSE DAMAGE TO'"
  },
  {
    id: "de-energize",
    word: "DE-ENERGIZE",
    ipa: "/diːˈen.ɚ.dʒaɪz/",
    spanish: "Desenergizar / Cortar alimentación eléctrica",
    partOfSpeech: "VERB",
    category: "AVIONICS",
    definitionSTE: "Remover o cortar la alimentación de energía eléctrica de un componente o circuito.",
    usageRule: "Regla 8.2 / 1.14: Escribir con guion (de-energize). Siempre en voz activa imperativa.",
    exampleEnglish: "DE-ENERGIZE THE AC AND DC BUSBARS BEFORE YOU START THE REPAIR.",
    exampleSpanish: "Desenergice las barras de CA y CC antes de iniciar la reparación.",
    conjugations: {
      base: "DE-ENERGIZE (Desenergizar)",
      thirdPerson: "DE-ENERGIZES (Desenergiza)",
      past: "DE-ENERGIZED (Desenergizó)",
      participle: "DE-ENERGIZED (Desenergizado - Adjetivo)"
    },
    unapprovedAlternatives: "Reemplaza a: power down, cut power, switch off"
  },
  {
    id: "decrease",
    word: "DECREASE",
    ipa: "/dɪˈkriːs/",
    spanish: "Disminuir / Reducir",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Hacer o volverse menor en tamaño, cantidad, presión, volumen o valor numérico.",
    usageRule: "Regla 1.2: Verbo aprobado. Reemplaza a 'reduce', 'diminish', 'drop', 'lower' (de valores) y 'lessen'.",
    exampleEnglish: "DECREASE THE SYSTEM PRESSURE UNTIL THE GAUGE SHOWS ZERO.",
    exampleSpanish: "Disminuya la presión del sistema hasta que el manómetro marque cero.",
    conjugations: {
      base: "DECREASE (Disminuir)",
      thirdPerson: "DECREASES (Disminuye)",
      past: "DECREASED (Disminuyó)",
      participle: "DECREASED (Disminuido - Adjetivo)"
    },
    unapprovedAlternatives: "Reemplaza a: reduce, lessen, diminish, lower, drop"
  },
  {
    id: "defective",
    word: "DEFECTIVE",
    ipa: "/dɪˈfek.tɪv/",
    spanish: "Defectuoso / Averiado",
    partOfSpeech: "ADJECTIVE",
    category: "MAINTENANCE",
    definitionSTE: "Que no está en condiciones de operar o que no cumple con las especificaciones del manual.",
    usageRule: "Regla 1.4: Adjetivo aprobado. Reemplaza a 'faulty', 'bad', 'broken' y 'malfunctioning'.",
    exampleEnglish: "REPLACE THE DEFECTIVE BOOSTER PUMP IMMEDIATELY.",
    exampleSpanish: "Reemplace la bomba de refuerzo defectuosa inmediatamente.",
    conjugations: {
      base: "DEFECTIVE (Defectuoso)",
      derived: "DEFECT (Defecto - Sustantivo)"
    },
    unapprovedAlternatives: "Reemplaza a: faulty, bad, malfunctioning, broken"
  },
  {
    id: "deflate",
    word: "DEFLATE",
    ipa: "/dɪˈfleɪt/",
    spanish: "Desinflar",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Hacer o volverse más pequeño por despresurización o escape controlado de gas.",
    usageRule: "Regla 5.3: Utilizado en tren de aterrizaje y neumáticos antes del desmontaje.",
    exampleEnglish: "DEFLATE THE TIRE TO A PRESSURE OF 2 BAR (29 PSI).",
    exampleSpanish: "Desinfle el neumático a una presión de 2 bar (29 psi).",
    conjugations: {
      base: "DEFLATE (Desinflar)",
      thirdPerson: "DEFLATES (Desinfla)",
      past: "DEFLATED (Desinfló)",
      participle: "DEFLATED (Desinflado - Adjetivo)"
    }
  },
  {
    id: "deploy",
    word: "DEPLOY",
    ipa: "/dɪˈplɔɪ/",
    spanish: "Desplegar / Extender operacionalmente",
    partOfSpeech: "VERB",
    category: "AIRFRAME",
    definitionSTE: "Mover un componente desde su posición de reposo hacia su posición de funcionamiento.",
    usageRule: "Regla 1.3: Usar para reversas, toboganes de escape o slats.",
    exampleEnglish: "KEEP PERSONNEL AWAY FROM THE AIRCRAFT WHEN THE THRUST REVERSER DEPLOYS.",
    exampleSpanish: "Mantenga al personal alejado de la aeronave cuando se despliegue el inversor de empuje.",
    conjugations: {
      base: "DEPLOY (Desplegar)",
      thirdPerson: "DEPLOYS (Despliega)",
      past: "DEPLOYED (Desplegó)",
      participle: "DEPLOYED (Desplegado - Adjetivo)",
      derived: "DEPLOYMENT (Despliegue)"
    }
  },
  {
    id: "disconnect",
    word: "DISCONNECT",
    ipa: "/ˌdɪs.kəˈnekt/",
    spanish: "Desconectar / Desacoplar",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Separar un elemento del componente al que está enlazado física o eléctricamente.",
    usageRule: "Regla 1.2 / 5.3: Verbo prioritario en procedimientos AMM. No use 'unplug' ni 'detach'.",
    exampleEnglish: "DISCONNECT THE ELECTRICAL CONNECTORS FROM THE INSTRUMENT.",
    exampleSpanish: "Desconecte los conectores eléctricos del instrumento.",
    conjugations: {
      base: "DISCONNECT (Desconectar)",
      thirdPerson: "DISCONNECTS (Desconecta)",
      past: "DISCONNECTED (Desconectó)",
      participle: "DISCONNECTED (Desconectado - Adjetivo)",
      derived: "DISCONNECTION (Desconexión)"
    },
    unapprovedAlternatives: "Reemplaza a: unplug, detach, uncouple, decouple"
  },
  {
    id: "drain",
    word: "DRAIN",
    ipa: "/dreɪn/",
    spanish: "Drenar / Purgar líquido",
    partOfSpeech: "VERB",
    category: "HYDRAULIC",
    definitionSTE: "Extraer o vaciar un líquido de un recipiente, línea o depósito de la aeronave.",
    usageRule: "Regla 5.3: Modo imperativo estándar en tareas de combustible e hidráulica.",
    exampleEnglish: "DRAIN THE HYDRAULIC RESERVOIR FULLY INTO A CLEAN CONTAINER.",
    exampleSpanish: "Drene el depósito hidráulico por completo en un recipiente limpio.",
    conjugations: {
      base: "DRAIN (Drenar)",
      thirdPerson: "DRAINS (Drena)",
      past: "DRAINED (Drenó)",
      participle: "DRAINED (Drenado - Adjetivo)",
      derived: "DRAINAGE (Drenaje) / DRAIN (Drenaje / Tubo)"
    }
  },

  // ================= E =================
  {
    id: "elevator",
    word: "ELEVATOR",
    ipa: "/ˈel.ə.veɪ.t̬ɚ/",
    spanish: "Elevador / Timón de profundidad",
    partOfSpeech: "NOUN",
    category: "AIRFRAME",
    definitionSTE: "Superficie móvil horizontal del empenaje que controla el cabeceo (pitch) del avión.",
    usageRule: "Regla 1.5 (Categoría 6): Nombre técnico oficial de mandos de vuelo.",
    exampleEnglish: "EXAMINE THE ELEVATOR HINGES FOR SIGNS OF CRACKING.",
    exampleSpanish: "Examine las bisagras del elevador en busca de indicios de agrietamiento.",
    conjugations: {
      base: "ELEVATOR (Elevador)",
      derived: "ELEVATORS (Elevadores - Plural)"
    }
  },
  {
    id: "energize",
    word: "ENERGIZE",
    ipa: "/ˈen.ɚ.dʒaɪz/",
    spanish: "Energizar / Suministrar corriente eléctrica",
    partOfSpeech: "VERB",
    category: "AVIONICS",
    definitionSTE: "Suministrar corriente o potencial eléctrico a un sistema, relé o barra colectora.",
    usageRule: "Regla 1.3: Verbo aprobado. No use 'power up' ni 'turn on electrics'.",
    exampleEnglish: "ENERGIZE THE AC AND DC BUSBARS TO DO THE BITE TEST.",
    exampleSpanish: "Energice las barras colectoras de CA y CC para realizar la prueba BITE.",
    conjugations: {
      base: "ENERGIZE (Energizar)",
      thirdPerson: "ENERGIZES (Energiza)",
      past: "ENERGIZED (Energizó)",
      participle: "ENERGIZED (Energizado - Adjetivo)"
    },
    unapprovedAlternatives: "Reemplaza a: power, power up, electrify"
  },
  {
    id: "engine",
    word: "ENGINE",
    ipa: "/ˈen.dʒɪn/",
    spanish: "Motor / Planta de poder",
    partOfSpeech: "NOUN",
    category: "ENGINE",
    definitionSTE: "Planta motriz termodinámica (turbina o pistón) que produce empuje para el vuelo.",
    usageRule: "Regla 1.5 (Categoría 1): Nombre técnico oficial. No usar como verbo.",
    exampleEnglish: "DO NOT GO NEAR THE ENGINE WHEN IT OPERATES.",
    exampleSpanish: "No se acerque al motor cuando esté en funcionamiento.",
    conjugations: {
      base: "ENGINE (Motor)",
      derived: "ENGINES (Motores - Plural)"
    }
  },
  {
    id: "examine",
    word: "EXAMINE",
    ipa: "/ɪɡˈzæm.ɪn/",
    spanish: "Examinar / Inspeccionar visualmente",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Mirar cuidadosamente un objeto para verificar su estado físico y detectar anomalías.",
    usageRule: "Regla 1.2: Aprobado. Reemplaza a 'check' (cuando es inspección visual), 'inspect' y 'survey'.",
    exampleEnglish: "EXAMINE THE TURBINE BLADES FOR WEAR AND CORROSION.",
    exampleSpanish: "Examine los álabes de la turbina en busca de desgaste y corrosión.",
    conjugations: {
      base: "EXAMINE (Examinar)",
      thirdPerson: "EXAMINES (Examina)",
      past: "EXAMINED (Examinó)",
      participle: "EXAMINED (Examinado - Adjetivo)",
      derived: "EXAMINATION (Examen / Inspección)"
    },
    unapprovedAlternatives: "Reemplaza a: inspect, check (visual), survey, view"
  },
  {
    id: "extinguish",
    word: "EXTINGUISH",
    ipa: "/ɪkˈstɪŋ.ɡwɪʃ/",
    spanish: "Extinguir / Apagar fuego",
    partOfSpeech: "VERB",
    category: "SAFETY",
    definitionSTE: "Detener la combustión de un incendio mediante agentes extintores.",
    usageRule: "Regla 9.3: Prohibido usar el phrasal verb 'put out'. Use obligatoriamente 'EXTINGUISH'.",
    exampleEnglish: "TO EXTINGUISH A FIRE IN THE ENGINE, PULL THE FIRE HANDLE.",
    exampleSpanish: "Para extinguir un fuego en el motor, jale la manija de fuego.",
    conjugations: {
      base: "EXTINGUISH (Extinguir)",
      thirdPerson: "EXTINGUISHES (Extingue)",
      past: "EXTINGUISHED (Extinguió)",
      participle: "EXTINGUISHED (Extinguido - Adjetivo)",
      derived: "EXTINGUISHER (Extintor)"
    },
    unapprovedAlternatives: "Reemplaza a: put out, quench, stifle"
  },

  // ================= F =================
  {
    id: "filter",
    word: "FILTER",
    ipa: "/ˈfɪl.tɚ/",
    spanish: "Filtro",
    partOfSpeech: "NOUN",
    category: "HYDRAULIC",
    definitionSTE: "Dispositivo permeable diseñado para retener partículas sólidas y contaminantes de un fluido.",
    usageRule: "Regla 1.7: Aprobado como sustantivo técnico. Como verbo escriba 'PUT THROUGH A FILTER'.",
    exampleEnglish: "REMOVE AND DISCARD THE HYDRAULIC RETURN FILTER ELEMENT.",
    exampleSpanish: "Remueva y deseche el elemento filtrante de retorno hidráulico.",
    conjugations: {
      base: "FILTER (Filtro)",
      derived: "FILTERED (Filtrado - Adjetivo)"
    }
  },
  {
    id: "flange",
    word: "FLANGE",
    ipa: "/flændʒ/",
    spanish: "Brida / Pestaña de unión",
    partOfSpeech: "NOUN",
    category: "AIRFRAME",
    definitionSTE: "Superficie saliente o reborde en un conducto, carcasa o viga que sirve para fijación.",
    usageRule: "Regla 1.5 (Categoría 1): Nombre técnico estándar de uniones y ensambles.",
    exampleEnglish: "MAKE SURE THAT THE FLANGE IS NOT DAMAGED OR CORRODED.",
    exampleSpanish: "Asegúrese de que la brida no esté dañada ni corroída.",
    conjugations: {
      base: "FLANGE (Brida)",
      derived: "FLANGES (Bridas - Plural)"
    }
  },
  {
    id: "flight",
    word: "FLIGHT",
    ipa: "/flaɪt/",
    spanish: "Vuelo / Tiempo en el aire",
    partOfSpeech: "NOUN",
    category: "MAINTENANCE",
    definitionSTE: "El período durante el cual una aeronave se encuentra en el aire operando.",
    usageRule: "Regla 1.5 (Categoría 8): Nombre técnico fundamental para límites horarios (flight hours).",
    exampleEnglish: "AFTER EACH FLIGHT, READ THE COUNTER UNIT INDICATIONS.",
    exampleSpanish: "Después de cada vuelo, lea las indicaciones del contador.",
    conjugations: {
      base: "FLIGHT (Vuelo)",
      derived: "IN-FLIGHT (En vuelo - Adjetivo)"
    }
  },
  {
    id: "flush",
    word: "FLUSH",
    ipa: "/flʌʃ/",
    spanish: "Enrasado / Lavar con flujo",
    partOfSpeech: "ADJECTIVE",
    category: "MAINTENANCE",
    definitionSTE: "1. (adj) Superficie a nivel continuo sin resaltes. 2. (v) Limpiar tuberías con chorro de líquido a presión.",
    usageRule: "Regla 1.2: Aprobado como adjetivo (enrasado) y verbo (hacer circular líquido de limpieza).",
    exampleEnglish: "MAKE SURE THAT THE FASTENER HEADS ARE FLUSH WITH THE SKIN.",
    exampleSpanish: "Asegúrese de que las cabezas de las fijaciones estén enrasadas con el revestimiento.",
    conjugations: {
      base: "FLUSH (Enrasado / Lavar con flujo)",
      thirdPerson: "FLUSHES (Lava con flujo)",
      past: "FLUSHED (Lavó con flujo)",
      participle: "FLUSHED (Lavado con flujo)"
    },
    unapprovedAlternatives: "Reemplaza a: even with, level with, rinse"
  },
  {
    id: "fuselage",
    word: "FUSELAGE",
    ipa: "/ˈfjuː.sə.lɑːʒ/",
    spanish: "Fuselaje / Cuerpo del avión",
    partOfSpeech: "NOUN",
    category: "AIRFRAME",
    definitionSTE: "Estructura central y cuerpo principal de la aeronave que aloja cabina, pasaje y carga.",
    usageRule: "Regla 1.5 (Categoría 2): Nombre técnico principal de ubicación.",
    exampleEnglish: "CONNECT THE GROUND CABLE TO THE FUSELAGE STRUCTURE.",
    exampleSpanish: "Conecte el cable de puesta a tierra a la estructura del fuselaje.",
    conjugations: {
      base: "FUSELAGE (Fuselaje)"
    }
  },

  // ================= G =================
  {
    id: "gasket",
    word: "GASKET",
    ipa: "/ˈɡæs.kɪt/",
    spanish: "Junta de estanqueidad / Empacadura",
    partOfSpeech: "NOUN",
    category: "HYDRAULIC",
    definitionSTE: "Sello plano de material deformable instalado entre dos caras de brida para evitar fugas.",
    usageRule: "Regla 1.5 (Categoría 1): Nombre técnico oficial de partes en el IPC.",
    exampleEnglish: "DISCARD THE USED GASKET AND INSTALL A NEW GASKET.",
    exampleSpanish: "Deseche la junta usada e instale una nueva junta.",
    conjugations: {
      base: "GASKET (Junta)",
      derived: "GASKETS (Juntas - Plural)"
    }
  },
  {
    id: "gradually",
    word: "GRADUALLY",
    ipa: "/ˈɡrædʒ.u.ə.li/",
    spanish: "Gradualmente / Progresivamente",
    partOfSpeech: "ADVERB",
    category: "MAINTENANCE",
    definitionSTE: "De manera lenta, continua y uniforme sin cambios bruscos de valor.",
    usageRule: "Regla 1.2: Adverbio aprobado. Reemplaza a 'progressively', 'steadily', 'evenly' y 'by degrees'.",
    exampleEnglish: "GRADUALLY OPEN THE COCKS ON THE RECHARGING UNIT.",
    exampleSpanish: "Abra gradualmente las llaves en la unidad de recarga.",
    conjugations: {
      base: "GRADUALLY (Gradualmente)"
    },
    unapprovedAlternatives: "Reemplaza a: progressively, step by step, evenly, steadily"
  },
  {
    id: "grease",
    word: "GREASE",
    ipa: "/ɡriːs/",
    spanish: "Grasa lubricante",
    partOfSpeech: "NOUN",
    category: "MATERIALS",
    definitionSTE: "Lubricante semisólido espeso formulado para reducir la fricción en cojinetes y mecanismos.",
    usageRule: "Regla 1.7: Solo aprobado como sustantivo. Prohibido usar 'grease' como verbo; escriba 'APPLY GREASE TO'.",
    exampleEnglish: "APPLY A THIN LAYER OF GREASE ON THE SPLINES.",
    exampleSpanish: "Aplique una capa delgada de grasa en las estrías.",
    conjugations: {
      base: "GREASE (Grasa lubricante)",
      derived: "LUBRICATE (Lubricar - Verbo aprobado)"
    },
    unapprovedAlternatives: "Evite el verbo 'grease' -> use 'APPLY GREASE' o 'LUBRICATE'"
  },

  // ================= H =================
  {
    id: "hatch",
    word: "HATCH",
    ipa: "/hætʃ/",
    spanish: "Escotilla / Compuerta pequeña",
    partOfSpeech: "NOUN",
    category: "AIRFRAME",
    definitionSTE: "Abertura con cubierta abisagrada para acceso técnico o de emergencia en fuselaje.",
    usageRule: "Regla 1.5 (Categoría 1/15): Nombre técnico oficial para aberturas auxiliares.",
    exampleEnglish: "BEFORE YOU CLOSE THE HATCH, MAKE SURE THAT NO PERSONS ARE IN THE BAY.",
    exampleSpanish: "Antes de cerrar la escotilla, asegúrese de que no haya personas en la bahía.",
    conjugations: {
      base: "HATCH (Escotilla)",
      derived: "HATCHES (Escotillas - Plural)"
    }
  },
  {
    id: "hydraulic",
    word: "HYDRAULIC",
    ipa: "/haɪˈdrɑː.lɪk/",
    spanish: "Hidráulico / Accionado por fluido",
    partOfSpeech: "ADJECTIVE",
    category: "HYDRAULIC",
    definitionSTE: "Relacionado con o accionado por líquido presurizado (aceite hidráulico).",
    usageRule: "Regla 1.4: Adjetivo aprobado. Escribir siempre con 'H'. Adverbio aprobado: HYDRAULICALLY.",
    exampleEnglish: "CONNECT THE FITTINGS TO THE HYDRAULIC TEST BENCH.",
    exampleSpanish: "Conecte los racores al banco de pruebas hidráulico.",
    conjugations: {
      base: "HYDRAULIC (Hidráulico)",
      derived: "HYDRAULICALLY (Hidráulicamente - Adverbio)"
    }
  },

  // ================= I =================
  {
    id: "identify",
    word: "IDENTIFY",
    ipa: "/aɪˈden.t̬ə.faɪ/",
    spanish: "Identificar / Marcar",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Colocar marcas, códigos o etiquetas para reconocer de forma inequívoca un componente.",
    usageRule: "Regla 1.2: Reemplaza a 'label', 'tag', 'mark' (cuando se marca con código) y 'differentiate'.",
    exampleEnglish: "IDENTIFY THE WIRES WITH SLEEVES OF DIFFERENT COLORS.",
    exampleSpanish: "Identifique los cables con fundas de diferentes colores.",
    conjugations: {
      base: "IDENTIFY (Identificar)",
      thirdPerson: "IDENTIFIES (Identifica)",
      past: "IDENTIFIED (Identificó)",
      participle: "IDENTIFIED (Identificado - Adjetivo)",
      derived: "IDENTIFICATION (Identificación)"
    },
    unapprovedAlternatives: "Reemplaza a: mark, label, differentiate, code"
  },
  {
    id: "immediately",
    word: "IMMEDIATELY",
    ipa: "/ɪˈmiː.di.ət.li/",
    spanish: "Inmediatamente / Sin demora",
    partOfSpeech: "ADVERB",
    category: "SAFETY",
    definitionSTE: "Sin intervalo de tiempo o espacio entre una acción y la siguiente.",
    usageRule: "Regla 1.2: Adverbio de seguridad crítico. Reemplaza a 'right away', 'promptly' e 'instantly'.",
    exampleEnglish: "IF FUEL SPILLS ON THE GROUND, IMMEDIATELY GO TO A SAFE AREA.",
    exampleSpanish: "Si se derrama combustible en el suelo, diríjase inmediatamente a un área segura.",
    conjugations: {
      base: "IMMEDIATELY (Inmediatamente)",
      derived: "IMMEDIATE (Inmediato - Adjetivo)"
    },
    unapprovedAlternatives: "Reemplaza a: promptly, instantly, right away, without delay"
  },
  {
    id: "increase",
    word: "INCREASE",
    ipa: "/ɪnˈkriːs/",
    spanish: "Aumentar / Incrementar",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Hacer o volverse mayor en dimensión, valor, presión, temperatura o cantidad.",
    usageRule: "Regla 1.2: Verbo aprobado. Reemplaza a 'raise', 'augment', 'heighten', 'accelerate' y 'boost'.",
    exampleEnglish: "INCREASE THE PRESSURE GRADUALLY TO 3000 PSI.",
    exampleSpanish: "Aumente la presión gradualmente a 3000 psi.",
    conjugations: {
      base: "INCREASE (Aumentar)",
      thirdPerson: "INCREASES (Aumenta)",
      past: "INCREASED (Aumentó)",
      participle: "INCREASED (Aumentado - Adjetivo)"
    },
    unapprovedAlternatives: "Reemplaza a: raise, boost, augment, heighten, accelerate"
  },
  {
    id: "install",
    word: "INSTALL",
    ipa: "/ɪnˈstɑːl/",
    spanish: "Instalar / Montar en su lugar",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Fijar o colocar un elemento en o sobre otro para que quede operativo.",
    usageRule: "Regla 5.3: El verbo más usado en manuales AMM. Reemplaza a 'fit', 'mount' y 'put on'.",
    exampleEnglish: "INSTALL THE NEW O-RINGS ON THE SPINDLE.",
    exampleSpanish: "Instale las nuevas juntas tóricas en el husillo.",
    conjugations: {
      base: "INSTALL (Instalar)",
      thirdPerson: "INSTALLS (Instala)",
      past: "INSTALLED (Instaló)",
      participle: "INSTALLED (Instalado - Adjetivo)",
      derived: "INSTALLATION (Instalación)"
    },
    unapprovedAlternatives: "Reemplaza a: fit, mount, place on, put on, set up"
  },
  {
    id: "isolate",
    word: "ISOLATE",
    ipa: "/ˈaɪ.sə.leɪt/",
    spanish: "Aislar / Desconectar línea",
    partOfSpeech: "VERB",
    category: "SAFETY",
    definitionSTE: "Interrumpir el suministro o la conexión eléctrica, neumática o hidráulica hacia un componente.",
    usageRule: "Regla 1.2 / 7.2: Acción obligatoria en procedimientos de seguridad de mantenimiento.",
    exampleEnglish: "ISOLATE THE ELECTRICAL POWER SUPPLY BEFORE YOU REMOVE THE CONNECTOR.",
    exampleSpanish: "Aísle la fuente de alimentación eléctrica antes de remover el conector.",
    conjugations: {
      base: "ISOLATE (Aislar)",
      thirdPerson: "ISOLATES (Aísla)",
      past: "ISOLATED (Aisló)",
      participle: "ISOLATED (Aislado - Adjetivo)",
      derived: "ISOLATION (Aislamiento)"
    }
  },

  // ================= L =================
  {
    id: "landing-gear",
    word: "LANDING GEAR",
    ipa: "/ˈlæn.dɪŋ ɡɪr/",
    spanish: "Tren de aterrizaje",
    partOfSpeech: "NOUN",
    category: "AIRFRAME",
    definitionSTE: "Conjunto de ruedas, amortiguadores y mecanismos que sustentan la aeronave en tierra.",
    usageRule: "Regla 1.5 (Categoría 2/6): Nombre técnico oficial. No sustituir por 'undercarriage'.",
    exampleEnglish: "RETRACT THE LANDING GEAR AND MONITOR THE GEAR DOORS.",
    exampleSpanish: "Retraiga el tren de aterrizaje y supervise las compuertas del tren.",
    conjugations: {
      base: "LANDING GEAR (Tren de aterrizaje)"
    },
    unapprovedAlternatives: "Reemplaza a: undercarriage"
  },
  {
    id: "latch",
    word: "LATCH",
    ipa: "/lætʃ/",
    spanish: "Enclavar / Trabador mecánico",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Sujetar o retener una puerta o mecanismo en su posición cerrada mediante un pestillo.",
    usageRule: "Regla 1.2: Aprobado como verbo y como sustantivo técnico.",
    exampleEnglish: "MAKE SURE THAT YOU LATCH THE DOOR CORRECTLY.",
    exampleSpanish: "Asegúrese de enclavar la puerta correctamente.",
    conjugations: {
      base: "LATCH (Enclavar)",
      thirdPerson: "LATCHES (Enclava)",
      past: "LATCHED (Enclavó)",
      participle: "LATCHED (Enclavado - Adjetivo)"
    }
  },
  {
    id: "leak",
    word: "LEAK",
    ipa: "/liːk/",
    spanish: "Fuga / Fuga de fluido",
    partOfSpeech: "NOUN",
    category: "HYDRAULIC",
    definitionSTE: "Grieta, fisura o abertura indeseada por donde escapa fluido o gas a presión.",
    usageRule: "Regla 1.2 / 1.7: Aprobado como sustantivo. Prohibido usar 'leak' como verbo; use 'THERE ARE LEAKS'.",
    exampleEnglish: "EXAMINE THE SWIVEL COUPLINGS FOR LEAKS.",
    exampleSpanish: "Examine los acoples giratorios en busca de fugas.",
    conjugations: {
      base: "LEAK (Fuga)",
      derived: "LEAKAGE (Fuga de material / Pérdida) / LEAKING (Fuga continua)"
    },
    unapprovedAlternatives: "Evite el verbo 'leak' -> use 'THERE IS A LEAK'"
  },
  {
    id: "lift",
    word: "LIFT",
    ipa: "/lɪft/",
    spanish: "Sustentación / Elevar",
    partOfSpeech: "VERB",
    category: "AIRFRAME",
    definitionSTE: "1. (v) Mover un objeto hacia arriba. 2. (n - TN) Fuerza aerodinámica que eleva el ala.",
    usageRule: "Regla 1.3: Como verbo significa mover hacia arriba. Reemplaza a 'raise' y 'hoist'.",
    exampleEnglish: "LIFT THE COVER CAREFULLY AND REMOVE IT FROM THE HOUSING.",
    exampleSpanish: "Levante la cubierta con cuidado y remuévala de la carcasa.",
    conjugations: {
      base: "LIFT (Levantar / Elevar)",
      thirdPerson: "LIFTS (Levanta)",
      past: "LIFTED (Levantó)",
      participle: "LIFTED (Levantado - Adjetivo)"
    },
    unapprovedAlternatives: "Reemplaza a: raise, hoist, elevate"
  },
  {
    id: "lubricate",
    word: "LUBRICATE",
    ipa: "/ˈluː.brɪ.keɪt/",
    spanish: "Lubricar",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Aplicar lubricante (aceite o grasa) sobre superficies de contacto móvil para reducir fricción.",
    usageRule: "Regla 1.2: Verbo aprobado. Reemplaza a 'grease' y 'oil' cuando se usan incorrectamente como verbos.",
    exampleEnglish: "LUBRICATE THE O-RINGS WITH HYDRAULIC FLUID (NATO CODE H-515).",
    exampleSpanish: "Lubrique las juntas tóricas con fluido hidráulico (código OTAN H-515).",
    conjugations: {
      base: "LUBRICATE (Lubricar)",
      thirdPerson: "LUBRICATES (Lubrica)",
      past: "LUBRICATED (Lubricó)",
      participle: "LUBRICATED (Lubricado - Adjetivo)",
      derived: "LUBRICATION (Lubricación) / LUBRICANT (Lubricante)"
    },
    unapprovedAlternatives: "Reemplaza a los verbos no aprobados 'oil' y 'grease'"
  },

  // ================= M =================
  {
    id: "maintenance",
    word: "MAINTENANCE",
    ipa: "/ˈmeɪn.tən.əns/",
    spanish: "Mantenimiento / Servicio técnico",
    partOfSpeech: "NOUN",
    category: "MAINTENANCE",
    definitionSTE: "Conjunto de procedimientos de inspección, servicio, ajuste y reparación de la aeronave.",
    usageRule: "Regla 1.2: Sustantivo aprobado. Para la acción, escriba 'DO THE MAINTENANCE ON', no el verbo 'maintain'.",
    exampleEnglish: "DO NOT REFUEL THE AIRCRAFT DURING MAINTENANCE.",
    exampleSpanish: "No reabastezca de combustible la aeronave durante el mantenimiento.",
    conjugations: {
      base: "MAINTENANCE (Mantenimiento)"
    },
    unapprovedAlternatives: "Reemplaza al verbo no aprobado 'maintain' -> use 'DO MAINTENANCE'"
  },
  {
    id: "mandatory",
    word: "MANDATORY",
    ipa: "/ˈmæn.də.tɔːr.i/",
    spanish: "Obligatorio / Mandatorio",
    partOfSpeech: "ADJECTIVE",
    category: "SAFETY",
    definitionSTE: "Requisito estricto que debe cumplirse, usarse u obedecerse sin excepción.",
    usageRule: "Regla 1.2: Adjetivo aprobado. Reemplaza a 'compulsory', 'imperative' y 'demanded'.",
    exampleEnglish: "OBEDIENCE TO THIS SERVICE BULLETIN IS MANDATORY.",
    exampleSpanish: "El cumplimiento de este boletín de servicio es obligatorio.",
    conjugations: {
      base: "MANDATORY (Obligatorio)"
    },
    unapprovedAlternatives: "Reemplaza a: compulsory, obligatory, imperative"
  },
  {
    id: "measure",
    word: "MEASURE",
    ipa: "/ˈmeʒ.ɚ/",
    spanish: "Medir",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Determinar las dimensiones, capacidad, holgura o cantidad de algo con un instrumento.",
    usageRule: "Regla 1.2: Verbo aprobado. Reemplaza a 'gauge', 'meter', 'determine the size'.",
    exampleEnglish: "MEASURE THE DEPTH OF THE DENT AS SHOWN IN FIGURE 4.",
    exampleSpanish: "Mida la profundidad de la abolladura como se muestra en la figura 4.",
    conjugations: {
      base: "MEASURE (Medir)",
      thirdPerson: "MEASURES (Mide)",
      past: "MEASURED (Midió)",
      participle: "MEASURED (Medido - Adjetivo)",
      derived: "MEASUREMENT (Medición)"
    },
    unapprovedAlternatives: "Reemplaza a: gauge, meter, take dimensions"
  },
  {
    id: "monitor",
    word: "MONITOR",
    ipa: "/ˈmɑː.nə.t̬ɚ/",
    spanish: "Supervisar / Monitorear continuamente",
    partOfSpeech: "VERB",
    category: "AVIONICS",
    definitionSTE: "Observar atentamente un instrumento o parámetro durante un período para detectar cambios.",
    usageRule: "Regla 1.3: Verbo aprobado. Reemplaza a 'watch', 'track', 'observe' y 'check on'.",
    exampleEnglish: "MONITOR THE INDICATORS ON THE OVERHEAD PANEL DURING THE TEST.",
    exampleSpanish: "Supervise los indicadores en el panel superior durante la prueba.",
    conjugations: {
      base: "MONITOR (Supervisar)",
      thirdPerson: "MONITORS (Supervisa)",
      past: "MONITORED (Supervisó)",
      participle: "MONITORED (Supervisado - Adjetivo)"
    },
    unapprovedAlternatives: "Reemplaza a: watch, observe, track, oversee"
  },

  // ================= O =================
  {
    id: "obey",
    word: "OBEY",
    ipa: "/oʊˈbeɪ/",
    spanish: "Cumplir / Acatar / Obedecer",
    partOfSpeech: "VERB",
    category: "SAFETY",
    definitionSTE: "Cumplir estrictamente lo que las instrucciones o precauciones de seguridad ordenan.",
    usageRule: "Regla 1.3: Usar siempre 'OBEY' para advertencias y manuales. Prohibido usar 'follow' para reglas.",
    exampleEnglish: "OBEY THE SAFETY PRECAUTIONS GIVEN IN SECTION 7.",
    exampleSpanish: "Cumpla las precauciones de seguridad indicadas en la sección 7.",
    conjugations: {
      base: "OBEY (Acatar / Cumplir)",
      thirdPerson: "OBEYS (Acata)",
      past: "OBEYED (Acató)",
      participle: "OBEYED (Acatado - Adjetivo)"
    },
    unapprovedAlternatives: "Reemplaza a: follow (reglas), comply with, adhere to, observe (normas)"
  },
  {
    id: "operate",
    word: "OPERATE",
    ipa: "/ˈɑː.pə.reɪt/",
    spanish: "Operar / Funcionar / Accionar",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Poner, mantener o estar en acción funcional.",
    usageRule: "Regla 1.2: Verbo técnico estándar. Reemplaza a 'run', 'work', 'function' y 'actuate'.",
    exampleEnglish: "OPERATE THE PLUNGER TO DRAIN THE HYDRAULIC SYSTEM.",
    exampleSpanish: "Accione el émbolo para drenar el sistema hidráulico.",
    conjugations: {
      base: "OPERATE (Operar / Accionar)",
      thirdPerson: "OPERATES (Opera)",
      past: "OPERATED (Operó)",
      participle: "OPERATED (Operado - Adjetivo)",
      derived: "OPERATION (Operación) / OPERATIONAL (Operacional)"
    },
    unapprovedAlternatives: "Reemplaza a: run, function, actuate, work (como verbo)"
  },

  // ================= P =================
  {
    id: "permitted",
    word: "PERMITTED",
    ipa: "/pɚˈmɪt̬.ɪd/",
    spanish: "Permitido / Autorizado",
    partOfSpeech: "ADJECTIVE",
    category: "MAINTENANCE",
    definitionSTE: "Que está autorizado por la norma o tolerancia técnica del fabricante.",
    usageRule: "Regla 1.4: Adjetivo aprobado. Reemplaza a 'allowed', 'acceptable' y 'permissible'.",
    exampleEnglish: "A MAXIMUM OF TWO WASHERS IS PERMITTED FOR EACH BOLT.",
    exampleSpanish: "Se permite un máximo de dos arandelas para cada perno.",
    conjugations: {
      base: "PERMITTED (Permitido)",
      derived: "PERMIT (Permitir - Verbo)"
    },
    unapprovedAlternatives: "Reemplaza a: acceptable, allowed, permissible"
  },
  {
    id: "pressure",
    word: "PRESSURE",
    ipa: "/ˈpreʃ.ɚ/",
    spanish: "Presión",
    partOfSpeech: "NOUN",
    category: "HYDRAULIC",
    definitionSTE: "Fuerza continua aplicada perpendicularmente a una superficie por unidad de área.",
    usageRule: "Regla 1.7: Sustantivo técnico. Prohibido usar como verbo; use 'PRESSURIZE'.",
    exampleEnglish: "MAKE SURE THAT THE HYDRAULIC PRESSURE IS 3000 PSI.",
    exampleSpanish: "Asegúrese de que la presión hidráulica sea de 3000 psi.",
    conjugations: {
      base: "PRESSURE (Presión)",
      derived: "PRESSURIZE (Presurizar - Verbo) / PRESSURIZED (Presurizado - Adjetivo)"
    }
  },
  {
    id: "pressurize",
    word: "PRESSURIZE",
    ipa: "/ˈpreʃ.ə.raɪz/",
    spanish: "Presurizar / Suministrar presión",
    partOfSpeech: "VERB",
    category: "HYDRAULIC",
    definitionSTE: "Suministrar presión de aire o fluido a un sistema o cabina.",
    usageRule: "Regla 1.2: Verbo técnico estándar para sistemas neumáticos e hidráulicos.",
    exampleEnglish: "PRESSURIZE THE HYDRAULIC SYSTEM TO 150 BAR WITH THE GROUND CART.",
    exampleSpanish: "Presurice el sistema hidráulico a 150 bar con el carro de tierra.",
    conjugations: {
      base: "PRESSURIZE (Presurizar)",
      thirdPerson: "PRESSURIZES (Presuriza)",
      past: "PRESSURIZED (Presurizó)",
      participle: "PRESSURIZED (Presurizado - Adjetivo)",
      derived: "PRESSURIZATION (Presurización)"
    }
  },
  {
    id: "prevent",
    word: "PREVENT",
    ipa: "/prɪˈvent/",
    spanish: "Prevenir / Evitar que ocurra",
    partOfSpeech: "VERB",
    category: "SAFETY",
    definitionSTE: "Asegurarse de que no ocurra un daño, accidente, fuga o movimiento indeseado.",
    usageRule: "Regla 1.2 / 7.2: Verbo clave en safety instructions. Reemplaza a 'avoid', 'stop from' y 'avert'.",
    exampleEnglish: "TO PREVENT DAMAGE TO THE ENGINE, IMMEDIATELY INSTALL PROTECTIVE COVERS.",
    exampleSpanish: "Para prevenir daños al motor, instale inmediatamente cubiertas protectoras.",
    conjugations: {
      base: "PREVENT (Prevenir)",
      thirdPerson: "PREVENTS (Previene)",
      past: "PREVENTED (Previno)",
      participle: "PREVENTED (Prevenido)",
      derived: "PREVENTION (Prevención)"
    },
    unapprovedAlternatives: "Reemplaza a: avoid, avert, inhibit, hold off"
  },

  // ================= R =================
  {
    id: "refuel",
    word: "REFUEL",
    ipa: "/ˌriːˈfjuː.əl/",
    spanish: "Reabastecer combustible",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Suministrar combustible a los tanques de la aeronave.",
    usageRule: "Regla 1.2: Verbo aprobado. Prohibido usar 'fuel' como verbo; escriba 'REFUEL'.",
    exampleEnglish: "REFUEL THE AIRCRAFT IN AN APPROVED VENTILATED AREA.",
    exampleSpanish: "Reabastezca de combustible la aeronave en un área ventilada aprobada.",
    conjugations: {
      base: "REFUEL (Reabastecer)",
      thirdPerson: "REFUELS (Reabastece)",
      past: "REFUELED (Reabasteció)",
      participle: "REFUELED (Reabastecido)"
    },
    unapprovedAlternatives: "Reemplaza al verbo no aprobado 'fuel'"
  },
  {
    id: "release",
    word: "RELEASE",
    ipa: "/rɪˈliːs/",
    spanish: "Liberar / Soltar presión o fijación",
    partOfSpeech: "VERB",
    category: "HYDRAULIC",
    definitionSTE: "Dejar libre una pieza sujeta o permitir el alivio de una presión contenida.",
    usageRule: "Regla 1.2 / 5.3: Reemplaza a 'let go', 'free', 'discharge' y 'expel'.",
    exampleEnglish: "RELEASE THE PRESSURE BEFORE YOU DISCONNECT THE HYDRAULIC LINE.",
    exampleSpanish: "Libere la presión antes de desconectar la línea hidráulica.",
    conjugations: {
      base: "RELEASE (Liberar)",
      thirdPerson: "RELEASES (Libera)",
      past: "RELEASED (Liberó)",
      participle: "RELEASED (Liberado - Adjetivo)"
    },
    unapprovedAlternatives: "Reemplaza a: discharge, expel, free, let go, vent"
  },
  {
    id: "remove",
    word: "REMOVE",
    ipa: "/rɪˈmuːv/",
    spanish: "Remover / Desmontar / Retirar",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Tomar o mover un componente sacándolo de su posición instalada inicial.",
    usageRule: "Regla 1.4 / 5.3: Verbo central del AMM. Siempre en imperativo en procedimientos de desmontaje.",
    exampleEnglish: "REMOVE THE FOUR SCREWS (10) THAT ATTACH THE COVER (11) TO THE HOUSING (12).",
    exampleSpanish: "Remueva los cuatro tornillos (10) que fijan la cubierta (11) a la carcasa (12).",
    conjugations: {
      base: "REMOVE (Remover / Desmontar)",
      thirdPerson: "REMOVES (Remueve)",
      past: "REMOVED (Removió)",
      participle: "REMOVED (Removido / Desmontado - Adjetivo)",
      derived: "REMOVAL (Desmontaje / Remoción)"
    },
    unapprovedAlternatives: "Reemplaza a: detach, take off, withdraw, extract, dismount"
  },
  {
    id: "replace",
    word: "REPLACE",
    ipa: "/rɪˈpleɪs/",
    spanish: "Reemplazar / Sustituir por uno nuevo o reparado",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Remover un elemento e instalar un artículo nuevo o en servicio del mismo tipo.",
    usageRule: "Regla 1.3: Significado estricto STE: retirar uno viejo e instalar uno nuevo (no sustitución de diseño).",
    exampleEnglish: "REPLACE THE DAMAGED VALVE WITH A NEW VALVE.",
    exampleSpanish: "Reemplace la válvula dañada por una válvula nueva.",
    conjugations: {
      base: "REPLACE (Reemplazar)",
      thirdPerson: "REPLACES (Reemplaza)",
      past: "REPLACED (Reemplazó)",
      participle: "REPLACED (Reemplazado - Adjetivo)",
      derived: "REPLACEMENT (Reemplazo / Repuesto)"
    },
    unapprovedAlternatives: "Reemplaza a: substitute, renew, exchange"
  },
  {
    id: "retract",
    word: "RETRACT",
    ipa: "/rɪˈtrækt/",
    spanish: "Retraer / Recoger",
    partOfSpeech: "VERB",
    category: "AIRFRAME",
    definitionSTE: "Mover un componente (tren, flaps, spoilers) hacia adentro o hacia su posición recogida.",
    usageRule: "Regla 5.3: Modo imperativo estándar en pruebas de retracción de tren y mandos.",
    exampleEnglish: "RETRACT THE FLAPS TO THE FULL UP POSITION.",
    exampleSpanish: "Retraiga los flaps hasta la posición completamente arriba.",
    conjugations: {
      base: "RETRACT (Retraer)",
      thirdPerson: "RETRACTS (Retrae)",
      past: "RETRACTED (Retrajo)",
      participle: "RETRACTED (Retraído - Adjetivo)",
      derived: "RETRACTION (Retracción)"
    }
  },
  {
    id: "rudder",
    word: "RUDDER",
    ipa: "/ˈrʌd.ɚ/",
    spanish: "Timón de dirección",
    partOfSpeech: "NOUN",
    category: "AIRFRAME",
    definitionSTE: "Superficie de control vertical abisagrada al estabilizador vertical que controla la guiñada (yaw).",
    usageRule: "Regla 1.5 (Categoría 6): Nombre técnico oficial para mandos de dirección.",
    exampleEnglish: "MAKE SURE THAT THE RUDDER PEDALS MOVE FREELY.",
    exampleSpanish: "Asegúrese de que los pedales del timón de dirección se muevan libremente.",
    conjugations: {
      base: "RUDDER (Timón de dirección)"
    }
  },

  // ================= S =================
  {
    id: "safety",
    word: "SAFETY",
    ipa: "/ˈseɪf.ti/",
    spanish: "Asegurar con alambre o pasador / Seguridad",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "1. (v) Asegurar un perno o tuerca con alambre de frenar (lockwire) o pasador. 2. (n) Estado seguro.",
    usageRule: "Regla 1.2: Aprobado como verbo: 'SAFETY THE NUT WITH WIRE' (Frenar la tuerca con alambre).",
    exampleEnglish: "SAFETY THE TWO BOLTS WITH 0.032 INCH STAINLESS STEEL LOCKWIRE.",
    exampleSpanish: "Asegure (frene) los dos pernos con alambre de seguridad de acero inoxidable de 0.032 pulgadas.",
    conjugations: {
      base: "SAFETY (Asegurar con alambre / Frenar)",
      thirdPerson: "SAFETIES (Asegura)",
      past: "SAFETIED (Aseguró)",
      participle: "SAFETIED (Asegurado con alambre - Adjetivo)",
      derived: "SAFE (Seguro) / SAFELY (Con seguridad)"
    },
    unapprovedAlternatives: "Reemplaza a: wire-lock, cotter-pin, lockwire (como verbo)"
  },
  {
    id: "sealant",
    word: "SEALANT",
    ipa: "/ˈsiː.lənt/",
    spanish: "Sellante aeronáutico / Masilla",
    partOfSpeech: "NOUN",
    category: "MATERIALS",
    definitionSTE: "Compuesto elastomérico aplicado en juntas de tanques o paneles para evitar fugas de fluido.",
    usageRule: "Regla 1.5 (Categoría 4): Nombre técnico oficial de consumibles aeronáuticos.",
    exampleEnglish: "APPLY A BEAD OF SEALANT PR 1440 B2 ALONG THE FAYING SURFACE.",
    exampleSpanish: "Aplique un cordón de sellante PR 1440 B2 a lo largo de la superficie de contacto.",
    conjugations: {
      base: "SEALANT (Sellante)",
      derived: "SEAL (Sellar - Verbo) / SEALED (Sellado - Adjetivo)"
    }
  },
  {
    id: "slat",
    word: "SLAT",
    ipa: "/slæt/",
    spanish: "Slat / Superficie hipersustentadora de borde de ataque",
    partOfSpeech: "NOUN",
    category: "AIRFRAME",
    definitionSTE: "Superficie aerodinámica móvil en el borde de ataque del ala que aumenta la sustentación a bajas velocidades.",
    usageRule: "Regla 1.5 (Categoría 6): Nombre técnico oficial en manuales de ala.",
    exampleEnglish: "THE SLATS EXTEND AUTOMATICALLY WHEN THE ANGLE OF ATTACK INCREASES.",
    exampleSpanish: "Los slats se extienden automáticamente cuando el ángulo de ataque aumenta.",
    conjugations: {
      base: "SLAT (Slat)",
      derived: "SLATS (Slats - Plural)"
    }
  },
  {
    id: "spoiler",
    word: "SPOILER",
    ipa: "/ˈspɔɪ.lɚ/",
    spanish: "Spoiler / Destructor de sustentación",
    partOfSpeech: "NOUN",
    category: "AIRFRAME",
    definitionSTE: "Panel móvil en la superficie superior del ala que destruye sustentación y actúa como aerofreno.",
    usageRule: "Regla 1.5 (Categoría 6): Nombre técnico de superficies secundarias de mando.",
    exampleEnglish: "EXTEND THE SPEEDBRAKES TO RAISE THE FLIGHT SPOILERS.",
    exampleSpanish: "Extienda los frenos de velocidad para levantar los spoilers de vuelo.",
    conjugations: {
      base: "SPOILER (Spoiler)",
      derived: "SPOILERS (Spoilers - Plural)"
    }
  },
  {
    id: "stabilizer",
    word: "STABILIZER",
    ipa: "/ˈsteɪ.bə.laɪ.zɚ/",
    spanish: "Estabilizador horizontal o vertical",
    partOfSpeech: "NOUN",
    category: "AIRFRAME",
    definitionSTE: "Superficie aerodinámica fija o ajustable que proporciona estabilidad longitudinal o direccional.",
    usageRule: "Regla 1.5 (Categoría 6): Nombre técnico oficial de empenaje.",
    exampleEnglish: "ADJUST THE HORIZONTAL STABILIZER TRIM TO 3 DEGREES NOSE UP.",
    exampleSpanish: "Ajuste el compensador del estabilizador horizontal a 3 grados morro arriba.",
    conjugations: {
      base: "STABILIZER (Estabilizador)",
      derived: "STABLE (Estable - Adjetivo) / STABILIZE (Estabilizar - Verbo)"
    }
  },

  // ================= T =================
  {
    id: "tighten",
    word: "TIGHTEN",
    ipa: "/ˈtaɪ.tən/",
    spanish: "Apretar / Apretar fijación",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Girar un perno, tornillo o tuerca para aumentar su firmeza y eliminar holguras.",
    usageRule: "Regla 1.2: Aprobado. Para apretar a valor exacto de torsiómetro usar 'TORQUE'.",
    exampleEnglish: "TIGHTEN THE NUTS BUT DO NOT TORQUE THEM AT THIS TIME.",
    exampleSpanish: "Apriete las tuercas pero no les aplique torque en este momento.",
    conjugations: {
      base: "TIGHTEN (Apretar)",
      thirdPerson: "TIGHTENS (Aprieta)",
      past: "TIGHTENED (Apretó)",
      participle: "TIGHTENED (Apretado - Adjetivo)",
      derived: "TIGHT (Apretado / Firme - Adjetivo) / TIGHTLY (Firmemente - Adverbio)"
    }
  },
  {
    id: "torque",
    word: "TORQUE",
    ipa: "/tɔːrk/",
    spanish: "Aplicar torque / Apretar con torsiómetro",
    partOfSpeech: "VERB",
    category: "MAINTENANCE",
    definitionSTE: "Apretar un elemento de fijación a un valor medido específico con llave dinamométrica.",
    usageRule: "Regla 1.2: Aprobado como verbo y como término técnico. No usar 'torque-tighten'.",
    exampleEnglish: "TORQUE EACH OF THE FOUR BOLTS TO 4.20 NM.",
    exampleSpanish: "Aplique un torque de 4.20 Nm a cada uno de los cuatro pernos.",
    conjugations: {
      base: "TORQUE (Torquear / Aplicar torque)",
      thirdPerson: "TORQUES (Aplica torque)",
      past: "TORQUED (Torqueó)",
      participle: "TORQUED (Torqueado - Adjetivo)"
    },
    unapprovedAlternatives: "Reemplaza a: torque-tighten, wrench-tighten"
  },
  {
    id: "transponder",
    word: "TRANSPONDER",
    ipa: "/trænˈspɑːn.dɚ/",
    spanish: "Transpondedor (Transceiver radar)",
    partOfSpeech: "NOUN",
    category: "AVIONICS",
    definitionSTE: "Equipo de radio a bordo que recibe interrogaciones del radar ATC y transmite una respuesta codificada.",
    usageRule: "Regla 1.5 (Categoría 1/6): Nombre técnico oficial de aviónica.",
    exampleEnglish: "SET THE TRANSPONDER MODE SELECTOR SWITCH TO ALT RPTG.",
    exampleSpanish: "Ajuste el interruptor selector de modo del transpondedor a ALT RPTG.",
    conjugations: {
      base: "TRANSPONDER (Transpondedor)"
    }
  },

  // ================= W =================
  {
    id: "warning",
    word: "WARNING",
    ipa: "/ˈwɔːr.nɪŋ/",
    spanish: "Advertencia (Riesgo de lesión o muerte)",
    partOfSpeech: "NOUN",
    category: "SAFETY",
    definitionSTE: "Instrucción prioritaria de seguridad que alerta sobre un peligro inminente de lesión física o muerte.",
    usageRule: "Regla 7.1: Estricto. Solo para riesgo a PERSONAS. Iniciar con condición o comando claro.",
    exampleEnglish: "WARNING: MAKE SURE THAT THE HIGH VOLTAGE POWER SUPPLY IS DISCONNECTED.",
    exampleSpanish: "ADVERTENCIA: ASEGÚRESE DE QUE LA FUENTE DE ALTA TENSIÓN ESTÉ DESCONECTADA.",
    conjugations: {
      base: "WARNING (Advertencia)",
      derived: "WARN (Advertir - Verbo)"
    }
  },
  {
    id: "wing",
    word: "WING",
    ipa: "/wɪŋ/",
    spanish: "Ala",
    partOfSpeech: "NOUN",
    category: "AIRFRAME",
    definitionSTE: "Superficie sustentadora principal de la aeronave que genera la fuerza de sustentación.",
    usageRule: "Regla 1.5 (Categoría 2): Nombre técnico oficial de componentes mayores.",
    exampleEnglish: "THE WING PROVIDES LIFT TO OVERCOME THE AIRCRAFT WEIGHT.",
    exampleSpanish: "El ala proporciona sustentación para vencer el peso de la aeronave.",
    conjugations: {
      base: "WING (Ala)",
      derived: "WINGS (Alas - Plural) / WINGLET (Aletilla de punta de ala)"
    }
  }
];

import { Module3Play } from './game2Module3Types';

export const MODULE_3_PLAYS_PART_1: Module3Play[] = [
  {
    playId: 1,
    title: "PLAY 1: ORACIONES 1 - 20",
    subtitle: "Cabina, Fuselaje, Mamparos y Remaches Estructurales",
    ataChapter: "ATA 52 & ATA 53 • FUSELAJE Y CABINA",
    questions: [
      {
        id: 1,
        fullEnglish: "Inspect the fuselage for corrosion and cracking",
        templateEnglish: "Inspect the {0} for corrosion and {1}",
        missingWords: ["fuselage", "cracking"],
        wordBank: ["cracking", "fuselage"],
        spanish: "Inspeccione el fuselaje en busca de corrosión y agrietamiento",
        aircraftType: "airplane",
        partCategory: "Fuselaje"
      },
      {
        id: 2,
        fullEnglish: "Check the cockpit windshield for delamination and scratches",
        templateEnglish: "Check the {0} {1} for delamination and scratches",
        missingWords: ["cockpit", "windshield"],
        wordBank: ["windshield", "cockpit"],
        spanish: "Revise el parabrisas de cabina por delaminación y rayaduras",
        aircraftType: "both",
        partCategory: "Cabina"
      },
      {
        id: 3,
        fullEnglish: "Install the titanium rivets on the pressure bulkhead",
        templateEnglish: "Install the titanium {0} on the pressure {1}",
        missingWords: ["rivets", "bulkhead"],
        wordBank: ["bulkhead", "rivets"],
        spanish: "Instale los remaches de titanio en el mamparo de presión",
        aircraftType: "airplane",
        partCategory: "Mamparo y Remaches"
      },
      {
        id: 4,
        fullEnglish: "Tighten the steel bolts with a calibrated torque wrench",
        templateEnglish: "Tighten the steel {0} with a calibrated {1} wrench",
        missingWords: ["bolts", "torque"],
        wordBank: ["torque", "bolts"],
        spanish: "Apriete los pernos de acero con una llave dinamométrica calibrada",
        aircraftType: "both",
        partCategory: "Pernos y Fijaciones"
      },
      {
        id: 5,
        fullEnglish: "Secure each castellated nut with a stainless cotter pin",
        templateEnglish: "Secure each castellated {0} with a stainless {1} pin",
        missingWords: ["nut", "cotter"],
        wordBank: ["cotter", "nut"],
        spanish: "Asegure cada tuerca almenada con un pasador de chaveta de acero inoxidable",
        aircraftType: "both",
        partCategory: "Tuercas y Pasadores"
      },
      {
        id: 6,
        fullEnglish: "Inspect the aluminum skin for hail damage and dents",
        templateEnglish: "Inspect the aluminum {0} for hail {1} and dents",
        missingWords: ["skin", "damage"],
        wordBank: ["damage", "skin"],
        spanish: "Inspeccione la piel de aluminio en busca de daños por granizo y abolladuras",
        aircraftType: "airplane",
        partCategory: "Piel Estructural"
      },
      {
        id: 7,
        fullEnglish: "Examine the forward bulkhead for structural deformation",
        templateEnglish: "Examine the forward {0} for structural {1}",
        missingWords: ["bulkhead", "deformation"],
        wordBank: ["deformation", "bulkhead"],
        spanish: "Examine el mamparo delantero para detectar deformaciones estructurales",
        aircraftType: "airplane",
        partCategory: "Mamparo"
      },
      {
        id: 8,
        fullEnglish: "Verify that the cockpit seats are locked in the floor tracks",
        templateEnglish: "Verify that the {0} seats are locked in the floor {1}",
        missingWords: ["cockpit", "tracks"],
        wordBank: ["tracks", "cockpit"],
        spanish: "Verifique que los asientos de cabina estén bloqueados en los rieles del piso",
        aircraftType: "both",
        partCategory: "Cabina"
      },
      {
        id: 9,
        fullEnglish: "Replace all sheared rivets along the fuselage seam",
        templateEnglish: "Replace all sheared {0} along the {1} seam",
        missingWords: ["rivets", "fuselage"],
        wordBank: ["fuselage", "rivets"],
        spanish: "Reemplace todos los remaches cizallados a lo largo de la costura del fuselaje",
        aircraftType: "airplane",
        partCategory: "Remaches y Fuselaje"
      },
      {
        id: 10,
        fullEnglish: "Lubricate the cockpit door hinges and latch mechanism",
        templateEnglish: "Lubricate the {0} door {1} and latch mechanism",
        missingWords: ["cockpit", "hinges"],
        wordBank: ["hinges", "cockpit"],
        spanish: "Lubrique las bisagras de la puerta de cabina y el mecanismo de cierre",
        aircraftType: "both",
        partCategory: "Cabina y Bisagras"
      },
      {
        id: 11,
        fullEnglish: "Inspect the fuselage stringers for signs of stress cracks",
        templateEnglish: "Inspect the fuselage {0} for signs of stress {1}",
        missingWords: ["stringers", "cracks"],
        wordBank: ["cracks", "stringers"],
        spanish: "Inspeccione los larguerillos del fuselaje en busca de grietas por fatiga",
        aircraftType: "airplane",
        partCategory: "Fuselaje y Larguerillos"
      },
      {
        id: 12,
        fullEnglish: "Check the flight instruments panel for loose shock mounts",
        templateEnglish: "Check the flight {0} panel for loose shock {1}",
        missingWords: ["instruments", "mounts"],
        wordBank: ["mounts", "instruments"],
        spanish: "Revise el panel de instrumentos de vuelo por soportes antivibratorios sueltos",
        aircraftType: "both",
        partCategory: "Instrumentos de Cabina"
      },
      {
        id: 13,
        fullEnglish: "Apply sealing compound around all countersunk rivets",
        templateEnglish: "Apply sealing compound around all {0} {1}",
        missingWords: ["countersunk", "rivets"],
        wordBank: ["rivets", "countersunk"],
        spanish: "Aplique compuesto sellador alrededor de todos los remaches avellanados",
        aircraftType: "airplane",
        partCategory: "Remaches"
      },
      {
        id: 14,
        fullEnglish: "Verify torque limits on every high tensile bolt",
        templateEnglish: "Verify {0} limits on every high tensile {1}",
        missingWords: ["torque", "bolt"],
        wordBank: ["bolt", "torque"],
        spanish: "Verifique los límites de torque en cada perno de alta resistencia",
        aircraftType: "both",
        partCategory: "Pernos"
      },
      {
        id: 15,
        fullEnglish: "Install self locking nuts on the passenger seat frame",
        templateEnglish: "Install self locking {0} on the passenger seat {1}",
        missingWords: ["nuts", "frame"],
        wordBank: ["frame", "nuts"],
        spanish: "Instale tuercas autofrenantes en el armazón de asientos de pasajeros",
        aircraftType: "airplane",
        partCategory: "Tuercas y Cabina"
      },
      {
        id: 16,
        fullEnglish: "Inspect the composite skin panel for core crushed defects",
        templateEnglish: "Inspect the composite {0} panel for core {1} defects",
        missingWords: ["skin", "crushed"],
        wordBank: ["crushed", "skin"],
        spanish: "Inspeccione el panel de piel compuesta por defectos de núcleo aplastado",
        aircraftType: "both",
        partCategory: "Piel Compuesta"
      },
      {
        id: 17,
        fullEnglish: "Check the aft pressure bulkhead web for radial tears",
        templateEnglish: "Check the aft pressure {0} web for radial {1}",
        missingWords: ["bulkhead", "tears"],
        wordBank: ["tears", "bulkhead"],
        spanish: "Revise el alma del mamparo de presión trasero por desgarros radiales",
        aircraftType: "airplane",
        partCategory: "Mamparo de Presión"
      },
      {
        id: 18,
        fullEnglish: "Clean the cockpit glare shield and primary displays",
        templateEnglish: "Clean the {0} glare shield and primary {1}",
        missingWords: ["cockpit", "displays"],
        wordBank: ["displays", "cockpit"],
        spanish: "Limpie la visera antirreflejos de cabina y las pantallas primarias",
        aircraftType: "both",
        partCategory: "Cabina e Instrumentos"
      },
      {
        id: 19,
        fullEnglish: "Remove damaged blind rivets using an undersized drill bit",
        templateEnglish: "Remove damaged blind {0} using an undersized {1} bit",
        missingWords: ["rivets", "drill"],
        wordBank: ["drill", "rivets"],
        spanish: "Retire los remaches ciegos dañados utilizando una broca de taladro de menor calibre",
        aircraftType: "airplane",
        partCategory: "Remaches"
      },
      {
        id: 20,
        fullEnglish: "Inspect the lower fuselage belly for debris strikes and gouges",
        templateEnglish: "Inspect the lower {0} belly for debris strikes and {1}",
        missingWords: ["fuselage", "gouges"],
        wordBank: ["gouges", "fuselage"],
        spanish: "Inspeccione la panza inferior del fuselaje por impactos de desechos y hendiduras",
        aircraftType: "airplane",
        partCategory: "Fuselaje"
      }
    ]
  },
  {
    playId: 2,
    title: "PLAY 2: ORACIONES 21 - 40",
    subtitle: "Alas, Borde de Ataque, Costillas, Alerones y Flaps",
    ataChapter: "ATA 57 & ATA 27 • ESTRUCTURA ALAR Y CONTROLES",
    questions: [
      {
        id: 21,
        fullEnglish: "Inspect the wing leading edge for bird strike damage",
        templateEnglish: "Inspect the wing {0} {1} for bird strike damage",
        missingWords: ["leading", "edge"],
        wordBank: ["edge", "leading"],
        spanish: "Inspeccione el borde de ataque del ala por impacto de aves",
        aircraftType: "airplane",
        partCategory: "Borde de Ataque"
      },
      {
        id: 22,
        fullEnglish: "Check the internal wing rib for cracks near the spar",
        templateEnglish: "Check the internal wing {0} for cracks near the {1}",
        missingWords: ["rib", "spar"],
        wordBank: ["spar", "rib"],
        spanish: "Revise la costilla alar interna por grietas cerca del larguero",
        aircraftType: "airplane",
        partCategory: "Costilla y Larguero"
      },
      {
        id: 23,
        fullEnglish: "Lubricate the left aileron hinge bearings and control rod",
        templateEnglish: "Lubricate the left {0} hinge bearings and control {1}",
        missingWords: ["aileron", "rod"],
        wordBank: ["rod", "aileron"],
        spanish: "Lubrique los cojinetes de bisagra del alerón izquierdo y la varilla de control",
        aircraftType: "airplane",
        partCategory: "Alerón"
      },
      {
        id: 24,
        fullEnglish: "Extend the trailing edge flaps and inspect the carriage tracks",
        templateEnglish: "Extend the trailing edge {0} and inspect the carriage {1}",
        missingWords: ["flaps", "tracks"],
        wordBank: ["tracks", "flaps"],
        spanish: "Extienda los flaps de borde de salida e inspeccione los rieles del carro",
        aircraftType: "airplane",
        partCategory: "Flaps"
      },
      {
        id: 25,
        fullEnglish: "Inspect the upper wing skin for rivet shear and fuel seepage",
        templateEnglish: "Inspect the upper wing {0} for rivet shear and fuel {1}",
        missingWords: ["skin", "seepage"],
        wordBank: ["seepage", "skin"],
        spanish: "Inspeccione la piel superior del ala por cizallamiento de remaches y fuga de combustible",
        aircraftType: "airplane",
        partCategory: "Piel Alar"
      },
      {
        id: 26,
        fullEnglish: "Check the main spar web for delamination and corrosion",
        templateEnglish: "Check the main {0} web for delamination and {1}",
        missingWords: ["spar", "corrosion"],
        wordBank: ["corrosion", "spar"],
        spanish: "Revise el alma del larguero principal por delaminación y corrosión",
        aircraftType: "airplane",
        partCategory: "Larguero Alar"
      },
      {
        id: 27,
        fullEnglish: "Verify free travel of the right aileron balance tab",
        templateEnglish: "Verify free travel of the right {0} balance {1}",
        missingWords: ["aileron", "tab"],
        wordBank: ["tab", "aileron"],
        spanish: "Verifique el recorrido libre de la aleta compensadora del alerón derecho",
        aircraftType: "airplane",
        partCategory: "Alerón y Tab"
      },
      {
        id: 28,
        fullEnglish: "Test the pneumatic leading edge deice boots for leaks",
        templateEnglish: "Test the pneumatic {0} {1} deice boots for leaks",
        missingWords: ["leading", "edge"],
        wordBank: ["edge", "leading"],
        spanish: "Pruebe las botas descongeladoras neumáticas del borde de ataque por fugas",
        aircraftType: "airplane",
        partCategory: "Borde de Ataque"
      },
      {
        id: 29,
        fullEnglish: "Measure clearance between the wing rib and fuel line",
        templateEnglish: "Measure clearance between the wing {0} and fuel {1}",
        missingWords: ["rib", "line"],
        wordBank: ["line", "rib"],
        spanish: "Mida el espacio libre entre la costilla del ala y la línea de combustible",
        aircraftType: "airplane",
        partCategory: "Costilla"
      },
      {
        id: 30,
        fullEnglish: "Inspect the slotted flaps for roller wear and binding",
        templateEnglish: "Inspect the slotted {0} for roller wear and {1}",
        missingWords: ["flaps", "binding"],
        wordBank: ["binding", "flaps"],
        spanish: "Inspeccione los flaps ranurados por desgaste de rodillos y atascamiento",
        aircraftType: "airplane",
        partCategory: "Flaps"
      },
      {
        id: 31,
        fullEnglish: "Check the wing tip navigation light and fairing bolts",
        templateEnglish: "Check the wing tip navigation light and fairing {0}",
        missingWords: ["bolts"],
        wordBank: ["bolts", "nuts"],
        spanish: "Revise la luz de navegación de punta de ala y los pernos del carenado",
        aircraftType: "airplane",
        partCategory: "Punta de Ala y Pernos"
      },
      {
        id: 32,
        fullEnglish: "Tighten the attachment nuts on the aileron bellcrank",
        templateEnglish: "Tighten the attachment {0} on the aileron {1}",
        missingWords: ["nuts", "bellcrank"],
        wordBank: ["bellcrank", "nuts"],
        spanish: "Apriete las tuercas de sujeción en el balancín acodado del alerón",
        aircraftType: "airplane",
        partCategory: "Tuercas y Alerón"
      },
      {
        id: 33,
        fullEnglish: "Perform eddy current testing on the lower spar cap",
        templateEnglish: "Perform eddy current testing on the lower {0} {1}",
        missingWords: ["spar", "cap"],
        wordBank: ["cap", "spar"],
        spanish: "Realice pruebas de corrientes de Foucault en la cabeza del larguero inferior",
        aircraftType: "airplane",
        partCategory: "Larguero"
      },
      {
        id: 34,
        fullEnglish: "Inspect the honeycomb composite skin on the trailing edge",
        templateEnglish: "Inspect the honeycomb composite {0} on the trailing {1}",
        missingWords: ["skin", "edge"],
        wordBank: ["edge", "skin"],
        spanish: "Inspeccione la piel compuesta de nido de abeja en el borde de salida",
        aircraftType: "airplane",
        partCategory: "Piel y Borde de Salida"
      },
      {
        id: 35,
        fullEnglish: "Check the flap asymmetry sensor and mechanical drive shaft",
        templateEnglish: "Check the {0} asymmetry sensor and mechanical drive {1}",
        missingWords: ["flap", "shaft"],
        wordBank: ["shaft", "flap"],
        spanish: "Revise el sensor de asimetría de flap y el eje de transmisión mecánica",
        aircraftType: "airplane",
        partCategory: "Flap y Ejes"
      },
      {
        id: 36,
        fullEnglish: "Inspect the leading edge slats for smooth hydraulic deployment",
        templateEnglish: "Inspect the {0} {1} slats for smooth hydraulic deployment",
        missingWords: ["leading", "edge"],
        wordBank: ["edge", "leading"],
        spanish: "Inspeccione los slats del borde de ataque para un despliegue hidráulico suave",
        aircraftType: "airplane",
        partCategory: "Borde de Ataque y Slats"
      },
      {
        id: 37,
        fullEnglish: "Check the wing rib lightening holes for burrs and cracks",
        templateEnglish: "Check the wing {0} lightening holes for burrs and {1}",
        missingWords: ["rib", "cracks"],
        wordBank: ["cracks", "rib"],
        spanish: "Revise los orificios de alivio de la costilla alar por rebabas y grietas",
        aircraftType: "airplane",
        partCategory: "Costilla"
      },
      {
        id: 38,
        fullEnglish: "Verify correct rigging tension on the aileron cables",
        templateEnglish: "Verify correct rigging {0} on the {1} cables",
        missingWords: ["tension", "aileron"],
        wordBank: ["aileron", "tension"],
        spanish: "Verifique la tensión de reglaje correcta en los cables del alerón",
        aircraftType: "airplane",
        partCategory: "Alerón y Cables"
      },
      {
        id: 39,
        fullEnglish: "Seal the wet wing fuel tank skin with polysulfide sealant",
        templateEnglish: "Seal the wet wing fuel tank {0} with polysulfide {1}",
        missingWords: ["skin", "sealant"],
        wordBank: ["sealant", "skin"],
        spanish: "Selle la piel del tanque de combustible de ala húmeda con sellador de polisulfuro",
        aircraftType: "airplane",
        partCategory: "Piel y Tanques"
      },
      {
        id: 40,
        fullEnglish: "Inspect the wing attach bolts for micro pitting corrosion",
        templateEnglish: "Inspect the wing attach {0} for micro pitting {1}",
        missingWords: ["bolts", "corrosion"],
        wordBank: ["corrosion", "bolts"],
        spanish: "Inspeccione los pernos de unión del ala por corrosión de micro picaduras",
        aircraftType: "airplane",
        partCategory: "Pernos Estructurales"
      }
    ]
  },
  {
    playId: 3,
    title: "PLAY 3: ORACIONES 41 - 60",
    subtitle: "Empennage, Timón, Elevador y Estabilizadores",
    ataChapter: "ATA 55 & ATA 27 • EMPENAJE Y MANDOS DE VUELO",
    questions: [
      {
        id: 41,
        fullEnglish: "Inspect the horizontal stabilizer spar for fatigue cracking",
        templateEnglish: "Inspect the horizontal {0} {1} for fatigue cracking",
        missingWords: ["stabilizer", "spar"],
        wordBank: ["spar", "stabilizer"],
        spanish: "Inspeccione el larguero del estabilizador horizontal por grietas de fatiga",
        aircraftType: "airplane",
        partCategory: "Estabilizador Horizontal"
      },
      {
        id: 42,
        fullEnglish: "Check the rudder pedals for smooth travel without friction",
        templateEnglish: "Check the {0} pedals for smooth travel without {1}",
        missingWords: ["rudder", "friction"],
        wordBank: ["friction", "rudder"],
        spanish: "Revise los pedales del timón de dirección por recorrido suave y sin fricción",
        aircraftType: "airplane",
        partCategory: "Timón de Dirección"
      },
      {
        id: 43,
        fullEnglish: "Inspect the elevator trim tab actuator and pushrod",
        templateEnglish: "Inspect the {0} trim tab {1} and pushrod",
        missingWords: ["elevator", "actuator"],
        wordBank: ["actuator", "elevator"],
        spanish: "Inspeccione el actuador y la varilla de empuje del compensador de profundidad",
        aircraftType: "airplane",
        partCategory: "Elevador y Actuador"
      },
      {
        id: 44,
        fullEnglish: "Check the vertical stabilizer skin for loose rivets",
        templateEnglish: "Check the vertical {0} {1} for loose rivets",
        missingWords: ["stabilizer", "skin"],
        wordBank: ["skin", "stabilizer"],
        spanish: "Revise la piel del estabilizador vertical en busca de remaches flojos",
        aircraftType: "airplane",
        partCategory: "Estabilizador Vertical"
      },
      {
        id: 45,
        fullEnglish: "Lubricate the rudder hinge pins with approved synthetic grease",
        templateEnglish: "Lubricate the {0} hinge {1} with approved synthetic grease",
        missingWords: ["rudder", "pins"],
        wordBank: ["pins", "rudder"],
        spanish: "Lubrique los pasadores de bisagra del timón con grasa sintética aprobada",
        aircraftType: "airplane",
        partCategory: "Timón y Pasadores"
      },
      {
        id: 46,
        fullEnglish: "Torque the elevator hinge bolts to standard maintenance manual specs",
        templateEnglish: "Torque the {0} hinge {1} to standard maintenance manual specs",
        missingWords: ["elevator", "bolts"],
        wordBank: ["bolts", "elevator"],
        spanish: "Aplique torque a los pernos de bisagra del elevador según manual de mantenimiento",
        aircraftType: "airplane",
        partCategory: "Elevador y Pernos"
      },
      {
        id: 47,
        fullEnglish: "Inspect the empennage tail cone for exhaust heat discoloration",
        templateEnglish: "Inspect the {0} tail {1} for exhaust heat discoloration",
        missingWords: ["empennage", "cone"],
        wordBank: ["cone", "empennage"],
        spanish: "Inspeccione el cono de cola del empenaje por decoloración térmica de escape",
        aircraftType: "airplane",
        partCategory: "Empenaje y Cono"
      },
      {
        id: 48,
        fullEnglish: "Verify safety wire on the rudder cable turnbuckles",
        templateEnglish: "Verify safety wire on the {0} cable {1}",
        missingWords: ["rudder", "turnbuckles"],
        wordBank: ["turnbuckles", "rudder"],
        spanish: "Verifique el alambre de frenar en los tensores del cable del timón",
        aircraftType: "airplane",
        partCategory: "Timón y Cables"
      },
      {
        id: 49,
        fullEnglish: "Check the elevator balance weights for security and rust",
        templateEnglish: "Check the {0} balance {1} for security and rust",
        missingWords: ["elevator", "weights"],
        wordBank: ["weights", "elevator"],
        spanish: "Revise los contrapesos del elevador por fijación y óxido",
        aircraftType: "airplane",
        partCategory: "Elevador"
      },
      {
        id: 50,
        fullEnglish: "Inspect the pitch trim jack screw for thread wear",
        templateEnglish: "Inspect the pitch trim {0} {1} for thread wear",
        missingWords: ["jack", "screw"],
        wordBank: ["screw", "jack"],
        spanish: "Inspeccione el husillo roscado del compensador de cabeceo por desgaste de rosca",
        aircraftType: "airplane",
        partCategory: "Husillo de Trim"
      },
      {
        id: 51,
        fullEnglish: "Verify rudder stops limit angular travel correctly",
        templateEnglish: "Verify {0} {1} limit angular travel correctly",
        missingWords: ["rudder", "stops"],
        wordBank: ["stops", "rudder"],
        spanish: "Verifique que los topes del timón limiten el recorrido angular correctamente",
        aircraftType: "airplane",
        partCategory: "Timón y Topes"
      },
      {
        id: 52,
        fullEnglish: "Examine the elevator torque tube for distortion and cracks",
        templateEnglish: "Examine the elevator {0} {1} for distortion and cracks",
        missingWords: ["torque", "tube"],
        wordBank: ["tube", "torque"],
        spanish: "Examine el tubo de torsión del elevador en busca de distorsión y fisuras",
        aircraftType: "airplane",
        partCategory: "Elevador y Tubo de Torsión"
      },
      {
        id: 53,
        fullEnglish: "Inspect the fiberglass rudder fairing for cracks around fasteners",
        templateEnglish: "Inspect the fiberglass {0} {1} for cracks around fasteners",
        missingWords: ["rudder", "fairing"],
        wordBank: ["fairing", "rudder"],
        spanish: "Inspeccione el carenado de fibra de vidrio del timón por grietas alrededor de sujetadores",
        aircraftType: "airplane",
        partCategory: "Carenado y Timón"
      },
      {
        id: 54,
        fullEnglish: "Replace damaged nuts on the horizontal stabilizer bracket",
        templateEnglish: "Replace damaged {0} on the horizontal {1} bracket",
        missingWords: ["nuts", "stabilizer"],
        wordBank: ["stabilizer", "nuts"],
        spanish: "Reemplace las tuercas dañadas en el soporte del estabilizador horizontal",
        aircraftType: "airplane",
        partCategory: "Tuercas y Estabilizador"
      },
      {
        id: 55,
        fullEnglish: "Check the vertical fin rear spar attach fittings",
        templateEnglish: "Check the vertical fin rear {0} attach {1}",
        missingWords: ["spar", "fittings"],
        wordBank: ["fittings", "spar"],
        spanish: "Revise los herrajes de fijación del larguero trasero de la aleta vertical",
        aircraftType: "airplane",
        partCategory: "Larguero y Herrajes"
      },
      {
        id: 56,
        fullEnglish: "Inspect the elevator trim tab control horn for play",
        templateEnglish: "Inspect the {0} trim tab control {1} for play",
        missingWords: ["elevator", "horn"],
        wordBank: ["horn", "elevator"],
        spanish: "Inspeccione el brazo de mando del compensador de elevador por juego",
        aircraftType: "airplane",
        partCategory: "Elevador y Cuerno de Mando"
      },
      {
        id: 57,
        fullEnglish: "Verify bonding jumper wire across the rudder hinges",
        templateEnglish: "Verify bonding {0} wire across the {1} hinges",
        missingWords: ["jumper", "rudder"],
        wordBank: ["rudder", "jumper"],
        spanish: "Verifique el cable de masa puente a través de las bisagras del timón",
        aircraftType: "airplane",
        partCategory: "Timón y Cables de Masa"
      },
      {
        id: 58,
        fullEnglish: "Check the empennage deice boots for air pressure hold",
        templateEnglish: "Check the {0} deice {1} for air pressure hold",
        missingWords: ["empennage", "boots"],
        wordBank: ["boots", "empennage"],
        spanish: "Revise las botas descongeladoras del empenaje para comprobar retención de presión de aire",
        aircraftType: "airplane",
        partCategory: "Empenaje y Descongelación"
      },
      {
        id: 59,
        fullEnglish: "Inspect the static discharge wicks on the elevator trailing edge",
        templateEnglish: "Inspect the static discharge {0} on the {1} trailing edge",
        missingWords: ["wicks", "elevator"],
        wordBank: ["elevator", "wicks"],
        spanish: "Inspeccione las mechas de descarga estática en el borde de salida del elevador",
        aircraftType: "airplane",
        partCategory: "Elevador y Descargadores"
      },
      {
        id: 60,
        fullEnglish: "Install cotter pins on all elevator hinge pin castellated nuts",
        templateEnglish: "Install cotter {0} on all elevator hinge pin castellated {1}",
        missingWords: ["pins", "nuts"],
        wordBank: ["nuts", "pins"],
        spanish: "Instale pasadores de chaveta en todas las tuercas almenadas de bisagras del elevador",
        aircraftType: "airplane",
        partCategory: "Tuercas y Pasadores"
      }
    ]
  },
  {
    playId: 4,
    title: "PLAY 4: ORACIONES 61 - 80",
    subtitle: "Motores Recíprocos: Cárter, Bujías, Pistones y Turbo",
    ataChapter: "ATA 71 & ATA 72 • MOTORES DE PISTÓN Y COMPONENTES",
    questions: [
      {
        id: 61,
        fullEnglish: "Inspect the aluminum crankcase for oil leaks and hairline fractures",
        templateEnglish: "Inspect the aluminum {0} for oil leaks and hairline {1}",
        missingWords: ["crankcase", "fractures"],
        wordBank: ["fractures", "crankcase"],
        spanish: "Inspeccione el cárter de aluminio por fugas de aceite y fracturas capilares",
        aircraftType: "both",
        partCategory: "Cárter"
      },
      {
        id: 62,
        fullEnglish: "Remove and clean every aviation spark plug with glass beads",
        templateEnglish: "Remove and clean every aviation {0} {1} with glass beads",
        missingWords: ["spark", "plug"],
        wordBank: ["plug", "spark"],
        spanish: "Retire y limpie cada bujía de aviación con microesferas de vidrio",
        aircraftType: "both",
        partCategory: "Bujía"
      },
      {
        id: 63,
        fullEnglish: "Check the turbocharger turbine wheel for carbon build up and rub marks",
        templateEnglish: "Check the {0} turbine wheel for carbon {1} up and rub marks",
        missingWords: ["turbocharger", "build"],
        wordBank: ["build", "turbocharger"],
        spanish: "Revise la rueda de turbina del turbocargador por acumulación de carbón y marcas de roce",
        aircraftType: "both",
        partCategory: "Turbo Cargador"
      },
      {
        id: 64,
        fullEnglish: "Inspect the exhaust manifold pipes for heat cracks and blow by",
        templateEnglish: "Inspect the {0} manifold {1} for heat cracks and blow by",
        missingWords: ["exhaust", "pipes"],
        wordBank: ["pipes", "exhaust"],
        spanish: "Inspeccione las tuberías del colector de escape por grietas térmicas y fugas de gas",
        aircraftType: "both",
        partCategory: "Escape"
      },
      {
        id: 65,
        fullEnglish: "Measure the spark plug electrode gap using a round wire gauge",
        templateEnglish: "Measure the {0} {1} electrode gap using a round wire gauge",
        missingWords: ["spark", "plug"],
        wordBank: ["plug", "spark"],
        spanish: "Mida la separación del electrodo de la bujía utilizando un calibrador de alambre redondo",
        aircraftType: "both",
        partCategory: "Bujía"
      },
      {
        id: 66,
        fullEnglish: "Check the engine crankcase breather tube for ice blockage",
        templateEnglish: "Check the engine {0} {1} tube for ice blockage",
        missingWords: ["crankcase", "breather"],
        wordBank: ["breather", "crankcase"],
        spanish: "Revise el tubo de venteo del cárter del motor para evitar obstrucciones por hielo",
        aircraftType: "both",
        partCategory: "Cárter y Respiradero"
      },
      {
        id: 67,
        fullEnglish: "Inspect the turbocharger wastegate actuator for smooth linkage travel",
        templateEnglish: "Inspect the {0} wastegate {1} for smooth linkage travel",
        missingWords: ["turbocharger", "actuator"],
        wordBank: ["actuator", "turbocharger"],
        spanish: "Inspeccione el actuador de compuerta de alivio del turbocargador por recorrido suave",
        aircraftType: "both",
        partCategory: "Turbo Cargador y Actuador"
      },
      {
        id: 68,
        fullEnglish: "Torque the cylinder base nuts in the specified cross sequence",
        templateEnglish: "Torque the cylinder base {0} in the specified {1} sequence",
        missingWords: ["nuts", "cross"],
        wordBank: ["cross", "nuts"],
        spanish: "Aplique torque a las tuercas de la base del cilindro en la secuencia cruzada especificada",
        aircraftType: "both",
        partCategory: "Tuercas y Cilindros"
      },
      {
        id: 69,
        fullEnglish: "Check the engine alternator drive belt for tension and cracks",
        templateEnglish: "Check the engine {0} drive {1} for tension and cracks",
        missingWords: ["alternator", "belt"],
        wordBank: ["belt", "alternator"],
        spanish: "Revise la correa de transmisión del alternador del motor por tensión y grietas",
        aircraftType: "both",
        partCategory: "Alternador y Correas"
      },
      {
        id: 70,
        fullEnglish: "Inspect the engine exhaust muffler interior baffle for fatigue",
        templateEnglish: "Inspect the engine {0} muffler interior {1} for fatigue",
        missingWords: ["exhaust", "baffle"],
        wordBank: ["baffle", "exhaust"],
        spanish: "Inspeccione el deflector interior del silenciador de escape del motor por fatiga",
        aircraftType: "both",
        partCategory: "Escape y Silenciador"
      },
      {
        id: 71,
        fullEnglish: "Replace the spark plug copper gaskets at every reinstallation",
        templateEnglish: "Replace the {0} {1} copper gaskets at every reinstallation",
        missingWords: ["spark", "plug"],
        wordBank: ["plug", "spark"],
        spanish: "Reemplace las juntas de cobre de las bujías en cada reinstalación",
        aircraftType: "both",
        partCategory: "Bujía y Juntas"
      },
      {
        id: 72,
        fullEnglish: "Check the starter motor mounting bolts for secure safety wire",
        templateEnglish: "Check the starter motor mounting {0} for secure {1} wire",
        missingWords: ["bolts", "safety"],
        wordBank: ["safety", "bolts"],
        spanish: "Revise los pernos de montaje del motor de arranque por alambre de frenar seguro",
        aircraftType: "both",
        partCategory: "Pernos de Arranque"
      },
      {
        id: 73,
        fullEnglish: "Examine the crankcase split line for oil weeping",
        templateEnglish: "Examine the {0} split line for oil {1}",
        missingWords: ["crankcase", "weeping"],
        wordBank: ["weeping", "crankcase"],
        spanish: "Examine la línea de partición del cárter en busca de rezume de aceite",
        aircraftType: "both",
        partCategory: "Cárter"
      },
      {
        id: 74,
        fullEnglish: "Inspect the turbocharger compressor impeller blades for nicks",
        templateEnglish: "Inspect the {0} compressor {1} blades for nicks",
        missingWords: ["turbocharger", "impeller"],
        wordBank: ["impeller", "turbocharger"],
        spanish: "Inspeccione los álabes del impulsor del compresor del turbocargador por muescas",
        aircraftType: "both",
        partCategory: "Turbo Cargador y Compresor"
      },
      {
        id: 75,
        fullEnglish: "Test alternator output voltage under maximum electrical load",
        templateEnglish: "Test {0} output {1} under maximum electrical load",
        missingWords: ["alternator", "voltage"],
        wordBank: ["voltage", "alternator"],
        spanish: "Pruebe el voltaje de salida del alternador bajo carga eléctrica máxima",
        aircraftType: "both",
        partCategory: "Alternador"
      },
      {
        id: 76,
        fullEnglish: "Inspect the exhaust pipe spring loaded slip joints",
        templateEnglish: "Inspect the {0} pipe spring loaded {1} joints",
        missingWords: ["exhaust", "slip"],
        wordBank: ["slip", "exhaust"],
        spanish: "Inspeccione las uniones deslizantes con resorte del tubo de escape",
        aircraftType: "both",
        partCategory: "Escape"
      },
      {
        id: 77,
        fullEnglish: "Install new spark plug ignition harnesses and verify terminal contact",
        templateEnglish: "Install new {0} {1} ignition harnesses and verify terminal contact",
        missingWords: ["spark", "plug"],
        wordBank: ["plug", "spark"],
        spanish: "Instale nuevos arneses de encendido de bujías y verifique el contacto del terminal",
        aircraftType: "both",
        partCategory: "Bujía y Encendido"
      },
      {
        id: 78,
        fullEnglish: "Check the crankcase oil return lines for loose fittings",
        templateEnglish: "Check the {0} oil return lines for loose {1}",
        missingWords: ["crankcase", "fittings"],
        wordBank: ["fittings", "crankcase"],
        spanish: "Revise las líneas de retorno de aceite del cárter por accesorios flojos",
        aircraftType: "both",
        partCategory: "Cárter y Líneas de Aceite"
      },
      {
        id: 79,
        fullEnglish: "Inspect the turbocharger oil supply hose for heat hardening",
        templateEnglish: "Inspect the {0} oil supply {1} for heat hardening",
        missingWords: ["turbocharger", "hose"],
        wordBank: ["hose", "turbocharger"],
        spanish: "Inspeccione la manguera de suministro de aceite del turbocargador por endurecimiento térmico",
        aircraftType: "both",
        partCategory: "Turbo y Mangueras"
      },
      {
        id: 80,
        fullEnglish: "Check the alternator cooling blast tube for proper airflow alignment",
        templateEnglish: "Check the {0} cooling blast tube for proper airflow {1}",
        missingWords: ["alternator", "alignment"],
        wordBank: ["alignment", "alternator"],
        spanish: "Revise el tubo de soplado de refrigeración del alternador para correcta alineación de aire",
        aircraftType: "both",
        partCategory: "Alternador y Refrigeración"
      }
    ]
  },
  {
    playId: 5,
    title: "PLAY 5: ORACIONES 81 - 100",
    subtitle: "Sistema de Aceite: Bomba, Mangueras, Filtros y O-Rings",
    ataChapter: "ATA 79 • SISTEMA DE LUBRICACIÓN Y FILTRADO",
    questions: [
      {
        id: 81,
        fullEnglish: "Remove the engine oil filter and inspect the pleated element",
        templateEnglish: "Remove the engine {0} filter and inspect the pleated {1}",
        missingWords: ["oil", "element"],
        wordBank: ["element", "oil"],
        spanish: "Retire el filtro de aceite del motor e inspeccione el elemento plisado",
        aircraftType: "both",
        partCategory: "Filtro de Aceite"
      },
      {
        id: 82,
        fullEnglish: "Inspect the engine oil pump gears for pitting and backlash",
        templateEnglish: "Inspect the engine {0} {1} gears for pitting and backlash",
        missingWords: ["oil", "pump"],
        wordBank: ["pump", "oil"],
        spanish: "Inspeccione los engranajes de la bomba de aceite del motor por picaduras y juego",
        aircraftType: "both",
        partCategory: "Bomba de Aceite"
      },
      {
        id: 83,
        fullEnglish: "Replace the rubber o-ring seal on the oil pressure relief valve",
        templateEnglish: "Replace the rubber {0} seal on the oil {1} relief valve",
        missingWords: ["o-ring", "pressure"],
        wordBank: ["pressure", "o-ring"],
        spanish: "Reemplace el sello o-ring de goma en la válvula de alivio de presión de aceite",
        aircraftType: "both",
        partCategory: "O-Ring y Válvulas"
      },
      {
        id: 84,
        fullEnglish: "Inspect the flexible oil hose for chafing against the engine mount",
        templateEnglish: "Inspect the flexible {0} {1} for chafing against the engine mount",
        missingWords: ["oil", "hose"],
        wordBank: ["hose", "oil"],
        spanish: "Inspeccione la manguera flexible de aceite por rozamiento contra el soporte del motor",
        aircraftType: "both",
        partCategory: "Manguera de Aceite"
      },
      {
        id: 85,
        fullEnglish: "Check the oil sump drain plug magnet for metal flakes",
        templateEnglish: "Check the {0} sump drain plug {1} for metal flakes",
        missingWords: ["oil", "magnet"],
        wordBank: ["magnet", "oil"],
        spanish: "Revise el imán del tapón de drenaje del cárter de aceite en busca de virutas metálicas",
        aircraftType: "both",
        partCategory: "Cárter e Imán de Drenaje"
      },
      {
        id: 86,
        fullEnglish: "Inspect the oil cooler matrix fins for dust blockage and bent core",
        templateEnglish: "Inspect the {0} cooler matrix {1} for dust blockage and bent core",
        missingWords: ["oil", "fins"],
        wordBank: ["fins", "oil"],
        spanish: "Inspeccione las aletas del enfriador de aceite por bloqueo de polvo y panal doblado",
        aircraftType: "both",
        partCategory: "Enfriador de Aceite"
      },
      {
        id: 87,
        fullEnglish: "Lubricate the new o-ring with clean engine oil before installation",
        templateEnglish: "Lubricate the new {0} with clean engine {1} before installation",
        missingWords: ["o-ring", "oil"],
        wordBank: ["oil", "o-ring"],
        spanish: "Lubrique el nuevo o-ring con aceite de motor limpio antes de la instalación",
        aircraftType: "both",
        partCategory: "O-Ring y Aceite"
      },
      {
        id: 88,
        fullEnglish: "Pressure test the high pressure oil hose after swaging the fittings",
        templateEnglish: "Pressure test the high pressure {0} {1} after swaging the fittings",
        missingWords: ["oil", "hose"],
        wordBank: ["hose", "oil"],
        spanish: "Pruebe la presión de la manguera de aceite de alta presión después de crimpar los acoples",
        aircraftType: "both",
        partCategory: "Manguera de Aceite"
      },
      {
        id: 89,
        fullEnglish: "Check the engine oil pump drive shaft shear section",
        templateEnglish: "Check the engine {0} {1} drive shaft shear section",
        missingWords: ["oil", "pump"],
        wordBank: ["pump", "oil"],
        spanish: "Revise la sección de cizallamiento del eje de mando de la bomba de aceite",
        aircraftType: "both",
        partCategory: "Bomba de Aceite y Ejes"
      },
      {
        id: 90,
        fullEnglish: "Tighten the oil filter adapter bolts to specified torque",
        templateEnglish: "Tighten the {0} filter adapter {1} to specified torque",
        missingWords: ["oil", "bolts"],
        wordBank: ["bolts", "oil"],
        spanish: "Apriete los pernos del adaptador del filtro de aceite al torque especificado",
        aircraftType: "both",
        partCategory: "Filtro de Aceite y Pernos"
      },
      {
        id: 91,
        fullEnglish: "Inspect the scavenge oil pump suction screen for debris",
        templateEnglish: "Inspect the scavenge {0} {1} suction screen for debris",
        missingWords: ["oil", "pump"],
        wordBank: ["pump", "oil"],
        spanish: "Inspeccione la malla de succión de la bomba de aceite de barrido en busca de residuos",
        aircraftType: "both",
        partCategory: "Bomba de Aceite"
      },
      {
        id: 92,
        fullEnglish: "Verify that the fluoroelastomer o-ring resists high synthetic oil temperatures",
        templateEnglish: "Verify that the fluoroelastomer {0} resists high synthetic {1} temperatures",
        missingWords: ["o-ring", "oil"],
        wordBank: ["oil", "o-ring"],
        spanish: "Verifique que el o-ring de fluoroelastómero resista las altas temperaturas de aceite sintético",
        aircraftType: "both",
        partCategory: "O-Ring y Aceite"
      },
      {
        id: 93,
        fullEnglish: "Check the teflon oil hose fire sleeve for cuts and degradation",
        templateEnglish: "Check the teflon {0} {1} fire sleeve for cuts and degradation",
        missingWords: ["oil", "hose"],
        wordBank: ["hose", "oil"],
        spanish: "Revise la funda ignífuga de la manguera de aceite de teflón por cortes y degradación",
        aircraftType: "both",
        partCategory: "Manguera Ignífuga"
      },
      {
        id: 94,
        fullEnglish: "Drain the contaminated engine oil into an approved recycling container",
        templateEnglish: "Drain the contaminated engine {0} into an approved {1} container",
        missingWords: ["oil", "recycling"],
        wordBank: ["recycling", "oil"],
        spanish: "Drene el aceite de motor contaminado en un recipiente de reciclaje aprobado",
        aircraftType: "both",
        partCategory: "Aceite"
      },
      {
        id: 95,
        fullEnglish: "Inspect the oil pressure transmitter electrical connector for fluid contamination",
        templateEnglish: "Inspect the {0} pressure transmitter electrical {1} for fluid contamination",
        missingWords: ["oil", "connector"],
        wordBank: ["connector", "oil"],
        spanish: "Inspeccione el conector eléctrico del transmisor de presión de aceite por contaminación de fluido",
        aircraftType: "both",
        partCategory: "Transmisor de Aceite"
      },
      {
        id: 96,
        fullEnglish: "Replace the hardened o-ring on the oil tank filler neck cap",
        templateEnglish: "Replace the hardened {0} on the {1} tank filler neck cap",
        missingWords: ["o-ring", "oil"],
        wordBank: ["oil", "o-ring"],
        spanish: "Reemplace el o-ring endurecido en la tapa del cuello de llenado del tanque de aceite",
        aircraftType: "both",
        partCategory: "O-Ring y Tanque"
      },
      {
        id: 97,
        fullEnglish: "Inspect the oil suction hose clamps for proper tightness",
        templateEnglish: "Inspect the {0} suction {1} clamps for proper tightness",
        missingWords: ["oil", "hose"],
        wordBank: ["hose", "oil"],
        spanish: "Inspeccione las abrazaderas de la manguera de succión de aceite para verificar su apriete",
        aircraftType: "both",
        partCategory: "Manguera y Abrazaderas"
      },
      {
        id: 98,
        fullEnglish: "Check the engine oil cooler bypass valve for free spring movement",
        templateEnglish: "Check the engine {0} cooler {1} valve for free spring movement",
        missingWords: ["oil", "bypass"],
        wordBank: ["bypass", "oil"],
        spanish: "Revise la válvula de derivación del enfriador de aceite del motor por libre movimiento del resorte",
        aircraftType: "both",
        partCategory: "Enfriador y Válvulas"
      },
      {
        id: 99,
        fullEnglish: "Cut open the oil filter canister to examine paper pleats",
        templateEnglish: "Cut open the {0} {1} canister to examine paper pleats",
        missingWords: ["oil", "filter"],
        wordBank: ["filter", "oil"],
        spanish: "Abra el bote del filtro de aceite para examinar los pliegues de papel",
        aircraftType: "both",
        partCategory: "Filtro de Aceite"
      },
      {
        id: 100,
        fullEnglish: "Inspect the engine oil pump housing for internal scoring and wear",
        templateEnglish: "Inspect the engine {0} {1} housing for internal scoring and wear",
        missingWords: ["oil", "pump"],
        wordBank: ["pump", "oil"],
        spanish: "Inspeccione la carcasa de la bomba de aceite del motor por rayaduras internas y desgaste",
        aircraftType: "both",
        partCategory: "Bomba de Aceite"
      }
    ]
  }
];

import { Module7Play } from "./game2Module7Types";
import { makeSquawk } from "./game2Module7Helper";

export const MODULE_7_PART_1: Module7Play[] = [
  // =========================================================================
  // PLAY 1: TREN DE ATERRIZAJE, FRENOS Y SHIMMY DAMPER (ATA 32)
  // =========================================================================
  {
    playId: 1,
    title: "PLAY 1: Tren de Aterrizaje, Frenos y Shimmy Damper (ATA 32)",
    subtitle: "Reportes de Hangar • Falla de Extensión, Presión de Ruedas y Fugas Hidráulicas",
    ataChapter: "ATA 32 Landing Gear",
    aircraftModel: "Cessna 150 / 172 / 210 / Caravan",
    questions: [
      makeSquawk(
        1,
        "El piloto reporta: falla en el tren de aterrizaje, no sube ni baja",
        "The pilot reports: landing gear failure, it does not retract or extend",
        "ATA 32",
        "Cessna 210 Centurion",
        "Tren de Aterrizaje / Landing Gear",
        "Inspeccionar el actuador electrohidráulico, nivel de líquido y microinterruptores de fin de carrera."
      ),
      makeSquawk(
        2,
        "El piloto reporta: rueda del tren principal baja de presión",
        "The pilot reports: main landing gear tire pressure is low",
        "ATA 32",
        "Cessna 172 Skyhawk",
        "Neumáticos y Ruedas / Tires & Wheels",
        "Verificar presión con manómetro calibrado, núcleo de válvula Schrader y verificar si hay pinchaduras."
      ),
      makeSquawk(
        3,
        "El piloto reporta: fuga de fluido hidráulico en el amortiguador de bamboleo",
        "The pilot reports: hydraulic fluid leak on the shimmy damper",
        "ATA 32",
        "Cessna 150 / 172",
        "Amortiguador de Bamboleo / Shimmy Damper",
        "Desmontar el shimmy damper, inspeccionar sellos O-ring, vástago por rayaduras y rellenar con fluido MIL-H-5606."
      ),
      makeSquawk(
        4,
        "El piloto reporta: vibración excesiva de la rueda de nariz durante el carreteo",
        "The pilot reports: excessive nose wheel vibration during taxi",
        "ATA 32",
        "Cessna 172 Skyhawk",
        "Tren de Nariz / Nose Gear",
        "Comprobar balanceo del neumático, holgura en pernos de tijera y nivel de fluido del shimmy damper."
      ),
      makeSquawk(
        5,
        "El piloto reporta: pedal de freno izquierdo esponjoso y sin presión",
        "The pilot reports: left brake pedal is spongy with no pressure",
        "ATA 32",
        "Cessna 150 / 172",
        "Frenos Hidráulicos / Hydraulic Brakes",
        "Purgar el circuito hidráulico de freno izquierdo para expulsar aire y verificar sellos del cilindro maestro."
      ),
      makeSquawk(
        6,
        "El piloto reporta: la luz verde del tren de nariz no enciende cuando el tren está abajo",
        "The pilot reports: nose gear green light does not illuminate when gear is down",
        "ATA 32",
        "Cessna 210 Centurion",
        "Indicación de Posición / Position Indication",
        "Comprobar microinterruptor downlock de nariz, cableado eléctrico y sustituir bombilla de prueba."
      ),
      makeSquawk(
        7,
        "El piloto reporta: desgaste excesivo en el lado exterior del neumático principal derecho",
        "The pilot reports: excessive wear on the outer shoulder of the right main tire",
        "ATA 32",
        "Cessna 172 Skyhawk",
        "Neumáticos / Tires",
        "Comprobar alineación de la rueda (camber/toe-in) y condición de las arandelas espaciadoras del eje."
      ),
      makeSquawk(
        8,
        "El piloto reporta: el seguro mecánico del tren de nariz no traba arriba",
        "The pilot reports: nose gear mechanical up-lock does not engage",
        "ATA 32",
        "Cessna 210 Centurion",
        "Mecanismo de Retracción / Retraction Mechanism",
        "Inspeccionar tensión del resorte del gancho uplock, lubricación y ajuste del cable de destrabe."
      ),
      makeSquawk(
        9,
        "El piloto reporta: fuga de aceite hidráulico en el cilindro maestro de freno derecho",
        "The pilot reports: hydraulic oil leak at the right brake master cylinder",
        "ATA 32",
        "Cessna 182 / 210",
        "Cilindro Maestro / Master Cylinder",
        "Reemplazar empaques O-ring de nitrilo del pistón y verificar apriete de los racores hidráulicos."
      ),
      makeSquawk(
        10,
        "El piloto reporta: la bocina de advertencia del tren suena con acelerador alto",
        "The pilot reports: landing gear warning horn sounds at high throttle setting",
        "ATA 32",
        "Cessna 210 Centurion",
        "Sistema de Alerta / Warning System",
        "Ajustar el microinterruptor de la palanca de gases (throttle switch) según manual de mantenimiento."
      ),
      makeSquawk(
        11,
        "El piloto reporta: el tren de aterrizaje sube muy lento después del despegue",
        "The pilot reports: landing gear retracts very slowly after takeoff",
        "ATA 32",
        "Cessna 210 Centurion",
        "Bomba Hidráulica / Hydraulic Pump",
        "Verificar presión de la bomba hidráulica eléctrica (1500 PSI) y filtro de succión de fluido."
      ),
      makeSquawk(
        12,
        "El piloto reporta: disco de freno derecho sobrecalentado y con decoloración azul",
        "The pilot reports: right brake disc overheated with blue discoloration",
        "ATA 32",
        "Cessna 172 Skyhawk",
        "Frenos / Brake Assemblies",
        "Inspeccionar pistón de freno trabado, pastillas desgastadas y medir alabeo del disco con micrómetro."
      ),
      makeSquawk(
        13,
        "El piloto reporta: juego excesivo en la tijera de torque del tren de nariz",
        "The pilot reports: excessive play in the nose gear torque links",
        "ATA 32",
        "Cessna 150 / 172",
        "Tijeras de Dirección / Torque Links",
        "Inspeccionar bujes de bronce desgastados y reemplazar perno central con arandelas de ajuste de holgura."
      ),
      makeSquawk(
        14,
        "El piloto reporta: el puntal oleoneumático principal derecho está completamente desinflado",
        "The pilot reports: right main oleo strut is fully bottomed out",
        "ATA 32",
        "Cessna 208 Caravan",
        "Puntal Amortiguador / Oleo Strut",
        "Inspeccionar fuga en el sello raspador de nitrógeno/aceite, rellenar con fluido 5606 y presurizar nitrógeno seco."
      ),
      makeSquawk(
        15,
        "El piloto reporta: el interruptor de seguridad en tierra del tren no se activa",
        "The pilot reports: landing gear squat safety switch fails to activate",
        "ATA 32",
        "Cessna 210 Centurion",
        "Interruptor Squat / Squat Switch",
        "Ajustar la palanca del interruptor en la tijera y comprobar continuidad eléctrica en circuito abierto."
      ),
      makeSquawk(
        16,
        "El piloto reporta: tirón fuerte hacia la izquierda al aplicar los frenos en la pista",
        "The pilot reports: severe pull to the left when applying brakes on the runway",
        "ATA 32",
        "Cessna 172 Skyhawk",
        "Calibración de Frenos / Brake Calipers",
        "Verificar aire en línea derecha o contaminación por grasa en los forros de freno derechos."
      ),
      makeSquawk(
        17,
        "El piloto reporta: compuerta del tren principal izquierdo no cierra completamente",
        "The pilot reports: left main landing gear door does not close completely",
        "ATA 32",
        "Cessna 210 Centurion",
        "Compuertas de Tren / Gear Doors",
        "Inspeccionar varilla de empuje (pushrod) de la compuerta, bisagras y holgura contra la estructura."
      ),
      makeSquawk(
        18,
        "El piloto reporta: el freno de estacionamiento no retiene la presión",
        "The pilot reports: parking brake does not hold hydraulic pressure",
        "ATA 32",
        "Cessna 150 / 172",
        "Freno de Estacionamiento / Parking Brake",
        "Inspeccionar válvula de retención del freno de estacionamiento y sellos de aguja internos."
      ),
      makeSquawk(
        19,
        "El piloto reporta: olor a goma quemada y frenos calientes tras el aterrizaje",
        "The pilot reports: burning rubber smell and hot brakes after landing",
        "ATA 32",
        "Cessna 172 / 182",
        "Frenos / Brake Assemblies",
        "Comprobar que los pedales retornen libremente y que no exista arrastre residual en las pastillas."
      ),
      makeSquawk(
        20,
        "El piloto reporta: el sistema de extensión de emergencia del tren requirió excesivo esfuerzo",
        "The pilot reports: emergency gear extension system required excessive force",
        "ATA 32",
        "Cessna 210 Centurion",
        "Extensión de Emergencia / Emergency Extension",
        "Lubricar el cable de extensión manual y verificar la válvula de descarga de presión hidráulica."
      ),
    ],
  },

  // =========================================================================
  // PLAY 2: MANDOS DE VUELO, ALERONES, ELEVADOR, TIMÓN Y FLAPS (ATA 27)
  // =========================================================================
  {
    playId: 2,
    title: "PLAY 2: Mandos de Vuelo, Alerones, Elevador y Flaps (ATA 27)",
    subtitle: "Reportes de Hangar • Rigidez de Controles, Asimetría de Flaps y Compensadores",
    ataChapter: "ATA 27 Flight Controls",
    aircraftModel: "Cessna 150 / 172 / 182",
    questions: [
      makeSquawk(
        21,
        "El piloto reporta: el alerón izquierdo no sube ni baja suavemente",
        "The pilot reports: left aileron does not move up or down smoothly",
        "ATA 27",
        "Cessna 172 Skyhawk",
        "Alerones / Ailerons",
        "Inspeccionar poleas de alerón, tensión de cables según tensiómetro y bisagras por suciedad o daño."
      ),
      makeSquawk(
        22,
        "El piloto reporta: rigidez en los pedales del timón de dirección durante el vuelo",
        "The pilot reports: rudder pedals are stiff during flight",
        "ATA 27",
        "Cessna 150 Commuter",
        "Timón de Dirección / Rudder System",
        "Lubricar bujes de la barra de pedales, verificar guías de cable y resortes de centrado."
      ),
      makeSquawk(
        23,
        "El piloto reporta: el compensador del elevador está duro y requiere dos manos",
        "The pilot reports: elevator trim wheel is hard to turn and requires two hands",
        "ATA 27",
        "Cessna 172 Skyhawk",
        "Compensador / Trim Tab Control",
        "Inspeccionar el tambor del actuador de trim en la cola, cables deshilachados y varilla roscada sin grasa."
      ),
      makeSquawk(
        24,
        "El piloto reporta: el motor de los flaps eléctricos no responde al selector",
        "The pilot reports: electric flap motor does not respond to the selector switch",
        "ATA 27",
        "Cessna 172 Skyhawk",
        "Flaps Eléctricos / Wing Flaps",
        "Comprobar disyuntor de flaps (15A), interruptor de cabina y relé de accionamiento en el ala derecha."
      ),
      makeSquawk(
        25,
        "El piloto reporta: aleteo o vibración en el alerón derecho a alta velocidad",
        "The pilot reports: flutter or vibration in the right aileron at high speed",
        "ATA 27",
        "Cessna 182 Skylane",
        "Balance de Alerón / Control Surface Balance",
        "Verificar masa de contrapeso en la punta de alerón y juego libre en los cojinetes de bisagra."
      ),
      makeSquawk(
        26,
        "El piloto reporta: los flaps se extienden de manera asimétrica causando rolido",
        "The pilot reports: flaps extend asymmetrically causing aircraft roll",
        "ATA 27",
        "Cessna 172 Skyhawk",
        "Flaps / Wing Flaps",
        "Inspeccionar cable seguidor de sincronización entre alas y varillas de empuje en los rodillos."
      ),
      makeSquawk(
        27,
        "El piloto reporta: holgura excesiva y juego libre en los cuernos de mando",
        "The pilot reports: excessive play and loose control yoke in neutral position",
        "ATA 27",
        "Cessna 150 / 172",
        "Mandos de Cabina / Control Yokes",
        "Inspeccionar la junta universal (universal joint) del eje de mando y tensión de cadena de piñón."
      ),
      makeSquawk(
        28,
        "El piloto reporta: el indicador de posición de flaps marca diez grados menos",
        "The pilot reports: flap position indicator reads ten degrees lower than actual",
        "ATA 27",
        "Cessna 172 Skyhawk",
        "Indicador de Flaps / Position Indicator",
        "Ajustar el alambre sensor de posición en el mecanismo del ala izquierda según manual de servicio."
      ),
      makeSquawk(
        29,
        "El piloto reporta: el compensador de timón de dirección gira en sentido inverso",
        "The pilot reports: rudder trim control turns in the opposite direction",
        "ATA 27",
        "Cessna 182 Skylane",
        "Compensador de Timón / Rudder Trim",
        "Verificar enrutamiento de cables en el tambor de cabina para corregir inversión de giro."
      ),
      makeSquawk(
        30,
        "El piloto reporta: chirrido metálico en la polea del cable de alerón derecho",
        "The pilot reports: squeaking metallic noise in the right aileron cable pulley",
        "ATA 27",
        "Cessna 172 Skyhawk",
        "Poleas y Cables / Pulleys & Cables",
        "Inspeccionar rodamiento de la polea por atascamiento y verificar desgaste plano en el cable."
      ),
      makeSquawk(
        31,
        "El piloto reporta: el elevador se traba cerca del límite de cabeceo arriba",
        "The pilot reports: elevator binds near the full nose up limit",
        "ATA 27",
        "Cessna 150 Commuter",
        "Elevador / Elevator Controls",
        "Inspeccionar topes de recorrido mecánico (elevator stops) y verificar interferencias con cables de antena."
      ),
      makeSquawk(
        32,
        "El piloto reporta: el seguro de ráfagas no encaja en los controles de vuelo",
        "The pilot reports: control gust lock does not fit into the flight controls",
        "ATA 27",
        "Cessna 172 Skyhawk",
        "Seguro de Ráfagas / Gust Lock",
        "Comprobar alineación del orificio en la columna de control y estado del pasador del seguro."
      ),
      makeSquawk(
        33,
        "El piloto reporta: tensión del cable de timón parece baja con respuesta retardada",
        "The pilot reports: rudder cable tension feels low with delayed response",
        "ATA 27",
        "Cessna 172 Skyhawk",
        "Cables de Mando / Control Cables",
        "Medir tensión con tensiómetro aeronáutico (30 +/- 5 lbs) y ajustar tensores de tornillo en la cola."
      ),
      makeSquawk(
        34,
        "El piloto reporta: la aleta compensadora del elevador tiene juego en la bisagra",
        "The pilot reports: elevator trim tab has free play at the piano hinge",
        "ATA 27",
        "Cessna 182 Skylane",
        "Bisagras de Mando / Control Hinges",
        "Inspeccionar desgaste en el pasador de acero inoxidable de la bisagra de piano del trim tab."
      ),
      makeSquawk(
        35,
        "El piloto reporta: los flaps se retraen solos por la presión del aire",
        "The pilot reports: flaps blow up uncommanded under aerodynamic air pressure",
        "ATA 27",
        "Cessna 172 Skyhawk",
        "Actuador de Flaps / Flap Actuator",
        "Inspeccionar el tornillo sinfín (jack screw) y freno mecánico interno del motor de flaps."
      ),
      makeSquawk(
        36,
        "El piloto reporta: el mando de alerones no regresa al centro por sí solo",
        "The pilot reports: aileron control does not return to center automatically",
        "ATA 27",
        "Cessna 150 / 172",
        "Centrado de Mandos / Centering Mechanism",
        "Inspeccionar fricción excesiva en las poleas de retorno y estado de las guías de cables."
      ),
      makeSquawk(
        37,
        "El piloto reporta: resorte de centrado del timón de dirección roto o suelto",
        "The pilot reports: rudder centering bungee spring is broken or loose",
        "ATA 27",
        "Cessna 150 Commuter",
        "Resorte Bungee / Rudder Bungee",
        "Reemplazar el cartucho de resorte amortiguador bungee de la rueda de nariz y timón."
      ),
      makeSquawk(
        38,
        "El piloto reporta: ruido de roce debajo del piso de cabina al mover los pedales",
        "The pilot reports: rubbing noise under cabin floor when pressing rudder pedals",
        "ATA 27",
        "Cessna 172 Skyhawk",
        "Túnel de Cables / Cable Tunnel",
        "Retirar tapas de inspección de piso y verificar rozamiento del cable contra los mamparos o líneas eléctricas."
      ),
      makeSquawk(
        39,
        "El piloto reporta: el piloto automático se desconecta bruscamente en alabeo",
        "The pilot reports: autopilot disconnects abruptly during roll axis commands",
        "ATA 22",
        "Cessna 182 Skylane",
        "Servomotores / Autopilot Servos",
        "Verificar ajuste del embrague deslizante (slip clutch) del servo de alerones con torquímetro."
      ),
      makeSquawk(
        40,
        "El piloto reporta: la bocina de advertencia de pérdida no emite sonido antes de la pérdida",
        "The pilot reports: stall warning horn fails to sound prior to aerodynamic stall",
        "ATA 27",
        "Cessna 172 Skyhawk",
        "Avisador de Pérdida / Stall Warning",
        "Inspeccionar la lengüeta neumática del borde de ataque del ala izquierda y conducto de succión."
      ),
    ],
  },

  // =========================================================================
  // PLAY 3: MOTOR A PISTÓN, PRESIÓN Y TEMPERATURA DE ACEITE, MAGNETOS (ATA 71/72/74/79)
  // =========================================================================
  {
    playId: 3,
    title: "PLAY 3: Motor a Pistón, Presión de Aceite y Magnetos (ATA 71-79)",
    subtitle: "Reportes de Hangar • Vibración de Motor, Filtros Sucios y Fugas",
    ataChapter: "ATA 71 Powerplant",
    aircraftModel: "Continental O-200 / Lycoming O-320 / O-360",
    questions: [
      makeSquawk(
        41,
        "El piloto reporta: vibración en el motor a dos mil trescientas RPM",
        "The pilot reports: engine vibration at twenty three hundred RPM",
        "ATA 71",
        "Cessna 172 Skyhawk",
        "Vibración de Motor / Engine Vibration",
        "Inspeccionar balance dinámico de hélice, compresión de cilindros y soportes de goma del motor."
      ),
      makeSquawk(
        42,
        "El piloto reporta: indicador de presión de aceite está bajo en crucero",
        "The pilot reports: oil pressure gauge reading is low in cruise flight",
        "ATA 79",
        "Cessna 150 Commuter",
        "Sistema de Aceite / Lubrication System",
        "Verificar nivel en varilla, válvula reguladora de alivio de presión de aceite y transductor en panel."
      ),
      makeSquawk(
        43,
        "El piloto reporta: temperatura de aceite en el arco rojo durante el ascenso",
        "The pilot reports: oil temperature in red arc during climb",
        "ATA 79",
        "Cessna 172 Skyhawk",
        "Refrigeración de Aceite / Oil Cooler",
        "Inspeccionar válvula de control termostático vernatherm, aletas del radiador de aceite y sellos deflectores."
      ),
      makeSquawk(
        44,
        "El piloto reporta: caída excesiva de RPM al probar el magneto izquierdo",
        "The pilot reports: excessive RPM drop when testing left magneto",
        "ATA 74",
        "Cessna 172 Skyhawk",
        "Ignición y Magnetos / Ignition & Magnetos",
        "Inspeccionar bujías por acumulación de plomo, luz de platinos del magneto y tiempo de encendido (25° BTDC)."
      ),
      makeSquawk(
        45,
        "El piloto reporta: goteo de aceite en la parte inferior del capó del motor",
        "The pilot reports: oil dripping from lower engine cowling",
        "ATA 79",
        "Cessna 150 Commuter",
        "Sellos de Motor / Engine Seals",
        "Lavar el motor, encender en rampa e inspeccionar empaques de tubos de empujadores de válvulas."
      ),
      makeSquawk(
        46,
        "El piloto reporta: filtro de aire del motor sucio y obstruido con restos",
        "The pilot reports: engine air induction filter is dirty and clogged with debris",
        "ATA 71",
        "Cessna 172 Skyhawk",
        "Admisión de Aire / Air Induction",
        "Retirar el elemento filtrante de aire tipo espuma o papel celulosa, limpiar o reemplazar según manual."
      ),
      makeSquawk(
        47,
        "El piloto reporta: detonación y petardeo en el escape al reducir la potencia",
        "The pilot reports: engine backfiring in exhaust when reducing throttle",
        "ATA 73",
        "Cessna 172 Skyhawk",
        "Carburación y Mezcla / Fuel Metering",
        "Inspeccionar tomas de aire en juntas del múltiple de admisión y calibración de mezcla ralentí."
      ),
      makeSquawk(
        48,
        "El piloto reporta: la temperatura de culata del cilindro número tres está muy alta",
        "The pilot reports: cylinder head temperature on number three cylinder is high",
        "ATA 72",
        "Cessna 182 Skylane",
        "Cilindros / Engine Cylinders",
        "Inspeccionar deflectores de goma (baffles) del cilindro 3 y tobera de inyector de combustible por obstrucción."
      ),
      makeSquawk(
        49,
        "El piloto reporta: el motor falla o tose al aplicar acelerador rápidamente",
        "The pilot reports: engine stumbles when opening throttle rapidly",
        "ATA 73",
        "Cessna 150 Commuter",
        "Bomba de Aceleración / Accelerator Pump",
        "Comprobar el diafragma de la bomba de aceleración del carburador Marvel-Schebler y chorro de combustible."
      ),
      makeSquawk(
        50,
        "El piloto reporta: humo negro en el escape y consumo excesivo de combustible",
        "The pilot reports: black smoke from exhaust and excessive fuel flow",
        "ATA 73",
        "Cessna 172 Skyhawk",
        "Sistema de Combustible / Fuel System",
        "Inspeccionar válvula de flotador del carburador trabada abierta o enriquecedor de mezcla defectuoso."
      ),
      makeSquawk(
        51,
        "El piloto reporta: el alternador no carga y el amperímetro marca descarga continua",
        "The pilot reports: alternator fails to charge and ammeter shows continuous discharge",
        "ATA 24",
        "Cessna 172 Skyhawk",
        "Sistema Eléctrico / Alternator",
        "Verificar tensión de la correa del alternador, disyuntor de campo y regulador de voltaje de estado sólido."
      ),
      makeSquawk(
        52,
        "El piloto reporta: el motor de arranque gira muy lento con una batería cargada",
        "The pilot reports: starter motor cranks very slowly with a charged battery",
        "ATA 80",
        "Cessna 150 Commuter",
        "Arrancador / Starter System",
        "Inspeccionar escobillas del motor de arranque, contactor solenoide principal y cables de tierra a masa."
      ),
      makeSquawk(
        53,
        "El piloto reporta: olor a aceite quemado dentro de la cabina de vuelo",
        "The pilot reports: smell of burning oil inside the cockpit cabin",
        "ATA 21",
        "Cessna 172 Skyhawk",
        "Calefacción de Cabina / Cabin Heat",
        "Inspeccionar la manga del intercambiador de calefacción de cabina montado en el escape por fugas de aceite."
      ),
      makeSquawk(
        54,
        "El piloto reporta: la válvula de aire caliente del carburador no produce caída de RPM",
        "The pilot reports: carburetor heat valve produces no drop in engine RPM",
        "ATA 71",
        "Cessna 150 Commuter",
        "Calefactor de Carburador / Carb Heat",
        "Inspeccionar compuerta de aire caliente del carburador (carb heat door) desprendida o cable suelto."
      ),
      makeSquawk(
        55,
        "El piloto reporta: el cebador del motor está duro y tiene fuga de combustible",
        "The pilot reports: engine primer plunger is stiff and leaks fuel inside cabin",
        "ATA 73",
        "Cessna 172 Skyhawk",
        "Cebador de Motor / Primer System",
        "Reemplazar los anillos tóricos (O-rings) de sellado del vástago de la bomba de cebado manual."
      ),
      makeSquawk(
        56,
        "El piloto reporta: indicador de temperatura de gases de escape fluctúa erráticamente",
        "The pilot reports: exhaust gas temperature gauge fluctuates erratically",
        "ATA 77",
        "Cessna 182 Skylane",
        "Instrumentos de Motor / Engine Instruments",
        "Inspeccionar la sonda termocupla EGT en el tubo de escape y verificar conexiones eléctricas apretadas."
      ),
      makeSquawk(
        57,
        "El piloto reporta: consumo de aceite superior a un cuarto de galón cada dos horas",
        "The pilot reports: oil consumption exceeds one quart every two flight hours",
        "ATA 79",
        "Cessna 172 Skyhawk",
        "Consumo de Aceite / Oil Consumption",
        "Realizar prueba de compresión diferencial y verificar desgaste en guías de válvulas y anillos de pistón."
      ),
      makeSquawk(
        58,
        "El piloto reporta: el motor sigue funcionando al apagar la llave de magnetos",
        "The pilot reports: engine continues running with ignition switch in off position",
        "ATA 74",
        "Cessna 150 / 172",
        "Interruptor de Ignición / Ignition Switch",
        "¡PELIGRO! Cable P-lead de tierra de magnetos desconectado o roto en el interruptor de llave."
      ),
      makeSquawk(
        59,
        "El piloto reporta: fuga de combustible azul en la válvula de drenaje del colador",
        "The pilot reports: blue fuel stain at the engine fuel strainer drain valve",
        "ATA 28",
        "Cessna 172 Skyhawk",
        "Drenaje de Combustible / Fuel Drain",
        "Limpiar sedimentos en el asiento de la válvula de drenaje o sustituir empaque de caucho fluorado."
      ),
      makeSquawk(
        60,
        "El piloto reporta: el radiador de aceite tiene aletas dobladas y conexiones con fuga",
        "The pilot reports: oil cooler has bent cooling fins and leaking connections",
        "ATA 79",
        "Cessna 182 Skylane",
        "Radiador de Aceite / Oil Cooler",
        "Enderezar aletas con peine de radiador y reemplazar mangueras flexibles de teflón trenzado con acero."
      ),
    ],
  },

  // =========================================================================
  // PLAY 4: HÉLICE, GOBERNADOR, VIBRACIONES Y CONTROL DE PASO (ATA 61)
  // =========================================================================
  {
    playId: 4,
    title: "PLAY 4: Hélice, Gobernador y Control de Paso (ATA 61)",
    subtitle: "Reportes de Hangar • Fuga de Grasa en Buje, Mellas en Palas y Caza de RPM",
    ataChapter: "ATA 61 Propellers",
    aircraftModel: "McCauley / Hartzell / Sensenich",
    questions: [
      makeSquawk(
        61,
        "El piloto reporta: la hélice no alcanza las dos mil setecientas RPM en el despegue",
        "The pilot reports: propeller fails to reach twenty seven hundred RPM on takeoff roll",
        "ATA 61",
        "Cessna 172 Skyhawk",
        "Rendimiento de Hélice / Propeller RPM",
        "Comprobar el tornillo de tope de altas RPM del gobernador y potencia estática del motor en tierra."
      ),
      makeSquawk(
        62,
        "El piloto reporta: oscilación y caza de RPM del gobernador de hélice en crucero",
        "The pilot reports: propeller governor hunts and surges in cruise flight",
        "ATA 61",
        "Cessna 182 Skylane",
        "Gobernador / Propeller Governor",
        "Inspeccionar válvula piloto del gobernador por residuos de carbón y holgura en el mecanismo de mando."
      ),
      makeSquawk(
        63,
        "El piloto reporta: mella profunda en el borde de ataque de la pala de la hélice",
        "The pilot reports: deep nick on the propeller blade leading edge",
        "ATA 61",
        "Cessna 150 / 172",
        "Palas de Hélice / Propeller Blades",
        "Limar y pulir la mella respetando los límites de remoción de material del manual de hélice (blending)."
      ),
      makeSquawk(
        64,
        "El piloto reporta: fuga de grasa en la abrazadera del buje de la hélice",
        "The pilot reports: grease leak at the propeller blade hub clamp",
        "ATA 61",
        "Cessna 182 / 210",
        "Buje de Hélice / Propeller Hub",
        "Inspeccionar sellos de retención de grasa en el cojinete de la pala y reengrasar según especificación."
      ),
      makeSquawk(
        65,
        "El piloto reporta: el cono de la hélice tiene una rajadura cerca de los tornillos",
        "The pilot reports: propeller spinner has a crack near the attachment screws",
        "ATA 61",
        "Cessna 172 Skyhawk",
        "Cono de Hélice / Propeller Spinner",
        "Desmontar el cono (spinner) de aluminio e inspeccionar mamparos delantero y trasero por grietas de fatiga."
      ),
      makeSquawk(
        66,
        "El piloto reporta: respuesta lenta del paso de hélice al ciclar la palanca azul",
        "The pilot reports: sluggish propeller pitch response when cycling blue lever",
        "ATA 61",
        "Cessna 182 Skylane",
        "Control de Paso / Pitch Control",
        "Inspeccionar línea de suministro de aceite al gobernador y acumulación de lodo en el pistón de hélice."
      ),
      makeSquawk(
        67,
        "El piloto reporta: vibración de alta frecuencia en el panel de instrumentos",
        "The pilot reports: high frequency vibration on the instrument panel",
        "ATA 61",
        "Cessna 172 Skyhawk",
        "Balanceo Dinámico / Dynamic Balance",
        "Efectuar balanceo dinámico de hélice con analizador electrónico para reducir vibración bajo 0.05 IPS."
      ),
      makeSquawk(
        68,
        "El piloto reporta: sobreaceleración momentánea de la hélice al avanzar el acelerador",
        "The pilot reports: propeller momentary overspeed when advancing throttle",
        "ATA 61",
        "Cessna 210 Centurion",
        "Gobernador / Propeller Governor",
        "Ajustar la tensión del resorte acelerador del gobernador para mejorar tiempo de respuesta de las pesas centrífugas."
      ),
      makeSquawk(
        69,
        "El piloto reporta: el pasador de embanderado no traba la hélice al cortar motor",
        "The pilot reports: propeller feathering stop pins do not engage on shutdown",
        "ATA 61",
        "Cessna 310 / Twin",
        "Mecanismo de Embanderado / Feathering Mechanism",
        "Limpiar y lubricar los pasadores centrífugos de tope de embanderado en el buje de hélice."
      ),
      makeSquawk(
        70,
        "El piloto reporta: goteo de aceite de motor detrás del mamparo del cono de hélice",
        "The pilot reports: engine oil seepage behind the propeller spinner bulkhead",
        "ATA 61",
        "Cessna 182 Skylane",
        "Sello de Cigüeñal / Crankshaft Seal",
        "Reemplazar el sello delantero de cigüeñal (front crankshaft seal) partido en el cárter."
      ),
      makeSquawk(
        71,
        "El piloto reporta: cable del control de paso de hélice duro y agarrotado",
        "The pilot reports: propeller pitch control cable is stiff and binding",
        "ATA 61",
        "Cessna 182 Skylane",
        "Cable de Control / Propeller Cable",
        "Inspeccionar curvaturas forzadas en el cable de mando flexible y lubricar con aceite aeronáutico."
      ),
      makeSquawk(
        72,
        "El piloto reporta: bota de deshielo de la pala de hélice despegada en la punta",
        "The pilot reports: propeller deice boot peeling off at blade tip",
        "ATA 30",
        "Cessna 210 Centurion",
        "Deshielo de Hélice / Propeller Deice",
        "Limpiar restos de adhesivo viejo y vulcanizar nuevamente la bota calefactora con cemento EC-1300."
      ),
      makeSquawk(
        73,
        "El piloto reporta: zumbido rítmico audible de batimiento de hélice en vuelo",
        "The pilot reports: rhythmic propeller beat hum audible in flight",
        "ATA 61",
        "Cessna 172 Skyhawk",
        "Seguimiento de Palas / Blade Tracking",
        "Medir el seguimiento de pala (blade track) con regla fija en el suelo; tolerancia máxima 1/16 de pulgada."
      ),
      makeSquawk(
        74,
        "El piloto reporta: el gobernador pierde presión de aceite al reducir potencia",
        "The pilot reports: governor loses boost oil pressure when reducing throttle",
        "ATA 61",
        "Cessna 182 Skylane",
        "Bomba de Gobernador / Governor Pump",
        "Verificar holgura de engranajes de la bomba de aceite interna del gobernador y junta de montaje."
      ),
      makeSquawk(
        75,
        "El piloto reporta: erosión excesiva por gravilla en las puntas de ambas palas",
        "The pilot reports: excessive gravel erosion on both propeller blade tips",
        "ATA 61",
        "Cessna 150 / 172",
        "Palas de Hélice / Propeller Blades",
        "Inspeccionar según límites de espesor de cuerda del manual y aplicar pintura de poliuretano protectora."
      ),
      makeSquawk(
        76,
        "El piloto reporta: tornillos flojos en la placa trasera del cono de hélice",
        "The pilot reports: loose screws on the propeller spinner backplate",
        "ATA 61",
        "Cessna 172 Skyhawk",
        "Montaje de Spinner / Spinner Mount",
        "Reemplazar tuercas flotantes elásticas (tinnerman o nutplates) dañadas e instalar tornillos nuevos de acero inoxidable."
      ),
      makeSquawk(
        77,
        "El piloto reporta: resistencia inusual al mover la hélice a mano durante la prevuelo",
        "The pilot reports: unusual resistance when turning propeller by hand on preflight",
        "ATA 61",
        "Cessna 150 Commuter",
        "Inspección de Hélice / Preflight Check",
        "Comprobar arrastre de accesorios del motor, caja reductora o acople de marcha trabado."
      ),
      makeSquawk(
        78,
        "El piloto reporta: el indicador de presión de gobernador marca bajo el arco verde",
        "The pilot reports: propeller governor pressure gauge reads below green arc",
        "ATA 61",
        "Cessna 210 Centurion",
        "Instrumento de Gobernador / Pressure Gauge",
        "Calibrar el instrumento y comprobar la presión de salida del gobernador con un manómetro de prueba directo."
      ),
      makeSquawk(
        79,
        "El piloto reporta: juego angular perceptible al mover la pala con la mano",
        "The pilot reports: noticeable angular play when twisting propeller blade by hand",
        "ATA 61",
        "Cessna 182 Skylane",
        "Cojinete de Pala / Blade Bearing",
        "Medir el juego torsional de la pala según el manual del fabricante de la hélice McCauley."
      ),
      makeSquawk(
        80,
        "El piloto reporta: las RPM de la hélice caen doscientas RPM al aplicar deshielo",
        "The pilot reports: propeller RPM drops two hundred RPM when deice system is turned on",
        "ATA 30",
        "Cessna 210 Centurion",
        "Deshielo Eléctrico / Electric Deice",
        "Inspeccionar cortocircuito a masa en las escobillas o anillos colectores (slip rings) del buje."
      ),
    ],
  },

  // =========================================================================
  // PLAY 5: SISTEMA DE COMBUSTIBLE, FUGAS, BOMBAS Y SELECTOR (ATA 28)
  // =========================================================================
  {
    playId: 5,
    title: "PLAY 5: Sistema de Combustible, Fugas y Bombas (ATA 28)",
    subtitle: "Reportes de Hangar • Goteo en Drenaje, Válvula Selectora Dura y Filtros",
    ataChapter: "ATA 28 Fuel",
    aircraftModel: "Cessna 150 / 172 / 182 / 208",
    questions: [
      makeSquawk(
        81,
        "El piloto reporta: goteo continuo en la línea de drenaje de combustible",
        "The pilot reports: continuous dripping from fuel drain line",
        "ATA 28",
        "Cessna 172 Skyhawk",
        "Válvulas de Drenaje / Quick Drains",
        "Reemplazar el asiento y sello O-ring de la válvula de drenaje rápido (quick drain valve)."
      ),
      makeSquawk(
        82,
        "El piloto reporta: la válvula selectora de combustible está muy dura para rotar",
        "The pilot reports: fuel selector valve is very stiff to rotate",
        "ATA 28",
        "Cessna 172 Skyhawk",
        "Selector de Combustible / Fuel Selector",
        "Desarmar la válvula selectora, limpiar cono de sellado, reemplazar O-rings de vitón y lubricar con vaselina técnica."
      ),
      makeSquawk(
        83,
        "El piloto reporta: el indicador de cantidad de combustible izquierdo marca vacío con tanques llenos",
        "The pilot reports: left fuel quantity gauge indicates empty with full tanks",
        "ATA 28",
        "Cessna 150 Commuter",
        "Indicadores de Combustible / Fuel Gauges",
        "Comprobar el flotador del transmisor resistivo en el ala izquierda y verificar masa a tierra del tanque."
      ),
      makeSquawk(
        84,
        "El piloto reporta: la bomba eléctrica auxiliar de combustible no genera presión",
        "The pilot reports: auxiliary electric fuel boost pump produces no fuel pressure",
        "ATA 28",
        "Cessna 172 / 182",
        "Bomba Auxiliar / Fuel Boost Pump",
        "Inspeccionar el disyuntor de la bomba, el interruptor en panel y medir voltaje en los terminales del motor eléctrico."
      ),
      makeSquawk(
        85,
        "El piloto reporta: fuerte olor a gasolina de aviación dentro de la cabina de pasajeros",
        "The pilot reports: strong avgas odor inside passenger cabin",
        "ATA 28",
        "Cessna 172 Skyhawk",
        "Líneas de Combustible / Fuel Lines",
        "¡ACCIDENTE POTENCIAL! Inspeccionar líneas de combustible en los postes delanteros y conexiones del selector de piso."
      ),
      makeSquawk(
        86,
        "El piloto reporta: mancha azul de combustible en el borde de ataque del ala",
        "The pilot reports: blue fuel stain along the wing leading edge",
        "ATA 28",
        "Cessna 172 Skyhawk",
        "Tanque de Combustible / Fuel Tank",
        "Localizar remaches con filtración de combustible en el tanque integral y resellar con polisulfuro PR-1422."
      ),
      makeSquawk(
        87,
        "El piloto reporta: la tapa del tanque de combustible no sella herméticamente",
        "The pilot reports: fuel tank filler cap does not seal tightly",
        "ATA 28",
        "Cessna 150 / 172",
        "Tapa de Tanque / Fuel Cap",
        "Ajustar la tuerca de tensión del mecanismo de traba de la tapa y sustituir empaque de goma de silicona."
      ),
      makeSquawk(
        88,
        "El piloto reporta: el tubo de ventilación de combustible derrama en vuelo nivelado",
        "The pilot reports: fuel tank vent tube vents fuel in level flight",
        "ATA 28",
        "Cessna 172 Skyhawk",
        "Ventilación de Tanque / Fuel Vent",
        "Comprobar la válvula de retención del respiradero (check valve) por suciedad o deformación en el orificio."
      ),
      makeSquawk(
        89,
        "El piloto reporta: agua y sedimentos oxidados hallados en la muestra de combustible",
        "The pilot reports: water and rusty sediment found in fuel strainer sample",
        "ATA 28",
        "Cessna 150 Commuter",
        "Colador de Combustible / Fuel Strainer",
        "Drenar completamente el colador principal, limpiar la malla de alambre de bronce e inspeccionar tanques alares."
      ),
      makeSquawk(
        90,
        "El piloto reporta: la luz de advertencia de bajo combustible parpadea erráticamente",
        "The pilot reports: low fuel warning annunciator flickers erratically",
        "ATA 28",
        "Cessna 172 Skyhawk",
        "Alerta de Bajo Combustible / Low Fuel Warning",
        "Inspeccionar el sensor de nivel tipo lengüeta magnética (reed switch) en el tanque alar."
      ),
      makeSquawk(
        91,
        "El piloto reporta: el indicador de flujo de combustible marca cero durante el vuelo",
        "The pilot reports: fuel flow indicator reads zero during flight",
        "ATA 73",
        "Cessna 182 Skylane",
        "Flujómetro / Fuel Flow Indicator",
        "Comprobar línea de presión diferencial o transductor electrónico de turbina de flujo en el múltiple."
      ),
      makeSquawk(
        92,
        "El piloto reporta: fuga de combustible en la bomba mecánica montada en el motor",
        "The pilot reports: fuel leak at engine driven mechanical fuel pump weep hole",
        "ATA 28",
        "Cessna 172 Skyhawk",
        "Bomba Mecánica / Engine-Driven Pump",
        "Reemplazar la bomba de combustible mecánica; el diafragma interno está roto permitiendo fuga por el orificio weep hole."
      ),
      makeSquawk(
        93,
        "El piloto reporta: el tanque derecho alimenta notablemente más rápido que el tanque izquierdo",
        "The pilot reports: right fuel tank feeds significantly faster than left tank",
        "ATA 28",
        "Cessna 172 Skyhawk",
        "Alimentación Cruzada / Fuel Feeding Balance",
        "Inspeccionar ventilación del tanque izquierdo obstruida o válvula de interconexión con restricción."
      ),
      makeSquawk(
        94,
        "El piloto reporta: la válvula de corte de combustible de emergencia no cierra totalmente",
        "The pilot reports: emergency fuel shutoff valve does not close completely",
        "ATA 28",
        "Cessna 208 Caravan",
        "Corte de Emergencia / Emergency Shutoff",
        "Ajustar el cable de mando de la válvula cortafuegos y comprobar cierre hermético sin flujo residual."
      ),
      makeSquawk(
        95,
        "El piloto reporta: la luz de advertencia de presión de combustible permanece encendida en crucero",
        "The pilot reports: fuel pressure warning light stays illuminated in cruise",
        "ATA 28",
        "Cessna 182 Skylane",
        "Presión de Combustible / Fuel Pressure",
        "Verificar interruptor de presión de combustible calibrado (minimum 3.5 PSI) y presión real de entrega de la bomba."
      ),
      makeSquawk(
        96,
        "El piloto reporta: el vaso del colador de combustible tiene el alambre de seguridad roto",
        "The pilot reports: fuel strainer bowl safety wire is broken",
        "ATA 28",
        "Cessna 150 / 172",
        "Frenado de Seguridad / Safety Wire",
        "Inspeccionar el apriete de la tuerca mariposa o perno inferior y colocar alambre de frenado inoxidable de 0.032 pulgadas."
      ),
      makeSquawk(
        97,
        "El piloto reporta: el transmisor de cantidad de combustible fluctúa severamente en turbulencia",
        "The pilot reports: fuel quantity transmitter fluctuates severely in turbulence",
        "ATA 28",
        "Cessna 172 Skyhawk",
        "Transmisor de Combustible / Fuel Transmitter",
        "Comprobar desgaste en la pista de resistencia variable y amortiguador mecánico del brazo del flotador."
      ),
      makeSquawk(
        98,
        "El piloto reporta: burbujas de aire visibles en el tubo visor de combustible",
        "The pilot reports: visible air bubbles in fuel sight glass indicator",
        "ATA 28",
        "Cessna 150 Commuter",
        "Visor de Combustible / Sight Glass",
        "Comprobar entrada de aire en los acoples de mangueras de succión entre el tanque y la válvula selectora."
      ),
      makeSquawk(
        99,
        "El piloto reporta: el sello de la compuerta de carga de combustible está roto",
        "The pilot reports: fuel filler door gasket seal is torn and leaking",
        "ATA 28",
        "Cessna 172 Skyhawk",
        "Acceso de Carga / Fuel Door",
        "Reemplazar junta de neopreno para evitar entrada de agua de lluvia al receptáculo de la tapa de llenado."
      ),
      makeSquawk(
        100,
        "El piloto reporta: la presión de combustible cae peligrosamente al reducir la aceleración",
        "The pilot reports: fuel pressure drops dangerously when reducing engine throttle",
        "ATA 28",
        "Cessna 182 Skylane",
        "Regulador de Presión / Pressure Relief",
        "Inspeccionar el resorte de la válvula de alivio de la bomba mecánica por pérdida de tensión o rotura."
      ),
    ],
  },
];

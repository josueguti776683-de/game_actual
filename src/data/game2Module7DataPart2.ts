import { Module7Play } from "./game2Module7Types";
import { makeSquawk } from "./game2Module7Helper";

export const MODULE_7_PART_2: Module7Play[] = [
  // =========================================================================
  // PLAY 6: SISTEMA ELÉCTRICO, ALTERNADOR, BATERÍA Y DISYUNTORES (ATA 24)
  // =========================================================================
  {
    playId: 6,
    title: "PLAY 6: Sistema Eléctrico, Alternador y Batería (ATA 24)",
    subtitle: "Reportes de Hangar • Disyuntores Saltados, Alto Voltaje y Falla de Carga",
    ataChapter: "ATA 24 Electrical Power",
    aircraftModel: "Cessna 150 / 172 / 182 / 210",
    questions: [
      makeSquawk(
        101,
        "El piloto reporta: el disyuntor del alternador salta inmediatamente al conectarlo",
        "The pilot reports: alternator circuit breaker pops immediately when engaged",
        "ATA 24",
        "Cessna 172 Skyhawk",
        "Disyuntores / Circuit Breakers",
        "Inspeccionar cortocircuito en el diodo rectificador del alternador o cable de salida B-lead en corto a masa."
      ),
      makeSquawk(
        102,
        "El piloto reporta: el voltímetro marca más de treinta voltios en el sistema de veintiocho voltios",
        "The pilot reports: voltmeter indicates over thirty volts on twenty eight volt system",
        "ATA 24",
        "Cessna 182 Skylane",
        "Regulador de Voltaje / Voltage Regulator",
        "¡PELIGRO DE SOBREVOLTAJE! Reemplazar el relé de sobretensión (overvoltage relay) y ajustar el regulador de voltaje."
      ),
      makeSquawk(
        103,
        "El piloto reporta: corrosión blanca y polvo de ácido en la caja de la batería",
        "The pilot reports: white corrosion and acid powder in the battery box",
        "ATA 24",
        "Cessna 150 Commuter",
        "Batería / Aircraft Battery",
        "Neutralizar con solución de bicarbonato de sodio, lavar con agua tibia, secar y verificar tubo de ventilación de ácido."
      ),
      makeSquawk(
        104,
        "El piloto reporta: las luces de aterrizaje parpadean y se apagan al encender el estrobo",
        "The pilot reports: landing lights flicker and go out when strobe is turned on",
        "ATA 24",
        "Cessna 172 Skyhawk",
        "Iluminación y Carga / Lighting Bus",
        "Comprobar barra colectora de avionica (avionics bus), conexiones de masa comunes y caída de tensión en el interruptor."
      ),
      makeSquawk(
        105,
        "El piloto reporta: el interruptor maestro eléctrico no corta la corriente de la batería",
        "The pilot reports: master switch fails to disconnect battery power",
        "ATA 24",
        "Cessna 172 Skyhawk",
        "Contactor Principal / Battery Contactor",
        "Inspeccionar los contactos del solenoide contactor maestro de batería por soldadura o pegado interno."
      ),
      makeSquawk(
        106,
        "El piloto reporta: la luz ámbar de falla de alternador parpadea a bajas RPM de ralentí",
        "The pilot reports: amber alternator failure light flickers at low idle RPM",
        "ATA 24",
        "Cessna 172 Skyhawk",
        "Luz de Advertencia / Annunciator Panel",
        "Comportamiento normal por baja velocidad del rotor en ralentí; verificar tensión de correa y ralentí de 650-700 RPM."
      ),
      makeSquawk(
        107,
        "El piloto reporta: la batería no retiene carga después de dos días en el hangar",
        "The pilot reports: battery does not hold charge after two days in hangar",
        "ATA 24",
        "Cessna 150 Commuter",
        "Prueba de Capacidad / Battery Capacity",
        "Realizar prueba de capacidad de descarga al 80% (C1 test) y verificar consumo parásito en el reloj de cabina."
      ),
      makeSquawk(
        108,
        "El piloto reporta: olor a plástico quemado detrás del panel de disyuntores de cabina",
        "The pilot reports: burning plastic smell behind the cockpit circuit breaker panel",
        "ATA 24",
        "Cessna 210 Centurion",
        "Cableado Eléctrico / Electrical Wiring",
        "Inspeccionar el arnés de cables detrás del panel con linterna e identificar aislamiento recalentado o terminal suelto."
      ),
      makeSquawk(
        109,
        "El piloto reporta: la luz de navegación roja del ala izquierda no enciende",
        "The pilot reports: red navigation light on left wing tip does not illuminate",
        "ATA 33",
        "Cessna 172 Skyhawk",
        "Luces de Posición / Navigation Lights",
        "Comprobar el filamento de la bombilla de 28V, el zócalo por corrosión y continuidad del cable de masa en la punta de ala."
      ),
      makeSquawk(
        110,
        "El piloto reporta: el receptáculo de alimentación externa no activa el relé",
        "The pilot reports: external power receptacle does not engage power relay",
        "ATA 24",
        "Cessna 182 Skylane",
        "Alimentación Externa / Ground Power Unit",
        "Comprobar el pin positivo pequeño de control del conector GPU de tres clavijas y el diodo de polaridad inversa."
      ),
      makeSquawk(
        111,
        "El piloto reporta: interferencia y zumbido del alternador en los auriculares de radio",
        "The pilot reports: alternator whine and audio buzz in radio headsets",
        "ATA 24",
        "Cessna 172 Skyhawk",
        "Filtro de Ruido / Noise Filter",
        "Reemplazar el condensador de filtro de supresión de ruido del alternador montado en el terminal positivo."
      ),
      makeSquawk(
        112,
        "El piloto reporta: la luz de advertencia de bajo voltaje permanece encendida en vuelo",
        "The pilot reports: low voltage warning light remains on during flight",
        "ATA 24",
        "Cessna 172 Skyhawk",
        "Sensor de Voltaje / Voltage Sensor",
        "Verificar la salida del alternador bajo carga con multímetro digital en la barra colectora principal."
      ),
      makeSquawk(
        113,
        "El piloto reporta: el medidor de amperímetro indica carga máxima continua sin bajar",
        "The pilot reports: ammeter indicates continuous maximum charge without decreasing",
        "ATA 24",
        "Cessna 150 Commuter",
        "Amperímetro / Ammeter System",
        "Inspeccionar batería con celda en cortocircuito interno que demanda corriente excesiva y comprobar shunt del amperímetro."
      ),
      makeSquawk(
        114,
        "El piloto reporta: chisporroteo visible al accionar el interruptor de la bomba de combustible",
        "The pilot reports: visible arcing when toggling fuel pump switch",
        "ATA 24",
        "Cessna 172 Skyhawk",
        "Interruptores / Rocker Switches",
        "Reemplazar el interruptor basculante tipo rocker por contactos internos quemados o desgastados."
      ),
      makeSquawk(
        115,
        "El piloto reporta: la luz estroboscópica de cola no emite destellos",
        "The pilot reports: tail strobe light does not flash",
        "ATA 33",
        "Cessna 172 Skyhawk",
        "Luces Anticolisión / Anti-Collision Lights",
        "Inspeccionar la fuente de alimentación de alto voltaje (power pack) y el tubo de xenón de destello."
      ),
      makeSquawk(
        116,
        "El piloto reporta: las luces del panel de instrumentos no se pueden atenuar",
        "The pilot reports: instrument panel lights cannot be dimmed",
        "ATA 33",
        "Cessna 182 Skylane",
        "Reóstato de Luz / Dimmer Control",
        "Reemplazar el transistor de potencia o el reóstato potenciómetro de atenuación de iluminación."
      ),
      makeSquawk(
        117,
        "El piloto reporta: el fusible de repuesto no está en el compartimiento de cabina",
        "The pilot reports: spare fuse is missing from cockpit holder",
        "ATA 24",
        "Cessna 150 Commuter",
        "Fusibles de Repuesto / Spare Fuses",
        "Instalar fusibles de repuesto de amperajes correctos (5A, 10A, 15A) según lista de equipamiento mínimo."
      ),
      makeSquawk(
        118,
        "El piloto reporta: la correa del alternador está floja y patina bajo carga",
        "The pilot reports: alternator drive belt is loose and slips under load",
        "ATA 24",
        "Cessna 172 Skyhawk",
        "Correa de Mando / Alternator Belt",
        "Ajustar la tensión de la correa con torquímetro en la tuerca del soporte (deflexión de 5/16 de pulgada)."
      ),
      makeSquawk(
        119,
        "El piloto reporta: terminal de cable de masa de batería con perno flojo",
        "The pilot reports: battery ground cable terminal has loose bolt",
        "ATA 24",
        "Cessna 172 Skyhawk",
        "Conexión a Masa / Ground Bonding",
        "Limpiar pintura en el punto de anclaje del fuselaje, aplicar compuesto anticorrosivo y apretar a torque especificado."
      ),
      makeSquawk(
        120,
        "El piloto reporta: el sistema de aviso sonoro de cabina suena constantemente sin advertencias",
        "The pilot reports: audio alert system sounds continuously without warnings",
        "ATA 24",
        "Cessna 182 Skylane",
        "Aviso Acústico / Warning Sonalert",
        "Inspeccionar diodos de aislamiento en la línea de aviso de pérdida y freno de estacionamiento."
      ),
    ],
  },

  // =========================================================================
  // PLAY 7: SISTEMA DE VACÍO, GIROSCÓPICOS, PITOT Y CALEFACCIÓN PITOT (ATA 34/37)
  // =========================================================================
  {
    playId: 7,
    title: "PLAY 7: Sistema de Vacío, Giroscópicos y Tubo Pitot (ATA 34/37)",
    subtitle: "Reportes de Hangar • Falla de Bomba de Vacío, Pitot Heat y Horizonte Inclinado",
    ataChapter: "ATA 34/37 Navigation & Vacuum",
    aircraftModel: "Cessna 150 / 172 / 182",
    questions: [
      makeSquawk(
        121,
        "El piloto reporta: el indicador de succión de vacío marca cero en vuelo",
        "The pilot reports: vacuum suction gauge reads zero in flight",
        "ATA 37",
        "Cessna 172 Skyhawk",
        "Bomba de Vacío / Vacuum Pump",
        "Reemplazar la bomba de vacío mecánica tipo paletas de carbón; el eje de acople fusible se ha roto."
      ),
      makeSquawk(
        122,
        "El piloto reporta: el horizonte artificial giroscópico está inclinado y gira lentamente",
        "The pilot reports: gyroscopic artificial horizon is tilted and erects slowly",
        "ATA 34",
        "Cessna 150 Commuter",
        "Horizonte Artificial / Attitude Indicator",
        "Inspeccionar filtros de vacío obstruidos, presión de succión baja (menor a 4.5 inHg) y cojinetes de cardán del giróscopo."
      ),
      makeSquawk(
        123,
        "El piloto reporta: el calentador del tubo pitot no calienta y el amperímetro no se mueve",
        "The pilot reports: pitot tube heater does not warm up and ammeter shows no deflection",
        "ATA 30",
        "Cessna 172 Skyhawk",
        "Calefacción Pitot / Pitot Heat",
        "Medir resistencia del elemento calefactor del tubo pitot con multímetro y comprobar disyuntor de 10A."
      ),
      makeSquawk(
        124,
        "El piloto reporta: el velocímetro aumenta durante el ascenso como si fuera un altímetro",
        "The pilot reports: airspeed indicator increases in climb like an altimeter",
        "ATA 34",
        "Cessna 172 Skyhawk",
        "Sistema Pitot-Estático / Pitot-Static System",
        "¡Tubo pitot obstruido con orificio de drenaje tapado! Purgar y limpiar la línea de presión de impacto."
      ),
      makeSquawk(
        125,
        "El piloto reporta: el altímetro y el variómetro responden muy lentos a los cambios de altura",
        "The pilot reports: altimeter and vertical speed indicator respond very slowly to altitude changes",
        "ATA 34",
        "Cessna 182 Skylane",
        "Puerto Estático / Static Port",
        "Inspeccionar los puertos de presión estática en el fuselaje por cera de pulido o insectos y drenar trampa de agua."
      ),
      makeSquawk(
        126,
        "El piloto reporta: la bandera de advertencia de la fuente de vacío auxiliar está levantada",
        "The pilot reports: auxiliary vacuum source warning flag is raised",
        "ATA 37",
        "Cessna 210 Centurion",
        "Vacío Auxiliar / Standby Vacuum",
        "Comprobar la válvula de lanzadera (shuttle valve) y el sistema de succión de respaldo accionado por el múltiple."
      ),
      makeSquawk(
        127,
        "El piloto reporta: el giróscopo direccional deriva más de quince grados cada quince minutos",
        "The pilot reports: directional gyro precesses more than fifteen degrees every fifteen minutes",
        "ATA 34",
        "Cessna 172 Skyhawk",
        "Giróscopo Direccional / Heading Indicator",
        "Comprobar nivel de succión de vacío, filtro de aire central de instrumentos y desgaste de cojinetes de rotor."
      ),
      makeSquawk(
        128,
        "El piloto reporta: el coordinador de viraje eléctrico tiene la bandera roja off a la vista",
        "The pilot reports: electric turn coordinator shows red off flag in view",
        "ATA 34",
        "Cessna 172 Skyhawk",
        "Coordinador de Viraje / Turn Coordinator",
        "Inspeccionar motor de 28V DC del giróscopo interno, escobillas gastadas y alimentación del conector trasero."
      ),
      makeSquawk(
        129,
        "El piloto reporta: la brújula magnética tiene una burbuja de aire grande y pierde líquido",
        "The pilot reports: magnetic compass has large air bubble and leaks damping fluid",
        "ATA 34",
        "Cessna 150 Commuter",
        "Brújula Magnética / Magnetic Compass",
        "Reemplazar el diafragma de fuelle de la brújula, rellenar con fluido de queroseno blanco desodorizado o sustituir unidad."
      ),
      makeSquawk(
        130,
        "El piloto reporta: la válvula de fuente estática alternativa de cabina tiene fuga de aire",
        "The pilot reports: alternate static source valve leaks cabin air",
        "ATA 34",
        "Cessna 172 Skyhawk",
        "Estática Alterna / Alternate Static Source",
        "Realizar prueba de fuga estática con equipo pitot-estático según FAR 43 Apéndice E y reemplazar sello de válvula."
      ),
      makeSquawk(
        131,
        "El piloto reporta: el regulador de vacío hace un silbido fuerte detrás del panel",
        "The pilot reports: vacuum regulator makes loud hissing noise behind panel",
        "ATA 37",
        "Cessna 172 Skyhawk",
        "Regulador de Succión / Vacuum Regulator",
        "Limpiar o reemplazar la almohadilla de espuma del filtro del regulador de vacío y ajustar succión a 5.0 inHg."
      ),
      makeSquawk(
        132,
        "El piloto reporta: agua visible dentro de la manguera transparente de drenaje estático",
        "The pilot reports: water visible inside clear static line drain hose",
        "ATA 34",
        "Cessna 182 Skylane",
        "Drenaje Estático / Static Drains",
        "Abrir los drenajes de sumidero de la línea estática en el fuselaje inferior y secar con nitrógeno a baja presión."
      ),
      makeSquawk(
        133,
        "El piloto reporta: el indicador de actitud tiene sonido de rozamiento al apagarse el motor",
        "The pilot reports: attitude indicator makes coast-down rubbing noise on engine shutdown",
        "ATA 34",
        "Cessna 150 Commuter",
        "Rodamientos de Giróscopo / Gyro Bearings",
        "Desmontar instrumento para overhaul; los rodamientos de zafiro/acero del rotor están picados o secos."
      ),
      makeSquawk(
        134,
        "El piloto reporta: la funda de protección del tubo pitot está quemada y derretida",
        "The pilot reports: pitot tube protective cover is scorched and melted",
        "ATA 30",
        "Cessna 172 Skyhawk",
        "Funda de Pitot / Pitot Cover",
        "Limpiar residuos plásticos derretidos del tubo pitot metálico con solvente suave y comprobar orificio dinámico."
      ),
      makeSquawk(
        135,
        "El piloto reporta: la lectura de altitud difiere cien pies entre piloto y copiloto",
        "The pilot reports: altitude reading differs one hundred feet between pilot and copilot",
        "ATA 34",
        "Cessna 208 Caravan",
        "Altimetría / Altimeter Calibration",
        "Efectuar prueba de calibración de altímetros en cámara barométrica para verificar tolerancia admisible."
      ),
      makeSquawk(
        136,
        "El piloto reporta: la perilla de ajuste de la escala barométrica Kollsman está trabada",
        "The pilot reports: Kollsman barometric scale setting knob is jammed",
        "ATA 34",
        "Cessna 172 Skyhawk",
        "Ajuste Altimétrico / Kollsman Window",
        "Inspeccionar piñones del tren de engranajes del altímetro y no forzar para evitar dañar la cápsula aneroide."
      ),
      makeSquawk(
        137,
        "El piloto reporta: el variómetro marca ascenso de quinientos pies con avión parado en tierra",
        "The pilot reports: vertical speed indicator reads five hundred feet climb on ground",
        "ATA 34",
        "Cessna 150 Commuter",
        "Variómetro / Vertical Speed Indicator",
        "Ajustar el tornillo de cero del variómetro (zero adjustment screw) en la carátula frontal con destornillador plano fino."
      ),
      makeSquawk(
        138,
        "El piloto reporta: la aguja del indicador de succión oscila violentamente en crucero",
        "The pilot reports: suction gauge needle oscillates violently in cruise flight",
        "ATA 37",
        "Cessna 172 Skyhawk",
        "Manómetro de Vacío / Suction Gauge",
        "Comprobar restrictores amortiguadores (snubbers) en las conexiones de manguera del manómetro diferencial."
      ),
      makeSquawk(
        139,
        "El piloto reporta: el filtro central de aire de instrumentos está ennegrecido de suciedad",
        "The pilot reports: central instrument air filter is blackened with dirt",
        "ATA 37",
        "Cessna 172 Skyhawk",
        "Filtro Central / Instrument Air Filter",
        "Reemplazar el filtro de papel tipo canister de 0.3 micrones ubicado debajo del panel de instrumentos."
      ),
      makeSquawk(
        140,
        "El piloto reporta: la brújula electrónica muestra error de calibración de rumbo constante",
        "The pilot reports: electronic compass shows continuous heading calibration error",
        "ATA 34",
        "Cessna 182 Skylane",
        "Magnetómetro / Magnetometer",
        "Efectuar compensación magnética en la rosa de los vientos de calibración (compass swing) para eliminar campos parásitos."
      ),
    ],
  },

  // =========================================================================
  // PLAY 8: CABINA, PARABRISAS, PUERTAS Y CALEFACCIÓN (ATA 21/52/56)
  // =========================================================================
  {
    playId: 8,
    title: "PLAY 8: Cabina, Parabrisas, Puertas y Calefacción (ATA 21/52/56)",
    subtitle: "Reportes de Hangar • Pestillos de Puerta, Grietas en Plexiglás y Humo en Cabina",
    ataChapter: "ATA 21/52/56 Cabin & Structure",
    aircraftModel: "Cessna 150 / 172 / 182 / 210",
    questions: [
      makeSquawk(
        141,
        "El piloto reporta: la puerta izquierda de cabina se abre en vuelo durante el ascenso",
        "The pilot reports: left cabin door pops open in flight during climb",
        "ATA 52",
        "Cessna 172 Skyhawk",
        "Pestillo de Puerta / Door Latch",
        "Ajustar el pasador de enganche del marco, tensión del resorte de traba y verificar alineación de la cerradura."
      ),
      makeSquawk(
        142,
        "El piloto reporta: grieta en forma de estrella en el parabrisas de plexiglás derecho",
        "The pilot reports: star crack on right windshield plexiglass",
        "ATA 56",
        "Cessna 150 Commuter",
        "Ventanas y Parabrisas / Windows",
        "Efectuar taladrado de alivio de tensiones (stop drilling) en la punta de la grieta con broca de 1/8 de pulgada."
      ),
      makeSquawk(
        143,
        "El piloto reporta: la calefacción de cabina no calienta y el aire sale frío",
        "The pilot reports: cabin heat does not warm and air comes out cold",
        "ATA 21",
        "Cessna 172 Skyhawk",
        "Sistema de Calefacción / Cabin Heat",
        "Inspeccionar cable de la compuerta mezcladora, manguera flexible SCAT rota y válvula en la caja cortafuegos."
      ),
      makeSquawk(
        144,
        "El piloto reporta: olor a gases de escape y monóxido de carbono en cabina con calefacción abierta",
        "The pilot reports: exhaust odor and carbon monoxide in cabin with heat selected on",
        "ATA 21",
        "Cessna 172 Skyhawk",
        "¡CRÍTICO! / Muffler Inspection",
        "¡PELIGRO MORTAL! Desmontar el silenciador de escape e inspeccionar por fisuras y grietas con prueba de presión."
      ),
      makeSquawk(
        145,
        "El piloto reporta: el cinturón de seguridad del asiento del piloto tiene el enrollador trabado",
        "The pilot reports: pilot seat inertia reel shoulder harness is locked and binding",
        "ATA 25",
        "Cessna 172 Skyhawk",
        "Cinturones de Seguridad / Seat Belts",
        "Inspeccionar el carrete de inercia del arnés de hombro por polvo o dientes trabados y reemplazar conjunto defectuoso."
      ),
      makeSquawk(
        146,
        "El piloto reporta: el riel del asiento del piloto se desliza sin traba en el despegue",
        "The pilot reports: pilot seat track slips unlatched on takeoff",
        "ATA 25",
        "Cessna 172 Skyhawk",
        "Riel de Asiento / Seat Rails (AD Compliance)",
        "¡ALERTA AD 87-20-03! Medir desgaste de los orificios del riel con calibrador pasa-no pasa y verificar pasador de seguro."
      ),
      makeSquawk(
        147,
        "El piloto reporta: la ventanilla de ventilación del piloto vibra ruidosamente en crucero",
        "The pilot reports: pilot foul weather vent window rattles noisily in cruise",
        "ATA 56",
        "Cessna 150 / 172",
        "Ventanilla de Cabina / Vent Window",
        "Reemplazar el sello perimetral de espuma de celda cerrada y ajustar el pestillo de apriete."
      ),
      makeSquawk(
        148,
        "El piloto reporta: entrada de agua de lluvia en el piso del copiloto durante tormentas",
        "The pilot reports: rain water leak onto copilot floor during rainstorms",
        "ATA 52",
        "Cessna 172 Skyhawk",
        "Sellos de Puerta / Door Seals",
        "Inspeccionar el sello de goma esponjosa del marco de puerta y verificar canal de drenaje de lluvia superior."
      ),
      makeSquawk(
        149,
        "El piloto reporta: el ventilador de aire fresco del techo no funciona en ninguna velocidad",
        "The pilot reports: overhead cabin fresh air blower fan does not work on any speed",
        "ATA 21",
        "Cessna 210 Centurion",
        "Ventilación / Air Blower",
        "Comprobar el disyuntor térmico de 5A, el interruptor selector y motor eléctrico de soplado."
      ),
      makeSquawk(
        150,
        "El piloto reporta: el pestillo de la compuerta de equipaje no cierra con llave",
        "The pilot reports: baggage door latch does not lock with key",
        "ATA 52",
        "Cessna 172 Skyhawk",
        "Puerta de Equipaje / Baggage Door",
        "Lubricar el bombín de la cerradura con grafito seco en polvo y enderezar la leva de enganche interior."
      ),
      makeSquawk(
        151,
        "El piloto reporta: el respaldo del asiento trasero no se reclina ni asegura en posición",
        "The pilot reports: rear passenger seat back fails to recline or lock in position",
        "ATA 25",
        "Cessna 182 Skylane",
        "Asientos de Pasajeros / Passenger Seats",
        "Inspeccionar cable de liberación y trinquete dentado del mecanismo de reclinación."
      ),
      makeSquawk(
        152,
        "El piloto reporta: distorsión óptica severa en la parte curva del parabrisas",
        "The pilot reports: severe optical distortion in curved section of windshield",
        "ATA 56",
        "Cessna 172 Skyhawk",
        "Parabrisas / Windshield Inspection",
        "Inspeccionar ondulaciones térmicas en el acrílico por sobrecalentamiento solar o envejecimiento UV."
      ),
      makeSquawk(
        153,
        "El piloto reporta: la palanca de control de ventilación de cabina está desconectada",
        "The pilot reports: cabin fresh air control lever is disconnected",
        "ATA 21",
        "Cessna 150 Commuter",
        "Conductos de Aire / Air Ducting",
        "Reconectar el cable Bowden de mando flexible a la compuerta de la toma de aire del fuselaje delantero."
      ),
      makeSquawk(
        154,
        "El piloto reporta: la luz de cortesía del techo permanece encendida al cerrar las puertas",
        "The pilot reports: overhead cabin courtesy dome light stays illuminated with doors closed",
        "ATA 33",
        "Cessna 172 Skyhawk",
        "Luz de Cortesía / Dome Light",
        "Inspeccionar interruptores de contacto de puerta (door jamb switches) y temporizador de apagado automático."
      ),
      makeSquawk(
        155,
        "El piloto reporta: el escalón de acceso al ala tiene remaches sueltos",
        "The pilot reports: cabin boarding wing step has loose rivets",
        "ATA 53",
        "Cessna 172 Skyhawk",
        "Fuselaje y Accesos / Boarding Step",
        "Inspeccionar remaches con juego en la brida de fijación inferior del fuselaje y reemplazar con pernos AN3."
      ),
      makeSquawk(
        156,
        "El piloto reporta: la chapa de aluminio del mamparo cortafuegos tiene rozamiento de cables",
        "The pilot reports: firewall aluminum sheet has chafing from control cables",
        "ATA 53",
        "Cessna 150 Commuter",
        "Cortafuegos / Firewall",
        "Instalar pasacables de goma (grommets) resistentes al fuego y sellador elastomérico RTV de alta temperatura."
      ),
      makeSquawk(
        157,
        "El piloto reporta: la ventana abatible del copiloto se desprende de la bisagra superior",
        "The pilot reports: copilot opening window separates from upper hinge",
        "ATA 56",
        "Cessna 172 Skyhawk",
        "Bisagras de Ventana / Window Hinges",
        "Inspeccionar pernos de bisagra de plástico o aluminio y reemplazar tuercas autoblocantes elásticas."
      ),
      makeSquawk(
        158,
        "El piloto reporta: el extintor de incendios portátil de cabina tiene el precinto roto",
        "The pilot reports: portable cabin fire extinguisher has broken tamper seal",
        "ATA 25",
        "Cessna 172 Skyhawk",
        "Equipo de Seguridad / Fire Extinguisher",
        "Pesar el extintor de halón para verificar carga útil, revisar manómetro en verde y colocar precinto nuevo."
      ),
      makeSquawk(
        159,
        "El piloto reporta: las persianas parasol de cabina no se sostienen en posición",
        "The pilot reports: cockpit sun visors do not stay in position",
        "ATA 25",
        "Cessna 182 Skylane",
        "Parasoles / Sun Visors",
        "Ajustar la tuerca de fricción del montaje de bola y casquillo de los visores polarizados Rosen."
      ),
      makeSquawk(
        160,
        "El piloto reporta: el botiquín de primeros auxilios de emergencia está vencido",
        "The pilot reports: emergency first aid kit inspection date has expired",
        "ATA 25",
        "Cessna 208 Caravan",
        "Botiquín Médico / First Aid Kit",
        "Reemplazar suministros médicos caducados según lista reglamentaria y precintar con fecha de vencimiento."
      ),
    ],
  },

  // =========================================================================
  // PLAY 9: AVIÓNICA, RADIOS VHF, TRANSPONDEDOR Y PANEL DE AUDIO (ATA 23/34)
  // =========================================================================
  {
    playId: 9,
    title: "PLAY 9: Aviónica, Radios VHF y Transpondedor (ATA 23/34)",
    subtitle: "Reportes de Hangar • Sin Transmisión en Radio, Ruido en Auriculares y Falla Modo C",
    ataChapter: "ATA 23/34 Communications & Avionics",
    aircraftModel: "Garmin GNS / GTN / King KX-155",
    questions: [
      makeSquawk(
        161,
        "El piloto reporta: el radio transmisor VHF número uno no transmite pero sí recibe",
        "The pilot reports: VHF communications radio number one does not transmit but receives",
        "ATA 23",
        "Cessna 172 Skyhawk",
        "Radio VHF / Transceiver",
        "Inspeccionar el interruptor Push-To-Talk (PTT) en el cuerno de mando, cableado y conector de micrófono."
      ),
      makeSquawk(
        162,
        "El piloto reporta: el transpondedor no responde en modo C de reporte de altitud",
        "The pilot reports: transponder fails to respond in altitude reporting mode C",
        "ATA 34",
        "Cessna 172 Skyhawk",
        "Transpondedor / Transponder Mode C",
        "Inspeccionar el altímetro codificador ciego (blind encoder) y el arnés de datos digitales de código Gray."
      ),
      makeSquawk(
        163,
        "El piloto reporta: ruido estático continuo y chirridos en los auriculares al modular",
        "The pilot reports: continuous static noise and squeal in headsets when speaking",
        "ATA 23",
        "Cessna 150 Commuter",
        "Intercomunicador / Audio Intercom",
        "Comprobar el aislamiento de los jacks hembra de audio respecto a la estructura metálica del panel."
      ),
      makeSquawk(
        164,
        "El piloto reporta: la pantalla del navegador GPS se apaga intermitentemente en vuelo",
        "The pilot reports: GPS navigation display blanks intermittently during flight",
        "ATA 34",
        "Cessna 182 Skylane",
        "Navegador GPS / GPS Navigator",
        "Inspeccionar la bandeja de montaje del rack de aviónica por conectores traseros flojos o ventilador de enfriamiento trabado."
      ),
      makeSquawk(
        165,
        "El piloto reporta: la antena del radio de comunicaciones tiene la base agrietada y floja",
        "The pilot reports: communication radio antenna base is cracked and loose",
        "ATA 23",
        "Cessna 172 Skyhawk",
        "Antenas / Antenna Base",
        "Reemplazar la junta de caucho de montaje, sellar con RTV y verificar continuidad de la lámina de masa interior."
      ),
      makeSquawk(
        166,
        "El piloto reporta: el medidor de desviación de rumbo VOR no centra en ninguna estación",
        "The pilot reports: course deviation indicator fails to center on any VOR radial",
        "ATA 34",
        "Cessna 172 Skyhawk",
        "Instrumento VOR / Course Deviation Indicator",
        "Realizar prueba de banco con generador de señales de rampa para calibrar el resolver y aguja CDI."
      ),
      makeSquawk(
        167,
        "El piloto reporta: el transmisor localizador de emergencia emite falsa alarma en el aterrizaje",
        "The pilot reports: emergency locator transmitter emits false alarm upon landing",
        "ATA 25",
        "Cessna 172 Skyhawk",
        "Baliza ELT / Emergency Locator Transmitter",
        "Inspeccionar la sensibilidad del interruptor de impacto inercial (G-switch) y resetear a posición ARM."
      ),
      makeSquawk(
        168,
        "El piloto reporta: el receptor ADS-B no muestra tráfico cercano en la pantalla",
        "The pilot reports: ADS-B receiver fails to display nearby traffic targets on screen",
        "ATA 34",
        "Cessna 182 Skylane",
        "Tráfico ADS-B / Traffic System",
        "Comprobar antena de 978/1090 MHz en la panza inferior y enlace de datos RS-232 con el display multifunción."
      ),
      makeSquawk(
        169,
        "El piloto reporta: el panel de audio no conmuta la señal al altavoz de cabina",
        "The pilot reports: audio panel fails to switch audio to cabin speaker",
        "ATA 23",
        "Cessna 210 Centurion",
        "Panel de Audio / Audio Panel",
        "Inspeccionar el amplificador de audio interno del panel Garmin GMA-340 y el cono del altavoz de techo."
      ),
      makeSquawk(
        170,
        "El piloto reporta: la pantalla del horizonte de cristal PFD muestra una cruz roja en actitud",
        "The pilot reports: PFD glass cockpit screen shows red X over attitude display",
        "ATA 34",
        "Cessna 172 Skyhawk",
        "Pantalla PFD / Primary Flight Display",
        "Falla de la unidad AHRS (Attitude and Heading Reference System); verificar alimentación de energía y calibración giroscópica."
      ),
      makeSquawk(
        171,
        "El piloto reporta: la recepción de radio VHF se corta a más de diez millas náuticas",
        "The pilot reports: VHF radio reception cuts out beyond ten nautical miles",
        "ATA 23",
        "Cessna 150 Commuter",
        "Cable Coaxial / Coaxial Cable",
        "Medir la relación de onda estacionaria (VSWR) del cable coaxial RG-58 y verificar atenuación en conectores BNC."
      ),
      makeSquawk(
        172,
        "El piloto reporta: el indicador de viraje giroscópico y resbale no se ilumina de noche",
        "The pilot reports: turn and slip indicator internal night light does not illuminate",
        "ATA 33",
        "Cessna 172 Skyhawk",
        "Iluminación de Instrumento / Instrument Lighting",
        "Reemplazar las bombillas de cuña de 28V miniatura en el bisel del instrumento."
      ),
      makeSquawk(
        173,
        "El piloto reporta: el botón de transferencia de frecuencia de radio está pegajoso y no conmuta",
        "The pilot reports: radio frequency transfer toggle button is sticky and fails to flip-flop",
        "ATA 23",
        "Cessna 172 Skyhawk",
        "Control de Frecuencia / Frequency Flip-Flop",
        "Limpiar los contactos del pulsador frontal con limpiador de contactos electrónicos de evaporación rápida."
      ),
      makeSquawk(
        174,
        "El piloto reporta: el piloto automático no se engancha en modo de mantenimiento de altitud",
        "The pilot reports: autopilot fails to engage in altitude hold mode",
        "ATA 22",
        "Cessna 182 Skylane",
        "Piloto Automático / Autopilot",
        "Inspeccionar el sensor de presión de altitud barométrica del computador del piloto automático S-TEC."
      ),
      makeSquawk(
        175,
        "El piloto reporta: la aguja del indicador ADF gira continuamente sin sintonizar la baliza",
        "The pilot reports: ADF indicator needle spins continuously without tuning beacon",
        "ATA 34",
        "Cessna 150 Commuter",
        "Radiogoniómetro / ADF System",
        "Comprobar la antena combinada de cuadro y sentido (loop and sense antenna) en la parte superior del fuselaje."
      ),
      makeSquawk(
        176,
        "El piloto reporta: la señal del radiobaliza marcador de aproximación suena débil",
        "The pilot reports: marker beacon receiver audio signal sounds very weak",
        "ATA 34",
        "Cessna 172 Skyhawk",
        "Radiobaliza / Marker Beacon",
        "Comprobar el interruptor de sensibilidad (High/Low) y la antena tipo bote (boat antenna) inferior."
      ),
      makeSquawk(
        177,
        "El piloto reporta: las mechas de descarga estática en los alerones están deshilachadas y rotas",
        "The pilot reports: static discharge wicks on ailerons are frayed and broken",
        "ATA 23",
        "Cessna 210 Centurion",
        "Descargadores Estáticos / Static Wicks",
        "Medir resistencia eléctrica con megóhmetro (entre 6 y 100 megaohmios) y reemplazar elementos mecánicamente dañados."
      ),
      makeSquawk(
        178,
        "El piloto reporta: el mensaje de batería baja de la base de datos GPS aparece en pantalla",
        "The pilot reports: GPS internal memory battery low message appears on screen",
        "ATA 34",
        "Cessna 172 Skyhawk",
        "Batería de Memoria / Memory Battery",
        "Reemplazar la pila de litio interna tipo botón CR2032 de retención de memoria en el taller de aviónica."
      ),
      makeSquawk(
        179,
        "El piloto reporta: la antena GPS pierde la señal satelital en giros pronunciados",
        "The pilot reports: GPS antenna loses satellite lock during steep turns",
        "ATA 34",
        "Cessna 182 Skylane",
        "Antena Satelital / GPS Antenna",
        "Comprobar el plano de tierra bajo la antena en el techo de cabina y atenuación del cable coaxial de baja pérdida."
      ),
      makeSquawk(
        180,
        "El piloto reporta: el sistema de aviso de proximidad al terreno emite alertas falsas",
        "The pilot reports: terrain awareness warning system generates false voice alerts",
        "ATA 34",
        "Cessna 208 Caravan",
        "Alerta de Terreno / TAWS System",
        "Actualizar la base de datos de terreno y verificar la calibración de la entrada de altitud geométrica GPS."
      ),
    ],
  },

  // =========================================================================
  // PLAY 10: TURBOPROP PT6A, POTENCIA INESTABLE, BLEED AIR Y REVERSE (ATA 71/72/36/61)
  // =========================================================================
  {
    playId: 10,
    title: "PLAY 10: Turboprop PT6A, Potencia Inestable y Reverse (ATA 71/72/36/61)",
    subtitle: "Reportes de Hangar • Falla en Rango Beta, ITT Alta y Fugas de Sangrado",
    ataChapter: "ATA 71/72/36 Turboprop Systems",
    aircraftModel: "Cessna 208 Caravan / PT6A-114A",
    questions: [
      makeSquawk(
        181,
        "El piloto reporta: la hélice no entra en rango beta ni paso reverso al aterrizar",
        "The pilot reports: propeller fails to enter beta range or reverse upon landing",
        "ATA 61",
        "Cessna 208 Caravan",
        "Rango Beta y Reverso / Beta Range & Reverse",
        "Ajustar el cable de interconexión beta, la válvula de retroalimentación de la hélice y anillo de carbón."
      ),
      makeSquawk(
        182,
        "El piloto reporta: la temperatura interetapas de turbina supera los ochocientos grados en el arranque",
        "The pilot reports: interstage turbine temperature exceeds eight hundred degrees during engine start",
        "ATA 77",
        "Cessna 208 Caravan",
        "Temperatura de Turbina / Hot Start (ITT)",
        "¡ARRANQUE CALIENTE! Cortar combustible, verificar voltaje de batería en arranque y limpiar inyectores dúplex."
      ),
      makeSquawk(
        183,
        "El piloto reporta: oscilación y caza de torque de hasta doscientas libras-pie en crucero",
        "The pilot reports: torque oscillation and hunting up to two hundred foot-pounds in cruise",
        "ATA 73",
        "Cessna 208 Caravan",
        "Unidad de Control de Combustible / FCU",
        "Inspeccionar el fuelle de control neumático P3/Py de la FCU Woodward y limpiar filtro de aire de la unidad."
      ),
      makeSquawk(
        184,
        "El piloto reporta: la válvula de sangrado del compresor permanece abierta a alta potencia",
        "The pilot reports: compressor bleed valve remains open at high engine power",
        "ATA 75",
        "Cessna 208 Caravan",
        "Válvula de Alivio / Compressor Bleed Valve",
        "Limpiar el orificio neumático de la válvula de sangrado de aire (bleed valve) para evitar pérdida de torque."
      ),
      makeSquawk(
        185,
        "El piloto reporta: silbido agudo y olor a aire de sangrado caliente en la cabina",
        "The pilot reports: high pitch whistling noise and hot bleed air smell in cockpit",
        "ATA 36",
        "Cessna 208 Caravan",
        "Ductos Neumáticos / Bleed Air Lines",
        "Inspeccionar juntas de abrazaderas tipo V-band en el ducto de acero inoxidable del mamparo de motor."
      ),
      makeSquawk(
        186,
        "El piloto reporta: la luz ámbar de virutas de metal en el aceite de motor se encendió en vuelo",
        "The pilot reports: amber engine oil chip detector annunciator illuminated in flight",
        "ATA 79",
        "Cessna 208 Caravan",
        "Detector de Virutas / Chip Detector",
        "Retirar los tapones magnéticos de la caja reductora y cárter accesorio e inspeccionar por partículas ferrosas."
      ),
      makeSquawk(
        187,
        "El piloto reporta: la velocidad de la turbina del compresor Ng no alcanza el cien por ciento",
        "The pilot reports: compressor turbine speed Ng fails to reach one hundred percent",
        "ATA 72",
        "Cessna 208 Caravan",
        "Rendimiento de Compresor / Ng Speed",
        "Realizar lavado de compresor con agua desmineralizada para remover suciedad de los álabes del compresor axial."
      ),
      makeSquawk(
        188,
        "El piloto reporta: la bomba auxiliar de combustible de reserva no enciende en modo automático",
        "The pilot reports: standby fuel boost pump does not start automatically",
        "ATA 28",
        "Cessna 208 Caravan",
        "Bomba de Reserva / Standby Boost Pump",
        "Comprobar el interruptor de presión de combustible (fuel pressure switch) que activa el circuito de reserva."
      ),
      makeSquawk(
        189,
        "El piloto reporta: el sistema de palanca de emergencia de potencia de motor tiene juego excesivo",
        "The pilot reports: emergency engine power lever system has excessive free play",
        "ATA 76",
        "Cessna 208 Caravan",
        "Palanca de Emergencia / Emergency Power Lever",
        "Inspeccionar el varillaje de accionamiento manual directo de la FCU que bypassa el fuelle neumático."
      ),
      makeSquawk(
        190,
        "El piloto reporta: el indicador de presión de aceite de la caja de engranajes de la hélice fluctúa",
        "The pilot reports: propeller reduction gearbox oil pressure gauge fluctuates",
        "ATA 79",
        "Cessna 208 Caravan",
        "Caja Reductora / Reduction Gearbox",
        "Comprobar el transmisor de presión de aceite, el filtro de aceite principal y válvula reguladora de presión."
      ),
      makeSquawk(
        191,
        "El piloto reporta: humo blanco saliendo por los tubos de escape al cortar el motor",
        "The pilot reports: white smoke coming from exhaust stacks during engine shutdown",
        "ATA 71",
        "Cessna 208 Caravan",
        "Válvula de Purga / Fuel Purge Valve",
        "Inspeccionar la válvula ecológica de drenaje de combustible EPA y sellos de laberinto de la turbina."
      ),
      makeSquawk(
        192,
        "El piloto reporta: la palanca de condición de combustible no traba firmemente en ralentí bajo",
        "The pilot reports: fuel condition lever fails to detent firmly in low idle",
        "ATA 76",
        "Cessna 208 Caravan",
        "Cuadrante de Gases / Throttle Quadrant",
        "Ajustar la muesca de traba (detent plate) y el resorte de retención en la consola de mando central."
      ),
      makeSquawk(
        193,
        "El piloto reporta: el arrancador generador se calienta excesivamente al arrancar la turbina",
        "The pilot reports: starter generator overheats excessively during turbine start",
        "ATA 80",
        "Cessna 208 Caravan",
        "Arrancador Generador / Starter-Generator",
        "Inspeccionar desgaste de las cuatro escobillas de carbón, conmutador sucio y tensión del cable de alimentación."
      ),
      makeSquawk(
        194,
        "El piloto reporta: la válvula shutoff de corte de sangrado neumático no cierra eléctricamente",
        "The pilot reports: pneumatic bleed air shutoff valve does not close electrically",
        "ATA 36",
        "Cessna 208 Caravan",
        "Válvula PRSOV / Bleed Shutoff Valve",
        "Comprobar el solenoide eléctrico de accionamiento de la válvula PRSOV y continuidad del arnés cortafuegos."
      ),
      makeSquawk(
        195,
        "El piloto reporta: goteo de combustible en la brida de la cámara de combustión",
        "The pilot reports: fuel dripping at the combustion chamber case flange",
        "ATA 72",
        "Cessna 208 Caravan",
        "Inyectores y Sellos / Fuel Manifold",
        "Reemplazar juntas de cobre de las boquillas inyectoras de combustible y apretar según torque del manual PT6A."
      ),
      makeSquawk(
        196,
        "El piloto reporta: vibración en los tubos de escape de acero inoxidable",
        "The pilot reports: vibration on stainless steel exhaust stacks",
        "ATA 78",
        "Cessna 208 Caravan",
        "Tubos de Escape / Exhaust Stacks",
        "Inspeccionar los tirantes de montaje de los tubos de escape por grietas y pernos flojos en las abrazaderas."
      ),
      makeSquawk(
        197,
        "El piloto reporta: el gobernador de sobrevelocidad de la hélice no corta el paso en la prueba",
        "The pilot reports: propeller overspeed governor fails to limit RPM during ground test",
        "ATA 61",
        "Cessna 208 Caravan",
        "Gobernador de Sobrevelocidad / Overspeed Governor",
        "Comprobar el solenoide de prueba del gobernador y calibración del límite centrífugo (2120 RPM)."
      ),
      makeSquawk(
        198,
        "El piloto reporta: la calefacción eléctrica de la toma de aire inercial del motor no calienta",
        "The pilot reports: engine inertial separator electric anti-ice vane does not heat",
        "ATA 30",
        "Cessna 208 Caravan",
        "Separador Inercial / Inertial Separator",
        "Medir continuidad en los elementos térmicos de la compuerta del separador inercial contra hielo."
      ),
      makeSquawk(
        199,
        "El piloto reporta: la indicación de torque fluctúa violentamente con cambios de paso de hélice",
        "The pilot reports: torque indication fluctuates wildly with propeller pitch changes",
        "ATA 77",
        "Cessna 208 Caravan",
        "Transductor de Torque / Torquemeter",
        "Inspeccionar la cámara hidráulica del torquímetro en la caja reductora y purgar aire del transmisor."
      ),
      makeSquawk(
        200,
        "El piloto reporta: el sistema de aviso de falla de combustible se enciende en virajes cerrados",
        "The pilot reports: fuel system low level annunciator illuminates in steep turns",
        "ATA 28",
        "Cessna 208 Caravan",
        "Tanque Colector / Reservoir Tank",
        "Inspeccionar la válvula unidireccional tipo aleta del tanque colector de combustible inferior por atascamiento."
      ),
    ],
  },
];

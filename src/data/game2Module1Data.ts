export interface Module1Question {
  id: number;
  targetWord: string;
  ipa?: string;
  correctSentence: string;
  falseSentences: [string, string];
  falseSentencesSpanish?: [string, string];
  spanish: string;
}

export interface Module1Play {
  playId: number;
  title: string;
  description: string;
  rangeText: string;
  questions: Module1Question[];
}

export const MODULE_1_PLAYS: Module1Play[] = [
  // =========================================================================
  // PLAY 1: ORACIONES 1 A 20 (COMPONENTES ESTRUCTURALES Y SUSTENTACIÓN)
  // =========================================================================
  {
    playId: 1,
    title: "PLAY 1",
    rangeText: "ORACIONES 1 - 20",
    description: "Componentes estructurales primarios, sustentación e instrumentos básicos",
    questions: [
      {
        id: 1,
        targetWord: "WING",
        ipa: "/wɪŋ/",
        correctSentence: "The wing provides aerodynamic lift to support the aircraft.",
        falseSentences: [
          "The wing is located inside the passenger cabin floor.",
          "The wing reduces electrical voltage to zero during flight."
        ],
        falseSentencesSpanish: [
          "El ala está situada dentro del suelo de la cabina de pasajeros.",
          "El ala reduce el voltaje eléctrico a cero durante el vuelo."
        ],
        spanish: "El ala proporciona sustentación aerodinámica para sostener la aeronave."
      },
      {
        id: 2,
        targetWord: "FUSELAGE",
        ipa: "/ˈfjuː.zə.lɑːʒ/",
        correctSentence: "The fuselage is the main structural body of the aircraft.",
        falseSentences: [
          "The fuselage is a rotating blade mounted on the wingtip.",
          "The fuselage operates only when the hydraulic pump is disconnected."
        ],
        falseSentencesSpanish: [
          "El fuselaje es una pala giratoria montada en la punta del ala.",
          "El fuselaje funciona sólo cuando la bomba hidráulica está desconectada."
        ],
        spanish: "El fuselaje es el cuerpo estructural principal de la aeronave."
      },
      {
        id: 3,
        targetWord: "ENGINE",
        ipa: "/ˈen.dʒɪn/",
        correctSentence: "The engine produces forward thrust to propel the aircraft.",
        falseSentences: [
          "The engine is used to store hydraulic fluid in the rudder.",
          "The engine must be filled with cold water before takeoff."
        ],
        falseSentencesSpanish: [
          "El motor se utiliza para almacenar fluido hidráulico en el timón.",
          "El motor debe llenarse con agua fría antes del despegue."
        ],
        spanish: "El motor produce empuje hacia adelante para propulsar la aeronave."
      },
      {
        id: 4,
        targetWord: "COCKPIT",
        ipa: "/ˈkɒk.pɪt/",
        correctSentence: "The cockpit contains the flight instruments and flight controls.",
        falseSentences: [
          "The cockpit is installed inside the fuel tank.",
          "The cockpit is only accessible through the engine exhaust duct."
        ],
        falseSentencesSpanish: [
          "La cabina está instalada dentro del tanque de combustible.",
          "Sólo se puede acceder a la cabina a través del conducto de escape del motor."
        ],
        spanish: "La cabina de mando contiene los instrumentos y mandos de vuelo."
      },
      {
        id: 5,
        targetWord: "LANDING GEAR",
        ipa: "/ˈlæn.dɪŋ ɡɪər/",
        correctSentence: "Lower the landing gear before landing on the runway.",
        falseSentences: [
          "Retract the landing gear when parked at the gate.",
          "The landing gear generates pitch control in high altitude cruise."
        ],
        falseSentencesSpanish: [
          "Retraiga el tren de aterrizaje cuando esté estacionado en la puerta.",
          "El tren de aterrizaje genera control de cabeceo en crucero a gran altitud."
        ],
        spanish: "Baje el tren de aterrizaje antes de aterrizar en la pista."
      },
      {
        id: 6,
        targetWord: "PROPELLER",
        ipa: "/prəˈpel.ər/",
        correctSentence: "The propeller converts engine torque into aerodynamic thrust.",
        falseSentences: [
          "The propeller is used to pressurize the drinking water tank.",
          "The propeller is fixed permanently inside the avionics rack."
        ],
        falseSentencesSpanish: [
          "La hélice se utiliza para presurizar el tanque de agua potable.",
          "La hélice está fijada permanentemente dentro del bastidor de aviónica."
        ],
        spanish: "La hélice convierte el torque del motor en empuje aerodinámico."
      },
      {
        id: 7,
        targetWord: "ROTOR",
        ipa: "/ˈroʊ.tər/",
        correctSentence: "Inspect the main rotor blades for cracks and erosion.",
        falseSentences: [
          "The rotor is an internal part of the landing gear tire.",
          "The rotor must be painted with hydraulic oil every flight."
        ],
        falseSentencesSpanish: [
          "El rotor es una parte interna del neumático del tren de aterrizaje.",
          "El rotor debe pintarse con aceite hidráulico en cada vuelo."
        ],
        spanish: "Inspeccione las palas del rotor principal en busca de grietas y erosión."
      },
      {
        id: 8,
        targetWord: "TAIL",
        ipa: "/teɪl/",
        correctSentence: "The tail assembly provides directional and longitudinal stability.",
        falseSentences: [
          "The tail is located at the forward tip of the nose radome.",
          "The tail prevents fuel from entering the engine combustor."
        ],
        falseSentencesSpanish: [
          "La cola está ubicada en la punta delantera de la cúpula de la nariz.",
          "La cola evita que el combustible entre en la cámara de combustión del motor."
        ],
        spanish: "El conjunto de cola proporciona estabilidad direccional y longitudinal."
      },
      {
        id: 9,
        targetWord: "NOSE",
        ipa: "/noʊz/",
        correctSentence: "The nose section contains the weather radar and glide slope antennas.",
        falseSentences: [
          "The nose is installed behind the horizontal stabilizer.",
          "The nose provides reverse thrust for emergency descent."
        ],
        falseSentencesSpanish: [
          "La nariz está instalada detrás del estabilizador horizontal.",
          "El morro proporciona empuje inverso para un descenso de emergencia."
        ],
        spanish: "La sección de nariz contiene el radar meteorológico y antenas de senda de planeo."
      },
      {
        id: 10,
        targetWord: "CABIN",
        ipa: "/ˈkæb.ɪn/",
        correctSentence: "The passenger cabin is pressurized for safety at high altitudes.",
        falseSentences: [
          "The passenger cabin is filled with aviation fuel before departure.",
          "The cabin is located inside the turbine combustion chamber."
        ],
        falseSentencesSpanish: [
          "La cabina de pasajeros se llena con combustible de aviación antes de la salida.",
          "La cabina está ubicada dentro de la cámara de combustión de la turbina."
        ],
        spanish: "La cabina de pasajeros está presurizada por seguridad a gran altitud."
      },
      {
        id: 11,
        targetWord: "ALTIMETER",
        ipa: "/ælˈtɪm.ə.tər/",
        correctSentence: "Check the altimeter to verify the exact aircraft altitude.",
        falseSentences: [
          "The altimeter measures the temperature of the engine exhaust.",
          "The altimeter is used to lock the main passenger entrance door."
        ],
        falseSentencesSpanish: [
          "El altímetro mide la temperatura del escape del motor.",
          "El altímetro se utiliza para cerrar la puerta principal de entrada de pasajeros."
        ],
        spanish: "Verifique el altímetro para comprobar la altitud exacta de la aeronave."
      },
      {
        id: 12,
        targetWord: "AIRSPEED INDICATOR",
        ipa: "/ˈeər.spiːd ˈɪn.dɪ.keɪ.tər/",
        correctSentence: "The airspeed indicator shows calibrated speed in knots.",
        falseSentences: [
          "The airspeed indicator measures hydraulic fluid pressure in psi.",
          "The airspeed indicator indicates the amount of potable water onboard."
        ],
        falseSentencesSpanish: [
          "El indicador de velocidad del aire mide la presión del fluido hidráulico en psi.",
          "El indicador de velocidad indica la cantidad de agua potable a bordo."
        ],
        spanish: "El indicador de velocidad muestra la velocidad calibrada en nudos."
      },
      {
        id: 13,
        targetWord: "FUEL GAUGE",
        ipa: "/ˈfjuː.əl ɡeɪdʒ/",
        correctSentence: "The fuel gauge indicates the total fuel quantity in kilograms.",
        falseSentences: [
          "The fuel gauge controls the landing gear extension speed.",
          "The fuel gauge measures cabin oxygen concentration during descent."
        ],
        falseSentencesSpanish: [
          "El indicador de combustible controla la velocidad de extensión del tren de aterrizaje.",
          "El indicador de combustible mide la concentración de oxígeno en la cabina durante el descenso."
        ],
        spanish: "El indicador de combustible indica la cantidad total de combustible en kilogramos."
      },
      {
        id: 14,
        targetWord: "TRANSPONDER",
        ipa: "/trænˈspɒn.dər/",
        correctSentence: "Set the transponder code assigned by air traffic control.",
        falseSentences: [
          "The transponder cools the engine oil before landing.",
          "The transponder is a mechanical valve on the brake line."
        ],
        falseSentencesSpanish: [
          "El transpondedor enfría el aceite del motor antes del aterrizaje.",
          "El transpondedor es una válvula mecánica en la línea de freno."
        ],
        spanish: "Configure el código del transpondedor asignado por el control de tráfico aéreo."
      },
      {
        id: 15,
        targetWord: "RADIO",
        ipa: "/ˈreɪ.di.oʊ/",
        correctSentence: "Use the VHF radio to establish communication with the tower.",
        falseSentences: [
          "Use the VHF radio to inject oil into the hydraulic reservoir.",
          "The radio automatically balances the weight of the wings."
        ],
        falseSentencesSpanish: [
          "Utilice la radio VHF para inyectar aceite en el depósito hidráulico.",
          "La radio equilibra automáticamente el peso de las alas."
        ],
        spanish: "Use la radio VHF para establecer comunicación con la torre."
      },
      {
        id: 16,
        targetWord: "AUTOPILOT",
        ipa: "/ˈɔː.toʊˌpaɪ.lət/",
        correctSentence: "Engage the autopilot to maintain the selected flight heading.",
        falseSentences: [
          "The autopilot empties the engine oil tank in cruise flight.",
          "The autopilot is a manual lever used only on the runway apron."
        ],
        falseSentencesSpanish: [
          "El piloto automático vacía el tanque de aceite del motor en vuelo de crucero.",
          "El piloto automático es una palanca manual que se utiliza únicamente en la plataforma de la pista."
        ],
        spanish: "Active el piloto automático para mantener el rumbo de vuelo seleccionado."
      },
      {
        id: 17,
        targetWord: "FLAP",
        ipa: "/flæp/",
        correctSentence: "Extend the trailing edge flaps to increase lift during approach.",
        falseSentences: [
          "Extend the flaps to disconnect the aircraft electrical generator.",
          "The flaps are used to close the engine air intake during flight."
        ],
        falseSentencesSpanish: [
          "Extienda los flaps para desconectar el generador eléctrico del avión.",
          "Las aletas se utilizan para cerrar la entrada de aire del motor durante el vuelo."
        ],
        spanish: "Extienda los flaps del borde de salida para aumentar la sustentación durante la aproximación."
      },
      {
        id: 18,
        targetWord: "SLAT",
        ipa: "/slæt/",
        correctSentence: "The leading edge slats deploy to delay aerodynamic stall.",
        falseSentences: [
          "The slats are installed inside the passenger oxygen masks.",
          "The slats ignite fuel in the auxiliary power unit."
        ],
        falseSentencesSpanish: [
          "Las lamas están instaladas en el interior de las máscaras de oxígeno de los pasajeros.",
          "Las láminas encienden el combustible en la unidad de potencia auxiliar."
        ],
        spanish: "Los slats del borde de ataque se despliegan para retrasar la pérdida aerodinámica."
      },
      {
        id: 19,
        targetWord: "SPOILER",
        ipa: "/ˈspɔɪ.lər/",
        correctSentence: "Raise the flight spoilers to reduce lift and increase descent rate.",
        falseSentences: [
          "The spoilers increase engine thrust during emergency takeoff.",
          "Raise the spoilers to fill the fuel tanks with nitrogen."
        ],
        falseSentencesSpanish: [
          "Los spoilers aumentan el empuje del motor durante el despegue de emergencia.",
          "Levante los spoilers para llenar los tanques de combustible con nitrógeno."
        ],
        spanish: "Levante los spoilers de vuelo para reducir sustentación y aumentar la razón de descenso."
      },
      {
        id: 20,
        targetWord: "AILERON",
        ipa: "/ˈeɪ.lə.rɒn/",
        correctSentence: "Move the control wheel to deflect the ailerons for roll control.",
        falseSentences: [
          "The ailerons are used to start the turbine engine.",
          "The aileron is the structural beam inside the landing gear axle."
        ],
        falseSentencesSpanish: [
          "Los alerones se utilizan para arrancar el motor de turbina.",
          "El alerón es la viga estructural dentro del eje del tren de aterrizaje."
        ],
        spanish: "Mueva el volante de control para deflectar los alerones para el control de alabeo."
      }
    ]
  },

  // =========================================================================
  // PLAY 2: ORACIONES 21 A 40 (MANDOS, FUERZAS Y ESTRUCTURAS AERONÁUTICAS)
  // =========================================================================
  {
    playId: 2,
    title: "PLAY 2",
    rangeText: "ORACIONES 21 - 40",
    description: "Mandos primarios, fuerzas aerodinámicas y componentes de fuselaje",
    questions: [
      {
        id: 21,
        targetWord: "ELEVATOR",
        ipa: "/ˈel.ə.veɪ.tər/",
        correctSentence: "The elevator controls pitch attitude about the lateral axis.",
        falseSentences: [
          "The elevator carries passenger luggage between cargo compartments.",
          "The elevator heats the engine oil before landing."
        ],
        falseSentencesSpanish: [
          "El elevador transporta el equipaje de los pasajeros entre los compartimentos de carga.",
          "El elevador calienta el aceite del motor antes de aterrizar."
        ],
        spanish: "El elevador controla la actitud de cabeceo sobre el eje lateral."
      },
      {
        id: 22,
        targetWord: "RUDDER",
        ipa: "/ˈrʌd.ər/",
        correctSentence: "Press the rudder pedals to control aircraft yaw about the vertical axis.",
        falseSentences: [
          "The rudder is a hydraulic pump located inside the nose wheel.",
          "Press the rudder pedals to inflate the emergency slides."
        ],
        falseSentencesSpanish: [
          "El timón es una bomba hidráulica ubicada dentro de la rueda de morro.",
          "Presione los pedales del timón para inflar los toboganes de emergencia."
        ],
        spanish: "Presione los pedales del timón para controlar la guiñada sobre el eje vertical."
      },
      {
        id: 23,
        targetWord: "THRUST",
        ipa: "/θrʌst/",
        correctSentence: "Set maximum takeoff thrust on both engine power levers.",
        falseSentences: [
          "Thrust is the resistance of air flowing around the tail surface.",
          "Apply maximum thrust to lock the passenger seatbelts."
        ],
        falseSentencesSpanish: [
          "El empuje es la resistencia del aire que fluye alrededor de la superficie de la cola.",
          "Aplique el máximo empuje para bloquear los cinturones de seguridad de los pasajeros."
        ],
        spanish: "Ajuste el empuje máximo de despegue en ambas palancas de potencia."
      },
      {
        id: 24,
        targetWord: "DRAG",
        ipa: "/dræɡ/",
        correctSentence: "Aerodynamic drag increases significantly as airspeed increases.",
        falseSentences: [
          "Drag is the upward force generated by the wings.",
          "Drag is measured by the cabin temperature controller."
        ],
        falseSentencesSpanish: [
          "El arrastre es la fuerza hacia arriba generada por las alas.",
          "La resistencia se mide mediante el controlador de temperatura de la cabina."
        ],
        spanish: "El arrastre aerodinámico aumenta significativamente a medida que aumenta la velocidad."
      },
      {
        id: 25,
        targetWord: "LIFT",
        ipa: "/lɪft/",
        correctSentence: "The airfoil generates lift when air flows faster over its upper surface.",
        falseSentences: [
          "Lift pulls the aircraft down toward the center of the earth.",
          "Lift is stored in high-pressure cylinders inside the cargo bay."
        ],
        falseSentencesSpanish: [
          "La sustentación empuja el avión hacia el centro de la tierra.",
          "El elevador se almacena en cilindros de alta presión dentro del compartimento de carga."
        ],
        spanish: "El perfil alar genera sustentación cuando el aire fluye más rápido sobre su superficie superior."
      },
      {
        id: 26,
        targetWord: "WEIGHT",
        ipa: "/weɪt/",
        correctSentence: "Total aircraft weight must remain below the maximum certified limits.",
        falseSentences: [
          "Aircraft weight is eliminated completely by extending the flaps.",
          "The weight of the aircraft depends only on the color of the paint."
        ],
        falseSentencesSpanish: [
          "El peso del avión se elimina por completo extendiendo los flaps.",
          "El peso del avión depende únicamente del color de la pintura."
        ],
        spanish: "El peso total de la aeronave debe permanecer por debajo de los límites máximos certificados."
      },
      {
        id: 27,
        targetWord: "PITCH",
        ipa: "/pɪtʃ/",
        correctSentence: "Adjust the pitch attitude using the control column.",
        falseSentences: [
          "Pitch is the rotation of the aircraft around its longitudinal axis.",
          "Pitch is the electrical current supplied to the navigation lights."
        ],
        falseSentencesSpanish: [
          "El cabeceo es la rotación del avión alrededor de su eje longitudinal.",
          "El paso es la corriente eléctrica suministrada a las luces de navegación."
        ],
        spanish: "Ajuste la actitud de cabeceo utilizando la columna de control."
      },
      {
        id: 28,
        targetWord: "ROLL",
        ipa: "/roʊl/",
        correctSentence: "The aircraft enters a bank angle during a coordinated roll maneuver.",
        falseSentences: [
          "Roll is the movement of the aircraft nose up and down.",
          "Roll occurs when the parking brake is applied on the runway."
        ],
        falseSentencesSpanish: [
          "El balanceo es el movimiento del morro del avión hacia arriba y hacia abajo.",
          "El balanceo ocurre cuando se aplica el freno de mano en la pista."
        ],
        spanish: "La aeronave entra en ángulo de inclinación durante una maniobra coordinada de alabeo."
      },
      {
        id: 29,
        targetWord: "YAW",
        ipa: "/jɔː/",
        correctSentence: "Yaw movement is produced by deflecting the vertical rudder surface.",
        falseSentences: [
          "Yaw is the upward acceleration caused by the winglets.",
          "Yaw controls the temperature of the avionics cooling air."
        ],
        falseSentencesSpanish: [
          "La guiñada es la aceleración hacia arriba causada por las aletas.",
          "La guiñada controla la temperatura del aire de refrigeración de la aviónica."
        ],
        spanish: "El movimiento de guiñada se produce al deflectar la superficie del timón vertical."
      },
      {
        id: 30,
        targetWord: "STALL",
        ipa: "/stɔːl/",
        correctSentence: "Push the control stick forward immediately to recover from a stall.",
        falseSentences: [
          "A stall is when the aircraft lands with the thrust reversers open.",
          "Pull back firmly to increase angle of attack during a stall."
        ],
        falseSentencesSpanish: [
          "Una pérdida es cuando el avión aterriza con los inversores de empuje abiertos.",
          "Tire hacia atrás con firmeza para aumentar el ángulo de ataque durante una pérdida."
        ],
        spanish: "Empuje la palanca hacia adelante de inmediato para recuperarse de una pérdida."
      },
      {
        id: 31,
        targetWord: "SPAR",
        ipa: "/spɑːr/",
        correctSentence: "The wing spar is the primary longitudinal load-bearing structural member.",
        falseSentences: [
          "The wing spar is a rubber hose carrying potable water.",
          "The spar rotates at high speed inside the starter generator."
        ],
        falseSentencesSpanish: [
          "El larguero del ala es una manguera de goma que transporta agua potable.",
          "El larguero gira a alta velocidad dentro del generador de arranque."
        ],
        spanish: "El larguero del ala es el elemento estructural longitudinal principal de soporte de carga."
      },
      {
        id: 32,
        targetWord: "RIB",
        ipa: "/rɪb/",
        correctSentence: "Wing ribs maintain the aerodynamic camber and support the skin.",
        falseSentences: [
          "The rib is an electronic circuit board inside the flight computer.",
          "Wing ribs are removed before each commercial flight."
        ],
        falseSentencesSpanish: [
          "La costilla es una placa de circuito electrónico dentro de la computadora de vuelo.",
          "Las costillas de las alas se retiran antes de cada vuelo comercial."
        ],
        spanish: "Las costillas del ala mantienen la curvatura aerodinámica y soportan el revestimiento."
      },
      {
        id: 33,
        targetWord: "SKIN",
        ipa: "/skɪn/",
        correctSentence: "Inspect the aluminum skin panels for signs of corrosion and dents.",
        falseSentences: [
          "The skin is the internal magnetic core of the transformer.",
          "The aircraft skin is made entirely of non-conductive cardboard."
        ],
        falseSentencesSpanish: [
          "La piel es el núcleo magnético interno del transformador.",
          "El revestimiento del avión está fabricado íntegramente de cartón no conductor."
        ],
        spanish: "Inspeccione los paneles de revestimiento de aluminio en busca de corrosión y abolladuras."
      },
      {
        id: 34,
        targetWord: "STRUT",
        ipa: "/strʌt/",
        correctSentence: "Check the oleo landing gear strut for proper nitrogen pressure.",
        falseSentences: [
          "The strut is a transparent window in the passenger door.",
          "The strut supplies electric power to the galley ovens."
        ],
        falseSentencesSpanish: [
          "El puntal es una ventana transparente en la puerta del pasajero.",
          "El puntal suministra energía eléctrica a los hornos de cocina."
        ],
        spanish: "Verifique el montante oleoneumático del tren de aterrizaje para la presión correcta de nitrógeno."
      },
      {
        id: 35,
        targetWord: "BULKHEAD",
        ipa: "/ˈbʌlk.hed/",
        correctSentence: "The aft pressure bulkhead seals the pressurized cabin compartment.",
        falseSentences: [
          "The bulkhead is a small light bulb on the wingtip.",
          "The aft bulkhead must be left open during high altitude cruise."
        ],
        falseSentencesSpanish: [
          "El mamparo es una pequeña bombilla en la punta del ala.",
          "El mamparo de popa debe dejarse abierto durante un crucero a gran altitud."
        ],
        spanish: "El mamparo de presión trasero sella el compartimiento presurizado de la cabina."
      },
      {
        id: 36,
        targetWord: "FRAME",
        ipa: "/freɪm/",
        correctSentence: "Fuselage frames provide circular cross-sectional strength to the fuselage.",
        falseSentences: [
          "Fuselage frames are flexible wires that transmit radio signals.",
          "The frame is a temporary cover used only during washing."
        ],
        falseSentencesSpanish: [
          "Los marcos del fuselaje son cables flexibles que transmiten señales de radio.",
          "El marco es una funda temporal que se utiliza únicamente durante el lavado."
        ],
        spanish: "Las cuadernas del fuselaje proporcionan resistencia en sección transversal circular al fuselaje."
      },
      {
        id: 37,
        targetWord: "FAIRING",
        ipa: "/ˈfeə.rɪŋ/",
        correctSentence: "The flap track fairing creates a smooth aerodynamic profile to reduce drag.",
        falseSentences: [
          "The fairing produces combustion spark for the turbofan engine.",
          "Remove all fairings before taking off in adverse weather."
        ],
        falseSentencesSpanish: [
          "El carenado produce chispas de combustión para el motor turbofan.",
          "Retire todos los carenados antes de despegar en condiciones climáticas adversas."
        ],
        spanish: "El carenado del carril de flap crea un perfil aerodinámico suave para reducir el arrastre."
      },
      {
        id: 38,
        targetWord: "NACELLE",
        ipa: "/nəˈsel/",
        correctSentence: "The engine nacelle encloses the engine core and accessories.",
        falseSentences: [
          "The nacelle is the pilot seat adjustment handle in the cockpit.",
          "The nacelle is an emergency raft stored in the wing root."
        ],
        falseSentencesSpanish: [
          "La góndola es la palanca de ajuste del asiento del piloto en la cabina.",
          "La góndola es una balsa de emergencia almacenada en la raíz del ala."
        ],
        spanish: "La góndola del motor aloja el núcleo del motor y los accesorios."
      },
      {
        id: 39,
        targetWord: "PYLON",
        ipa: "/ˈpaɪ.lɒn/",
        correctSentence: "The pylon securely attaches the engine nacelle to the wing structure.",
        falseSentences: [
          "The pylon is a plastic cup installed on the rudder trim wheel.",
          "The pylon pumps fuel directly to the passenger cabin."
        ],
        falseSentencesSpanish: [
          "El pilón es un vaso de plástico instalado en la rueda de ajuste del timón.",
          "El pilón bombea combustible directamente a la cabina de pasajeros."
        ],
        spanish: "El pilón fija de forma segura la góndola del motor a la estructura del ala."
      },
      {
        id: 40,
        targetWord: "COWLING",
        ipa: "/ˈkaʊ.lɪŋ/",
        correctSentence: "Open the engine cowlings to perform visual maintenance inspections.",
        falseSentences: [
          "The cowling is an electrical switch inside the weather radar.",
          "Engine cowlings must remain unlatched throughout all flight phases."
        ],
        falseSentencesSpanish: [
          "El capó es un interruptor eléctrico dentro del radar meteorológico.",
          "Los capós de los motores deben permanecer abiertos durante todas las fases de vuelo."
        ],
        spanish: "Abra los capós del motor para realizar inspecciones visuales de mantenimiento."
      }
    ]
  },

  // =========================================================================
  // PLAY 3: ORACIONES 41 A 60 (BORDES, MANDOS Y ACCIONES BÁSICAS)
  // =========================================================================
  {
    playId: 3,
    title: "PLAY 3",
    rangeText: "ORACIONES 41 - 60",
    description: "Bordes aerodinámicos, tren de aterrizaje y acciones mecánicas AMM",
    questions: [
      {
        id: 41,
        targetWord: "SPINNER",
        ipa: "/ˈspɪn.ər/",
        correctSentence: "The propeller spinner directs incoming airflow smoothly into the cowl.",
        falseSentences: [
          "The spinner is an indicator needle inside the fuel quantity display.",
          "The spinner stops the rotation of the main wheels upon touchdown."
        ],
        falseSentencesSpanish: [
          "La rueda giratoria es una aguja indicadora dentro de la pantalla de cantidad de combustible.",
          "La ruleta detiene la rotación de las ruedas principales al tocar tierra."
        ],
        spanish: "El cono frontal de la hélice dirige el flujo de aire entrante suavemente hacia el capó."
      },
      {
        id: 42,
        targetWord: "LEADING EDGE",
        ipa: "/ˈliː.dɪŋ edʒ/",
        correctSentence: "Inspect the wing leading edge for bird strike damage and ice buildup.",
        falseSentences: [
          "The leading edge is located at the extreme rear of the horizontal stabilizer.",
          "The leading edge discharges static electricity into the cockpit panel."
        ],
        falseSentencesSpanish: [
          "El borde de ataque está ubicado en el extremo trasero del estabilizador horizontal.",
          "El borde de ataque descarga electricidad estática en el panel de la cabina."
        ],
        spanish: "Inspeccione el borde de ataque del ala en busca de impacto de aves y acumulación de hielo."
      },
      {
        id: 43,
        targetWord: "TRAILING EDGE",
        ipa: "/ˈtreɪ.lɪŋ edʒ/",
        correctSentence: "The ailerons and flaps are hinged to the wing trailing edge.",
        falseSentences: [
          "The trailing edge faces forward directly into the incoming relative wind.",
          "The trailing edge stores the high-pressure oxygen cylinders."
        ],
        falseSentencesSpanish: [
          "El borde de salida mira hacia adelante directamente hacia el viento relativo entrante.",
          "El borde de salida almacena los cilindros de oxígeno de alta presión."
        ],
        spanish: "Los alerones y flaps están articulados al borde de salida del ala."
      },
      {
        id: 44,
        targetWord: "WINGLET",
        ipa: "/ˈwɪŋ.lət/",
        correctSentence: "The winglet reduces induced drag caused by wingtip vortices.",
        falseSentences: [
          "The winglet pumps hydraulic fluid to the nose steering cylinder.",
          "The winglet is an emergency evacuation horn in the cabin ceiling."
        ],
        falseSentencesSpanish: [
          "El ala bombea fluido hidráulico al cilindro de dirección de morro.",
          "El Winglet es una bocina de evacuación de emergencia situada en el techo de la cabina."
        ],
        spanish: "El winglet reduce el arrastre inducido causado por los vórtices de la punta del ala."
      },
      {
        id: 45,
        targetWord: "STABILIZER",
        ipa: "/ˈsteɪ.bə.laɪ.zər/",
        correctSentence: "Adjust the horizontal stabilizer trim to relieve control column loads.",
        falseSentences: [
          "The stabilizer heats the main landing gear tires before landing.",
          "The stabilizer is an optical sensor inside the compass unit."
        ],
        falseSentencesSpanish: [
          "El estabilizador calienta los neumáticos del tren de aterrizaje principal antes del aterrizaje.",
          "El estabilizador es un sensor óptico dentro de la unidad de la brújula."
        ],
        spanish: "Ajuste el compensador del estabilizador horizontal para aliviar las cargas de la columna de control."
      },
      {
        id: 46,
        targetWord: "FIN",
        ipa: "/fɪn/",
        correctSentence: "The vertical fin provides directional stability against lateral yawing.",
        falseSentences: [
          "The fin is a mechanical filter inside the engine fuel manifold.",
          "The vertical fin rotates 360 degrees when reverse thrust is applied."
        ],
        falseSentencesSpanish: [
          "La aleta es un filtro mecánico dentro del colector de combustible del motor.",
          "La aleta vertical gira 360 grados cuando se aplica empuje inverso."
        ],
        spanish: "La deriva vertical proporciona estabilidad direccional frente a la guiñada lateral."
      },
      {
        id: 47,
        targetWord: "WHEEL",
        ipa: "/wiːl/",
        correctSentence: "Inspect each main landing gear wheel for rim cracks and bolt torque.",
        falseSentences: [
          "The wheel is an aerodynamic flap attached to the cockpit window.",
          "Aircraft wheels must be greased with jet fuel every 50 hours."
        ],
        falseSentencesSpanish: [
          "La rueda es una trampilla aerodinámica fijada a la ventana de la cabina.",
          "Las ruedas de los aviones deben engrasarse con combustible para aviones cada 50 horas."
        ],
        spanish: "Inspeccione cada rueda del tren de aterrizaje principal en busca de grietas en la llanta y torque de pernos."
      },
      {
        id: 48,
        targetWord: "BRAKE",
        ipa: "/breɪk/",
        correctSentence: "Check brake wear pin indicators before approving the aircraft for flight.",
        falseSentences: [
          "The brake system increases aircraft airspeed during takeoff roll.",
          "Brakes are installed inside the pitot tube to measure dynamic pressure."
        ],
        falseSentencesSpanish: [
          "El sistema de frenos aumenta la velocidad del avión durante el despegue.",
          "Los frenos están instalados dentro del tubo Pitot para medir la presión dinámica."
        ],
        spanish: "Verifique los indicadores de desgaste del freno antes de autorizar el vuelo de la aeronave."
      },
      {
        id: 49,
        targetWord: "TYRE",
        ipa: "/taɪər/",
        correctSentence: "Measure the tyre inflation pressure only when the wheel assembly is cold.",
        falseSentences: [
          "Inflate aircraft tyres with pure kerosene to reduce thermal expansion.",
          "The tyre is a metallic gear wheel inside the transmission box."
        ],
        falseSentencesSpanish: [
          "Infle los neumáticos de los aviones con queroseno puro para reducir la expansión térmica.",
          "El neumático es una rueda dentada metálica dentro de la caja de transmisión."
        ],
        spanish: "Mida la presión de inflado del neumático únicamente cuando el conjunto de rueda esté frío."
      },
      {
        id: 50,
        targetWord: "AXLE",
        ipa: "/ˈæk.səl/",
        correctSentence: "Install the wheel bearing cone securely onto the landing gear axle.",
        falseSentences: [
          "The axle connects the radio transmitter to the cockpit speaker.",
          "The axle is a flexible cable that deflects the rudder trim tab."
        ],
        falseSentencesSpanish: [
          "El eje conecta el transmisor de radio con el altavoz del puesto de conducción.",
          "El eje es un cable flexible que desvía la pestaña de ajuste del timón."
        ],
        spanish: "Instale el cono del rodamiento de rueda de forma segura sobre el eje del tren de aterrizaje."
      },
      {
        id: 51,
        targetWord: "OLEO",
        ipa: "/ˈoʊ.li.oʊ/",
        correctSentence: "Service the oleo strut with hydraulic fluid and dry compressed nitrogen.",
        falseSentences: [
          "The oleo is an indicator light on the flight attendant panel.",
          "Fill the oleo strut with gasoline to keep the landing soft."
        ],
        falseSentencesSpanish: [
          "El oleo es una luz indicadora en el panel de la azafata.",
          "Llene el puntal oleo con gasolina para mantener el aterrizaje suave."
        ],
        spanish: "Efectúe el servicio del montante oleo con fluido hidráulico y nitrógeno seco comprimido."
      },
      {
        id: 52,
        targetWord: "DOOR",
        ipa: "/dɔːr/",
        correctSentence: "Ensure the passenger entry door is locked and the slide is armed.",
        falseSentences: [
          "Open the main cabin door during high-speed cruise flight.",
          "The passenger door is welded shut before every scheduled inspection."
        ],
        falseSentencesSpanish: [
          "Abra la puerta de la cabina principal durante un vuelo de crucero de alta velocidad.",
          "La puerta del pasajero se cierra soldada antes de cada inspección programada."
        ],
        spanish: "Asegúrese de que la puerta de entrada de pasajeros esté trabada y el tobogán armado."
      },
      {
        id: 53,
        targetWord: "HATCH",
        ipa: "/hætʃ/",
        correctSentence: "Secure the avionics access hatch with the quick-release quarter-turn fasteners.",
        falseSentences: [
          "The hatch generates electrical power when exposed to sunlight.",
          "Leave the nose gear inspection hatch open during the flight."
        ],
        falseSentencesSpanish: [
          "La trampilla genera energía eléctrica cuando se expone a la luz solar.",
          "Deje abierta la trampilla de inspección del tren de morro durante el vuelo."
        ],
        spanish: "Asegure la escotilla de acceso a aviónica con los sujetadores de apertura rápida de un cuarto de vuelta."
      },
      {
        id: 54,
        targetWord: "ACCESS PANEL",
        ipa: "/ˈæk.ses ˈpæn.əl/",
        correctSentence: "Remove access panel 312AR to inspect the hydraulic shutoff valve.",
        falseSentences: [
          "The access panel is an electronic instrument measuring engine thrust.",
          "Cut through the access panel using an oxyacetylene torch."
        ],
        falseSentencesSpanish: [
          "El panel de acceso es un instrumento electrónico que mide el empuje del motor.",
          "Corte el panel de acceso con un soplete de oxiacetileno."
        ],
        spanish: "Remueva el panel de acceso 312AR para inspeccionar la válvula de corte hidráulico."
      },
      {
        id: 55,
        targetWord: "ANTENNA",
        ipa: "/ænˈten.ə/",
        correctSentence: "Inspect the VHF communication antenna for structural bonding and sealing.",
        falseSentences: [
          "The antenna is a flexible rubber hose carrying hydraulic oil.",
          "Coat the antenna surface with conductive carbon grease."
        ],
        falseSentencesSpanish: [
          "La antena es una manguera de goma flexible que transporta aceite hidráulico.",
          "Cubra la superficie de la antena con grasa de carbón conductora."
        ],
        spanish: "Inspeccione la antena de comunicación VHF para conexión a masa estructural y sellado."
      },
      {
        id: 56,
        targetWord: "BEACON",
        ipa: "/ˈbiː.kən/",
        correctSentence: "Turn on the red anti-collision beacon light before starting the engines.",
        falseSentences: [
          "The beacon is a mechanical filter that removes water from fuel.",
          "The beacon must remain off at all times during engine ground run."
        ],
        falseSentencesSpanish: [
          "La baliza es un filtro mecánico que elimina el agua del combustible.",
          "La baliza debe permanecer apagada en todo momento durante el funcionamiento del motor en tierra."
        ],
        spanish: "Encienda la baliza roja anticolisión antes de poner en marcha los motores."
      },
      {
        id: 57,
        targetWord: "STROBE",
        ipa: "/stroʊb/",
        correctSentence: "The high-intensity strobe lights flash to improve visual aircraft identification.",
        falseSentences: [
          "Strobe lights are mounted inside the fuel storage tanks.",
          "The strobe light shuts down the engines when maximum speed is reached."
        ],
        falseSentencesSpanish: [
          "Las luces estroboscópicas están montadas dentro de los tanques de almacenamiento de combustible.",
          "La luz estroboscópica apaga los motores cuando se alcanza la velocidad máxima."
        ],
        spanish: "Las luces estroboscópicas de alta intensidad destellan para mejorar la identificación visual de la aeronave."
      },
      {
        id: 58,
        targetWord: "WINGTIP",
        ipa: "/ˈwɪŋ.tɪp/",
        correctSentence: "Position the red navigation light at the forward section of the left wingtip.",
        falseSentences: [
          "The wingtip contains the auxiliary power unit turbine wheel.",
          "Install the green navigation light on the left wingtip."
        ],
        falseSentencesSpanish: [
          "La punta del ala contiene la rueda de turbina de la unidad de potencia auxiliar.",
          "Instale la luz de navegación verde en la punta del ala izquierda."
        ],
        spanish: "Ubique la luz de navegación roja en la sección delantera de la punta del ala izquierda."
      },
      {
        id: 59,
        targetWord: "ACTUATE",
        ipa: "/ˈæk.tʃu.eɪt/",
        correctSentence: "Actuate the hydraulic landing gear lever to test the warning horn.",
        falseSentences: [
          "Actuate the fire extinguisher inside the fuel tank during refuel.",
          "Actuate the wing spar to fold the main passenger cabin floor."
        ],
        falseSentencesSpanish: [
          "Accione el extintor de incendios dentro del tanque de combustible durante el repostaje.",
          "Accione el larguero para plegar el piso de la cabina principal de pasajeros."
        ],
        spanish: "Accione la palanca del tren de aterrizaje hidráulico para probar la bocina de advertencia."
      },
      {
        id: 60,
        targetWord: "RETRACT",
        ipa: "/rɪˈtrækt/",
        correctSentence: "Retract the landing gear immediately after obtaining positive rate of climb.",
        falseSentences: [
          "Retract the landing gear while the aircraft is parked at the gate.",
          "Retract the cockpit windows to increase takeoff roll distance."
        ],
        falseSentencesSpanish: [
          "Retraiga el tren de aterrizaje mientras la aeronave esté estacionada en la puerta.",
          "Retraiga las ventanas de la cabina para aumentar la distancia de despegue."
        ],
        spanish: "Retraiga el tren de aterrizaje inmediatamente después de obtener régimen positivo de ascenso."
      }
    ]
  },

  // =========================================================================
  // PLAY 4: ORACIONES 61 A 80 (PROCEDIMIENTOS Y ACCIONES MECÁNICAS AMM)
  // =========================================================================
  {
    playId: 4,
    title: "PLAY 4",
    rangeText: "ORACIONES 61 - 80",
    description: "Operaciones de sistemas: presurización, torque, purgado y aislación",
    questions: [
      {
        id: 61,
        targetWord: "EXTEND",
        ipa: "/ɪkˈstend/",
        correctSentence: "Extend the wing trailing edge flaps to position 30 for landing.",
        falseSentences: [
          "Extend the landing gear while flying at maximum cruise Mach number.",
          "Extend the fuel lines outside the cabin windows during taxi."
        ],
        falseSentencesSpanish: [
          "Extienda el tren de aterrizaje mientras vuela al máximo número de Mach de crucero.",
          "Extienda las líneas de combustible fuera de las ventanas de la cabina durante el rodaje."
        ],
        spanish: "Extienda los flaps del borde de salida a la posición 30 para el aterrizaje."
      },
      {
        id: 62,
        targetWord: "PRESSURIZE",
        ipa: "/ˈpreʃ.ər.aɪz/",
        correctSentence: "Pressurize the hydraulic system using the electric auxiliary pump.",
        falseSentences: [
          "Pressurize the fuel tank with open oxygen gas torches.",
          "Pressurize the cabin to 50 psi while all doors are open."
        ],
        falseSentencesSpanish: [
          "Presurice el tanque de combustible con sopletes de gas oxígeno abiertos.",
          "Presurice la cabina a 50 psi mientras todas las puertas estén abiertas."
        ],
        spanish: "Presurice el sistema hidráulico utilizando la bomba auxiliar eléctrica."
      },
      {
        id: 63,
        targetWord: "DEPRESSURIZE",
        ipa: "/diːˈpreʃ.ər.aɪz/",
        correctSentence: "Depressurize the system completely before loosening any hydraulic fitting.",
        falseSentences: [
          "Depressurize the cockpit while climbing through 35,000 feet.",
          "Always loosen pressurized hydraulic lines with hand tools."
        ],
        falseSentencesSpanish: [
          "Despresurice la cabina mientras asciende a 35.000 pies.",
          "Afloje siempre las líneas hidráulicas presurizadas con herramientas manuales."
        ],
        spanish: "Despresurice el sistema por completo antes de aflojar cualquier conexión hidráulica."
      },
      {
        id: 64,
        targetWord: "LUBRICATE",
        ipa: "/ˈluː.brɪ.keɪt/",
        correctSentence: "Lubricate the control cable pulleys with the grease specified in the AMM.",
        falseSentences: [
          "Lubricate the brake friction discs with engine oil to stop squeaks.",
          "Lubricate the oxygen mask hoses with flammable petroleum jelly."
        ],
        falseSentencesSpanish: [
          "Lubrique los discos de fricción de los frenos con aceite de motor para detener los chirridos.",
          "Lubrique las mangueras de la máscara de oxígeno con vaselina inflamable."
        ],
        spanish: "Lubrique las poleas de cables de mando con la grasa especificada en el AMM."
      },
      {
        id: 65,
        targetWord: "CALIBRATE",
        ipa: "/ˈkæl.ɪ.breɪt/",
        correctSentence: "Calibrate the altimeter against certified pitot-static laboratory standards.",
        falseSentences: [
          "Calibrate the fuel tank by hitting the outer skin with a hammer.",
          "Calibrate the compass using a strong magnetic screwdriver."
        ],
        falseSentencesSpanish: [
          "Calibre el tanque de combustible golpeando la piel exterior con un martillo.",
          "Calibre la brújula con un destornillador magnético potente."
        ],
        spanish: "Calibre el altímetro contra estándares certificados de laboratorio pitot-estático."
      },
      {
        id: 66,
        targetWord: "INSPECT",
        ipa: "/ɪnˈspekt/",
        correctSentence: "Inspect the engine fan blades for cracks, nicks, and tip rub marks.",
        falseSentences: [
          "Inspect the turbine wheel only while the engine is running at full takeoff thrust.",
          "Never inspect structural rivets after severe turbulence events."
        ],
        falseSentencesSpanish: [
          "Inspeccione la rueda de la turbina sólo mientras el motor esté funcionando a pleno empuje de despegue.",
          "Nunca inspeccione remaches estructurales después de eventos de turbulencia severa."
        ],
        spanish: "Inspeccione los álabes del fan del motor en busca de grietas, muescas y rozamiento."
      },
      {
        id: 67,
        targetWord: "TEST",
        ipa: "/test/",
        correctSentence: "Test the emergency locator transmitter according to civil aviation regulations.",
        falseSentences: [
          "Test the fire extinguishing squib by igniting it with a lighter.",
          "Test the hydraulic pressure by cutting the return line with shears."
        ],
        falseSentencesSpanish: [
          "Pruebe el petardo extintor encendiéndolo con un encendedor.",
          "Pruebe la presión hidráulica cortando la línea de retorno con unas tijeras."
        ],
        spanish: "Pruebe el transmisor localizador de emergencia según las regulaciones de aviación civil."
      },
      {
        id: 68,
        targetWord: "REPAIR",
        ipa: "/rɪˈpeər/",
        correctSentence: "Repair the damaged composite fairing in accordance with the SRM manual.",
        falseSentences: [
          "Repair structural cracks using ordinary masking paper tape.",
          "Repair high-pressure lines by wrapping adhesive cotton bandages."
        ],
        falseSentencesSpanish: [
          "Repare las grietas estructurales utilizando cinta de papel de enmascarar común.",
          "Repare las líneas de alta presión envolviendo vendas adhesivas de algodón."
        ],
        spanish: "Repare el carenado de material compuesto dañado de acuerdo con el manual SRM."
      },
      {
        id: 69,
        targetWord: "OVERHAUL",
        ipa: "/ˈoʊ.vɚ.hɑːl/",
        correctSentence: "Overhaul the starter generator after reaching its approved flight hour limit.",
        falseSentences: [
          "Overhaul the engine during short passenger boarding stops.",
          "An overhaul requires painting the aircraft exterior without disassembling."
        ],
        falseSentencesSpanish: [
          "Revise el motor durante paradas breves para abordar pasajeros.",
          "Una revisión requiere pintar el exterior del avión sin desmontarlo."
        ],
        spanish: "Efectúe el reacondicionamiento (overhaul) del generador de arranque al alcanzar el límite aprobado."
      },
      {
        id: 70,
        targetWord: "TORQUE",
        ipa: "/tɔːrk/",
        correctSentence: "Torque the cylinder head bolts in proper sequence to the specified value.",
        falseSentences: [
          "Torque all structural bolts using maximum uncontrolled manual force.",
          "Never use a calibrated torque wrench when installing landing gear pins."
        ],
        falseSentencesSpanish: [
          "Apriete todos los pernos estructurales utilizando la máxima fuerza manual no controlada.",
          "Nunca utilice una llave dinamométrica calibrada al instalar los pasadores del tren de aterrizaje."
        ],
        spanish: "Aplique torque a los pernos de la culata en la secuencia correcta según el valor especificado."
      },
      {
        id: 71,
        targetWord: "SAFETY",
        ipa: "/ˈseɪf.ti/",
        correctSentence: "Safety wire the turnbuckles to prevent unthreading during aircraft vibration.",
        falseSentences: [
          "Safety wire should be made of loose household sewing thread.",
          "Leave critical flight control bolts loose without safety wire."
        ],
        falseSentencesSpanish: [
          "El cable de seguridad debe estar hecho de hilo de coser doméstico suelto.",
          "Deje sueltos los pernos críticos de control de vuelo sin cable de seguridad."
        ],
        spanish: "Asegure con alambre de frenar los tensores para evitar que se desrosquen por la vibración."
      },
      {
        id: 72,
        targetWord: "ISOLATE",
        ipa: "/ˈaɪ.sə.leɪt/",
        correctSentence: "Isolate the defective electrical circuit breaker before replacing the sensor.",
        falseSentences: [
          "Isolate the pilot from the flight controls during final approach.",
          "Isolate the fuel lines by opening all crossfeed valves."
        ],
        falseSentencesSpanish: [
          "Aislar al piloto de los controles de vuelo durante la aproximación final.",
          "Aísle las líneas de combustible abriendo todas las válvulas de alimentación cruzada."
        ],
        spanish: "Aísle el disyuntor eléctrico defectuoso antes de reemplazar el sensor."
      },
      {
        id: 73,
        targetWord: "DE-ENERGIZE",
        ipa: "/diːˈen.ər.dʒaɪz/",
        correctSentence: "De-energize the main electrical bus bars before performing avionics maintenance.",
        falseSentences: [
          "De-energize the hydraulic system by lighting a spark near the reservoir.",
          "Always perform electrical wiring splice repairs while high voltage is connected."
        ],
        falseSentencesSpanish: [
          "Desenergice el sistema hidráulico encendiendo una chispa cerca del depósito.",
          "Realice siempre reparaciones de empalmes de cableado eléctrico mientras esté conectado el alto voltaje."
        ],
        spanish: "Desenergice las barras colectoras eléctricas principales antes del mantenimiento de aviónica."
      },
      {
        id: 74,
        targetWord: "ENERGIZE",
        ipa: "/ˈen.ər.dʒaɪz/",
        correctSentence: "Energize the ground service bus using the external 115-volt power unit.",
        falseSentences: [
          "Energize the aircraft fuel tanks with direct 220-volt sparks.",
          "Energize the cabin oxygen system with open flame torches."
        ],
        falseSentencesSpanish: [
          "Energice los tanques de combustible de los aviones con chispas directas de 220 voltios.",
          "Energice el sistema de oxígeno de la cabina con antorchas de llama abierta."
        ],
        spanish: "Energice la barra de servicio de tierra utilizando la unidad externa de potencia de 115 voltios."
      },
      {
        id: 75,
        targetWord: "BLEED",
        ipa: "/bliːd/",
        correctSentence: "Bleed all trapped air from the brake hydraulic lines until fluid runs clear.",
        falseSentences: [
          "Bleed the passenger cabin oxygen until the pressure drops to zero.",
          "Trapped air inside brake lines improves braking efficiency."
        ],
        falseSentencesSpanish: [
          "Purgue el oxígeno de la cabina de pasajeros hasta que la presión baje a cero.",
          "El aire atrapado dentro de las líneas de freno mejora la eficiencia de frenado."
        ],
        spanish: "Sangre todo el aire atrapado de las líneas hidráulicas de freno hasta que el fluido salga limpio."
      },
      {
        id: 76,
        targetWord: "DRAIN",
        ipa: "/dreɪn/",
        correctSentence: "Drain the fuel tank sumps before flight to inspect for water contamination.",
        falseSentences: [
          "Drain all engine oil directly onto the airport taxiway.",
          "Never drain water sumps because water increases fuel octane."
        ],
        falseSentencesSpanish: [
          "Drene todo el aceite del motor directamente en la calle de rodaje del aeropuerto.",
          "Nunca drene los sumideros de agua porque el agua aumenta el octanaje del combustible."
        ],
        spanish: "Drene los sumideros del tanque de combustible antes del vuelo para comprobar si hay agua."
      },
      {
        id: 77,
        targetWord: "FILL",
        ipa: "/fɪl/",
        correctSentence: "Fill the hydraulic reservoir to the full level mark with approved fluid.",
        falseSentences: [
          "Fill the engine oil tank with standard automotive brake fluid.",
          "Fill the pitot tube with dense bearing grease before takeoff."
        ],
        falseSentencesSpanish: [
          "Llene el tanque de aceite del motor con líquido de frenos automotriz estándar.",
          "Llene el tubo Pitot con grasa densa para rodamientos antes del despegue."
        ],
        spanish: "Llene el depósito hidráulico hasta la marca de nivel lleno con fluido aprobado."
      },
      {
        id: 78,
        targetWord: "FLUSH",
        ipa: "/flʌʃ/",
        correctSentence: "Flush the contaminated fuel lines with clean aviation kerosene.",
        falseSentences: [
          "Flush the avionics computers with salty sea water to remove dust.",
          "Flush the oxygen regulator lines with thick mineral oil."
        ],
        falseSentencesSpanish: [
          "Enjuague las computadoras de aviónica con agua de mar salada para eliminar el polvo.",
          "Enjuague las líneas del regulador de oxígeno con aceite mineral espeso."
        ],
        spanish: "Enjuague las líneas de combustible contaminadas con queroseno de aviación limpio."
      },
      {
        id: 79,
        targetWord: "PURGE",
        ipa: "/pɜːrdʒ/",
        correctSentence: "Purge the fuel manifold system with nitrogen before welding nearby structure.",
        falseSentences: [
          "Purge the flight control cables with concentrated acid.",
          "Purge the cockpit air with carbon monoxide during descent."
        ],
        falseSentencesSpanish: [
          "Purga los cables de control de vuelo con ácido concentrado.",
          "Purgue el aire de la cabina con monóxido de carbono durante el descenso."
        ],
        spanish: "Purgue el sistema del múltiple de combustible con nitrógeno antes de soldar estructuras cercanas."
      },
      {
        id: 80,
        targetWord: "VENT",
        ipa: "/vent/",
        correctSentence: "Ensure the fuel tank vent line is free of ice and foreign obstruction.",
        falseSentences: [
          "Plug all fuel tank vents hermetically with solid wood plugs.",
          "Vent high-pressure hydraulic lines into the passenger cabin."
        ],
        falseSentencesSpanish: [
          "Tape herméticamente todas las ventilaciones del tanque de combustible con tapones de madera maciza.",
          "Ventile las líneas hidráulicas de alta presión hacia la cabina de pasajeros."
        ],
        spanish: "Asegúrese de que la línea de ventilación del tanque de combustible esté libre de hielo y obstrucciones."
      }
    ]
  },

  // =========================================================================
  // PLAY 5: ORACIONES 81 A 100 (ENSAMBLAJE, FIJACIÓN Y ACCIONES MECÁNICAS)
  // =========================================================================
  {
    playId: 5,
    title: "PLAY 5",
    rangeText: "ORACIONES 81 - 100",
    description: "Técnicas de taller estructural: remachado, soldadura, perforación y fijación",
    questions: [
      {
        id: 81,
        targetWord: "GROUND",
        ipa: "/ɡraʊnd/",
        correctSentence: "Connect the aircraft grounding cable to the ramp earthing point before fueling.",
        falseSentences: [
          "Grounding cables should be insulated with heavy rubber tape at both ends.",
          "Disconnect all ground connections before pumping fuel into the wings."
        ],
        falseSentencesSpanish: [
          "Los cables de conexión a tierra deben aislarse con cinta de goma gruesa en ambos extremos.",
          "Desconecte todas las conexiones a tierra antes de bombear combustible a las alas."
        ],
        spanish: "Conecte el cable de puesta a tierra del avión al punto de tierra de la rampa antes de reabastecer."
      },
      {
        id: 82,
        targetWord: "BOND",
        ipa: "/bɒnd/",
        correctSentence: "Bond the composite repair patch with structural epoxy adhesive under vacuum pressure.",
        falseSentences: [
          "Bond structural wing skins using standard white paper glue.",
          "Bond electrical cables with chewing gum to prevent static."
        ],
        falseSentencesSpanish: [
          "Pegue los revestimientos estructurales de las alas utilizando pegamento de papel blanco estándar.",
          "Une los cables eléctricos con chicle para evitar la estática."
        ],
        spanish: "Pegue el parche de reparación de compuesto con adhesivo epoxi estructural bajo presión de vacío."
      },
      {
        id: 83,
        targetWord: "RIVET",
        ipa: "/ˈrɪv.ɪt/",
        correctSentence: "Install the countersunk solid rivets according to structural pitch dimensions.",
        falseSentences: [
          "Rivet the wing skin using loose wooden toothpicks.",
          "All structural rivets must have bent heads that protrude 5 inches."
        ],
        falseSentencesSpanish: [
          "Remacha la piel del ala con palillos de madera sueltos.",
          "Todos los remaches estructurales deben tener cabezas dobladas que sobresalgan 5 pulgadas."
        ],
        spanish: "Instale los remaches sólidos avellanados según las dimensiones de paso estructurales."
      },
      {
        id: 84,
        targetWord: "WELD",
        ipa: "/weld/",
        correctSentence: "Weld the exhaust tailpipe crack using TIG welding with argon shielding gas.",
        falseSentences: [
          "Weld structural titanium parts while fuel is flowing inside the tube.",
          "Weld the aircraft tires directly to the aluminum brake rotors."
        ],
        falseSentencesSpanish: [
          "Suelde piezas estructurales de titanio mientras el combustible fluye dentro del tubo.",
          "Suelde los neumáticos del avión directamente a los rotores de freno de aluminio."
        ],
        spanish: "Suelde la grieta del tubo de escape utilizando soldadura TIG con gas protector de argón."
      },
      {
        id: 85,
        targetWord: "DRILL",
        ipa: "/drɪl/",
        correctSentence: "Drill the rivet hole at 90 degrees to the sheet metal surface.",
        falseSentences: [
          "Drill inspection holes through the main wing spar at random locations.",
          "Drill holes through high-pressure oxygen bottles to check thickness."
        ],
        falseSentencesSpanish: [
          "Taladre orificios de inspección a través del larguero del ala principal en lugares aleatorios.",
          "Haga agujeros a través de las botellas de oxígeno de alta presión para verificar el espesor."
        ],
        spanish: "Perfore el orificio del remache a 90 grados respecto a la superficie de la chapa metálica."
      },
      {
        id: 86,
        targetWord: "REAM",
        ipa: "/riːm/",
        correctSentence: "Ream the drilled hole to exact final tolerance before installing the hi-lok bolt.",
        falseSentences: [
          "Ream the hole using a square coarse wood rasp.",
          "Reaming is used to melt the metal skin with high heat."
        ],
        falseSentencesSpanish: [
          "Escaria el agujero usando una escofina para madera cuadrada y gruesa.",
          "El escariado se utiliza para derretir la piel de metal a alta temperatura."
        ],
        spanish: "Escarie el orificio perforado a la tolerancia final exacta antes de instalar el perno hi-lok."
      },
      {
        id: 87,
        targetWord: "COUNTERSINK",
        ipa: "/ˈkaʊn.tər.sɪŋk/",
        correctSentence: "Countersink the skin hole so the rivet head seats flush with the outer surface.",
        falseSentences: [
          "Countersink holes only after the rivet has already been driven.",
          "Countersink until the metal sheet is completely cut through."
        ],
        falseSentencesSpanish: [
          "Avellanar los agujeros sólo después de que el remache ya esté colocado.",
          "Avellanar hasta cortar completamente la chapa."
        ],
        spanish: "Avellane el orificio del revestimiento para que la cabeza del remache quede al ras con la superficie exterior."
      },
      {
        id: 88,
        targetWord: "CHAMFER",
        ipa: "/ˈtʃæm.fər/",
        correctSentence: "Chamfer the sharp edges of the replacement bushing to prevent stress concentration.",
        falseSentences: [
          "Chamfer the glass cockpit screens with coarse sandpaper.",
          "Chamfering means welding two steel plates together with lead."
        ],
        falseSentencesSpanish: [
          "Bisela las mamparas de cristal de la cabina con papel de lija grueso.",
          "Chaflanar significa soldar dos placas de acero con plomo."
        ],
        spanish: "Achaflane los bordes afilados del buje de reemplazo para evitar concentración de tensiones."
      },
      {
        id: 89,
        targetWord: "APPLY",
        ipa: "/əˈplaɪ/",
        correctSentence: "Apply a uniform coat of corrosion-inhibiting primer to the bare aluminum.",
        falseSentences: [
          "Apply hydraulic fluid to the exterior cockpit windshields.",
          "Apply heavy grease to the tire tread before wet runway landing."
        ],
        falseSentencesSpanish: [
          "Aplique líquido hidráulico a los parabrisas exteriores de la cabina.",
          "Aplique grasa espesa a la banda de rodadura del neumático antes de aterrizar en una pista mojada."
        ],
        spanish: "Aplique una capa uniforme de imprimador inhibidor de corrosión sobre el aluminio desnudo."
      },
      {
        id: 90,
        targetWord: "REMOVE",
        ipa: "/rɪˈmuːv/",
        correctSentence: "Remove the ground safety lock pins from all landing gear before pushback.",
        falseSentences: [
          "Remove the flight controls while the aircraft is climbing in flight.",
          "Remove both wings before taking off from the airport."
        ],
        falseSentencesSpanish: [
          "Retire los controles de vuelo mientras el avión asciende en vuelo.",
          "Retire ambas alas antes de despegar del aeropuerto."
        ],
        spanish: "Remueva los pasadores de seguridad de tierra de todo el tren de aterrizaje antes del remolque."
      },
      {
        id: 91,
        targetWord: "INSTALL",
        ipa: "/ɪnˈstɔːl/",
        correctSentence: "Install the new hydraulic filter element with new pre-lubricated O-rings.",
        falseSentences: [
          "Install worn and distorted gaskets on high-pressure manifolds.",
          "Install the propeller backwards to increase climb performance."
        ],
        falseSentencesSpanish: [
          "Instale juntas desgastadas y deformadas en colectores de alta presión.",
          "Instale la hélice al revés para aumentar el rendimiento de ascenso."
        ],
        spanish: "Instale el nuevo elemento filtrante hidráulico con nuevos sellos O-ring pre-lubricados."
      },
      {
        id: 92,
        targetWord: "REPLACE",
        ipa: "/rɪˈpleɪs/",
        correctSentence: "Replace the cracked brake disc assembly before dispatching the aircraft.",
        falseSentences: [
          "Replace all instruments with blank plastic covers.",
          "Replace clean aviation kerosene with dirty sump water."
        ],
        falseSentencesSpanish: [
          "Reemplace todos los instrumentos con cubiertas de plástico en blanco.",
          "Reemplace el queroseno de aviación limpio con agua de sumidero sucia."
        ],
        spanish: "Reemplace el conjunto de disco de freno agrietado antes de despachar la aeronave."
      },
      {
        id: 93,
        targetWord: "TIGHTEN",
        ipa: "/ˈtaɪ.tən/",
        correctSentence: "Tighten the clamp nuts evenly to avoid pinching the flexible fuel hose.",
        falseSentences: [
          "Tighten fuel fittings until the threads strip and crack.",
          "Leave all engine mounting nuts loose for natural vibration."
        ],
        falseSentencesSpanish: [
          "Apriete los accesorios de combustible hasta que las roscas se deshilachen y se agrieten.",
          "Deje todas las tuercas de montaje del motor sueltas para lograr una vibración natural."
        ],
        spanish: "Apriete las tuercas de la abrazadera de manera uniforme para evitar pellizcar la manguera flexible."
      },
      {
        id: 94,
        targetWord: "LOOSEN",
        ipa: "/ˈluː.sən/",
        correctSentence: "Loosen the turnbuckles carefully to relieve tension on the flight control cables.",
        falseSentences: [
          "Loosen the engine mount bolts during takeoff acceleration.",
          "Loosen the propeller hub nut while running at full RPM."
        ],
        falseSentencesSpanish: [
          "Afloje los pernos del soporte del motor durante la aceleración de despegue.",
          "Afloje la tuerca del cubo de la hélice mientras funciona a máximas RPM."
        ],
        spanish: "Afloje los tensores con cuidado para aliviar la tensión en los cables de mandos de vuelo."
      },
      {
        id: 95,
        targetWord: "ADJUST",
        ipa: "/əˈdʒʌst/",
        correctSentence: "Adjust the microswitch position so the landing gear green light illuminates properly.",
        falseSentences: [
          "Adjust the compass by bending the needle with pliers.",
          "Adjust the fuel mixture to 100% water during takeoff."
        ],
        falseSentencesSpanish: [
          "Ajuste la brújula doblando la aguja con unos alicates.",
          "Ajuste la mezcla de combustible al 100% de agua durante el despegue."
        ],
        spanish: "Ajuste la posición del microinterruptor para que la luz verde del tren de aterrizaje encienda correctamente."
      },
      {
        id: 96,
        targetWord: "ALIGN",
        ipa: "/əˈlaɪn/",
        correctSentence: "Align the inertial reference system before moving the aircraft from the gate.",
        falseSentences: [
          "Align the rudder perpendicular to the wing leading edge.",
          "Align the nose wheel 90 degrees sideways during takeoff roll."
        ],
        falseSentencesSpanish: [
          "Alinee el timón perpendicular al borde de ataque del ala.",
          "Alinee la rueda de morro 90 grados hacia los lados durante la carrera de despegue."
        ],
        spanish: "Alinee el sistema de referencia inercial antes de mover la aeronave de la puerta."
      },
      {
        id: 97,
        targetWord: "BALANCE",
        ipa: "/ˈbæl.əns/",
        correctSentence: "Statistically balance the elevator assembly after repainting its outer surfaces.",
        falseSentences: [
          "Balance the wings by pouring sand inside the cargo bins.",
          "Control surface balancing is prohibited by aircraft manufacturers."
        ],
        falseSentencesSpanish: [
          "Equilibra las alas vertiendo arena dentro de los contenedores de carga.",
          "Los fabricantes de aviones prohíben el equilibrio de la superficie de control."
        ],
        spanish: "Equilibre estáticamente el conjunto del elevador después de repintar sus superficies exteriores."
      },
      {
        id: 98,
        targetWord: "CHECK",
        ipa: "/tʃek/",
        correctSentence: "Check the emergency battery voltage with a calibrated digital multimeter.",
        falseSentences: [
          "Check fuel tank level by dropping an open match inside.",
          "Check oxygen lines by smelling pure chlorine gas."
        ],
        falseSentencesSpanish: [
          "Verifique el nivel del tanque de combustible dejando caer una cerilla abierta en el interior.",
          "Verifique las líneas de oxígeno oliendo cloro gaseoso puro."
        ],
        spanish: "Verifique el voltaje de la batería de emergencia con un multímetro digital calibrado."
      },
      {
        id: 99,
        targetWord: "CLEAN",
        ipa: "/kliːn/",
        correctSentence: "Clean the optical sensors on the smoke detection unit with lint-free wipes.",
        falseSentences: [
          "Clean cockpit display screens with metal wire brushes.",
          "Clean oxygen system components with heavy hydrocarbon oils."
        ],
        falseSentencesSpanish: [
          "Limpie las pantallas de la cabina con cepillos de alambre metálico.",
          "Limpie los componentes del sistema de oxígeno con aceites de hidrocarburos pesados."
        ],
        spanish: "Limpie los sensores ópticos de la unidad detectora de humo con paños libres de pelusa."
      },
      {
        id: 100,
        targetWord: "COAT",
        ipa: "/koʊt/",
        correctSentence: "Coat the electrical bonding terminal with an approved corrosion-preventive compound.",
        falseSentences: [
          "Coat the brake pads with thick lubricating engine grease.",
          "Coat the pitot probes with insulating foam before winter flights."
        ],
        falseSentencesSpanish: [
          "Cubra las pastillas de freno con grasa lubricante espesa para motor.",
          "Cubra las sondas Pitot con espuma aislante antes de los vuelos de invierno."
        ],
        spanish: "Recubra el terminal de masa eléctrica con un compuesto aprobado anticorrosión."
      }
    ]
  },

  // =========================================================================
  // PLAY 6: ORACIONES 101 A 120 (CONEXIONES, PROTECCIÓN Y SELLADO)
  // =========================================================================
  {
    playId: 6,
    title: "PLAY 6",
    rangeText: "ORACIONES 101 - 120",
    description: "Conexiones de aviónica, sellado hermético, desbarbado y protección",
    questions: [
      {
        id: 101,
        targetWord: "CONNECT",
        ipa: "/kəˈnekt/",
        correctSentence: "Connect the external electrical power cable to the aircraft ground receptacle.",
        falseSentences: [
          "Connect the oxygen mask directly into the jet engine exhaust.",
          "Connect high-pressure hydraulic lines to the audio entertainment panel."
        ],
        falseSentencesSpanish: [
          "Conecte la máscara de oxígeno directamente al escape del motor a reacción.",
          "Conecte líneas hidráulicas de alta presión al panel de entretenimiento de audio."
        ],
        spanish: "Conecte el cable de potencia eléctrica externa al receptáculo de tierra de la aeronave."
      },
      {
        id: 102,
        targetWord: "DISCONNECT",
        ipa: "/ˌdɪs.kəˈnekt/",
        correctSentence: "Disconnect the main aircraft battery before servicing any avionics wiring.",
        falseSentences: [
          "Disconnect the elevator control cables while in cruising flight.",
          "Disconnect the fuel line without closing the main tank shutoff valve."
        ],
        falseSentencesSpanish: [
          "Desconecte los cables de control del elevador mientras esté en vuelo de crucero.",
          "Desconecte la línea de combustible sin cerrar la válvula de cierre del tanque principal."
        ],
        spanish: "Desconecte la batería principal de la aeronave antes de intervenir el cableado de aviónica."
      },
      {
        id: 103,
        targetWord: "COVER",
        ipa: "/ˈkʌv.ər/",
        correctSentence: "Install protective covers over the pitot probes immediately after flight.",
        falseSentences: [
          "Cover the cockpit windscreen with black opaque cloth during flight.",
          "Cover the engine intake with metal plates before high-speed takeoff."
        ],
        falseSentencesSpanish: [
          "Cubra el parabrisas de la cabina con un paño opaco negro durante el vuelo.",
          "Cubra la entrada del motor con placas de metal antes del despegue a alta velocidad."
        ],
        spanish: "Instale cubiertas protectoras sobre las sondas pitot inmediatamente después del vuelo."
      },
      {
        id: 104,
        targetWord: "DEBURR",
        ipa: "/diːˈbɜːr/",
        correctSentence: "Deburr all newly drilled holes to prevent fatigue cracks from developing.",
        falseSentences: [
          "Deburr the glass cockpit displays using an angle grinder.",
          "Leaving sharp metal burrs in bolt holes improves joint shear strength."
        ],
        falseSentencesSpanish: [
          "Quite las rebabas de las pantallas de cristal de la cabina con una amoladora angular.",
          "Dejar rebabas metálicas afiladas en los orificios de los pernos mejora la resistencia al corte de las juntas."
        ],
        spanish: "Desbarbe todos los orificios recién perforados para evitar que se desarrollen grietas por fatiga."
      },
      {
        id: 105,
        targetWord: "DEGREASE",
        ipa: "/diːˈɡriːs/",
        correctSentence: "Degrease the brake mounting flange with an approved non-chlorinated solvent.",
        falseSentences: [
          "Degrease the engine bearings by pouring liquid sand into the sump.",
          "Degrease the cockpit seats with automotive battery acid."
        ],
        falseSentencesSpanish: [
          "Desengrasar los cojinetes del motor vertiendo arena líquida en el cárter.",
          "Desengrase los asientos del habitáculo con ácido de batería de automóvil."
        ],
        spanish: "Desengrase la brida de montaje del freno con un solvente aprobado no clorado."
      },
      {
        id: 106,
        targetWord: "MEASURE",
        ipa: "/ˈmeʒ.ər/",
        correctSentence: "Measure the brake disc thickness using a calibrated vernier caliper.",
        falseSentences: [
          "Measure the fuel tank capacity by guessing the aircraft gross weight.",
          "Measure hydraulic line pressure using an ordinary sewing tape ruler."
        ],
        falseSentencesSpanish: [
          "Mida la capacidad del tanque de combustible adivinando el peso bruto del avión.",
          "Mida la presión de la línea hidráulica usando una regla de cinta de coser común."
        ],
        spanish: "Mida el espesor del disco de freno utilizando un pie de rey calibrado."
      },
      {
        id: 107,
        targetWord: "MARK",
        ipa: "/mɑːrk/",
        correctSentence: "Mark the torque stripe on the tightened bolt head to indicate slippage.",
        falseSentences: [
          "Mark the structural wing skins with deep carbide chisel gouges.",
          "Mark the compass glass with thick black spray paint."
        ],
        falseSentencesSpanish: [
          "Marque los revestimientos estructurales de las alas con profundas ranuras de cincel de carburo.",
          "Marque el cristal de la brújula con pintura en aerosol negra espesa."
        ],
        spanish: "Marque la línea de torque en la cabeza del perno apretado para indicar desplazamiento."
      },
      {
        id: 108,
        targetWord: "SEAL",
        ipa: "/siːl/",
        correctSentence: "Seal the integral fuel tank seams with polysulfide sealant according to the AMM.",
        falseSentences: [
          "Seal fuel leaks with chewed bubblegum or bathroom silicone.",
          "Seal the pitot tube holes with hot candle wax before takeoff."
        ],
        falseSentencesSpanish: [
          "Selle las fugas de combustible con chicle masticado o silicona de baño.",
          "Selle los orificios del tubo Pitot con cera de vela caliente antes del despegue."
        ],
        spanish: "Selle las costuras del tanque integral de combustible con sellante de polisulfuro según el AMM."
      },
      {
        id: 109,
        targetWord: "PROTECT",
        ipa: "/prəˈtekt/",
        correctSentence: "Protect electrical wiring harnesses from chafing against sharp structural edges.",
        falseSentences: [
          "Protect aircraft tires by puncturing them with sharp needles.",
          "Protect the engines by leaving loose nuts and bolts in the inlet."
        ],
        falseSentencesSpanish: [
          "Proteja los neumáticos de los aviones pinchándolos con agujas afiladas.",
          "Proteja los motores dejando tuercas y tornillos sueltos en la entrada."
        ],
        spanish: "Proteja los mazos de cables eléctricos del roce contra bordes estructurales afilados."
      },
      {
        id: 110,
        targetWord: "SECURE",
        ipa: "/səˈkjʊər/",
        correctSentence: "Secure all loose equipment and emergency life rafts in the cargo compartment.",
        falseSentences: [
          "Secure the flight controls by wrapping them loosely in wet paper.",
          "Never secure engine cowlings before high-speed taxi tests."
        ],
        falseSentencesSpanish: [
          "Asegure los controles de vuelo envolviéndolos sin apretar en papel húmedo.",
          "Nunca asegure los capós del motor antes de realizar pruebas de rodaje a alta velocidad."
        ],
        spanish: "Asegure todo el equipo suelto y las balsas salvavidas de emergencia en el compartimiento de carga."
      },
      {
        id: 111,
        targetWord: "LOCK",
        ipa: "/lɒk/",
        correctSentence: "Lock the landing gear ground safety pins in place before towing.",
        falseSentences: [
          "Lock the flight control surfaces in full deflection during flight.",
          "Lock the main passenger exit doors so they cannot open in emergencies."
        ],
        falseSentencesSpanish: [
          "Bloquee las superficies de control de vuelo en total deflexión durante el vuelo.",
          "Bloquee las puertas principales de salida de pasajeros para que no puedan abrirse en caso de emergencia."
        ],
        spanish: "Bloquee los pasadores de seguridad de tierra del tren en su lugar antes del remolque."
      },
      {
        id: 112,
        targetWord: "UNLOCK",
        ipa: "/ʌnˈlɒk/",
        correctSentence: "Unlock the control lock mechanism before conducting the pre-flight control check.",
        falseSentences: [
          "Unlock the pressurized cabin door while cruising at 40,000 feet.",
          "Unlock the fuel shutoff valve during an uncontained engine fire."
        ],
        falseSentencesSpanish: [
          "Desbloquee la puerta presurizada de la cabina mientras navega a 40.000 pies.",
          "Desbloquee la válvula de cierre de combustible durante un incendio incontrolado del motor."
        ],
        spanish: "Desbloquee el mecanismo de traba de mandos antes de realizar la verificación de controles previa al vuelo."
      },
      {
        id: 113,
        targetWord: "OPEN",
        ipa: "/ˈoʊ.pən/",
        correctSentence: "Open the circuit breakers designated in the maintenance manual before inspection.",
        falseSentences: [
          "Open the engine thrust reversers at maximum cruise speed.",
          "Open the landing gear doors manually while flying at supersonic speeds."
        ],
        falseSentencesSpanish: [
          "Abra los inversores de empuje del motor a máxima velocidad de crucero.",
          "Abre las puertas del tren de aterrizaje manualmente mientras vuelas a velocidades supersónicas."
        ],
        spanish: "Abra los disyuntores designados en el manual de mantenimiento antes de la inspección."
      },
      {
        id: 114,
        targetWord: "CLOSE",
        ipa: "/kloʊz/",
        correctSentence: "Close all fuselage access panels before releasing the aircraft for service.",
        falseSentences: [
          "Close the engine air intakes completely while taxiing to the runway.",
          "Close the fuel tank shutoff valves before initiating engine start."
        ],
        falseSentencesSpanish: [
          "Cierre completamente las tomas de aire del motor durante el rodaje hacia la pista.",
          "Cierre las válvulas de cierre del tanque de combustible antes de iniciar el arranque del motor."
        ],
        spanish: "Cierre todos los paneles de acceso del fuselaje antes de liberar la aeronave para el servicio."
      },
      {
        id: 115,
        targetWord: "PRIME",
        ipa: "/praɪm/",
        correctSentence: "Prime the reciprocating engine fuel system prior to initiating cold engine start.",
        falseSentences: [
          "Prime the pitot tube with battery electrolyte before every takeoff.",
          "Priming means filling the oxygen masks with engine exhaust gas."
        ],
        falseSentencesSpanish: [
          "Cebe el tubo pitot con electrolito de batería antes de cada despegue.",
          "Cebar significa llenar las máscaras de oxígeno con los gases de escape del motor."
        ],
        spanish: "Cebé (prime) el sistema de combustible del motor alternativo antes de poner en marcha el motor en frío."
      },
      {
        id: 116,
        targetWord: "MASK",
        ipa: "/mæsk/",
        correctSentence: "Mask the static ports and sensors before applying exterior paint coatings.",
        falseSentences: [
          "Mask the cockpit windows with permanent black spray enamel.",
          "Never mask sensor openings during high-pressure chemical washings."
        ],
        falseSentencesSpanish: [
          "Enmascare las ventanas de la cabina con esmalte en aerosol negro permanente.",
          "Nunca enmascare las aberturas del sensor durante lavados químicos a alta presión."
        ],
        spanish: "Enmascare las tomas estáticas y sensores antes de aplicar capas de pintura exterior."
      },
      {
        id: 117,
        targetWord: "STRIP",
        ipa: "/strɪp/",
        correctSentence: "Strip damaged paint down to bare metal using an approved eco-friendly chemical.",
        falseSentences: [
          "Strip structural wing ribs by chopping them with a steel axe.",
          "Strip insulation from high-voltage cables and leave them touching fuel lines."
        ],
        falseSentencesSpanish: [
          "Pele las costillas estructurales del ala cortándolas con un hacha de acero.",
          "Pele el aislamiento de los cables de alto voltaje y déjelos tocando las líneas de combustible."
        ],
        spanish: "Decape (strip) la pintura dañada hasta el metal base usando un químico ecológico aprobado."
      },
      {
        id: 118,
        targetWord: "PAINT",
        ipa: "/peɪnt/",
        correctSentence: "Paint the aircraft registration markings with polyurethane topcoat paint.",
        falseSentences: [
          "Paint the inside of the jet turbine combustion chamber with oil.",
          "Paint the static ports and pitot openings with thick epoxy."
        ],
        falseSentencesSpanish: [
          "Pinte el interior de la cámara de combustión de la turbina a reacción con aceite.",
          "Pinte los puertos estáticos y las aberturas pitot con epoxi espeso."
        ],
        spanish: "Pinte las marcas de matrícula del avión con pintura de acabado de poliuretano."
      },
      {
        id: 119,
        targetWord: "WIRE",
        ipa: "/waɪər/",
        correctSentence: "Ensure electrical wire bundles are secured with Teflon-coated cushion clamps.",
        falseSentences: [
          "Connect live electrical wires directly into the aviation fuel tanks.",
          "Electrical wires should hang loosely across the pilot foot pedals."
        ],
        falseSentencesSpanish: [
          "Conecte cables eléctricos activos directamente a los tanques de combustible de aviación.",
          "Los cables eléctricos deben colgar sin apretar a lo largo de los pedales piloto."
        ],
        spanish: "Asegúrese de que los mazos de cables eléctricos estén asegurados con abrazaderas almohadilladas de teflón."
      },
      {
        id: 120,
        targetWord: "CRACK",
        ipa: "/kræk/",
        correctSentence: "A hairline crack in the engine turbine disc requires immediate part replacement.",
        falseSentences: [
          "Cracks in the main wing spar can be ignored if under 12 inches.",
          "Cracks are intentional design features to ventilate structural tanks."
        ],
        falseSentencesSpanish: [
          "Las grietas en el larguero del ala principal se pueden ignorar si miden menos de 12 pulgadas.",
          "Las grietas son características de diseño intencionales para ventilar tanques estructurales."
        ],
        spanish: "Una microfisura (crack) en el disco de turbina del motor requiere el reemplazo inmediato de la pieza."
      }
    ]
  },

  // =========================================================================
  // PLAY 7: ORACIONES 121 A 140 (DAÑOS ESTRUCTURALES Y PARÁMETROS FÍSICOS)
  // =========================================================================
  {
    playId: 7,
    title: "PLAY 7",
    rangeText: "ORACIONES 121 - 140",
    description: "Evaluación de corrosión, fatiga, fugas y variables operativas de vuelo",
    questions: [
      {
        id: 121,
        targetWord: "CORROSION",
        ipa: "/kəˈroʊ.ʒən/",
        correctSentence: "Treat surface corrosion immediately to prevent structural intergranular damage.",
        falseSentences: [
          "Corrosion strengthens aluminum alloys by increasing metal hardness.",
          "Encourage corrosion by spraying salt water inside the wing structure."
        ],
        falseSentencesSpanish: [
          "La corrosión fortalece las aleaciones de aluminio al aumentar la dureza del metal.",
          "Fomente la corrosión rociando agua salada dentro de la estructura del ala."
        ],
        spanish: "Trate la corrosión superficial de inmediato para evitar daños estructurales intergranulares."
      },
      {
        id: 122,
        targetWord: "DENT",
        ipa: "/dent/",
        correctSentence: "Measure the depth and radius of the skin dent against allowable SRM limits.",
        falseSentences: [
          "Dents on the wing leading edge improve laminar airflow speed.",
          "Repair a dent by hitting the opposite skin with an iron sledgehammer."
        ],
        falseSentencesSpanish: [
          "Las abolladuras en el borde de ataque del ala mejoran la velocidad del flujo de aire laminar.",
          "Repare una abolladura golpeando la piel opuesta con un mazo de hierro."
        ],
        spanish: "Mida la profundidad y el radio de la abolladura del revestimiento frente a los límites permitidos del SRM."
      },
      {
        id: 123,
        targetWord: "SCRATCH",
        ipa: "/skrætʃ/",
        correctSentence: "Blend out shallow scratches using fine abrasive paper to eliminate stress risers.",
        falseSentences: [
          "Deep scratches in turbine blades heal naturally at high operating temperatures.",
          "Create scratches on electrical insulators to improve radio reception."
        ],
        falseSentencesSpanish: [
          "Los rayones profundos en las palas de las turbinas se curan naturalmente a altas temperaturas de funcionamiento.",
          "Crea rayones en los aisladores eléctricos para mejorar la recepción de radio."
        ],
        spanish: "Suavice los rayones superficiales usando papel abrasivo fino para eliminar concentradores de tensión."
      },
      {
        id: 124,
        targetWord: "WEAR",
        ipa: "/weər/",
        correctSentence: "Inspect the control cable pulleys for excessive wear and cable imprint grooving.",
        falseSentences: [
          "Wear on brake discs should exceed 100% before performing inspection.",
          "Severe bearing wear is normal and increases propeller RPM."
        ],
        falseSentencesSpanish: [
          "El desgaste de los discos de freno debe exceder el 100% antes de realizar la inspección.",
          "El desgaste severo de los cojinetes es normal y aumenta las RPM de la hélice."
        ],
        spanish: "Inspeccione las poleas de cables de mando en busca de desgaste excesivo y ranurado por cable."
      },
      {
        id: 125,
        targetWord: "LEAK",
        ipa: "/liːk/",
        correctSentence: "Classify the hydraulic leak into seep, drip, or running leak per the AMM.",
        falseSentences: [
          "Continuous fuel leaks onto hot exhaust pipes are considered safe.",
          "All hydraulic pumps must leak 10 gallons per minute by design."
        ],
        falseSentencesSpanish: [
          "Las fugas continuas de combustible en tubos de escape calientes se consideran seguras.",
          "Todas las bombas hidráulicas deben tener fugas de 10 galones por minuto por diseño."
        ],
        spanish: "Clasifique la fuga hidráulica en rezume, goteo o fuga continua según el AMM."
      },
      {
        id: 126,
        targetWord: "CONTAMINATION",
        ipa: "/kənˌtæm.ɪˈneɪ.ʃən/",
        correctSentence: "Inspect fuel samples for water, particulate, and microbiological contamination.",
        falseSentences: [
          "Fuel contamination improves jet engine efficiency and thrust.",
          "Contamination inside oxygen lines is beneficial for passenger breathing."
        ],
        falseSentencesSpanish: [
          "La contaminación del combustible mejora la eficiencia y el empuje de los motores a reacción.",
          "La contaminación dentro de las líneas de oxígeno es beneficiosa para la respiración de los pasajeros."
        ],
        spanish: "Inspeccione las muestras de combustible en busca de agua, partículas y contaminación microbiológica."
      },
      {
        id: 127,
        targetWord: "DEFORMATION",
        ipa: "/ˌdiː.fɔːrˈmeɪ.ʃən/",
        correctSentence: "Check the fuselage structure for permanent deformation following a hard landing.",
        falseSentences: [
          "Permanent structural deformation is repaired by repainting the wings.",
          "Twisted wings increase aircraft stability in high turbulence."
        ],
        falseSentencesSpanish: [
          "La deformación estructural permanente se repara repintando las alas.",
          "Las alas torcidas aumentan la estabilidad de la aeronave en condiciones de alta turbulencia."
        ],
        spanish: "Compruebe la estructura del fuselaje en busca de deformación permanente tras un aterrizaje brusco."
      },
      {
        id: 128,
        targetWord: "EROSION",
        ipa: "/ɪˈroʊ.ʒən/",
        correctSentence: "Apply polyurethane anti-erosion tape along the propeller blade leading edge.",
        falseSentences: [
          "Rain erosion improves aerodynamic smoothness of the radome.",
          "Erosion tape is made of unreinforced brittle paper."
        ],
        falseSentencesSpanish: [
          "La erosión por lluvia mejora la suavidad aerodinámica del radomo.",
          "La cinta de erosión está hecha de papel quebradizo no reforzado."
        ],
        spanish: "Aplique cinta anti-erosión de poliuretano a lo largo del borde de ataque de la pala de la hélice."
      },
      {
        id: 129,
        targetWord: "FATIGUE",
        ipa: "/fəˈtiːɡ/",
        correctSentence: "Cyclic pressurization loads cause metal fatigue in the aircraft fuselage skin.",
        falseSentences: [
          "Metal fatigue occurs only when the aircraft is parked in the hangar.",
          "Structural fatigue strengthens rivets against high shear loads."
        ],
        falseSentencesSpanish: [
          "La fatiga del metal se produce sólo cuando el avión está estacionado en el hangar.",
          "La fatiga estructural fortalece los remaches contra altas cargas de corte."
        ],
        spanish: "Las cargas cíclicas de presurización provocan fatiga del metal en el revestimiento del fuselaje."
      },
      {
        id: 130,
        targetWord: "DELAMINATION",
        ipa: "/diːˌlæm.ɪˈneɪ.ʃən/",
        correctSentence: "Perform a coin-tap test to detect internal delamination in composite panels.",
        falseSentences: [
          "Delamination means bonding two composite plies firmly together.",
          "Delaminated honeycomb panels provide maximum stiffness under pressure."
        ],
        falseSentencesSpanish: [
          "La delaminación significa unir firmemente dos capas compuestas.",
          "Los paneles alveolares delaminados proporcionan máxima rigidez bajo presión."
        ],
        spanish: "Realice una prueba de golpeo con moneda para detectar delaminación interna en paneles compuestos."
      },
      {
        id: 131,
        targetWord: "PRESSURE",
        ipa: "/ˈpreʃ.ər/",
        correctSentence: "The normal operating hydraulic pressure is 3,000 pounds per square inch (psi).",
        falseSentences: [
          "Hydraulic pressure must be zero during all normal flight operations.",
          "Tire pressure should be checked by kicking the rubber with bare feet."
        ],
        falseSentencesSpanish: [
          "La presión hidráulica debe ser cero durante todas las operaciones de vuelo normales.",
          "La presión de los neumáticos se debe comprobar pateando la goma con los pies descalzos."
        ],
        spanish: "La presión hidráulica operativa normal es de 3,000 libras por pulgada cuadrada (psi)."
      },
      {
        id: 132,
        targetWord: "TEMPERATURE",
        ipa: "/ˈtem.prə.tʃər/",
        correctSentence: "Monitor engine exhaust gas temperature during starting to prevent a hot start.",
        falseSentences: [
          "Exhaust gas temperature should exceed maximum redline by 500 degrees.",
          "Engine oil temperature must remain frozen during flight."
        ],
        falseSentencesSpanish: [
          "La temperatura de los gases de escape debe exceder la línea roja máxima en 500 grados.",
          "La temperatura del aceite del motor debe permanecer congelada durante el vuelo."
        ],
        spanish: "Monitoree la temperatura de los gases de escape del motor durante la puesta en marcha para evitar un hot start."
      },
      {
        id: 133,
        targetWord: "FLOW",
        ipa: "/floʊ/",
        correctSentence: "The fuel flow transmitter measures consumption in pounds per hour.",
        falseSentences: [
          "Fuel flow must be completely stopped before taking off.",
          "Hydraulic fluid flow is directed backwards into the fuel tanks."
        ],
        falseSentencesSpanish: [
          "El flujo de combustible debe detenerse por completo antes de despegar.",
          "El flujo de fluido hidráulico se dirige hacia atrás, hacia los tanques de combustible."
        ],
        spanish: "El transmisor de flujo de combustible mide el consumo en libras por hora."
      },
      {
        id: 134,
        targetWord: "LEVEL",
        ipa: "/ˈlev.əl/",
        correctSentence: "Check that the engine oil level is between the ADD and FULL indicator markings.",
        falseSentences: [
          "The oil level should be checked only after completely emptying the engine.",
          "Operating with oil level below minimum is safe for transatlantic flights."
        ],
        falseSentencesSpanish: [
          "El nivel de aceite debe comprobarse sólo después de vaciar completamente el motor.",
          "Operar con un nivel de aceite por debajo del mínimo es seguro para vuelos transatlánticos."
        ],
        spanish: "Verifique que el nivel de aceite del motor esté entre las marcas indicadoras ADD y FULL."
      },
      {
        id: 135,
        targetWord: "QUANTITY",
        ipa: "/ˈkwɒn.tə.ti/",
        correctSentence: "Verify fuel quantity indications against physical dipstick measurement readings.",
        falseSentences: [
          "Total fuel quantity should always equal zero before long flights.",
          "Fuel quantity gauges indicate hydraulic reservoir air volume."
        ],
        falseSentencesSpanish: [
          "La cantidad total de combustible siempre debe ser igual a cero antes de vuelos largos.",
          "Los indicadores de cantidad de combustible indican el volumen de aire del depósito hidráulico."
        ],
        spanish: "Verifique las indicaciones de cantidad de combustible contra las lecturas físicas de varilla de medición."
      },
      {
        id: 136,
        targetWord: "VOLTAGE",
        ipa: "/ˈvoʊl.tɪdʒ/",
        correctSentence: "The auxiliary power unit provides three-phase 115-volt AC electrical power.",
        falseSentences: [
          "Aircraft voltage is supplied by pouring water over the copper wires.",
          "The main aircraft battery produces 10,000 volts of direct current."
        ],
        falseSentencesSpanish: [
          "El voltaje de la aeronave se suministra vertiendo agua sobre los cables de cobre.",
          "La batería principal del avión produce 10.000 voltios de corriente continua."
        ],
        spanish: "La unidad de potencia auxiliar suministra energía eléctrica de CA trifásica de 115 voltios."
      },
      {
        id: 137,
        targetWord: "CURRENT",
        ipa: "/ˈkɜːr.ənt/",
        correctSentence: "An ammeter indicates the rate of electrical current flowing to or from the battery.",
        falseSentences: [
          "Electrical current is measured in kilograms per square centimeter.",
          "Direct current flows only through the aircraft hydraulic fluid lines."
        ],
        falseSentencesSpanish: [
          "La corriente eléctrica se mide en kilogramos por centímetro cuadrado.",
          "La corriente directa fluye únicamente a través de las líneas de fluido hidráulico de la aeronave."
        ],
        spanish: "Un amperímetro indica el régimen de corriente eléctrica que fluye hacia o desde la batería."
      },
      {
        id: 138,
        targetWord: "RESISTANCE",
        ipa: "/rɪˈzɪs.təns/",
        correctSentence: "Measure electrical bonding resistance with a milliohm meter to ensure grounding.",
        falseSentences: [
          "Bonding resistance should exceed 1,000,000 ohms for good lightning safety.",
          "Electrical resistance is measured by smelling the generator terminal."
        ],
        falseSentencesSpanish: [
          "La resistencia de unión debe exceder los 1.000.000 de ohmios para una buena seguridad contra rayos.",
          "La resistencia eléctrica se mide oliendo el terminal del generador."
        ],
        spanish: "Mida la resistencia de enlace eléctrico con un miliohmiómetro para garantizar la conexión a masa."
      },
      {
        id: 139,
        targetWord: "FREQUENCY",
        ipa: "/ˈfriː.kwən.si/",
        correctSentence: "The standard aircraft AC power system operates at a constant 400 Hertz frequency.",
        falseSentences: [
          "Aircraft alternating current operates at a frequency of 1 cycle per year.",
          "Frequency is controlled by adjusting the passenger seat reclining angle."
        ],
        falseSentencesSpanish: [
          "La corriente alterna de los aviones funciona con una frecuencia de 1 ciclo por año.",
          "La frecuencia se controla ajustando el ángulo de reclinación del asiento del pasajero."
        ],
        spanish: "El sistema estándar de CA de la aeronave opera a una frecuencia constante de 400 Hertz."
      },
      {
        id: 140,
        targetWord: "CAPACITY",
        ipa: "/kəˈpæs.ə.ti/",
        correctSentence: "Conduct an amp-hour capacity test on the emergency Ni-Cd aircraft battery.",
        falseSentences: [
          "Battery capacity increases when the electrolyte dries out completely.",
          "Battery capacity is measured by counting the number of external screws."
        ],
        falseSentencesSpanish: [
          "La capacidad de la batería aumenta cuando el electrolito se seca por completo.",
          "La capacidad de la batería se mide contando el número de tornillos externos."
        ],
        spanish: "Realice una prueba de capacidad de amperios-hora en la batería de Ni-Cd de emergencia del avión."
      }
    ]
  },

  // =========================================================================
  // PLAY 8: ORACIONES 141 A 160 (INSTRUMENTOS DE VUELO Y COMPONENTES ELÉCTRICOS)
  // =========================================================================
  {
    playId: 8,
    title: "PLAY 8",
    rangeText: "ORACIONES 141 - 160",
    description: "Sistemas de aviónica, navegación, barras eléctricas y relés",
    questions: [
      {
        id: 141,
        targetWord: "ALTITUDE",
        ipa: "/ˈæl.tə.tuːd/",
        correctSentence: "Maintain assigned cruising altitude in accordance with ATC clearance.",
        falseSentences: [
          "Aircraft altitude is measured in liters of fuel consumed per hour.",
          "Cruising altitude must remain below 50 feet during cross-country flight."
        ],
        falseSentencesSpanish: [
          "La altitud de los aviones se mide en litros de combustible consumidos por hora.",
          "La altitud de crucero debe permanecer por debajo de 50 pies durante el vuelo a campo traviesa."
        ],
        spanish: "Mantenga la altitud de crucero asignada de acuerdo con la autorización de ATC."
      },
      {
        id: 142,
        targetWord: "SPEED",
        ipa: "/spiːd/",
        correctSentence: "Do not exceed maximum design operating speed during descent.",
        falseSentences: [
          "Aircraft speed is calculated by counting the number of clouds passed.",
          "Accelerate beyond maximum structural dive speed in severe turbulence."
        ],
        falseSentencesSpanish: [
          "La velocidad de la aeronave se calcula contando el número de nubes que pasan.",
          "Acelere más allá de la velocidad máxima de inmersión estructural en turbulencias severas."
        ],
        spanish: "No exceda la velocidad operativa máxima de diseño durante el descenso."
      },
      {
        id: 143,
        targetWord: "HEADING",
        ipa: "/ˈhed.ɪŋ/",
        correctSentence: "Turn left to magnetic heading 270 degrees as instructed by the controller.",
        falseSentences: [
          "Magnetic heading indicates the vertical angle of the landing flaps.",
          "Heading is measured in pounds per square inch on the altimeter."
        ],
        falseSentencesSpanish: [
          "El rumbo magnético indica el ángulo vertical de los flaps de aterrizaje.",
          "El rumbo se mide en libras por pulgada cuadrada en el altímetro."
        ],
        spanish: "Gire a la izquierda hacia el rumbo magnético 270 grados según lo indique el controlador."
      },
      {
        id: 144,
        targetWord: "ATTITUDE",
        ipa: "/ˈæt.ɪ.tuːd/",
        correctSentence: "The artificial horizon displays pitch and roll attitude relative to earth.",
        falseSentences: [
          "Attitude indicator displays the fuel tank temperature in Celsius.",
          "Aircraft attitude is adjusted only by opening the cabin windows."
        ],
        falseSentencesSpanish: [
          "El indicador de actitud muestra la temperatura del tanque de combustible en grados Celsius.",
          "La actitud de la aeronave se ajusta únicamente abriendo las ventanas de la cabina."
        ],
        spanish: "El horizonte artificial muestra la actitud de cabeceo y alabeo respecto a la tierra."
      },
      {
        id: 145,
        targetWord: "BEARING",
        ipa: "/ˈbeər.ɪŋ/",
        correctSentence: "Track the magnetic bearing to the VOR navigation station.",
        falseSentences: [
          "The VOR bearing indicates total oxygen pressure in the cockpit.",
          "Bearing is the electrical voltage delivered to the starter motor."
        ],
        falseSentencesSpanish: [
          "El rumbo VOR indica la presión total de oxígeno en la cabina.",
          "El rodamiento es el voltaje eléctrico entregado al motor de arranque."
        ],
        spanish: "Siga la marcación magnética (bearing) hacia la estación de navegación VOR."
      },
      {
        id: 146,
        targetWord: "DISTANCE",
        ipa: "/ˈdɪs.təns/",
        correctSentence: "The DME equipment calculates slant-range distance to the ground beacon.",
        falseSentences: [
          "DME distance indicates the weight of the passenger baggage.",
          "Slant-range distance is measured with a mechanical plumb bob."
        ],
        falseSentencesSpanish: [
          "La distancia DME indica el peso del equipaje del pasajero.",
          "La distancia de alcance inclinado se mide con una plomada mecánica."
        ],
        spanish: "El equipo DME calcula la distancia oblicua hacia la baliza terrestre."
      },
      {
        id: 147,
        targetWord: "ACCELERATION",
        ipa: "/əkˌsel.əˈreɪ.ʃən/",
        correctSentence: "The inertial accelerometer senses linear acceleration along three aircraft axes.",
        falseSentences: [
          "Linear acceleration is created by turning on the cabin reading lights.",
          "Accelerometers measure the volume of potable water in the galley."
        ],
        falseSentencesSpanish: [
          "La aceleración lineal se crea encendiendo las luces de lectura de la cabina.",
          "Los acelerómetros miden el volumen de agua potable en la cocina."
        ],
        spanish: "El acelerómetro inercial detecta la aceleración lineal a lo largo de tres ejes de la aeronave."
      },
      {
        id: 148,
        targetWord: "VIBRATION",
        ipa: "/vaɪˈbreɪ.ʃən/",
        correctSentence: "High engine vibration indications require immediate power reduction and inspection.",
        falseSentences: [
          "Engine vibration should reach maximum redline for smooth flight.",
          "Vibration sensors operate by absorbing engine lubricating oil."
        ],
        falseSentencesSpanish: [
          "La vibración del motor debe alcanzar la línea roja máxima para un vuelo suave.",
          "Los sensores de vibración funcionan absorbiendo el aceite lubricante del motor."
        ],
        spanish: "Indicaciones de alta vibración del motor requieren reducción inmediata de potencia e inspección."
      },
      {
        id: 149,
        targetWord: "RPM",
        ipa: "/ˌɑːr.piːˈem/",
        correctSentence: "Monitor engine core RPM to ensure the turbine operates within safe limits.",
        falseSentences: [
          "RPM measures the total gallons of hydraulic fluid remaining.",
          "Turbine RPM should drop to zero during takeoff climbout."
        ],
        falseSentencesSpanish: [
          "Las RPM miden el total de galones de fluido hidráulico restantes.",
          "Las RPM de la turbina deberían caer a cero durante el ascenso del despegue."
        ],
        spanish: "Monitoree las RPM del núcleo del motor para asegurar que la turbina opere dentro de límites seguros."
      },
      {
        id: 150,
        targetWord: "TORQUE FORCE",
        ipa: "/tɔːrk fɔːrs/",
        correctSentence: "Turboprop power output is measured directly as engine torque on the cockpit gauge.",
        falseSentences: [
          "Torque is the color of the paint applied to the propeller hub.",
          "Torque force pushes the aircraft backwards during high-speed cruise."
        ],
        falseSentencesSpanish: [
          "El par es el color de la pintura aplicada al cubo de la hélice.",
          "La fuerza de torsión empuja al avión hacia atrás durante el crucero a alta velocidad."
        ],
        spanish: "La potencia de salida del turbohélice se mide directamente como torque del motor en el instrumento de cabina."
      },
      {
        id: 151,
        targetWord: "BUS",
        ipa: "/bʌs/",
        correctSentence: "The essential electrical bus supplies power to critical flight instruments.",
        falseSentences: [
          "The electrical bus carries passengers from the terminal to the runway.",
          "Disconnect the essential bus during low visibility instrument landing."
        ],
        falseSentencesSpanish: [
          "El autobús eléctrico transporta pasajeros desde la terminal hasta la pista.",
          "Desconecte el autobús esencial durante el aterrizaje por instrumentos con baja visibilidad."
        ],
        spanish: "La barra eléctrica esencial suministra energía a los instrumentos de vuelo críticos."
      },
      {
        id: 152,
        targetWord: "RELAY",
        ipa: "/ˈriː.leɪ/",
        correctSentence: "An electrical relay uses a small control current to switch heavy electrical loads.",
        falseSentences: [
          "A relay is a rubber hose that drains hydraulic oil to the ground.",
          "Relays must be soaked in kerosene to ensure electrical conduction."
        ],
        falseSentencesSpanish: [
          "Un relé es una manguera de goma que drena el aceite hidráulico al suelo.",
          "Los relés deben empaparse en queroseno para asegurar la conducción eléctrica."
        ],
        spanish: "Un relé eléctrico utiliza una pequeña corriente de control para conmutar cargas eléctricas pesadas."
      },
      {
        id: 153,
        targetWord: "SOLENOID",
        ipa: "/ˈsoʊ.lə.nɔɪd/",
        correctSentence: "The starter solenoid valve actuates the pneumatic starter upon switch engagement.",
        falseSentences: [
          "The starter solenoid is an optical camera inside the nose radome.",
          "Solenoids operate by burning hydraulic fluid inside a cylinder."
        ],
        falseSentencesSpanish: [
          "El solenoide de arranque es una cámara óptica dentro del radomo de la nariz.",
          "Los solenoides funcionan quemando fluido hidráulico dentro de un cilindro."
        ],
        spanish: "La válvula solenoide de arranque acciona el arrancador neumático al accionar el interruptor."
      },
      {
        id: 154,
        targetWord: "SWITCH",
        ipa: "/swɪtʃ/",
        correctSentence: "Move the master battery switch to ON before starting the pre-flight check.",
        falseSentences: [
          "The battery switch must be turned OFF during all night flights.",
          "A switch is a mechanical rivet holding the wing spar to the fuselage."
        ],
        falseSentencesSpanish: [
          "El interruptor de la batería debe estar apagado durante todos los vuelos nocturnos.",
          "Un interruptor es un remache mecánico que sujeta el larguero del ala al fuselaje."
        ],
        spanish: "Mueva el interruptor maestro de batería a ON antes de iniciar la verificación previa al vuelo."
      },
      {
        id: 155,
        targetWord: "CIRCUIT BREAKER",
        ipa: "/ˈsɜːr.kɪt ˈbreɪ.kər/",
        correctSentence: "Never reset a tripped circuit breaker more than once unless authorized by checklist.",
        falseSentences: [
          "Hold tripped circuit breakers closed using wooden wedges or glue.",
          "Circuit breakers are designed to produce sparks inside the fuel tank."
        ],
        falseSentencesSpanish: [
          "Mantenga cerrados los disyuntores disparados con cuñas de madera o pegamento.",
          "Los disyuntores están diseñados para producir chispas dentro del tanque de combustible."
        ],
        spanish: "Nunca rearme un disyuntor disparado más de una vez a menos que lo autorice la lista de verificación."
      },
      {
        id: 156,
        targetWord: "GENERATOR",
        ipa: "/ˈdʒen.ər.eɪ.tər/",
        correctSentence: "The engine-driven generator converts mechanical energy into electrical power.",
        falseSentences: [
          "The generator converts electrical power into drinking water.",
          "The generator must be submerged in fuel to operate properly."
        ],
        falseSentencesSpanish: [
          "El generador convierte la energía eléctrica en agua potable.",
          "El generador debe estar sumergido en combustible para funcionar correctamente."
        ],
        spanish: "El generador impulsado por el motor convierte la energía mecánica en energía eléctrica."
      },
      {
        id: 157,
        targetWord: "ALTERNATOR",
        ipa: "/ˈɔːl.tər.neɪ.tər/",
        correctSentence: "Check alternator output voltage and amperage load on the cockpit ammeter.",
        falseSentences: [
          "The alternator provides hydraulic pressure to the landing gear struts.",
          "Alternator output must be zero volts during normal day flights."
        ],
        falseSentencesSpanish: [
          "El alternador proporciona presión hidráulica a los puntales del tren de aterrizaje.",
          "La salida del alternador debe ser de cero voltios durante vuelos diurnos normales."
        ],
        spanish: "Verifique el voltaje de salida del alternador y la carga de amperaje en el amperímetro de cabina."
      },
      {
        id: 158,
        targetWord: "INVERTER",
        ipa: "/ɪnˈvɜːr.tər/",
        correctSentence: "The static inverter converts 28-volt DC battery power into 115-volt AC power.",
        falseSentences: [
          "The inverter converts high-pressure fuel into engine lubricating oil.",
          "The inverter turns the aircraft upside down during emergency descents."
        ],
        falseSentencesSpanish: [
          "El inversor convierte el combustible a alta presión en aceite lubricante para el motor.",
          "El inversor pone el avión boca abajo durante descensos de emergencia."
        ],
        spanish: "El inversor estático convierte la energía de 28 voltios CC de la batería en energía de 115 voltios CA."
      },
      {
        id: 159,
        targetWord: "TRANSFORMER",
        ipa: "/trænsˈfɔːr.mər/",
        correctSentence: "The transformer rectifier unit steps down AC voltage and provides regulated DC.",
        falseSentences: [
          "The transformer increases fuel octane rating inside the combustor.",
          "Transformers are pneumatic valves that inflate the passenger tires."
        ],
        falseSentencesSpanish: [
          "El transformador aumenta el octanaje del combustible dentro de la cámara de combustión.",
          "Los transformadores son válvulas neumáticas que inflan los neumáticos de los pasajeros."
        ],
        spanish: "La unidad transformadora rectificadora reduce el voltaje de CA y proporciona CC regulada."
      },
      {
        id: 160,
        targetWord: "RECTIFIER",
        ipa: "/ˈrek.tɪ.faɪ.ər/",
        correctSentence: "The rectifier diodes convert alternating current into direct electrical current.",
        falseSentences: [
          "The rectifier converts direct current into high-pressure nitrogen gas.",
          "Rectifiers are mechanical hinges installed on the elevator trim tab."
        ],
        falseSentencesSpanish: [
          "El rectificador convierte la corriente continua en gas nitrógeno a alta presión.",
          "Los rectificadores son bisagras mecánicas instaladas en la pestaña de ajuste del elevador."
        ],
        spanish: "Los diodos rectificadores convierten la corriente alterna en corriente eléctrica continua."
      }
    ]
  },

  // =========================================================================
  // PLAY 9: ORACIONES 161 A 180 (SISTEMAS HIDRÁULICOS, NEUMÁTICOS Y COMBUSTIBLE)
  // =========================================================================
  {
    playId: 9,
    title: "PLAY 9",
    rangeText: "ORACIONES 161 - 180",
    description: "Componentes hidráulicos, válvulas, bombas, actuadores y sellos",
    questions: [
      {
        id: 161,
        targetWord: "BATTERY",
        ipa: "/ˈbæt.ər.i/",
        correctSentence: "The main nickel-cadmium battery provides emergency standby power.",
        falseSentences: [
          "The battery is filled with flammable aviation turbine fuel.",
          "Disconnect the battery while flying in dark night conditions."
        ],
        falseSentencesSpanish: [
          "La batería está llena de combustible inflamable para turbinas de aviación.",
          "Desconecte la batería mientras vuela en condiciones nocturnas oscuras."
        ],
        spanish: "La batería principal de níquel-cadmio proporciona energía de reserva para emergencias."
      },
      {
        id: 162,
        targetWord: "HARNESS",
        ipa: "/ˈhɑːr.nəs/",
        correctSentence: "Inspect the engine electrical wiring harness for heat damage and loose connectors.",
        falseSentences: [
          "The wiring harness is used to tow the aircraft across the apron.",
          "Cut the wiring harness if any warning light illuminates in flight."
        ],
        falseSentencesSpanish: [
          "El mazo de cables se utiliza para remolcar la aeronave a través de la plataforma.",
          "Corte el mazo de cables si alguna luz de advertencia se enciende en vuelo."
        ],
        spanish: "Inspeccione el mazo de cables eléctricos del motor en busca de daños por calor y conectores flojos."
      },
      {
        id: 163,
        targetWord: "CONNECTOR",
        ipa: "/kəˈnek.tər/",
        correctSentence: "Align the indexing keyway before mating the multipin electrical connector.",
        falseSentences: [
          "Force electrical connectors together using a heavy steel hammer.",
          "Electrical connectors should be coated with conductive sea salt water."
        ],
        falseSentencesSpanish: [
          "Fuerce los conectores eléctricos entre sí utilizando un martillo de acero pesado.",
          "Los conectores eléctricos deben recubrirse con agua salada marina conductora."
        ],
        spanish: "Alinee la chaveta de indexación antes de acoplar el conector eléctrico multipin."
      },
      {
        id: 164,
        targetWord: "TERMINAL",
        ipa: "/ˈtɜːr.mɪ.nəl/",
        correctSentence: "Crimp the terminal lug securely onto the stripped electrical cable end.",
        falseSentences: [
          "Attach terminal lugs using loose adhesive scotch tape.",
          "Leave terminal lugs touching adjacent airframe structural members."
        ],
        falseSentencesSpanish: [
          "Fije las terminales con cinta adhesiva suelta.",
          "Deje las orejetas terminales tocando los miembros estructurales del fuselaje adyacentes."
        ],
        spanish: "Engarce (crimp) el terminal de orejeta de forma segura en el extremo pelado del cable eléctrico."
      },
      {
        id: 165,
        targetWord: "PUMP",
        ipa: "/pʌmp/",
        correctSentence: "The engine-driven hydraulic pump supplies fluid pressure to flight control actuators.",
        falseSentences: [
          "The hydraulic pump pumps dry air into the passenger oxygen masks.",
          "Turn off all hydraulic pumps during final approach and landing."
        ],
        falseSentencesSpanish: [
          "La bomba hidráulica bombea aire seco a las máscaras de oxígeno de los pasajeros.",
          "Apague todas las bombas hidráulicas durante la aproximación final y el aterrizaje."
        ],
        spanish: "La bomba hidráulica impulsada por motor suministra presión de fluido a los actuadores de mandos de vuelo."
      },
      {
        id: 166,
        targetWord: "VALVE",
        ipa: "/vælv/",
        correctSentence: "Close the emergency fuel shutoff valve immediately in case of an engine fire.",
        falseSentences: [
          "Keep the fuel shutoff valve open during an uncontained engine fire.",
          "A valve is an optical lens on the weather radar display."
        ],
        falseSentencesSpanish: [
          "Mantenga abierta la válvula de cierre de combustible durante un incendio incontrolado del motor.",
          "Una válvula es una lente óptica en la pantalla del radar meteorológico."
        ],
        spanish: "Cierre la válvula de corte de combustible de emergencia de inmediato en caso de incendio del motor."
      },
      {
        id: 167,
        targetWord: "ACTUATOR",
        ipa: "/ˈæk.tʃu.eɪ.tər/",
        correctSentence: "The hydraulic actuator extends the primary landing gear assembly into locked position.",
        falseSentences: [
          "The actuator is an electronic audio speaker in the passenger cabin.",
          "Actuators produce electrical sparks to light the navigation beacons."
        ],
        falseSentencesSpanish: [
          "El actuador es un altavoz de audio electrónico en la cabina de pasajeros.",
          "Los actuadores producen chispas eléctricas para encender las balizas de navegación."
        ],
        spanish: "El actuador hidráulico extiende el conjunto del tren principal hasta la posición trabada."
      },
      {
        id: 168,
        targetWord: "ACCUMULATOR",
        ipa: "/əˈkjuː.mjə.leɪ.tər/",
        correctSentence: "The hydraulic accumulator dampens pressure surges and stores emergency brake pressure.",
        falseSentences: [
          "The accumulator accumulates passenger trash inside the wing roots.",
          "Fill the hydraulic accumulator with oxygen at 5,000 psi."
        ],
        falseSentencesSpanish: [
          "El acumulador acumula la basura de los pasajeros dentro de las raíces de las alas.",
          "Llene el acumulador hidráulico con oxígeno a 5000 psi."
        ],
        spanish: "El acumulador hidráulico amortigua picos de presión y almacena presión de freno de emergencia."
      },
      {
        id: 169,
        targetWord: "RESERVOIR",
        ipa: "/ˈrez.ə.vwɑːr/",
        correctSentence: "The hydraulic fluid reservoir is pressurized with bleed air to prevent pump cavitation.",
        falseSentences: [
          "The reservoir is an open metal bucket hanging below the fuselage.",
          "Fill the hydraulic reservoir with salty ocean water before flight."
        ],
        falseSentencesSpanish: [
          "El depósito es un cubo de metal abierto que cuelga debajo del fuselaje.",
          "Llene el depósito hidráulico con agua salada del océano antes del vuelo."
        ],
        spanish: "El depósito de fluido hidráulico está presurizado con aire de purga para evitar cavitación en la bomba."
      },
      {
        id: 170,
        targetWord: "FILTER",
        ipa: "/ˈfɪl.tər/",
        correctSentence: "Replace the high-pressure filter element when the differential pop-up indicator extends.",
        falseSentences: [
          "Wash clogged filter elements in dirty oil and reinstall them.",
          "Remove all hydraulic filters to increase fluid circulation speed."
        ],
        falseSentencesSpanish: [
          "Lave los elementos filtrantes obstruidos en aceite sucio y vuelva a instalarlos.",
          "Retire todos los filtros hidráulicos para aumentar la velocidad de circulación del fluido."
        ],
        spanish: "Reemplace el elemento filtrante de alta presión cuando se extienda el indicador emergente diferencial."
      },
      {
        id: 171,
        targetWord: "MANIFOLD",
        ipa: "/ˈmæn.ɪ.foʊld/",
        correctSentence: "The hydraulic manifold distributes pressurized fluid to multiple system components.",
        falseSentences: [
          "The manifold is a paper bag for passenger motion sickness.",
          "The manifold converts engine oil into aviation gasoline."
        ],
        falseSentencesSpanish: [
          "El colector es una bolsa de papel para los mareos de los pasajeros.",
          "El colector convierte el aceite de motor en gasolina de aviación."
        ],
        spanish: "El múltiple (manifold) hidráulico distribuye fluido presurizado a múltiples componentes del sistema."
      },
      {
        id: 172,
        targetWord: "LINE",
        ipa: "/laɪn/",
        correctSentence: "Inspect rigid titanium hydraulic lines for chafing, dents, and secure clamping.",
        falseSentences: [
          "Hydraulic lines should be allowed to vibrate against sharp metal frames.",
          "Cut hydraulic lines with a hacksaw to relieve operational pressure."
        ],
        falseSentencesSpanish: [
          "Se debe permitir que las líneas hidráulicas vibren contra marcos metálicos afilados.",
          "Corte las líneas hidráulicas con una sierra para metales para aliviar la presión operativa."
        ],
        spanish: "Inspeccione las líneas hidráulicas rígidas de titanio en busca de roce, abolladuras y abrazaderas firmes."
      },
      {
        id: 173,
        targetWord: "HOSE",
        ipa: "/hoʊz/",
        correctSentence: "Replace flexible rubber hydraulic hoses before reaching their stamped cure date limit.",
        falseSentences: [
          "Install flexible hoses with severe 180-degree kinks and twists.",
          "Hydraulic hoses last forever and never require shelf life inspection."
        ],
        falseSentencesSpanish: [
          "Instale mangueras flexibles con fuertes torceduras y torceduras de 180 grados.",
          "Las mangueras hidráulicas duran para siempre y nunca requieren inspección de vida útil."
        ],
        spanish: "Reemplace las mangueras hidráulicas flexibles de goma antes de alcanzar su fecha límite de curado."
      },
      {
        id: 174,
        targetWord: "FITTING",
        ipa: "/ˈfɪt.ɪŋ/",
        correctSentence: "Tighten the flareless hydraulic tube fitting to the specified torque value.",
        falseSentences: [
          "Apply plumbing thread tape to high-pressure flared aviation fittings.",
          "Leave tube fittings finger-tight without using wrenches."
        ],
        falseSentencesSpanish: [
          "Aplique cinta para hilos de plomería a los accesorios de aviación abocardados de alta presión.",
          "Deje los accesorios de los tubos apretados con los dedos sin utilizar llaves."
        ],
        spanish: "Apriete la conexión de tubería hidráulica sin abocinar al valor de torque especificado."
      },
      {
        id: 175,
        targetWord: "REGULATOR",
        ipa: "/ˈreɡ.jə.leɪ.tər/",
        correctSentence: "The pressure regulator maintains system pressure within the specified operating band.",
        falseSentences: [
          "The pressure regulator boils hydraulic fluid to produce steam thrust.",
          "The regulator shuts down the engines when cabin lights turn on."
        ],
        falseSentencesSpanish: [
          "El regulador de presión hierve el fluido hidráulico para producir empuje de vapor.",
          "El regulador apaga los motores cuando se encienden las luces de la cabina."
        ],
        spanish: "El regulador de presión mantiene la presión del sistema dentro de la banda operativa especificada."
      },
      {
        id: 176,
        targetWord: "CYLINDER",
        ipa: "/ˈsɪl.ɪn.dər/",
        correctSentence: "Inspect the landing gear actuator cylinder barrel for internal scoring and wear.",
        falseSentences: [
          "The cylinder is a flat triangular sheet used for aerodynamic trim.",
          "Drill holes through the cylinder wall to improve piston speed."
        ],
        falseSentencesSpanish: [
          "El cilindro es una hoja triangular plana que se utiliza para el ajuste aerodinámico.",
          "Taladre agujeros a través de la pared del cilindro para mejorar la velocidad del pistón."
        ],
        spanish: "Inspeccione el cilindro del actuador del tren de aterrizaje en busca de rayado interno y desgaste."
      },
      {
        id: 177,
        targetWord: "PISTON",
        ipa: "/ˈpɪs.tən/",
        correctSentence: "The chrome-plated actuator piston rod must be free of corrosion and scratches.",
        falseSentences: [
          "Piston rods should be painted with coarse textured exterior primer.",
          "The piston rotates 10,000 RPM inside the weather radar antenna."
        ],
        falseSentencesSpanish: [
          "Las varillas de pistón deben pintarse con imprimación exterior de textura gruesa.",
          "El pistón gira a 10.000 RPM dentro de la antena del radar meteorológico."
        ],
        spanish: "El vástago del pistón cromado del actuador debe estar libre de corrosión y rayaduras."
      },
      {
        id: 178,
        targetWord: "SEAL RING",
        ipa: "/siːl rɪŋ/",
        correctSentence: "Lubricate the rubber seal ring with clean system fluid prior to installation.",
        falseSentences: [
          "Install twisted and nicked seal rings on high-pressure actuators.",
          "Use seal rings made of dry hard cardboard for hydraulic valves."
        ],
        falseSentencesSpanish: [
          "Instale anillos de sello torcidos y mellados en los actuadores de alta presión.",
          "Utilice anillos de sellado hechos de cartón duro y seco para válvulas hidráulicas."
        ],
        spanish: "Lubrique el anillo de sello de goma con fluido limpio del sistema antes de la instalación."
      },
      {
        id: 179,
        targetWord: "GASKET",
        ipa: "/ˈɡæs.kɪt/",
        correctSentence: "Always discard the used metallic gasket and install a brand-new replacement.",
        falseSentences: [
          "Reuse worn flattened copper gaskets multiple times on fuel pumps.",
          "Gaskets are electronic microchips that control radar antennas."
        ],
        falseSentencesSpanish: [
          "Reutilice las juntas de cobre aplanadas desgastadas varias veces en las bombas de combustible.",
          "Las juntas son microchips electrónicos que controlan las antenas de radar."
        ],
        spanish: "Deseche siempre la junta metálica usada e instale un repuesto totalmente nuevo."
      },
      {
        id: 180,
        targetWord: "ORIFICE",
        ipa: "/ˈɔːr.ə.fɪs/",
        correctSentence: "A restrictor orifice controls the extension rate of the landing gear doors.",
        falseSentences: [
          "The restrictor orifice generates 50,000 pounds of jet engine thrust.",
          "Enlarge the precision orifice using a large wood nail."
        ],
        falseSentencesSpanish: [
          "El orificio restrictor genera 50.000 libras de empuje del motor a reacción.",
          "Agrande el orificio de precisión utilizando un clavo de madera grande."
        ],
        spanish: "Un orificio restrictor controla la velocidad de extensión de las compuertas del tren de aterrizaje."
      }
    ]
  },

  // =========================================================================
  // PLAY 10: ORACIONES 181 A 200 (MOTORES A REACCIÓN, SEGURIDAD Y MANUALES AMM)
  // =========================================================================
  {
    playId: 10,
    title: "PLAY 10",
    rangeText: "ORACIONES 181 - 200",
    description: "Turbinas, compresores, precauciones de seguridad y certificación AMM",
    questions: [
      {
        id: 181,
        targetWord: "TURBINE",
        ipa: "/ˈtɜːr.bɪn/",
        correctSentence: "The high-pressure turbine extracts energy from hot exhaust gases to drive the compressor.",
        falseSentences: [
          "The turbine is an inflatable yellow slide stored in the cockpit door.",
          "The turbine is lubricated by spraying salty water directly into the flames."
        ],
        falseSentencesSpanish: [
          "La turbina es un tobogán amarillo inflable almacenado en la puerta de la cabina.",
          "La turbina se lubrica rociando agua salada directamente sobre las llamas."
        ],
        spanish: "La turbina de alta presión extrae energía de los gases calientes de escape para mover el compresor."
      },
      {
        id: 182,
        targetWord: "COMPRESSOR",
        ipa: "/kəmˈpres.ər/",
        correctSentence: "The axial-flow compressor increases air pressure and temperature before the combustor.",
        falseSentences: [
          "The compressor cools incoming air down to absolute zero.",
          "The compressor empties the fuel tanks into the passenger cabin."
        ],
        falseSentencesSpanish: [
          "El compresor enfría el aire entrante hasta el cero absoluto.",
          "El compresor vacía los depósitos de combustible en la cabina de pasajeros."
        ],
        spanish: "El compresor de flujo axial aumenta la presión y temperatura del aire antes de la cámara de combustión."
      },
      {
        id: 183,
        targetWord: "COMBUSTOR",
        ipa: "/kəmˈbʌs.tər/",
        correctSentence: "Fuel nozzles spray atomized fuel into the combustor where continuous burning occurs.",
        falseSentences: [
          "The combustor stores drinking water for the flight attendants.",
          "The combustor must be kept packed with solid ice during takeoff."
        ],
        falseSentencesSpanish: [
          "La cámara de combustión almacena agua potable para los asistentes de vuelo.",
          "La cámara de combustión debe mantenerse llena de hielo sólido durante el despegue."
        ],
        spanish: "Las boquillas de combustible rocían combustible atomizado en el combustor donde ocurre la quema continua."
      },
      {
        id: 184,
        targetWord: "NOZZLE",
        ipa: "/ˈnɒz.əl/",
        correctSentence: "Inspect the fuel injector nozzle for atomization pattern and spray blockage.",
        falseSentences: [
          "The fuel nozzle is an optical lens on the flight deck windshield.",
          "Clean fuel nozzles using coarse iron nails and hammer taps."
        ],
        falseSentencesSpanish: [
          "La boquilla de combustible es una lente óptica situada en el parabrisas de la cabina de vuelo.",
          "Limpie las boquillas de combustible con clavos de hierro grueso y grifos de martillo."
        ],
        spanish: "Inspeccione la boquilla inyectora de combustible para comprobar el patrón de atomización y bloqueo de rociado."
      },
      {
        id: 185,
        targetWord: "STATOR",
        ipa: "/ˈsteɪ.tər/",
        correctSentence: "Compressor stator vanes diffuse airflow and convert kinetic energy into static pressure.",
        falseSentences: [
          "Stator vanes spin at 40,000 RPM inside the main landing wheel.",
          "The stator is a flexible rubber seal on the passenger window."
        ],
        falseSentencesSpanish: [
          "Las paletas del estator giran a 40.000 RPM dentro de la rueda de aterrizaje principal.",
          "El estator es una junta de goma flexible situada en la ventanilla del pasajero."
        ],
        spanish: "Los álabes del estator del compresor difunden el flujo de aire y convierten energía cinética en presión estática."
      },
      {
        id: 186,
        targetWord: "BLADE",
        ipa: "/bleɪd/",
        correctSentence: "Perform a borescope inspection to check turbine rotor blades for thermal distress.",
        falseSentences: [
          "Turbine rotor blades are made of soft unreinforced plastic.",
          "Cut turbine blades shorter with a kitchen saw if they rub."
        ],
        falseSentencesSpanish: [
          "Las palas del rotor de la turbina están hechas de plástico blando no reforzado.",
          "Corte las aspas de la turbina con una sierra de cocina si rozan."
        ],
        spanish: "Realice una inspección con boroscopio para verificar los álabes del rotor de turbina en busca de estrés térmico."
      },
      {
        id: 187,
        targetWord: "SHAFT",
        ipa: "/ʃæft/",
        correctSentence: "The main drive shaft connects the high-pressure turbine directly to the compressor rotor.",
        falseSentences: [
          "The drive shaft is a cotton string connecting the winglets.",
          "The main shaft is bent intentionally to increase vibration."
        ],
        falseSentencesSpanish: [
          "El eje impulsor es un hilo de algodón que conecta las aletas.",
          "El eje principal está doblado intencionalmente para aumentar la vibración."
        ],
        spanish: "El eje principal de transmisión conecta la turbina de alta presión directamente al rotor del compresor."
      },
      {
        id: 188,
        targetWord: "BEARING HOUSING",
        ipa: "/ˈbeər.ɪŋ ˈhaʊ.zɪŋ/",
        correctSentence: "The main engine bearing housing is scavenged continuously by return oil pumps.",
        falseSentences: [
          "The bearing housing stores passenger carry-on luggage overhead.",
          "Bearing housings must be filled with dry sand during flight."
        ],
        falseSentencesSpanish: [
          "La carcasa del cojinete almacena el equipaje de mano de los pasajeros en el techo.",
          "Los alojamientos de los rodamientos deben llenarse con arena seca durante el vuelo."
        ],
        spanish: "El alojamiento del rodamiento principal del motor es recuperado continuamente por bombas de retorno de aceite."
      },
      {
        id: 189,
        targetWord: "IGNITER",
        ipa: "/ɪɡˈnaɪ.tər/",
        correctSentence: "The high-energy spark igniter initiates fuel combustion during the engine start cycle.",
        falseSentences: [
          "The spark igniter is used to toast bread in the aircraft galley.",
          "Igniters must spark continuously inside the aircraft fuel tanks."
        ],
        falseSentencesSpanish: [
          "El encendedor se utiliza para tostar pan en la cocina de los aviones.",
          "Los encendedores deben chispear continuamente dentro de los tanques de combustible de los aviones."
        ],
        spanish: "La bujía encendedora de alta energía inicia la combustión de combustible durante el ciclo de arranque del motor."
      },
      {
        id: 190,
        targetWord: "INJECTOR",
        ipa: "/ɪnˈdʒek.tər/",
        correctSentence: "The fuel injector delivers finely atomized fuel mist into the primary combustion zone.",
        falseSentences: [
          "The injector pumps hydraulic fluid into the cockpit radio.",
          "The injector freezes fuel before entering the turbine wheel."
        ],
        falseSentencesSpanish: [
          "El inyector bombea fluido hidráulico a la radio de la cabina.",
          "El inyector congela el combustible antes de ingresar a la rueda de la turbina."
        ],
        spanish: "El inyector de combustible suministra una niebla finamente atomizada de combustible en la zona primaria de combustión."
      },
      {
        id: 191,
        targetWord: "WARNING",
        ipa: "/ˈwɔːr.nɪŋ/",
        correctSentence: "A red WARNING alert indicates an immediate hazard requiring prompt corrective action.",
        falseSentences: [
          "Red warning lights can be safely ignored until the next annual overhaul.",
          "A warning light indicates that passenger meal service has started."
        ],
        falseSentencesSpanish: [
          "Las luces rojas de advertencia se pueden ignorar con seguridad hasta la próxima revisión anual.",
          "Una luz de advertencia indica que se ha iniciado el servicio de comidas para pasajeros."
        ],
        spanish: "Una alerta roja de ADVERTENCIA (WARNING) indica un peligro inmediato que requiere acción correctiva pronta."
      },
      {
        id: 192,
        targetWord: "CAUTION",
        ipa: "/ˈkɔː.ʃən/",
        correctSentence: "An amber CAUTION message alerts the crew to a degraded system condition.",
        falseSentences: [
          "Amber caution messages mean the aircraft has reached cruising altitude.",
          "A caution message requires immediate pilot ejection from the cockpit."
        ],
        falseSentencesSpanish: [
          "Los mensajes de precaución de color ámbar significan que la aeronave ha alcanzado la altitud de crucero.",
          "Un mensaje de precaución requiere la expulsión inmediata del piloto de la cabina."
        ],
        spanish: "Un mensaje ámbar de PRECAUCIÓN (CAUTION) alerta a la tripulación sobre una condición degradada del sistema."
      },
      {
        id: 193,
        targetWord: "DANGER",
        ipa: "/ˈdeɪn.dʒər/",
        correctSentence: "Obey engine inlet DANGER suction zones marked clearly on the airport ramp.",
        falseSentences: [
          "Stand directly in front of running jet engine inlets during takeoff thrust.",
          "Inlet danger markings indicate the designated passenger smoking area."
        ],
        falseSentencesSpanish: [
          "Párese directamente frente a las entradas de los motores a reacción en funcionamiento durante el impulso de despegue.",
          "Las marcas de peligro en la entrada indican el área designada para fumar para pasajeros."
        ],
        spanish: "Respete las zonas de PELIGRO (DANGER) por succión de la entrada del motor marcadas en la rampa."
      },
      {
        id: 194,
        targetWord: "HAZARD",
        ipa: "/ˈhæz.ərd/",
        correctSentence: "Hydraulic fluid mist under extreme high pressure constitutes a serious skin injection hazard.",
        falseSentences: [
          "High-pressure fluid leaks are safe to check by touching with bare fingers.",
          "Aviation fuel vapors inside hangars pose zero flammability hazard."
        ],
        falseSentencesSpanish: [
          "Las fugas de fluido a alta presión se pueden comprobar de forma segura tocándolas con los dedos desnudos.",
          "Los vapores de combustible de aviación dentro de los hangares no presentan ningún riesgo de inflamabilidad."
        ],
        spanish: "La niebla de fluido hidráulico a extrema alta presión constituye un grave peligro de inyección en la piel."
      },
      {
        id: 195,
        targetWord: "FIRE",
        ipa: "/faɪər/",
        correctSentence: "Discharge the fire extinguisher bottle immediately if an engine fire persists.",
        falseSentences: [
          "An engine fire should be fanned with open cabin doors to cool down.",
          "Increase engine throttle to maximum during an in-flight fire."
        ],
        falseSentencesSpanish: [
          "Un incendio en un motor se debe avivar con las puertas de la cabina abiertas para que se enfríe.",
          "Aumente el acelerador del motor al máximo durante un incendio en vuelo."
        ],
        spanish: "Descargue la botella extintora de fuego de inmediato si el incendio del motor persiste."
      },
      {
        id: 196,
        targetWord: "SMOKE",
        ipa: "/smoʊk/",
        correctSentence: "Put on emergency oxygen masks immediately upon detecting smoke in the cockpit.",
        falseSentences: [
          "Inhale dense electrical cockpit smoke deeply to test its chemical scent.",
          "Cockpit smoke should be cleared by opening all passenger exits."
        ],
        falseSentencesSpanish: [
          "Inhale profundamente el denso humo de la cabina eléctrica para probar su olor químico.",
          "El humo de la cabina debe eliminarse abriendo todas las salidas de pasajeros."
        ],
        spanish: "Colóquese las máscaras de oxígeno de emergencia de inmediato al detectar humo en la cabina de mando."
      },
      {
        id: 197,
        targetWord: "EMERGENCY",
        ipa: "/ɪˈmɜːr.dʒən.si/",
        correctSentence: "Declare an emergency with air traffic control and initiate the checklist procedure.",
        falseSentences: [
          "During an in-flight emergency, turn off all communication radios.",
          "Emergencies should be kept secret from air traffic controllers."
        ],
        falseSentencesSpanish: [
          "Durante una emergencia durante el vuelo, apague todas las radios de comunicación.",
          "Las emergencias deben mantenerse en secreto para los controladores de tránsito aéreo."
        ],
        spanish: "Declare emergencia con el control de tráfico aéreo e inicie el procedimiento de la lista de verificación."
      },
      {
        id: 198,
        targetWord: "MANUAL",
        ipa: "/ˈmæn.ju.əl/",
        correctSentence: "Perform all aircraft maintenance tasks strictly in accordance with the Aircraft Maintenance Manual (AMM).",
        falseSentences: [
          "Ignore manufacturer maintenance manuals and guess critical torque values.",
          "The AMM manual is used only as decorative reading in the terminal."
        ],
        falseSentencesSpanish: [
          "Ignore los manuales de mantenimiento del fabricante y adivine los valores de torque críticos.",
          "El manual AMM se utiliza únicamente como lectura decorativa en el terminal."
        ],
        spanish: "Realice todas las tareas de mantenimiento de la aeronave estrictamente según el Manual de Mantenimiento de la Aeronave (AMM)."
      },
      {
        id: 199,
        targetWord: "PROCEDURE",
        ipa: "/prəˈsiː.dʒər/",
        correctSentence: "Follow the step-by-step procedure detailed in chapter 32 for landing gear replacement.",
        falseSentences: [
          "Skip safety procedures to save five minutes during maintenance turnaround.",
          "Procedures are illegal recommendations prohibited by the FAA and EASA."
        ],
        falseSentencesSpanish: [
          "Omita los procedimientos de seguridad para ahorrar cinco minutos durante el mantenimiento.",
          "Los procedimientos son recomendaciones ilegales prohibidas por la FAA y la EASA."
        ],
        spanish: "Siga el procedimiento paso a paso detallado en el capítulo 32 para el reemplazo del tren de aterrizaje."
      },
      {
        id: 200,
        targetWord: "CERTIFICATE",
        ipa: "/sɚˈtɪf.ə.kət/",
        correctSentence: "Sign the maintenance release certificate after confirming all work complies with airworthiness standards.",
        falseSentences: [
          "Sign the airworthiness release certificate before performing any inspection.",
          "A maintenance certificate is an informal postcard mailed to the passengers."
        ],
        falseSentencesSpanish: [
          "Firme el certificado de liberación de aeronavegabilidad antes de realizar cualquier inspección.",
          "Un certificado de mantenimiento es una postal informal enviada por correo a los pasajeros."
        ],
        spanish: "Firme el certificado de puesta en servicio tras confirmar que todo el trabajo cumple los estándares de aeronavegabilidad."
      }
    ]
  }
];

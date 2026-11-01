// =========================================================================
// GAME 2 - MÓDULO 2: 200 ORACIONES TÉCNICAS AERONÁUTICAS (AMM & ATA)
// 10 PLAYS CON 20 PREGUNTAS CADA UNO (TOTAL 200 PREGUNTAS DISTINTAS)
// =========================================================================

export interface Module2Question {
  id: number;
  targetWord: string;
  ipa?: string;
  correctSentence: string;
  falseSentences: [string, string];
  falseSentencesSpanish?: [string, string];
  spanish: string;
}

export interface Module2Play {
  playId: number;
  title: string;
  description: string;
  rangeText: string;
  questions: Module2Question[];
}

export const MODULE_2_PLAYS: Module2Play[] = [
  {
    playId: 1,
    title: "PLAY 1",
    rangeText: "ORACIONES 1 - 20",
    description: "Sistemas Neumáticos y Presurización de Cabina (ATA 21 & ATA 36)",
    questions: [
      {
        id: 1,
        targetWord: "bleed air",
        correctSentence: "The bleed air regulator maintains constant manifold pressure during climb.",
        spanish: "El regulador de aire sangrado mantiene constante la presión del múltiple durante el ascenso.",
        falseSentences: ["La bomba de combustible mantiene constante el flujo de retorno durante el despegue.", "El alternador principal regula el voltaje en los buses durante el rodaje."],
        falseSentencesSpanish: ["La bomba de combustible mantiene constante el flujo de retorno durante el despegue.", "El alternador principal regula el voltaje en los buses durante el rodaje."]
      },
      {
        id: 2,
        targetWord: "pack valve",
        correctSentence: "Open the flow control pack valve to supply fresh air to the mixing chamber.",
        spanish: "Abra la válvula pack de control de flujo para suministrar aire fresco a la cámara de mezcla.",
        falseSentences: ["Cierre la válvula de drenaje de aceite para drenar el cárter inferior.", "Ajuste el perno del vástago para alinear el actuador hidráulico."],
        falseSentencesSpanish: ["Cierre la válvula de drenaje de aceite para drenar el cárter inferior.", "Ajuste el perno del vástago para alinear el actuador hidráulico."]
      },
      {
        id: 3,
        targetWord: "outflow valve",
        correctSentence: "The outflow valve regulates cabin altitude by modulating exhaust airflow.",
        spanish: "La válvula de salida de flujo regula la altitud de cabina modulando el flujo de escape.",
        falseSentences: ["La válvula de corte corta el suministro de queroseno a la cámara de combustión.", "El filtro de succión retiene partículas metálicas en el circuito cerrado."],
        falseSentencesSpanish: ["La válvula de corte corta el suministro de queroseno a la cámara de combustión.", "El filtro de succión retiene partículas metálicas en el circuito cerrado."]
      },
      {
        id: 4,
        targetWord: "heat exchanger",
        correctSentence: "Inspect the primary heat exchanger matrix for foreign object clogging and dust.",
        spanish: "Inspeccione la matriz del intercambiador de calor primario por obstrucción de objetos extraños y polvo.",
        falseSentences: ["Pinte la superficie del radomo con esmalte conductor de alta densidad.", "Desconecte el cable coaxial del transpondedor antes de la prueba estática."],
        falseSentencesSpanish: ["Pinte la superficie del radomo con esmalte conductor de alta densidad.", "Desconecte el cable coaxial del transpondedor antes de la prueba estática."]
      },
      {
        id: 5,
        targetWord: "water separator",
        correctSentence: "Replace the coalescer bag inside the water separator during scheduled service.",
        spanish: "Reemplace la bolsa coalescente dentro del separador de agua durante el servicio programado.",
        falseSentences: ["Verifique la holgura axial del eje de entrada con un reloj comparador.", "Sustituya las bujías de encendido secundario en ambos motores."],
        falseSentencesSpanish: ["Verifique la holgura axial del eje de entrada con un reloj comparador.", "Sustituya las bujías de encendido secundario en ambos motores."]
      },
      {
        id: 6,
        targetWord: "ram air door",
        correctSentence: "Modulate the ram air inlet door actuator to adjust cooling efficiency.",
        spanish: "Module el actuador de la compuerta de entrada de aire de impacto para ajustar la eficiencia de refrigeración.",
        falseSentences: ["Lubrique los cojinetes del timón de profundidad con grasa grafitada.", "Verifique el inflado del amortiguador oleoneumático con nitrógeno seco."],
        falseSentencesSpanish: ["Lubrique los cojinetes del timón de profundidad con grasa grafitada.", "Verifique el inflado del amortiguador oleoneumático con nitrógeno seco."]
      },
      {
        id: 7,
        targetWord: "safety valve",
        correctSentence: "The positive pressure safety valve relieves differential pressure above maximum limit.",
        spanish: "La válvula de seguridad de presión positiva alivia la sobrepresión diferencial por encima del límite máximo.",
        falseSentences: ["El sensor de temperatura de frenos alerta sobre recalentamiento en el disco.", "La bomba de retorno presuriza el acumulador de reserva del tren."],
        falseSentencesSpanish: ["El sensor de temperatura de frenos alerta sobre recalentamiento en el disco.", "La bomba de retorno presuriza el acumulador de reserva del tren."]
      },
      {
        id: 8,
        targetWord: "mixing chamber",
        correctSentence: "Conditioned air mixes with filtered recirculated air inside the distribution chamber.",
        spanish: "El aire acondicionado se mezcla con aire recirculado filtrado dentro de la cámara de distribución.",
        falseSentences: ["El combustible presurizado ingresa directamente a las toberas de inyección primaria.", "El fluido hidráulico fluye a través del enfriador de aceite montado en el ala."],
        falseSentencesSpanish: ["El combustible presurizado ingresa directamente a las toberas de inyección primaria.", "El fluido hidráulico fluye a través del enfriador de aceite montado en el ala."]
      },
      {
        id: 9,
        targetWord: "trim air valve",
        correctSentence: "The zone trim air valve adds hot bleed air to satisfy cockpit temperature demand.",
        spanish: "La válvula de aire de ajuste de zona añade aire caliente de sangrado para satisfacer la demanda de temperatura de cabina.",
        falseSentences: ["El disyuntor térmico desactiva la barra eléctrica de emergencia por sobrecarga.", "El transductor de presión mide la presión estática del tubo pitot."],
        falseSentencesSpanish: ["El disyuntor térmico desactiva la barra eléctrica de emergencia por sobrecarga.", "El transductor de presión mide la presión estática del tubo pitot."]
      },
      {
        id: 10,
        targetWord: "ozone converter",
        correctSentence: "A catalytic ozone converter breaks down atmospheric ozone into breathable oxygen.",
        spanish: "Un convertidor catalítico de ozono descompone el ozono atmosférico en oxígeno respirable.",
        falseSentences: ["Un generador de vórtices estabiliza la capa límite en el extradós alar.", "Un rectificador de corriente convierte corriente continua en alterna para instrumentos."],
        falseSentencesSpanish: ["Un generador de vórtices estabiliza la capa límite en el extradós alar.", "Un rectificador de corriente convierte corriente continua en alterna para instrumentos."]
      },
      {
        id: 11,
        targetWord: "negative relief valve",
        correctSentence: "The negative pressure relief valve prevents ambient pressure from exceeding cabin pressure.",
        spanish: "La válvula de alivio de presión negativa evita que la presión ambiental supere a la de cabina.",
        falseSentences: ["El vástago del actuador transmite fuerza mecánica a los spoilers de tierra.", "El interruptor de proximidad detecta la posición retraída del tren de nariz."],
        falseSentencesSpanish: ["El vástago del actuador transmite fuerza mecánica a los spoilers de tierra.", "El interruptor de proximidad detecta la posición retraída del tren de nariz."]
      },
      {
        id: 12,
        targetWord: "ducting clamp",
        correctSentence: "Torque the V-band ducting clamp to forty inch-pounds following installation.",
        spanish: "Aplique un torque de cuarenta libras-pulgada a la abrazadera de banda en V del ducto tras la instalación.",
        falseSentences: ["Cargue la batería de níquel-cadmio a corriente constante durante ocho horas.", "Inspeccione el desgaste de la zapata de freno con un calibrador de profundidad."],
        falseSentencesSpanish: ["Cargue la batería de níquel-cadmio a corriente constante durante ocho horas.", "Inspeccione el desgaste de la zapata de freno con un calibrador de profundidad."]
      },
      {
        id: 13,
        targetWord: "check valve",
        correctSentence: "The non-return check valve prevents reverse airflow into the high pressure compressor.",
        spanish: "La válvula de retención unidireccional evita el flujo inverso de aire hacia el compresor de alta presión.",
        falseSentences: ["El sensor de humo activa la bocina acústica en el compartimento de carga.", "El amortiguador de guiñada previene oscilaciones de balanceo holandés en crucero."],
        falseSentencesSpanish: ["El sensor de humo activa la bocina acústica en el compartimento de carga.", "El amortiguador de guiñada previene oscilaciones de balanceo holandés en crucero."]
      },
      {
        id: 14,
        targetWord: "precooler",
        correctSentence: "The engine fan air precooler reduces bleed air temperature before pylon exit.",
        spanish: "El preenfriador por aire de ventilador reduce la temperatura del aire sangrado antes de salir del pilón.",
        falseSentences: ["El indicador de actitud muestra información de alabeo y cabeceo mediante giroscopio.", "La bomba de barrido extrae aceite de la caja de engranajes del motor."],
        falseSentencesSpanish: ["El indicador de actitud muestra información de alabeo y cabeceo mediante giroscopio.", "La bomba de barrido extrae aceite de la caja de engranajes del motor."]
      },
      {
        id: 15,
        targetWord: "isolation valve",
        correctSentence: "Open the pneumatic crossbleed isolation valve to interconnect both engine manifolds.",
        spanish: "Abra la válvula de aislamiento de sangrado cruzado neumático para interconectar ambos múltiples de motor.",
        falseSentences: ["Desmonte la antena VHF para inspeccionar corrosión bajo el sello perimetral.", "Calibre la tensión de los cables de control de alerones con tensiómetro."],
        falseSentencesSpanish: ["Desmonte la antena VHF para inspeccionar corrosión bajo el sello perimetral.", "Calibre la tensión de los cables de control de alerones con tensiómetro."]
      },
      {
        id: 16,
        targetWord: "altitude controller",
        correctSentence: "The digital cabin altitude controller processes landing field elevation data.",
        spanish: "El controlador digital de altitud de cabina procesa los datos de elevación del campo de aterrizaje.",
        falseSentences: ["El extintor de halón descarga su agente al romperse el disco de ruptura térmico.", "El servomando eléctrico posiciona los slats de borde de ataque simétricamente."],
        falseSentencesSpanish: ["El extintor de halón descarga su agente al romperse el disco de ruptura térmico.", "El servomando eléctrico posiciona los slats de borde de ataque simétricamente."]
      },
      {
        id: 17,
        targetWord: "recirculation fan",
        correctSentence: "Check electrical insulation resistance on the cabin recirculation fan motor windings.",
        spanish: "Compruebe la resistencia de aislamiento eléctrico en los devanados del motor del ventilador de recirculación de cabina.",
        falseSentences: ["Purgue el aire atrapado en la tubería del actuador del timón de dirección.", "Verifique el bloqueo mecánico del gancho de anclaje de la compuerta principal."],
        falseSentencesSpanish: ["Purgue el aire atrapado en la tubería del actuador del timón de dirección.", "Verifique el bloqueo mecánico del gancho de anclaje de la compuerta principal."]
      },
      {
        id: 18,
        targetWord: "refrigeration turbine",
        correctSentence: "Inspect turbine nozzle ring guide vanes for thermal cracking or erosion.",
        spanish: "Inspeccione los álabes guía de tobera de la turbina de refrigeración por agrietamiento térmico o erosión.",
        falseSentences: ["Pruebe el funcionamiento del altímetro barométrico ajustando la escala de milibares.", "Ajuste el microinterruptor de fin de carrera del compensador de profundidad."],
        falseSentencesSpanish: ["Pruebe el funcionamiento del altímetro barométrico ajustando la escala de milibares.", "Ajuste el microinterruptor de fin de carrera del compensador de profundidad."]
      },
      {
        id: 19,
        targetWord: "pressure transducer",
        correctSentence: "The differential pressure transducer sends cabin rate-of-climb signals to the display.",
        spanish: "El transductor de presión diferencial envía señales de régimen de ascenso de cabina a la pantalla.",
        falseSentences: ["El fusible de corriente alterna protege el circuito del calefactor de ventana.", "El indicador de nivel de aceite muestra la cantidad remanente en cuartos de galón."],
        falseSentencesSpanish: ["El fusible de corriente alterna protege el circuito del calefactor de ventana.", "El indicador de nivel de aceite muestra la cantidad remanente en cuartos de galón."]
      },
      {
        id: 20,
        targetWord: "dump valve",
        correctSentence: "Depress the emergency dump valve push-button to depressurize cabin structure on ground.",
        spanish: "Presione el pulsador de la válvula de descarga de emergencia para despresurizar la estructura de cabina en tierra.",
        falseSentences: ["Cargue el acumulador de frenos de estacionamiento hasta tres mil libras por pulgada cuadrada.", "Conecte el carro de servicio terrestre a la toma de corriente externa de popa."],
        falseSentencesSpanish: ["Cargue el acumulador de frenos de estacionamiento hasta tres mil libras por pulgada cuadrada.", "Conecte el carro de servicio terrestre a la toma de corriente externa de popa."]
      }
    ]
  },
  {
    playId: 2,
    title: "PLAY 2",
    rangeText: "ORACIONES 21 - 40",
    description: "Sistemas Eléctricos de Potencia y Distribución (ATA 24)",
    questions: [
      {
        id: 21,
        targetWord: "generator",
        correctSentence: "The integrated drive generator produces three-phase one-hundred-fifteen volt alternating current.",
        spanish: "El generador de accionamiento integrado produce corriente alterna trifásica de ciento quince voltios.",
        falseSentences: ["La bomba hidráulica de reserva entrega fluido a dos mil libras por pulgada cuadrada.", "El compensador de cabeceo reduce la carga aerodinámica en los mandos manuales."],
        falseSentencesSpanish: ["La bomba hidráulica de reserva entrega fluido a dos mil libras por pulgada cuadrada.", "El compensador de cabeceo reduce la carga aerodinámica en los mandos manuales."]
      },
      {
        id: 22,
        targetWord: "transformer rectifier",
        correctSentence: "The transformer rectifier unit converts alternating current into twenty-eight volt direct current.",
        spanish: "La unidad transformadora rectificadora convierte corriente alterna en corriente continua de veintiocho voltios.",
        falseSentences: ["La válvula de retención impide el retorno de vapores explosivos hacia el tanque alar.", "El sensor de ángulo de ataque envía señales analógicas a la computadora de control."],
        falseSentencesSpanish: ["La válvula de retención impide el retorno de vapores explosivos hacia el tanque alar.", "El sensor de ángulo de ataque envía señales analógicas a la computadora de control."]
      },
      {
        id: 23,
        targetWord: "bus power breaker",
        correctSentence: "The bus power control unit commands the tie breaker to close upon generator failure.",
        spanish: "La unidad de control de potencia de barra ordena cerrar el disyuntor de enlace al fallar un generador.",
        falseSentences: ["El actuador electrohidráulico mueve el spoiler al recibir una señal del bus ARINC.", "El depósito de líquido descongelante suministra glicol al borde de ataque."],
        falseSentencesSpanish: ["El actuador electrohidráulico mueve el spoiler al recibir una señal del bus ARINC.", "El depósito de líquido descongelante suministra glicol al borde de ataque."]
      },
      {
        id: 24,
        targetWord: "circuit breaker",
        correctSentence: "Never reset a tripped high amperage circuit breaker until wiring is inspected.",
        spanish: "Nunca restablezca un disyuntor de alto amperaje disparado hasta que el cableado sea inspeccionado.",
        falseSentences: ["Compruebe la presión de los neumáticos de las ruedas principales con manómetro calibrado.", "Aplique sellador anticorrosivo sobre los remaches del extradós del ala."],
        falseSentencesSpanish: ["Compruebe la presión de los neumáticos de las ruedas principales con manómetro calibrado.", "Aplique sellador anticorrosivo sobre los remaches del extradós del ala."]
      },
      {
        id: 25,
        targetWord: "external power",
        correctSentence: "Connect external power receptacle and confirm correct phase sequence before switching buses.",
        spanish: "Conecte el receptáculo de energía externa y confirme la secuencia de fases correcta antes de conmutar barras.",
        falseSentences: ["Desmonte el cono de cola para acceder a la unidad de potencia auxiliar.", "Vacíe el depósito de agua potable antes de someter la aeronave a temperaturas bajo cero."],
        falseSentencesSpanish: ["Desmonte el cono de cola para acceder a la unidad de potencia auxiliar.", "Vacíe el depósito de agua potable antes de someter la aeronave a temperaturas bajo cero."]
      },
      {
        id: 26,
        targetWord: "inverter",
        correctSentence: "The static inverter provides essential emergency alternating current power from the aircraft battery.",
        spanish: "El inversor estático suministra energía de corriente alterna esencial de emergencia desde la batería del avión.",
        falseSentences: ["El mecanismo de retracción del tren pliega los montantes dentro del alojamiento alar.", "El amortiguador de masa atenúa vibraciones aeroelásticas en el timón vertical."],
        falseSentencesSpanish: ["El mecanismo de retracción del tren pliega los montantes dentro del alojamiento alar.", "El amortiguador de masa atenúa vibraciones aeroelásticas en el timón vertical."]
      },
      {
        id: 27,
        targetWord: "battery charger",
        correctSentence: "Monitor battery charger float charge current to prevent thermal runaway conditions.",
        spanish: "Monitoree la corriente de carga flotante del cargador de baterías para prevenir embalamiento térmico.",
        falseSentences: ["Revise la holgura entre la llanta y el disco de freno con una galga de espesores.", "Inspeccione la tobera de escape en busca de grietas por fatiga térmica."],
        falseSentencesSpanish: ["Revise la holgura entre la llanta y el disco de freno con una galga de espesores.", "Inspeccione la tobera de escape en busca de grietas por fatiga térmica."]
      },
      {
        id: 28,
        targetWord: "ground fault",
        correctSentence: "The generator control unit trips off line when detecting a differential ground fault.",
        spanish: "La unidad de control de generador se desconecta al detectar una falla a tierra diferencial.",
        falseSentences: ["El vástago del cilindro neumático extiende los flaps hacia la posición de despegue.", "El horizonte artificial muestra la referencia de vuelo con respecto al plano horizontal."],
        falseSentencesSpanish: ["El vástago del cilindro neumático extiende los flaps hacia la posición de despegue.", "El horizonte artificial muestra la referencia de vuelo con respecto al plano horizontal."]
      },
      {
        id: 29,
        targetWord: "slip ring",
        correctSentence: "Clean deicing slip rings and brush blocks using approved anhydrous isopropyl solvent.",
        spanish: "Limpie los anillos colectores de deshielo y bloques de escobillas con solvente isopropílico anhidro aprobado.",
        falseSentences: ["Alinee la bomba de inyección de combustible con las marcas de reglaje del cigüeñal.", "Mida el espesor de la capa de pintura sobre el fuselaje con medidor magnético."],
        falseSentencesSpanish: ["Alinee la bomba de inyección de combustible con las marcas de reglaje del cigüeñal.", "Mida el espesor de la capa de pintura sobre el fuselaje con medidor magnético."]
      },
      {
        id: 30,
        targetWord: "bonding strap",
        correctSentence: "Measure bonding strap electrical resistance with a milliohm meter across aluminum structure.",
        spanish: "Mida la resistencia eléctrica de la cinta de masa con un miliohmímetro a través de la estructura de aluminio.",
        falseSentences: ["Inspeccione el arnés del eyector de bengalas para descartar daños mecánicos.", "Compruebe el nivel de fluido de amortiguación en el compensador de guiñada."],
        falseSentencesSpanish: ["Inspeccione el arnés del eyector de bengalas para descartar daños mecánicos.", "Compruebe el nivel de fluido de amortiguación en el compensador de guiñada."]
      },
      {
        id: 31,
        targetWord: "bus tie",
        correctSentence: "The automatic bus tie contactor connects the left and right electrical networks seamlessly.",
        spanish: "El contactor automático de enlace de barra conecta las redes eléctricas izquierda y derecha sin interrupción.",
        falseSentences: ["El indicador de viraje y resbale asiste al piloto en virajes coordinados.", "El amortiguador de fricción previene vibraciones en los pedales de mando."],
        falseSentencesSpanish: ["El indicador de viraje y resbale asiste al piloto en virajes coordinados.", "El amortiguador de fricción previene vibraciones en los pedales de mando."]
      },
      {
        id: 32,
        targetWord: "current transformer",
        correctSentence: "Current transformers monitor phase current balance to trigger protective overload shutdown.",
        spanish: "Los transformadores de corriente monitorean el balance de corriente de fase para activar el apagado de protección por sobrecarga.",
        falseSentences: ["Las aletas de refrigeración del cilindro disipan calor generado en la cámara de combustión.", "El filtro de partículas de alta eficiencia purifica el aire de la cabina de pasajeros."],
        falseSentencesSpanish: ["Las aletas de refrigeración del cilindro disipan calor generado en la cámara de combustión.", "El filtro de partículas de alta eficiencia purifica el aire de la cabina de pasajeros."]
      },
      {
        id: 33,
        targetWord: "constant speed drive",
        correctSentence: "Inspect constant speed drive oil sight glass for correct level and discoloration.",
        spanish: "Inspeccione la mirilla de aceite del accionamiento de velocidad constante para verificar nivel correcto y decoloración.",
        falseSentences: ["Verifique el juego longitudinal en los cojinetes de rodillos del eje propulsor.", "Alinee los alerones con el perfil alar en posición neutral mediante calas."],
        falseSentencesSpanish: ["Verifique el juego longitudinal en los cojinetes de rodillos del eje propulsor.", "Alinee los alerones con el perfil alar en posición neutral mediante calas."]
      },
      {
        id: 34,
        targetWord: "static discharger",
        correctSentence: "Inspect static discharger wicks at wingtips and trailing edges for broken conductive cores.",
        spanish: "Inspeccione las mechas de descarga estática en las puntas de ala y bordes de fuga por núcleos conductores rotos.",
        falseSentences: ["Compruebe el sellado del parabrisas delantero contra penetración de agua de lluvia.", "Verifique la tensión de los resortes de retorno del acelerador manual."],
        falseSentencesSpanish: ["Compruebe el sellado del parabrisas delantero contra penetración de agua de lluvia.", "Verifique la tensión de los resortes de retorno del acelerador manual."]
      },
      {
        id: 35,
        targetWord: "hot battery bus",
        correctSentence: "The emergency fire extinguishing bottle squibs connect permanently to the hot battery bus.",
        spanish: "Los fulminantes de botellas extintoras de emergencia se conectan permanentemente a la barra caliente de batería.",
        falseSentences: ["El tren de morro gira mediante un motor hidráulico controlado desde la cabina de vuelo.", "El alerón de compensación asiste al esfuerzo manual ejercido sobre la columna."],
        falseSentencesSpanish: ["El tren de morro gira mediante un motor hidráulico controlado desde la cabina de vuelo.", "El alerón de compensación asiste al esfuerzo manual ejercido sobre la columna."]
      },
      {
        id: 36,
        targetWord: "wire harness",
        correctSentence: "Support the engine wire harness with cushioned Adel clamps every twelve inches minimum.",
        spanish: "Sujete el mazo de cables del motor con abrazaderas Adel acolchadas cada doce pulgadas como mínimo.",
        falseSentences: ["Engrase las articulaciones del tren de aterrizaje con pistola de alta presión.", "Verifique el estado de las luces de navegación en los extremos del plano."],
        falseSentencesSpanish: ["Engrase las articulaciones del tren de aterrizaje con pistola de alta presión.", "Verifique el estado de las luces de navegación en los extremos del plano."]
      },
      {
        id: 37,
        targetWord: "contactor",
        correctSentence: "The reverse current contactor opens instantly to prevent battery discharge into dead generators.",
        spanish: "El contactor de corriente inversa se abre al instante para evitar la descarga de batería hacia generadores inactivos.",
        falseSentences: ["El indicador Mach informa la velocidad de la aeronave relativa a la velocidad del sonido.", "La válvula solenoide drena el combustible remanente en el conducto de purga."],
        falseSentencesSpanish: ["El indicador Mach informa la velocidad de la aeronave relativa a la velocidad del sonido.", "La válvula solenoide drena el combustible remanente en el conducto de purga."]
      },
      {
        id: 38,
        targetWord: "overvoltage relay",
        correctSentence: "The overvoltage protection relay isolates the field winding whenever voltage exceeds limits.",
        spanish: "El relé de protección contra sobretensión aísla el devanado de campo siempre que el voltaje exceda los límites.",
        falseSentences: ["El indicador de flujo de combustible cuantifica el consumo horario de queroseno.", "El depósito presurizado de frenos amortigua los impulsos del pedal."],
        falseSentencesSpanish: ["El indicador de flujo de combustible cuantifica el consumo horario de queroseno.", "El depósito presurizado de frenos amortigua los impulsos del pedal."]
      },
      {
        id: 39,
        targetWord: "ground power unit",
        correctSentence: "Connect ground power unit plug firmly into external receptacle before activating control relay.",
        spanish: "Conecte el enchufe de la unidad de energía terrestre firmemente en el receptáculo externo antes de activar el relé de control.",
        falseSentences: ["Inspeccione el disco de fricción de la rueda de proa por ranuras circunferenciales.", "Compruebe el balance aerodinámico del timón tras una reparación de chapa."],
        falseSentencesSpanish: ["Inspeccione el disco de fricción de la rueda de proa por ranuras circunferenciales.", "Compruebe el balance aerodinámico del timón tras una reparación de chapa."]
      },
      {
        id: 40,
        targetWord: "terminal lug",
        correctSentence: "Crimp high-current copper terminal lugs using calibrated hydraulic ratchet crimping tooling.",
        spanish: "Engaste terminales de cobre de alta corriente utilizando herramienta de engaste hidráulica de trinquete calibrada.",
        falseSentences: ["Ajuste la holgura entre dientes de los piñones reductores con pasta de contacto.", "Purgue el sistema de frenos hasta eliminar todas las burbujas de aire."],
        falseSentencesSpanish: ["Ajuste la holgura entre dientes de los piñones reductores con pasta de contacto.", "Purgue el sistema de frenos hasta eliminar todas las burbujas de aire."]
      }
    ]
  },
  {
    playId: 3,
    title: "PLAY 3",
    rangeText: "ORACIONES 41 - 60",
    description: "Sistemas de Combustible y Protección Contra Incendios (ATA 28 & ATA 26)",
    questions: [
      {
        id: 41,
        targetWord: "boost pump",
        correctSentence: "Submerged electric boost pumps provide pressurized fuel to the engine high-pressure pump.",
        spanish: "Las bombas eléctricas sumergidas proporcionan combustible presurizado a la bomba de alta presión del motor.",
        falseSentences: ["Los actuadores neumáticos despliegan los inversores de empuje durante el aterrizaje.", "Las luces de rodaje iluminan la trayectoria sobre la calle de rodaje."],
        falseSentencesSpanish: ["Los actuadores neumáticos despliegan los inversores de empuje durante el aterrizaje.", "Las luces de rodaje iluminan la trayectoria sobre la calle de rodaje."]
      },
      {
        id: 42,
        targetWord: "crossfeed valve",
        correctSentence: "Open the fuel crossfeed valve to balance fuel quantity between left and right wings.",
        spanish: "Abra la válvula de alimentación cruzada de combustible para balancear la cantidad entre las alas izquierda y derecha.",
        falseSentences: ["Inspeccione el recubrimiento de teflón de las juntas deslizantes de tubería.", "Ajuste el limitador de par motor en el banco de pruebas dinamométrico."],
        falseSentencesSpanish: ["Inspeccione el recubrimiento de teflón de las juntas deslizantes de tubería.", "Ajuste el limitador de par motor en el banco de pruebas dinamométrico."]
      },
      {
        id: 43,
        targetWord: "scavenge ejector",
        correctSentence: "Motive flow scavenge ejectors transfer fuel continuously from tank corners to sump.",
        spanish: "Los eyectores de barrido por flujo motriz transfieren combustible continuamente de las esquinas al sumidero.",
        falseSentences: ["Los sensores de impacto transmiten aceleraciones al registrador de datos de vuelo.", "El sistema de aviso de pérdida sacude la palanca al acercarse al ángulo crítico."],
        falseSentencesSpanish: ["Los sensores de impacto transmiten aceleraciones al registrador de datos de vuelo.", "El sistema de aviso de pérdida sacude la palanca al acercarse al ángulo crítico."]
      },
      {
        id: 44,
        targetWord: "fuel strainer",
        correctSentence: "Clean the main engine fuel strainer and inspect screen meshes for particulate contaminants.",
        spanish: "Limpie el colador principal de combustible del motor e inspeccione mallas por contaminantes particulados.",
        falseSentences: ["Verifique la calibración del velocímetro con un probador pitot-estático.", "Compruebe el ángulo de calaje del estabilizador horizontal mediante escala graduada."],
        falseSentencesSpanish: ["Verifique la calibración del velocímetro con un probador pitot-estático.", "Compruebe el ángulo de calaje del estabilizador horizontal mediante escala graduada."]
      },
      {
        id: 45,
        targetWord: "vent float valve",
        correctSentence: "The vent float valve closes during steep bank angles to prevent overboard fuel spill.",
        spanish: "La válvula de flotador de ventilación se cierra durante virajes pronunciados para evitar derrame de combustible al exterior.",
        falseSentences: ["El acumulador de nitrógeno suministra presión auxiliar al circuito de frenos.", "El compensador aerodinámico aligera las fuerzas de mando en virajes continuados."],
        falseSentencesSpanish: ["El acumulador de nitrógeno suministra presión auxiliar al circuito de frenos.", "El compensador aerodinámico aligera las fuerzas de mando en virajes continuados."]
      },
      {
        id: 46,
        targetWord: "defueling valve",
        correctSentence: "Open the defueling shutoff valve to suction fuel out through the single point refuel adapter.",
        spanish: "Abra la válvula de corte de drenaje para succionar combustible a través del adaptador de repostaje de punto único.",
        falseSentences: ["Calibre la tensión de las poleas de control de compensación de dirección.", "Verifique la tolerancia de desgaste en los pernos de articulación del flap."],
        falseSentencesSpanish: ["Calibre la tensión de las poleas de control de compensación de dirección.", "Verifique la tolerancia de desgaste en los pernos de articulación del flap."]
      },
      {
        id: 47,
        targetWord: "fuel quantity sensor",
        correctSentence: "Capacitance-type fuel quantity probes measure dielectric permittivity changes in the fuel tank.",
        spanish: "Las sondas de cantidad de combustible capacitivas miden cambios de permitividad dieléctrica en el tanque de combustible.",
        falseSentences: ["Los amortiguadores de vibración de elastómero aíslan los soportes del motor del fuselaje.", "Las válvulas reguladoras neumáticas dosifican el aire hacia las botas de deshielo."],
        falseSentencesSpanish: ["Los amortiguadores de vibración de elastómero aíslan los soportes del motor del fuselaje.", "Las válvulas reguladoras neumáticas dosifican el aire hacia las botas de deshielo."]
      },
      {
        id: 48,
        targetWord: "dripstick",
        correctSentence: "Pull down the magnetic dripstick below lower wing skin to verify fuel volume manually.",
        spanish: "Tire hacia abajo de la varilla de goteo magnética bajo el revestimiento alar para verificar volumen de combustible manualmente.",
        falseSentences: ["Desmonte las compuertas de inspección del timón para verificar cables de mando.", "Alinee la mira óptica de verificación geométrica con la cuerda aerodinámica media."],
        falseSentencesSpanish: ["Desmonte las compuertas de inspección del timón para verificar cables de mando.", "Alinee la mira óptica de verificación geométrica con la cuerda aerodinámica media."]
      },
      {
        id: 49,
        targetWord: "fire loop",
        correctSentence: "The dual continuous pneumatic fire detection loop triggers alarm upon core gas expansion.",
        spanish: "El bucle neumático continuo doble de detección de incendios activa la alarma al expandirse el gas interno.",
        falseSentences: ["El motor eléctrico del paso de hélice varía el ángulo de pala en crucero.", "El transmisor de posición de flaps envía señales potenciométricas a cabina."],
        falseSentencesSpanish: ["El motor eléctrico del paso de hélice varía el ángulo de pala en crucero.", "El transmisor de posición de flaps envía señales potenciométricas a cabina."]
      },
      {
        id: 50,
        targetWord: "fire squib",
        correctSentence: "The electrically triggered cartridge squib discharges the halon extinguishing container into the nacelle.",
        spanish: "El fulminante detonado eléctricamente descarga el contenedor extintor de halón dentro de la barquilla.",
        falseSentences: ["El termostato de cabina conmuta automáticamente entre aire frío y caliente.", "El servomecanismo del piloto automático aplica torque correctivo sobre la barra."],
        falseSentencesSpanish: ["El termostato de cabina conmuta automáticamente entre aire frío y caliente.", "El servomecanismo del piloto automático aplica torque correctivo sobre la barra."]
      },
      {
        id: 51,
        targetWord: "surge tank",
        correctSentence: "Inspect wing tip surge vent tanks for proper drainage and dry drain mast channels.",
        spanish: "Inspeccione los tanques de expansión de ventilación en punta de ala por drenaje y canales de mástil limpios.",
        falseSentences: ["Mida la holgura entre dientes en los engranajes cónicos de transmisión de rotor.", "Pruebe la resistencia de los cables de antena ADF contra vibraciones."],
        falseSentencesSpanish: ["Mida la holgura entre dientes en los engranajes cónicos de transmisión de rotor.", "Pruebe la resistencia de los cables de antena ADF contra vibraciones."]
      },
      {
        id: 52,
        targetWord: "fuel heater",
        correctSentence: "The fuel-oil heat exchanger warms cold fuel to melt suspended microscopic ice crystals.",
        spanish: "El intercambiador de calor combustible-aceite calienta combustible frío para derretir microcristales de hielo en suspensión.",
        falseSentences: ["El indicador de viraje giroscópico detecta la tasa de giro en grados por segundo.", "El gato hidráulico eleva la pata del tren para cambio de neumático desgastado."],
        falseSentencesSpanish: ["El indicador de viraje giroscópico detecta la tasa de giro en grados por segundo.", "El gato hidráulico eleva la pata del tren para cambio de neumático desgastado."]
      },
      {
        id: 53,
        targetWord: "flapper check valve",
        correctSentence: "Lightweight rubber flapper check valves maintain one-way fuel surge control inside inner ribs.",
        spanish: "Válvulas de retención de aleta de caucho livianas mantienen control unidireccional de oleaje dentro de costillas internas.",
        falseSentences: ["El variador de fase del alternador sincroniza la frecuencia con la red de a bordo.", "La válvula de retención de oxígeno previene el vaciado accidental de las botellas."],
        falseSentencesSpanish: ["El variador de fase del alternador sincroniza la frecuencia con la red de a bordo.", "La válvula de retención de oxígeno previene el vaciado accidental de las botellas."]
      },
      {
        id: 54,
        targetWord: "smoke detector",
        correctSentence: "The photoelectric smoke detector samples cargo bay air for infrared light refraction.",
        spanish: "El detector de humo fotoeléctrico analiza el aire de bodegas de carga mediante refracción de luz infrarroja.",
        falseSentences: ["El acelerómetro de tres ejes mide fuerzas G experimentadas durante maniobras.", "La bomba manual de emergencia presuriza el circuito de extensión alternativa del tren."],
        falseSentencesSpanish: ["El acelerómetro de tres ejes mide fuerzas G experimentadas durante maniobras.", "La bomba manual de emergencia presuriza el circuito de extensión alternativa del tren."]
      },
      {
        id: 55,
        targetWord: "drain valve",
        correctSentence: "Drain water sumps using approved glass sampler jars before morning first engine start.",
        spanish: "Drene los sumideros de agua con recipientes de muestreo de vidrio aprobados antes del primer arranque matutino.",
        falseSentences: ["Verifique el libre movimiento de las toberas orientables del inversor de empuje.", "Ajuste el tope mecánico del pedal de frenos según especificaciones del manual."],
        falseSentencesSpanish: ["Verifique el libre movimiento de las toberas orientables del inversor de empuje.", "Ajuste el tope mecánico del pedal de frenos según especificaciones del manual."]
      },
      {
        id: 56,
        targetWord: "inerting system",
        correctSentence: "The nitrogen fuel tank inerting system separates air oxygen to decrease ullage flammability.",
        spanish: "El sistema de inertización de tanques de combustible separa oxígeno del aire para disminuir inflamabilidad del espacio vacío.",
        falseSentences: ["El conector de paso hermético atraviesa el mamparo de presión sin fugas de aire.", "El manómetro del acumulador hidráulico indica la precarga de gas nitrógeno."],
        falseSentencesSpanish: ["El conector de paso hermético atraviesa el mamparo de presión sin fugas de aire.", "El manómetro del acumulador hidráulico indica la precarga de gas nitrógeno."]
      },
      {
        id: 57,
        targetWord: "fire handle",
        correctSentence: "Pulling the engine fire control T-handle mechanically shuts fuel, hydraulic, and pneumatic feeds.",
        spanish: "Tirar de la manija en T de control de incendio de motor corta mecánicamente alimentaciones de combustible, hidráulica y neumática.",
        falseSentences: ["Girar el volante de compensador afloja la tensión en los resortes de centrado.", "Presionar el botón de prueba de lámparas enciende todos los avisadores de alerta."],
        falseSentencesSpanish: ["Girar el volante de compensador afloja la tensión en los resortes de centrado.", "Presionar el botón de prueba de lámparas enciende todos los avisadores de alerta."]
      },
      {
        id: 58,
        targetWord: "baffle rib",
        correctSentence: "Baffle ribs inside integral fuel tanks minimize fuel sloshing forces during aggressive banking.",
        spanish: "Costillas deflectoras dentro de tanques integrales reducen fuerzas de chapoteo de combustible en virajes agresivos.",
        falseSentences: ["Palancas acodadas transmiten movimiento angular a las varillas de control de paso.", "Placas de desgaste de bronce protegen los montantes del tren de fricción severa."],
        falseSentencesSpanish: ["Palancas acodadas transmiten movimiento angular a las varillas de control de paso.", "Placas de desgaste de bronce protegen los montantes del tren de fricción severa."]
      },
      {
        id: 59,
        targetWord: "overwing refuel",
        correctSentence: "Ground the fuel delivery nozzle to overwing grounding jacks prior to uncapping the filler.",
        spanish: "Conecte la boquilla de repostaje a los enchufes de tierra sobre el ala antes de destapar el orificio de llenado.",
        falseSentences: ["Desconecte los tubos flexibles de freno antes de desmontar el cilindro maestro.", "Lubrique la cadena de transmisión del timón de cabeceo con aerosol sintético."],
        falseSentencesSpanish: ["Desconecte los tubos flexibles de freno antes de desmontar el cilindro maestro.", "Lubrique la cadena de transmisión del timón de cabeceo con aerosol sintético."]
      },
      {
        id: 60,
        targetWord: "thermal relief valve",
        correctSentence: "The thermal expansion relief valve discharges hydraulic and fuel line trapped volume spikes.",
        spanish: "La válvula de alivio por dilatación térmica descarga picos de volumen atrapados en líneas hidráulicas y de combustible.",
        falseSentences: ["El sensor de temperatura de gases de escape emplea termocuplas de cromel-alumel.", "El compensador aerodinámico de borde de fuga estabiliza el mando a alta velocidad."],
        falseSentencesSpanish: ["El sensor de temperatura de gases de escape emplea termocuplas de cromel-alumel.", "El compensador aerodinámico de borde de fuga estabiliza el mando a alta velocidad."]
      }
    ]
  },
  {
    playId: 4,
    title: "PLAY 4",
    rangeText: "ORACIONES 61 - 80",
    description: "Controles de Vuelo Primarios y Secundarios (ATA 27)",
    questions: [
      {
        id: 61,
        targetWord: "aileron",
        correctSentence: "The left and right ailerons deflect differentially to create aerodynamic rolling moments.",
        spanish: "Los alerones izquierdo y derecho deflectan diferencialmente para crear momentos aerodinámicos de alabeo.",
        falseSentences: ["Las bombas de vacío accionan los instrumentos giroscópicos en aviones convencionales.", "Los amortiguadores de tijera previenen la rotación del vástago del tren de morro."],
        falseSentencesSpanish: ["Las bombas de vacío accionan los instrumentos giroscópicos en aviones convencionales.", "Los amortiguadores de tijera previenen la rotación del vástago del tren de morro."]
      },
      {
        id: 62,
        targetWord: "elevator",
        correctSentence: "Pulling back on control column commands symmetrical trailing edge up elevator deflection.",
        spanish: "Tirar de la columna de control comanda una deflexión simétrica hacia arriba del borde de fuga del timón de profundidad.",
        falseSentences: ["Empujar la palanca de paso adelanta el momento de inyección en bombas diésel.", "Girar el selector de combustible conecta el depósito auxiliar del fuselaje."],
        falseSentencesSpanish: ["Empujar la palanca de paso adelanta el momento de inyección en bombas diésel.", "Girar el selector de combustible conecta el depósito auxiliar del fuselaje."]
      },
      {
        id: 63,
        targetWord: "rudder",
        correctSentence: "The directional rudder controls aircraft yaw angle around its vertical axis during flight.",
        spanish: "El timón de dirección controla el ángulo de guiñada de la aeronave alrededor de su eje vertical en vuelo.",
        falseSentences: ["El alerón hipersustentador aumenta la curvatura alar durante el despegue.", "El difusor de entrada ralentiza el flujo de aire sónico antes del compresor."],
        falseSentencesSpanish: ["El alerón hipersustentador aumenta la curvatura alar durante el despegue.", "El difusor de entrada ralentiza el flujo de aire sónico antes del compresor."]
      },
      {
        id: 64,
        targetWord: "spoiler",
        correctSentence: "Flight spoilers deploy symmetrically on descending wings to increase aerodynamic drag and descent rate.",
        spanish: "Los spoilers de vuelo se despliegan simétricamente en alas descendentes para aumentar resistencia aerodinámica y régimen de descenso.",
        falseSentences: ["Las botas neumáticas de borde de ataque se inflan alternadamente para romper hielo.", "Los calentadores pitot evitan la formación de hielo en las tomas estáticas."],
        falseSentencesSpanish: ["Las botas neumáticas de borde de ataque se inflan alternadamente para romper hielo.", "Los calentadores pitot evitan la formación de hielo en las tomas estáticas."]
      },
      {
        id: 65,
        targetWord: "slat",
        correctSentence: "Leading edge slats extend forward and downward to delay aerodynamic wing stall.",
        spanish: "Los slats de borde de ataque se extienden hacia adelante y abajo para demorar la pérdida aerodinámica del ala.",
        falseSentences: ["Los purgadores automáticos extraen sedimentos pesados del fondo del colector.", "Los pernos fusibles se rompen ante sobrecargas controladas para salvar la estructura."],
        falseSentencesSpanish: ["Los purgadores automáticos extraen sedimentos pesados del fondo del colector.", "Los pernos fusibles se rompen ante sobrecargas controladas para salvar la estructura."]
      },
      {
        id: 66,
        targetWord: "flap track",
        correctSentence: "Inspect flap carriage tracks and roller bearings for metal spalling and proper lubrication.",
        spanish: "Inspeccione las pistas de carretillas de flaps y cojinetes de rodillos por desprendimiento de metal y lubricación adecuada.",
        falseSentences: ["Compruebe la continuidad eléctrica de los cables del indicador de temperatura de aceite.", "Verifique el ajuste de la tuerca almenada con pasador de aletas en el eje de la rueda."],
        falseSentencesSpanish: ["Compruebe la continuidad eléctrica de los cables del indicador de temperatura de aceite.", "Verifique el ajuste de la tuerca almenada con pasador de aletas en el eje de la rueda."]
      },
      {
        id: 67,
        targetWord: "trim tab",
        correctSentence: "Adjust the aileron balance trim tab pushrod length to correct aerodynamic aircraft wing heaviness.",
        spanish: "Ajuste la longitud de la varilla de la aleta compensadora del alerón para corregir tendencia al ala pesada en vuelo.",
        falseSentences: ["Sustituya las arandelas de caucho sintético en los racores de tuberías de combustible.", "Inspeccione los sellos laberínticos de la turbina para prevenir fugas de gas caliente."],
        falseSentencesSpanish: ["Sustituya las arandelas de caucho sintético en los racores de tuberías de combustible.", "Inspeccione los sellos laberínticos de la turbina para prevenir fugas de gas caliente."]
      },
      {
        id: 68,
        targetWord: "feel unit",
        correctSentence: "The artificial feel unit increases stick resistance proportionally to dynamic flight speed.",
        spanish: "La unidad de sensación artificial aumenta la resistencia de la palanca proporcionalmente a la velocidad dinámica de vuelo.",
        falseSentences: ["El sensor de oxígeno de emergencia mide la presión parcial en las máscaras de pasajeros.", "El solenoide de corte de ralentí apaga el motor al interrumpir la mezcla de combustible."],
        falseSentencesSpanish: ["El sensor de oxígeno de emergencia mide la presión parcial en las máscaras de pasajeros.", "El solenoide de corte de ralentí apaga el motor al interrumpir la mezcla de combustible."]
      },
      {
        id: 69,
        targetWord: "yaw damper",
        correctSentence: "The dual channel yaw damper commands rudder servos to attenuate Dutch roll oscillations.",
        spanish: "El amortiguador de guiñada de doble canal comanda los servos de timón para atenuar oscilaciones de balanceo holandés.",
        falseSentences: ["El intercambiador de aire ram disipa calor del condensador del circuito frigorífico.", "El transductor acústico emite pitidos de aviso de tren no desplegado."],
        falseSentencesSpanish: ["El intercambiador de aire ram disipa calor del condensador del circuito frigorífico.", "El transductor acústico emite pitidos de aviso de tren no desplegado."]
      },
      {
        id: 70,
        targetWord: "horizontal stabilizer",
        correctSentence: "The trimmable horizontal stabilizer is positioned by a hydraulic jackscrew and nut assembly.",
        spanish: "El estabilizador horizontal compensable es posicionado por un conjunto de tornillo elevador y tuerca hidráulica.",
        falseSentences: ["El interruptor de corte de bomba desactiva el motor eléctrico al alcanzar la presión límite.", "La tobera divergente acelera los gases de escape a regímenes supersónicos."],
        falseSentencesSpanish: ["El interruptor de corte de bomba desactiva el motor eléctrico al alcanzar la presión límite.", "La tobera divergente acelera los gases de escape a regímenes supersónicos."]
      },
      {
        id: 71,
        targetWord: "control cable",
        correctSentence: "Measure flight control cable tension using calibrated tensiometers adjusted for ambient temperature.",
        spanish: "Mida la tensión de los cables de control de vuelo con tensiómetros calibrados ajustados por temperatura ambiente.",
        falseSentences: ["Engrase las ranuras estriadas del árbol de transmisión del alternador auxiliar.", "Compruebe el sellado del domo del radar meteorológico contra infiltración de humedad."],
        falseSentencesSpanish: ["Engrase las ranuras estriadas del árbol de transmisión del alternador auxiliar.", "Compruebe el sellado del domo del radar meteorológico contra infiltración de humedad."]
      },
      {
        id: 72,
        targetWord: "turnbuckle",
        correctSentence: "Safety wire both barrels of control cable turnbuckles using double-strand safety methods.",
        spanish: "Asegure con alambre de frenar ambos barriles de los tensores de cables de control usando métodos de doble hebra.",
        falseSentences: ["Limpie los electrodos de las bujías de encendido con cepillo de cerdas de latón.", "Verifique la nivelación longitudinal del avión sobre los puntos de pesaje."],
        falseSentencesSpanish: ["Limpie los electrodos de las bujías de encendido con cepillo de cerdas de latón.", "Verifique la nivelación longitudinal del avión sobre los puntos de pesaje."]
      },
      {
        id: 73,
        targetWord: "bellcrank",
        correctSentence: "Inspect cast aluminum bellcranks for bearing play and hairline fatigue cracks at pivot holes.",
        spanish: "Inspeccione balancines acodados de aluminio fundido por holgura de cojinetes y grietas de fatiga en agujeros de pivote.",
        falseSentences: ["Pinte las marcas de alineación en las cabezas de tornillos tras el apriete dinámico.", "Sustituya el diafragma flexible de la bomba dosificadora de aditivo anticongelante."],
        falseSentencesSpanish: ["Pinte las marcas de alineación en las cabezas de tornillos tras el apriete dinámico.", "Sustituya el diafragma flexible de la bomba dosificadora de aditivo anticongelante."]
      },
      {
        id: 74,
        targetWord: "gust lock",
        correctSentence: "Engage the mechanical gust lock on ground to prevent aerodynamic flutter damage to controls.",
        spanish: "Enganche el bloqueo mecánico contra ráfagas en tierra para evitar daños por aleteo aerodinámico en mandos.",
        falseSentences: ["Calibre la sensibilidad del variómetro variando la fuga calibrada de la cámara.", "Inspeccione los discos de ruptura del extintor para comprobar estado de carga."],
        falseSentencesSpanish: ["Calibre la sensibilidad del variómetro variando la fuga calibrada de la cámara.", "Inspeccione los discos de ruptura del extintor para comprobar estado de carga."]
      },
      {
        id: 75,
        targetWord: "power control unit",
        correctSentence: "The hydraulic power control unit converts flight control electronic commands into linear mechanical strokes.",
        spanish: "La unidad de control de potencia hidráulica convierte comandos electrónicos de vuelo en carreras mecánicas lineales.",
        falseSentences: ["La resistencia de caldeo del parabrisas previene el empañamiento en aproximaciones húmedas.", "El sensor de temperatura de frenos informa el calor acumulado tras parada brusca."],
        falseSentencesSpanish: ["La resistencia de caldeo del parabrisas previene el empañamiento en aproximaciones húmedas.", "El sensor de temperatura de frenos informa el calor acumulado tras parada brusca."]
      },
      {
        id: 76,
        targetWord: "mixer unit",
        correctSentence: "The mechanical mixer unit combines roll and pitch demands on elevon flight surfaces.",
        spanish: "La unidad mezcladora mecánica combina demandas de alabeo y cabeceo en superficies de mando tipo elevón.",
        falseSentences: ["El contactor de barra de tierra conmuta la fuente de alimentación automáticamente.", "El filtro micrónico retiene contaminantes suspendidos en el fluido sintético."],
        falseSentencesSpanish: ["El contactor de barra de tierra conmuta la fuente de alimentación automáticamente.", "El filtro micrónico retiene contaminantes suspendidos en el fluido sintético."]
      },
      {
        id: 77,
        targetWord: "asymmetry detector",
        correctSentence: "The flap asymmetry brake engages instantly when travel discrepancy between wings is detected.",
        spanish: "El freno de asimetría de flaps se engrana al instante cuando se detecta discrepancia de recorrido entre alas.",
        falseSentences: ["El deflector de aire frío canaliza la corriente hacia las bobinas de excitación.", "El muelle de retroceso devuelve el acelerador a ralentí en caso de rotura de cable."],
        falseSentencesSpanish: ["El deflector de aire frío canaliza la corriente hacia las bobinas de excitación.", "El muelle de retroceso devuelve el acelerador a ralentí en caso de rotura de cable."]
      },
      {
        id: 78,
        targetWord: "torque tube",
        correctSentence: "Check flap drive torque tubes for circumferential twist and bearing hanger alignment.",
        spanish: "Compruebe los tubos de torsión del mando de flaps por torsión circunferencial y alineación de soportes.",
        falseSentences: ["Inspeccione el cono de entrada del reactor en busca de daños por impacto de aves.", "Alinee las agujas indicadoras del sincronizador de hélices bimotor."],
        falseSentencesSpanish: ["Inspeccione el cono de entrada del reactor en busca de daños por impacto de aves.", "Alinee las agujas indicadoras del sincronizador de hélices bimotor."]
      },
      {
        id: 79,
        targetWord: "stick pusher",
        correctSentence: "The stick pusher applies forward force to the control column when critical alpha is exceeded.",
        spanish: "El empujador de palanca aplica fuerza hacia adelante a la columna cuando se excede el ángulo de ataque crítico.",
        falseSentences: ["La bomba de recuperación de drenajes devuelve el combustible derramado al depósito colector.", "El filtro centrífugo separa impurezas sólidas del aceite lubricante caliente."],
        falseSentencesSpanish: ["La bomba de recuperación de drenajes devuelve el combustible derramado al depósito colector.", "El filtro centrífugo separa impurezas sólidas del aceite lubricante caliente."]
      },
      {
        id: 80,
        targetWord: "speed brake",
        correctSentence: "Extend speed brakes on main wing surfaces to decelerate rapidly without altering engine thrust.",
        spanish: "Extienda frenos aerodinámicos en superficies alares principales para desacelerar rápido sin variar empuje de motores.",
        falseSentences: ["Compruebe el ángulo de reglaje de las palas del ventilador con galga angular.", "Verifique la carga hidrostática de las botellas de oxígeno de tripulación."],
        falseSentencesSpanish: ["Compruebe el ángulo de reglaje de las palas del ventilador con galga angular.", "Verifique la carga hidrostática de las botellas de oxígeno de tripulación."]
      }
    ]
  },
  {
    playId: 5,
    title: "PLAY 5",
    rangeText: "ORACIONES 81 - 100",
    description: "Tren de Aterrizaje, Ruedas y Frenos (ATA 32)",
    questions: [
      {
        id: 81,
        targetWord: "oleo strut",
        correctSentence: "Servicing the oleo strut requires precise hydraulic fluid volume and dry nitrogen gas inflation.",
        spanish: "El servicio al montante oleoneumático requiere volumen preciso de fluido hidráulico e inflado con nitrógeno seco.",
        falseSentences: ["El manómetro de sobrepresión descarga vapores de gasolina al exterior del carenado.", "El termostato de deshielo apaga las mantas térmicas al alcanzar sesenta grados."],
        falseSentencesSpanish: ["El manómetro de sobrepresión descarga vapores de gasolina al exterior del carenado.", "El termostato de deshielo apaga las mantas térmicas al alcanzar sesenta grados."]
      },
      {
        id: 82,
        targetWord: "drag brace",
        correctSentence: "Inspect the drag brace folding link for crack free pin holes and smooth joint pivoting.",
        spanish: "Inspeccione el tirante de arrastre plegable por orificios de perno libres de grietas y pivote suave.",
        falseSentences: ["Compruebe la sincronización de chispas en los magnetos izquierdo y derecho.", "Desmonte el soporte del motor para inspeccionar pernos por corrosión intergranular."],
        falseSentencesSpanish: ["Compruebe la sincronización de chispas en los magnetos izquierdo y derecho.", "Desmonte el soporte del motor para inspeccionar pernos por corrosión intergranular."]
      },
      {
        id: 83,
        targetWord: "brake rotor",
        correctSentence: "Measure carbon composite brake rotor disc wear pins before and after heavy gross landing.",
        spanish: "Mida los pasadores de desgaste del disco de freno compuesto de carbono antes y después de aterrizaje pesado.",
        falseSentences: ["Calibre la escala de frecuencia del receptor omnidireccional VOR en cabina.", "Inspeccione las juntas de goma de las compuertas de tren para prevenir silbidos."],
        falseSentencesSpanish: ["Calibre la escala de frecuencia del receptor omnidireccional VOR en cabina.", "Inspeccione las juntas de goma de las compuertas de tren para prevenir silbidos."]
      },
      {
        id: 84,
        targetWord: "antiskid",
        correctSentence: "The electrohydraulic antiskid transducer releases brake pressure to prevent tire skid and blowout.",
        spanish: "El transductor electrohidráulico antideslizante libera presión de frenos para evitar derrape y reventón de neumático.",
        falseSentences: ["El convertidor de par hidrodinámico acopla el eje motor con el rotor de cola.", "El sensor capacitivo mide la cantidad de combustible residual en el colector central."],
        falseSentencesSpanish: ["El convertidor de par hidrodinámico acopla el eje motor con el rotor de cola.", "El sensor capacitivo mide la cantidad de combustible residual en el colector central."]
      },
      {
        id: 85,
        targetWord: "metering pin",
        correctSentence: "The internal metering pin inside the shock strut modulates oil orifice flow resistance.",
        spanish: "El pasador dosificador interno dentro del montante amortiguador modula la resistencia del flujo de aceite por el orificio.",
        falseSentences: ["El compensador termostático ajusta la mezcla de aire caliente según temperatura exterior.", "El interruptor de límite apaga el motor eléctrico al completarse el ciclo de retracción."],
        falseSentencesSpanish: ["El compensador termostático ajusta la mezcla de aire caliente según temperatura exterior.", "El interruptor de límite apaga el motor eléctrico al completarse el ciclo de retracción."]
      },
      {
        id: 86,
        targetWord: "torque link",
        correctSentence: "Check torque link bushings and center hinge pin for allowable lateral and axial clearance.",
        spanish: "Compruebe los bujes de las tijeras de torsión y perno de bisagra central por holguras lateral y axial permitidas.",
        falseSentences: ["Verifique la resistencia de aislamiento del generador de tacómetro con megóhmetro.", "Pinte marcas de sellado en las tuercas de los pernos de fijación de turbina."],
        falseSentencesSpanish: ["Verifique la resistencia de aislamiento del generador de tacómetro con megóhmetro.", "Pinte marcas de sellado en las tuercas de los pernos de fijación de turbina."]
      },
      {
        id: 87,
        targetWord: "fusible plug",
        correctSentence: "Fusible safety plugs melt at excessive tire temperatures to deflate tire safely on wheel.",
        spanish: "Los tapones fusibles de seguridad se funden a temperaturas excesivas para desinflar el neumático de forma segura.",
        falseSentences: ["El indicador de flujo de aire mide la velocidad anemométrica en nudos calibrados.", "La válvula de retención de vacío evita la sobrepresión en la carcasa de instrumentos."],
        falseSentencesSpanish: ["El indicador de flujo de aire mide la velocidad anemométrica en nudos calibrados.", "La válvula de retención de vacío evita la sobrepresión en la carcasa de instrumentos."]
      },
      {
        id: 88,
        targetWord: "shimmy damper",
        correctSentence: "The hydraulic shimmy damper attenuates nose wheel high-frequency oscillation during landing roll.",
        spanish: "El amortiguador de bamboleo hidráulico atenúa la oscilación de alta frecuencia de la rueda de morro al aterrizar.",
        falseSentences: ["El relé de corriente continua conmuta la barra de encendido de emergencia.", "El medidor de compresión estática evalúa el sellado de los aros de pistón."],
        falseSentencesSpanish: ["El relé de corriente continua conmuta la barra de encendido de emergencia.", "El medidor de compresión estática evalúa el sellado de los aros de pistón."]
      },
      {
        id: 89,
        targetWord: "uplock box",
        correctSentence: "Rig the mechanical gear uplock hook box to ensure positive gear retention when retracted.",
        spanish: "Ajuste la caja de gancho de bloqueo de tren arriba para asegurar retención positiva cuando esté retraído.",
        falseSentences: ["Inspeccione los cables de mando de gases por hilos rotos en poleas de reenvío.", "Verifique el patrón de pulverización de los inyectores de agua-metanol."],
        falseSentencesSpanish: ["Inspeccione los cables de mando de gases por hilos rotos en poleas de reenvío.", "Verifique el patrón de pulverización de los inyectores de agua-metanol."]
      },
      {
        id: 90,
        targetWord: "downlock pin",
        correctSentence: "Insert safety ground downlock pins into all gear struts before starting hangar maintenance.",
        spanish: "Inserte los pasadores de seguridad de tren abajo en todos los montantes antes de iniciar mantenimiento en hangar.",
        falseSentences: ["Alinee las marcas de montaje de la cubierta de rueda con el vástago de la válvula.", "Compruebe el nivel de electrólito en las baterías de plomo-ácido de a bordo."],
        falseSentencesSpanish: ["Alinee las marcas de montaje de la cubierta de rueda con el vástago de la válvula.", "Compruebe el nivel de electrólito en las baterías de plomo-ácido de a bordo."]
      },
      {
        id: 91,
        targetWord: "tiller wheel",
        correctSentence: "The cockpit nose wheel steering tiller provides up to seventy-eight degrees of turning authority.",
        spanish: "El volante directriz de rueda de morro en cabina provee hasta setenta y ocho grados de autoridad de giro.",
        falseSentences: ["El sensor de humo ionizante vigila la atmósfera del compartimento de aviónica.", "La válvula bypass permite el paso de aceite frío cuando el filtro está colmatado."],
        falseSentencesSpanish: ["El sensor de humo ionizante vigila la atmósfera del compartimento de aviónica.", "La válvula bypass permite el paso de aceite frío cuando el filtro está colmatado."]
      },
      {
        id: 92,
        targetWord: "centering cam",
        correctSentence: "Internal centering cams align the nose landing gear forward before entering the gear wheel well.",
        spanish: "Levas de centrado internas alinean el tren de morro hacia adelante antes de entrar en el alojamiento de rueda.",
        falseSentences: ["El sensor piezoeléctrico detecta detonación irregular en cámaras de combustión.", "El rectificador síncrono regula la potencia eléctrica suministrada al inversor."],
        falseSentencesSpanish: ["El sensor piezoeléctrico detecta detonación irregular en cámaras de combustión.", "El rectificador síncrono regula la potencia eléctrica suministrada al inversor."]
      },
      {
        id: 93,
        targetWord: "brake wear pin",
        correctSentence: "Renew the brake assembly if the wear indicator pin becomes flush with the brake housing.",
        spanish: "Renueve el conjunto de freno si el pasador indicador de desgaste queda al ras con la carcasa del freno.",
        falseSentences: ["Compruebe la calibración del horizonte artificial en la plataforma vibratoria.", "Verifique el espesor del revestimiento en el borde de ataque del estabilizador."],
        falseSentencesSpanish: ["Compruebe la calibración del horizonte artificial en la plataforma vibratoria.", "Verifique el espesor del revestimiento en el borde de ataque del estabilizador."]
      },
      {
        id: 94,
        targetWord: "wheel tie bolt",
        correctSentence: "Torque aircraft wheel halves tie bolts in circular cross pattern using calibrated wrenches.",
        spanish: "Apriete los pernos de unión de mitades de rueda en patrón cruzado circular con llaves dinamométricas calibradas.",
        falseSentences: ["Inspeccione las escobillas de carbón del alternador de arranque por desgaste límite.", "Compruebe la libertad de giro de la bomba centrífuga de inyección de combustible."],
        falseSentencesSpanish: ["Inspeccione las escobillas de carbón del alternador de arranque por desgaste límite.", "Compruebe la libertad de giro de la bomba centrífuga de inyección de combustible."]
      },
      {
        id: 95,
        targetWord: "ground sense switch",
        correctSentence: "The air-ground proximity sensor switches aircraft systems from flight to ground mode on touchdown.",
        spanish: "El sensor de proximidad aire-tierra conmuta sistemas de avión de modo vuelo a modo tierra al tocar la pista.",
        falseSentences: ["El tubo venturi genera succión para accionar giróscopos en cabina de mandos.", "El solenoide de precalentamiento dosifica combustible en arranques fríos."],
        falseSentencesSpanish: ["El tubo venturi genera succión para accionar giróscopos en cabina de mandos.", "El solenoide de precalentamiento dosifica combustible en arranques fríos."]
      },
      {
        id: 96,
        targetWord: "emergency extension",
        correctSentence: "Pulling the emergency gear extension lanyard releases mechanical uplocks via gravity drop.",
        spanish: "Tirar del cable de extensión de tren de emergencia libera los bloqueos mecánicos superiores por caída por gravedad.",
        falseSentences: ["El sensor barométrico corrige la lectura del computador de datos de aire.", "El manómetro de aceite registra caídas bruscas causadas por fugas de manguera."],
        falseSentencesSpanish: ["El sensor barométrico corrige la lectura del computador de datos de aire.", "El manómetro de aceite registra caídas bruscas causadas por fugas de manguera."]
      },
      {
        id: 97,
        targetWord: "brake temperature",
        correctSentence: "Monitor brake temperature monitoring system indicators to observe thermal cooling interval requirements.",
        spanish: "Monitoree indicadores del sistema de temperatura de frenos para observar requisitos de intervalo de enfriamiento.",
        falseSentences: ["Revise los sellos de fuelle de goma de los actuadores de flaps contra roturas.", "Ajuste el tope de ralentí alto en la unidad hidromecánica de control de motor."],
        falseSentencesSpanish: ["Revise los sellos de fuelle de goma de los actuadores de flaps contra roturas.", "Ajuste el tope de ralentí alto en la unidad hidromecánica de control de motor."]
      },
      {
        id: 98,
        targetWord: "tire bead",
        correctSentence: "Inspect the tire bead seating area on wheel rim flange for corrosion and thermal damage.",
        spanish: "Inspeccione el área de asiento del talón del neumático en la pestaña de llanta por corrosión y daño térmico.",
        falseSentences: ["Compruebe el sincronismo de paso de palas de hélice en régimen de bandera.", "Ajuste el sensor óptico de posición de la compuerta de carga delantera."],
        falseSentencesSpanish: ["Compruebe el sincronismo de paso de palas de hélice en régimen de bandera.", "Ajuste el sensor óptico de posición de la compuerta de carga delantera."]
      },
      {
        id: 99,
        targetWord: "swivel joint",
        correctSentence: "Check hydraulic brake line swivel joints on landing gear struts for high pressure seepage.",
        spanish: "Verifique juntas giratorias de líneas de frenos hidráulicos en montantes del tren por filtraciones de alta presión.",
        falseSentences: ["Pruebe el aislamiento galvánico entre antenas de radar y estructura metálica.", "Limpie el colector de residuos del sistema de inodoro con detergente bactericida."],
        falseSentencesSpanish: ["Pruebe el aislamiento galvánico entre antenas de radar y estructura metálica.", "Limpie el colector de residuos del sistema de inodoro con detergente bactericida."]
      },
      {
        id: 100,
        targetWord: "creeper mark",
        correctSentence: "Check tire slip creeper marks alignment between tire sidewall and wheel flange.",
        spanish: "Compruebe la alineación de marcas de deslizamiento entre el flanco del neumático y la pestaña de la rueda.",
        falseSentences: ["Mida el descentramiento radial de la brida del cigüeñal con palpador centesimal.", "Inspeccione los rodamientos de agujas de la articulación de cabeceo."],
        falseSentencesSpanish: ["Mida el descentramiento radial de la brida del cigüeñal con palpador centesimal.", "Inspeccione los rodamientos de agujas de la articulación de cabeceo."]
      }
    ]
  },
  {
    playId: 6,
    title: "PLAY 6",
    rangeText: "ORACIONES 101 - 120",
    description: "Sistemas Hidráulicos de Potencia (ATA 29)",
    questions: [
      {
        id: 101,
        targetWord: "engine driven pump",
        correctSentence: "The engine driven pump supplies three thousand psi fluid pressure to primary flight controls.",
        spanish: "La bomba accionada por motor suministra tres mil psi de presión de fluido a controles primarios de vuelo.",
        falseSentences: ["El carburador dosifica la proporción exacta de aire y gasolina en admisión.", "El indicador de viraje utiliza giroscopio neumático accionado por depresión."],
        falseSentencesSpanish: ["El carburador dosifica la proporción exacta de aire y gasolina en admisión.", "El indicador de viraje utiliza giroscopio neumático accionado por depresión."]
      },
      {
        id: 102,
        targetWord: "electric pump",
        correctSentence: "The auxiliary alternating current electric motor pump pressurizes the system for ground checks.",
        spanish: "La electrobomba de motor de corriente alterna auxiliar presuriza el sistema para pruebas de mantenimiento en tierra.",
        falseSentences: ["La palanca de gases transmite esfuerzo mecánico mediante varillaje rígido.", "El indicador de cabeceo muestra el ángulo de inclinación respecto al horizonte visual."],
        falseSentencesSpanish: ["La palanca de gases transmite esfuerzo mecánico mediante varillaje rígido.", "El indicador de cabeceo muestra el ángulo de inclinación respecto al horizonte visual."]
      },
      {
        id: 103,
        targetWord: "hydraulic reservoir",
        correctSentence: "Pressurize the hydraulic fluid reservoir with engine bleed air to prevent pump cavitation.",
        spanish: "Presurice el depósito de fluido hidráulico con aire sangrado de motor para evitar cavitación en bombas.",
        falseSentences: ["Ajuste la aguja dosificadora de baja velocidad del carburador flotante.", "Desmonte las bujías de ignición para verificar separación de electrodos con galgas."],
        falseSentencesSpanish: ["Ajuste la aguja dosificadora de baja velocidad del carburador flotante.", "Desmonte las bujías de ignición para verificar separación de electrodos con galgas."]
      },
      {
        id: 104,
        targetWord: "ram air turbine",
        correctSentence: "Deploying the ram air turbine provides emergency hydraulic pressure during dual engine flameout.",
        spanish: "Desplegar la turbina de aire de impacto proporciona presión hidráulica de emergencia en apagado de ambos motores.",
        falseSentences: ["El amortiguador torsional reduce picos de par en el eje de la hélice motriz.", "El compensador dinámico equilibra fuerzas centrífugas en las palas del rotor."],
        falseSentencesSpanish: ["El amortiguador torsional reduce picos de par en el eje de la hélice motriz.", "El compensador dinámico equilibra fuerzas centrífugas en las palas del rotor."]
      },
      {
        id: 105,
        targetWord: "power transfer unit",
        correctSentence: "The power transfer unit transfers mechanical power between hydraulic systems without fluid mixing.",
        spanish: "La unidad de transferencia de potencia transfiere energía mecánica entre sistemas hidráulicos sin mezclar fluidos.",
        falseSentences: ["El diafragma elástico regula el caudal de aire hacia la cabina presurizada.", "El transmisor de ángulo de ataque mide el flujo de aire incidente sobre el fuselaje."],
        falseSentencesSpanish: ["El diafragma elástico regula el caudal de aire hacia la cabina presurizada.", "El transmisor de ángulo de ataque mide el flujo de aire incidente sobre el fuselaje."]
      },
      {
        id: 106,
        targetWord: "hydraulic accumulator",
        correctSentence: "Check dry nitrogen gas precharge pressure inside the hydraulic piston accumulator with shut pressure.",
        spanish: "Compruebe la presión de precarga de gas nitrógeno seco dentro del acumulador hidráulico con presión hidráulica nula.",
        falseSentences: ["Inspeccione los dientes del piñón del motor de arranque por desgaste y mellas.", "Verifique la estanqueidad de las válvulas de admisión en frío con aire comprimido."],
        falseSentencesSpanish: ["Inspeccione los dientes del piñón del motor de arranque por desgaste y mellas.", "Verifique la estanqueidad de las válvulas de admisión en frío con aire comprimido."]
      },
      {
        id: 107,
        targetWord: "skydrol",
        correctSentence: "Wear protective gloves and chemical face shields when servicing phosphate ester Skydrol fluid.",
        spanish: "Use guantes protectores y pantallas faciales químicas al manipular fluido éster de fosfato tipo Skydrol.",
        falseSentences: ["Compruebe el estado de los amortiguadores de vibración de goma en la bancada.", "Ajuste el cable de accionamiento del estrangulador para arranque de invierno."],
        falseSentencesSpanish: ["Compruebe el estado de los amortiguadores de vibración de goma en la bancada.", "Ajuste el cable de accionamiento del estrangulador para arranque de invierno."]
      },
      {
        id: 108,
        targetWord: "case drain filter",
        correctSentence: "Remove and inspect the hydraulic pump case drain filter for bronze and steel shaving particles.",
        spanish: "Retire e inspeccione el filtro de drenaje de carcasa de la bomba hidráulica por virutas de bronce y acero.",
        falseSentences: ["Verifique el paso de los tornillos autorroscantes en las chapas de carenado.", "Calibre la tensión de la correa de transmisión del alternador con dinamómetro."],
        falseSentencesSpanish: ["Verifique el paso de los tornillos autorroscantes en las chapas de carenado.", "Calibre la tensión de la correa de transmisión del alternador con dinamómetro."]
      },
      {
        id: 109,
        targetWord: "shutoff valve",
        correctSentence: "The emergency fire shutoff valve isolates hydraulic fluid supply at the engine pylon firewall.",
        spanish: "La válvula de corte de incendio de emergencia aísla el suministro de fluido hidráulico en el mamparo del pilón.",
        falseSentences: ["El indicador de depresión marca el vacío generado por la bomba de succión.", "El tornillo de ajuste de ralentí fija las revoluciones mínimas del motor."],
        falseSentencesSpanish: ["El indicador de depresión marca el vacío generado por la bomba de succión.", "El tornillo de ajuste de ralentí fija las revoluciones mínimas del motor."]
      },
      {
        id: 110,
        targetWord: "priority valve",
        correctSentence: "The hydraulic priority valve ensures primary flight controls maintain pressure over heavy utility circuits.",
        spanish: "La válvula de prioridad hidráulica garantiza que los mandos primarios mantengan presión antes que circuitos secundarios.",
        falseSentences: ["El filtro de aire de admisión retiene arena y polvo antes de entrar al carburador.", "El manómetro de combustible avisa de fluctuaciones peligrosas de presión en línea."],
        falseSentencesSpanish: ["El filtro de aire de admisión retiene arena y polvo antes de entrar al carburador.", "El manómetro de combustible avisa de fluctuaciones peligrosas de presión en línea."]
      },
      {
        id: 111,
        targetWord: "hydraulic return line",
        correctSentence: "The hydraulic return line routes low-pressure spent fluid back to the main reservoir.",
        spanish: "La línea de retorno hidráulico conduce el fluido usado a baja presión de regreso al depósito principal.",
        falseSentences: ["La caja de resonancia acústica absorbe ruidos molestos en el conducto de escape.", "El sensor térmico de culata vigila la temperatura en el cilindro más crítico."],
        falseSentencesSpanish: ["La caja de resonancia acústica absorbe ruidos molestos en el conducto de escape.", "El sensor térmico de culata vigila la temperatura en el cilindro más crítico."]
      },
      {
        id: 112,
        targetWord: "filter bypass indicator",
        correctSentence: "Check hydraulic pressure filter differential indicator pop-out buttons during walkaround preflight.",
        spanish: "Verifique los botones emergentes indicadores de presión diferencial en filtros hidráulicos durante la inspección prevuelo.",
        falseSentences: ["Compruebe la alineación de las ruedas motrices respecto al eje de simetría.", "Inspeccione el cable de masa del tren de morro por hilos rotos o sueltos."],
        falseSentencesSpanish: ["Compruebe la alineación de las ruedas motrices respecto al eje de simetría.", "Inspeccione el cable de masa del tren de morro por hilos rotos o sueltos."]
      },
      {
        id: 113,
        targetWord: "check valve",
        correctSentence: "Hydraulic check valves permit unobstructed forward flow while preventing reverse fluid backflow entirely.",
        spanish: "Válvulas de retención hidráulicas permiten flujo hacia adelante sin obstrucción impidiendo el contraflujo totalmente.",
        falseSentences: ["El tubo pitot transmite la presión total captada en la trayectoria de vuelo.", "El flotador del depósito de cebado cierra el paso al completarse el llenado."],
        falseSentencesSpanish: ["El tubo pitot transmite la presión total captada en la trayectoria de vuelo.", "El flotador del depósito de cebado cierra el paso al completarse el llenado."]
      },
      {
        id: 114,
        targetWord: "relief valve",
        correctSentence: "The system main relief valve protects hydraulic plumbing from catastrophic overpressurization surges.",
        spanish: "La válvula de alivio principal del sistema protege tuberías hidráulicas contra picos de sobrepresión catastróficos.",
        falseSentences: ["El cono de la hélice mejora la penetración aerodinámica del buje delantero.", "El solenoide de arranque conecta el piñón bendix con la corona dentada."],
        falseSentencesSpanish: ["El cono de la hélice mejora la penetración aerodinámica del buje delantero.", "El solenoide de arranque conecta el piñón bendix con la corona dentada."]
      },
      {
        id: 115,
        targetWord: "selector valve",
        correctSentence: "The four-way three-position solenoid selector valve directs pressurized oil to actuator chambers.",
        spanish: "La válvula selectora solenoide de cuatro vías y tres posiciones dirige aceite presurizado a cámaras del actuador.",
        falseSentences: ["El conector de combustible de acople rápido sella automáticamente al desconectarse.", "El termostato de aceite desvía el flujo frío directamente sin pasar por el radiador."],
        falseSentencesSpanish: ["El conector de combustible de acople rápido sella automáticamente al desconectarse.", "El termostato de aceite desvía el flujo frío directamente sin pasar por el radiador."]
      },
      {
        id: 116,
        targetWord: "sampling port",
        correctSentence: "Collect clean fluid samples from hydraulic sampling ports for laboratory particle contamination analysis.",
        spanish: "Tome muestras de fluido limpias en los puertos de muestreo hidráulico para análisis de contaminación en laboratorio.",
        falseSentences: ["Verifique el apriete de las tuercas de los espárragos de sujeción de cilindro.", "Inspeccione los cables de puesta a masa del cono de cola contra cargas estáticas."],
        falseSentencesSpanish: ["Verifique el apriete de las tuercas de los espárragos de sujeción de cilindro.", "Inspeccione los cables de puesta a masa del cono de cola contra cargas estáticas."]
      },
      {
        id: 117,
        targetWord: "hydraulic fuse",
        correctSentence: "The hydraulic fuse closes automatically to isolate downstream lines if fluid flow exceeds limits.",
        spanish: "El fusible hidráulico se cierra automáticamente para aislar líneas aguas abajo si el caudal excede los límites.",
        falseSentences: ["El colector de admisión distribuye mezcla aire-combustible a todas las cámaras.", "El muelle calibrado del regulador de tensión mantiene el voltaje nominal."],
        falseSentencesSpanish: ["El colector de admisión distribuye mezcla aire-combustible a todas las cámaras.", "El muelle calibrado del regulador de tensión mantiene el voltaje nominal."]
      },
      {
        id: 118,
        targetWord: "quill shaft",
        correctSentence: "Inspect pump drive quill shafts for sheared shear sections designed to protect the gearbox.",
        spanish: "Inspeccione los ejes fusibles de la bomba por secciones de corte diseñadas para proteger la caja de engranajes.",
        falseSentences: ["Compruebe el paso de hélice en despegue con la palanca en tope de avance.", "Limpie el tamiz de entrada de la bomba de drenaje de condensados."],
        falseSentencesSpanish: ["Compruebe el paso de hélice en despegue con la palanca en tope de avance.", "Limpie el tamiz de entrada de la bomba de drenaje de condensados."]
      },
      {
        id: 119,
        targetWord: "sight glass",
        correctSentence: "The reservoir hydraulic sight glass shows fluid level in pressurized and depressurized configurations.",
        spanish: "La mirilla hidráulica del depósito muestra el nivel de fluido en configuraciones presurizada y despresurizada.",
        falseSentences: ["El acelerador de pie complementa la palanca de gases en rodajes largos.", "El compensador barométrico ajusta la riqueza de mezcla según altitud de vuelo."],
        falseSentencesSpanish: ["El acelerador de pie complementa la palanca de gases en rodajes largos.", "El compensador barométrico ajusta la riqueza de mezcla según altitud de vuelo."]
      },
      {
        id: 120,
        targetWord: "swivel fitting",
        correctSentence: "Inspect flexible hydraulic high pressure hose swivel fittings for leaks and angular chafing wear.",
        spanish: "Inspeccione racores giratorios de mangueras hidráulicas de alta presión por fugas y desgaste por rozamiento angular.",
        falseSentences: ["Verifique el desgaste de los contactos platinados dentro de la carcasa del magneto.", "Alinee la tobera de escape con el carenado para evitar turbulencias parásitas."],
        falseSentencesSpanish: ["Verifique el desgaste de los contactos platinados dentro de la carcasa del magneto.", "Alinee la tobera de escape con el carenado para evitar turbulencias parásitas."]
      }
    ]
  },
  {
    playId: 7,
    title: "PLAY 7",
    rangeText: "ORACIONES 121 - 140",
    description: "Motores a Reacción y Turbinas de Gas (ATA 71 - ATA 80)",
    questions: [
      {
        id: 121,
        targetWord: "fan blade",
        correctSentence: "Inspect titanium fan blade leading edges for foreign object damage, stone nicks and tears.",
        spanish: "Inspeccione bordes de ataque de álabes del ventilador de titanio por daños de objetos extraños, muescas y desgarros.",
        falseSentences: ["Limpie las bujías con disolvente dieléctrico para eliminar restos de plomo.", "Compruebe el juego entre balancín y vástago de válvula con galga de espesores."],
        falseSentencesSpanish: ["Limpie las bujías con disolvente dieléctrico para eliminar restos de plomo.", "Compruebe el juego entre balancín y vástago de válvula con galga de espesores."]
      },
      {
        id: 122,
        targetWord: "compressor stall",
        correctSentence: "A sudden disruption in airflow through high pressure stages can trigger severe compressor stall.",
        spanish: "Una interrupción repentina del flujo de aire en etapas de alta presión puede provocar una pérdida severa de compresor.",
        falseSentences: ["El flotador del depósito de refrigerante marca el nivel de llenado admisible.", "La correa trapezoidal acciona el compresor del sistema de aire acondicionado."],
        falseSentencesSpanish: ["El flotador del depósito de refrigerante marca el nivel de llenado admisible.", "La correa trapezoidal acciona el compresor del sistema de aire acondicionado."]
      },
      {
        id: 123,
        targetWord: "combustion liner",
        correctSentence: "Borescope inspect the annular combustion chamber liner for thermal hot spots and cracks.",
        spanish: "Inspeccione por boroscopia la camisa de cámara de combustión anular en busca de puntos calientes y grietas térmicas.",
        falseSentences: ["Verifique la calibración del manómetro de aceite con banco de peso muerto.", "Ajuste el varillaje de accionamiento del calentador de carburador en invierno."],
        falseSentencesSpanish: ["Verifique la calibración del manómetro de aceite con banco de peso muerto.", "Ajuste el varillaje de accionamiento del calentador de carburador en invierno."]
      },
      {
        id: 124,
        targetWord: "exhaust gas temperature",
        correctSentence: "Monitor exhaust gas temperature thermocouples to prevent exceeding turbine operational limits.",
        spanish: "Monitoree termocuplas de temperatura de gases de escape para evitar sobrepasar límites operativos de la turbina.",
        falseSentences: ["Compruebe la estanqueidad de las juntas de escape con solución jabonosa no corrosiva.", "Ajuste la precarga de los rodamientos de rueda con dinamómetro angular."],
        falseSentencesSpanish: ["Compruebe la estanqueidad de las juntas de escape con solución jabonosa no corrosiva.", "Ajuste la precarga de los rodamientos de rueda con dinamómetro angular."]
      },
      {
        id: 125,
        targetWord: "thrust reverser",
        correctSentence: "Hydraulic actuators deploy thrust reverser blocker doors to direct exhaust gases forward on rollout.",
        spanish: "Actuadores hidráulicos despliegan compuertas bloqueadoras del inversor de empuje para dirigir gases hacia adelante.",
        falseSentences: ["El termostato de agua abre el paso hacia el radiador al calentarse el motor.", "El mando de mezcla regula la relación estequiométrica en aviones de émbolo."],
        falseSentencesSpanish: ["El termostato de agua abre el paso hacia el radiador al calentarse el motor.", "El mando de mezcla regula la relación estequiométrica en aviones de émbolo."]
      },
      {
        id: 126,
        targetWord: "fadec",
        correctSentence: "The dual redundant full authority digital engine control computer regulates fuel metering continuously.",
        spanish: "La computadora FADEC redundante doble de control de motor de plena autoridad regula la dosificación de combustible.",
        falseSentences: ["El compensador de alerones mantiene el avión nivelado en vuelos de travesía.", "El interruptor de encendido conmuta magnetos a posición de prueba previa al vuelo."],
        falseSentencesSpanish: ["El compensador de alerones mantiene el avión nivelado en vuelos de travesía.", "El interruptor de encendido conmuta magnetos a posición de prueba previa al vuelo."]
      },
      {
        id: 127,
        targetWord: "starter valve",
        correctSentence: "The pneumatic starter valve routes auxiliary bleed air to spin the air turbine starter.",
        spanish: "La válvula neumática de arranque dirige aire sangrado auxiliar para hacer girar el arrancador de turbina de aire.",
        falseSentences: ["El flotador de carburador corta la entrada de gasolina al subir el nivel en la cuba.", "El filtro de decantación separa el agua contenida en el combustible de aviación."],
        falseSentencesSpanish: ["El flotador de carburador corta la entrada de gasolina al subir el nivel en la cuba.", "El filtro de decantación separa el agua contenida en el combustible de aviación."]
      },
      {
        id: 128,
        targetWord: "chip detector",
        correctSentence: "Inspect magnetic chip detectors in the oil return lines for ferrous metal shavings.",
        spanish: "Inspeccione detectores de virutas magnéticos en líneas de retorno de aceite en busca de partículas ferrosas.",
        falseSentences: ["Compruebe el equilibrio estático de las ruedas principales en el equilibrador dinámico.", "Ajuste la tensión de los cables de gobierno del timón con escala graduada."],
        falseSentencesSpanish: ["Compruebe el equilibrio estático de las ruedas principales en el equilibrador dinámico.", "Ajuste la tensión de los cables de gobierno del timón con escala graduada."]
      },
      {
        id: 129,
        targetWord: "variable stator vane",
        correctSentence: "Hydraulic fuel actuators position variable stator vanes to optimize stage compressor airflow efficiency.",
        spanish: "Actuadores de combustible hidráulicos posicionan álabes de estator variables para optimizar flujo del compresor.",
        falseSentences: ["El indicador de temperatura de culata utiliza termopar instalado en la bujía.", "La válvula de sobrepresión de gasolina drena el exceso hacia el tanque principal."],
        falseSentencesSpanish: ["El indicador de temperatura de culata utiliza termopar instalado en la bujía.", "La válvula de sobrepresión de gasolina drena el exceso hacia el tanque principal."]
      },
      {
        id: 130,
        targetWord: "oil scavenge pump",
        correctSentence: "Positive displacement gear pumps scavenge hot lubricated oil from engine bearing sumps.",
        spanish: "Bombas de engranajes de desplazamiento positivo recuperan aceite lubricado caliente de los sumideros de cojinetes.",
        falseSentences: ["El alternador genera corriente alterna trifásica que luego es rectificada en corriente continua.", "El amortiguador del acelerador impide movimientos bruscos de la palanca de gases."],
        falseSentencesSpanish: ["El alternador genera corriente alterna trifásica que luego es rectificada en corriente continua.", "El amortiguador del acelerador impide movimientos bruscos de la palanca de gases."]
      },
      {
        id: 131,
        targetWord: "labyrinth seal",
        correctSentence: "Pressurized air prevents oil leaks across turbine rotor shaft labyrinth seals into cavities.",
        spanish: "Aire presurizado evita fugas de aceite a través de sellos laberínticos del eje de turbina hacia cavidades.",
        falseSentences: ["El solenoide de inyección suplementaria dosifica combustible en arranques helados.", "El medidor de vacío informa sobre el funcionamiento de las bombas giroscópicas."],
        falseSentencesSpanish: ["El solenoide de inyección suplementaria dosifica combustible en arranques helados.", "El medidor de vacío informa sobre el funcionamiento de las bombas giroscópicas."]
      },
      {
        id: 132,
        targetWord: "fuel nozzle",
        correctSentence: "Inspect simplex and duplex fuel nozzles for carbon deposits and distorted spray patterns.",
        spanish: "Inspeccione inyectores de combustible simplex y duplex por carbonilla y conos de pulverización deformados.",
        falseSentences: ["El flotador de nivel activa el interruptor de advertencia de reserva de combustible.", "La válvula de retención de aire previene el colapso del conducto de ventilación."],
        falseSentencesSpanish: ["El flotador de nivel activa el interruptor de advertencia de reserva de combustible.", "La válvula de retención de aire previene el colapso del conducto de ventilación."]
      },
      {
        id: 133,
        targetWord: "active clearance control",
        correctSentence: "Turbine active clearance control manifolds spray fan air to shrink casing shroud rings.",
        spanish: "Múltiples de control de holgura activo de turbina rocían aire de fan para contraer anillos de la carcasa.",
        falseSentences: ["El compensador de altitud enriquece la mezcla durante descensos continuados.", "El disyuntor térmico rearmable desconecta el circuito al subir la intensidad."],
        falseSentencesSpanish: ["El compensador de altitud enriquece la mezcla durante descensos continuados.", "El disyuntor térmico rearmable desconecta el circuito al subir la intensidad."]
      },
      {
        id: 134,
        targetWord: "engine mount",
        correctSentence: "Inspect forward engine vibration mounts for elastomeric rubber deterioration and loose bolts.",
        spanish: "Inspeccione soportes de vibración delanteros del motor por deterioro de caucho elastomérico y pernos flojos.",
        falseSentences: ["Compruebe la resistencia del sensor de picado mediante polímetro digital.", "Ajuste la tuerca de fricción del mando de gases para fijar posición en crucero."],
        falseSentencesSpanish: ["Compruebe la resistencia del sensor de picado mediante polímetro digital.", "Ajuste la tuerca de fricción del mando de gases para fijar posición en crucero."]
      },
      {
        id: 135,
        targetWord: "diffuser",
        correctSentence: "The diffuser section converts high velocity compressor discharge air into high static pressure.",
        spanish: "La sección difusora convierte aire de descarga del compresor de alta velocidad en alta presión estática.",
        falseSentences: ["El radiador de aceite frontal refrigera el lubricante mediante corriente de impacto.", "El depósito de compensación recoge el refrigerante dilatado por calor del motor."],
        falseSentencesSpanish: ["El radiador de aceite frontal refrigera el lubricante mediante corriente de impacto.", "El depósito de compensación recoge el refrigerante dilatado por calor del motor."]
      },
      {
        id: 136,
        targetWord: "igniter plug",
        correctSentence: "High energy igniter plugs produce powerful electrical sparks to ignite fuel-air atomized mixture.",
        spanish: "Bujías de encendido de alta energía producen chispas eléctricas potentes para inflamar la mezcla atomizada.",
        falseSentences: ["El sensor de temperatura de aire exterior corrige cálculos del calculador de datos.", "La válvula de respiradero del cárter evacua sobrepresiones de vapor de aceite."],
        falseSentencesSpanish: ["El sensor de temperatura de aire exterior corrige cálculos del calculador de datos.", "La válvula de respiradero del cárter evacua sobrepresiones de vapor de aceite."]
      },
      {
        id: 137,
        targetWord: "spool",
        correctSentence: "The high pressure spool operates at higher rotational speeds than the low pressure spool.",
        spanish: "El carrete de alta presión opera a velocidades de rotación más altas que el carrete de baja presión.",
        falseSentences: ["El interruptor de corte de combustible corta el paso al tirar de la palanca en emergencia.", "La bomba de alimentación auxiliar suministra cebado para el arranque de motores."],
        falseSentencesSpanish: ["El interruptor de corte de combustible corta el paso al tirar de la palanca en emergencia.", "La bomba de alimentación auxiliar suministra cebado para el arranque de motores."]
      },
      {
        id: 138,
        targetWord: "acoustic liner",
        correctSentence: "The nacelle inlet cowl features honeycomb acoustic liners to attenuate engine noise emissions.",
        spanish: "El carenado de entrada de la barquilla incorpora paneles acústicos de panal para atenuar ruido de motores.",
        falseSentences: ["El tensor mecánico absorbe holguras en la cadena de distribución del árbol de levas.", "El conector estanco evita cortocircuitos en instalaciones eléctricas exteriores."],
        falseSentencesSpanish: ["El tensor mecánico absorbe holguras en la cadena de distribución del árbol de levas.", "El conector estanco evita cortocircuitos en instalaciones eléctricas exteriores."]
      },
      {
        id: 139,
        targetWord: "boroscope port",
        correctSentence: "Unscrew threaded borescope port plugs on compressor casings using appropriate hex drivers.",
        spanish: "Desenrosque los tapones de puertos de boroscopia en cárteres de compresor usando llaves hexagonales adecuadas.",
        falseSentences: ["Compruebe la tensión de cierre de los cierres rápidos del carenado del motor.", "Inspeccione los cables de alta tensión por grietas en el aislante de silicona."],
        falseSentencesSpanish: ["Compruebe la tensión de cierre de los cierres rápidos del carenado del motor.", "Inspeccione los cables de alta tensión por grietas en el aislante de silicona."]
      },
      {
        id: 140,
        targetWord: "accessory gearbox",
        correctSentence: "The radial drive shaft transfers rotational core shaft torque to the engine accessory gearbox.",
        spanish: "El eje de transmisión radial transfiere par de rotación del núcleo a la caja de engranajes de accesorios.",
        falseSentences: ["El indicador de presión de combustible mide la presión a la salida del filtro fino.", "El tapón magnético del cárter atrapa impurezas metálicas desprendidas por fricción."],
        falseSentencesSpanish: ["El indicador de presión de combustible mide la presión a la salida del filtro fino.", "El tapón magnético del cárter atrapa impurezas metálicas desprendidas por fricción."]
      }
    ]
  },
  {
    playId: 8,
    title: "PLAY 8",
    rangeText: "ORACIONES 141 - 160",
    description: "Sistemas de Aviónica, Navegación y Comunicaciones (ATA 34 & ATA 23)",
    questions: [
      {
        id: 141,
        targetWord: "pitot tube",
        correctSentence: "Inspect pitot tube heater resistance to ensure clear dynamic pressure sensing in icing.",
        spanish: "Inspeccione la resistencia del calefactor del tubo pitot para asegurar captación de presión dinámica en hielo.",
        falseSentences: ["Compruebe el nivel de lubricante en el cárter inferior del motor bóxer.", "Ajuste el ángulo de ataque de las palas de la hélice con medidor angular."],
        falseSentencesSpanish: ["Compruebe el nivel de lubricante en el cárter inferior del motor bóxer.", "Ajuste el ángulo de ataque de las palas de la hélice con medidor angular."]
      },
      {
        id: 142,
        targetWord: "static port",
        correctSentence: "Keep static ports completely clean and flush with fuselage skin without paint buildup.",
        spanish: "Mantenga las tomas estáticas completamente limpias y al ras con la piel del fuselaje sin acumulación de pintura.",
        falseSentences: ["Revise los sellos de fuelle de goma de los actuadores de flaps contra roturas.", "Alinee la bomba de inyección de combustible con las marcas de reglaje del cigüeñal."],
        falseSentencesSpanish: ["Revise los sellos de fuelle de goma de los actuadores de flaps contra roturas.", "Alinee la bomba de inyección de combustible con las marcas de reglaje del cigüeñal."]
      },
      {
        id: 143,
        targetWord: "inertial reference unit",
        correctSentence: "The inertial reference unit aligns gyroscopic ring lasers to establish aircraft navigation coordinates.",
        spanish: "La unidad de referencia inercial alinea láseres giroscópicos de anillo para fijar coordenadas de navegación.",
        falseSentences: ["El carburador dosifica la proporción exacta de aire y gasolina en admisión.", "El muelle de retorno devuelve el pedal a su tope neutro al soltar la fuerza."],
        falseSentencesSpanish: ["El carburador dosifica la proporción exacta de aire y gasolina en admisión.", "El muelle de retorno devuelve el pedal a su tope neutro al soltar la fuerza."]
      },
      {
        id: 144,
        targetWord: "weather radar",
        correctSentence: "Tilt the weather radar antenna down to scan for severe precipitation cells along track.",
        spanish: "Incline la antena de radar meteorológico hacia abajo para escanear células de precipitación severa en ruta.",
        falseSentences: ["Verifique la tensión del cable de compensador de profundidad con tensiómetro.", "Compruebe la compresión de los cilindros mediante manómetro diferencial homologado."],
        falseSentencesSpanish: ["Verifique la tensión del cable de compensador de profundidad con tensiómetro.", "Compruebe la compresión de los cilindros mediante manómetro diferencial homologado."]
      },
      {
        id: 145,
        targetWord: "transponder",
        correctSentence: "The Mode S transponder replies with altitude and identity code when interrogated by ground radar.",
        spanish: "El transpondedor Modo S responde con altitud y código de identificación al ser interrogado por radar terrestre.",
        falseSentences: ["Limpie los contactos del distribuidor de encendido con trapo seco que no deje hilachas.", "Sustituya las mangueras de goma de refrigerante cada dos años de servicio activo."],
        falseSentencesSpanish: ["Limpie los contactos del distribuidor de encendido con trapo seco que no deje hilachas.", "Sustituya las mangueras de goma de refrigerante cada dos años de servicio activo."]
      },
      {
        id: 146,
        targetWord: "glide slope",
        correctSentence: "The glide slope receiver antenna detects ultra high frequency beams for precision approach descent.",
        spanish: "La antena receptora de senda de planeo detecta haces UHF para descenso de aproximación de precisión.",
        falseSentences: ["El tapón de llenado de aceite incorpora una varilla medidora con marcas de nivel.", "El interruptor térmico apaga el ventilador al descender la temperatura límite."],
        falseSentencesSpanish: ["El tapón de llenado de aceite incorpora una varilla medidora con marcas de nivel.", "El interruptor térmico apaga el ventilador al descender la temperatura límite."]
      },
      {
        id: 147,
        targetWord: "localizer",
        correctSentence: "The localizer receiver displays horizontal runway alignment guidance on the primary flight display.",
        spanish: "El receptor de localizador muestra guía de alineación horizontal de pista en la pantalla de vuelo principal.",
        falseSentences: ["El amortiguador oleoneumático absorbe el impacto de aterrizaje mediante aceite y gas.", "El tensor de correa mantiene la fuerza adecuada sobre la polea del alternador."],
        falseSentencesSpanish: ["El amortiguador oleoneumático absorbe el impacto de aterrizaje mediante aceite y gas.", "El tensor de correa mantiene la fuerza adecuada sobre la polea del alternador."]
      },
      {
        id: 148,
        targetWord: "flight data recorder",
        correctSentence: "Underwater locator beacons on the flight data recorder emit ultrasonic pings upon immersion.",
        spanish: "Balizas de localización submarina en el registrador de datos de vuelo emiten pulsos ultrasónicos al sumergirse.",
        falseSentences: ["El termostato de refrigeración bloquea el flujo hacia el radiador en motores fríos.", "La bomba de combustible eléctrica de respaldo se activa durante despegues y aterrizajes."],
        falseSentencesSpanish: ["El termostato de refrigeración bloquea el flujo hacia el radiador en motores fríos.", "La bomba de combustible eléctrica de respaldo se activa durante despegues y aterrizajes."]
      },
      {
        id: 149,
        targetWord: "cockpit voice recorder",
        correctSentence: "Test cockpit voice recorder microphones and bulk erase function before maintenance test flights.",
        spanish: "Pruebe micrófonos del registrador de voz de cabina y función de borrado total antes de vuelos de prueba.",
        falseSentences: ["Inspeccione los dientes de la corona del volante de inercia por muescas de arranque.", "Ajuste el tope de ralentí en el carburador para evitar paradas indeseadas."],
        falseSentencesSpanish: ["Inspeccione los dientes de la corona del volante de inercia por muescas de arranque.", "Ajuste el tope de ralentí en el carburador para evitar paradas indeseadas."]
      },
      {
        id: 150,
        targetWord: "radio altimeter",
        correctSentence: "Radio altimeters measure true absolute height above terrain using downward microwave transceiver beams.",
        spanish: "Radioaltímetros miden altura absoluta real sobre el terreno mediante haces transceptores de microondas dirigidos hacia abajo.",
        falseSentences: ["La válvula de purga de aire drena condensados acumulados en el calderín neumático.", "El manómetro de presión de sobrealimentación mide la presión en el colector de admisión."],
        falseSentencesSpanish: ["La válvula de purga de aire drena condensados acumulados en el calderín neumático.", "El manómetro de presión de sobrealimentación mide la presión en el colector de admisión."]
      },
      {
        id: 151,
        targetWord: "tcás",
        correctSentence: "Traffic alert and collision avoidance computers interrogate nearby aircraft transponders to issue advisories.",
        spanish: "Computadores de alerta de tráfico y evasión anticolisión interrogan transpondedores cercanos para emitir avisos.",
        falseSentences: ["El filtro de decantación separa partículas de óxido antes de que lleguen al motor.", "El sensor de posición del acelerador informa a la unidad de inyección electrónica."],
        falseSentencesSpanish: ["El filtro de decantación separa partículas de óxido antes de que lleguen al motor.", "El sensor de posición del acelerador informa a la unidad de inyección electrónica."]
      },
      {
        id: 152,
        targetWord: "vor",
        correctSentence: "The very high frequency omnidirectional range receiver calculates bearing radial from selected ground station.",
        spanish: "El receptor de radiofaro omnidireccional VHF calcula la marcación radial desde la estación terrestre seleccionada.",
        falseSentences: ["El tornillo de purga del bombín de freno permite evacuar aire retenido en circuito.", "La junta homocinética absorbe desalineaciones en el árbol de transmisión rígido."],
        falseSentencesSpanish: ["El tornillo de purga del bombín de freno permite evacuar aire retenido en circuito.", "La junta homocinética absorbe desalineaciones en el árbol de transmisión rígido."]
      },
      {
        id: 153,
        targetWord: "dme",
        correctSentence: "Distance measuring equipment transceivers calculate slant range distance in nautical miles to stations.",
        spanish: "Transceptores de equipos telemétricos DME calculan distancia oblicua en millas náuticas hacia estaciones.",
        falseSentences: ["El deflector de aire caliente dirige el flujo hacia el descongelador de parabrisas.", "El sensor inductivo cuenta los dientes del volante para determinar régimen de giro."],
        falseSentencesSpanish: ["El deflector de aire caliente dirige el flujo hacia el descongelador de parabrisas.", "El sensor inductivo cuenta los dientes del volante para determinar régimen de giro."]
      },
      {
        id: 154,
        targetWord: "adf",
        correctSentence: "The automatic direction finder receiver tracks low-frequency non-directional beacons across maritime paths.",
        spanish: "El receptor radiogoniómetro automático rastrea radiofaros no direccionales de baja frecuencia en rutas marítimas.",
        falseSentences: ["La válvula de retención del servofreno mantiene depresión tras parar el motor.", "El ventilador de refrigeración centrífugo aspira aire fresco a través de las aletas."],
        falseSentencesSpanish: ["La válvula de retención del servofreno mantiene depresión tras parar el motor.", "El ventilador de refrigeración centrífugo aspira aire fresco a través de las aletas."]
      },
      {
        id: 155,
        targetWord: "vhf antenna",
        correctSentence: "Check sealant beads around VHF communication blade antenna bases against water moisture intrusion.",
        spanish: "Revise cordones de sellador alrededor de bases de antenas de pala VHF contra intrusión de humedad y agua.",
        falseSentences: ["El interruptor de corte por inercia corta el encendido al detectar deceleración brusca.", "La palanca del estrangulador enriquece la mezcla cerrando parcialmente el paso de aire."],
        falseSentencesSpanish: ["El interruptor de corte por inercia corta el encendido al detectar deceleración brusca.", "La palanca del estrangulador enriquece la mezcla cerrando parcialmente el paso de aire."]
      },
      {
        id: 156,
        targetWord: "emergency locator transmitter",
        correctSentence: "Verify emergency locator transmitter battery expiry date printed clearly on the transmitter casing.",
        spanish: "Verifique la fecha de caducidad de la batería del transmisor localizador de emergencia impresa en su carcasa.",
        falseSentences: ["Compruebe la tensión del muelle de retroceso de la válvula de admisión con dinamómetro.", "Ajuste el sincronizador del acelerador en carburadores dobles mediante vacuómetro."],
        falseSentencesSpanish: ["Compruebe la tensión del muelle de retroceso de la válvula de admisión con dinamómetro.", "Ajuste el sincronizador del acelerador en carburadores dobles mediante vacuómetro."]
      },
      {
        id: 157,
        targetWord: "angle of attack sensor",
        correctSentence: "Inspect aerodynamic angle of attack vane rotation for freedom and heater element continuity.",
        spanish: "Inspeccione rotación de veleta de sensor de ángulo de ataque por libertad y continuidad del calefactor.",
        falseSentences: ["El regulador de presión de rampa mantiene constante la inyección en conducto común.", "El sensor de temperatura de culata alerta al piloto ante recalentamientos peligrosos."],
        falseSentencesSpanish: ["El regulador de presión de rampa mantiene constante la inyección en conducto común.", "El sensor de temperatura de culata alerta al piloto ante recalentamientos peligrosos."]
      },
      {
        id: 158,
        targetWord: "flight management computer",
        correctSentence: "Upload current navigation database cycles into the flight management computer via data loader.",
        spanish: "Cargue ciclos actuales de base de datos de navegación en el computador de gestión de vuelo vía cargador.",
        falseSentences: ["La bomba de barrido extrae aceite de la caja de engranajes del motor.", "El presostato de aceite enciende la lámpara de alerta al descender la lubricación."],
        falseSentencesSpanish: ["La bomba de barrido extrae aceite de la caja de engranajes del motor.", "El presostato de aceite enciende la lámpara de alerta al descender la lubricación."]
      },
      {
        id: 159,
        targetWord: "air data computer",
        correctSentence: "The air data computer computes calibrated airspeed, true airspeed, Mach number, and altitude.",
        spanish: "El computador de datos de aire calcula velocidad calibrada, velocidad verdadera, número Mach y altitud.",
        falseSentences: ["El enfriador de aceite disipa el calor excesivo generado por la fricción interna.", "El diafragma del distribuidor de avance al vacío adelanta el encendido en aceleración."],
        falseSentencesSpanish: ["El enfriador de aceite disipa el calor excesivo generado por la fricción interna.", "El diafragma del distribuidor de avance al vacío adelanta el encendido en aceleración."]
      },
      {
        id: 160,
        targetWord: "audio control panel",
        correctSentence: "Verify microphone selector switches and intercom volume potentiometers on flight deck panels.",
        spanish: "Verifique selectores de micrófono y potenciómetros de volumen del intercomunicador en paneles de cabina.",
        falseSentences: ["El sensor de detonación retrasa el encendido al captar vibraciones anormales.", "La válvula solenoide de purga del canister recircula vapores de hidrocarburos."],
        falseSentencesSpanish: ["El sensor de detonación retrasa el encendido al captar vibraciones anormales.", "La válvula solenoide de purga del canister recircula vapores de hidrocarburos."]
      }
    ]
  },
  {
    playId: 9,
    title: "PLAY 9",
    rangeText: "ORACIONES 161 - 180",
    description: "Inspección Estructural, NDT y Materiales Compuestos (ATA 51 - ATA 57)",
    questions: [
      {
        id: 161,
        targetWord: "eddy current",
        correctSentence: "Perform high frequency eddy current inspections around fastener holes to detect subsurface cracks.",
        spanish: "Realice inspecciones por corrientes parásitas de alta frecuencia alrededor de taladros para detectar grietas.",
        falseSentences: ["Compruebe el nivel de líquido de frenos en el depósito de reserva de plástico.", "Ajuste el ángulo de cierre de los platinos con galga de espesores calibrada."],
        falseSentencesSpanish: ["Compruebe el nivel de líquido de frenos en el depósito de reserva de plástico.", "Ajuste el ángulo de cierre de los platinos con galga de espesores calibrada."]
      },
      {
        id: 162,
        targetWord: "ultrasonic",
        correctSentence: "Ultrasonic phased array inspection evaluates composite skin delamination and honeycomb disbond defects.",
        spanish: "La inspección ultrasónica por ultrasonido evalúa defectos de despegamiento de panal y delaminación compuesta.",
        falseSentences: ["El termocontacto del radiador activa el electroventilador al alcanzar noventa grados.", "La válvula de retención de combustible evita el retorno del carburante al depósito."],
        falseSentencesSpanish: ["El termocontacto del radiador activa el electroventilador al alcanzar noventa grados.", "La válvula de retención de combustible evita el retorno del carburante al depósito."]
      },
      {
        id: 163,
        targetWord: "dye penetrant",
        correctSentence: "Apply liquid dye penetrant over cleaned welds and observe pink indication bleed-out through developer.",
        spanish: "Aplique líquido penetrante sobre soldaduras limpias y observe sangrado de indicaciones a través del revelador.",
        falseSentences: ["El manómetro de depresión mide el vacío creado por el carburador en ralentí.", "El tensor hidráulico mantiene constante la tensión de la cadena de distribución."],
        falseSentencesSpanish: ["El manómetro de depresión mide el vacío creado por el carburador en ralentí.", "El tensor hidráulico mantiene constante la tensión de la cadena de distribución."]
      },
      {
        id: 164,
        targetWord: "corrosion",
        correctSentence: "Exfoliation corrosion causes leafing and surface flaking along aluminum alloy grain boundary structures.",
        spanish: "La corrosión por exfoliación provoca descamación y agrietamiento laminar a lo largo de granos de aleación de aluminio.",
        falseSentences: ["El tapón de vaciado magnético retiene esquirlas desprendidas por fricción.", "El servofreno por vacío reduce el esfuerzo muscular requerido sobre el pedal."],
        falseSentencesSpanish: ["El tapón de vaciado magnético retiene esquirlas desprendidas por fricción.", "El servofreno por vacío reduce el esfuerzo muscular requerido sobre el pedal."]
      },
      {
        id: 165,
        targetWord: "composite patch",
        correctSentence: "Vacuum bag cured carbon fiber composite step patches restore structural integrity to damaged panels.",
        spanish: "Parches escalonados de fibra de carbono curados por bolsa de vacío restauran la integridad de paneles dañados.",
        falseSentences: ["El flotador del depósito de cebado cierra el paso al completarse el llenado.", "El termostato de cabina conmuta automáticamente entre aire frío y caliente."],
        falseSentencesSpanish: ["El flotador del depósito de cebado cierra el paso al completarse el llenado.", "El termostato de cabina conmuta automáticamente entre aire frío y caliente."]
      },
      {
        id: 166,
        targetWord: "honeycomb core",
        correctSentence: "Replace crushed Nomex honeycomb core before scarfing replacement fiberglass plies on fairings.",
        spanish: "Reemplace el núcleo de panal de abeja Nomex aplastado antes de biselar telas de fibra de vidrio en carenados.",
        falseSentences: ["El respiradero del depósito de expansión previene deformaciones por cambios térmicos.", "La polea amortiguadora del cigüeñal mitiga oscilaciones torsionales destructivas."],
        falseSentencesSpanish: ["El respiradero del depósito de expansión previene deformaciones por cambios térmicos.", "La polea amortiguadora del cigüeñal mitiga oscilaciones torsionales destructivas."]
      },
      {
        id: 167,
        targetWord: "solid rivet",
        correctSentence: "Drive solid countersunk aluminum rivets flush with outer skin using pneumatic riveting bucking bars.",
        spanish: "Remache remaches macizos avellanados al ras de la piel exterior usando barras de sufridera neumáticas.",
        falseSentences: ["El electroimán de avance de bomba varía el punto de inyección con la velocidad.", "El tapón presurizado del radiador eleva el punto de ebullición del líquido."],
        falseSentencesSpanish: ["El electroimán de avance de bomba varía el punto de inyección con la velocidad.", "El tapón presurizado del radiador eleva el punto de ebullición del líquido."]
      },
      {
        id: 168,
        targetWord: "blind fastener",
        correctSentence: "Inspect blind fastener stem protrusion height against structural repair manual go-no-go gauges.",
        spanish: "Inspeccione la altura de protuberancia del vástago del remache ciego contra calibres pasa-no-pasa del SRM.",
        falseSentences: ["El regulador centrífugo limita el régimen máximo de rotación del árbol motor.", "La válvula dosificadora de freno compensa la fuerza ejercida sobre el tren."],
        falseSentencesSpanish: ["El regulador centrífugo limita el régimen máximo de rotación del árbol motor.", "La válvula dosificadora de freno compensa la fuerza ejercida sobre el tren."]
      },
      {
        id: 169,
        targetWord: "hi-lok pin",
        correctSentence: "Torque shear off collar collars on Hi-Lok fastener pins until torque nut heads shear.",
        spanish: "Apriete los collares de rotura en pernos Hi-Lok hasta que las cabezas de apriete partan por torque nominal.",
        falseSentences: ["El sensor barométrico corrige la lectura del computador de datos de aire.", "El manómetro de aceite registra caídas bruscas causadas por fugas de manguera."],
        falseSentencesSpanish: ["El sensor barométrico corrige la lectura del computador de datos de aire.", "El manómetro de aceite registra caídas bruscas causadas por fugas de manguera."]
      },
      {
        id: 170,
        targetWord: "lightning strike",
        correctSentence: "Inspect skin lightning strike attachment points for burned metal pits and blown static wicks.",
        spanish: "Inspeccione puntos de fijación por impacto de rayo en el revestimiento en busca de picaduras y mechas quemadas.",
        falseSentences: ["El amortiguador torsional reduce picos de par en el eje de la hélice motriz.", "El compensador dinámico equilibra fuerzas centrífugas en las palas del rotor."],
        falseSentencesSpanish: ["El amortiguador torsional reduce picos de par en el eje de la hélice motriz.", "El compensador dinámico equilibra fuerzas centrífugas en las palas del rotor."]
      },
      {
        id: 171,
        targetWord: "spar cap",
        correctSentence: "The titanium lower wing spar cap bears massive tension loads during maximum high-G maneuvers.",
        spanish: "El cordón inferior de larguero alar de titanio soporta enormes cargas de tracción durante maniobras de altos G.",
        falseSentences: ["El interruptor de presión de aceite apaga el motor al caer el engrase crítico.", "El amortiguador de dirección suprime vibraciones transmitidas desde el asfalto."],
        falseSentencesSpanish: ["El interruptor de presión de aceite apaga el motor al caer el engrase crítico.", "El amortiguador de dirección suprime vibraciones transmitidas desde el asfalto."]
      },
      {
        id: 172,
        targetWord: "stringer",
        correctSentence: "Extruded aluminum fuselage stringers provide longitudinal stiffening against fuselage buckling.",
        spanish: "Larguerillos de fuselaje de aluminio extruido proveen refuerzo longitudinal contra el pandeo estructural.",
        falseSentences: ["La electroválvula de corte corta el suministro de queroseno a la cámara de combustión.", "El filtro de succión retiene partículas metálicas en el circuito cerrado."],
        falseSentencesSpanish: ["La electroválvula de corte corta el suministro de queroseno a la cámara de combustión.", "El filtro de succión retiene partículas metálicas en el circuito cerrado."]
      },
      {
        id: 173,
        targetWord: "pressure bulkhead",
        correctSentence: "The aft spherical pressure bulkhead withstands high continuous tension stress from cabin pressurization.",
        spanish: "El mamparo de presión esférico trasero resiste altos esfuerzos de tracción continuos por presurización.",
        falseSentences: ["El motor eléctrico del paso de hélice varía el ángulo de pala en crucero.", "El transmisor de posición de flaps envía señales potenciométricas a cabina."],
        falseSentencesSpanish: ["El motor eléctrico del paso de hélice varía el ángulo de pala en crucero.", "El transmisor de posición de flaps envía señales potenciométricas a cabina."]
      },
      {
        id: 174,
        targetWord: "dimpling",
        correctSentence: "Hot dimple thin aluminum alloy skins to accept flush countersunk rivets without cracking holes.",
        spanish: "Realice embutición en caliente en láminas de aleación finas para admitir remaches avellanados sin agrietar taladros.",
        falseSentences: ["El filtro micrónico retiene contaminantes suspendidos en el fluido sintético.", "El sensor de humo ionizante vigila la atmósfera del compartimento de aviónica."],
        falseSentencesSpanish: ["El filtro micrónico retiene contaminantes suspendidos en el fluido sintético.", "El sensor de humo ionizante vigila la atmósfera del compartimento de aviónica."]
      },
      {
        id: 175,
        targetWord: "faying surface",
        correctSentence: "Apply polysulfide sealing compound between faying surfaces to prevent galvanic crevice corrosion.",
        spanish: "Aplique sellador de polisulfuro entre superficies de contacto para prevenir corrosión galvánica por grietas.",
        falseSentences: ["La válvula de sobrepresión de gasolina drena el exceso hacia el tanque principal.", "El alternador genera corriente alterna trifásica que luego es rectificada en corriente continua."],
        falseSentencesSpanish: ["La válvula de sobrepresión de gasolina drena el exceso hacia el tanque principal.", "El alternador genera corriente alterna trifásica que luego es rectificada en corriente continua."]
      },
      {
        id: 176,
        targetWord: "doubler",
        correctSentence: "Install structural doubler plates over cracked skin areas following approved engineering data.",
        spanish: "Instale placas de refuerzo estructural sobre áreas de piel agrietadas según datos de ingeniería aprobados.",
        falseSentences: ["El conector estanco evita cortocircuitos en instalaciones eléctricas exteriores.", "El diafragma del distribuidor de avance al vacío adelanta el encendido en aceleración."],
        falseSentencesSpanish: ["El conector estanco evita cortocircuitos en instalaciones eléctricas exteriores.", "El diafragma del distribuidor de avance al vacío adelanta el encendido en aceleración."]
      },
      {
        id: 177,
        targetWord: "stop hole",
        correctSentence: "Drill stop holes at the extreme tips of cracks to relieve crack tip stress concentration.",
        spanish: "Taladre orificios de parada en los extremos de las grietas para aliviar la concentración de tensiones.",
        falseSentences: ["El flotador de carburador corta la entrada de gasolina al subir el nivel en la cuba.", "El filtro de decantación separa el agua contenida en el combustible de aviación."],
        falseSentencesSpanish: ["El flotador de carburador corta la entrada de gasolina al subir el nivel en la cuba.", "El filtro de decantación separa el agua contenida en el combustible de aviación."]
      },
      {
        id: 178,
        targetWord: "scarf repair",
        correctSentence: "Step-sand scarf repairs on carbon fiber composite laminates maintaining exact ply overlap taper ratios.",
        spanish: "Lije biseles escalonados en laminados compuestos de fibra de carbono manteniendo conos de solape exactos.",
        falseSentences: ["El ventilador de refrigeración centrífugo aspira aire fresco a través de las aletas.", "El interruptor de corte por inercia corta el encendido al detectar deceleración brusca."],
        falseSentencesSpanish: ["El ventilador de refrigeración centrífugo aspira aire fresco a través de las aletas.", "El interruptor de corte por inercia corta el encendido al detectar deceleración brusca."]
      },
      {
        id: 179,
        targetWord: "alodine",
        correctSentence: "Treat bare aluminum sheet metal chemically with chromate alodine conversion coating before priming.",
        spanish: "Trate chapas de aluminio al desnudo químicamente con capa de conversión de alodine cromado antes de imprimar.",
        falseSentences: ["La palanca del estrangulador enriquece la mezcla cerrando parcialmente el paso de aire.", "El sensor de detonación retrasa el encendido al captar vibraciones anormales."],
        falseSentencesSpanish: ["La palanca del estrangulador enriquece la mezcla cerrando parcialmente el paso de aire.", "El sensor de detonación retrasa el encendido al captar vibraciones anormales."]
      },
      {
        id: 180,
        targetWord: "magnetic particle",
        correctSentence: "Inspect steel landing gear trunnions using fluorescent magnetic particle NDT under ultraviolet light.",
        spanish: "Inspeccione muñones de tren de acero con ensayos no destructivos de partículas magnéticas fluorescentes bajo UV.",
        falseSentences: ["El diafragma elástico regula el caudal de aire hacia la cabina presurizada.", "El transmisor de ángulo de ataque mide el flujo de aire incidente sobre el fuselaje."],
        falseSentencesSpanish: ["El diafragma elástico regula el caudal de aire hacia la cabina presurizada.", "El transmisor de ángulo de ataque mide el flujo de aire incidente sobre el fuselaje."]
      }
    ]
  },
  {
    playId: 10,
    title: "PLAY 10",
    rangeText: "ORACIONES 181 - 200",
    description: "Sistemas Auxiliares, Puertas, APU y Procedimientos AMM (ATA 49, 52, 25, 12)",
    questions: [
      {
        id: 181,
        targetWord: "apu",
        correctSentence: "The auxiliary power unit provides electrical power and bleed air on ground without engines running.",
        spanish: "La unidad de potencia auxiliar proporciona energía eléctrica y aire sangrado en tierra sin motores encendidos.",
        falseSentences: ["El indicador de actitud muestra información de alabeo y cabeceo mediante giroscopio.", "La bomba de barrido extrae aceite de la caja de engranajes del motor."],
        falseSentencesSpanish: ["El indicador de actitud muestra información de alabeo y cabeceo mediante giroscopio.", "La bomba de barrido extrae aceite de la caja de engranajes del motor."]
      },
      {
        id: 182,
        targetWord: "door seal",
        correctSentence: "Pneumatic door seals inflate automatically with engine bleed air upon cabin door closure.",
        spanish: "Sellos neumáticos de compuertas se inflan automáticamente con aire sangrado al cerrar la compuerta de cabina.",
        falseSentences: ["El sensor de humo activa la bocina acústica en el compartimento de carga.", "El amortiguador de guiñada previene oscilaciones de balanceo holandés en crucero."],
        falseSentencesSpanish: ["El sensor de humo activa la bocina acústica en el compartimento de carga.", "El amortiguador de guiñada previene oscilaciones de balanceo holandés en crucero."]
      },
      {
        id: 183,
        targetWord: "escape slide",
        correctSentence: "Inspect compressed gas cylinder pressure on passenger emergency evacuation escape slides regularly.",
        spanish: "Inspeccione la presión del cilindro de gas comprimido en toboganes de evacuación de emergencia regularmente.",
        falseSentences: ["El variador de fase del alternador sincroniza la frecuencia con la red de a bordo.", "La válvula de retención de oxígeno previene el vaciado accidental de las botellas."],
        falseSentencesSpanish: ["El variador de fase del alternador sincroniza la frecuencia con la red de a bordo.", "La válvula de retención de oxígeno previene el vaciado accidental de las botellas."]
      },
      {
        id: 184,
        targetWord: "cockpit door",
        correctSentence: "Arm the armored cockpit security door electronic locking strike mechanism during preflight checks.",
        spanish: "Arme el mecanismo electrónico de bloqueo de la puerta acorazada de seguridad de cabina en pruebas prevuelo.",
        falseSentences: ["El acelerómetro de tres ejes mide fuerzas G experimentadas durante maniobras.", "La bomba manual de emergencia presuriza el circuito de extensión alternativa del tren."],
        falseSentencesSpanish: ["El acelerómetro de tres ejes mide fuerzas G experimentadas durante maniobras.", "La bomba manual de emergencia presuriza el circuito de extensión alternativa del tren."]
      },
      {
        id: 185,
        targetWord: "oxygen mask",
        correctSentence: "Inspect passenger chemical oxygen generator heat shields and quick-donning crew oxygen masks.",
        spanish: "Inspeccione escudos térmicos de generadores químicos de oxígeno y máscaras de colocación rápida de tripulación.",
        falseSentences: ["El conector de paso hermético atraviesa el mamparo de presión sin fugas de aire.", "El manómetro del acumulador hidráulico indica la precarga de gas nitrógeno."],
        falseSentencesSpanish: ["El conector de paso hermético atraviesa el mamparo de presión sin fugas de aire.", "El manómetro del acumulador hidráulico indica la precarga de gas nitrógeno."]
      },
      {
        id: 186,
        targetWord: "potable water",
        correctSentence: "Purge and sanitize the aircraft potable water tank using approved sodium hypochlorite solutions.",
        spanish: "Purgue y desinfecte el depósito de agua potable de la aeronave usando soluciones de hipoclorito sódico aprobadas.",
        falseSentences: ["Girar el volante de compensador afloja la tensión en los resortes de centrado.", "Presionar el botón de prueba de lámparas enciende todos los avisadores de alerta."],
        falseSentencesSpanish: ["Girar el volante de compensador afloja la tensión en los resortes de centrado.", "Presionar el botón de prueba de lámparas enciende todos los avisadores de alerta."]
      },
      {
        id: 187,
        targetWord: "waste tank",
        correctSentence: "Inspect vacuum lavatory waste tank rinse valves and float level sensors for sanitary sealing.",
        spanish: "Inspeccione válvulas de enjuague del tanque de desechos del baño de vacío y sensores de nivel por sellado sanitario.",
        falseSentences: ["Palancas acodadas transmiten movimiento angular a las varillas de control de paso.", "Placas de desgaste de bronce protegen los montantes del tren de fricción severa."],
        falseSentencesSpanish: ["Palancas acodadas transmiten movimiento angular a las varillas de control de paso.", "Placas de desgaste de bronce protegen los montantes del tren de fricción severa."]
      },
      {
        id: 188,
        targetWord: "cargo door",
        correctSentence: "Verify cargo door locking cam visual indicator flags before releasing aircraft for dispatch.",
        spanish: "Verifique los banderines indicadores visuales de levas de bloqueo de compuertas de carga antes del despacho.",
        falseSentences: ["Desconecte los tubos flexibles de freno antes de desmontar el cilindro maestro.", "Lubrique la cadena de transmisión del timón de cabeceo con aerosol sintético."],
        falseSentencesSpanish: ["Desconecte los tubos flexibles de freno antes de desmontar el cilindro maestro.", "Lubrique la cadena de transmisión del timón de cabeceo con aerosol sintético."]
      },
      {
        id: 189,
        targetWord: "apu intake door",
        correctSentence: "The auxiliary power unit air intake door actuator modulates based on auxiliary engine RPM.",
        spanish: "El actuador de la compuerta de entrada de aire de la APU modula según las RPM del motor auxiliar.",
        falseSentences: ["El sensor de temperatura de gases de escape emplea termocuplas de cromel-alumel.", "El compensador aerodinámico de borde de fuga estabiliza el mando a alta velocidad."],
        falseSentencesSpanish: ["El sensor de temperatura de gases de escape emplea termocuplas de cromel-alumel.", "El compensador aerodinámico de borde de fuga estabiliza el mando a alta velocidad."]
      },
      {
        id: 190,
        targetWord: "apu clutch",
        correctSentence: "The one-way sprag clutch disengages the APU electric starter when rotational idle is attained.",
        spanish: "El embrague de cuñas unidireccional desacopla el arrancador eléctrico de la APU al alcanzarse el ralentí.",
        falseSentences: ["El mecanismo de retracción del tren pliega los montantes dentro del alojamiento alar.", "El amortiguador de masa atenúa vibraciones aeroelásticas en el timón vertical."],
        falseSentencesSpanish: ["El mecanismo de retracción del tren pliega los montantes dentro del alojamiento alar.", "El amortiguador de masa atenúa vibraciones aeroelásticas en el timón vertical."]
      },
      {
        id: 191,
        targetWord: "torque wrench",
        correctSentence: "Always set the micrometer torque wrench back to minimum graduation after completing tightening tasks.",
        spanish: "Ajuste siempre la llave dinamométrica micrométrica a la graduación mínima al completar tareas de apriete.",
        falseSentences: ["Revise la holgura entre la llanta y el disco de freno con una galga de espesores.", "Inspeccione la tobera de escape en busca de grietas por fatiga térmica."],
        falseSentencesSpanish: ["Revise la holgura entre la llanta y el disco de freno con una galga de espesores.", "Inspeccione la tobera de escape en busca de grietas por fatiga térmica."]
      },
      {
        id: 192,
        targetWord: "safety wire",
        correctSentence: "Twist stainless steel safety wire six to eight twists per inch when lockwiring critical bolts.",
        spanish: "Trence alambre de frenar de acero inoxidable de seis a ocho vueltas por pulgada al frenar pernos críticos.",
        falseSentences: ["El vástago del cilindro neumático extiende los flaps hacia la posición de despegue.", "El horizonte artificial muestra la referencia de vuelo con respecto al plano horizontal."],
        falseSentencesSpanish: ["El vástago del cilindro neumático extiende los flaps hacia la posición de despegue.", "El horizonte artificial muestra la referencia de vuelo con respecto al plano horizontal."]
      },
      {
        id: 193,
        targetWord: "jacking procedure",
        correctSentence: "Raise aircraft jacks evenly on designated fuselage and wing jacking pads inside the hangar.",
        spanish: "Eleve los gatos de aeronave uniformemente sobre los apoyos de gato designados en fuselaje y alas en hangar.",
        falseSentences: ["Alinee la bomba de inyección de combustible con las marcas de reglaje del cigüeñal.", "Mida el espesor de la capa de pintura sobre el fuselaje con medidor magnético."],
        falseSentencesSpanish: ["Alinee la bomba de inyección de combustible con las marcas de reglaje del cigüeñal.", "Mida el espesor de la capa de pintura sobre el fuselaje con medidor magnético."]
      },
      {
        id: 194,
        targetWord: "mooring",
        correctSentence: "Secure mooring tie-down cables to designated wing tie-down rings when high wind warnings exist.",
        spanish: "Asegure cables de amarre a las anillas designadas en las alas cuando existan alertas de viento fuerte.",
        falseSentences: ["Inspeccione el arnés del eyector de bengalas para descartar daños mecánicos.", "Compruebe el nivel de fluido de amortiguación en el compensador de guiñada."],
        falseSentencesSpanish: ["Inspeccione el arnés del eyector de bengalas para descartar daños mecánicos.", "Compruebe el nivel de fluido de amortiguación en el compensador de guiñada."]
      },
      {
        id: 195,
        targetWord: "fuel grounding",
        correctSentence: "Attach the static grounding reel cable to building grounding grid before opening fuel caps.",
        spanish: "Fije el cable del carrete de masa a la red de tierra del edificio antes de abrir tapones de combustible.",
        falseSentences: ["El indicador de viraje y resbale asiste al piloto en virajes coordinados.", "El amortiguador de fricción previene vibraciones en los pedales de mando."],
        falseSentencesSpanish: ["El indicador de viraje y resbale asiste al piloto en virajes coordinados.", "El amortiguador de fricción previene vibraciones en los pedales de mando."]
      },
      {
        id: 196,
        targetWord: "tag out",
        correctSentence: "Apply red warning tags and collar locks to all open circuit breakers during maintenance tasks.",
        spanish: "Coloque etiquetas de advertencia rojas y collares de bloqueo en disyuntores abiertos durante mantenimiento.",
        falseSentences: ["Las aletas de refrigeración del cilindro disipan calor generado en la cámara de combustión.", "El filtro de partículas de alta eficiencia purifica el aire de la cabina de pasajeros."],
        falseSentencesSpanish: ["Las aletas de refrigeración del cilindro disipan calor generado en la cámara de combustión.", "El filtro de partículas de alta eficiencia purifica el aire de la cabina de pasajeros."]
      },
      {
        id: 197,
        targetWord: "corrosion preventative",
        correctSentence: "Spray water-displacing corrosion inhibiting compounds inside belly bilge and lower stringer cavities.",
        spanish: "Pulverice compuestos inhibidores de corrosión desplazadores de agua dentro de sentinas y larguerillos inferiores.",
        falseSentences: ["Verifique el juego longitudinal en los cojinetes de rodillos del eje propulsor.", "Alinee los alerones con el perfil alar en posición neutral mediante calas."],
        falseSentencesSpanish: ["Verifique el juego longitudinal en los cojinetes de rodillos del eje propulsor.", "Alinee los alerones con el perfil alar en posición neutral mediante calas."]
      },
      {
        id: 198,
        targetWord: "nitrogen servicing",
        correctSentence: "Use approved high-pressure nitrogen servicing carts equipped with dual stage reduction regulators.",
        spanish: "Utilice carritos de servicio de nitrógeno de alta presión equipados con reguladores de doble etapa.",
        falseSentences: ["Compruebe el sellado del parabrisas delantero contra penetración de agua de lluvia.", "Verifique la tensión de los resortes de retorno del acelerador manual."],
        falseSentencesSpanish: ["Compruebe el sellado del parabrisas delantero contra penetración de agua de lluvia.", "Verifique la tensión de los resortes de retorno del acelerador manual."]
      },
      {
        id: 199,
        targetWord: "de-icing boots",
        correctSentence: "Check pneumatic de-icing boots for pneumatic pressure inflation cycles and ozone age checks.",
        spanish: "Compruebe botas de deshielo neumáticas por ciclos de inflado de presión y grietas por envejecimiento.",
        falseSentences: ["El tren de morro gira mediante un motor hidráulico controlado desde la cabina de vuelo.", "El alerón de compensación asiste al esfuerzo manual ejercido sobre la columna."],
        falseSentencesSpanish: ["El tren de morro gira mediante un motor hidráulico controlado desde la cabina de vuelo.", "El alerón de compensación asiste al esfuerzo manual ejercido sobre la columna."]
      },
      {
        id: 200,
        targetWord: "maintenance release",
        correctSentence: "Sign the aircraft maintenance technical logbook release to service certify flight airworthiness.",
        spanish: "Firme la liberación de servicio en la bitácora técnica de mantenimiento para certificar la aeronavegabilidad.",
        falseSentences: ["Inspeccione el disco de fricción de la rueda de proa por ranuras circunferenciales.", "Compruebe el balance aerodinámico del timón tras una reparación de chapa."],
        falseSentencesSpanish: ["Inspeccione el disco de fricción de la rueda de proa por ranuras circunferenciales.", "Compruebe el balance aerodinámico del timón tras una reparación de chapa."]
      }
    ]
  }
];

// US American English IPA Dictionary & Transcriber

const US_IPA_DICT: Record<string, string> = {
  // Common Aviation & General Vocabulary
  "WING": "/wɪŋ/",
  "FUSELAGE": "/ˈfjuːsəlɑːʒ/",
  "ENGINE": "/ˈɛndʒən/",
  "COCKPIT": "/ˈkɑːkpɪt/",
  "LANDING GEAR": "/ˈlændɪŋ ɡɪɹ/",
  "PROPELLER": "/pɹəˈpɛlɚ/",
  "ROTOR": "/ˈɹoʊtɚ/",
  "TAIL": "/teɪl/",
  "NOSE": "/noʊz/",
  "CABIN": "/ˈkæbɪn/",
  "ALTIMETER": "/ælˈtɪmətɚ/",
  "AIRSPEED INDICATOR": "/ˈɛɹspiːd ˈɪndəkeɪtɚ/",
  "FUEL GAUGE": "/ˈfjuːəl ɡeɪdʒ/",
  "TRANSPONDER": "/tɹænˈspɑːndɚ/",
  "RADIO": "/ˈɹeɪdioʊ/",
  "AUTOPILOT": "/ˈɔːtoʊpaɪlət/",
  "FLAP": "/flæp/",
  "SLAT": "/slæt/",
  "SPOILER": "/ˈspɔɪlɚ/",
  "AILERON": "/ˈeɪləɹɑːn/",
  "ELEVATOR": "/ˈɛləveɪtɚ/",
  "RUDDER": "/ˈɹʌdɚ/",
  "THRUST": "/θɹʌst/",
  "DRAG": "/dɹæɡ/",
  "LIFT": "/lɪft/",
  "WEIGHT": "/weɪt/",
  "PITCH": "/pɪtʃ/",
  "ROLL": "/ɹoʊl/",
  "YAW": "/jɔː/",
  "STALL": "/stɔːl/",
  "ACTUATE": "/ˈæktʃueɪt/",
  "RETRACT": "/ɹɪˈtɹækt/",
  "EXTEND": "/ɪkˈstɛnd/",
  "PRESSURIZE": "/ˈpɹɛʃəɹaɪz/",
  "DEPRESSURIZE": "/diːˈpɹɛʃəɹaɪz/",
  "LUBRICATE": "/ˈluːbɹəkeɪt/",
  "CALIBRATE": "/ˈkæləbɹeɪt/",
  "INSPECT": "/ɪnˈspɛkt/",
  "TEST": "/tɛst/",
  "REPAIR": "/ɹɪˈpɛɹ/",
  "OVERHAUL": "/ˈoʊvɚhɔːl/",
  "TORQUE": "/tɔːɹk/",
  "SAFETY": "/ˈseɪfti/",
  "ISOLATE": "/ˈaɪsəleɪt/",
  "DE-ENERGIZE": "/diːˈɛnɚdʒaɪz/",
  "ENERGIZE": "/ˈɛnɚdʒaɪz/",
  "BLEED": "/bliːd/",
  "DRAIN": "/dɹeɪn/",
  "FILL": "/fɪl/",
  "FLUSH": "/flʌʃ/",
  "SERVICE": "/ˈsɝːvəs/",
  "CHECK": "/tʃɛk/",
  "MONITOR": "/ˈmɑːnətɚ/",
  "VERIFY": "/ˈvɛɹəfaɪ/",
  "ADJUST": "/əˈdʒʌst/",
  "ALIGN": "/əˈlaɪn/",
  "REPLACE": "/ɹɪˈpleɪs/",
  "REMOVE": "/ɹɪˈmuːv/",
  "INSTALL": "/ɪnˈstɔːl/",
  "SECURE": "/səˈkjʊɹ/",
  "FASTEN": "/ˈfæsən/",
  "TIGHTEN": "/ˈtaɪtən/",
  "LOOSEN": "/ˈluːsən/",
  "DISCONNECT": "/ˌdɪskəˈnɛkt/",
  "CONNECT": "/kəˈnɛkt/",
  "ATTACH": "/əˈtætʃ/",
  "DETACH": "/dɪˈtætʃ/",
  "MOUNT": "/maʊnt/",
  "DISMOUNT": "/dɪsˈmaʊnt/",
  "ASSEMBLE": "/əˈsɛmbəl/",
  "DISASSEMBLE": "/ˌdɪsəˈsɛmbəl/",
  "CLEAN": "/kliːn/",
  "WIPE": "/waɪp/",
  "DRY": "/dɹaɪ/",
  "LUBRICATION": "/ˌluːbɹəˈkeɪʃən/",
  "INSPECTION": "/ɪnˈspɛkʃən/",
  "MAINTENANCE": "/ˈmeɪntənəns/",
  "SYSTEM": "/ˈsɪstəm/",
  "CIRCUIT": "/ˈsɝːkət/",
  "VALVE": "/vælv/",
  "PUMP": "/pʌmp/",
  "MOTOR": "/ˈmoʊtɚ/",
  "GENERATOR": "/ˈdʒɛnəɹeɪtɚ/",
  "BATTERY": "/ˈbætəɹi/",
  "SWITCH": "/swɪtʃ/",
  "RELAY": "/ˈɹiːleɪ/",
  "FUSE": "/fjuːz/",
  "BREAKER": "/ˈbɹeɪkɚ/",
  "SENSOR": "/ˈsɛnsɚ/",
  "GAUGE": "/ɡeɪdʒ/",
  "METER": "/ˈmiːtɚ/",
  "FILTER": "/ˈfɪltɚ/",
  "SCREEN": "/skɹiːn/",
  "SEAL": "/siːl/",
  "GASKET": "/ˈɡæskət/",
  "BEARING": "/ˈbɛɹɪŋ/",
  "GEAR": "/ɡɪɹ/",
  "SHAFT": "/ʃæft/",
  "BELT": "/bɛlt/",
  "CHAIN": "/tʃeɪn/",
  "CABLE": "/ˈkeɪbəl/",
  "WIRE": "/waɪɚ/",
  "HARNESS": "/ˈhɑːɹnəs/",
  "PLUG": "/plʌɡ/",
  "SOCKET": "/ˈsɑːkət/",
  "CONNECTOR": "/kəˈnɛktɚ/",
  "TERMINAL": "/ˈtɝːmənəl/",
  "BUS": "/bʌs/",
  "LINE": "/laɪn/",
  "PIPE": "/paɪp/",
  "HOSE": "/hoʊz/",
  "TUBE": "/tuːb/",
  "DUCT": "/dʌkt/",
  "TANK": "/tæŋk/",
  "RESERVOIR": "/ˈɹɛzɚvwɑːɹ/",
  "SUMP": "/sʌmp/",
  "MANIFOLD": "/ˈmænəfoʊld/",
  "ACCUMULATOR": "/əˈkjuːmjəleɪtɚ/",
  "ACTUATOR": "/ˈæktʃueɪtɚ/",
  "CYLINDER": "/ˈsɪləndɚ/",
  "PISTON": "/ˈpɪstən/",
  "RAM": "/ɹæm/",
  "DAMPER": "/ˈdæmpɚ/",
  "SPRING": "/spɹɪŋ/",
  "LEVER": "/ˈlɛvɚ/",
  "LINK": "/lɪŋk/",
  "ROD": "/ɹɑːd/",
  "ARM": "/ɑːɹm/",
  "BRACKET": "/ˈbɹækət/",
  "HOUSING": "/ˈhaʊzɪŋ/",
  "CASE": "/keɪs/",
  "COVER": "/ˈkʌvɚ/",
  "PLATE": "/pleɪt/",
  "PANEL": "/ˈpænəl/",
  "DOOR": "/dɔːɹ/",
  "WINDOW": "/ˈwɪndoʊ/",
  "GLASS": "/ɡlæs/",
  "FRAME": "/fɹeɪm/",
  "STRUCTURE": "/ˈstɹʌktʃɚ/",
  "BEAM": "/biːm/",
  "SPAR": "/spɑːɹ/",
  "RIB": "/ɹɪb/",
  "SKIN": "/skɪn/",
  "STRUT": "/stɹʌt/",
  "BULKHEAD": "/ˈbʌlkhɛd/",
  "FAIRING": "/ˈfɛɹɪŋ/",
  "NACELLE": "/næˈsɛl/",
  "COWLING": "/ˈkaʊlɪŋ/",
  "FLUID": "/ˈfluːəd/",
  "OIL": "/ɔɪl/",
  "FUEL": "/ˈfjuːəl/",
  "HYDRAULIC": "/haɪˈdɹɔːlɪk/",
  "PNEUMATIC": "/nuːˈmætɪk/",
  "OXYGEN": "/ˈɑːksədʒən/",
  "NITROGEN": "/ˈnaɪtɹədʒən/",
  "AIR": "/ɛɹ/",
  "WATER": "/ˈwɔːtɚ/",
  "ICE": "/aɪs/",
  "HEAT": "/hiːt/",
  "FIRE": "/faɪɚ/",
  "SMOKE": "/smoʊk/",
  "GAS": "/ɡæs/",
  "PRESSURE": "/ˈpɹɛʃɚ/",
  "TEMPERATURE": "/ˈtɛmpɹətʃɚ/",
  "FLOW": "/floʊ/",
  "SPEED": "/spiːd/",
  "ALTITUDE": "/ˈæltətuːd/",
  "ATTITUDE": "/ˈætətuːd/",
  "HEADING": "/ˈhɛdɪŋ/",
  "TRACK": "/tɹæk/",
  "POSITION": "/pəˈzɪʃən/",
  "DISTANCE": "/ˈdɪstəns/",
  "TIME": "/taɪm/",
  "RATE": "/ɹeɪt/",
  "LEVEL": "/ˈlɛvəl/",
  "ANGLE": "/ˈæŋɡəl/",
  "POWER": "/ˈpaʊɚ/",
  "VOLTAGE": "/ˈvoʊltədʒ/",
  "CURRENT": "/ˈkɝːənt/",
  "FREQUENCY": "/ˈfɹiːkwənsi/",
  "LOAD": "/loʊd/",
  "TORQUE_VAL": "/tɔːɹk/",
  "RPM": "/ˌɑːɹ.piːˈɛm/",
  "KNOTS": "/nɑːts/",
  "FEET": "/fiːt/",
  "DEGREES": "/dɪˈɡɹiːz/",
  "PERCENT": "/pɚˈsɛnt/",
  "PSI": "/ˌpiː.ɛsˈaɪ/",
  "VOLTS": "/voʊlts/",
  "AMPS": "/æmps/",
  "HERTZ": "/hɝːts/",
  "GALLONS": "/ˈɡælənz/",
  "LITERS": "/ˈliːtɚz/",
  "POUNDS": "/paʊndz/",
  "KILOGRAMS": "/ˈkɪləɡɹæmz/",
  "NORMAL": "/ˈnɔːɹməl/",
  "ABNORMAL": "/æbˈnɔːɹməl/",
  "EMERGENCY": "/ɪˈmɝːdʒənsi/",
  "CAUTION": "/ˈkɔːʃən/",
  "WARNING": "/ˈwɔːɹnɪŋ/",
  "ADVISORY": "/ædˈvaɪzəɹi/",
  "FAULT": "/fɔːlt/",
  "FAIL": "/feɪl/",
  "FAILURE": "/ˈfeɪljɚ/",
  "ERROR": "/ˈɛɹɚ/",
  "ALARM": "/əˈlɑːɹm/",
  "SIGNAL": "/ˈsɪɡnəl/",
  "LIGHT": "/laɪt/",
  "INDICATOR": "/ˈɪndəkeɪtɚ/",
  "DISPLAY": "/dɪˈspleɪ/",
  "SCREEN_DISP": "/skɹiːn/",
  "MESSAGE": "/ˈmɛsədʒ/",
  "STATUS": "/ˈstætəs/",
  "MODE": "/moʊd/",
  "STATE": "/steɪt/",
  "OFF": "/ɔːf/",
  "ON": "/ɑːn/",
  "OPEN": "/ˈoʊpən/",
  "CLOSE": "/kloʊz/",
  "CLOSED": "/kloʊzd/",
  "HIGH": "/haɪ/",
  "LOW": "/loʊ/",
  "FULL": "/fʊl/",
  "EMPTY": "/ˈɛmpti/",
  "HOT": "/hɑːt/",
  "COLD": "/koʊld/",
  "FAST": "/fæst/",
  "SLOW": "/sloʊ/",
  "UP": "/ʌp/",
  "DOWN": "/daʊn/",
  "LEFT": "/lɛft/",
  "RIGHT": "/ɹaɪt/",
  "FORWARD": "/ˈfɔːɹwɚd/",
  "AFT": "/æft/",
  "INBOARD": "/ˈɪnbɔːɹd/",
  "OUTBOARD": "/ˈaʊtbɔːɹd/",
  "UPPER": "/ˈʌpɚ/",
  "LOWER": "/ˈloʊɚ/",
  "INNER": "/ˈɪnɚ/",
  "OUTER": "/ˈaʊtɚ/",
  "MAIN": "/meɪn/",
  "AUXILIARY": "/ɔːɡˈzɪljəɹi/",
  "PRIMARY": "/ˈpɹaɪmɛɹi/",
  "SECONDARY": "/ˈsɛkənˌdɛɹi/",
  "STANDBY": "/ˈstændbaɪ/",
  "EMERGENCY_SYS": "/ɪˈmɝːdʒənsi/",
  "MANUAL": "/ˈmænjuəl/",
  "AUTOMATIC": "/ˌɔːtəˈmætɪk/",
  "DIRECT": "/dəˈɹɛkt/",
  "INDIRECT": "/ˌɪndəˈɹɛkt/",
  "INTERNAL": "/ɪnˈtɝːnəl/",
  "EXTERNAL": "/ɪkˈstɝːnəl/",
};

// Simple rule-based IPA generator for terms not explicitly in dictionary
function convertWordToIPA(word: string): string {
  const clean = word.toUpperCase().trim();
  if (US_IPA_DICT[clean]) {
    return US_IPA_DICT[clean];
  }

  // Handle multi-word terms
  if (clean.includes(" ") || clean.includes("-")) {
    const parts = clean.split(/[\s-]+/);
    const ipaParts = parts.map(p => convertSingleWordToIPA(p));
    return `/${ipaParts.map(p => p.replace(/^\/|\/$/g, "")).join(" ")}/`;
  }

  return convertSingleWordToIPA(clean);
}

function convertSingleWordToIPA(w: string): string {
  if (US_IPA_DICT[w]) {
    return US_IPA_DICT[w];
  }

  // Fallback heuristic phonetic mapping for US English
  let str = w.toLowerCase();
  
  // Basic replacements for common English letter patterns to US IPA
  str = str
    .replace(/tion/g, "ʃən")
    .replace(/sion/g, "ʒən")
    .replace(/ture/g, "tʃɚ")
    .replace(/ing/g, "ɪŋ")
    .replace(/ight/g, "aɪt")
    .replace(/ous/g, "əs")
    .replace(/able/g, "əbəl")
    .replace(/ible/g, "əbəl")
    .replace(/ment/g, "mənt")
    .replace(/ness/g, "nəs")
    .replace(/less/g, "ləs")
    .replace(/ful/g, "fəl")
    .replace(/er$/g, "ɚ")
    .replace(/or$/g, "ɚ")
    .replace(/ar$/g, "ɚ")
    .replace(/th/g, "θ")
    .replace(/ch/g, "tʃ")
    .replace(/sh/g, "ʃ")
    .replace(/ph/g, "f")
    .replace(/wh/g, "w")
    .replace(/ck/g, "k")
    .replace(/qu/g, "kw")
    .replace(/ee/g, "iː")
    .replace(/ea/g, "iː")
    .replace(/oo/g, "uː")
    .replace(/ou/g, "aʊ")
    .replace(/ow/g, "oʊ")
    .replace(/ai/g, "eɪ")
    .replace(/ay/g, "eɪ")
    .replace(/oi/g, "ɔɪ")
    .replace(/oy/g, "ɔɪ")
    .replace(/all/g, "ɔːl")
    .replace(/c([eiy])/g, "s$1")
    .replace(/c/g, "k")
    .replace(/g([eiy])/g, "dʒ$1")
    .replace(/r/g, "ɹ")
    .replace(/y$/g, "i")
    .replace(/a/g, "æ")
    .replace(/e/g, "ɛ")
    .replace(/i/g, "ɪ")
    .replace(/o/g, "ɑː")
    .replace(/u/g, "ʌ");

  return `/${str}/`;
}

export function getUSIPA(word: string): string {
  if (!word) return "/.../";
  const clean = word.trim();
  if (US_IPA_DICT[clean.toUpperCase()]) {
    return US_IPA_DICT[clean.toUpperCase()];
  }

  // If multi-word, map each word
  const words = clean.split(/\s+/);
  if (words.length > 1) {
    const ipas = words.map(w => {
      const u = w.toUpperCase();
      if (US_IPA_DICT[u]) {
        return US_IPA_DICT[u].replace(/^\/|\/$/g, "");
      }
      return convertWordToIPA(w).replace(/^\/|\/$/g, "");
    });
    return `/${ipas.join(" ")}/`;
  }

  return convertWordToIPA(clean);
}

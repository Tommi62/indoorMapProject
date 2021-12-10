import React, { useEffect, useRef, useState } from "react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import data from "../Data/classrooms.json";
import Room from "./Room";

interface buttonStyles {
  2: string;
  5: string;
  6: string;
  7: string;
}

interface propTypes {
  update: paramObj;
  setModalOpen: Function;
  setModalContent: Function;
  setKeyWord: Function;
  marker: string;
  start: string;
  end: string;
  floor: keyof typeof data;
  availableRooms: string[];
  setButtonStyles: Function;
  buttonStyles: buttonStyles;
}

interface paramObj {
  startNode: string;
  endNode: string;
}

interface roomsArray {
  className: string;
  id: string;
  transform: any;
  d: any;
}

// Setting the logic for each point so the algorithm knows from which point can you go to which
let graph: any = {
  // Hallways

  //Floor 7
  K71: { K72: 1, D7581: 1, D7591: 1 },
  K72: { D7592: 1, K74: 1, K71: 1 },
  K73: { K74: 1, D7582: 1 },
  K74: { K73: 1, K72: 1, K75: 1 },
  K75: { K74: 1, K76: 1, R711: 1 },
  K76: { K75: 1, K77: 1, K710: 1 },
  K77: { K76: 1, K78: 1, K79: 1, K710: 1 },
  K78: { K77: 1, D7571: 1, D7511: 1 },
  K79: { D7501: 1, K711: 1, K710: 1, K77: 1 },
  K710: { K76: 1, K77: 1, K79: 1, K711: 1, K712: 1 },
  K711: { K79: 1, K710: 1, K715: 1 },
  K712: { K710: 1, K713: 1, R712: 1 },
  K713: { K712: 1, K714: 1 },
  K714: { K713: 1, K717: 1, H71: 1 },
  K715: { K711: 1, K717: 1, K716: 1, E7901: 1 },
  K716: { K715: 1, K718: 1, E7902: 1 },
  K717: { K714: 1, K715: 1 },
  K718: { K716: 1, K719: 1 },
  K719: { K718: 1, K720: 1, E7701: 1 },
  K720: { K719: 1, K721: 1, K722: 1 },
  K721: { K720: 1, K723: 1, K724: 1, E7621: 1 },
  K722: { K720: 1, K723: 1, E7702: 1 },
  K723: { K721: 1, K722: 1, K726: 1 },
  K724: { K721: 1, K725: 1, E7611: 1 },
  K725: { K724: 1, E7591: 1, E7511: 1 },
  K726: { K727: 1, K723: 1, V71: 1 },
  K727: { K726: 1, K728: 1, R73: 1 },
  K728: { K727: 1, E7512: 1 },

  // Floor 6
  K61: { K62: 1, K63: 1, E690: 1 },
  K62: { K61: 1, K616: 1 },
  K63: { K61: 1, K64: 1, K630: 1 },
  K64: { K63: 1, K65: 1, K630: 1 },
  K65: { K64: 1, K66: 1, K624: 1 },
  K66: { K65: 1, K67: 1, K624: 1, K627: 1 },
  K67: { K66: 1, K68: 1, K624: 1 },
  K68: { K67: 1, K69: 1, R611: 1 },
  K69: { K68: 1, K610: 1, K626: 1 },
  K610: { K69: 1, K631: 1, D6591: 1 },
  K611: { K612: 1, K613: 1, R622: 1 },
  K612: { K611: 1, K617: 1 /*R621: 1*/ },
  K613: { K611: 1, K614: 1, K619: 1 },
  K614: { K613: 1, K621: 1, K615: 1 },
  K615: { K614: 1, K620: 1, K616: 1 },
  K616: { K615: 1, K62: 1, E6701: 1 },
  K617: { K618: 1, K612: 1 },
  K618: { K617: 1, K619: 1, E6591: 1 },
  K619: { K618: 1, K613: 1 },
  K620: { K621: 1, K615: 1, E6621: 1 },
  K621: { K620: 1, K622: 1, K614: 1 },
  K622: { K621: 1, E6592: 1, E6611: 1 },
  //K623: {},
  K624: { K65: 1, K66: 1, K67: 1, K625: 1, D6521: 1 },
  K625: { K624: 1, D6571: 1 },
  K626: { D6581: 1, V61: 1, K69: 1 },
  K627: { K66: 1, K628: 1, R612: 1 },
  K628: { K627: 1, K629: 1 },
  K629: { K628: 1, K630: 1, H61: 1 },
  K630: { K64: 1, K63: 1, K629: 1 },
  K631: { D6592: 1, D6582: 1 },

  // Floor 2
  K21: { K22: 1, U21: 1, K23: 1 },
  K22: { K21: 1, K23: 1, V21: 1 },
  K23: { K21: 1, K22: 1, K24: 1, K26: 1 },
  K24: { K23: 1, K25: 1, K28: 1 },
  K25: { R21: 1, K24: 1 },
  K26: { K23: 1, K27: 1, K29: 1 },
  K27: { K28: 1, K26: 1, K29: 1 },
  K28: { K24: 1, K27: 1, H21: 1 },
  K29: { K26: 1, K27: 1, K213: 1 },
  K210: { K212: 1, K211: 1, PUKKARI: 1 },
  K211: { K210: 1, K214: 1 },
  K212: { K213: 1, K221: 1, K210: 1 },
  K213: { K29: 1, K221: 1, K212: 1 },
  K214: { K211: 1, K215: 1, V23: 1 },
  K215: { K214: 1, K216: 1, R221: 1 },
  K216: { K215: 1, K217: 1 /*, R222: 1*/ },
  K217: { K218: 1, K216: 1, K220: 1 },
  K218: { K217: 1, K220: 1, K219: 1 },
  K219: { K218: 1, E2041: 1, V22: 1 },
  K220: { RUOKALA: 1, K218: 1, K217: 1 },
  K221: { K212: 1, K213: 1, E2042: 1 },

  // Floor 5
  K51: { K53: 1, K52: 1, K534: 1, E5902: 1 },
  K52: { K51: 1, E5901: 1, K515: 1 },
  K53: { K51: 1, K54: 1, K534: 1 },
  K54: { K53: 1, K55: 1, K522: 1 },
  K55: { K525: 1, K54: 1, K522: 1, K56: 1 },
  K56: { K57: 1, K522: 1, K55: 1 },
  K57: { R511: 1, K56: 1, K58: 1 },
  K58: { K57: 1, K59: 1, K524: 1 },
  K59: { D5691: 1, D5581: 1, K58: 1 },
  K510: { R522: 1, K511: 1, K512: 1 },
  K511: { /*R521: 1,*/ K516: 1, K510: 1 },
  K512: { K510: 1, V51: 1, K513: 1 },
  K513: { E5701: 1, K514: 1, K518: 1, K512: 1 },
  K514: { K515: 1, K513: 1, K518: 1 },
  K515: { K514: 1, E5702: 1, K52: 1 },
  K516: { E5511: 1, K511: 1 },
  K517: { K520: 1, E5512: 1, E5591: 1 },
  K518: { K513: 1, K514: 1, K519: 1 },
  K519: { K520: 1, E5621: 1, K518: 1 },
  K520: { E5611: 1, K519: 1, K517: 1 },
  K521: { D5571: 1, K523: 1 },
  K522: { K56: 1, K55: 1, D5501: 1, K523: 1, K54: 1 },
  K523: { K521: 1, D5502: 1, K522: 1 },
  K524: { K58: 1, V52: 1, D5582: 1 },
  K525: { K526: 1, R512: 1, K55: 1 },
  K526: { K527: 1, K525: 1, K533: 1 },
  K527: { K528: 1, C5921: 1, K526: 1 },
  K528: { K527: 1, K529: 1, K535: 1 },
  K529: { K528: 1, K530: 1, K536: 1 },
  K530: { K531: 1, K538: 1, K529: 1 },
  K531: { C5922: 1, K530: 1, K532: 1 },
  K532: { K531: 1, C5901: 1 },
  K533: { K526: 1, K534: 1, H51: 1 },
  K534: { K533: 1, K53: 1, K51: 1 },
  K535: { K528: 1, K536: 1, C5651: 1 },
  K536: { K529: 1, K535: 1, K537: 1 },
  K537: { C5652: 1, C5571: 1, K536: 1 },
  K538: { V53: 1, K539: 1, K530: 1 },
  K539: { K538: 1, K540: 1 },
  K540: { C5572: 1 },

  // classrooms
  // Floor 7
  D7591: { K71: 1 },
  D7592: { K72: 1 },
  D7581: { K71: 1 },
  D7582: { K73: 1 },
  D7571: { K78: 1 },
  D7511: { K78: 1 },
  D7501: { K79: 1 },
  E7901: { K715: 1 },
  E7902: { K716: 1 },
  E7701: { K719: 1 },
  E7621: { K721: 1 },
  E7702: { K722: 1 },
  E7611: { K724: 1 },
  E7591: { K725: 1 },
  E7511: { K725: 1 },
  E7512: { K728: 1 },
  // Floor 2
  E2041: { K219: 1 },
  E2042: { K221: 1 },
  // Floor 6
  D6582: { K631: 1 },
  D6581: { K626: 1 },
  D6592: { K631: 1 },
  D6591: { K610: 1 },
  D6571: { K625: 1 },
  D6521: { K624: 1 },
  E690: { K61: 1 },
  E6701: { K616: 1 },
  E6621: { K620: 1 },
  E6611: { K622: 1 },
  E6592: { K622: 1 },
  E6591: { K618: 1 },
  // Floor 5
  D5581: { K59: 1 },
  D5582: { K524: 1 },
  D5691: { K59: 1 },
  D5571: { K521: 1 },
  D5502: { K523: 1 },
  D5501: { K522: 1 },
  E5902: { K51: 1 },
  E5901: { K52: 1 },
  E5702: { K515: 1 },
  E5621: { K519: 1 },
  E5701: { K513: 1 },
  E5611: { K520: 1 },
  E5591: { K517: 1 },
  E5512: { K517: 1 },
  E5511: { K516: 1 },
  C5921: { K527: 1 },
  C5651: { K535: 1 },
  C5922: { K531: 1 },
  C5901: { K532: 1 },
  C5572: { K540: 1 },
  C5652: { K537: 1 },
  C5571: { K537: 1 },

  // Elevators
  // Floor 7
  H71: { K714: 1, H21: 1, H51: 1, H61: 1 },
  // Floor 2
  H21: { K28: 1, H71: 1, H51: 1, H61: 1 },
  // Floor 6
  H61: { K629: 1, H51: 1, H71: 1, H21: 1 },
  // Floor 5
  H51: { K533: 1, H21: 1, H61: 1, H71: 1 },

  // Toilets
  // Floor 7
  V71: { K726: 1 },
  // Floor 2
  V21: { K22: 1 },
  V22: { K219: 1 },
  V23: { K214: 1 },
  // Floor 6
  //TODO Missing few toilets
  V61: { K626: 1 },
  // Floor 5
  V51: { K512: 1 },
  V52: { K524: 1 },
  V53: { K538: 1 },

  // Stairs
  // Floor 7
  R711: { K75: 1, X71: 1 },
  R712: { K712: 1, X71: 1 },
  R73: { K727: 1, R221: 1 },
  X71: { R711: 1, R712: 1, R21: 1, X61: 1, X51: 1 },

  // Floor 2
  R21: { K25: 1, X71: 1, X51: 1, X61: 1 },
  R221: { K215: 1, R522: 1, R622: 1, R73: 1 },
  // R222: {K216: 1},

  // Floor 6
  //R621: {K612: 1},
  R622: { K611: 1, R221: 1 },
  R611: { K68: 1, X61: 1 },
  R612: { K627: 1, X61: 1 },
  X61: { R611: 1, R612: 1, X51: 1, R21: 1, X71: 1 },

  // Floor 5
  //R521: {K511: 1},
  R522: { K510: 1 },
  R511: { K57: 1, X51: 1 },
  R512: { K525: 1, X51: 1 },
  X51: { R511: 1, R512: 1, X61: 1, X71: 1, R21: 1 },

  // Uniques
  RUOKALA: { K220: 1 },
  U21: { K21: 1 },
  PUKKARI: { K210: 1 },
};

function RouteFinder({
  setModalOpen,
  setModalContent,
  setKeyWord,
  update,
  marker,
  start,
  end,
  floor,
  availableRooms,
  setButtonStyles,
  buttonStyles,
}: propTypes) {
  const classes7: any = useRef();
  const [seventhFloorRoomsArray, setSeventhFloorRoomsArray] = useState<
    roomsArray[]
  >([]);

  // Making refs to all the lines from svg so we can use them later to display and hide lines by their id
  // Floor 7
  const D7592K72: any = useRef();
  const K71K72: any = useRef();
  const D7591K71: any = useRef();
  const D7581K71: any = useRef();
  const K73K74: any = useRef();
  const D7582K73: any = useRef();
  const K72K74: any = useRef();
  const K74K75: any = useRef();
  const K75R711: any = useRef();
  const K75K76: any = useRef();
  const K76K77: any = useRef();
  const D7571K78: any = useRef();
  const D7511K78: any = useRef();
  const K78K77: any = useRef();
  const D7501K79: any = useRef();
  const K77K79: any = useRef();
  const K76K710: any = useRef();
  const K77K710: any = useRef();
  const K711K710: any = useRef();
  const K79K711: any = useRef();
  const K79K710: any = useRef();
  const K710K712: any = useRef();
  const K713K714: any = useRef();
  const K714H71: any = useRef();
  const K711K715: any = useRef();
  const K715E7901: any = useRef();
  const K715K716: any = useRef();
  const K716E7902: any = useRef();
  const K714K717: any = useRef();
  const K717K715: any = useRef();
  const K718K716: any = useRef();
  const K719K718: any = useRef();
  const E7701K719: any = useRef();
  const K719K720: any = useRef();
  const K720K721: any = useRef();
  const K721E7621: any = useRef();
  const K722E7702: any = useRef();
  const K720K722: any = useRef();
  const K721K723: any = useRef();
  const K722K723: any = useRef();
  const K721K724: any = useRef();
  const E7611K724: any = useRef();
  const K724K725: any = useRef();
  const K725E7591: any = useRef();
  const K725E7511: any = useRef();
  const K723K726: any = useRef();
  const K726V71: any = useRef();
  const K726K727: any = useRef();
  const K727K728: any = useRef();
  const K728E7512: any = useRef();
  const K712R712: any = useRef();
  const K712K713: any = useRef();
  const R73K727: any = useRef();
  const R711X71: any = useRef();
  const R712X71: any = useRef();
  // Floor 2
  const V21K22: any = useRef();
  const U21K21: any = useRef();
  const K21K22: any = useRef();
  const K21K23: any = useRef();
  const K24K25: any = useRef();
  const K23K24: any = useRef();
  const K25R21: any = useRef();
  const K23K26: any = useRef();
  const K27K28: any = useRef();
  const K26K27: any = useRef();
  const K28H21: any = useRef();
  const K24K28: any = useRef();
  const K26K29: any = useRef();
  const K210K211: any = useRef();
  const K212K210: any = useRef();
  const K213K212: any = useRef();
  const K29K213: any = useRef();
  const K211K214: any = useRef();
  const K215K216: any = useRef();
  const K214K215: any = useRef();
  const K217K218: any = useRef();
  const K216K217: any = useRef();
  const K218K219: any = useRef();
  const K219V22: any = useRef();
  const K219E2041: any = useRef();
  const K217K220: any = useRef();
  const K220RUOKALA: any = useRef();
  // const K216R222: any = useRef();
  const K215R221: any = useRef();
  const K214V23: any = useRef();
  const K210PUKKARI: any = useRef();
  const K212K221: any = useRef();
  const K213K221: any = useRef();
  const K221E2042: any = useRef();
  const K22K23: any = useRef();
  const K218K220: any = useRef();
  const K29K27: any = useRef();

  // Floor 6
  const K61K62: any = useRef();
  const K61K63: any = useRef();
  const K63K64: any = useRef();
  const K64K65: any = useRef();
  const K65K66: any = useRef();
  const K66K67: any = useRef();
  const K67K68: any = useRef();
  const K68K69: any = useRef();
  const K69K610: any = useRef();
  const K611K612: any = useRef();
  const K611K613: any = useRef();
  const K613K614: any = useRef();
  const K614K615: any = useRef();
  const K615K616: any = useRef();
  const K617K618: any = useRef();
  const K618E6591: any = useRef();
  const K612K617: any = useRef();
  // const R621K612: any = useRef();
  const R622K611: any = useRef();
  const K613K619: any = useRef();
  const K620K615: any = useRef();
  const K620K621: any = useRef();
  const K621K622: any = useRef();
  const K622E6592: any = useRef();
  const K614K621: any = useRef();
  const K620E6621: any = useRef();
  const K622E6611: any = useRef();
  const K616E6701: any = useRef();
  const K616K62: any = useRef();
  const K61E690: any = useRef();
  const K65K624: any = useRef();
  const K624K625: any = useRef();
  const K625D6571: any = useRef();
  const K624D6521: any = useRef();
  const R611K68: any = useRef();
  const K626K69: any = useRef();
  const K626D6581: any = useRef();
  const K626V61: any = useRef();
  const K610D6591: any = useRef();
  const K627K66: any = useRef();
  const K627K628: any = useRef();
  const K66K624: any = useRef();
  const K67K624: any = useRef();
  const K627R612: any = useRef();
  const K629H61: any = useRef();
  const K628K629: any = useRef();
  const K630K629: any = useRef();
  const K630K64: any = useRef();
  const K630K63: any = useRef();
  const K619K618: any = useRef();
  const K631K610: any = useRef();
  const K631D6582: any = useRef();
  const K631D6592: any = useRef();
  const R611X61: any = useRef();
  const R612X61: any = useRef();

  // Floor 5
  const K51K52: any = useRef();
  const K51K53: any = useRef();
  const K53K54: any = useRef();
  const K55K56: any = useRef();
  const K56K57: any = useRef();
  const K57K58: any = useRef();
  const K58K59: any = useRef();
  const K59D5581: any = useRef();
  const K510K511: any = useRef();
  const K510K512: any = useRef();
  const K512K513: any = useRef();
  const K513K514: any = useRef();
  const K514K515: any = useRef();
  const K516E5511: any = useRef();
  const K511K516: any = useRef();
  // const K511R521: any = useRef();
  const K510R522: any = useRef();
  const K512V51: any = useRef();
  const K513E5701: any = useRef();
  const K517E5591: any = useRef();
  const K517E5512: any = useRef();
  const K514K518: any = useRef();
  const K519K520: any = useRef();
  const K520K517: any = useRef();
  const K513K518: any = useRef();
  const K519E5621: any = useRef();
  const K520E5611: any = useRef();
  const K515E5702: any = useRef();
  const K52E5901: any = useRef();
  const K52K515: any = useRef();
  const K51E5902: any = useRef();
  const K521D5571: any = useRef();
  const K522K54: any = useRef();
  const K522K523: any = useRef();
  const K521K523: any = useRef();
  const K522D5501: any = useRef();
  const K523D5502: any = useRef();
  const K57R511: any = useRef();
  const K58K524: any = useRef();
  const K524D5582: any = useRef();
  const K524V52: any = useRef();
  const K59D5691: any = useRef();
  const K525K55: any = useRef();
  const K525K526: any = useRef();
  const K526K527: any = useRef();
  const K527K528: any = useRef();
  const K528K529: any = useRef();
  const K529K530: any = useRef();
  const K530K531: any = useRef();
  const K531K532: any = useRef();
  const K55K522: any = useRef();
  const K522K56: any = useRef();
  const K525R512: any = useRef();
  const K533H51: any = useRef();
  const K526K533: any = useRef();
  const K533K534: any = useRef();
  const K53K534: any = useRef();
  const K534K51: any = useRef();
  const K527C5921: any = useRef();
  const K528K535: any = useRef();
  const K535K536: any = useRef();
  const K536K537: any = useRef();
  const C5571K537: any = useRef();
  const K535C5651: any = useRef();
  const K537C5652: any = useRef();
  const K536K529: any = useRef();
  const K530K538: any = useRef();
  const K538K539: any = useRef();
  const K539K540: any = useRef();
  const K540C5572: any = useRef();
  const K538V53: any = useRef();
  const K532C5901: any = useRef();
  const K531C5922: any = useRef();
  const K55K54: any = useRef();
  const K519K518: any = useRef();
  const R511X51: any = useRef();
  const R512X51: any = useRef();

  // Between floors
  const R21X71: any = useRef();
  const H21H71: any = useRef();
  const R221R522: any = useRef();
  const R221R622: any = useRef();
  const X51X71: any = useRef();
  const X61X71: any = useRef();
  const R21X61: any = useRef();
  const R21X51: any = useRef();
  const X51X61: any = useRef();
  const R221R73: any = useRef();
  const R522R622: any = useRef();
  const R522R73: any = useRef();
  const R73R622: any = useRef();
  const H21H51: any = useRef();
  const H21H61: any = useRef();
  const H51H61: any = useRef();
  const H51H71: any = useRef();
  const H61H71: any = useRef();

  //Putting all lines to Object so we can iterate trough them and get lines by their id
  const lines: any = {
    // Floor 7
    D7592K72: D7592K72,
    K71K72: K71K72,
    D7591K71: D7591K71,
    D7581K71: D7581K71,
    K73K74: K73K74,
    D7582K73: D7582K73,
    K72K74: K72K74,
    K74K75: K74K75,
    K75R711: K75R711,
    K75K76: K75K76,
    K76K77: K76K77,
    D7571K78: D7571K78,
    D7511K78: D7511K78,
    K78K77: K78K77,
    D7501K79: D7501K79,
    K77K79: K77K79,
    K76K710: K76K710,
    K77K710: K77K710,
    K711K710: K711K710,
    K79K711: K79K711,
    K79K710: K79K710,
    K710K712: K710K712,
    K713K714: K713K714,
    K714H71: K714H71,
    K711K715: K711K715,
    K715E7901: K715E7901,
    K715K716: K715K716,
    K716E7902: K716E7902,
    K714K717: K714K717,
    K712K713: K712K713,
    K717K715: K717K715,
    K718K716: K718K716,
    K719K718: K719K718,
    E7701K719: E7701K719,
    K719K720: K719K720,
    K720K721: K720K721,
    K721E7621: K721E7621,
    K722E7702: K722E7702,
    K720K722: K720K722,
    K721K723: K721K723,
    K722K723: K722K723,
    K721K724: K721K724,
    E7611K724: E7611K724,
    K724K725: K724K725,
    K725E7591: K725E7591,
    K725E7511: K725E7511,
    K723K726: K723K726,
    K726V71: K726V71,
    K726K727: K726K727,
    K727K728: K727K728,
    K728E7512: K728E7512,
    K712R712: K712R712,
    R73K727: R73K727,
    R711X71: R711X71,
    R712X71: R712X71,

    // Floor 2
    V21K22: V21K22,
    U21K21: U21K21,
    K21K22: K21K22,
    K21K23: K21K23,
    K24K25: K24K25,
    K23K24: K23K24,
    K25R21: K25R21,
    K23K26: K23K26,
    K27K28: K27K28,
    K26K27: K26K27,
    K28H21: K28H21,
    K24K28: K24K28,
    K26K29: K26K29,
    K210K211: K210K211,
    K212K210: K212K210,
    K213K212: K213K212,
    K29K213: K29K213,
    K211K214: K211K214,
    K215K216: K215K216,
    K214K215: K214K215,
    K217K218: K217K218,
    K216K217: K216K217,
    K218K219: K218K219,
    K219V22: K219V22,
    K219E2041: K219E2041,
    K217K220: K217K220,
    K220RUOKALA: K220RUOKALA,
    // K216R222: K216R222,
    K215R221: K215R221,
    K214V23: K214V23,
    K210PUKKARI: K210PUKKARI,
    K212K221: K212K221,
    K213K221: K213K221,
    K221E2042: K221E2042,
    K22K23: K22K23,
    K218K220: K218K220,
    K29K27: K29K27,

    // Floor 6
    K61K62: K61K62,
    K61K63: K61K63,
    K63K64: K63K64,
    K64K65: K64K65,
    K65K66: K65K66,
    K66K67: K66K67,
    K67K68: K67K68,
    K68K69: K68K69,
    K69K610: K69K610,
    K611K612: K611K612,
    K611K613: K611K613,
    K613K614: K613K614,
    K614K615: K614K615,
    K615K616: K615K616,
    K617K618: K617K618,
    K618E6591: K618E6591,
    K612K617: K612K617,
    // R621K612: R621K612,
    R622K611: R622K611,
    K613K619: K613K619,
    K620K615: K620K615,
    K620K621: K620K621,
    K621K622: K621K622,
    K622E6592: K622E6592,
    K614K621: K614K621,
    K620E6621: K620E6621,
    K622E6611: K622E6611,
    K616E6701: K616E6701,
    K616K62: K616K62,
    K61E690: K61E690,
    K65K624: K65K624,
    K624K625: K624K625,
    K625D6571: K625D6571,
    K624D6521: K624D6521,
    R611K68: R611K68,
    K626K69: K626K69,
    K626D6581: K626D6581,
    K626V61: K626V61,
    K610D6591: K610D6591,
    K627K66: K627K66,
    K627K628: K627K628,
    K66K624: K66K624,
    K67K624: K67K624,
    K627R612: K627R612,
    K629H61: K629H61,
    K628K629: K628K629,
    K630K629: K630K629,
    K630K64: K630K64,
    K630K63: K630K63,
    K619K618: K619K618,
    K631K610: K631K610,
    K631D6582: K631D6582,
    K631D6592: K631D6592,
    R611X61: R611X61,
    R612X61: R612X61,

    // Floor 5
    K51K52: K51K52,
    K51K53: K51K53,
    K53K54: K53K54,
    K55K56: K55K56,
    K56K57: K56K57,
    K57K58: K57K58,
    K58K59: K58K59,
    K59D5581: K59D5581,
    K510K511: K510K511,
    K510K512: K510K512,
    K512K513: K512K513,
    K513K514: K513K514,
    K514K515: K514K515,
    K516E5511: K516E5511,
    K511K516: K511K516,
    // K511R521: K511R521,
    K510R522: K510R522,
    K512V51: K512V51,
    K513E5701: K513E5701,
    K517E5591: K517E5591,
    K517E5512: K517E5512,
    K514K518: K514K518,
    K519K520: K519K520,
    K520K517: K520K517,
    K513K518: K513K518,
    K519E5621: K519E5621,
    K520E5611: K520E5611,
    K515E5702: K515E5702,
    K52E5901: K52E5901,
    K52K515: K52K515,
    K51E5902: K51E5902,
    K521D5571: K521D5571,
    K522K54: K522K54,
    K522K523: K522K523,
    K521K523: K521K523,
    K522D5501: K522D5501,
    K523D5502: K523D5502,
    K57R511: K57R511,
    K58K524: K58K524,
    K524D5582: K524D5582,
    K524V52: K524V52,
    K59D5691: K59D5691,
    K525K55: K525K55,
    K525K526: K525K526,
    K526K527: K526K527,
    K527K528: K527K528,
    K528K529: K528K529,
    K529K530: K529K530,
    K530K531: K530K531,
    K531K532: K531K532,
    K55K522: K55K522,
    K522K56: K522K56,
    K525R512: K525R512,
    K533H51: K533H51,
    K526K533: K526K533,
    K533K534: K533K534,
    K53K534: K53K534,
    K534K51: K534K51,
    K527C5921: K527C5921,
    K528K535: K528K535,
    K535K536: K535K536,
    K536K537: K536K537,
    C5571K537: C5571K537,
    K535C5651: K535C5651,
    K537C5652: K537C5652,
    K536K529: K536K529,
    K538K539: K538K539,
    K539K540: K539K540,
    K540C5572: K540C5572,
    K538V53: K538V53,
    K532C5901: K532C5901,
    K531C5922: K531C5922,
    K55K54: K55K54,
    K519K518: K519K518,
    R511X51: R511X51,
    R512X51: R512X51,
    K530K538: K530K538,

    // Between floors
    R221R622: R221R622,
    R21X71: R21X71,
    H21H71: H21H71,
    R221R522: R221R522,
    X51X71: X51X71,
    X61X71: X61X71,
    R21X61: R21X61,
    R21X51: R21X51,
    X51X61: X51X61,
    R221R73: R221R73,
    R522R622: R522R622,
    R522R73: R522R73,
    R73R622: R73R622,
    H21H51: H21H51,
    H21H61: H21H61,
    H51H61: H51H61,
    H51H71: H51H71,
    H61H71: H61H71,
  };

  const [floor7Visibility, setFloor7Visibility] = useState("block");
  const [floor2Visibility, setFloor2Visibility] = useState("none");
  const [floor5Visibility, setFloor5Visibility] = useState("none");
  const [floor6Visibility, setFloor6Visibility] = useState("none");
  const [updateFloor, setUpdateFloor] = useState(Date.now());

  useEffect(() => {
    try {
      if (floor === "2") {
        console.log("FLOOR2");
        setFloor7Visibility("none");
        setFloor5Visibility("none");
        setFloor6Visibility("none");
        setFloor2Visibility("block");
      } else if (floor === "5") {
        console.log("FLOOR5");
        setFloor7Visibility("none");
        setFloor5Visibility("block");
        setFloor6Visibility("none");
        setFloor2Visibility("none");
      } else if (floor === "6") {
        console.log("FLOOR6");
        setFloor7Visibility("none");
        setFloor5Visibility("none");
        setFloor6Visibility("block");
        setFloor2Visibility("none");
      } else if (floor === "7") {
        console.log("FLOOR7");
        setFloor7Visibility("block");
        setFloor5Visibility("none");
        setFloor6Visibility("none");
        setFloor2Visibility("none");
      }
      console.log("selected floor " + floor);
    } catch (error: any) {
      console.log(error.message);
    }
  }, [floor]);

  useEffect(() => {
    try {
      console.log(
        "2: " +
        floor2Visibility +
        " 5: " +
        floor5Visibility +
        " 6: " +
        floor6Visibility +
        " 7: " +
        floor7Visibility
      );
    } catch (error: any) {
      console.log(error.message);
    }
  }, [floor2Visibility, floor5Visibility, floor6Visibility, floor7Visibility]);

  useEffect(() => {
    try {
      let roomDataArray = [];
      for (let i = 0; i < data[floor].length; i++) {
        if (
          !data[floor][i].name.startsWith("V") &&
          !data[floor][i].name.startsWith("S") &&
          !data[floor][i].name.startsWith("H")
        ) {
          const roomObject = {
            className: "cls-5",
            id: data[floor][i].name,
            transform: data[floor][i].transform,
            d: data[floor][i].d,
          };
          roomDataArray.push(roomObject);
        }
      }
      if (availableRooms.length !== 0) {
        for (let i = 0; i < availableRooms.length; i++) {
          for (let j = 0; j < roomDataArray.length; j++) {
            const correctedName = "KM" + roomDataArray[j].id;
            if (correctedName === availableRooms[i]) {
              roomDataArray[j].className = "cls-5-available";
              break;
            }
          }
        }
      }
      setSeventhFloorRoomsArray(roomDataArray);
    } catch (error: any) {
      console.log(error.message);
    }
  }, [availableRooms, floor]);

  // Get vector length by it's id
  let lengthGetter = (id: any) => {
    console.log(id);
    const divElement: SVGGeometryElement = lines[id].current;
    divElement.style.display = "none";
    console.log(id + " " + divElement.getTotalLength());
    return divElement.getTotalLength();
  };

  // Making refs to all the lines from svg so we can use them later to display and hide lines by their id

  // Iterate trough object and change the line lengths to match the vectors' lengths
  let objIterator = (obj: Object) => {
    for (const [key, value] of Object.entries(obj)) {
      let tempObj: any = {};
      for (let [key1, value1] of Object.entries(value)) {
        const temp = key + key1;
        const temp2 = key1 + key;
        if (Object.keys(lines).includes(temp)) {
          value1 = lengthGetter(temp);
        } else value1 = lengthGetter(temp2);
        //Set length property of lines
        tempObj[key1] = value1;
      }
      graph[key] = tempObj;
    }
  };

  // Part of dijkstra, finds shortest distance to next nodes that haven't been visited yet
  let shortestDistanceNode = (distances: any, visited: Array<any>) => {
    // create a default value for shortest
    let shortest: any = null;

    // for each node in the distances object
    for (let node in distances) {
      // if no node has been assigned to shortest yet
      // or if the current node's distance is smaller than the current shortest
      let currentIsShortest =
        shortest === null || distances[node] < distances[shortest];

      // and if the current node is in the unvisited set
      if (currentIsShortest && !visited.includes(node)) {
        // update shortest to be the current node
        shortest = node;
      }
    }
    return shortest;
  };

  // Main function including dijkstra's algorithm so we find shortest path from given "map" with start and end points
  let findShortestPath = (
    graph: any,
    tempStartNode: string,
    tempEndNode: string
  ) => {
    // track distances from the start node using a hash object
    let distances: any = {};
    distances[tempEndNode] = "Infinity";
    distances = Object.assign(distances, graph[tempStartNode]);
    // track paths using a hash object
    let parents: any = { tempEndNode: null };
    for (let child in graph[tempStartNode]) {
      parents[child] = tempStartNode;
    }

    // collect visited nodes
    let visited: string[] = [];
    // find the nearest node
    let node = shortestDistanceNode(distances, visited);

    // for that node:
    while (node) {
      // find its distance from the start node & its child nodes
      let distance = distances[node];
      let children = graph[node];

      // for each of those child nodes:
      for (let child in children) {
        // make sure each child node is not the start node
        if (String(child) === String(tempStartNode)) {
          continue;
        } else {
          // save the distance from the start node to the child node
          let newdistance = distance + children[child];
          // if there's no recorded distance from the start node to the child node in the distances object
          // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
          if (!distances[child] || distances[child] > newdistance) {
            // save the distance to the object
            distances[child] = newdistance;
            // record the path
            parents[child] = node;
          }
        }
      }
      // move the current node to the visited set
      visited.push(node);
      // move to the nearest neighbor node
      node = shortestDistanceNode(distances, visited);
    }

    // using the stored paths from start node to end node
    // record the shortest path
    let shortestPath: string[] = [tempEndNode];
    let parent = parents[tempEndNode];
    while (parent) {
      shortestPath.push(parent);
      parent = parents[parent];
    }
    shortestPath.reverse();
    for (let i = 0; i < shortestPath.length - 1; i++) {
      // String combinations that include each line's start and end point and combines them to make it line name
      let tempString: string = shortestPath[i];
      let tempString1: string = shortestPath[i + 1];
      let finalName: string;
      let tempName: any = tempString.concat(tempString1);
      let tempName1: any = tempString1.concat(tempString);
      // Check line name both ways ea. AB and BA to find the line
      if (Object.keys(lines).includes(tempName)) {
        finalName = tempName;
      } else finalName = tempName1;
      const divElement: SVGGeometryElement = lines[finalName].current;
      // Make lines on the shortest path visible
      divElement.style.display = "block";
    }
    // this is the shortest path
    let results = {
      distance: distances[tempEndNode],
      path: shortestPath,
    };
    console.log(results);
    // Log the shortest path & the end node's distance from the start node
    return results.distance;
  };

  useEffect(() => {
    (async () => {
      try {
        objIterator(graph);
        findShortestPath(graph, update.startNode, update.endNode);
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, [update]);

  useEffect(() => {
    (async () => {
      try {
        objIterator(graph);
        const distance = findShortestPath(graph, start, end);
        if (distance === "Infinity") {
          setButtonStyles({
            "2": "",
            "5": "",
            "6": "",
            "7": "",
          });
        }
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, [start, end]);

  function isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  interface obj {
    readonly 2: string;
    readonly 5: string;
    readonly 6: string;
    readonly 7: string;
  }

  const flashButtons = (from: string, to: string) => {
    let toFloor: any, fromFloor: any;
    if (isNumeric(to.charAt(1))) {
      let num = to.charAt(1);
      toFloor = num;
    } else {
      toFloor = 2;
    }
    if (isNumeric(from.charAt(1))) {
      fromFloor = from.charAt(1);
    } else {
      fromFloor = 2;
    }

    let obj: any = {
      "2": "",
      "5": "",
      "6": "",
      "7": "",
    };

    //to blink or not to blink
    const blink = () => {
      if (floor !== toFloor) {
        return "blink";
      }
    };

    obj[toFloor] = "endButton " + blink();
    obj[fromFloor] = "startButton";

    //if floor 5 or 6 are between the destination and the start set their style as middleButton
    for (let i = 5; i < 7; i++) {
      if (
        ((i < toFloor && i > fromFloor) || (i > toFloor && i < fromFloor)) &&
        (i === 5 || i === 6)
      ) {
        obj[i] = "middleButton";
      }
    }
    setButtonStyles(obj);
  };

  const returnShortestPath = (from: string, to: string) => {
    objIterator(graph);
    console.log("from", from, "to", to);
    const data = [];
    data.push({
      from: from + "1",
      to: to + "1",
      length: findShortestPath(graph, from + "1", to + "1"),
    });
    data.push({
      from: from + "1",
      to: to + "2",
      length: findShortestPath(graph, from + "1", to + "2"),
    });
    data.push({
      from: from + "2",
      to: to + "1",
      length: findShortestPath(graph, from + "2", to + "1"),
    });
    data.push({
      from: from + "2",
      to: to + "2",
      length: findShortestPath(graph, from + "2", to + "2"),
    });
    data.push({
      from: from,
      to: to + "1",
      length: findShortestPath(graph, from, to + "1"),
    });
    data.push({
      from: from,
      to: to + "2",
      length: findShortestPath(graph, from, to + "2"),
    });
    data.push({
      from: from + "1",
      to: to,
      length: findShortestPath(graph, from + "1", to),
    });
    data.push({
      from: from + "2",
      to: to,
      length: findShortestPath(graph, from + "2", to),
    });
    data.push({
      from: from,
      to: to,
      length: findShortestPath(graph, from, to),
    });
    objIterator(graph);

    const shortestRoute = data.reduce(function (prev, curr) {
      return prev.length < curr.length ? prev : curr;
    });
    console.log(data);
    console.log(shortestRoute);
    if (shortestRoute.length !== "Infinity") {
      flashButtons(from, to);
    }
    findShortestPath(graph, shortestRoute.from, shortestRoute.to);
  };

  useEffect(() => {
    try {
      if (start !== "" && end !== "") {
        returnShortestPath(start, end);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, [start, end]);

  useEffect(() => {
    try {
      const rects = classes7;
      console.log(rects);
    } catch (error: any) {
      console.log(error.message);
    }
  }, [marker]);

  return (
    <>
      {/* Between floors */}
      <g display="none">
        {/*Vertical*/}
        <path ref={R21X71} className="cls-6" d="M206.95 749.19L206.95 788.23" />
        <path ref={X51X71} className="cls-6" d="M206.95 749.19L206.95 788.23" />
        <path ref={X61X71} className="cls-6" d="M206.95 749.19L206.95 788.23" />
        <path ref={R21X61} className="cls-6" d="M206.95 749.19L206.95 788.23" />
        <path ref={X51X61} className="cls-6" d="M206.95 749.19L206.95 788.23" />
        <path ref={R21X51} className="cls-6" d="M206.95 749.19L206.95 788.23" />

        {/*Small stairs*/}
        <path
          ref={R221R622}
          className="cls-6"
          d="M206.95 749.19L206.95 788.23"
        />
        <path
          ref={R221R522}
          className="cls-6"
          d="M206.95 749.19L206.95 788.23"
        />
        <path
          ref={R221R73}
          className="cls-6"
          d="M206.95 749.19L206.95 788.23"
        />
        <path
          ref={R522R622}
          className="cls-6"
          d="M206.95 749.19L206.95 788.23"
        />
        <path
          ref={R522R73}
          className="cls-6"
          d="M206.95 749.19L206.95 788.23"
        />
        <path
          ref={R73R622}
          className="cls-6"
          d="M206.95 749.19L206.95 788.23"
        />

        {/* Floor 7 */}
        <path ref={R711X71} className="cls-6" d="M1430.23 782.65L1326.58 676.66" />
        <path ref={R712X71} className="cls-6" d="M1430.23 782.65L1326.58 676.66" />

        {/* Floor 6*/}
        <path ref={R611X61} className="cls-6" d="M1430.23 782.65L1326.58 676.66" />
        <path ref={R612X61} className="cls-6" d="M1430.23 782.65L1326.58 676.66" />

        {/* Floor 5 */}
        <path ref={R511X51} className="cls-6" d="M1430.23 782.65L1326.58 676.66" />
        <path ref={R512X51} className="cls-6" d="M1430.23 782.65L1326.58 676.66" />

        {/* Elevators */}
        <path ref={H21H71} className="cls-6" d="M1272.19 744.84v62.13" />
        <path ref={H21H51} className="cls-6" d="M1272.19 744.84v62.13" />
        <path ref={H21H61} className="cls-6" d="M1272.19 744.84v62.13" />
        <path ref={H51H61} className="cls-6" d="M1272.19 744.84v62.13" />
        <path ref={H51H71} className="cls-6" d="M1272.19 744.84v62.13" />
        <path ref={H61H71} className="cls-6" d="M1272.19 744.84v62.13" />
      </g>

      {/*Floor 2*/}
      <g display={floor2Visibility} id="_2_drawn_base">
        <g id="walls">
          <path className="cls-1" d="M1140.84 2063.79L1237.76 2063.79" />
          <path
            className="cls-2"
            d="M1518.12 1870.34L1564.53 1916.75 1575.35 1905.94 1606.36 1936.95"
          />
          <path
            className="cls-2"
            d="M1433.98 2046.78L1351.3 2129.46 1327.57 2105.72"
          />
          <path className="cls-3" d="M1505.59 1975.17L1523.39 1957.37" />
          <path
            className="cls-2"
            d="M1303.13 1333.4L1340.03 1296.51 1345.37 1296.51"
          />
          <path
            className="cls-2"
            d="M1303.43 1.5L1303.43 283.96 1144.4 283.96 1144.4 603.21 901.1 603.21 901.1 516.58 740.88 516.58 740.88 603.21 81.02 603.21 81.02 774.25 1.5 774.25 1.5 939.08 498.18 1435.76 830.49 1103.46 1140.84 1103.46 1140.84 2242.2 1481.46 2242.2 1975.17 1748.49 1480.27 1253.59 1480.27 1107.61 1975.76 612.12 1479.68 116.03 1479.68 1.5 1303.43 1.5z"
          />
          <polyline
            className="cls-2"
            points="1518.12 1870.34 1564.53 1916.75 1575.35 1905.94 1606.36 1936.95"
          />
          <polyline
            className="cls-2"
            points="1303.13 1333.4 1340.03 1296.51 1345.37 1296.51"
          />
        </g>
        <g id="misc">
          <path
            className="cls-4"
            d="M81.02 774.25L335.26 774.25 335.26 699.61 416 699.61 416 603.21 81.02 603.21 81.02 774.25z"
          />
          <path
            className="cls-4"
            d="M830.49 1103.46L657.21 930.18 600.45 986.95 564.45 950.95 584.32 931.07 491.75 838.5 460.4 869.85 430.29 839.74 239.26 839.74 206.6 872.4 191.39 857.19 1.5 857.19 1.5 939.08 498.18 1435.76 828.81 1105.14"
          />
          <path
            className="cls-4"
            d="M1606.36 1936.95L1696.53 2027.13 1481.46 2242.2 1351.83 2242.2 1351.83 2191.7 1606.47 1937.06"
          />
          <path
            className="cls-4"
            d="M1308.97 1848.18L1308.97 1911.21 1477.24 1911.21 1518.12 1870.34 1388.13 1740.35 1388.13 1826.82 1308.99 1747.68 1308.97 1848.18z"
          />
          <path
            className="cls-4"
            d="M1444.27 1395.61L1533.28 1306.6 1480.27 1253.59 1480.27 1107.61 1975.76 612.12 1479.68 116.03 1479.68 1.5 1303.43 1.5 1303.43 283.96 1144.4 283.96 1144.4 603.21 1144.4 632.88 1308.97 632.88 1308.97 993.68 1275.74 993.68 1275.74 1218.38 1345.37 1218.38 1345.37 1297.5 1444.27 1395.61z"
          />
          <path
            className="cls-4"
            d="M1140.84 1103.46L986.06 948.68 831.15 1103.59 1140.84 1103.46z"
          />
          <path className="cls-4" d="M740.88 603.21L901.1 603.21" />
        </g>
        <g id="toilets">
          <path
            className="cls-3"
            id="V21"
            d="M335.26 699.61H416V774.25H335.26z"
          />
          <path
            id="V23"
            className="cls-3"
            d="M1477.24 1911.21L1459.43 1929.02 1505.59 1975.17 1433.98 2046.78 1411.04 2023.83 1327.17 2023.83 1327.17 1983.48 1308.97 1983.48 1308.97 1911.21 1477.24 1911.21z"
          />
          <path
            id="PUKKARI"
            className="cls-3"
            d="M1275.74 1218.38L1275.74 1306.2 1388.09 1417.76 1388.09 1826.82 1308.97 1747.7 1308.97 1848.18 1275.74 1848.18 1275.74 1821.28 1252.01 1821.28 1252.01 1796.75 1227.48 1796.75 1227.48 1612.4 1264.66 1612.4 1264.66 1541.19 1227.48 1541.19 1227.48 1306.2 1275.74 1306.2"
          />
        </g>
        <g id="stairsElevator">
          <path
            className="cls-1"
            id="R21"
            d="M1308.97 744.84L1079.52 744.84 1079.52 603.21 1144.4 603.21 1144.4 632.88 1308.97 632.88 1308.97 744.84z"
          />
          <path
            className="cls-1"
            id="H21"
            d="M1247.65 824.75H1308.97V993.28H1247.65z"
          />
          <path
            className="cls-1"
            id="R22"
            d="M1140.84 1981.9H1238.29V2242.21H1140.84z"
          />
        </g>
        <g id="doors">
          <path className="cls-8" d="M1275.72 1271.79L1275.76 1253.98" />
          <path className="cls-8" d="M1316.61 1320.17L1329.23 1307.6" />
          <path className="cls-8" d="M1264.6 1566.37L1264.63 1548.56" />
          <path className="cls-8" d="M1264.62 1602.19L1264.65 1584.38" />
          <path className="cls-8" d="M1238.24 2050.41L1238.35 1996.61" />
          <path className="cls-8" d="M1238.33 2093.26L1238.36 2075.45" />
          <path className="cls-8" d="M1334.81 2242.26L1279.84 2242.15" />
          <path className="cls-8" d="M1308.95 1975.17L1308.99 1957.36" />
          <path className="cls-8" d="M1247.5 987.59L1247.81 830.53" />
          <path className="cls-8" d="M1298.09 744.87L1247.32 744.77" />
          <path className="cls-8" d="M877.3 516.63L826.53 516.53" />
          <path className="cls-8" d="M817.96 516.68L767.19 516.58" />
          <path className="cls-8" d="M415.98 722.79L416.01 704.98" />
          <path className="cls-8" d="M415.99 769.07L416.03 751.26" />
          <path className="cls-8" d="M1558.43 1910.67L1545.86 1898.05" />
          <path className="cls-8" d="M1476.57 1945.91L1464 1933.29" />
          <path className="cls-8" d="M1500.57 1969.99L1488 1957.37" />
          <path className="cls-8" d="M877.3 603.24L826.53 603.14" />
          <path className="cls-8" d="M817.96 603.29L767.19 603.19" />
        </g>
      </g>
      <g display={floor2Visibility} id="_2_routes">
        <path ref={V21K22} className="cls-6" d="M429.94 740.49L851.92 740.49" />
        <path ref={U21K21} className="cls-6" d="M851.92 537.15L851.92 619.43" />
        <path ref={K21K22} className="cls-6" d="M851.92 620.71L851.92 740.14" />
        <path ref={K21K23} className="cls-6" d="M852.73 620.71L1014.2 782.18" />
        <path
          ref={K24K25}
          className="cls-6"
          d="M1224.21 782.18L1272.71 782.18"
        />
        <path
          ref={K23K24}
          className="cls-6"
          d="M1014.77 782.18L1224.21 782.18"
        />
        <path
          ref={K25R21}
          className="cls-6"
          d="M1272.71 744.87L1272.71 782.18"
        />
        <path
          ref={K23K26}
          className="cls-6"
          d="M1014.45 782.18L1142.05 909.78"
        />
        <path
          ref={K27K28}
          className="cls-6"
          d="M1210.31 909.78L1224.05 909.78"
        />
        <path
          ref={K26K27}
          className="cls-6"
          d="M1142.32 909.78L1210.31 909.78"
        />
        <path
          ref={K28H21}
          className="cls-6"
          d="M1224.41 909.78L1247.81 909.78"
        />
        <path
          ref={K24K28}
          className="cls-6"
          d="M1224.21 909.78L1224.21 783.61"
        />
        <path
          ref={K26K29}
          className="cls-6"
          d="M1142.18 909.93L1176.11 943.87"
        />
        <path
          ref={K210K211}
          className="cls-6"
          d="M1176.11 1576.4L1176.11 1870.34"
        />
        <path
          ref={K212K210}
          className="cls-6"
          d="M1176.11 1262.29L1176.11 1576.4"
        />
        <path
          ref={K213K212}
          className="cls-6"
          d="M1176.11 1163.29L1176.11 1262.29"
        />
        <path
          ref={K29K213}
          className="cls-6"
          d="M1176.11 944.08L1176.11 1163.29"
        />
        <path
          ref={K211K214}
          className="cls-6"
          d="M1176.11 1870.63L1270.08 1964.6"
        />
        <path
          ref={K215K216}
          className="cls-6"
          d="M1270.08 2021.85L1270.08 2084.36"
        />
        <path
          ref={K214K215}
          className="cls-6"
          d="M1270.08 1964.88L1270.08 2021.85"
        />
        <path
          ref={K217K218}
          className="cls-6"
          d="M1307.43 2122.1L1347.55 2162.22"
        />
        <path
          ref={K216K217}
          className="cls-6"
          d="M1270.08 2084.75L1307.43 2122.1"
        />
        <path
          ref={K218K219}
          className="cls-6"
          d="M1348.04 2162.22L1557.64 1952.62 1557.21 1952.62 1531.85 1927.25"
        />
        <path
          ref={K219V22}
          className="cls-6"
          d="M1531.65 1927.25L1494.75 1964.15"
        />
        <path
          ref={K219E2041}
          className="cls-6"
          d="M1531.75 1927.13L1553.33 1905.55"
        />
        <path
          ref={K217K220}
          className="cls-6"
          d="M1307.33 2203.04L1307.33 2122.34"
        />
        <path
          ref={K220RUOKALA}
          className="cls-6"
          d="M1307.33 2242.26L1307.33 2203.04"
        />

        {/*<path
          ref={K216R222}
          className="cls-6"
          d="M1269.86 2084.75L1238.36 2084.75"
        />*/}
        <path
          ref={K215R221}
          className="cls-6"
          d="M1269.66 2021.6L1238.24 2021.6"
        />
        <path
          ref={K214V23}
          className="cls-6"
          d="M1308.99 1964.88L1270.08 1964.88"
        />
        <path
          ref={K210PUKKARI}
          className="cls-6"
          d="M1176.35 1576.4L1252.01 1576.4"
        />
        <path
          ref={K212K221}
          className="cls-6"
          d="M1275.72 1262.88L1176.11 1262.88"
        />
        <path
          ref={K213K221}
          className="cls-6"
          d="M1275.76 1263.28L1176.11 1163.48"
        />
        <path
          ref={K221E2042}
          className="cls-6"
          d="M1275.99 1263.28L1322.65 1313.89"
        />
        <path
          ref={K22K23}
          className="cls-6"
          d="M852.25 740.49L1013.92 782.18"
        />
        <path
          ref={K218K220}
          className="cls-6"
          d="M1347.79 2162.44L1307.36 2202.87"
        />
        <path
          ref={K29K27}
          className="cls-6"
          d="M1176.35 943.87L1210.31 909.9"
        />
      </g>

      {/* Floor 6*/}
      <g display={floor6Visibility} id="_6_drawn_base">
        <g id="walls">
          <path className="cls-7" d="M1079.5 603.21L901.1 603.21" />
          <path
            className="cls-7"
            d="M1140.81 1103.46L1140.84 1103.46 1140.84 2242.2 1481.46 2242.2 1975.17 1748.49 1480.27 1253.59 1480.27 1107.61 1975.76 612.12 1479.68 116.03 1479.68 1.5 1303.43 1.5 1303.43 283.96 1144.4 283.96 1144.4 603.21 1079.5 603.21"
          />
          <path
            className="cls-11"
            d="M1140.81 603.21L81.02 603.21 81.02 774.25 1.5 774.25 1.5 939.08 498.18 1435.76 830.49 1103.46 1140.81 1103.46"
          />
          <path
            className="cls-7"
            d="M1327.57 2025.41L1455.05 2025.41 1350.49 2129.97 1328.09 2107.57"
          />
          <path className="cls-11" d="M1140.84 744.87L1140.84 1103.46" />
          <path className="cls-7" d="M1327.57 1985.24L1327.57 1997.32" />
          <path className="cls-7" d="M1455.74 1985.24L1455.74 1997.32" />
        </g>
        <g id="stairsElevators">
          <path
            className="cls-1"
            id="R21"
            d="M1140.84 1981.9H1238.29V2242.21H1140.84z"
          />
          <path
            className="cls-1"
            id="R11"
            d="M1308.97 744.84L1079.52 744.84 1079.52 603.21 1144.4 603.21 1144.4 632.88 1308.97 632.88 1308.97 744.84z"
          />
          <path
            className="cls-1"
            id="H61"
            d="M1247.65 824.79H1308.97V993.3199999999999H1247.65z"
          />
        </g>
        <g id="misc">
          <path
            className="cls-4"
            d="M1353.28 336.58L1353.28 570.38 1471.07 452.59 1459.6 441.12 1509.35 391.37 1403.92 285.94 1353.28 336.58z"
          />
          <path
            className="cls-4"
            d="M1407.07 576.71L1371.87 611.91 1371.87 683.13 1422.11 733.37 1532.49 623 1492.52 583.03 1452.95 622.6 1407.07 576.71z"
          />
          <path
            className="cls-4"
            transform="rotate(-45 1528.159 844.706)"
            d="M1760.73 634.48H1835.13V691H1760.73z"
          />
          <path
            className="cls-4"
            d="M1497.81 911.65L1345.23 1064.23 1434.51 1064.23 1479.08 1108.8 1587.02 1000.86 1497.81 911.65z"
          />
          <path
            className="cls-4"
            d="M1345.23 1300.4L1390.13 1345.31 1435.04 1300.4 1345.23 1300.4z"
          />
          <path
            className="cls-4"
            d="M1571.85 1912.47L1354.6 1695.21 1307.91 1741.9 1307.91 1912.66 1475.9 1912.66 1523.04 1959.81 1571.85 1912.47z"
          />
          <path
            className="cls-4"
            d="M1640.62 2083.04L1481.46 2242.2 1351.17 2242.2 1351.17 2195.52 1552.14 1994.56 1640.62 2083.04z"
          />
          <path
            className="cls-4"
            d="M1140.84 1904.88H1262.03V1981.89H1140.84z"
          />
          <path
            className="cls-4"
            d="M1262.03 1328.88L1262.03 1309.37 1236.71 1309.37 1182.58 1255.24 1140.84 1255.24 1140.84 1328.88 1262.03 1328.88"
          />
        </g>
        <g id="classes">
          {seventhFloorRoomsArray.map((item) => (
            <Room
              className={item.className}
              id={item.id}
              transform={item.transform}
              d={item.d}
            />
          ))}{" "}
        </g>
        <g id="toilets">
          <path
            className="cls-3"
            id="K619"
            d="M1460.08 1985.19L1308.95 1985.19 1308.95 1912.66 1475.9 1912.66 1523.04 1959.81 1497.66 1985.19 1460.08 1985.19z"
          />
          <path
            className="cls-3"
            id="V61"
            d="M1550.47 433.3L1407.07 576.71 1452.95 622.6 1596.56 479 1550.47 433.3z"
          />
          <path
            className="cls-3"
            id="K625"
            transform="rotate(-45 1476.136 896.725)"
            d="M1709.54 686.49H1782.27V743.01H1709.54z"
          />
        </g>
        <g id="doors">
          <path className="cls-8" d="M1453.9 529.35L1441.28 541.92" />
          <path className="cls-8" d="M1518.02 465.19L1505.4 477.76" />
          <path className="cls-8" d="M1541.9 424.08L1529.34 411.46" />
          <path className="cls-8" d="M1672.1 554.14L1659.53 541.52" />
          <path className="cls-8" d="M1559.55 596.93L1546.93 609.5" />
          <path className="cls-8" d="M1455.02 794.43L1442.4 807" />
          <path className="cls-8" d="M1543.8 1986.03L1531.23 1973.41" />
          <path className="cls-8" d="M1419.83 1695.99L1407.26 1683.37" />
          <path className="cls-8" d="M1357.9 1634.06L1345.33 1621.44" />
          <path className="cls-8" d="M1362.74 1985.24L1344.93 1985.2" />
          <path className="cls-8" d="M1449.77 1985.22L1431.96 1985.19" />
          <path className="cls-8" d="M1335.51 336.59L1317.7 336.56" />
          <path className="cls-8" d="M1296.75 744.87L1247.68 744.77" />
          <path className="cls-8" d="M1301.04 596.49L1301.08 578.68" />
          <path className="cls-8" d="M1262.01 1359.25L1262.05 1341.44" />
          <path className="cls-8" d="M1238.26 2052.86L1238.37 1998.57" />
          <path className="cls-8" d="M1238.25 2095.96L1238.28 2078.15" />
          <path className="cls-8" d="M1345.21 1140.65L1345.24 1122.84" />
          <path className="cls-8" d="M1308.98 669.7L1308.98 637.26" />
          <path className="cls-8" d="M1247.57 985.81L1247.88 831.71" />
          <path className="cls-8" d="M1301.03 394.14L1301.06 376.33" />
          <path className="cls-8" d="M1537.51 1833.33L1524.89 1845.89" />
        </g>
      </g>
      <g display={floor6Visibility} id="_6_routes">
        <path
          ref={K61K62}
          className="cls-6"
          d="M1326.58 1131.74L1326.58 1278.21"
        />
        <path
          ref={K61K63}
          className="cls-6"
          d="M1326.58 1087.53L1326.58 1131.74"
        />
        <path
          ref={K63K64}
          className="cls-6"
          d="M1326.58 1004.95L1326.58 1087.53"
        />
        <path
          ref={K64K65}
          className="cls-6"
          d="M1326.58 886.99L1326.58 1004.95"
        />
        <path
          ref={K65K66}
          className="cls-6"
          d="M1326.58 807.54L1326.58 886.99"
        />
        <path
          ref={K66K67}
          className="cls-6"
          d="M1326.58 676.95L1326.58 807.54"
        />
        <path
          ref={K67K68}
          className="cls-6"
          d="M1326.58 653.6L1326.58 676.95"
        />
        <path
          ref={K68K69}
          className="cls-6"
          d="M1326.58 626.208L1326.58 653.6"
        />
        <path
          ref={K69K610}
          className="cls-6"
          d="M1326.798 587.475L1326.798 626.017"
        />
        <path
          ref={K611K612}
          className="cls-6"
          d="M1290.77 2025.21L1290.77 2087.03"
        />
        <path
          ref={K611K613}
          className="cls-6"
          d="M1290.77 2005.57L1290.77 2025.21"
        />
        <path
          ref={K613K614}
          className="cls-6"
          d="M1290.77 1732.53L1290.77 2005.57"
        />
        <path
          ref={K614K615}
          className="cls-6"
          d="M1290.77 1602.64L1290.77 1732.53"
        />
        <path
          ref={K615K616}
          className="cls-6"
          d="M1290.77 1350.31L1290.77 1602.64"
        />
        <path
          ref={K617K618}
          className="cls-6"
          d="M1512.43 2004.86L1360.14 2157.15"
        />
        <path
          ref={K618E6591}
          className="cls-6"
          d="M1538.42 1978.86L1512.43 2004.86"
        />
        <path
          ref={K612K617}
          className="cls-6"
          d="M1359.71 2157.02L1290.91 2088.21"
        />
        {/*
                              <path
                    ref={R621K612}
                    className="cls-6"
                    d="M1238.22 2087.03L1290.77 2087.03"
                />
              */}
        <path
          ref={R622K611}
          className="cls-6"
          d="M1238.29 2025.41L1290.77 2025.41"
        />
        <path
          ref={K613K619}
          className="cls-6"
          d="M1398.38 2005.37L1290.77 2005.37"
        />
        <path
          ref={K620K615}
          className="cls-6"
          d="M1333.86 1642.76L1290.77 1599.67"
        />
        <path
          ref={K620K621}
          className="cls-6"
          d="M1358.32 1666.73L1335.48 1643.89"
        />
        <path
          ref={K621K622}
          className="cls-6"
          d="M1397.93 1706.34L1358.32 1666.73"
        />
        <path
          ref={K622E6592}
          className="cls-6"
          d="M1531.2 1839.61L1397.93 1706.34"
        />
        <path
          ref={K614K621}
          className="cls-6"
          d="M1291.37 1732.53L1357.17 1666.73"
        />
        <path
          ref={K620E6621}
          className="cls-6"
          d="M1351.62 1627.75L1335.48 1643.89"
        />
        <path
          ref={K622E6611}
          className="cls-6"
          d="M1413.89 1690.02L1397.75 1706.16"
        />
        <path
          ref={K616E6701}
          className="cls-6"
          d="M1260.71 1350.31L1290.18 1350.31"
        />
        <path
          ref={K616K62}
          className="cls-6"
          d="M1326.58 1278.71L1290.77 1350.05"
        />
        <path
          ref={K61E690}
          className="cls-6"
          d="M1326.58 1131.74L1346.14 1131.74"
        />
        <path
          ref={K65K624}
          className="cls-6"
          d="M1430.73 782.86L1326.58 886.99"
        />
        <path
          ref={K624K625}
          className="cls-6"
          d="M1579.23 634.39L1430.73 782.86"
        />
        <path
          ref={K625D6571}
          className="cls-6"
          d="M1665.81 547.83L1579.23 634.39"
        />
        <path
          ref={K624D6521}
          className="cls-6"
          d="M1448.55 800.69L1430.73 782.86"
        />
        <path
          ref={R611K68}
          className="cls-6"
          d="M1308.97 653.46L1326.58 653.46"
        />
        <path
          ref={K626K69}
          className="cls-6"
          d="M1432.58 520.79L1326.58 626.82"
        />
        <path
          ref={K626D6581}
          className="cls-6"
          d="M1535.56 417.77L1432.58 520.79"
        />
        <path
          ref={K626V61}
          className="cls-6"
          d="M1447.4 535.6L1432.58 520.79"
        />
        <path
          ref={K610D6591}
          className="cls-6"
          d="M1301.06 587.98L1326.58 587.98"
        />
        <path
          ref={K627K66}
          className="cls-6"
          d="M1272.35 806.97L1326.58 806.97"
        />
        <path
          ref={K627K628}
          className="cls-6"
          d="M1228.53 806.97L1272.35 806.97"
        />
        <path
          ref={K66K624}
          className="cls-6"
          d="M1430.03 782.86L1327.3 806.97"
        />
        <path
          ref={K67K624}
          className="cls-6"
          d="M1430.23 782.65L1326.58 676.66"
        />
        <path
          ref={K627R612}
          className="cls-6"
          d="M1272.19 744.84L1272.19 806.97"
        />
        <path
          ref={K629H61}
          className="cls-6"
          d="M1247.85 909.06L1229.32 909.06"
        />
        <path
          ref={K628K629}
          className="cls-6"
          d="M1229.32 806.97L1229.32 908.09"
        />
        <path
          ref={K630K629}
          className="cls-6"
          d="M1229.32 909.68L1229.32 1003.96"
        />
        <path
          ref={K630K64}
          className="cls-6"
          d="M1230.25 1003.96L1326.58 1003.96"
        />
        <path
          ref={K630K63}
          className="cls-6"
          d="M1230.25 1004.95L1325.98 1086.94"
        />
        <path
          ref={K619K618}
          className="cls-6"
          d="M1511.72 2005.37L1398.38 2005.37"
        />
        <path
          ref={K631K610}
          className="cls-6"
          d="M1326.58 385.83L1326.58 587.98"
        />
        <path
          ref={K631D6582}
          className="cls-6"
          d="M1326.58 336.58L1326.58 385.83"
        />
        <path
          ref={K631D6592}
          className="cls-6"
          d="M1299.48 385.24L1326.58 385.24"
        />
      </g>

      {/* Floor 7*/}
      <g display={floor7Visibility} id="Layer_3">
        <g id="etc">
          <path
            className="cls-4"
            d="M70.07 616.27L243.35 616.27 243.35 636.84 70.33 636.84 70.07 616.27z"
          />
          <path
            className="cls-4"
            d="M232 210.97L323.42 210.97 420.17 114.23 420.17 1.5 232.53 1.5 232 210.97z"
          />
          <path
            className="cls-4"
            d="M1560.7 473.64v234.19l118.68-118.68-11.2-11.21 48.82-48.79-105.79-105.75s-50.51 50.34-50.51 50.24z"
            transform="translate(-1272.26 -134.29)"
          />
          <path
            className="cls-4"
            d="M531.02 481.37L386.52 625.86 340.93 580.27 306.71 614.49 306.71 701.98 359.56 754.83 581.98 532.4 530.98 481.4"
          />
          <path
            className="cls-4"
            d="M582.25 532.14L359.46 754.93 306.51 701.98 306.51 614.29 485.19 435.61"
          />
          <path
            className="cls-4"
            d="M327.48 1021.57L280.9 1068.15 373.57 1068.15 327.48 1021.57z"
          />
          <path
            className="cls-4"
            d="M1553.15 1437.13l44.95 44.95 45.05-45z"
            transform="translate(-1272.26 -134.29)"
          />
          <path
            className="cls-4"
            d="M73.37 1259.26L73.37 1332.31 196.66 1332.31 196.66 1311.35 170.82 1311.35 118.47 1258.99 73.37 1259.26"
          />
          <path
            className="cls-4"
            d="M73.1 1986.12L73.1 2069.32 172.8 2069.32 172.8 1986.12"
          />
          <path
            className="cls-4"
            d="M1778.35 2048.74l-213-213-48 48v166.82h165.49l46.82 46.81s48.2-49.13 48.69-48.63z"
            transform="translate(-1272.26 -134.29)"
          />
          <path
            className="cls-4"
            d="M288.02 2254.07L288.02 2197.9 325.81 2160.1 415.04 2249.32 409.9 2254.47 288.02 2254.07z"
          />
          <path
            className="cls-4"
            d="M196.4 1869.54L196.4 1986.12 73.1 1986.12 73.1 1869.54"
          />
          <path
            className="cls-4"
            d="M196.4 1754.82L196.4 1869.54 73.5 1869.54 73.5 1754.82"
          />
        </g>
        <g id="classes" ref={classes7}>
          {seventhFloorRoomsArray.map((item) => (
            <Room
              className={item.className}
              id={item.id}
              transform={item.transform}
              d={item.d}
            />
          ))}{" "}
        </g>
        <g id="toilets">
          <path
            className="cls-3"
            d="M340.93 580.27L386.52 625.86 531.02 481.37 485.27 435.63 340.93 580.27z"
          />
          <path
            className="cls-3"
            d="M244.2 1916.42L411.61 1916.42 457.86 1962.68 432.38 1988.16 244.1 1988.16 244.2 1916.42z"
          />
        </g>
        <g id="stairs_elevator">
          <path
            className="cls-1"
            d="M69.94 636.84L69.94 605.06 1.5 605.06 1.5 752.36 243.61 752.36 243.61 662.42 243.61 646.34 243.61 636.84 69.94 636.84 69.94 616.27"
          />
          <path
            className="cls-1"
            d="M178.73 829.37L244.93 829.37 244.93 998.16 177.94 998.16 178.73 829.37z"
          />
          <path className="cls-1" d="M73.1 2069.32H172.79V2254.27H73.1z" />
        </g>
        <g id="walls">
          <path
            className="cls-7"
            d="M416.49 1110.38L416.49 1259.92 910.8 1754.22 410.75 2254.27 73.1 2254.27 73.1 752.36 1.5 752.36 1.5 605.19 70.33 605.19 70.33 280.4 232.14 280.4 232.14 1.5 420.05 1.5 420.05 126.91 910.2 617.06 577.17 949.83 416.49 1110.38z"
          />
          <path
            className="cls-7"
            d="M485.19 435.61L510.25 460.67 632.03 338.88 420.05 126.91 420.05 1.5 232.14 1.5 232.14 280.4 244.4 292.67 237.54 299.52 237.54 339.35 288.44 339.35 338.95 288.84 485.19 435.61z"
          />
          <path
            className="cls-7"
            d="M70.33 605.19L70.07 616.27 237.54 616.27 237.54 339.35"
          />
          <path
            className="cls-7"
            d="M325.85 1347.79L244.8 1428.84 244.8 1588.07 327.48 1670.75 577.3 1420.93"
          />
          <path
            className="cls-7"
            d="M327.48 1670.75L489.77 1833.05 542.16 1780.66 739.7 1583.13"
          />
          <path
            className="cls-7"
            d="M506.69 1914.84L292.67 1700.82 244.1 1749.38 244.1 1988.22 394.73 1988.22"
          />
          <path className="cls-7" d="M458.42 1963.04L244.43 1749.05" />
          <path className="cls-7" d="M262.01 2028.58L392.75 2028.58" />
          <path
            className="cls-7"
            d="M262.2 2110.27L286.43 2134.5 293.32 2127.61"
          />
          <path
            className="cls-7"
            d="M173.19 2254.34L173.19 1986.12 196.93 1986.12 196.93 1311.21 170.82 1311.21 118.47 1258.86 73.24 1258.86"
          />
          <path className="cls-7" d="M243.61 667.2L243.61 752.36 73.1 752.36" />
          <path className="cls-7" d="M243.61 665.32L243.61 667.2" />
          <path className="cls-7" d="M243.61 644.95L243.61 645.35" />
          <path className="cls-7" d="M243.61 643.96L243.61 644.95" />
          <path
            className="cls-7"
            d="M237.54 615.48L243.61 615.48 243.61 636.84 243.61 643.96"
          />
        </g>
        <g id="doors">
          <path className="cls-8" d="M320.58 865.72L333.2 853.16" />
          <path className="cls-8" d="M421.81 764.87L434.43 752.3" />
          <path className="cls-8" d="M607.55 557.69L594.98 545.07" />
          <path className="cls-8" d="M479.65 429.84L467.08 417.23" />
          <path className="cls-8" d="M274.64 339.31L256.83 339.28" />
          <path className="cls-8" d="M237.53 391.44L237.56 373.63" />
          <path className="cls-8" d="M237.51 576.56L237.55 558.75" />
          <path className="cls-8" d="M243.58 662.74L243.61 644.93" />
          <path className="cls-8" d="M215.74 752.36L197.93 752.32" />
          <path className="cls-8" d="M178.03 988.19L178.55 839.27" />
          <path className="cls-8" d="M316.69 1658.96L304.12 1646.34" />
          <path className="cls-8" d="M196.71 1383.3L196.75 1365.49" />
          <path className="cls-8" d="M280.88 1288.06L280.91 1270.25" />
          <path className="cls-8" d="M280.98 1095.7L281.01 1077.89" />
          <path className="cls-8" d="M196.71 1723.52L196.75 1705.71" />
          <path className="cls-8" d="M173.31 2097.42L173.34 2079.61" />
          <path className="cls-8" d="M316.95 2151.14L304.38 2138.53" />
          <path className="cls-8" d="M562.29 1800.79L549.72 1788.17" />
          <path className="cls-8" d="M353.54 1695.8L340.97 1683.19" />
          <path className="cls-8" d="M512.18 1908.96L524.8 1896.39" />
        </g>
      </g>
      <g display={floor7Visibility} id="Layer_2">
        <path
          ref={D7592K72}
          className="cls-6"
          d="M236.49 567.21L263.39 567.21"
        />
        <path ref={K71K72} className="cls-6" d="M265.62 385.24L265.62 567.08" />
        <path
          ref={D7591K71}
          className="cls-6"
          d="M237.28 382.47L263.39 382.47"
        />
        <path
          ref={D7581K71}
          className="cls-6"
          d="M265.63 340.14L265.63 382.47"
        />
        <path ref={K73K74} className="cls-6" d="M401.39 495.28L264.77 631.9" />
        <path
          ref={D7582K73}
          className="cls-6"
          d="M473.85 422.82L401.39 495.28"
        />
        <path ref={K72K74} className="cls-6" d="M264.97 569.59L264.97 630.64" />
        <path ref={K74K75} className="cls-6" d="M264.97 630.59L264.97 654.64" />
        <path ref={K75R711} className="cls-6" d="M262.6 653.85L243.21 653.85" />
        <path ref={K75K76} className="cls-6" d="M264.97 657.41L264.97 696.18" />
        <path ref={K76K77} className="cls-6" d="M264.97 695.79L359.72 790.53" />
        <path
          ref={D7571K78}
          className="cls-6"
          d="M600.84 552.18L413.92 739.1"
        />
        <path
          ref={D7511K78}
          className="cls-6"
          d="M427.96 757.9L414.91 744.84"
        />
        <path ref={K78K77} className="cls-6" d="M360.31 791.92L409.96 742.27" />
        <path
          ref={D7501K79}
          className="cls-6"
          d="M310.01 842.09L327.28 859.37"
        />
        <path ref={K77K79} className="cls-6" d="M358.34 793.63L311.06 840.91" />
        <path
          ref={K76K710}
          className="cls-6"
          d="M264.45 698.03L264.45 784.01"
        />
        <path
          ref={K77K710}
          className="cls-6"
          d="M263.92 788.75L356.75 788.75"
        />
        <path
          ref={K711K710}
          className="cls-6"
          d="M263.92 791.39L263.92 878.95"
        />
        <path
          ref={K79K711}
          className="cls-6"
          d="M306.64 844.66L263.39 887.92"
        />
        <path
          ref={K79K710}
          className="cls-6"
          d="M308.09 840.97L266.55 791.92"
        />
        <path
          ref={K710K712}
          className="cls-6"
          d="M207.21 789.81L261.81 789.81"
        />
        <path
          ref={K712K713}
          className="cls-6"
          d="M156.31 789.81L207.21 789.81"
        />
        <path
          ref={K713K714}
          className="cls-6"
          d="M155.79 791.92L155.79 911.13"
        />
        <path ref={K714H71} className="cls-6" d="M176.36 910.6L158.95 910.6" />
        <path
          ref={K711K715}
          className="cls-6"
          d="M263.92 883.17L263.92 1088.88"
        />
        <path
          ref={K715E7901}
          className="cls-6"
          d="M281.32 1086.77L264.45 1086.77"
        />
        <path
          ref={K715K716}
          className="cls-6"
          d="M263.92 1277.72L263.92 1090.99"
        />
        <path
          ref={K716E7902}
          className="cls-6"
          d="M281.85 1278.78L263.92 1279.3 263.92 1277.72"
        />
        <path
          ref={K714K717}
          className="cls-6"
          d="M155.79 914.29L155.79 1082.55"
        />
        <path
          ref={K717K715}
          className="cls-6"
          d="M259.7 1086.77L155.26 1086.77"
        />
        <path
          ref={K718K716}
          className="cls-6"
          d="M262.86 1281.41L220.4 1323.87"
        />
        <path
          ref={K719K718}
          className="cls-6"
          d="M219.61 1326.77L219.61 1374.25"
        />
        <path
          ref={E7701K719}
          className="cls-6"
          d="M196.93 1374.25L217.5 1374.25"
        />
        <path
          ref={K719K720}
          className="cls-6"
          d="M219.08 1376.36L219.08 1603.7"
        />
        <path
          ref={K720K721}
          className="cls-6"
          d="M218.55 1600.01L292.66 1674.12"
        />
        <path
          ref={K721E7621}
          className="cls-6"
          d="M309.81 1652.75L291.08 1671.48"
        />
        <path
          ref={K720K722}
          className="cls-6"
          d="M218.55 1605.81L218.55 1712.88"
        />
        <path
          ref={K722E7702}
          className="cls-6"
          d="M196.93 1713.94L216.97 1713.94"
        />
        <path
          ref={K721K723}
          className="cls-6"
          d="M293.46 1677.02L219.08 1751.39"
        />
        <path
          ref={K722K723}
          className="cls-6"
          d="M218.03 1716.05L218.03 1749.28"
        />
        <path
          ref={K721K724}
          className="cls-6"
          d="M295.57 1678.07L327.48 1709.98"
        />
        <path
          ref={E7611K724}
          className="cls-6"
          d="M346.73 1690.2L329.06 1707.87"
        />
        <path
          ref={K724K725}
          className="cls-6"
          d="M329.32 1711.83L482.03 1864.53"
        />
        <path
          ref={K725E7591}
          className="cls-6"
          d="M483.87 1866.91L554.82 1795.96"
        />
        <path
          ref={K725E7511}
          className="cls-6"
          d="M485.98 1868.49L519.74 1902.25"
        />
        <path
          ref={K723K726}
          className="cls-6"
          d="M218.03 1754.03L218.03 2007.21"
        />
        <path
          ref={K726V71}
          className="cls-6"
          d="M220.66 2006.69L326.16 2006.69"
        />
        <path
          ref={K727K728}
          className="cls-6"
          d="M216.97 2091.08L216.97 2159.13"
        />
        <path
          ref={K728E7512}
          className="cls-6"
          d="M220.14 2158.6L296.62 2158.6 298.73 2157.02 312.18 2143.57"
        />
        <path
          ref={K712R712}
          className="cls-6"
          d="M206.95 749.19L206.95 788.23"
        />
        <path
          ref={K726K727}
          className="cls-6"
          d="M216.97 2009.32L216.97 2088.45 214.34"
        />
        <path
          ref={R73K727}
          className="cls-6"
          d="M216.97 2088.45 214.34 2087.92 173.19 2087.92"
        />
      </g>

      {/* Floor 5*/}
      <g display={floor5Visibility} id="_5_drawn_base">
        <g id="misc">
          <path className="cls-4" d="M80.75 603.21H334.73V776.09H80.75z" />
          <path
            className="cls-4"
            d="M188.62 890.03L238.66 839.98 434.42 839.98 335.29 939.12 325.24 929.06 276.18 978.12 188.62 890.03z"
          />
          <path
            className="cls-4"
            d="M454.86 877.76L492.58 840.05 585.81 840.05 636.12 890.36 461.49 1064.98 410.06 1013.55 500.36 923.26 454.86 877.76z"
          />
          <path
            className="cls-4"
            d="M1.5 857.85L91.57 857.85 253.76 1020.05 168.12 1105.7 1.5 939.08 1.5 857.85z"
          />
          <path
            className="cls-4"
            d="M822.38 776.09L822.38 781.63 903.08 781.63 903.08 748.8 1079.52 748.8 1079.52 603.21 822.38 603.21 822.38 776.09z"
          />
          <path
            className="cls-4"
            d="M1140.84 1103.46L982.83 945.45 982.83 951.08 830.47 1103.44 1140.84 1103.46z"
          />
          <path
            className="cls-4"
            d="M1140.84 1254.77H1260.71V1328.35H1140.84z"
          />
          <path
            className="cls-4"
            d="M1437.35 1064.88L1391.22 1018.76 1345.43 1064.56 1437.35 1064.88z"
          />
          <path
            className="cls-4"
            d="M1433.54 1300.22L1345.76 1300.22 1389.65 1344.11 1433.54 1300.22z"
          />
          <path
            className="cls-4"
            d="M1308.18 1912.66L1308.18 1745.32 1475.32 1912.47 1308.18 1912.66z"
          />
          <path
            className="cls-4"
            d="M1387.57 2160.18L1352.56 2195.19 1352.56 2242.2 1475.92 2242.2 1390.73 2157.02 1387.57 2160.18z"
          />
          <path
            className="cls-4"
            d="M1140.84 1790.42H1260.71V1981.89H1140.84z"
          />
          <path
            className="cls-4"
            d="M1406.29 576.71L1372.27 610.73 1372.27 704.09 1422.12 753.94 1646.56 529.5 1595.92 478.86 1452.18 622.6 1406.29 576.71z"
          />
          <path
            className="cls-4"
            d="M1353.28 366.25L1353.28 570.38 1471.57 452.09 1460.49 441.02 1508.95 392.56 1402.14 285.74 1353.68 334.2 1353.28 366.25z"
          />
        </g>
        <g id="toilets">
          <path
            id="V53"
            className="cls-3"
            transform="rotate(-45 346.04 1289.696)"
            d="M517.34 1075.37H714.27V1140.08H517.34z"
          />
          <path
            id="V51"
            className="cls-3"
            d="M1459.3 1985.19L1308.18 1985.19 1308.18 1912.66 1475.13 1912.66 1522.27 1959.81 1496.88 1985.19 1459.3 1985.19z"
          />
          <path
            id="V52"
            className="cls-3"
            d="M1549.7 433.3L1406.29 576.71 1452.18 622.6 1595.79 479 1549.7 433.3z"
          />
        </g>
        <g id="stairsElevator">
          <path
            id="R51"
            className="cls-1"
            d="M1140.84 1981.9H1238.29V2242.21H1140.84z"
          />
          <path
            id="R53"
            className="cls-1"
            d="M1308.97 744.84L1079.52 744.84 1079.52 603.21 1144.4 603.21 1144.4 632.88 1308.97 632.88 1308.97 744.84z"
          />
          <path
            id="H51"
            className="cls-1"
            d="M1247.65 824.79H1308.97V993.3199999999999H1247.65z"
          />
        </g>
        <g id="classes">
          {seventhFloorRoomsArray.map((item) => (
            <Room
              className={item.className}
              id={item.id}
              transform={item.transform}
              d={item.d}
            />
          ))}{" "}
        </g>
        <g id="walls">
          <path
            className="cls-7"
            d="M1326.64 2107.3L1351.34 2131.99 1355.36 2127.97"
          />
          <path className="cls-7" d="M1326.64 2025.69L1457.71 2025.69" />
          <path
            className="cls-7"
            d="M1260.71 1254.78L1260.71 1166.16 1243.7 1166.16"
          />
          <path className="cls-7" d="M901.1 603.21L740.88 603.21" />
          <path
            className="cls-7"
            d="M740.88 603.21L81.02 603.21 81.02 774.25 1.5 774.25 1.5 939.08 498.18 1435.76 830.49 1103.46 1140.84 1103.46 1140.84 2242.2 1481.46 2242.2 1975.17 1748.49 1480.27 1253.59 1480.27 1107.61 1975.76 612.12 1479.68 116.03 1479.68 1.5 1303.43 1.5 1303.43 283.96 1144.4 283.96 1144.4 603.21 901.1 603.21"
          />
        </g>
        <g id="doors">
          <path className="cls-8" d="M489.59 1093.25L477.02 1080.63" />
          <path className="cls-8" d="M558.52 1040.27L545.9 1052.84" />
          <path className="cls-8" d="M741.14 856.87L728.52 869.44" />
          <path className="cls-8" d="M420.73 911.77L408.12 924.33" />
          <path className="cls-8" d="M366.67 965.98L354.05 978.55" />
          <path className="cls-8" d="M301.97 1030.69L289.35 1043.25" />
          <path className="cls-8" d="M1453.88 529.32L1441.26 541.89" />
          <path className="cls-8" d="M1518 465.16L1505.38 477.73" />
          <path className="cls-8" d="M1540.42 424.05L1527.85 411.43" />
          <path className="cls-8" d="M1662.95 585.92L1650.33 598.49" />
          <path className="cls-8" d="M1604.14 645.53L1591.52 658.1" />
          <path className="cls-8" d="M1455 794.4L1442.38 806.97" />
          <path className="cls-8" d="M1542.56 1879.48L1529.94 1892.05" />
          <path className="cls-8" d="M1509.77 1911.87L1497.15 1924.44" />
          <path className="cls-8" d="M1378.42 2151.45L1365.86 2138.84" />
          <path className="cls-8" d="M1396.25 1726.08L1383.69 1713.46" />
          <path className="cls-8" d="M1358.81 1688.77L1346.24 1676.15" />
          <path className="cls-8" d="M1378.42 2151.45L1365.86 2138.84" />
          <path className="cls-8" d="M1362.71 1985.21L1344.9 1985.17" />
          <path className="cls-8" d="M1449.75 1985.19L1431.94 1985.16" />
          <path className="cls-8" d="M1335.48 366.26L1317.67 366.23" />
          <path className="cls-8" d="M1296.72 744.84L1247.65 744.75" />
          <path className="cls-8" d="M800.82 776.15L783.01 776.11" />
          <path className="cls-8" d="M394.14 776.11L376.33 776.08" />
          {/*Henkilöstön työtilan ovi <path className="cls-8" d="M284.34 776.09L266.53 776.06" /> */}
          <path className="cls-8" d="M1303.42 572.63L1303.45 554.82" />
          <path className="cls-8" d="M1260.69 1359.22L1260.73 1341.41" />
          <path className="cls-8" d="M1260.69 1741.44L1260.73 1723.63" />
          <path className="cls-8" d="M1238.24 2052.83L1238.34 1998.55" />
          <path className="cls-8" d="M1238.22 2095.93L1238.25 2078.12" />
          <path className="cls-8" d="M1345.75 1287.12L1345.78 1269.31" />
          <path className="cls-8" d="M1346.14 1095.84L1346.18 1078.04" />
          <path className="cls-8" d="M1308.95 669.68L1308.95 637.24" />
          <path className="cls-8" d="M1247.54 985.79L1247.85 831.68" />
        </g>
      </g>
      <g display={floor5Visibility} id="_5_routes">
        <path
          ref={K51K52}
          className="cls-6"
          d="M1326.58 1086.94L1326.58 1278.21"
        />
        <path
          ref={K51K53}
          className="cls-6"
          d="M1326.58 1003.96L1326.58 1086.94"
        />
        <path ref={K53K54} className="cls-6" d="M1326.58 887.199v116.761" />
        <path ref={K55K54} className="cls-6" d="M1325.976 805.715v80.546" />
        <path
          ref={K55K56}
          className="cls-6"
          d="M1326.58 676.95L1326.58 806.42"
        />
        <path
          ref={K56K57}
          className="cls-6"
          d="M1326.58 653.6L1326.58 676.95"
        />
        <path
          ref={K57K58}
          className="cls-6"
          d="M1326.58 628.14L1326.58 653.6"
        />
        <path
          ref={K58K59}
          className="cls-6"
          d="M1326.58 564.12L1326.58 628.14"
        />
        <path
          ref={K59D5581}
          className="cls-6"
          d="M1326.58 366.25L1326.58 564.12"
        />
        <path
          ref={K510K511}
          className="cls-6"
          d="M1290.77 2025.21L1290.77 2087.03"
        />
        <path
          ref={K510K512}
          className="cls-6"
          d="M1290.77 2005.57L1290.77 2025.21"
        />
        <path
          ref={K512K513}
          className="cls-6"
          d="M1290.77 1732.53L1290.77 2005.57"
        />
        <path
          ref={K513K514}
          className="cls-6"
          d="M1290.77 1672.66L1290.77 1732.53"
        />
        <path
          ref={K514K515}
          className="cls-6"
          d="M1290.77 1350.31L1290.77 1672.66"
        />
        <path
          ref={K516E5511}
          className="cls-6"
          d="M1372.14 2145.15L1360.14 2157.15"
        />
        <path
          ref={K511K516}
          className="cls-6"
          d="M1359.71 2157.02L1290.91 2088.21"
        />
        {/*
                    <path
                    ref={K511R521}
                    className="cls-6"
                    d="M1238.22 2087.03L1290.77 2087.03"
                />
                */}
        <path
          ref={K510R522}
          className="cls-6"
          d="M1238.29 2025.41L1290.77 2025.41"
        />
        <path
          ref={K512V51}
          className="cls-6"
          d="M1398.38 2005.37L1290.77 2005.37"
        />
        <path
          ref={K513E5701}
          className="cls-6"
          d="M1260.73 1732.53L1290.77 1732.53"
        />
        <path
          ref={K517E5591}
          className="cls-6"
          d="M1497.15 1879.48L1536.25 1885.43"
        />
        <path
          ref={K517E5512}
          className="cls-6"
          d="M1503.46 1918.22L1497.15 1879.76"
        />
        <path
          ref={K514K518}
          className="cls-6"
          d="M1320.74 1703.42L1290.72 1673.4"
        />
        <path
          ref={K519K518}
          className="cls-9"
          d="M1326.41 1709.09L1320.74 1703.42"
        />
        <path
          ref={K519K520}
          className="cls-6"
          d="M1363.68 1746.36L1326.41 1709.09"
        />
        <path
          ref={K520K517}
          className="cls-6"
          d="M1496.95 1879.63L1363.68 1746.36"
        />
        <path
          ref={K513K518}
          className="cls-6"
          d="M1291.37 1732.53L1320.61 1703.29"
        />
        <path
          ref={K519E5621}
          className="cls-6"
          d="M1352.52 1682.46L1326.15 1708.83"
        />
        <path
          ref={K520E5611}
          className="cls-6"
          d="M1389.92 1719.77L1363.5 1746.18"
        />
        <path
          ref={K515E5702}
          className="cls-6"
          d="M1260.71 1350.31L1290.18 1350.31"
        />
        <path
          ref={K52E5901}
          className="cls-6"
          d="M1345.75 1278.21L1327.07 1278.21"
        />
        <path
          ref={K52K515}
          className="cls-6"
          d="M1326.58 1278.71L1290.77 1350.05"
        />
        <path
          ref={K51E5902}
          className="cls-6"
          d="M1326.58 1086.94L1346.14 1086.94"
        />
        <path
          ref={K521D5571}
          className="cls-6"
          d="M1656.45 592.2L1639.01 574.76"
        />
        <path
          ref={K522K54}
          className="cls-6"
          d="M1430.73 782.86L1326.58 886.99"
        />
        <path
          ref={K522K523}
          className="cls-6"
          d="M1579.23 634.39L1430.73 782.86"
        />
        <path
          ref={K521K523}
          className="cls-6"
          d="M1638.41 575.23L1579.23 634.39"
        />
        <path
          ref={K522D5501}
          className="cls-6"
          d="M1448.55 800.69L1430.73 782.86"
        />
        <path
          ref={K523D5502}
          className="cls-6"
          d="M1597.83 651.81L1579.82 633.8"
        />
        <path
          ref={K57R511}
          className="cls-6"
          d="M1308.97 653.46L1326.58 653.46"
        />
        <path
          ref={K58K524}
          className="cls-6"
          d="M1432.58 520.79L1326.58 626.82"
        />
        <path
          ref={K524D5582}
          className="cls-6"
          d="M1534.86 418.47L1432.58 520.79"
        />
        <path
          ref={K524V52}
          className="cls-6"
          d="M1447.4 535.6L1432.58 520.79"
        />
        <path
          ref={K59D5691}
          className="cls-6"
          d="M1303.42 563.72L1326.58 563.72"
        />
        <path
          ref={K525K55}
          className="cls-6"
          d="M1272.35 806.97L1326.58 806.97"
        />
        <path
          ref={K525K526}
          className="cls-6"
          d="M1228.53 806.97L1272.35 806.97"
        />
        <path
          ref={K526K527}
          className="cls-6"
          d="M792.25 806.97L1228.53 806.97"
        />
        <path
          ref={K527K528}
          className="cls-6"
          d="M764.23 806.97L792.25 806.97"
        />
        <path
          ref={K528K529}
          className="cls-6"
          d="M579.38 806.97L764.23 806.97"
        />
        <path
          ref={K529K530}
          className="cls-6"
          d="M489.48 806.97L579.38 806.97"
        />
        <path ref={K530K531} className="cls-6" d="M384.623 806.97H489.48" />
        <path ref={K531K532} className="cls-6" d="M277.999 806.97h104.857" />
        <path
          ref={K55K522}
          className="cls-6"
          d="M1430.03 782.86L1327.3 806.97"
        />
        <path
          ref={K522K56}
          className="cls-6"
          d="M1430.23 782.65L1326.58 676.66"
        />
        <path
          ref={K525R512}
          className="cls-6"
          d="M1272.19 744.84L1272.19 806.97"
        />
        <path
          ref={K533H51}
          className="cls-6"
          d="M1247.85 909.06L1229.32 909.06"
        />
        <path
          ref={K526K533}
          className="cls-6"
          d="M1229.32 806.97L1229.32 908.09"
        />
        <path
          ref={K533K534}
          className="cls-6"
          d="M1229.32 909.68L1229.32 1003.96"
        />
        <path
          ref={K53K534}
          className="cls-6"
          d="M1230.25 1003.96L1326.58 1003.96"
        />
        <path
          ref={K534K51}
          className="cls-6"
          d="M1230.25 1004.95L1325.98 1086.94"
        />
        <path
          ref={K527C5921}
          className="cls-6"
          d="M791.92 776.09L791.92 806.97"
        />
        <path
          ref={K528K535}
          className="cls-6"
          d="M720.53 849.5L763.04 806.97"
        />
        <path
          ref={K535K536}
          className="cls-6"
          d="M671.22 898.82L720.53 849.5"
        />
        <path
          ref={K536K537}
          className="cls-6"
          d="M538.02 1032.07L671.22 898.82"
        />
        <path
          ref={C5571K537}
          className="cls-6"
          d="M483.31 1086.8L538.02 1032.07"
        />
        <path
          ref={K535C5651}
          className="cls-6"
          d="M734.83 863.24L720.81 849.22"
        />
        <path
          ref={K537C5652}
          className="cls-6"
          d="M552.21 1046.56L537.87 1032.21"
        />
        <path
          ref={K536K529}
          className="cls-6"
          d="M670.93 898.47L579.85 807.39"
        />
        <path ref={K530K538} className="cls-6" d="M397.9 900.71L490.4 808.2" />{" "}
        {/* 30-38 */}
        <path ref={K538K539} className="cls-6" d="M343.9 954.71L397.9 900.71" />
        <path
          ref={K539K540}
          className="cls-6"
          d="M280.93 1017.68L343.9 954.71"
        />
        <path
          ref={K540C5572}
          className="cls-6"
          d="M295.66 1036.97L278.65 1019.96"
        />
        <path
          ref={K538V53}
          className="cls-6"
          d="M414.42 918.05L397.49 901.12"
        />
        <path
          ref={K532C5901}
          className="cls-6"
          d="M275.44 776.06L275.44 806.97"
        />
        <path
          ref={K531C5922}
          className="cls-6"
          d="M385.24 776.11L385.24 806.97"
        />
      </g>
    </>
  );
}

export { RouteFinder, graph };

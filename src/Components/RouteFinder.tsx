import React, {useEffect, useRef, useState} from "react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

interface propTypes {
    update: paramObj;
    setModalOpen: Function;
    setModalContent: Function;
    setKeyWord: Function;
    marker: string;
    start: string;
    end: string;
}

interface paramObj {
    startNode: string;
    endNode: string;
}

// Setting the logic for each point so the algorithm knows from which point can you go to which
let graph: any = {
    // Hallways

    //Floor 7
    K71: {K72: 1, D7581: 1, D7591: 1},
    K72: {D7592: 1, K74: 1, K71: 1},
    K73: {K74: 1, D7582: 1},
    K74: {K73: 1, K72: 1, K75: 1},
    K75: {K74: 1, K76: 1, R71: 1},
    K76: {K75: 1, K77: 1, K710: 1},
    K77: {K76: 1, K78: 1, K79: 1, K710: 1},
    K78: {K77: 1, D7571: 1, D7511: 1},
    K79: {D7501: 1, K711: 1, K710: 1, K77: 1},
    K710: {K76: 1, K77: 1, K79: 1, K711: 1, K712: 1},
    K711: {K79: 1, K710: 1, K715: 1},
    K712: {K710: 1, K713: 1, R72: 1},
    K713: {K712: 1, K714: 1},
    K714: {K713: 1, K717: 1, H71: 1},
    K715: {K711: 1, K717: 1, K716: 1, E7901: 1},
    K716: {K715: 1, K718: 1, E7902: 1},
    K717: {K714: 1, K715: 1},
    K718: {K716: 1, K719: 1},
    K719: {K718: 1, K720: 1, E7701: 1},
    K720: {K719: 1, K721: 1, K722: 1},
    K721: {K720: 1, K723: 1, K724: 1, E7621: 1},
    K722: {K720: 1, K723: 1, E7702: 1},
    K723: {K721: 1, K722: 1, K726: 1},
    K724: {K721: 1, K725: 1, E7611: 1},
    K725: {K724: 1, E7591: 1, E7511: 1},
    K726: {K727: 1, K723: 1, V71: 1},
    K727: {K726: 1, K728: 1},
    K728: {K727: 1, E7512: 1},

    // Floor 2
    K21: {K22: 1, U21: 1, K23: 1},
    K22: {K21: 1, K23: 1, V21: 1},
    K23: {K21: 1, K22: 1, K24: 1, K26: 1},
    K24: {K23: 1, K25: 1, K28: 1},
    K25: {R21: 1, K24: 1},
    K26: {K23: 1, K27: 1, K29: 1},
    K27: {K28: 1, K26: 1, K29: 1},
    K28: {K24: 1, K27: 1, H21: 1},
    K29: {K26: 1, K27: 1, K213: 1},
    K210: {K212: 1, K211: 1, PUKKARI: 1},
    K211: {K210: 1, K214: 1},
    K212: {K213: 1, K221: 1, K210: 1},
    K213: {K29: 1, K221: 1, K212: 1},
    K214: {K211: 1, K215: 1, V23: 1},
    K215: {K214: 1, K216: 1, R22: 1},
    K216: {K215: 1, K217: 1, R23: 1},
    K217: {K218: 1, K216: 1, K220: 1},
    K218: {K217: 1, K220: 1, K219: 1},
    K219: {K218: 1, E2041: 1, V22: 1},
    K220: {RUOKALA: 1, K218: 1, K217: 1},
    K221: {K212: 1, K213: 1, E2042: 1},

    // classrooms
    // Floor 7
    D7591: {K71: 1},
    D7592: {K72: 1},
    D7581: {K71: 1},
    D7582: {K73: 1},
    D7571: {K78: 1},
    D7511: {K78: 1},
    D7501: {K79: 1},
    E7901: {K715: 1},
    E7902: {K716: 1},
    E7701: {K719: 1},
    E7621: {K721: 1},
    E7702: {K722: 1},
    E7611: {K724: 1},
    E7591: {K725: 1},
    E7511: {K725: 1},
    E7512: {K728: 1},
    // Floor 2
    E2041: {K219: 1},
    E2042: {K221: 1},

    // Elevators
    // Floor 7
    H71: {K714: 1, H21: 1},
    // Floor 2
    H21: {K28: 1, H71: 1},

    // Toilets
    // Floor 7
    V71: {K726: 1},
    // Floor 2
    V21: {K22: 1},
    V22: {K219: 1},
    V23: {K214: 1},

    // Stairs
    // Floor 7
    R71: {K75: 1, R21: 1},
    R72: {K712: 1, R21: 1},
    // Floor 2
    R21: {K25: 1, R71: 1, R72: 1},
    R22: {K215: 1},
    R23: {K216: 1},

    // Uniques
    RUOKALA: {K220: 1},
    U21: {K21: 1},
    PUKKARI: {K210: 1},
};

function RouteFinder({
                         setModalOpen,
                         setModalContent,
                         setKeyWord,
                         update,
                         marker,
                         start,
                         end,
                     }: propTypes) {
    const classes7: any = useRef();

    // Making refs to all the lines from svg so we can use them later to display and hide lines by their id
    const D7592K72: any = useRef();
    const K71K72: any = useRef();
    const D7591K71: any = useRef();
    const D7581K71: any = useRef();
    const K73K74: any = useRef();
    const D7582K73: any = useRef();
    const K72K74: any = useRef();
    const K74K75: any = useRef();
    const K75R71: any = useRef();
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
    const K712R72: any = useRef();
    const K712K713: any = useRef();

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
    const K216R23: any = useRef();
    const K215R22: any = useRef();
    const K214V23: any = useRef();
    const K210PUKKARI: any = useRef();
    const K212K221: any = useRef();
    const K213K221: any = useRef();
    const K221E2042: any = useRef();
    const K22K23: any = useRef();
    const K218K220: any = useRef();
    const K29K27: any = useRef();

    // Between floors
    const R21R71: any = useRef();
    const R21R72: any = useRef();
    const H21H71: any = useRef();

    // Putting all lines to Object so we can iterate trough them and get lines by their id
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
        K75R71: K75R71,
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
        K712R72: K712R72,

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
        K216R23: K216R23,
        K215R22: K215R22,
        K214V23: K214V23,
        K210PUKKARI: K210PUKKARI,
        K212K221: K212K221,
        K213K221: K213K221,
        K221E2042: K221E2042,
        K22K23: K22K23,
        K218K220: K218K220,
        K29K27: K29K27,

        // Between floors
        R21R71: R21R71,
        R21R72: R21R72,
        H21H71: H21H71,
    };

    const [floorSelect, setFloorSelect] = useState(2);

    // Get vector length by it's id
    let lengthGetter = (id: any) => {
        console.log(id)
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
    let findShortestPath = (graph: any, startNode: string, endNode: string) => {
        // track distances from the start node using a hash object
        let distances: any = {};
        distances[endNode] = "Infinity";
        distances = Object.assign(distances, graph[startNode]);
        // track paths using a hash object
        let parents: any = {endNode: null};
        for (let child in graph[startNode]) {
            parents[child] = startNode;
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
                if (String(child) === String(startNode)) {
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
        let shortestPath: string[] = [endNode];
        let parent = parents[endNode];
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
            distance: distances[endNode],
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
                findShortestPath(graph, start, end);
            } catch (error: any) {
                console.log(error.message);
            }
        })();
    }, [start, end]);

    const returnShortestPath = (from: string, to: string) => {
        objIterator(graph);
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
        objIterator(graph);

        const shortestRoute = data.reduce(function (prev, curr) {
            return prev.length < curr.length ? prev : curr;
        });
        console.log(data);
        console.log(shortestRoute);
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
                <path
                    ref={R21R71}
                    className="cls-6"
                    d="M206.95 749.19L206.95 788.23"
                />
                <path
                    ref={R21R72}
                    className="cls-6"
                    d="M206.95 749.19L206.95 788.23"
                />
                <path
                    ref={H21H71}
                    className="cls-6"
                    d="M206.95 749.19L206.95 788.23"
                />
            </g>

            {/* Floor 2*/}
            <g display="none" id="_2_drawn_base">
                <g id="walls">
                    <path className="cls-1" d="M1140.84 2063.79L1237.76 2063.79"/>
                    <path
                        className="cls-2"
                        d="M1518.12 1870.34L1564.53 1916.75 1575.35 1905.94 1606.36 1936.95"
                    />
                    <path
                        className="cls-2"
                        d="M1433.98 2046.78L1351.3 2129.46 1327.57 2105.72"
                    />
                    <path className="cls-3" d="M1505.59 1975.17L1523.39 1957.37"/>
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
                    <path className="cls-4" d="M740.88 603.21L901.1 603.21"/>
                </g>
                <g id="toilets">
                    <path className="cls-3" d="M335.26 699.61H416V774.25H335.26z"/>
                    <path
                        className="cls-3"
                        d="M1477.24 1911.21L1459.43 1929.02 1505.59 1975.17 1433.98 2046.78 1411.04 2023.83 1327.17 2023.83 1327.17 1983.48 1308.97 1983.48 1308.97 1911.21 1477.24 1911.21z"
                    />
                    <path
                        className="cls-3"
                        d="M1275.74 1218.38L1275.74 1306.2 1388.09 1417.76 1388.09 1826.82 1308.97 1747.7 1308.97 1848.18 1275.74 1848.18 1275.74 1821.28 1252.01 1821.28 1252.01 1796.75 1227.48 1796.75 1227.48 1612.4 1264.66 1612.4 1264.66 1541.19 1227.48 1541.19 1227.48 1306.2 1275.74 1306.2"
                    />
                </g>
                <g id="stairsElevator">
                    <path
                        className="cls-1"
                        d="M1308.97 744.84L1079.52 744.84 1079.52 603.21 1144.4 603.21 1144.4 632.88 1308.97 632.88 1308.97 744.84z"
                    />
                    <path className="cls-1" d="M1247.65 824.75H1308.97V993.28H1247.65z"/>
                    <path
                        className="cls-1"
                        d="M1140.84 1981.9H1238.29V2242.21H1140.84z"
                    />
                </g>
                <g id="doors">
                    <path className="cls-8" d="M1275.72 1271.79L1275.76 1253.98"/>
                    <path className="cls-8" d="M1316.61 1320.17L1329.23 1307.6"/>
                    <path className="cls-8" d="M1264.6 1566.37L1264.63 1548.56"/>
                    <path className="cls-8" d="M1264.62 1602.19L1264.65 1584.38"/>
                    <path className="cls-8" d="M1238.24 2050.41L1238.35 1996.61"/>
                    <path className="cls-8" d="M1238.33 2093.26L1238.36 2075.45"/>
                    <path className="cls-8" d="M1334.81 2242.26L1279.84 2242.15"/>
                    <path className="cls-8" d="M1308.95 1975.17L1308.99 1957.36"/>
                    <path className="cls-8" d="M1247.5 987.59L1247.81 830.53"/>
                    <path className="cls-8" d="M1298.09 744.87L1247.32 744.77"/>
                    <path className="cls-8" d="M877.3 516.63L826.53 516.53"/>
                    <path className="cls-8" d="M817.96 516.68L767.19 516.58"/>
                    <path className="cls-8" d="M415.98 722.79L416.01 704.98"/>
                    <path className="cls-8" d="M415.99 769.07L416.03 751.26"/>
                    <path className="cls-8" d="M1558.43 1910.67L1545.86 1898.05"/>
                    <path className="cls-8" d="M1476.57 1945.91L1464 1933.29"/>
                    <path className="cls-8" d="M1500.57 1969.99L1488 1957.37"/>
                    <path className="cls-8" d="M877.3 603.24L826.53 603.14"/>
                    <path className="cls-8" d="M817.96 603.29L767.19 603.19"/>
                </g>
            </g>
            <g display="none" id="_2_routes">
                <path ref={V21K22} className="cls-6" d="M429.94 740.49L851.92 740.49"/>
                <path ref={U21K21} className="cls-6" d="M851.92 537.15L851.92 619.43"/>
                <path ref={K21K22} className="cls-6" d="M851.92 620.71L851.92 740.14"/>
                <path ref={K21K23} className="cls-6" d="M852.73 620.71L1014.2 782.18"/>
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
                <path
                    ref={K216R23}
                    className="cls-6"
                    d="M1269.86 2084.75L1238.36 2084.75"
                />
                <path
                    ref={K215R22}
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

            {/* Floor 7*/}
            <g id="Layer_3">
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
                    <path
                        className="cls-5"
                        id="D7581"
                        d="M419.79 114.91L323.52 211.17 231.74 211.17 231.74 280.4 244.2 292.86 237.54 299.52 237.54 339.25 288.46 339.25 338.91 288.8 510.51 460.4 632.03 338.88 420.05 126.91 419.79 114.91z"
                    ></path>

                    <path
                        className="cls-5"
                        id="D7591"
                        d="M237.54 299.52L237.54 616.47 70.14 616.47 70.33 280.4 231.74 280.4 244 292.67 237.38 299.29"
                    />

                    <path
                        className="cls-5"
                        id={"E7611"}
                        transform="rotate(-45 1007.959 3229.49)"
                        d="M1629.96 1646.12h352.47v229.52h-352.47z"
                    />

                    <path
                        className="cls-5"
                        id={"E7621"}
                        d="M416.49 1259.92l-170.31 170.3v157.85l81.99 81.99 249.13-249.13-160.81-161.01z"
                    />

                    <path
                        className="cls-5"
                        id={"E7591"}
                        transform="rotate(-45 1200.5 3370.337)"
                        d="M1859.06 1780.75h279.36v241.97h-279.36z"
                    />

                    <path
                        className="cls-5"
                        id={"E7511"}
                        d="M713.26 1951.76l-297.89 297.89-121.78-121.78 101.14-101.14v-38.24h40.35l157.45-157.45 120.73 120.72z"
                    />

                    <path
                        className="cls-5"
                        id={"E7901"}
                        d="M416.19 1257.64L371 1302.84 280.9 1302.84 280.9 1068.15 373.57 1068.15 416.21 1110.79 416.19 1257.64z"
                    />

                    <path
                        className="cls-5"
                        id={"D7501"}
                        d="M333.2 853.16L407 779.65 577.17 949.83 416.55 1110.44 307.3 1001.19 307.3 878.95 320.58 865.72"
                    />

                    <path
                        className="cls-5"
                        id={"D7511"}
                        transform="rotate(-45 1060.841 2372.885)"
                        d="M1725.09 783.96H1993.08V1024.6H1725.09z"
                    />

                    <path
                        className="cls-5"
                        id={"D7571"}
                        d="M618.12 568.27L596.36 590.03 766.65 760.32 910.05 616.91 632.03 338.88 510.38 460.53 618.12 568.27z"
                    />

                    <path
                        className="cls-5"
                        id={"E7701"}
                        d="M72.97 1332.58L196.4 1332.58 196.4 1754.82 73.5 1754.82 72.97 1332.58z"
                    />
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
                    <path className="cls-1" d="M73.1 2069.32H172.79V2254.27H73.1z"/>
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
                    <path className="cls-7" d="M458.42 1963.04L244.43 1749.05"/>
                    <path className="cls-7" d="M262.01 2028.58L392.75 2028.58"/>
                    <path
                        className="cls-7"
                        d="M262.2 2110.27L286.43 2134.5 293.32 2127.61"
                    />
                    <path
                        className="cls-7"
                        d="M173.19 2254.34L173.19 1986.12 196.93 1986.12 196.93 1311.21 170.82 1311.21 118.47 1258.86 73.24 1258.86"
                    />
                    <path className="cls-7" d="M243.61 667.2L243.61 752.36 73.1 752.36"/>
                    <path className="cls-7" d="M243.61 665.32L243.61 667.2"/>
                    <path className="cls-7" d="M243.61 644.95L243.61 645.35"/>
                    <path className="cls-7" d="M243.61 643.96L243.61 644.95"/>
                    <path
                        className="cls-7"
                        d="M237.54 615.48L243.61 615.48 243.61 636.84 243.61 643.96"
                    />
                </g>
                <g id="doors">
                    <path className="cls-8" d="M320.58 865.72L333.2 853.16"/>
                    <path className="cls-8" d="M421.81 764.87L434.43 752.3"/>
                    <path className="cls-8" d="M607.55 557.69L594.98 545.07"/>
                    <path className="cls-8" d="M479.65 429.84L467.08 417.23"/>
                    <path className="cls-8" d="M274.64 339.31L256.83 339.28"/>
                    <path className="cls-8" d="M237.53 391.44L237.56 373.63"/>
                    <path className="cls-8" d="M237.51 576.56L237.55 558.75"/>
                    <path className="cls-8" d="M243.58 662.74L243.61 644.93"/>
                    <path className="cls-8" d="M215.74 752.36L197.93 752.32"/>
                    <path className="cls-8" d="M178.03 988.19L178.55 857.27"/>
                    <path className="cls-8" d="M316.69 1658.96L304.12 1646.34"/>
                    <path className="cls-8" d="M196.71 1383.3L196.75 1365.49"/>
                    <path className="cls-8" d="M280.88 1288.06L280.91 1270.25"/>
                    <path className="cls-8" d="M280.98 1095.7L281.01 1077.89"/>
                    <path className="cls-8" d="M196.71 1723.52L196.75 1705.71"/>
                    <path className="cls-8" d="M173.31 2097.42L173.34 2079.61"/>
                    <path className="cls-8" d="M316.95 2151.14L304.38 2138.53"/>
                    <path className="cls-8" d="M562.29 1800.79L549.72 1788.17"/>
                    <path className="cls-8" d="M353.54 1695.8L340.97 1683.19"/>
                    <path className="cls-8" d="M512.18 1908.96L524.8 1896.39"/>
                </g>
            </g>
            <g id="Layer_2">
                <path
                    ref={D7592K72}
                    className="cls-6"
                    d="M236.49 567.21L263.39 567.21"
                />
                <path ref={K71K72} className="cls-6" d="M265.62 385.24L265.62 567.08"/>
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
                <path ref={K73K74} className="cls-6" d="M401.39 495.28L264.77 631.9"/>
                <path
                    ref={D7582K73}
                    className="cls-6"
                    d="M473.85 422.82L401.39 495.28"
                />
                <path ref={K72K74} className="cls-6" d="M264.97 569.59L264.97 630.64"/>
                <path ref={K74K75} className="cls-6" d="M264.97 630.59L264.97 654.64"/>
                <path ref={K75R71} className="cls-6" d="M262.6 653.85L243.21 653.85"/>
                <path ref={K75K76} className="cls-6" d="M264.97 657.41L264.97 696.18"/>
                <path ref={K76K77} className="cls-6" d="M264.97 695.79L359.72 790.53"/>
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
                <path ref={K78K77} className="cls-6" d="M360.31 791.92L409.96 742.27"/>
                <path
                    ref={D7501K79}
                    className="cls-6"
                    d="M310.01 842.09L327.28 859.37"
                />
                <path ref={K77K79} className="cls-6" d="M358.34 793.63L311.06 840.91"/>
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
                <path ref={K714H71} className="cls-6" d="M176.36 910.6L158.95 910.6"/>
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
                    ref={K726K727}
                    className="cls-6"
                    d="M216.97 2009.32L216.97 2088.45 214.34 2087.92 173.19 2087.92"
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
                    ref={K712R72}
                    className="cls-6"
                    d="M206.95 749.19L206.95 788.23"
                />
            </g>
        </>
    );
}

export {RouteFinder, graph};

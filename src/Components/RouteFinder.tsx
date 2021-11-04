import testSVG from '../../public/testSVG.svg';
import React, {useEffect, useRef, useState} from "react";
import {SvgIcon} from "@material-ui/core";


function RouteFinder() {
    // Get vector length by it's id
    let lengthGetter = (id: any) => {
        const divElement: SVGGeometryElement = lines[id].current;
        return divElement.getTotalLength()
    };

    // Setting the logic for each point so the algorithm knows from which point can you go to which
    let graph: any = {
        K1: {K2: 1, D7581: 1, D7591: 1},
        K2: {D7592: 1, K4: 1},
        K3: {K4: 1, D7582: 1},
        K4: {K3: 1, K2: 1, K5: 1},
        K5: {K4: 1, K6: 1, R1: 1},
        K6: {K5: 1, K7: 1, K10: 1},
        K7: {K6: 1, K8: 1, K9:1, K10: 1},
        K8: {K7: 1, D7571: 1, D7511: 1},
        K9: {D7501: 1, K11: 1, K10: 1, K7: 1},
        K10: {K6: 1, K7: 1, K9: 1, K11: 1},
        K11: {K9: 1, K10: 1},
        D7591: {K1: 1},
        D7592: {K2: 1},
        D7581: {K1: 1},
        D7582: {K3: 1},
        D7571: {K8: 1},
        D7511: {K8: 1},
        D7501: {K9: 1},

    };

    // Making refs to all the lines from svg so we can use them later to display and hide lines by their id
    const D7592K2: any = useRef();
    const K1K2: any = useRef();
    const D7591K1: any = useRef();
    const D7581K1: any = useRef();
    const K3K4: any = useRef();
    const D7582K3: any = useRef();
    const K2K4: any = useRef();
    const K4K5: any = useRef();
    const K5R1: any = useRef();
    const K5K6: any = useRef();
    const K6K7: any = useRef();
    const D7571K8: any = useRef();
    const D7511K8: any = useRef();
    const K8K7: any = useRef();
    const D7501K9: any = useRef();
    const K7K9: any = useRef();
    const K6K10: any = useRef();
    const K7K10: any = useRef();
    const K11K10: any = useRef();
    const K9K11: any = useRef();
    const K9K10: any = useRef();
    const K10K12: any = useRef();
    const K10K13: any = useRef();
    const K13K14: any = useRef();
    const K14H1: any = useRef();
    const K11K15: any = useRef();
    const K15E7901: any = useRef();
    const K15K16: any = useRef();
    const K16E7902: any = useRef();
    const K14K17: any = useRef();
    const K17K15: any = useRef();
    const K18K16: any = useRef();
    const K19K18: any = useRef();
    const E7701K19: any = useRef();
    const K19K20: any = useRef();
    const K20K21: any = useRef();
    const K21E7621: any = useRef();
    const K22E7702: any = useRef();
    const K20K22: any = useRef();
    const K21K23: any = useRef();
    const K22K23: any = useRef();
    const K21K24: any = useRef();
    const E7611K24: any = useRef();
    const K24K25: any = useRef();
    const K25E7591: any = useRef();
    const K25E7511: any = useRef();
    const K23K26: any = useRef();
    const K26V1: any = useRef();
    const K26K27: any = useRef();
    const K27K28: any = useRef();
    const K28E7512: any = useRef();
    const K12R2: any = useRef();

    // Putting all lines to Object so we can iterate trough them and get lines by their id
    const lines: any = {
        D7592K2: D7592K2,
        K1K2: K1K2,
        D7591K1: D7591K1,
        D7581K1: D7581K1,
        K3K4: K3K4,
        D7582K3: D7582K3,
        K2K4: K2K4,
        K4K5: K4K5,
        K5R1: K5R1,
        K5K6: K5K6,
        K6K7: K6K7,
        D7571K8: D7571K8,
        D7511K8: D7511K8,
        K8K7: K8K7,
        D7501K9: D7501K9,
        K7K9: K7K9,
        K6K10: K6K10,
        K7K10: K7K10,
        K11K10: K11K10,
        K9K11: K9K11,
        K9K10: K9K10,
        K10K12: K10K12,
        K10K13: K10K13,
        K13K14: K13K14,
        K14H1: K14H1,
        K11K15: K11K15,
        K15E7901: K15E7901,
        K15K16: K15K16,
        K16E7902: K16E7902,
        K14K17: K14K17,
        K17K15: K17K15,
        K18K16: K18K16,
        K19K18: K19K18,
        E7701K19: E7701K19,
        K19K20: K19K20,
        K20K21: K20K21,
        K21E7621: K21E7621,
        K22E7702: K22E7702,
        K20K22: K20K22,
        K21K23: K21K23,
        K22K23: K22K23,
        K21K24: K21K24,
        E7611K24: E7611K24,
        K24K25: K24K25,
        K25E7591: K25E7591,
        K25E7511: K25E7511,
        K23K26: K23K26,
        K26V1: K26V1,
        K26K27: K26K27,
        K27k28: K27K28,
        K28E7512: K28E7512,
        K12R2: K12R2,
    }

    // Iterate trough object and change the line lengths to match the vectors' lengths
    let objIterator = (obj: Object) => {
        for (const [key, value] of Object.entries(obj)) {
            let tempObj: any = {};
            for (let [key1, value1] of Object.entries(value)) {
                const temp = key + key1;
                const temp2 = key1 + key
                if (Object.keys(lines).includes(temp)) {
                    value1 = lengthGetter(temp);
                } else value1 = lengthGetter(temp2)
                //Set length property of lines
                tempObj[key1] = value1;
            }
            graph[key] = tempObj;
        }
        console.log(graph)
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
        distances[endNode] = 'Infinity';
        distances = Object.assign(distances, graph[startNode]);
        // track paths using a hash object
        let parents: any = {endNode: null};
        for (let child in graph[startNode]) {
            parents[child] = startNode;
        }

        // collect visited nodes
        let visited: string[] = []
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
            let tempString: string = shortestPath[i]
            let tempString1: string = shortestPath[i + 1]
            let finalName: string
            let tempName: any = tempString.concat(tempString1)
            let tempName1: any = tempString1.concat(tempString)
            // Check line name both ways ea. AB and BA to find the line
            if (Object.keys(lines).includes(tempName)) {
                finalName = tempName;
            } else finalName = tempName1
            const divElement: SVGGeometryElement = lines[finalName].current;
            // Make lines on the shortest path visible
            divElement.style.visibility = "visible"
        }
        // this is the shortest path
        let results = {
            distance: distances[endNode],
            path: shortestPath,
        };
        console.log(results);
        // Log the shortest path & the end node's distance from the start node
    };

    useEffect(() => {
        (async () => {
            try {
                objIterator(graph);
                findShortestPath(graph, "K11", "D7582")
            } catch (error: any) {
                console.log(error.message);
            }
        })();
    }, []);

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 912.36 2255.97"
            >
                <defs>
                    <style>
                        {
                            ".cls-1,.cls-2{fill:#b1b1b1}.cls-2,.cls-3,.cls-4,.cls-5,.cls-6{stroke:#7f7f7f;stroke-width:3px}.cls-2,.cls-3,.cls-4,.cls-5,.cls-6,.cls-9{stroke-linecap:round;stroke-linejoin:round}.cls-3,.cls-9{fill:none}.cls-4{fill:#00aeef}.cls-5{fill:#ffc60b}.cls-6,.cls-7{fill:#ec008c}.cls-8{fill:#fff;stroke:#f55;stroke-miterlimit:10;stroke-width:4px}.cls-9{stroke:#ee2d2b;stroke-width:8px}"
                        }
                    </style>
                </defs>
                <g id="Layer_3">
                    <g id="etc">
                        <path
                            className="cls-1"
                            d="M70.07 616.27L243.35 616.27 243.35 636.84 70.33 636.84 70.07 616.27z"
                        />
                        <path
                            className="cls-1"
                            d="M232 210.97L323.42 210.97 420.17 114.23 420.17 1.5 232.53 1.5 232 210.97z"
                        />
                        <path
                            className="cls-2"
                            d="M1560.7 473.64v234.19l118.68-118.68-11.2-11.21 48.82-48.79-105.79-105.75s-50.51 50.34-50.51 50.24z"
                            transform="translate(-1272.26 -134.29)"
                        />
                        <path
                            className="cls-2"
                            d="M531.02 481.37L386.52 625.86 340.93 580.27 306.71 614.49 306.71 701.98 359.56 754.83 581.98 532.4 530.98 481.4"
                        />
                        <path
                            className="cls-3"
                            d="M582.25 532.14L359.46 754.93 306.51 701.98 306.51 614.29 485.19 435.61"
                        />
                        <path
                            className="cls-2"
                            d="M327.48 1021.57L280.9 1068.15 373.57 1068.15 327.48 1021.57z"
                        />
                        <path
                            className="cls-2"
                            d="M1553.15 1437.13l44.95 44.95 45.05-45z"
                            transform="translate(-1272.26 -134.29)"
                        />
                        <path
                            className="cls-1"
                            d="M73.37 1259.26L73.37 1332.31 196.66 1332.31 196.66 1311.35 170.82 1311.35 118.47 1258.99 73.37 1259.26"
                        />
                        <path
                            className="cls-2"
                            d="M73.1 1986.12L73.1 2069.32 172.8 2069.32 172.8 1986.12"
                        />
                        <path
                            className="cls-1"
                            d="M1778.35 2048.74l-213-213-48 48v166.82h165.49l46.82 46.81s48.2-49.13 48.69-48.63z"
                            transform="translate(-1272.26 -134.29)"
                        />
                        <path
                            className="cls-2"
                            d="M288.02 2254.07L288.02 2197.9 325.81 2160.1 415.04 2249.32 409.9 2254.47 288.02 2254.07z"
                        />
                    </g>
                    <g id="classes">
                        <path
                            className="cls-4"
                            d="M419.79 114.91L323.52 211.17 231.74 211.17 231.74 280.4 244.2 292.86 237.54 299.52 237.54 339.25 288.46 339.25 338.91 288.8 510.51 460.4 632.03 338.88 420.05 126.91 419.79 114.91z"
                        />
                        <path
                            className="cls-4"
                            d="M237.54 299.52L237.54 616.47 70.14 616.47 70.33 280.4 231.74 280.4 244 292.67 237.38 299.29"
                        />
                        <path
                            className="cls-4"
                            d="M1985.58 2086.12l197.54-197.54s-492.39-496.35-494.37-494.37l-170.31 170.31v157.84l244.29 244.29 51.69-51.69 49.18 49.18 122 122-122-122-158.6 158.64h-38V2161l-101.14 101.14 32.22 32.23 89.56 89.55 297.95-297.82"
                            transform="translate(-1272.26 -134.29)"
                        />
                        <path
                            className="cls-4"
                            d="M416.19 1257.64L371 1302.84 280.9 1302.84 280.9 1068.15 373.57 1068.15 416.21 1110.79 416.19 1257.64z"
                        />
                        <path
                            className="cls-4"
                            d="M333.2 853.16L407 779.65 577.17 949.83 416.55 1110.44 307.3 1001.19 307.3 878.95 320.58 865.72"
                        />
                        <path
                            className="cls-4"
                            transform="rotate(-45 1060.841 2372.885)"
                            d="M1725.09 783.96H1993.08V1024.6H1725.09z"
                        />
                        <path
                            className="cls-4"
                            d="M618.12 568.27L596.36 590.03 766.65 760.32 910.05 616.91 632.03 338.88 510.38 460.53 618.12 568.27z"
                        />
                        <path
                            className="cls-4"
                            d="M196.4 1869.54L196.4 1986.12 73.1 1986.12 73.1 1869.54"
                        />
                        <path
                            className="cls-4"
                            d="M196.4 1754.82L196.4 1869.54 73.5 1869.54 73.5 1754.82"
                        />
                        <path
                            className="cls-4"
                            d="M72.97 1332.58L196.4 1332.58 196.4 1754.82 73.5 1754.82 72.97 1332.58z"
                        />
                    </g>
                    <g id="toilets">
                        <path
                            className="cls-5"
                            d="M340.93 580.27L386.52 625.86 531.02 481.37 485.27 435.63 340.93 580.27z"
                        />
                        <path
                            className="cls-5"
                            d="M244.2 1916.42L411.61 1916.42 457.86 1962.68 432.38 1988.16 244.1 1988.16 244.2 1916.42z"
                        />
                    </g>
                    <g id="stairs_elevator">
                        <path
                            className="cls-6"
                            d="M69.94 636.84L69.94 605.06 1.5 605.06 1.5 752.36 243.61 752.36 243.61 662.42 243.61 646.34 243.61 636.84 69.94 636.84 69.94 616.27"
                        />
                        <path
                            className="cls-6"
                            d="M178.73 829.37L244.93 829.37 244.93 998.16 177.94 998.16 178.73 829.37z"
                        />
                        <path className="cls-7" d="M73.1 2069.32H172.79V2254.27H73.1z"/>
                    </g>
                    <g id="walls">
                        <path
                            className="cls-3"
                            d="M416.49 1110.38L416.49 1259.92 910.8 1754.22 410.75 2254.27 73.1 2254.27 73.1 752.36 1.5 752.36 1.5 605.19 70.33 605.19 70.33 280.4 232.14 280.4 232.14 1.5 420.05 1.5 420.05 126.91 910.2 617.06 577.17 949.83 416.49 1110.38z"
                        />
                        <path
                            className="cls-3"
                            d="M485.19 435.61L510.25 460.67 632.03 338.88 420.05 126.91 420.05 1.5 232.14 1.5 232.14 280.4 244.4 292.67 237.54 299.52 237.54 339.35 288.44 339.35 338.95 288.84 485.19 435.61z"
                        />
                        <path
                            className="cls-3"
                            d="M70.33 605.19L70.07 616.27 237.54 616.27 237.54 339.35"
                        />
                        <path
                            className="cls-3"
                            d="M325.85 1347.79L244.8 1428.84 244.8 1588.07 327.48 1670.75 577.3 1420.93"
                        />
                        <path
                            className="cls-3"
                            d="M327.48 1670.75L489.77 1833.05 542.16 1780.66 739.7 1583.13"
                        />
                        <path
                            className="cls-3"
                            d="M506.69 1914.84L292.67 1700.82 244.1 1749.38 244.1 1988.22 394.73 1988.22"
                        />
                        <path className="cls-3" d="M458.42 1963.04L244.43 1749.05"/>
                        <path className="cls-3" d="M262.01 2028.58L392.75 2028.58"/>
                        <path
                            className="cls-3"
                            d="M262.2 2110.27L286.43 2134.5 293.32 2127.61"
                        />
                        <path
                            className="cls-3"
                            d="M173.19 2254.34L173.19 1986.12 196.93 1986.12 196.93 1311.21 170.82 1311.21 118.47 1258.86 73.24 1258.86"
                        />
                        <path className="cls-3" d="M243.61 667.2L243.61 752.36 73.1 752.36"/>
                        <path className="cls-3" d="M243.61 665.32L243.61 667.2"/>
                        <path className="cls-3" d="M243.61 644.95L243.61 645.35"/>
                        <path className="cls-3" d="M243.61 643.96L243.61 644.95"/>
                        <path
                            className="cls-3"
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
                    <path ref={D7592K2} className="cls-9" d="M236.49 567.21L263.39 567.21" />
                    <path ref={K1K2} className="cls-9" d="M265.62 385.24L265.62 567.08" />
                    <path ref={D7591K1} className="cls-9" d="M237.28 382.47L263.39 382.47" />
                    <path ref={D7581K1} className="cls-9" d="M265.63 340.14L265.63 382.47" />
                    <path ref={K3K4} className="cls-9" d="M401.39 495.28L264.77 631.9" />
                    <path ref={D7582K3} className="cls-9" d="M473.85 422.82L401.39 495.28" />
                    <path ref={K2K4} className="cls-9" d="M264.97 569.59L264.97 630.64"  />
                    <path ref={K4K5} className="cls-9" d="M264.97 630.59L264.97 654.64" />
                    <path ref={K5R1} className="cls-9" d="M262.6 653.85L243.21 653.85" />
                    <path ref={K5K6} className="cls-9" d="M264.97 657.41L264.97 696.18" />
                    <path ref={K6K7} className="cls-9" d="M264.97 695.79L359.72 790.53" />
                    <path ref={D7571K8} className="cls-9" d="M600.84 552.18L413.92 739.1" />
                    <path ref={D7511K8} className="cls-9" d="M427.96 757.9L414.91 744.84" />
                    <path ref={K8K7} className="cls-9" d="M360.31 791.92L409.96 742.27" />
                    <path ref={D7501K9} className="cls-9" d="M310.01 842.09L327.28 859.37" />
                    <path ref={K7K9} className="cls-9" d="M358.34 793.63L311.06 840.91" />
                    <path ref={K6K10} className="cls-9" d="M264.45 698.03L264.45 784.01" />
                    <path ref={K7K10} className="cls-9" d="M263.92 788.75L356.75 788.75" />
                    <path ref={K11K10} className="cls-9" d="M263.92 791.39L263.92 878.95" />
                    <path ref={K9K11} className="cls-9" d="M306.64 844.66L263.39 887.92" />
                    <path ref={K9K10} className="cls-9" d="M308.09 840.97L266.55 791.92" />
                    <path ref={K10K12} className="cls-9" d="M207.21 789.81L261.81 789.81"  />
                    <path ref={K10K13} className="cls-9" d="M156.31 789.81L207.21 789.81" />
                    <path ref={K13K14} className="cls-9" d="M155.79 791.92L155.79 911.13" />
                    <path ref={K14H1} className="cls-9" d="M176.36 910.6L158.95 910.6" />
                    <path ref={K11K15} className="cls-9" d="M263.92 883.17L263.92 1088.88" />
                    <path ref={K15E7901} className="cls-9" d="M281.32 1086.77L264.45 1086.77" />
                    <path ref={K15K16} className="cls-9" d="M263.92 1277.72L263.92 1090.99" />
                    <path ref={K16E7902} className="cls-9" d="M281.85 1278.78L263.92 1279.3 263.92 1277.72" />
                    <path ref={K14K17} className="cls-9" d="M155.79 914.29L155.79 1082.55" />
                    <path ref={K17K15} className="cls-9" d="M259.7 1086.77L155.26 1086.77" />
                    <path ref={K18K16} className="cls-9" d="M262.86 1281.41L220.4 1323.87" />
                    <path ref={K19K18} className="cls-9" d="M219.61 1326.77L219.61 1374.25" />
                    <path ref={E7701K19} className="cls-9" d="M196.93 1374.25L217.5 1374.25" />
                    <path ref={K19K20} className="cls-9" d="M219.08 1376.36L219.08 1603.7" />
                    <path ref={K20K21} className="cls-9" d="M218.55 1600.01L292.66 1674.12" />
                    <path ref={K21E7621} className="cls-9" d="M309.81 1652.75L291.08 1671.48" />
                    <path ref={K20K22} className="cls-9" d="M218.55 1605.81L218.55 1712.88" />
                    <path ref={K22E7702} className="cls-9" d="M196.93 1713.94L216.97 1713.94" />
                    <path ref={K21K23} className="cls-9" d="M293.46 1677.02L219.08 1751.39"  />
                    <path ref={K22K23} className="cls-9" d="M218.03 1716.05L218.03 1749.28" />
                    <path ref={K21K24} className="cls-9" d="M295.57 1678.07L327.48 1709.98" />
                    <path ref={E7611K24} className="cls-9" d="M346.73 1690.2L329.06 1707.87" />
                    <path ref={K24K25} className="cls-9" d="M329.32 1711.83L482.03 1864.53" />
                    <path ref={K25E7591} className="cls-9" d="M483.87 1866.91L554.82 1795.96" />
                    <path ref={K25E7511} className="cls-9" d="M485.98 1868.49L519.74 1902.25" />
                    <path ref={K23K26} className="cls-9" d="M218.03 1754.03L218.03 2007.21" />
                    <path ref={K26V1} className="cls-9" d="M220.66 2006.69L326.16 2006.69" />
                    <path ref={K26K27} className="cls-9" d="M216.97 2009.32L216.97 2088.45 214.34 2087.92 173.19 2087.92" />
                    <path ref={K27K28} className="cls-9" d="M216.97 2091.08L216.97 2159.13" />
                    <path ref={K28E7512} className="cls-9" d="M220.14 2158.6L296.62 2158.6 298.73 2157.02 312.18 2143.57" />
                    <path ref={K12R2} className="cls-9" d="M206.95 749.19L206.95 788.23" />
                </g>
            </svg>
        </>
    );
}


export default RouteFinder
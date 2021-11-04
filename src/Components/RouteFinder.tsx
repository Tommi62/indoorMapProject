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
        START: {A: 1},
        A: {START: 1, B: 1},
        B: {A: 1, C: 1, E: 1},
        C: {B: 1, D: 1},
        D: {C: 1, G: 1},
        E: {B: 1, FINISH: 1},
        G: {FINISH: 1, D: 1},
        FINISH: {G: 1, E: 1},
    };

    // Making refs to all the lines from svg so we can use them later to display and hide lines by their id
    const STARTA: any = useRef();
    const AB: any = useRef();
    const BC: any = useRef();
    const CD: any = useRef();
    const BE: any = useRef();
    const EFINISH: any = useRef();
    const DG: any = useRef();
    const GFINISH: any = useRef();

    // Putting all lines to Object so we can iterate trough them and get lines by their id
    const lines: any = {
        STARTA: STARTA,
        AB: AB,
        BC: BC,
        CD: CD,
        BE: BE,
        EFINISH: EFINISH,
        DG: DG,
        GFINISH: GFINISH
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
                findShortestPath(graph, "FINISH", "START")
            } catch (error: any) {
                console.log(error.message);
            }
        })();
    }, []);

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="500"
                height="500"
                viewBox="0 0 500 500"
            >
                <path
                    fill="#FDFDFD"
                    d="M68.087 50.125H366.33299999999997V406.432H68.087z"
                />
                <path
                    ref={STARTA}
                    stroke="#000"
                    d="M309.942 112.039L306.6 169.266"
                    visibility="hidden"
                />
                <path
                    ref={AB}
                    stroke="#000"
                    d="M306.182 170.101L233.918 196.417"
                    visibility="hidden"
                />
                <path
                    ref={BC}
                    stroke="#000"
                    d="M235.589 198.088L342.941 271.605"
                    visibility="hidden"
                />
                <path
                    ref={CD}
                    stroke="#000"
                    d="M342.941 272.44L236.424 361.83"
                    visibility="hidden"
                />
                <path
                    ref={BE}
                    stroke="#000"
                    d="M234.336 196.927L124.478 211.547"
                    visibility="hidden"
                />
                <path
                    ref={EFINISH}
                    stroke="#000"
                    d="M124.06 211.965L185.046 327.671"
                    visibility="hidden"
                />
                <path
                    ref={DG}
                    stroke="#000"
                    d="M235.171 362.341L232.247 226.167"
                    visibility="hidden"
                />
                <path
                    ref={GFINISH}
                    stroke="#000"
                    d="M232.247 226.167L186.299 328.089"
                    visibility="hidden"
                />
                <text
                    style={{whiteSpace: "pre"}}
                    x="309.524"
                    y="105.031"
                    fill="#333"
                    fontFamily="Arial, sans-serif"
                    fontSize="11.7"
                >
                    start
                </text>
                <text
                    style={{whiteSpace: "pre"}}
                    x="314.536"
                    y="168.941"
                    fill="#333"
                    fontFamily="Arial, sans-serif"
                    fontSize="11.7"
                >
                    A
                </text>
                <text
                    style={{whiteSpace: "pre"}}
                    x="218.881"
                    y="190.244"
                    fill="#333"
                    fontFamily="Arial, sans-serif"
                    fontSize="11.7"
                >
                    B
                </text>
                <text
                    style={{whiteSpace: "pre"}}
                    x="350.042"
                    y="268.774"
                    fill="#333"
                    fontFamily="Arial, sans-serif"
                    fontSize="11.7"
                >
                    C
                </text>
                <text
                    style={{whiteSpace: "pre"}}
                    x="230.994"
                    y="367.354"
                    fill="#333"
                    fontFamily="Arial, sans-serif"
                    fontSize="11.7"
                >
                    D
                </text>
                <text
                    style={{whiteSpace: "pre"}}
                    x="112.782"
                    y="208.623"
                    fill="#333"
                    fontFamily="Arial, sans-serif"
                    fontSize="11.7"
                >
                    E
                </text>
                <text
                    style={{whiteSpace: "pre"}}
                    x="180.869"
                    y="332.266"
                    fill="#333"
                    fontFamily="Arial, sans-serif"
                    fontSize="11.7"
                >
                    Finish
                </text>
                <text
                    style={{whiteSpace: "pre"}}
                    x="224.728"
                    y="221.155"
                    fill="#333"
                    fontFamily="Arial, sans-serif"
                    fontSize="11.7"
                >
                    G
                </text>
                <text
                    style={{whiteSpace: "pre"}}
                    x="310.777"
                    y="135.524"
                    fill="#333"
                    fontFamily="Arial, sans-serif"
                    fontSize="11.7"
                >
                    1
                </text>
                <text
                    style={{whiteSpace: "pre"}}
                    x="274.436"
                    y="185.232"
                    fill="#333"
                    fontFamily="Arial, sans-serif"
                    fontSize="11.7"
                >
                    2
                </text>
                <text
                    style={{whiteSpace: "pre"}}
                    x="285.297"
                    y="229.927"
                    fill="#333"
                    fontFamily="Arial, sans-serif"
                    fontSize="11.7"
                >
                    3
                </text>
                <text
                    style={{whiteSpace: "pre"}}
                    x="303.676"
                    y="312.216"
                    fill="#333"
                    fontFamily="Arial, sans-serif"
                    fontSize="11.7"
                >
                    4
                </text>
                <text
                    style={{whiteSpace: "pre"}}
                    x="176.274"
                    y="201.522"
                    fill="#333"
                    fontFamily="Arial, sans-serif"
                    fontSize="11.7"
                >
                    5
                </text>
                <text
                    style={{whiteSpace: "pre"}}
                    x="143.275"
                    y="264.179"
                    fill="#333"
                    fontFamily="Arial, sans-serif"
                    fontSize="11.7"
                >
                    6
                </text>
                <text
                    style={{whiteSpace: "pre"}}
                    x="234.754"
                    y="279.634"
                    fill="#333"
                    fontFamily="Arial, sans-serif"
                    fontSize="11.7"
                >
                    7
                </text>
                <text
                    style={{whiteSpace: "pre"}}
                    x="205.514"
                    y="276.71"
                    fill="#333"
                    fontFamily="Arial, sans-serif"
                    fontSize="11.7"
                >
                    8
                </text>
            </svg>
        </>
    );
}


export default RouteFinder
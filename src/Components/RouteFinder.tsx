import testSVG from '../../public/testSVG.svg';
import React, {useEffect, useRef, useState} from "react";
import {SvgIcon} from "@material-ui/core";


function RouteFinder() {
    /*
    // Get vector length by it's id
    let lengthGetter = (id: String) => {
        let tempLines: NodeListOf<SVGGeometryElement> = document.querySelectorAll(`*[id*=_${id}_]`);
        let tempLine: SVGGeometryElement = tempLines[0] // SVGGeometryElement
        return tempLine.getTotalLength();
    };

    let graph: any = {
        START: {A: 1},
        A: {START: 1, B: 1},
        B: {AA: 1, C: 1, E: 1},
        C: {B: 1, D: 1},
        D: {C: 1, G: 1},
        E: {B: 1, FINISH: 1},
        G: {FINISH: 1, D: 1},
        FINISH: {G: 1, E: 1},
    };

// Iterate trough object and change the vector lengths to match the lines
    let objIterator = (obj: Object) => {
        for (const [key, value] of Object.entries(obj)) {
            let tempObj: any = {};
            for (let [key1, value1] of Object.entries(value)) {
                const temp = key + key1;
                value1 = lengthGetter(temp);
                tempObj[key1] = value1;
            }
            graph[key] = tempObj;
        }
    };

    objIterator(graph);

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

    let findShortestPath = (graph: any, startNode: string, endNode: string) => {
        // Set all lines with "_" to hidden
        let tempLine2: NodeListOf<SVGGeometryElement> = document.querySelectorAll(`*[id*="_"]`);
        for (let j = 0; j < tempLine2.length; j++) {
            tempLine2[j].style.visibility = 'hidden';
        }
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
            let tempString: string = shortestPath[i]
            let tempString1: string = shortestPath[i + 1]
            let tempName: any = tempString.concat(tempString1)
            tempName.toString();
            /**
             * TODO: get correct selector for SVG lines
             **/
    /*
            let tempLine1: NodeListOf<SVGGeometryElement> = document.querySelectorAll(`*[id*=_${tempName}_]`);
            tempLine1[0].style.visibility = 'visible';
        }
        //this is the shortest path
        let results = {
            distance: distances[endNode],
            path: shortestPath,
        };
        console.log(results);
        // return the shortest path & the end node's distance from the start node
    };

    const activeSlideRef = useRef(null);
*/

    const test = () => {

    }


    /**
     * check line names ea. AB and if it's not in testArr (that includes all lines), reverse them (=BA) and check again.
     * Add the matching line to pathArr and in the end loop trough all of them and set visibility to "visible" while all others are "none"
     */

    const elementRef: any = useRef();
    const elementRef2: any = useRef();
    const elementRef3: any = useRef();
    const elementRef4: any = useRef();
    const AA: any = useRef()

    const testArr = []
    testArr.push(AA)

    const pathArr = []
    pathArr.push(testArr[])

    useEffect(() => {
        const divElement = elementRef.current;
        divElement.style.display = "none"
    }, []);


    useEffect(() => {
        (async () => {
            try {
                // findShortestPath(graph, "A", "D")
            } catch (error: any) {
                console.log(error.message);
            }
        })();
    }, []);

    return (
        <>
            <div ref={elementRef}>
                I'm an element
            </div>
            <div ref={elementRef2}>
                I'm an element2
            </div>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="500"
                height="500"
                viewBox="0 0 500 500"
            >
                <path
                    ref={AA}
                    fill="#FDFDFD"
                    d="M68.087 50.125H366.33299999999997V406.432H68.087z"
                ></path>
                <path
                    stroke="#000"
                    d="M309.942 112.039L306.6 169.266"
                    visibility="hidden"
                ></path>
                <path
                    stroke="#000"
                    d="M306.182 170.101L233.918 196.417"
                    visibility="hidden"
                ></path>
                <path
                    stroke="#000"
                    d="M235.589 198.088L342.941 271.605"
                    visibility="hidden"
                ></path>
                <path
                    stroke="#000"
                    d="M342.941 272.44L236.424 361.83"
                    visibility="hidden"
                ></path>
                <path
                    stroke="#000"
                    d="M234.336 196.927L124.478 211.547"
                    visibility="hidden"
                ></path>
                <path
                    stroke="#000"
                    d="M124.06 211.965L185.046 327.671"
                    visibility="hidden"
                ></path>
                <path
                    stroke="#000"
                    d="M235.171 362.341L232.247 226.167"
                    visibility="hidden"
                ></path>
                <path
                    stroke="#000"
                    d="M232.247 226.167L186.299 328.089"
                    visibility="hidden"
                ></path>
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
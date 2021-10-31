
// Get vector length by it's id
let lengthGetter = (id) => {
    let tempLine1 = document.querySelectorAll(`*[id*=_${id}_]`);
    return tempLine1[0].getTotalLength();
};

let graph = {
    A1: {AA: 1},
    AA: {A1: 1, B: 1},
    B: {AA: 1, C: 1, E: 1},
    C: {B: 1, D: 1},
    D: {C: 1, G: 1},
    E: {B: 1, FINISH: 1},
    G: {FINISH: 1, D: 1},
    FINISH: {G: 1, E: 1},
};

// Iterate trough object and change the vector lengths to match the lines
let objIterator = (obj) => {
    for (const [key, value] of Object.entries(obj)) {
        let tempObj = {};
        for (let [key1, value1] of Object.entries(value)) {
            const temp = key + key1;
            value1 = lengthGetter(temp);
            tempObj[key1] = value1;
        }
        obj[key] = tempObj;
    }
};

objIterator(graph);

let shortestDistanceNode = (distances, visited) => {
    // create a default value for shortest
    let shortest = null;

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

let findShortestPath = (graph, startNode, endNode) => {
    // Set all lines with "_" to hidden
    let tempLine2 = document.querySelectorAll(`*[id*="_"]`);
    for (let j = 0; j < tempLine2.length; j++) {
        tempLine2[j].style.visibility = 'hidden';
    }
    // track distances from the start node using a hash object
    let distances = {};
    distances[endNode] = 'Infinity';
    distances = Object.assign(distances, graph[startNode]);
    // track paths using a hash object
    let parents = {endNode: null};
    for (let child in graph[startNode]) {
        parents[child] = startNode;
    }

    // collect visited nodes
    let visited = [];
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
    let shortestPath = [endNode];
    let parent = parents[endNode];
    while (parent) {
        shortestPath.push(parent);
        parent = parents[parent];
    }
    shortestPath.reverse();
    for (let i = 0; i < shortestPath.length - 1; i++) {
        let tempName = shortestPath[i] + shortestPath[i + 1];
        tempName.toString();
        let tempLine1 = document.querySelectorAll(`*[id*=_${tempName}_]`);
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

findShortestPath(graph, 'AA', 'D');
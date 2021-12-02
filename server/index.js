"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const server = (0, fastify_1.default)();
server.register(require('fastify-cors'), {
    origin: "http://localhost:3000"
});
const doFetch = async (url, options = {}) => {
    const response = await (0, cross_fetch_1.default)(url, options);
    console.log('RESPONSE', response);
    const json = await response.json();
    if (json.error) {
        // if API response contains error message (use Postman to get further details)
        throw new Error(json.message + ': ' + json.error);
    }
    else if (!response.ok) {
        // if API response does not contain error message, but there is some other error
        throw new Error('doFetch failed');
    }
    else {
        // if all goes well
        return json;
    }
};
server.post('/metropolia-data', async (req, reply) => {
    const { group, room, realization, startDate, apiKey, apiUrl, rangeStart, rooms } = req.body;
    let body;
    if (rangeStart !== '') {
        body = {
            "rangeStart": rangeStart,
            "rangeEnd": rangeStart,
            "room": rooms,
            "building": ["KAAPO"],
        };
    }
    else if (room !== '') {
        body = {
            "startDate": startDate,
            "room": [room],
            "building": ["KAAPO"],
        };
    }
    else if (realization !== '') {
        body = {
            "startDate": startDate,
            "realization": [realization],
            "building": ["KAAPO"],
        };
    }
    else {
        body = {
            "startDate": startDate,
            "studentGroup": [group],
            "building": ["KAAPO"],
        };
    }
    console.log('BODY', body);
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${apiKey}:`).toString('base64'),
        },
        body: JSON.stringify(body),
    };
    try {
        const result = await doFetch(apiUrl, fetchOptions);
        console.log('MetropoliaData', result);
        return result;
    }
    catch (err) {
        throw new Error(err);
    }
});
server.post('/fazer-data', async (req, reply) => {
    const { url } = req.body;
    try {
        const result = await doFetch(url);
        console.log('Result', result);
        return result;
    }
    catch (err) {
        throw new Error(err);
    }
});
server.get('/test', async (req, reply) => {
    try {
        reply.send('TestiTestiTesti');
    }
    catch (err) {
        throw new Error(err);
    }
});
server.listen(8080, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});

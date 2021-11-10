import fastify, { FastifyRequest } from 'fastify'
import fetch from 'cross-fetch';

const server = fastify()

server.register(require('fastify-cors'), {
    origin: "*"
})

type postRequest = FastifyRequest<{
    Body: {
        group: string,
        room: string,
        startDate: string,
        apiKey: string,
        apiUrl: string,
    }
}>

const doFetch = async (url: string, options = {}) => {
    const response = await fetch(url, options);
    console.log('RESPONSE', response);
    const json: any = await response.json();
    if (json.error) {
        // if API response contains error message (use Postman to get further details)
        throw new Error(json.message + ': ' + json.error);
    } else if (!response.ok) {
        // if API response does not contain error message, but there is some other error
        throw new Error('doFetch failed');
    } else {
        // if all goes well
        return json;
    }
};

server.post('/metropolia-data', async (req: postRequest, reply) => {
    const { group, room, startDate, apiKey, apiUrl } = req.body
    console.log('grouo', group, room);
    let body;

    if (group === '') {
        body = {
            "startDate": startDate,
            "room": [room],
            "building": ["KAAPO"],
        }
    } else {
        body = {
            "startDate": startDate,
            "studentGroup": [group],
            "building": ["KAAPO"],
        }
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
        console.log('Result', result);
        return result;
    } catch (err: any) {
        throw new Error(err)
    }
})

server.listen(8080, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
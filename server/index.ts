import fastify, { FastifyRequest } from 'fastify'
import fetch from 'cross-fetch';

const server = fastify()

server.register(require('fastify-cors'), {
    origin: "https://media-server-tommi.northeurope.cloudapp.azure.com/"
})

type postRequest = FastifyRequest<{
    Body: {
        group: string,
        room: string,
        realization: string,
        startDate: string,
        apiKey: string,
        apiUrl: string,
    }
}>

type getRequest = FastifyRequest<{
    Body: {
        url: string,
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
    const { group, room, realization, startDate, apiKey, apiUrl } = req.body
    let body

    if (room !== '') {
        body = {
            "startDate": startDate,
            "room": [room],
            "building": ["KAAPO"],
        }
    } else if (realization !== '') {
        body = {
            "startDate": startDate,
            "realization": [realization],
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

server.post('/fazer-data', async (req: getRequest, reply) => {
    const { url } = req.body
    try {
        const result = await doFetch(url);
        console.log('Result', result);
        return result;
    } catch (err: any) {
        throw new Error(err)
    }
})

server.get('/test', async (req: FastifyRequest, reply) => {
    try {
        reply.send('TestiTestiTesti')
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
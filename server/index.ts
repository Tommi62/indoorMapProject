import fastify, { FastifyRequest } from 'fastify'
import fetch from 'cross-fetch';

const server = fastify()

server.register(require('fastify-cors'), {
    origin: "*"
})

type postRequest = FastifyRequest<{
    Body: {
        code: string,
        startDate: string,
        endDate: string
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

server.post('/', async (req: postRequest, reply) => {
    const { code, startDate, endDate, apiKey, apiUrl } = req.body
    console.log('apiUrl', apiUrl);

    const fetchOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${apiKey}:`).toString('base64'),
        },
        body: JSON.stringify({
            "startDate": startDate,
            "studentGroup": [code],
            "building": ["KAAPO"]
        }),
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
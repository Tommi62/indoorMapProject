import ApiConfig from "../Configs/ApiConfig";

const doFetch = async (url: string, options = {}) => {
    const response = await fetch(url, options);
    console.log('RESPONSE', response);
    const json = await response.json();
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

interface requestObj {
    group: string,
    room: string,
    startDate: string,
    apiKey: string,
    apiUrl: string,
}

const useReservations = () => {

    const postGetMetropoliaData = async (requestObject: requestObj) => {
        requestObject.apiKey = ApiConfig.apiKey;
        requestObject.apiUrl = ApiConfig.apiUrl;

        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestObject),
        };
        try {
            const result = await doFetch(ApiConfig.backendUrl + '/metropolia-data', fetchOptions);
            return result;
        } catch (e: any) {
            alert(e.message);
        }
    };

    return { postGetMetropoliaData };
};

export { useReservations };
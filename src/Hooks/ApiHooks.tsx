import ApiConfig from "../Configs/ApiConfig";

const doFetch = async (url: string, options = {}) => {
    const response = await fetch(url, options);
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
    group: string[],
    room: string[],
    realization: string[],
    startDate: string,
    apiKey: any,
    apiUrl: any,
    rangeStart: string,
    rangeEnd: string,
}

const useApiData = () => {

    const postGetMetropoliaData = async (requestObject: requestObj) => {
        requestObject.apiKey = process.env.REACT_APP_API_KEY;
        requestObject.apiUrl = process.env.REACT_APP_API_URL;

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

    const postGetFazerData = async (lang: string) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: process.env.REACT_APP_FAZER_URL + lang,
            }),
        };
        try {
            const result = await doFetch(ApiConfig.backendUrl + '/fazer-data', fetchOptions);
            return result;
        } catch (e: any) {
            alert(e.message);
        }
    };

    const getLocalServerData = async () => {
        const fetchOptions = {
            method: 'GET'
        };
        try {
            const result = await doFetch("http://127.0.0.1:5000", fetchOptions);
            return result;
        } catch (e: any) {
            alert(e.message);
        }

    }

    return { postGetMetropoliaData, postGetFazerData, getLocalServerData };
};

export { useApiData };
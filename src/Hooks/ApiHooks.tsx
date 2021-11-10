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
    code: string,
    startDate: string,
    endDate: string,
    apiKey: string,
    apiUrl: string,
}

const useReservations = () => {

    /*const postGetReservationsByStudentGroup = async (code: string) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(`${ApiConfig.apiKey}:`),
            },
            body: {
                "startDate": "2021-11-01T08:00",
                "endDate": "2021-11-05T21:00",
                "studentGroup": [code],
                "building": ["KAAPO"]
            },
        };
        try {
            const result = await doFetch(ApiConfig.apiUrl, fetchOptions);
            console.log('Result', result);
            return result;
        } catch (error: any) {
            alert(error.message);
        }
    }*/

    const postGetReservationsByStudentGroup = async (requestObject: requestObj) => {
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
            const result = await doFetch(ApiConfig.backendUrl + '/', fetchOptions);
            return result;
        } catch (e: any) {
            alert(e.message);
        }
    };

    return { postGetReservationsByStudentGroup };
};

export { useReservations };
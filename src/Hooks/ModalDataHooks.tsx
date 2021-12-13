import moment from 'moment';
import { useApiData } from './ApiHooks';

interface requestObj {
    group: string[],
    room: string[],
    realization: string[],
    startDate: string,
    apiKey: string,
    apiUrl: string,
    rangeStart: string,
    rangeEnd: string,
}

const useModalData = () => {
    const { postGetMetropoliaData, postGetFazerData } = useApiData();
    const realizationStartsWith = ['TX00', 'TU00', 'XX00'];

    const getModalData = async (keyword: string) => {
        try {
            const today = moment().format('YYYY-MM-DD');
            const todayStart = today + 'T08:00:00';
            let requestObject: requestObj = {
                group: [],
                room: [],
                realization: [],
                startDate: todayStart,
                apiKey: '',
                apiUrl: '',
                rangeStart: '',
                rangeEnd: '',
            };
            for (let i = 0; i < realizationStartsWith.length; i++) {
                if (keyword.startsWith(realizationStartsWith[i])) {
                    requestObject.realization.push(keyword);
                    break;
                }
            }
            if (requestObject.realization.length === 0) {
                if (keyword.startsWith('KM')) {
                    requestObject.room.push(keyword);
                } else {
                    requestObject.group.push(keyword);
                }
            }
            const reservations = await postGetMetropoliaData(requestObject);
            let reservationsArray = [];
            if (reservations.reservations.length !== 0) {
                for (let i = 0; i < reservations.reservations.length; i++) {
                    let room = '';
                    let group = '';

                    for (let j = 0; j < reservations.reservations[i].resources.length; j++) {
                        if (reservations.reservations[i].resources[j].type === 'student_group') {
                            if (group === '') {
                                group = reservations.reservations[i].resources[j].code;
                            } else {
                                group = group + ' ' + reservations.reservations[i].resources[j].code;
                            }
                        } else if (reservations.reservations[i].resources[j].type === 'room') {
                            room = reservations.reservations[i].resources[j].code;
                        }
                    }

                    const reservationObject = {
                        success: true,
                        name: reservations.reservations[i].subject,
                        group: group,
                        room: room,
                        startDate: reservations.reservations[i].startDate,
                        endDate: reservations.reservations[i].endDate,
                    }
                    reservationsArray.push(reservationObject);
                }
            }
            return reservationsArray;
        } catch (error: any) {
            console.log(error.message);
        }
    }

    const getFazerModalData = async (lang: string) => {
        try {
            const menu = await postGetFazerData(lang);
            return menu.MenusForDays;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    return { getModalData, getFazerModalData };
}

export { useModalData };
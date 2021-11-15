import moment from 'moment';
import { useReservations } from './ApiHooks';

interface requestObj {
    group: string,
    room: string,
    startDate: string,
    apiKey: string,
    apiUrl: string,
}

const useModalData = () => {
    const { postGetMetropoliaData } = useReservations();

    const getModalData = async (keyword: string) => {
        const today = moment().format('YYYY-MM-DD');
        const todayStart = today + 'T08:00:00'
        let requestObject: requestObj = {
            group: '',
            room: '',
            startDate: todayStart,
            apiKey: '',
            apiUrl: '',
        }
        if (keyword.startsWith('KM')) {
            console.log('ROOM', keyword);
            requestObject.room = keyword;
        } else {
            console.log('GROUP', keyword);
            requestObject.group = keyword;
        }
        const reservations = await postGetMetropoliaData(requestObject);
        console.log('RESERVATIONS', reservations);
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
    }
    return { getModalData };
}

export { useModalData };
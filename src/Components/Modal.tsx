import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MuiModal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import fiLocale from '@fullcalendar/core/locales/fi';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    box: {
        [theme.breakpoints.down(1000)]: {
            width: '80vw!important',
        },
    },
}));

interface modalContentArray {
    success: boolean,
    name: string,
    group: string,
    room: string,
    startDate: string,
    endDate: string,
}

interface startEndObject {
    start: string,
    end: string,
}

interface propTypes {
    modalOpen: boolean,
    setModalOpen: Function,
    modalContent: modalContentArray[],
    setModalContent: Function,
}

const Modal = ({ modalOpen, setModalOpen, modalContent, setModalContent }: propTypes) => {
    const classes = useStyles();
    const [calendarStartAndEnd, setCalendarStartAndEnd] = useState<startEndObject>({
        start: '',
        end: '',
    });

    const handleClose = () => {
        setModalOpen(false);
        setModalContent([{
            success: false,
            name: '',
            group: '',
            room: '',
            startDate: '',
            endDate: ''
        }]);
    };

    useEffect(() => {
        try {
            const today = moment().format('YYYY-MM-DD');
            setCalendarStartAndEnd({
                start: today,
                end: today,
            });
        } catch (error: any) {
            console.log(error.message);
        }
    }, [modalContent]);

    return (
        <MuiModal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '40vw',
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}
                className={classes.box}
            >
                {modalContent[0].success ? (
                    <>
                        <FullCalendar
                            locales={[fiLocale]}
                            locale='fi'
                            dayHeaderContent={false}
                            plugins={[timeGridPlugin, interactionPlugin]}
                            headerToolbar={{
                                left: 'prev',
                                center: 'title',
                                right: 'next'
                            }}
                            initialView='timeGridDay'
                            allDaySlot={false}
                            slotLabelFormat={[{ hour: 'numeric', minute: '2-digit' }]}
                            slotMinTime='08:00:00'
                            slotMaxTime='21:00:00'
                            height={600}
                            views={{
                                timeGrid: {
                                    visibleRange: {
                                        start: calendarStartAndEnd.start,
                                        end: calendarStartAndEnd.end,
                                    },
                                },
                            }}
                            events={modalContent.map((data) => {
                                return {
                                    title:
                                        data.name +
                                        ' ' +
                                        data.group +
                                        ' ' +
                                        data.room,
                                    start: new Date(data.startDate),
                                    end: new Date(data.endDate),
                                    room: data.room,
                                }
                            })}
                            eventClick={(e) => console.log(e.event._def.extendedProps.room)}
                        />
                    </>
                ) : (
                    <>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            No search results found
                        </Typography>
                    </>
                )}
            </Box>
        </MuiModal>
    );
}

export default Modal;
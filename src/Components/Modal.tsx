import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MuiModal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import fiLocale from '@fullcalendar/core/locales/fi';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import tippy, { followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import FazerMenu from './FazerMenu';

const useStyles = makeStyles((theme) => ({
    box: {
        [theme.breakpoints.down(1000)]: {
            width: '80vw!important',
        },
    },
    shortcut: {
        marginTop: '0.5rem',
    },
    modal: {
        maxHeight: '90vh',
    }
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
    keyWord: string,
    updateShortcuts: number,
    setUpdateShortcuts: Function,
    restaurantMenu: boolean,
    setRestaurantMenu: Function,
}

const Modal = ({ modalOpen, setModalOpen, modalContent, setModalContent, keyWord, updateShortcuts, setUpdateShortcuts, restaurantMenu, setRestaurantMenu }: propTypes) => {
    const classes = useStyles();
    const [isShortcut, setIsShortcut] = useState(false);
    const [shortcutLimiter, setShortcutLimiter] = useState(false);
    const [calendarStartAndEnd, setCalendarStartAndEnd] = useState<startEndObject>({
        start: '',
        end: '',
    });

    const handleClose = () => {
        setModalOpen(false);
        setRestaurantMenu(false);
        setModalContent([{
            success: false,
            name: '',
            group: '',
            room: '',
            startDate: '',
            endDate: ''
        }]);
    };

    const addShortcut = () => {
        if (localStorage.getItem('shortcuts') !== null) {
            const shortcutArray = JSON.parse(localStorage.getItem('shortcuts')!);
            shortcutArray.push(keyWord);
            localStorage.setItem('shortcuts', JSON.stringify(shortcutArray));
        } else {
            const shortcutArray = [keyWord];
            localStorage.setItem('shortcuts', JSON.stringify(shortcutArray));
        }
        setIsShortcut(true);
        setUpdateShortcuts(Date.now());
    };

    const removeShortcut = () => {
        if (localStorage.getItem('shortcuts') !== null) {
            const shortcutArray = JSON.parse(localStorage.getItem('shortcuts')!);
            for (let i = 0; i < shortcutArray.length; i++) {
                if (shortcutArray[i] === keyWord) {
                    shortcutArray.splice(i, 1);
                    localStorage.setItem('shortcuts', JSON.stringify(shortcutArray));
                    break;
                }
            }
        }
        setIsShortcut(false);
        setUpdateShortcuts(Date.now());
    };

    useEffect(() => {
        try {
            if (!restaurantMenu) {
                console.log('UseEffect');
                setIsShortcut(false);
                if (localStorage.getItem('shortcuts') !== null) {
                    const shortcutArray = JSON.parse(localStorage.getItem('shortcuts')!);
                    if (shortcutArray.length >= 14) {
                        setShortcutLimiter(true);
                    } else {
                        setShortcutLimiter(false);
                    }
                    for (let i = 0; i < shortcutArray.length; i++) {
                        if (shortcutArray[i] === keyWord) {
                            setIsShortcut(true);
                            break;
                        }
                    }
                }
                const today = moment().format('YYYY-MM-DD');
                setCalendarStartAndEnd({
                    start: today,
                    end: today,
                });
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }, [keyWord, updateShortcuts]);

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
                {restaurantMenu ? (
                    <FazerMenu />
                ) : (
                    <>
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
                                    height={'70vh'}
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
                                            extendedProps: {
                                                subject: data.name,
                                                group: data.group,
                                                room: data.room,
                                            }
                                        }
                                    })}
                                    eventClick={(e) => console.log(e.event._def.extendedProps.room)}
                                    nowIndicator={true}
                                    eventMouseEnter={(arg) => {
                                        tippy(arg.el, {
                                            content: 'Aihe: ' + arg.event._def.extendedProps.subject + '<br>' + 'Ryhmä(t): ' + arg.event._def.extendedProps.group + '<br>' + 'Tila: ' + arg.event._def.extendedProps.room,
                                            allowHTML: true,
                                            theme: 'calendar',
                                            animation: 'scale',
                                            arrow: false,
                                            followCursor: true,
                                            plugins: [followCursor],
                                        });
                                    }}
                                />
                                <Grid container justifyContent="center" className={classes.shortcut}>
                                    {isShortcut ? (
                                        <Button onClick={removeShortcut}>Remove shortcut</Button>
                                    ) : (
                                        <>
                                            {!shortcutLimiter &&
                                                <Button onClick={addShortcut}>Add shortcut</Button>
                                            }
                                        </>
                                    )}
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center' }}>
                                    No search results found
                                </Typography>
                            </>
                        )}
                    </>
                )}
            </Box>
        </MuiModal>
    );
}

export default Modal;
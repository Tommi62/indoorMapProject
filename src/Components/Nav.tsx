import {
    AppBar,
    InputBase,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import useForm from '../Hooks/FormHooks';
import { useReservations } from '../Hooks/ApiHooks';
import moment from 'moment';
import { useEffect } from 'react';
import { TuneTwoTone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        cursor: 'pointer',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchIcon: {
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '0.1rem'
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingLeft: '1.7rem'
    },
}));

interface propTypes {
    setModalOpen: Function,
    setModalContent: Function,
    setKeyWord: Function,
}

interface requestObj {
    group: string,
    room: string,
    startDate: string,
    apiKey: string,
    apiUrl: string,
}

const Nav = ({ setModalOpen, setModalContent, setKeyWord }: propTypes) => {
    const classes = useStyles();
    const { postGetMetropoliaData } = useReservations();

    const doSearch = async () => {
        try {
            if (inputs.searchTerm !== '') {
                const str = inputs.searchTerm.replace(/ /g, "");
                const upperCaseStr = str.toUpperCase();
                const today = moment().format('YYYY-MM-DD');
                const todayStart = today + 'T08:00:00'
                let requestObject: requestObj = {
                    group: '',
                    room: '',
                    startDate: todayStart,
                    apiKey: '',
                    apiUrl: '',
                }
                if (upperCaseStr.startsWith('KM')) {
                    console.log('ROOM', upperCaseStr);
                    requestObject.room = upperCaseStr;
                } else {
                    console.log('GROUP', upperCaseStr);
                    requestObject.group = upperCaseStr;
                }
                const reservations = await postGetMetropoliaData(requestObject);
                console.log('RESERVATIONS', reservations);
                if (reservations.reservations.length !== 0) {
                    let reservationsArray = [];
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
                    setModalContent(reservationsArray);
                }
                setKeyWord(upperCaseStr);
                setModalOpen(true);
                setInputs({ searchTerm: '' });
            }
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const { inputs, setInputs, handleInputChange, handleSubmit } = useForm(doSearch, {
        searchTerm: '',
    });

    const refresh = () => {
        window.location.reload();
    }

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static" style={{ height: '64px' }}>
                    <Toolbar>
                        <Typography onClick={refresh} className={classes.title} variant="h6" color="inherit" noWrap>
                            App
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.search}>
                            <form onSubmit={handleSubmit}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    name="searchTerm"
                                    type="text"
                                    onChange={handleInputChange}
                                    value={inputs.searchTerm}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            </form>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </>
    );
};

export default Nav;
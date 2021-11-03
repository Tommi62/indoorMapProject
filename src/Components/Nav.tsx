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
}

const Nav = ({ setModalOpen, setModalContent }: propTypes) => {
    const classes = useStyles();
    const { postGetReservationsByStudentGroup } = useReservations();

    const doSearch = async () => {
        try {
            if (inputs.searchTerm !== '') {
                const str = inputs.searchTerm.replace(/ /g, "");
                const upperCaseStr = str.toUpperCase();
                if (upperCaseStr.startsWith('KM')) {
                    console.log('ROOM', upperCaseStr);
                } else {
                    console.log('GROUP', upperCaseStr);
                    if (upperCaseStr === 'TVT19-M') {
                        const modalContentArray = [{
                            success: true,
                            name: 'Mediapalvelut-projekti TX00CG61-3007',
                            room: 'TVT19-M',
                            startDate: '2021-11-08T09:00:00',
                            endDate: '2021-11-08T12:00:00',
                        }];
                        setModalContent(modalContentArray);
                    }
                    setModalOpen(true);
                }
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

    useEffect(() => {
        (async () => {
            try {
                //const reservations = await postGetReservationsByStudentGroup('TVT19-M');
                //console.log('RESERVATIONS', reservations);
            } catch (error: any) {
                console.log(error.message);
            }
        })();
    }, []);

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
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
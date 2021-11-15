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
import { useEffect, useState } from 'react';
import ShortcutButton from './ShortcutButton';
import { useModalData } from '../Hooks/ModalDataHooks';
import { Button, Menu } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
    scButton: {
        marginRight: '0.5rem!important',
        backgroundColor: '#3f51b5!important',
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.15) + '!important',
        },
    },
}));

interface propTypes {
    setModalOpen: Function,
    setModalContent: Function,
    setKeyWord: Function,
    updateShortcuts: number,
}

const Nav = ({ setModalOpen, setModalContent, setKeyWord, updateShortcuts }: propTypes) => {
    const classes = useStyles();
    const { getModalData } = useModalData();
    const [shortcutArray, setShortcutArray] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        try {
            if (localStorage.getItem('shortcuts') !== null) {
                const scArray = JSON.parse(localStorage.getItem('shortcuts')!);
                setShortcutArray(scArray);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }, [updateShortcuts]);

    const doSearch = async () => {
        try {
            if (inputs.searchTerm !== '') {
                const str = inputs.searchTerm.replace(/ /g, "");
                const upperCaseStr = str.toUpperCase();
                const modalData = await getModalData(upperCaseStr);
                if (modalData.length !== 0) {
                    setModalContent(modalData);
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
                        {shortcutArray.length !== 0 &&
                            <>
                                <Button
                                    id="basic-button"
                                    aria-controls="basic-menu"
                                    aria-haspopup="true"
                                    variant="contained"
                                    disableElevation
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    endIcon={<KeyboardArrowDownIcon />}
                                    className={classes.scButton}
                                >
                                    Shortcuts
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    {shortcutArray.map((item) => (
                                        <ShortcutButton
                                            name={item}
                                            setModalContent={setModalContent}
                                            setModalOpen={setModalOpen}
                                            setKeyWord={setKeyWord}
                                            handleClose={handleClose}
                                        />
                                    ))}{' '}
                                </Menu>
                            </>
                        }

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
import {
    AppBar,
    InputBase,
    Toolbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import useForm from "../Hooks/FormHooks";
import { useEffect, useState } from "react";
import ShortcutButton from "./ShortcutButton";
import { useModalData } from "../Hooks/ModalDataHooks";
import { Button, IconButton, Menu, Drawer, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@material-ui/icons/Menu";
import data from "../Data/classrooms.json";
import logo from "../Media/Misc/metropolia_s_oranssi.svg";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        cursor: "pointer",
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "auto",
        },
    },
    searchIcon: {
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "0.1rem",
    },
    inputRoot: {
        color: "inherit",
        width: "100%",
    },
    inputInput: {
        paddingLeft: "1.7rem",
    },
    scButton: {
        marginRight: "0.5rem!important",
        backgroundColor: "#f66f49!important",
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.15) + "!important",
        },
        [theme.breakpoints.down("xs")]: {
            display: "none!important",
        },
    },
}));

interface propTypes {
    setModalOpen: Function;
    setModalContent: Function;
    setKeyWord: Function;
    updateShortcuts: number;
    setRestaurantMenu: Function;
    setMarker: Function;
    floorSelect: string;
    setFloorSelect: Function;
}

const Nav = ({
    setModalOpen,
    setModalContent,
    setKeyWord,
    updateShortcuts,
    setRestaurantMenu,
    setMarker,
    floorSelect,
    setFloorSelect,
}: propTypes) => {
    const classes = useStyles();
    const defaultShortcuts = ["Fazer Menu"];
    const { getModalData } = useModalData();
    const [shortcutArray, setShortcutArray] = useState<string[]>([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const toggleDrawer = (openDrawer: boolean) => (event: any) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setOpenDrawer(openDrawer);
    };

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        try {
            if (localStorage.getItem("shortcuts") !== null) {
                const scArray = JSON.parse(localStorage.getItem("shortcuts")!);
                const combinedScArray = defaultShortcuts.concat(scArray);
                setShortcutArray(combinedScArray);
            } else {
                setShortcutArray(defaultShortcuts);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }, [updateShortcuts]);

    function uniq(a: any) {
        return Array.from(new Set(a));
    }

    function getRelevance(value: any, keyword: string) {
        value = value.toLowerCase(); // lowercase to make search not case sensitive
        keyword = keyword.toLowerCase();
        let index = value.indexOf(keyword); // index of the keyword
        let word_index = value.indexOf(" " + keyword); // index of the keyword if it is not on the first index, but a word

        if (index === 0)
            // value starts with keyword (eg. for 'Dani California' -> searched 'Dan')
            return 3;
        // highest relevance
        else if (word_index !== -1)
            // value doesnt start with keyword, but has the same word somewhere else (eg. 'Dani California' -> searched 'Cali')
            return 2;
        // medium relevance
        else if (index !== -1)
            // value contains keyword somewhere (eg. 'Dani California' -> searched 'forn')
            return 1;
        // low relevance
        else return 0; // no matches, no relevance
    }

    function compareRelevance(a: any, b: any) {
        return b.relevance - a.relevance;
    }

    function searchJson(keyword: string) {
        if (keyword.length < 1) {
            return;
        }
        let results = [];
        let i: keyof typeof data;
        for (i in data) {
            for (let j = 0; j < data[i].length; j++) {
                let rel = getRelevance(data[i][j].name, keyword);
                console.log(rel);
                if (rel === 0) {
                    continue;
                }
                results.push({ relevance: rel, entry: data[i][j] }); // matches found, add to results and store relevance
            }
        }

        results.sort(compareRelevance); // sort by relevance
        const final = [];
        for (let i = 0; i < results.length; i++) {
            final.push(results[i].entry); // remove relevance since it is no longer needed
        }
        return uniq(final);
    }

    const checkForMarkers = (string: string) => {
        if (string.startsWith("KM")) {
            const result = searchJson(string.substring(2));
            if (result !== undefined) {
                setFloorSelect(string.substring(3).charAt(0));
            }
            setMarker(result);
            return true;
        } else if (string === "VESSA" || string === "WC" || string === "TOILET") {
            const result = searchJson("V" + floorSelect);
            setMarker(result);
            return true;
        } else if (string === "HISSI" || string === "ELEVATOR") {
            const result = searchJson("H" + floorSelect);
            setMarker(result);
            return true;
        } else if (string === "PORTAAT" || string === "STAIRS") {
            const result = searchJson("S" + floorSelect);
            setMarker(result);
            return true;
        } else return false;
    };

    const doSearch = async () => {
        try {
            if (inputs.searchTerm !== "") {
                const str = inputs.searchTerm.replace(/ /g, "");
                if (str === "fazer" || str === "menu") {
                    setRestaurantMenu(true);
                    setModalOpen(true);
                } else {
                    const upperCaseStr = str.toUpperCase();
                    if (checkForMarkers(upperCaseStr)) {
                    } else {
                        const modalData = await getModalData(upperCaseStr);
                        if (modalData !== undefined && modalData.length !== 0) {
                            setModalContent(modalData);
                        }
                        setKeyWord(upperCaseStr);
                        setModalOpen(true);
                    }
                }
                setInputs({ searchTerm: "" });
            }
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const { inputs, setInputs, handleInputChange, handleSubmit } = useForm(
        doSearch,
        {
            searchTerm: "",
        }
    );

    const refresh = () => {
        window.location.reload();
    };

    return (
        <>
            <div className={classes.root}>
                <AppBar position="absolute" className="navbar">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer(true)}
                            sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>

                        {/* The outside of the drawer */}
                        <Drawer
                            anchor="left" //from which side the drawer slides in
                            variant="temporary" //if and how easily the drawer can be closed
                            open={openDrawer} //if open is true, drawer is shown
                            onClose={toggleDrawer(false)} //function that is called when the drawer should close
                        >
                            <Box>
                                {shortcutArray.map((item) => (
                                    <ShortcutButton
                                        key={item}
                                        name={item}
                                        type="drawer"
                                        setModalContent={setModalContent}
                                        setModalOpen={setModalOpen}
                                        setKeyWord={setKeyWord}
                                        handleClose={handleClose}
                                        setOpenDrawer={setOpenDrawer}
                                        setRestaurantMenu={setRestaurantMenu}
                                    />
                                ))}{" "}
                            </Box>
                        </Drawer>
                        <Box
                            component="img"
                            src={logo}
                            style={{
                                height: "3rem",
                                backgroundColor: "white",
                                padding: "6px 12px",
                                borderRadius: "6px",
                                boxShadow:
                                    "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 1%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
                            }}
                            alt="Metropolia logo"
                            sx={{ display: { xs: "none", sm: "block" } }}
                            onClick={refresh}
                        ></Box>

                        <div className={classes.grow} />
                        {shortcutArray.length !== 0 && (
                            <>
                                <Button
                                    id="basic-button"
                                    aria-controls="basic-menu"
                                    aria-haspopup="true"
                                    variant="contained"
                                    disableElevation
                                    aria-expanded={open ? "true" : undefined}
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
                                        "aria-labelledby": "basic-button",
                                    }}
                                >
                                    {shortcutArray.map((item) => (
                                        <ShortcutButton
                                            key={item}
                                            name={item}
                                            type="dropdown"
                                            setModalContent={setModalContent}
                                            setModalOpen={setModalOpen}
                                            setKeyWord={setKeyWord}
                                            handleClose={handleClose}
                                            setOpenDrawer={setOpenDrawer}
                                            setRestaurantMenu={setRestaurantMenu}
                                        />
                                    ))}{" "}
                                </Menu>
                            </>
                        )}

                        <div className={classes.search}
                            id="basic-button">
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
